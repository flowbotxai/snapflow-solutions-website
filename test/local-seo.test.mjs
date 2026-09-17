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
  assert.match(publicCopy, /\+1-586-310-9494|\+15863109494/);
  assert.doesNotMatch(publicCopy, /423[- )]208[- ]9982/);
  assert.doesNotMatch(publicCopy, /Ringgold|Chattanooga/i);
});

test('retired Georgia campaign URLs permanently redirect to current pages', async () => {
  const redirects = await read('_redirects');

  assert.match(redirects, /^\/ai-lead-capture\/\* \/operations-automation\/ 301!$/m);
  assert.match(redirects, /^\/chattanooga\/\* \/service-area\/ 301!$/m);
  assert.match(redirects, /^\/ringgold\/\* \/service-area\/ 301!$/m);
});

test('local entity markup names the primary Michigan market', async () => {
  const home = await read('index.html');
  const serviceArea = await read('service-area/index.html');

  assert.match(home, /"@id": "https:\/\/snapflowsolutions\.com\/#business"/);
  assert.match(home, /"name": "Macomb County"/);
  assert.match(home, /"name": "Oakland County"/);
  assert.match(serviceArea, /Metro Detroit/);
  assert.match(serviceArea, /meta name="geo\.placename" content="Clinton Township"/);
});
