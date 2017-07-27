#!/bin/sh

set -eu

cd "$(dirname "$0")"

[ $# = 2 ] || exit 1
url="$1"
filename="$2"

cd public/cache

# ダウンロード
if [ -f ".$filename" ] || [ -f "$filename" ]; then
  echo '一時ファイルまたはキャッシュ済みファイルが存在します' >&2
  exit 1
fi
curl -o ".$filename" -fsSL "$1"
mv ".$filename" "$filename"

# 世代管理 (10 世代以上は削除)
ls -t | tail -n +11 | xargs --no-run-if-empty rm -f
