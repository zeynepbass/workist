#!/usr/bin/env bash
set -euo pipefail

files=$(git ls-files | grep -vE '(^|/)package-lock\.json$|\.(png|jpe?g|gif|webp|ico|svg)$')
status=0

report() {
  echo "::error::$1"
  status=1
}

if echo "$files" | grep -qE '\.tsx?$'; then
  report "TypeScript files found"
fi

if echo "$files" | grep -E '(^|/)package\.json$' | xargs grep -l '"typescript"' >/dev/null 2>&1; then
  report "typescript dependency found"
fi

if echo "$files" | grep -E '\.(js|mjs|cjs)$' | xargs grep -n 'console\.' ; then
  report "console usage found"
fi

if echo "$files" | grep -E '\.(js|mjs|cjs)$' | xargs grep -nE '^\s*(//|/\*)' ; then
  report "comment lines found"
fi

exit $status
