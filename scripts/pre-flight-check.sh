#!/bin/bash

# Pre-flight check script for npm publishing
# Validates environment, runs build, lint, and tests before publishing

set -e  # Exit on any error

echo "🚀 Pre-flight Check for @fpkit/acss"
echo "===================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall success
CHECKS_PASSED=true

# Function to print success message
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error message
error() {
    echo -e "${RED}✗${NC} $1"
    CHECKS_PASSED=false
}

# Function to print warning message
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Check npm authentication
echo "1️⃣  Checking npm authentication..."
if npm whoami &> /dev/null; then
    NPM_USER=$(npm whoami)
    success "Authenticated as: $NPM_USER"
else
    error "Not authenticated with npm. Run 'npm login' first."
fi
echo ""

# 2. Validate Lerna configuration
echo "2️⃣  Validating Lerna configuration..."

# Find the repository root (where lerna.json should be)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -f "$REPO_ROOT/lerna.json" ]; then
    success "lerna.json found"
    # Check if version is independent
    VERSION_MODE=$(node -pe "require('$REPO_ROOT/lerna.json').version")
    if [ "$VERSION_MODE" = "independent" ]; then
        success "Independent versioning enabled"
    else
        warning "Version mode: $VERSION_MODE"
    fi
else
    error "lerna.json not found at $REPO_ROOT"
fi
echo ""

# 3. Verify git state
echo "3️⃣  Checking git state..."
if git diff-index --quiet HEAD --; then
    success "Working tree is clean"
else
    warning "Working tree has uncommitted changes"
    git status --short
fi
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
success "Current branch: $CURRENT_BRANCH"
echo ""

# 4. Run build
echo "4️⃣  Building package..."
cd "$REPO_ROOT/packages/fpkit"
if npm run build &> /dev/null; then
    success "Build successful"
else
    error "Build failed"
fi
cd "$REPO_ROOT"
echo ""

# 5. Run lint
echo "5️⃣  Running linter..."
cd "$REPO_ROOT/packages/fpkit"
if npm run lint &> /dev/null; then
    success "Linting passed"
else
    warning "Linting has warnings (non-blocking)"
    npm run lint 2>&1 | grep -E "warning|error" || true
fi
cd "$REPO_ROOT"
echo ""

# 6. Run tests
echo "6️⃣  Running tests..."
cd "$REPO_ROOT/packages/fpkit"
if npm test -- --run &> /dev/null; then
    success "All tests passed"
else
    error "Tests failed"
fi
cd "$REPO_ROOT"
echo ""

# Final report
echo "===================================="
if [ "$CHECKS_PASSED" = true ]; then
    echo -e "${GREEN}✓ All pre-flight checks passed!${NC}"
    echo ""
    echo "Ready to publish @fpkit/acss"
    exit 0
else
    echo -e "${RED}✗ Some pre-flight checks failed${NC}"
    echo ""
    echo "Please fix the issues above before publishing."
    exit 1
fi
