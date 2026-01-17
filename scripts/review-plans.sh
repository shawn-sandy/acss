#!/bin/bash
# Review all project plans from .claude/plans/ and openspec/plans/

echo "========================================"
echo "         PROJECT PLANS REVIEW          "
echo "========================================"
echo ""

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to list plans from a directory
list_plans() {
    local dir="$1"
    local label="$2"

    if [ -d "$dir" ]; then
        echo -e "${CYAN}## $label${NC}"
        echo ""
        printf "%-50s %-12s %s\n" "Plan" "Modified" "Lines"
        echo "----------------------------------------------------------------------"

        for file in "$dir"/*.md; do
            if [ -f "$file" ]; then
                name=$(basename "$file" .md)
                modified=$(date -r "$file" "+%Y-%m-%d" 2>/dev/null || stat -c %y "$file" 2>/dev/null | cut -d' ' -f1)
                lines=$(wc -l < "$file" | tr -d ' ')
                printf "%-50s %-12s %s\n" "$name" "$modified" "$lines"
            fi
        done
        echo ""
    else
        echo -e "${YELLOW}Directory not found: $dir${NC}"
        echo ""
    fi
}

# List plans from both locations
list_plans "$PROJECT_ROOT/.claude/plans" "Claude Plans (.claude/plans/)"
list_plans "$PROJECT_ROOT/openspec/plans" "OpenSpec Plans (openspec/plans/)"

# Summary
echo -e "${GREEN}========================================${NC}"
claude_count=$(find "$PROJECT_ROOT/.claude/plans" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
openspec_count=$(find "$PROJECT_ROOT/openspec/plans" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
echo -e "Total: ${claude_count} Claude plans, ${openspec_count} OpenSpec plans"
echo ""
echo "To view a plan: cat .claude/plans/<name>.md"
echo "              or cat openspec/plans/<name>.md"
