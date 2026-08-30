#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./deploy.sh [--dry-run]

Builds the Astro site and publishes the generated dist/ directory to the
repository's gh-pages branch. Cloudflare serves the public custom domain from
that published branch.

Options:
  --dry-run  Build and show the prospective gh-pages changes without pushing.
  -h, --help Show this help.
EOF
}

dry_run=false
case "${1:-}" in
  '') ;;
  --dry-run) dry_run=true ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
deploy_worktree=""

cleanup() {
  if [[ -n "${deploy_worktree}" && -d "${deploy_worktree}" ]]; then
    git -C "${repo_root}" worktree remove --force "${deploy_worktree}" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

for command_name in git npm rsync mktemp; do
  require_command "${command_name}"
done

cd "${repo_root}"

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Refusing to deploy: run this script from the main branch." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing to deploy: commit or stash local changes first." >&2
  exit 1
fi

if [[ ! -f "${repo_root}/CNAME" ]]; then
  echo "Missing CNAME; refusing to publish without the custom-domain file." >&2
  exit 1
fi

echo "[jakubpolec-deploy] Building Astro site"
npm run build

if [[ ! -f "${repo_root}/dist/index.html" ]]; then
  echo "Build did not produce dist/index.html." >&2
  exit 1
fi

echo "[jakubpolec-deploy] Fetching gh-pages"
git fetch origin gh-pages

deploy_worktree="$(mktemp -d "${TMPDIR:-/tmp}/jakubpolec-gh-pages.XXXXXX")"
rmdir "${deploy_worktree}"
git worktree add --detach "${deploy_worktree}" origin/gh-pages

# These two files are deployment-domain metadata, not Astro build output.
[[ -f "${deploy_worktree}/CNAME" ]] || cp "${repo_root}/CNAME" "${deploy_worktree}/CNAME"
touch "${deploy_worktree}/.nojekyll"

rsync_args=(--archive --delete --exclude .git --exclude CNAME --exclude .nojekyll)

if [[ "${dry_run}" == true ]]; then
  echo "[jakubpolec-deploy] Dry run — no branch will be changed"
  rsync -ain "${rsync_args[@]}" "${repo_root}/dist/" "${deploy_worktree}/"
  exit 0
fi

echo "[jakubpolec-deploy] Publishing generated files to gh-pages"
rsync -a "${rsync_args[@]}" "${repo_root}/dist/" "${deploy_worktree}/"

git -C "${deploy_worktree}" add -A
if git -C "${deploy_worktree}" diff --cached --quiet; then
  echo "[jakubpolec-deploy] gh-pages already matches dist/; nothing to publish"
  exit 0
fi

source_revision="$(git rev-parse --short HEAD)"
git -C "${deploy_worktree}" commit -m "Deploy personal site from ${source_revision}"
git -C "${deploy_worktree}" push origin HEAD:gh-pages

echo "[jakubpolec-deploy] Published gh-pages from ${source_revision}"
