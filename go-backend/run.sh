#!/bin/bash

# Start the Go backend service locally with your GitHub PAT
# Usage: GITHUB_TOKEN=ghp_xxxx ./run.sh

export GITHUB_USERNAME="${GITHUB_USERNAME:-Ashish5180}"
export PORT="${PORT:-8080}"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️  GITHUB_TOKEN is not set. Export it before running:"
  echo "   export GITHUB_TOKEN=ghp_your_personal_access_token"
  echo ""
  echo "   Generate one at: https://github.com/settings/tokens"
  echo "   Scopes needed:   read:user, repo (public only)"
  exit 1
fi

echo "🔧 Building Go service..."
go build -o portfolio-backend .

echo "🚀 Starting service on :${PORT}"
./portfolio-backend
