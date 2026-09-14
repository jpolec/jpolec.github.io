// Server-side only: never import this module into the public Astro build.
const PAGE = `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive"><title>Private — Jakub Połeć</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#0a1324;color:#edf2fa;font:17px/1.6 system-ui,sans-serif}
main{max-width:1040px;margin:auto;padding:64px 24px}header{display:flex;justify-content:space-between;gap:24px;align-items:center}
.brand{font-weight:650;color:inherit;text-decoration:none}.badge{font:12px ui-monospace,monospace;letter-spacing:.1em;border:1px solid #35435a;border-radius:30px;padding:7px 13px}
h1{font-size:clamp(36px,6vw,64px);letter-spacing:-.05em;margin:64px 0 8px;line-height:1.12}
.intro{color:#aebbd0;margin:0 0 38px}.cards{display:grid;gap:16px}
.card{display:grid;grid-template-columns:1fr auto;gap:12px;padding:25px 28px;border:1px solid #2c3c55;border-radius:12px;background:#101e34;text-decoration:none;color:inherit}
.card:hover{border-color:#91b8ef;background:#162942}.card:focus-visible{outline:3px solid #91b8ef;outline-offset:4px}
h2{font-size:23px;line-height:1.3;margin:0 0 6px}.card p{margin:0;color:#b8c5d8;font-size:16px}
.arrow{align-self:center;font-size:28px;color:#91b8ef}.note{font-size:14px;color:#aebbd0;margin-top:28px}
@media(max-width:600px){main{padding:28px 18px}.card{padding:22px}h1{margin-top:44px}}
</style></head><body><main>
<header><a class="brand" href="/">Jakub Połeć</a><span class="badge">PRIVATE</span></header>
<h1>Twoje panele.<br>W jednym miejscu.</h1>
<p class="intro">Skróty do administracji QuantJourney.</p>
<nav class="cards" aria-label="Panele administracyjne">
<a class="card" href="https://quantjourney.cloud/hire-admin/" target="_blank" rel="noopener noreferrer"><div><h2>Rekrutacja</h2><p>Zgłoszenia kandydatów, CV i statusy rozmów.</p></div><span class="arrow" aria-hidden="true">↗</span></a>
<a class="card" href="https://quant-interviews.quantjourney.cloud/book-admin" target="_blank" rel="noopener noreferrer"><div><h2>Quant Interviews</h2><p>Panel administracyjny książki i zamówień.</p></div><span class="arrow" aria-hidden="true">↗</span></a>
<a class="card" href="https://agents.quantjourney.cloud/agents/admin" target="_blank" rel="noopener noreferrer"><div><h2>Agents</h2><p>Klienci, aktywność i zarządzanie dostępem.</p></div><span class="arrow" aria-hidden="true">↗</span></a>
</nav>
<p class="note">Każdy panel ma własne logowanie. Ta strona nie przekazuje do niego hasła ani nie omija jego zabezpieczeń.</p>
</main></body></html>`;

const encoder = new TextEncoder();
const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  "Content-Type": "text/html; charset=utf-8",
};
async function digest(value) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}
async function equal(candidate, expected) {
  const [a, b] = await Promise.all([digest(candidate), digest(expected)]);
  let different = 0;
  for (let i = 0; i < a.length; i++) different |= a[i] ^ b[i];
  return different === 0;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const reply = (body, status, extra = {}) => new Response(
      request.method === "HEAD" ? null : body, {status, headers: {...headers, ...extra}},
    );
    if (!["jakubpolec.com", "www.jakubpolec.com"].includes(url.hostname) ||
        !["/private", "/private/", "/private/index.html"].includes(url.pathname)) {
      return reply("Not found.", 404);
    }
    if (url.protocol !== "https:") return reply("HTTPS required.", 403);
    if (!["GET", "HEAD"].includes(request.method)) return reply("Method not allowed.", 405, {Allow: "GET, HEAD"});
    if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 8 || !env.AUTH_LIMITER) {
      return reply("Private access is not configured.", 503);
    }
    try {
      const key = Array.from(await digest(request.headers.get("CF-Connecting-IP") || "unknown"))
        .map(n => n.toString(16).padStart(2, "0")).join("");
      if (!(await env.AUTH_LIMITER.limit({key})).success) {
        return reply("Too many attempts. Try again shortly.", 429, {"Retry-After": "60"});
      }
    } catch {
      return reply("Private access is temporarily unavailable.", 503);
    }
    let supplied = "";
    const authorization = request.headers.get("Authorization") || "";
    if (authorization.length < 1024 && /^Basic /i.test(authorization)) {
      try {
        supplied = new TextDecoder("utf-8", {fatal: true}).decode(
          Uint8Array.from(atob(authorization.slice(6)), c => c.charCodeAt(0)),
        );
      } catch { /* Reject malformed credentials without reflecting them. */ }
    }
    if (!supplied || !await equal(supplied, env.ADMIN_USERNAME + ":" + env.ADMIN_PASSWORD)) {
      return reply("Administrator login required.", 401, {
        "WWW-Authenticate": 'Basic realm="Jakub Polec Private", charset="UTF-8"',
      });
    }
    return reply(PAGE, 200);
  },
};
