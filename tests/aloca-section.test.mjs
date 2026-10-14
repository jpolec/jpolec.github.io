import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('the Aloca section sits between published work and the personal side', () => {
  const published = page.indexOf('class="large-section published-section"');
  const aloca = page.indexOf('<section class="aloca-section"');
  const personal = page.indexOf('<section class="personal-section"');

  assert.ok(published >= 0 && aloca >= 0 && personal >= 0);
  assert.ok(published < aloca && aloca < personal);

  const section = page.slice(aloca, personal);
  assert.match(section, />Second Brain for AI</);
  assert.match(section, /Your knowledge\. Your relationships\.<br \/>One connected memory for your AI\./);
  assert.match(section, /class="aloca-logo"[^>]*><span aria-hidden="true"><\/span>ALOCA</);
  assert.match(section, /href="https:\/\/aloca\.io\/"/);
});
