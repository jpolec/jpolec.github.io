import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('the homepage has no Aloca promotion', () => {
  assert.doesNotMatch(page, /aloca-badge|aloca\.io|aloca-astronaut/);
});
