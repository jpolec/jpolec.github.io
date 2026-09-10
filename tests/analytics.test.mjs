import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('jakubpolec.com uses its dedicated GA4 property without cookies or a consent banner', () => {
  const layout = read('src/layouts/SimpleLayout.astro');
  const loader = read('public/qj-analytics.js');
  assert.match(layout, /G-T0TQ8M1WQ6/);
  assert.match(layout, /jakubpolec\.com,www\.jakubpolec\.com/);
  assert.doesNotMatch(layout, /G-N26N8E911J/);
  assert.match(loader, /analytics_storage: "denied"/);
  assert.doesNotMatch(loader, /analytics_storage: "granted"/);
  assert.doesNotMatch(loader, /renderPrompt|Accept analytics|Max-Age=15552000/);
  assert.match(loader, /allow_google_signals: false/);
  assert.match(loader, /ads_data_redaction", true/);
  assert.match(loader, /`\$\{url\.origin\}\$\{url\.pathname\}`/);
  assert.match(read('src/pages/privacy.astro'), /cookieless mode/);
  assert.doesNotMatch(layout, /qj-analytics\.css/);
});
