import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('public pages use the current Michigan phone and location', async () => {
  const pages = await Promise.all([
    read('index.html'),
    read('service-area/index.html'),
    read('local-seo/index.html'),
  ]);
  const publicCopy = pages.join('\n');

  assert.match(publicCopy, /Clinton Township/);
  assert.match(publicCopy, /\+1-586-400-2943|\+15864002943/);
  assert.doesNotMatch(publicCopy, /423[- )]208[- ]9982/);
  assert.doesNotMatch(publicCopy, /Ringgold|Chattanooga/i);
});

test('retired Georgia campaign URLs permanently redirect to current pages', async () => {
  const redirects = await read('_redirects');

  assert.match(redirects, /^\/ai-lead-capture\/\* \/operations-automation\/ 301!$/m);
  assert.match(redirects, /^\/ai-search-visibility\/\* \/local-seo\/ 301!$/m);
  assert.match(redirects, /^\/about\/\* \/ 301!$/m);
  assert.match(redirects, /^\/chattanooga\/\* \/service-area\/ 301!$/m);
  assert.match(redirects, /^\/ringgold\/\* \/service-area\/ 301!$/m);
});

test('national service scope preserves the real Michigan business location', async () => {
  const home = await read('index.html');
  const serviceArea = await read('service-area/index.html');

  assert.match(home, /"@id": "https:\/\/snapflowsolutions\.com\/#business"/);
  assert.match(home, /"addressLocality": "Clinton Township"/);
  assert.match(home, /"@type": "Country", "name": "United States"/);
  assert.match(serviceArea, /Better systems for service businesses nationwide/);
  assert.doesNotMatch(serviceArea, /Growth systems for Metro Detroit|across Macomb and Oakland/);
  assert.doesNotMatch(home, /where we&rsquo;re most useful/);
});

test('national commercial pages and regional landing page have distinct positioning', async () => {
  const home = await read('index.html');
  const localSeo = await read('local-seo/index.html');

  const regional = await read('metro-detroit/index.html');
  assert.match(home, /<title>Marketing, Automation &amp; AI Nationwide \| Snap Flow Solutions<\/title>/);
  assert.match(localSeo, /<title>Local SEO for Service Businesses Nationwide \| Snap Flow<\/title>/);
  assert.match(regional, /Growth systems for Metro Detroit service businesses/);
  assert.match(regional, /rel="canonical" href="https:\/\/snapflowsolutions\.com\/metro-detroit\/"/);
});
