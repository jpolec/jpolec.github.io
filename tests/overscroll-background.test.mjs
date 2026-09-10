import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('the homepage overscroll area uses the footer green', () => {
  assert.match(page, /:global\(html\)\s*\{\s*background:\s*#0d624a;\s*\}/i);
});
