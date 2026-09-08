import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('jakubpolec.com uses only its dedicated consent-gated GA4 property', () => {
  const layout = read('src/layouts/SimpleLayout.astro');
  const loader = read('public/qj-analytics.js');
  assert.match(layout, /G-T0TQ8M1WQ6/);
  assert.match(layout, /jakubpolec\.com,www\.jakubpolec\.com/);
  assert.doesNotMatch(layout, /G-N26N8E911J/);
  assert.match(loader, /analytics_storage: "denied"/);
  assert.match(loader, /consent === "granted"/);
  assert.match(loader, /`\$\{url\.origin\}\$\{url\.pathname\}`/);
  assert.match(read('src/pages/privacy.astro'), /Google Analytics/);
});
