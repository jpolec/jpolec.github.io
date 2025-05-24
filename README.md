# 🌐 Jakub Polec Personal Website (Astro)

This is the source code for [https://jakubpolec.com](https://jakubpolec.com), built using the [Astro](https://astro.build/) static site generator.

The site is deployed automatically via GitHub Actions to GitHub Pages from the `main` branch.

origin  https://github.com/jpolec/jpolec.github.io.git (fetch)
origin  https://github.com/jpolec/jpolec.github.io.git (push)

Update repo:

```bash
git status
git add .
git commit -m "next"
git push origin main
```

---

## 🔧 Local Development

To start the development server locally:

```bash
npm install
npm run dev
This runs the site at http://localhost:4321 by default.

## 🚀 Deployment

This site is automatically deployed using a custom GitHub Actions workflow (`deploy-astro.yml`) that builds the site with Astro and publishes it to GitHub Pages.

- Live site: https://jakubpolec.com
- Deployment method: GitHub Actions
- Branch: `main`
- DNS: Managed via Hostinger
- Custom domain: `jakubpolec.com`
- HTTPS: Enforced (once DNS for `www.` is fixed)

⚠️ Note: GitHub Pages source **must be set to GitHub Actions**, not `main`, to avoid Jekyll conflicts.


## 🌐 Custom Domain Setup

The site is served at [https://jakubpolec.com](https://jakubpolec.com), using GitHub Pages and DNS managed via Hostinger.

DNS Records:
- A records (`@`) point to GitHub Pages IPs:
  - 185.199.108.153, .109.153, .110.153, .111.153
- CNAME record (`www`) → `jpolec.github.io`

Enforce HTTPS is enabled once DNS is valid.

📁 Project Structure

/
├── public/               # Static assets (favicon, etc.)
├── src/
│   ├── layouts/          # Page templates
│   └── pages/            # Routes (e.g. index.astro)
├── astro.config.mjs      # Astro configuration
├── package.json
└── tsconfig.json
✅ Status

✅ GitHub Actions enabled
✅ GitHub Pages configured with custom domain
✅ HTTPS enforced
✅ Fully automated deployments from main branch
🧠 Notes

Template repository: Not enabled (optional)
Issues, Wikis, Discussions: Managed via GitHub if enabled in repo settings