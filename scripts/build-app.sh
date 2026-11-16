#!/usr/bin/env bash
# Builds the real NSIN web app (from the code repo) into public/app/, so this site serves it at /app/.
# The hosted app reads its API URL from /live.json at start-up, so a new Cloud Run URL needs no rebuild.
#   WEB_APP=<path to Task_Force_141_Google_Startup_Buildathon_India_2026/src/web-app> bash scripts/build-app.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_APP="${WEB_APP:-$ROOT/../Task_Force_141_Google_Startup_Buildathon_India_2026/src/web-app}"
export NSIN_APP_OUT="$ROOT/public/app"
cd "$WEB_APP"
[ -d node_modules ] || npm ci --no-audit --no-fund
# Vite's Node API, so no shell rewrites the "/app/" base path (Git Bash does).
node --input-type=module -e "
process.env.VITE_LIVE_CONFIG = '/live.json';
const { build } = await import('vite');
await build({ base: '/app/', logLevel: 'warn', build: { outDir: process.env.NSIN_APP_OUT, emptyOutDir: true } });"
echo "Built the web app into $NSIN_APP_OUT"
