# fpkit Component Builder

> **Build React components using @fpkit/acss library patterns with intelligent composition and scaffolding**

A comprehensive Claude Code skill for building, scaffolding, and validating React components following fpkit/acss patterns, conventions, and best practices.

## What This Skill Does

This skill helps you build production-ready React components for the @fpkit/acss library with:

- **🔍 Intelligent Component Analysis** - Automatically detects reuse opportunities before creating new components
- **🚀 Smart Scaffolding** - Generates complete component structures (tsx, types, scss, stories, tests)
- **✅ CSS Variable Validation** - Enforces naming conventions (`--component-property`) and rem units
- **♿ Accessibility Compliance** - Ensures WCAG 2.1 AA standards
- **📖 Storybook Integration** - Creates interactive documentation with play functions
- **🧪 Testing Patterns** - Generates Vitest + React Testing Library tests

## Installation

### Option 1: Add to Claude Code Skills

1. Copy the `fpkit-component-builder` directory to your `.claude/skills/` folder:
   ```bash
   cp -r fpkit-component-builder ~/.claude/skills/
   ```

2. The skill will be automatically available in Claude Code

### Option 2: Project-Specific Skill

Place the skill in your project's `.claude/skills/` directory:
```bash
cp -r fpkit-component-builder /path/to/your-project/.claude/skills/
```

## Quick Start

### Step 1: Analyze Component Reuse

**ALWAYS start here** before creating a new component:

```bash
python3 scripts/recommend_approach.py ComponentName
```

This analyzes your request and recommends:
- **Compose** - Build from existing components (preferred)
- **Extend** - Add features to existing component
- **Scaffold** - Create new component (last resort)

### Step 2: Scaffold Based on Recommendation

#### Compose from Existing Components
```bash
python3 scripts/scaffold_component.py StatusButton \
  --mode compose \
  --uses Badge,Button \
  --path ./packages/fpkit/src/components/status-button
```

#### Extend Existing Component
```bash
python3 scripts/scaffold_component.py EnhancedAlert \
  --mode extend \
  --uses Alert \
  --path ./packages/fpkit/src/components/enhanced-alert
```

#### Create New Component
```bash
python3 scripts/scaffold_component.py AlertBox \
  --path ./packages/fpkit/src/components/alert-box
```

### Step 3: Validate and Build

```bash
# Validate CSS variables
python3 scripts/validate_css_vars.py ./src/components/alert-box/alert-box.scss

# Run linter
npm run lint

# Run tests
npm test alert-box

# Build
npm run build
```

## Key Features

### 🆕 Intelligent Reuse Detection

The skill prioritizes **composition over duplication**:

- **Component Catalog** - Scans 25+ existing fpkit components
- **Similarity Matching** - Detects similar components (>70% name similarity)
- **Composite Detection** - Identifies component combinations ("AlertDialog" = Alert + Dialog)
- **Actionable Recommendations** - Provides next steps with example code

### Component Templates

Three scaffolding modes:

1. **New Component** - Full template with UI primitives
2. **Composed Component** - Template with imported components
3. **Extended Component** - Template that wraps existing component

### Automation Scripts

| Script | Purpose |
|--------|---------|
| `recommend_approach.py` | Analyze component requests and suggest best approach |
| `analyze_components.py` | Build searchable catalog of existing components |
| `suggest_reuse.py` | Find similar/reusable components |
| `scaffold_component.py` | Generate complete component structure |
| `validate_css_vars.py` | Validate CSS naming and rem units |
| `add_to_exports.py` | Add component exports to index.ts |

### Reference Documentation

Comprehensive guides for every aspect of component development:

- **composition-patterns.md** - Component reuse strategies
- **component-patterns.md** - Architecture and structure patterns
- **css-variable-guide.md** - CSS naming standards (rem units, logical properties)
- **accessibility-patterns.md** - WCAG 2.1 AA compliance
- **storybook-patterns.md** - Story structure and play functions
- **testing-patterns.md** - Vitest + React Testing Library patterns

## Component Development Workflow

```
1. ANALYZE
   ↓
   python3 scripts/recommend_approach.py ComponentName
   ↓
2. SCAFFOLD
   ↓
   python3 scripts/scaffold_component.py [--mode compose|extend]
   ↓
3. IMPLEMENT
   ↓
   Follow component-patterns.md
   ↓
4. STYLE
   ↓
   CSS variables with rem units (validate_css_vars.py)
   ↓
5. DOCUMENT
   ↓
   Storybook stories with play functions
   ↓
6. TEST
   ↓
   Vitest tests (>80% coverage)
   ↓
7. EXPORT
   ↓
   python3 scripts/add_to_exports.py
   ↓
8. BUILD
   ↓
   npm run build
```

## CSS Variable Standards

All CSS custom properties must follow the standardized pattern:

```scss
// Pattern: --{component}-{property}
--btn-bg: #007bff;
--btn-padding-inline: 1rem;
--btn-radius: 0.25rem;

// Variants: --{component}-{variant}-{property}
--btn-primary-bg: #007bff;
--btn-secondary-bg: #6c757d;

// States: --{component}-{state}-{property}
--btn-hover-bg: #0056b3;
--btn-focus-outline: 0.125rem solid #80bdff;

// Elements: --{component}-{element}-{property}
--card-header-padding: 1rem;
--dialog-footer-bg: #f8f9fa;
```

**Key Rules:**
- ✅ Use rem units only (not px) - base 16px = 1rem
- ✅ Approved abbreviations: `bg`, `fs`, `fw`, `radius`, `gap`
- ❌ Forbidden abbreviations: `px/py` (use `padding-inline/block`), `w/h` (use `width/height`)
- ✅ Logical properties: `padding-inline`, `margin-block` (not px/py)

## Usage in Claude Code

Once installed, simply tell Claude:

```
"Build a new StatusButton component using fpkit patterns"
```

Claude will:
1. Activate the fpkit-component-builder skill
2. Analyze for reuse opportunities
3. Recommend compose/extend/scaffold approach
4. Scaffold the component structure
5. Guide you through implementation
6. Validate CSS variables
7. Generate tests and stories
8. Export the component

## Examples

### Example 1: Composed Component

```bash
# User request: "Create an IconButton component"

# Step 1: Analyze
python3 scripts/recommend_approach.py IconButton
# → Recommends: COMPOSE (Button + Icon)

# Step 2: Scaffold
python3 scripts/scaffold_component.py IconButton \
  --mode compose \
  --uses Button,Icon \
  --path ./packages/fpkit/src/components/icon-button

# Result: Component that combines Button and Icon primitives
```

### Example 2: Extended Component

```bash
# User request: "Create a LoadingButton with spinner"

# Step 1: Analyze
python3 scripts/recommend_approach.py LoadingButton
# → Recommends: EXTEND (Button + loading state)

# Step 2: Scaffold
python3 scripts/scaffold_component.py LoadingButton \
  --mode extend \
  --uses Button \
  --path ./packages/fpkit/src/components/loading-button

# Result: Component that extends Button with loading feature
```

### Example 3: New Component

```bash
# User request: "Create a Timeline component"

# Step 1: Analyze
python3 scripts/recommend_approach.py Timeline
# → Recommends: SCAFFOLD (novel component)

# Step 2: Scaffold
python3 scripts/scaffold_component.py Timeline \
  --path ./packages/fpkit/src/components/timeline

# Result: Brand new component built from UI primitive
```

## File Structure

```
fpkit-component-builder/
├── README.md                          # This file
├── SKILL.md                           # Complete skill documentation
├── scripts/
│   ├── recommend_approach.py          # Analyze and recommend approach
│   ├── analyze_components.py          # Build component catalog
│   ├── suggest_reuse.py               # Find reusable components
│   ├── scaffold_component.py          # Generate component files
│   ├── validate_css_vars.py           # Validate CSS conventions
│   └── add_to_exports.py              # Add to index.ts exports
├── references/
│   ├── composition-patterns.md        # Component reuse strategies
│   ├── component-patterns.md          # Architecture patterns
│   ├── css-variable-guide.md          # CSS naming standards
│   ├── accessibility-patterns.md      # WCAG 2.1 AA compliance
│   ├── storybook-patterns.md          # Story patterns
│   └── testing-patterns.md            # Test patterns
└── assets/
    └── templates/
        ├── component.template.tsx           # New component template
        ├── component.composed.template.tsx  # Composed template
        ├── component.extended.template.tsx  # Extended template
        ├── component.template.types.ts      # Types template
        ├── component.template.scss          # Styles template
        ├── component.template.stories.tsx   # Stories template
        └── component.template.test.tsx      # Test template
```

## Best Practices

### ✅ Do

- **Always run `recommend_approach.py` first** - Composition > duplication
- Use the scaffolding scripts for consistency
- Follow CSS variable naming patterns strictly
- Use rem units only (not px)
- Build on the UI component primitive
- Add comprehensive JSDoc documentation
- Test accessibility (ARIA, keyboard navigation)
- Create Storybook stories with play functions
- Validate CSS before committing
- Achieve >80% test coverage

### ❌ Don't

- Skip the reuse analysis step
- Create new components when existing ones can be composed
- Use px units in CSS (convert to rem)
- Use forbidden abbreviations (`w`/`h`, `px`/`py`, etc.)
- Skip validation scripts
- Forget to import styles in Storybook stories
- Skip accessibility testing
- Ignore TypeScript errors
- Forget component displayName

## Validation Checklist

Before committing a new component:

- [ ] Ran `recommend_approach.py` and followed recommendation
- [ ] CSS variables follow `--{component}-{property}` pattern
- [ ] All units are rem (not px)
- [ ] TypeScript types are correct (no errors)
- [ ] Tests pass with >80% coverage
- [ ] Storybook stories render correctly
- [ ] Accessibility tests pass (ARIA, keyboard)
- [ ] Component exported from index.ts
- [ ] Build succeeds without errors
- [ ] Linter passes (`npm run lint`)

## Troubleshooting

### CSS Validation Errors

**"Use rem units instead of px"**
```scss
// ❌ Wrong
padding: 24px;

// ✅ Correct
padding: 1.5rem;  // 24px / 16 = 1.5rem
```

**"Forbidden abbreviation 'px'"**
```scss
// ❌ Wrong
--btn-px: 1rem;

// ✅ Correct
--btn-padding-inline: 1rem;
```

**"Variable should follow --{component}-{property} pattern"**
```scss
// ❌ Wrong
--alert-background-color: blue;
--alertBg: blue;

// ✅ Correct
--alert-bg: blue;
```

### When Scaffold Script Fails

**"Template not found"**
- Ensure you're running scripts from the skill directory
- Verify templates exist in `assets/templates/`

**"Output directory exists"**
- Component directory already exists
- Remove it or use a different name

## Documentation

For detailed documentation, see:

- **SKILL.md** - Complete skill documentation with step-by-step workflow
- **references/** - Detailed guides for patterns, accessibility, testing, etc.
- **fpkit Project** - See `/packages/fpkit/` for existing component examples

## Requirements

- Python 3.x (for automation scripts)
- Node.js >= 20.9.0
- npm or yarn
- Claude Code with skills support

## Support

For issues or questions:

1. Check **SKILL.md** for detailed documentation
2. Review reference guides in **references/**
3. Examine existing components in **packages/fpkit/src/components/**
4. Consult the project's **CLAUDE.md** for fpkit-specific patterns

## Key Principle

**Composition over duplication** - Always analyze for reuse opportunities before creating new components. Use the intelligent reuse detection to build on existing primitives.

---

**Version:** 1.0.0
**License:** MIT
**Author:** fpkit Team
