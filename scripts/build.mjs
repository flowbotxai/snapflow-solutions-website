import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
const production = process.env.CONTEXT === 'production';
const publishable = new Set(['index.html','websites-landing-pages/index.html','paid-advertising/index.html','seo-ai-search/index.html','customer-communication/index.html','customer-management-admin-automation/index.html','data-analysis-reporting/index.html']);
await rm(out, { recursive: true, force: true });
await mkdir(out);
const assets = new Set(['assets','css','js','campaign']);
for (const item of await readdir(root, { withFileTypes: true })) {
  if (production && /^newsletter-(template|welcome)-preview\.html$/.test(item.name)) continue;
  if (assets.has(item.name) || (!item.isDirectory() && (/\.html$/.test(item.name) || ['robots.txt','sitemap.xml','_redirects'].includes(item.name)))) {
    await cp(resolve(root,item.name),resolve(out,item.name),{recursive:true});
  } else if (item.isDirectory() && !item.name.startsWith('.') && !['dist','scripts','test','netlify'].includes(item.name)) {
    // Only public page folders; never ship source docs or backend code.
    const entries = await readdir(resolve(root,item.name));
    if (entries.includes('index.html')) await cp(resolve(root,item.name),resolve(out,item.name),{recursive:true});
  }
}
async function processPages(dir, prefix='') {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const rel = prefix + entry.name;
    const file = resolve(dir,entry.name);
    if (entry.isDirectory()) { await processPages(file,rel+'/'); continue; }
    if (!entry.name.endsWith('.html')) continue;
    let html = await readFile(file,'utf8');
    if (!production) {
      html = html.replace(/<meta\s+name="robots"[^>]*>/gi,'');
      html = html.replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
    } else {
      if (publishable.has(rel)) html = html.replace(/<meta\s+name="robots"[^>]*>/gi,'');
      html = html.replace(/<div class="sample-notice">[\s\S]*?<\/div>/g,'');
    }
    // Newsletter remains reviewable in previews; enable only after live delivery is verified.
    if (production && process.env.NEWSLETTER_ENABLED !== 'true' && rel === 'index.html') {
      html = html.replace(/<section class="sf-newsletter"[\s\S]*?<\/section>/, '');
      html = html.replace(/<script src="\/js\/newsletter\.js[^"]*"><\/script>/, '');
    }
    // Add the same native GHL assistant to public pages, excluding confirmations,
    // setup guides and draft email previews. Analytics remains production-host gated.
    if (!/thank-you|404|getting-started|pdr-|newsletter-.*preview/.test(rel)) {
      html = html.replace('</body>', '<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6af20647f85761a3b63d86a6" defer></script><script src="/js/chat-greeting.js?v=20261109-2" defer></script></body>');
    }
    // OTTO is limited to indexable general-service production pages.
    // Keep previews, forms, confirmations and the separate PDR product untouched.
    if (production && !/thank-you|404|getting-started|pdr-|newsletter-.*preview|client-|project-request|campaign\//.test(rel) && !/<meta\s+name="robots"[^>]*noindex/i.test(html)) {
      html = html.replace('</head>', '<script nowprocket nitro-exclude type="text/javascript" id="sa-dynamic-optimization" data-uuid="4b073fac-30d3-4bc5-91d9-d745096dfd8a" src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"></script></head>');
    }
    await writeFile(file,html);
  }
}
await processPages(out);
if (!production) await writeFile(resolve(out,'_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n');
console.log(`Prepared ${production ? 'production' : 'noindex preview'} output in dist.`);
