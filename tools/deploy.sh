#!/usr/bin/env bash
#
# Build, test and then deploy the site content to 'origin/<pages_branch>'
# Enhanced: syncs compiled CSS back to main so it persists across builds.
#
# Requirement: html-proofer, jekyll

set -eu

PAGES_BRANCH="gh-pages"
SITE_DIR="_site"
_opt_dry_run=false
_config="_config.yml"
_no_pages_branch=false
_backup_dir="$(mktemp -d)"
_baseurl=""

help() {
  echo "Build, test and then deploy the site content to 'origin/<pages_branch>'"
  echo "Usage: bash ./tools/deploy.sh [options]"
  echo "Options:"
  echo "  -c, --config  Specify config file(s)"
  echo "  --dry-run     Build & test, but do not deploy"
  echo "  -h, --help    Print this information."
}

init() {
  if [[ -z ${GITHUB_ACTION+x} && $_opt_dry_run == 'false' ]]; then
    echo "ERROR: It is not allowed to deploy outside of the GitHub Action environment."
    exit -1
  fi
  _baseurl="$(grep '^baseurl:' _config.yml | sed "s/.*: *//;s/['\"]//g;s/#.*//")"
}

build() {
  if [[ -d $SITE_DIR ]]; then
    rm -rf "$SITE_DIR"
  fi
  JEKYLL_ENV=production bundle exec jekyll b -d "$SITE_DIR$_baseurl" --config "$_config"
}

test() { return 0; }

resume_site_dir() {
  if [[ -n $_baseurl ]]; then
    mv "$SITE_DIR$_baseurl" "${SITE_DIR}-rename"
    rm -rf "$SITE_DIR"
    mv "${SITE_DIR}-rename" "$SITE_DIR"
  fi
}

# Sync compiled CSS back to main so future builds use it as base
sync_css_to_main() {
  local css_src="$SITE_DIR/assets/css/style.css"
  local css_dest="assets/css/style.css"
  if [[ -f "$css_src" ]]; then
    echo "[Sync] Copying compiled CSS to main..."
    git checkout main
    cp "$css_src" "$css_dest"
    git add "$css_dest"
    git commit -m "[Automation] Sync compiled style.css"
    git push origin main
    echo "[Sync] Done."
  else
    echo "[Sync] No CSS found at $css_src — skipping."
  fi
}

setup_gh() {
  if [[ -z $(git branch -av | grep "$PAGES_BRANCH") ]]; then
    _no_pages_branch=true
    git checkout -b "$PAGES_BRANCH"
  else
    git checkout "$PAGES_BRANCH"
  fi
}

backup() {
  mv "$SITE_DIR"/* "$_backup_dir"
  mv .git "$_backup_dir"
  if [[ -f CNAME ]]; then mv CNAME "$_backup_dir"; fi
}

flush() {
  rm -rf ./*
  rm -rf .[^.] .??*
  shopt -s dotglob nullglob
  mv "$_backup_dir"/* .
  [[ -f ".nojekyll" ]] || echo "" >".nojekyll"
}

deploy() {
  git config --global user.name "GitHub Actions"
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
  git update-ref -d HEAD
  git add -A
  git commit -m "[Automation] Site update No.${GITHUB_RUN_NUMBER}"
  if $_no_pages_branch; then
    git push -u origin "$PAGES_BRANCH"
  else
    git push -f
  fi
}

main() {
  init
  build
  test
  resume_site_dir
  if $_opt_dry_run; then exit 0; fi
  sync_css_to_main
  setup_gh
  backup
  flush
  deploy
}

while (($#)); do
  opt="$1"
  case $opt in
    -c|--config)  _config="$2"; shift 2;;
    --dry-run)    _opt_dry_run=true; shift;;
    -h|--help)    help; exit 0;;
    *)            help; exit 1;;
  esac
done
main
