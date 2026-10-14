import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('the Aloca badge stays fixed in the bottom-right corner', () => {
  const badge = page.indexOf('<a class="aloca-badge"');
  assert.ok(badge > page.indexOf('</main>'), 'badge sits outside the page flow');
  assert.ok(!page.includes('aloca-section'), 'the earlier in-page section is gone');

  const markup = page.slice(badge, page.indexOf('</a>', badge));
  assert.match(markup, /href="https:\/\/aloca\.io\/"/);
  assert.match(markup, /src="\/aloca-astronaut\.webp"/);
  assert.match(markup, /class="aloca-logo"><span aria-hidden="true"><\/span>ALOCA</);
  assert.match(markup, />One connected memory for your AI\.</);

  assert.match(page, /\.aloca-badge \{ position: fixed;[^}]*right: 20px; bottom:/);
  assert.ok(existsSync(new URL('../public/aloca-astronaut.webp', import.meta.url)));
});
