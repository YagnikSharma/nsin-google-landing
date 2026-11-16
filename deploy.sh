#!/usr/bin/env bash
# Deploy this site (and the real NSIN web app at /app/) to Firebase Hosting.
# Run in Google Cloud Shell, after the API is deployed to Cloud Run (see the code repo's docs/GOOGLE_CLOUD_SETUP.md):
#   bash deploy.sh
set -euo pipefail
PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null)}"
REGION="${REGION:-asia-south1}"
SERVICE="${SERVICE:-nsin-api}"
cd "$(dirname "$0")"

API_URL="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(status.url)' 2>/dev/null || true)"
if [[ -z "${API_URL}" ]]; then
  echo "No Cloud Run service '${SERVICE}' found in ${REGION}. The site will deploy in recorded mode." >&2
fi

echo "==> Building the site"
npm ci --no-audit --no-fund
npm run build
# The landing page and the app read the API URL from here at start-up (no rebuild when it changes).
printf '{"apiUrl": "%s", "appUrl": "/app/"}\n' "${API_URL}" > dist/live.json

echo "==> Deploying to Firebase Hosting (project ${PROJECT_ID})"
firebase projects:addfirebase "${PROJECT_ID}" >/dev/null 2>&1 || true   # once per project
firebase deploy --only hosting --project "${PROJECT_ID}"
echo
echo "Live at https://${PROJECT_ID}.web.app  (the app is at /app/)"
