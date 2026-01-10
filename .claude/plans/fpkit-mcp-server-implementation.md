# MCP Server for @fpkit/acss Component Scaffolding

## Overview

Create a TypeScript-based MCP (Model Context Protocol) server that provides automated component scaffolding tools for the @fpkit/acss React component library. The server will generate complete, standards-compliant components with all required files following fpkit patterns.

## Goals

1. **Reduce scaffolding time** from 30 minutes to under 2 minutes per component
2. **Ensure consistency** - 100% of generated components follow fpkit standards
3. **Automate validation** - Catch CSS variable naming, structure, and pattern issues
4. **Enable component generation** via MCP tools for any AI assistant

## Architecture

### Location
**Package:** `packages/fpkit-mcp/` (new monorepo package)
- Independent from fpkit library (separate versioning)
- Can be published to npm as `@fpkit/mcp-server`
- Fits Lerna monorepo structure

### Tech Stack
- **TypeScript** with MCP SDK (`@modelcontextprotocol/sdk`)
- **Handlebars** for template rendering
- **Prettier** for code formatting
- **Vitest** for testing

### Template Strategy
**Hybrid approach:**
1. Handlebars templates in `templates/` directory (parameterized)
2. Real components as reference (Alert, Button as gold standards)
3. CSS variable guide and patterns from documentation

## MCP Tools

### 1. `scaffold_component`
**Purpose:** Generate complete component with all required files

**Input:**
- `componentName` (PascalCase) - Required
- `path` (target directory) - Required
- `mode` ("new" | "compose" | "extend") - Optional, default "new"
- `uses` (array of component names) - Optional, for composition
- `hasVariants` (boolean) - Optional, default true
- `accessibility` (boolean) - Optional, default true

**Generates:**
- `{component}.tsx` - TypeScript component with JSDoc
- `{component}.scss` - Styles with CSS variables (rem units only)
- `{component}.stories.tsx` - Storybook stories with play functions
- `{component}.test.tsx` - Vitest tests with React Testing Library
- `README.mdx` - Component documentation
- `STYLES.mdx` - CSS variable documentation

### 2. `validate_component`
**Purpose:** Validate component against fpkit standards

**Input:**
- `componentPath` - Required
- `checks` (array: "structure" | "css-vars" | "typescript" | "accessibility" | "tests") - Optional

**Validates:**
- File structure (all required files present)
- CSS variable naming (`--component-property` pattern)
- Rem units only (no px)
- TypeScript patterns (strict types, JSDoc)
- Accessibility features (ARIA, keyboard support)

### 3. `add_component_exports`
**Purpose:** Update index.ts with new component exports

**Input:**
- `componentName` - Required
- `componentPath` (relative from src/) - Required
- `exportTypes` (boolean) - Optional, default true

**Updates:** `/packages/fpkit/src/index.ts`

### 4. `query_component_patterns`
**Purpose:** Search existing components for patterns and examples

**Input:**
- `query` (search query) - Required
- `category` ("props" | "css-vars" | "accessibility" | "testing" | "composition") - Optional
- `limit` (number) - Optional, default 5

**Returns:** Code snippets, CSS variables, or patterns from existing components

### 5. `generate_component_variant`
**Purpose:** Add new variant to existing component

**Input:**
- `componentPath` - Required
- `variantName` - Required
- `variantProps` (CSS properties object) - Optional

**Updates:**
- SCSS file with variant styles
- Stories file with variant story
- Type definitions with variant option

## Package Structure

```
packages/fpkit-mcp/
├── src/
│   ├── index.ts                    # MCP server entry point
│   ├── tools/
│   │   ├── scaffold-component.ts   # Tool 1
│   │   ├── validate-component.ts   # Tool 2
│   │   ├── add-exports.ts          # Tool 3
│   │   ├── query-patterns.ts       # Tool 4
│   │   └── generate-variant.ts     # Tool 5
│   ├── templates/
│   │   ├── component.tsx.hbs       # Component template
│   │   ├── component.scss.hbs      # SCSS template
│   │   ├── component.stories.tsx.hbs
│   │   ├── component.test.tsx.hbs
│   │   ├── README.mdx.hbs
│   │   └── STYLES.mdx.hbs
│   ├── generators/
│   │   ├── ComponentGenerator.ts   # Core generation logic
│   │   ├── StylesGenerator.ts      # SCSS generation
│   │   ├── StoriesGenerator.ts     # Storybook stories
│   │   └── TestsGenerator.ts       # Test generation
│   ├── validators/
│   │   ├── CSSVariableValidator.ts # CSS naming validation
│   │   ├── ComponentStructure.ts   # File structure validation
│   │   └── TypeScriptValidator.ts  # TS pattern validation
│   └── utils/
│       ├── fileSystem.ts           # FS operations
│       ├── templateHelpers.ts      # Handlebars helpers
│       ├── naming.ts               # Naming conventions
│       └── paths.ts                # Path resolution
├── templates/                      # Handlebars template files
├── test/
│   └── tools/                      # Integration tests
├── package.json
├── tsconfig.json
├── README.md
└── .mcp.json                       # MCP server config
```

## Critical Files to Reference

1. **`packages/fpkit/src/components/alert/alert.tsx`**
   - Gold standard component structure
   - Reference for TypeScript patterns, JSDoc, accessibility

2. **`packages/fpkit/src/components/alert/alert.scss`**
   - Perfect CSS variable naming example
   - Shows variant patterns and rem unit usage

3. **`packages/fpkit/src/components/alert/alert.stories.tsx`**
   - Comprehensive Storybook story structure
   - Play functions and interaction testing patterns

4. **`packages/fpkit/docs/css-variables.md`**
   - Authoritative CSS variable naming guide
   - Critical for CSS validator implementation

5. **`packages/fpkit/src/index.ts`**
   - Export patterns for the `add_component_exports` tool

## Implementation Steps

### Phase 1: Package Setup
1. Create `packages/fpkit-mcp/` directory structure
2. Initialize `package.json` with dependencies:
   - `@modelcontextprotocol/sdk`
   - `handlebars`
   - `prettier`
   - `glob`
   - `fs-extra`
3. Configure TypeScript (`tsconfig.json`)
4. Set up MCP server configuration (`.mcp.json`)

### Phase 2: Core Infrastructure
1. Create MCP server entry point (`src/index.ts`)
2. Implement utility modules:
   - File system operations (`utils/fileSystem.ts`)
   - Naming conventions (`utils/naming.ts`)
   - Path resolution (`utils/paths.ts`)
3. Set up Handlebars helpers (`utils/templateHelpers.ts`)

### Phase 3: Templates
1. Study Alert component as reference
2. Create Handlebars templates:
   - `component.tsx.hbs` - TypeScript component with JSDoc
   - `component.scss.hbs` - SCSS with CSS variables
   - `component.stories.tsx.hbs` - Storybook stories
   - `component.test.tsx.hbs` - Vitest tests
   - `README.mdx.hbs` - Component documentation
   - `STYLES.mdx.hbs` - CSS variable documentation

### Phase 4: Generators
1. Implement `ComponentGenerator` class
   - Read Handlebars templates
   - Substitute variables (componentName, variants, etc.)
   - Format with Prettier
   - Write to file system
2. Implement `StylesGenerator` for SCSS
3. Implement `StoriesGenerator` for Storybook
4. Implement `TestsGenerator` for Vitest

### Phase 5: Validators
1. Implement `CSSVariableValidator`
   - Check `--component-property` pattern
   - Validate rem units only (no px)
   - Check for deprecated abbreviations (px/py → padding-inline/block)
2. Implement `ComponentStructureValidator`
   - Verify all required files exist
   - Check optional files (README.mdx, STYLES.mdx)
3. Implement `TypeScriptValidator`
   - Verify strict types
   - Check JSDoc comments
   - Validate prop interfaces

### Phase 6: MCP Tools
1. Implement `scaffold_component` tool
   - Validate inputs
   - Call ComponentGenerator
   - Generate all files
   - Return success/failure
2. Implement `validate_component` tool
   - Run all validators
   - Return validation results
3. Implement `add_component_exports` tool
   - Parse existing index.ts
   - Add new exports
   - Format with Prettier
4. Implement `query_component_patterns` tool
   - Scan existing components
   - Extract patterns by category
   - Return matching snippets
5. Implement `generate_component_variant` tool
   - Read existing component files
   - Add variant styles to SCSS
   - Add variant story
   - Update TypeScript types

### Phase 7: Testing & Documentation
1. Write integration tests for all tools
2. Test generated components build successfully
3. Verify generated components pass fpkit linting
4. Create comprehensive README with:
   - Installation instructions
   - Tool usage examples
   - Template customization guide
   - Troubleshooting section

### Phase 8: Claude Code Integration
1. Add MCP server to user's Claude Code config
2. Test all tools from Claude Code
3. Create usage examples and walkthrough

## Validation Checklist

After implementation, verify:

- [ ] Generated components follow fpkit file structure
- [ ] CSS variables use `--component-property` naming pattern
- [ ] All units are in rem (no px)
- [ ] TypeScript has strict types and JSDoc comments
- [ ] Storybook stories have play functions
- [ ] Tests use React Testing Library
- [ ] Components export from index.ts correctly
- [ ] Accessibility features included (ARIA, keyboard support)
- [ ] README.mdx and STYLES.mdx generated
- [ ] Generated code passes ESLint
- [ ] Generated components build successfully with tsup

## Configuration

### Claude Code Setup

Add to `~/.config/claude-code/mcp.json`:

```json
{
  "mcpServers": {
    "fpkit-mcp": {
      "command": "node",
      "args": ["/Users/shawnsandy/devbox/acss/packages/fpkit-mcp/dist/index.js"],
      "env": {
        "FPKIT_ROOT": "/Users/shawnsandy/devbox/acss/packages/fpkit"
      }
    }
  }
}
```

### Usage Example

```typescript
// Use MCP tool to scaffold new component
scaffold_component({
  componentName: "ProgressBar",
  path: "./packages/fpkit/src/components/progress-bar",
  mode: "new",
  hasVariants: true,
  accessibility: true
})

// Validate the generated component
validate_component({
  componentPath: "./packages/fpkit/src/components/progress-bar",
  checks: ["structure", "css-vars", "typescript", "accessibility"]
})

// Add exports to index.ts
add_component_exports({
  componentName: "ProgressBar",
  componentPath: "components/progress-bar/progress-bar",
  exportTypes: true
})
```

## Success Criteria

1. ✅ MCP server starts successfully
2. ✅ All 5 tools respond to requests
3. ✅ Generated components pass fpkit validation
4. ✅ Generated components build with tsup
5. ✅ Generated components render in Storybook
6. ✅ CSS variables follow naming conventions
7. ✅ Tests run successfully with Vitest
8. ✅ Time to scaffold reduced from 30min to <2min

## Notes

- **Independent of fpkit-developer skill** - This MCP server is standalone and can be used by any AI assistant, not just Claude Code
- **TypeScript for consistency** - Matches fpkit's TypeScript codebase for easier maintenance
- **Templates are flexible** - Can be customized for different component patterns
- **Validation is comprehensive** - Catches common issues before commit
- **Hybrid approach** - Uses both templates and real components as references for accuracy
