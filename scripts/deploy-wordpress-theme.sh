#!/usr/bin/env bash
set -euo pipefail

wp_base_url="${1:-https://gpubsc.xyz}"
wp_theme_zip="${2:-wordpress-theme/gpu-overclock-v2.zip}"
wp_theme_slug="${3:-gpu-overclock-v2}"

if [[ ! -f "$wp_theme_zip" ]]; then
  echo "Theme archive not found: $wp_theme_zip" >&2
  exit 1
fi

read -r -p "WordPress username: " wp_username
read -r -s -p "WordPress password: " wp_password
echo

wp_temp_dir=$(mktemp -d)
wp_cookie_jar="$wp_temp_dir/cookies.txt"
wp_login_page="$wp_temp_dir/login.html"
wp_dashboard="$wp_temp_dir/dashboard.html"
wp_upload_page="$wp_temp_dir/theme-upload.html"
wp_upload_result="$wp_temp_dir/theme-result.html"
wp_activate_result="$wp_temp_dir/theme-activate.html"

cleanup() {
  rm -rf "$wp_temp_dir"
}
trap cleanup EXIT

echo "[1/6] Opening WordPress login..."
curl -fsSL -c "$wp_cookie_jar" "$wp_base_url/wp-login.php" -o "$wp_login_page"

wp_login_url=$(curl -fsSL \
  -b "$wp_cookie_jar" \
  -c "$wp_cookie_jar" \
  --data-urlencode "log=$wp_username" \
  --data-urlencode "pwd=$wp_password" \
  --data-urlencode "wp-submit=Log In" \
  --data-urlencode "redirect_to=$wp_base_url/wp-admin/" \
  --data-urlencode "testcookie=1" \
  -o "$wp_dashboard" \
  -w '%{url_effective}' \
  "$wp_base_url/wp-login.php")

unset wp_password

if [[ "$wp_login_url" != *"/wp-admin/"* ]] || ! rg -q "wp-admin-bar|Dashboard" "$wp_dashboard"; then
  echo "WordPress login failed." >&2
  exit 2
fi

echo "[2/6] Login confirmed. Opening theme uploader..."
curl -fsSL \
  -b "$wp_cookie_jar" \
  -c "$wp_cookie_jar" \
  "$wp_base_url/wp-admin/theme-install.php?browse=featured" \
  -o "$wp_upload_page"

if ! wp_nonce=$(python3 - "$wp_upload_page" <<'PY'
import re
import sys

html = open(sys.argv[1], encoding="utf-8").read()
form = re.search(
    r"<form[^>]+(?:id=[\x22\x27]theme-upload-form[\x22\x27]|action=[\x22\x27][^\x22\x27]*upload-theme[^\x22\x27]*[\x22\x27])[\s\S]*?</form>",
    html,
    re.I,
)
if not form:
    raise SystemExit(1)
field = re.search(r"name=[\x22\x27]_wpnonce[\x22\x27][^>]*value=[\x22\x27]([^\x22\x27]+)", form.group(0), re.I)
if not field:
    field = re.search(r"value=[\x22\x27]([^\x22\x27]+)[\x22\x27][^>]*name=[\x22\x27]_wpnonce[\x22\x27]", form.group(0), re.I)
if not field:
    raise SystemExit(1)
print(field.group(1))
PY
); then
  echo "Could not locate the theme-upload nonce in WordPress admin." >&2
  rg -o '<title>[^<]+' "$wp_upload_page" | head -n 1 >&2 || true
  exit 4
fi

echo "[3/6] Uploading the new theme archive..."
curl -fsSL \
  -b "$wp_cookie_jar" \
  -c "$wp_cookie_jar" \
  -F "_wpnonce=$wp_nonce" \
  -F "themezip=@$wp_theme_zip;type=application/zip" \
  -F "install-theme-submit=Install Now" \
  "$wp_base_url/wp-admin/update.php?action=upload-theme" \
  -o "$wp_upload_result"

echo "[4/6] Reading the installation result..."
if ! wp_activate_url=$(python3 - "$wp_upload_result" "$wp_base_url" "$wp_theme_slug" <<'PY'
import html
import re
import sys
from urllib.parse import urljoin

document = html.unescape(open(sys.argv[1], encoding="utf-8").read())
base = sys.argv[2] + "/wp-admin/"
slug = re.escape(sys.argv[3])
patterns = [
    rf"href=[\x22\x27]([^\x22\x27]*action=activate[^\x22\x27]*stylesheet={slug}[^\x22\x27]*)",
    rf"href=[\x22\x27]([^\x22\x27]*stylesheet={slug}[^\x22\x27]*action=activate[^\x22\x27]*)",
]
for pattern in patterns:
    match = re.search(pattern, document, re.I)
    if match:
        print(urljoin(base, match.group(1)))
        raise SystemExit(0)
raise SystemExit(1)
PY
); then
  echo "Theme upload did not return an activation link." >&2
  rg -o '<div[^>]+class="[^"]*(error|notice)[^"]*"[\s\S]*?</div>' "$wp_upload_result" | head -n 1 >&2 || true
  rg -o '<title>[^<]+' "$wp_upload_result" | head -n 1 >&2 || true
  exit 5
fi

echo "[5/6] Activating $wp_theme_slug..."
curl -fsSL \
  -b "$wp_cookie_jar" \
  -c "$wp_cookie_jar" \
  "$wp_activate_url" \
  -o "$wp_activate_result"

echo "[6/6] Verifying the public homepage..."
curl -fsSL -H 'Cache-Control: no-cache' "$wp_base_url/?gpu_theme_check=2" -o "$wp_temp_dir/home.html"

if ! rg -q "hero-yacht\.webp" "$wp_temp_dir/home.html"; then
  echo "Theme uploaded, but the public homepage did not switch to the new theme." >&2
  exit 3
fi

echo "WordPress deployment successful: $wp_base_url/"
echo "Activated theme: $wp_theme_slug"
