import test from "node:test";
import assert from "node:assert/strict";
import worker from "../private-server/worker.mjs";

const env = {ADMIN_USERNAME: "jpadmin", ADMIN_PASSWORD: "testpass",
  AUTH_LIMITER: {limit: async () => ({success: true})}};
function request(path = "/private", credentials, method = "GET") {
  return new Request("https://jakubpolec.com" + path, {method,
    headers: credentials ? {Authorization: "Basic " + btoa(credentials)} : {}});
}
test("no page or links without correct credentials", async () => {
  for (const credentials of [undefined, "jpadmin:wrong", "wrong:testpass"]) {
    const r = await worker.fetch(request("/private", credentials), env);
    assert.equal(r.status, 401);
    assert.ok(r.headers.get("WWW-Authenticate"));
    assert.equal((await r.text()).includes("hire-admin"), false);
    assert.match(r.headers.get("Cache-Control"), /no-store/);
  }
});
test("all directory aliases are protected and valid login works", async () => {
  for (const path of ["/private", "/private/", "/private/index.html"]) {
    assert.equal((await worker.fetch(request(path), env)).status, 401);
    const r = await worker.fetch(request(path, "jpadmin:testpass"), env);
    assert.equal(r.status, 200);
    const html = await r.text();
    for (const target of ["hire-admin", "book-admin", "agents/admin"]) assert.ok(html.includes(target));
    assert.ok(!html.includes("testpass"));
    assert.match(r.headers.get("X-Robots-Tag"), /noindex/);
  }
});
test("failure cases remain closed", async () => {
  assert.equal((await worker.fetch(request(), {})).status, 503);
  assert.equal((await worker.fetch(request(), {...env, AUTH_LIMITER: undefined})).status, 503);
  assert.equal((await worker.fetch(request(), {...env, AUTH_LIMITER: {limit: async () => ({success: false})}})).status, 429);
  assert.equal((await worker.fetch(request("/private-other"), env)).status, 404);
  assert.equal((await worker.fetch(request("/"), env)).status, 404);
  assert.equal((await worker.fetch(request("/private", "jpadmin:testpass", "POST"), env)).status, 405);
});
test("HEAD cannot disclose the page; malformed Basic is rejected", async () => {
  assert.equal((await worker.fetch(request("/private", undefined, "HEAD"), env)).status, 401);
  const r = await worker.fetch(request("/private", "jpadmin:testpass", "HEAD"), env);
  assert.equal(r.status, 200);
  assert.equal(await r.text(), "");
  assert.equal((await worker.fetch(new Request("https://jakubpolec.com/private",
    {headers: {Authorization: "Basic invalid!"}}), env)).status, 401);
});
