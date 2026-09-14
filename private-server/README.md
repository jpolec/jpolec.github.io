# Private operator directory

This is a server-side Cloudflare Worker, NOT an Astro page or a JavaScript
password overlay. Do not copy its HTML to public/ or dist/.
No Cloudflare deployment has been performed yet.

The existing public GitHub Pages site remains unchanged. Only /private* is
routed to this Worker, which accepts three exact paths and refuses all others.
The page never receives or forwards administrator passwords.

Deploy only with access to the Cloudflare account containing jakubpolec.com:

1. Run the tests: node --test tests/private-server.test.mjs
2. From private-server/, deploy with Wrangler to the correct account.
   Until BOTH secrets are configured, the Worker returns 503 (closed).
3. Set ADMIN_USERNAME and ADMIN_PASSWORD with wrangler secret put.
   Enter their values interactively; never commit credentials.
4. Verify anonymous and wrong-password requests return 401, and authenticated
   GET requests return 200. Also check /private/, /private/index.html and HEAD.
5. Verify rate limiting, no-store headers, no public static copy and all links.

Same credentials across domains do not create SSO. Each service authenticates
independently. A weak reused password remains a risk even with rate limiting.
The 10/min limiter is per Cloudflare location, not a global brute-force guarantee.

To roll back, remove only these Worker routes, leaving the public domain intact.
Implementation references:
- https://developers.cloudflare.com/workers/examples/basic-auth/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
