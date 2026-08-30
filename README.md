# Jakub Polec Personal Website

Source for [jakubpolec.com](https://jakubpolec.com), built with [Astro](https://astro.build/).

`main` contains the source. The public static build is published to the separate
`gh-pages` branch and served behind Cloudflare. GitHub Actions is intentionally
not part of the deployment path.

## Local development

```bash
npm install
npm run dev
```

## Publish

Commit and push the source first, then run:

```bash
./deploy.sh
```

The script builds `dist/`, preserves the `CNAME` and `.nojekyll` deployment
metadata, publishes only generated files to `gh-pages`, and removes its
temporary worktree afterwards.

To inspect the generated deployment diff without publishing:

```bash
./deploy.sh --dry-run
```

The equivalent npm commands are `npm run deploy` and `npm run deploy:dry-run`.

The custom domain is `jakubpolec.com`; GitHub remains the source-control and
static-publication repository, while Cloudflare fronts the public site.
