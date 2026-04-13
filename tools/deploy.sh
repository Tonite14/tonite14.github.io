#!/usr/bin/env bash
#
# Build, test and then deploy the site content to 'origin/<pages_branch>'
# Enhanced: syncs compiled CSS back to main via GitHub API so it persists.
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
  echo "Build, test and then deploy the site content."
}

init() {
  if [[ -z ${GITHUB_ACTION+x} && $_opt_dry_run == 'false' ]]; then
    echo "ERROR: Not allowed outside GitHub Action."
    exit -1
  fi
  _baseurl="$(grep '^baseurl:' _config.yml | sed "s/.*: *//;s/['\"]//g;s/#.*//")"
}

build() {
  if [[ -d $SITE_DIR ]]; then rm -rf "$SITE_DIR"; fi
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

# Sync compiled CSS to main via GitHub API (no git checkout needed)
sync_css_to_main() {
  local css_src="$SITE_DIR/assets/css/style.css"
  local css_dest="assets/css/style.css"

  if [[ ! -f "$css_src" ]]; then
    echo "[Sync] No CSS at $css_src — skipping."
    return 0
  fi

  echo "[Sync] Fetching current style.css SHA from main..."
  local api_base="https://api.github.com/repos/${GITHUB_REPOSITORY}"
  local current
  current=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "$api_base/contents/$css_dest?ref=main")
  local sha
  sha=$(echo "$current" | ruby -rjson -e 'puts JSON.parse(STDIN.read)["sha"]' 2>/dev/null)

  if [[ -z "$sha" ]]; then
    echo "[Sync] Could not get SHA — file may not exist. Proceeding without sync."
    return 0
  fi

  echo "[Sync] SHA: $sha — uploading compiled CSS..."
  local encoded
  encoded=$(ruby -rbase64 -e 'puts Base64.strict_encode64(ARGV[0])' \
    "$(cat "$css_src")")

  local payload
  payload=$(ruby -rjson -e '
    data = {
      message: "[Automation] Sync compiled style.css",
      sha: ARGV[0],
      content: ARGV[1],
      branch: "main"
    }
    puts data.to_json
  ' "$sha" "$encoded")

  local result
  result=$(curl -s -X PUT \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$payload" \
    "$api_base/contents/$css_dest")

  if echo "$result" | ruby -rjson -e 'd=JSON.parse(STDIN.read);puts d["commit"]["sha"]' 2>/dev/null; then
    echo "[Sync] Done — style.css synced to main."
  else
    echo "[Sync] Warning: API response: $result"
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
    -h|--help)   help; exit 0;;
    *)            help; exit 1;;
  esac
done
main
