import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
const read = path => readFile(new URL('../'+path,import.meta.url),'utf8');
test('preview and production builds separate indexing without losing private-page exclusions',async()=>{
  execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,CONTEXT:'deploy-preview'}});
  assert.match(await read('dist/_headers'),/noindex/);
  assert.match(await read('dist/index.html'),/name="robots" content="noindex,nofollow"/);
  await assert.rejects(access(new URL('../dist/CLAUDE.md',import.meta.url)));
  execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,CONTEXT:'production'}});
  const home=await read('dist/index.html');
  assert.doesNotMatch(home,/<meta\s+name="robots"[^>]*noindex/);
  assert.doesNotMatch(home,/<div class="sample-notice">/);
  assert.match(await read('dist/project-request/thank-you/index.html'),/noindex/);
  assert.match(await read('dist/pdr-snapshot-getting-started/index.html'),/noindex/);
  await access(new URL('../dist/404.html',import.meta.url));
  await assert.rejects(access(new URL('../dist/_headers',import.meta.url)));
  execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,CONTEXT:'deploy-preview'}});
});
test('homepage matches required backend field names and preserves spam controls',async()=>{
  const home=await read('index.html');
  for(const field of ['first_name','last_name','business_name','phone','email','message']) assert.match(home,new RegExp('name="'+field+'"[^>]*required'));
  assert.match(home,/name="company_fax"/);
  assert.match(home,/action="\/\.netlify\/functions\/contact"/);
});
test('analytics loads only on production domain and keeps preview clicks silent',async()=>{
 const code=await read('js/analytics.js');
 for(const host of ['localhost','deploy-preview-13--sunny-maamoul-0ec979.netlify.app','snapflowsolutions.com','www.snapflowsolutions.com']){
  const scripts=[]; const location={hostname:host,search:'',href:'https://'+host+'/'};const window={location};
  vm.runInNewContext(code,{window,location,URLSearchParams,sessionStorage:{getItem:()=>null,setItem:()=>{}},document:{referrer:'',addEventListener:()=>{},createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}}});
  assert.equal(scripts.length,host.endsWith('snapflowsolutions.com')?1:0);
 }
});
test('preview contact submit never sends a network request',async()=>{
 let submit,requests=0;const status={};const form={querySelector:()=>({}),addEventListener:(_,fn)=>submit=fn};
 vm.runInNewContext(await read('js/home-contact.js'),{document:{getElementById:id=>id==='business-contact-form'?form:status},location:{hostname:'localhost'},fetch:()=>requests++});
 await submit({preventDefault(){}});assert.equal(requests,0);assert.match(status.textContent,/not sent/);
});
test('production form redirects only after confirmed delivery and recovers on failure',async()=>{
 const code=await read('js/home-contact.js');
 for(const success of [true,false]){
  let submit,redirect='',reset=false;const events=[],status={},button={};
  const form={action:'/.netlify/functions/contact',querySelector:()=>button,reportValidity:()=>true,addEventListener:(_,fn)=>submit=fn};
  class FakeFormData extends Map { constructor(){super([['cf-turnstile-response','test-token'],['email','test@example.com']]);} }
  const location={hostname:'snapflowsolutions.com',assign:url=>redirect=url};
  const document={getElementById:id=>id==='business-contact-form'?form:id==='contact-security'?{appendChild(){}}:status,createElement:()=>({dataset:{}}),head:{appendChild(){}}};
  const window={gtag:(event,name,data)=>{events.push(name);data.event_callback();},turnstile:{reset:()=>reset=true}};
  vm.runInNewContext(code,{window,document,location,FormData:FakeFormData,URLSearchParams,sessionStorage:{getItem:()=>null},setTimeout:()=>{},fetch:async()=>({ok:success,json:async()=>({ok:success})})});
  await submit({preventDefault(){}});
  assert.equal(redirect,success?'/thank-you.html':'');
  assert.deepEqual(events,success?['generate_lead']:[]);
  if(!success){assert.equal(button.disabled,false);assert.equal(reset,true);}
 }
});
