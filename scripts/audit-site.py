"""Audit generated production HTML, sitemap, local links, schema, and navigation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]/'dist'
class Page(HTMLParser):
 def __init__(self,p):
  super().__init__();self.path=p;self.tags=[];self.title='';self.in_title=False;self.jsons=[];self.in_json=False
 def handle_starttag(self,t,a):
  a=dict(a);self.tags.append((t,a));self.in_title=t=='title' or self.in_title
  if t=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.jsons.append('')
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script':self.in_json=False
 def handle_data(self,d):
  if self.in_title:self.title+=d
  if self.in_json:self.jsons[-1]+=d
pages={};errors=[]
for p in root.rglob('*.html'):
 x=Page(p);x.feed(p.read_text());pages[p.resolve()]=x
for p,x in pages.items():
 rel=str(p.relative_to(root));tags=x.tags
 def fail(msg):errors.append(rel+': '+msg)
 if sum(t=='h1' for t,a in tags)!=1:fail('expected one h1')
 if not x.title:fail('missing title')
 if not any(t=='meta' and a.get('name')=='description' and a.get('content') for t,a in tags):fail('missing description')
 ids=[a['id'] for t,a in tags if 'id' in a]
 if len(ids)!=len(set(ids)):fail('duplicate IDs')
 for j in x.jsons:
  try:json.loads(j)
  except ValueError:fail('invalid JSON-LD')
 if not any(t=='a' and a.get('href')=='/client-requests/' for t,a in tags):fail('missing Client Requests navigation')
 for t,a in tags:
  if t=='img' and 'alt' not in a:fail('image missing alt')
  val=a.get('href') if t in ['a','link'] else a.get('src') if t in ['img','script'] else None
  if not val:continue
  u=urlparse(val)
  if u.scheme or u.netloc:continue
  target=(root/u.path.lstrip('/') if u.path.startswith('/') else p.parent/u.path).resolve() if u.path else p
  if target.is_dir():target=target/'index.html'
  if not target.exists():fail('broken local target '+val)
  elif u.fragment and target in pages and unquote(u.fragment) not in [b.get('id') for _,b in pages[target].tags]:fail('missing fragment '+val)
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[e.text for e in ET.parse(root/'sitemap.xml').findall('.//s:loc',ns)]
for url in urls:
 u=urlparse(url);p=(root/u.path.lstrip('/')/'index.html').resolve() if u.path.endswith('/') else (root/u.path.lstrip('/')).resolve()
 if u.netloc!='snapflowsolutions.com' or p not in pages:errors.append('Invalid sitemap URL '+url);continue
 x=pages[p]
 if any(t=='meta' and a.get('name')=='robots' and 'noindex' in a.get('content','') for t,a in x.tags):errors.append('Sitemap includes noindex: '+url)
 if not any(t=='link' and a.get('rel')=='canonical' and a.get('href')==url for t,a in x.tags):errors.append('Sitemap canonical mismatch: '+url)
print(json.dumps({'pages':len(pages),'sitemap_urls':len(urls),'errors':errors},indent=2))
raise SystemExit(bool(errors))
