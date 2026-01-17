#!/bin/bash
# Pre-flight validation for npm monorepo publishing

set -e

echo "🔍 Running pre-flight checks..."

# Check npm authentication
echo "1/5 Checking npm authentication..."
if ! npm whoami &>/dev/null; then
  echo "❌ Not authenticated. Run: npm login"
  exit 1
fi
USERNAME=$(npm whoami)
echo "✅ Authenticated as: $USERNAME"

# Check working directory
echo "2/5 Verifying Lerna monorepo..."
if [ ! -f "lerna.json" ]; then
  echo "❌ Not a Lerna monorepo (lerna.json not found)"
  exit 1
fi
echo "✅ Lerna configuration found"

# Check git state
echo "3/5 Checking git state..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
echo "Current branch: $CURRENT_BRANCH"

if [[ "$CURRENT_BRANCH" =~ ^release/ ]]; then
  echo "⚠️  Warning: On release branch. Consider switching to main/master."
fi

# Check for uncommitted changes (non-blocking, just warning)
if ! git diff-index --quiet HEAD 2>/dev/null; then
  echo "⚠️  Warning: Uncommitted changes detected"
fi

# Run build
echo "4/5 Running build..."
if ! npm run build 2>&1; then
  echo "❌ Build failed. Fix errors before publishing."
  exit 1
fi

# Run lint
echo "5/5 Running lint..."
if ! npm run lint 2>&1; then
  echo "❌ Lint failed. Fix errors before publishing."
  exit 1
fi

echo "✅ All pre-flight checks passed!"
echo ""
echo "Ready to publish. Next steps:"
echo "  1. Run dry-run: lerna publish --no-git-tag-version --no-push --yes"
echo "  2. If dry-run looks good, publish: lerna publish --otp <code>"
