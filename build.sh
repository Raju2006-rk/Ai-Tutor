#!/usr/bin/env bash
# ============================================================
# build.sh — pre-compile the JSX sources in js/ into a single
# app.js bundle so the browser loads fast (no in-browser Babel).
#
# Requires: tsc (TypeScript) on PATH.
# Usage:    ./build.sh
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/src" "$WORK/out"

# Source files in load order (must match dependency order).
FILES=(
  js/data.js
  js/store.js
  js/speech.js
  js/docExtract.js
  js/llmProvider.js
  js/aiEngine.js
  js/components/UI.js
  js/components/Nav.js
  js/screens/Onboarding.js
  js/screens/Home.js
  js/screens/Chat.js
  js/screens/Quiz.js
  js/screens/Progress.js
  js/screens/Profile.js
  js/App.js
)

# Copy with numeric prefixes (preserve order) and .tsx extension for JSX.
i=0
for f in "${FILES[@]}"; do
  i=$((i+1))
  cp "$f" "$WORK/src/$(printf '%02d' "$i")_$(basename "${f%.js}").tsx"
done

# Transpile JSX -> JS. Type errors are expected (browser-global style) and
# are ignored; tsc still emits valid JS. '|| true' keeps the build going.
tsc "$WORK"/src/*.tsx \
  --jsx react \
  --target ES2019 \
  --module none \
  --outDir "$WORK/out" \
  --skipLibCheck \
  --removeComments false \
  >/dev/null 2>&1 || true

OUT="$ROOT/app.js"
{
  echo "/* ============================================================"
  echo "   app.js — PRE-COMPILED bundle (do not edit by hand)."
  echo "   Generated from js/ with JSX compiled to React.createElement,"
  echo "   so the browser needs NO Babel and makes ONE request."
  echo "   Regenerate with: ./build.sh"
  echo "   ============================================================ */"
  # Each file wrapped in an IIFE to mirror the per-script scope the"
  # original type=text/babel tags provided (shared state only via window.*).
  for f in $(ls "$WORK"/out/*.js | sort); do
    echo ""
    echo "/* ---------- $(basename "$f") ---------- */"
    echo "(function(){"
    cat "$f"
    echo ""
    echo "})();"
  done
  echo ""
  echo "/* ---------- mount ---------- */"
  echo "(function(){"
  echo "  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(window.App));"
  echo "})();"
} > "$OUT"

echo "Built $OUT ($(wc -l < "$OUT") lines, $(du -h "$OUT" | cut -f1))"
