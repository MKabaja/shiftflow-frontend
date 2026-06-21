#!/bin/bash
set -e

HETZNER_USER="root"
HETZNER_HOST="204.168.235.115"
REMOTE_PATH="/var/www/shiftflow-frontend/dist"

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Type check + lint..."
npm run typecheck
npm run lint

echo "🧪 Tests..."
npm run test -- --run

echo "🏗️  Build..."
npm run build

echo "📤 Deploy to Hetzner..."
rsync -avz --delete dist/ ${HETZNER_USER}@${HETZNER_HOST}:${REMOTE_PATH}/

echo "✅ Done — https://shiftflow.duckdns.org"
