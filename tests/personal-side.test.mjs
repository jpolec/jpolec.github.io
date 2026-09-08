import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('personal side lists the selected interests before the engagement section', () => {
  const personal = page.indexOf('class="personal-section"');
  const engagement = page.indexOf('id="work-with-me"');

  assert.ok(personal >= 0);
  assert.ok(personal < engagement);

  for (const interest of ['Padel', 'Diving', 'Action movies', 'Puzzles', 'Foodie', 'Travel', 'My cocker spaniel']) {
    assert.match(page, new RegExp(`>${interest}<`, 'i'));
  }
});

test('the cocker photo opens in an accessible in-page dialog', () => {
  assert.match(page, /aria-haspopup="dialog"/);
  assert.match(page, /aria-controls="cocker-dialog"/);
  assert.match(page, /<dialog id="cocker-dialog"/);
  assert.match(page, /cockerDialog\.showModal\(\)/);
  assert.match(page, /addEventListener\('cancel'/);
  assert.match(page, /event\.target === cockerDialog/);
  assert.ok(existsSync(new URL('../public/cocker-spaniel.webp', import.meta.url)));
});
