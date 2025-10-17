# CLAUDE.md - fpkit Package

This file provides guidance for working with the **@fpkit/acss** React component library.

## Package Overview

**Package Name:** `@fpkit/acss`
**Version:** 0.5.11 (independent versioning)
**Type:** Public React UI component library
**Published to:** npm (public)

A lightweight React UI component library with 25+ components using CSS custom properties for reactive styling. Emphasizes accessibility, component composition, and semantic HTML.

## Key Technologies

- **React:** 18.0.0+ (peer dependency)
- **TypeScript:** 5.1.6 with strict mode
- **Styling:** SCSS/CSS with CSS custom properties (NO Tailwind)
- **Build:** tsup (ESM/CJS bundler) + Vite (dev server)
- **Testing:** Vitest with jsdom + React Testing Library

## Critical Styling Rules

### Units: rem ONLY
- **NEVER use px units** - all spacing, sizing, and typography MUST use rem
- **Conversion:** px ÷ 16 = rem (e.g., 24px = 1.5rem)
- **Base:** 1rem = 16px (browser default)

### NO Tailwind
- This project uses **SCSS with CSS custom properties**
- Do NOT suggest or add Tailwind utilities
- Use component-scoped SCSS files with BEM-like naming

### CSS Custom Properties
- Use CSS variables for theming and reactivity
- Pattern: `--component-property` (e.g., `--btn-fs`, `--btn-color`)
- Define in component SCSS files

## Component Development Workflow

### 1. Create Component Files

Every component requires these files in `src/components/{component-name}/`:

```
{component-name}/
├── {component}.tsx          # Main component (TypeScript + JSDoc)
├── {component}.scss         # Styles (rem units only!)
├── {component}.stories.tsx  # Storybook stories with play tests
├── {component}.test.tsx     # Vitest unit tests
└── README.mdx               # Component documentation (optional)
```

### 2. Component File Structure

**TypeScript Component (`{component}.tsx`):**
- Use TypeScript with explicit prop types (interface)
- Add comprehensive JSDoc comments
- Export component and prop types
- Use semantic HTML elements
- Handle accessibility (ARIA, focus management)

**SCSS Styles (`{component}.scss`):**
- Use rem units exclusively
- Define CSS custom properties for theming
- Use component-scoped class names or BEM naming
- Import shared variables if needed

**Stories (`{component}.stories.tsx`):**
- Export default meta object with component reference
- Create multiple story variants (default, variants, states)
- Add play functions for interaction testing
- Document props via argTypes when needed

**Tests (`{component}.test.tsx`):**
- Use Vitest with React Testing Library
- Test rendering, user interactions, accessibility
- Use jest-dom matchers (toBeInTheDocument, etc.)
- Test component variants and edge cases

### 3. Register Exports

Add exports to the appropriate entry point:

- **Main components:** `src/index.ts`
- **Hooks:** `src/hooks.ts`
- **Icons:** `src/icons.ts`

Example:
```typescript
// src/index.ts
export { Button } from './components/buttons/button';
export type { ButtonProps } from './components/buttons/button';
```

### 4. Build and Test

```bash
# Development (watch mode)
npm start                   # Builds package + SASS in parallel

# Testing
npm test                    # Run all tests
npm run test:ui             # Tests with UI and coverage

# Building
npm run build               # Full build: TS → tsup → SASS → CSS
npm run package             # TypeScript bundling only
npm run build:sass          # SCSS compilation only

# Linting
npm run lint                # Check for issues
npm run lint-fix            # Auto-fix issues
```

## Storybook Development

The fpkit package uses **Storybook 9** (React Vite) for component development, documentation, and interactive testing. Storybook runs from the **monorepo root** and automatically loads all stories from the fpkit package.

### Starting Storybook

```bash
# From monorepo root
cd /Users/shawnsandy/devbox/acss
npm start   # Launches Storybook on http://localhost:6006
```

Features:
- **Hot Module Replacement (HMR)** - Instant updates when editing components or stories
- **Auto-generated Docs** - Documentation from JSDoc comments and TypeScript props
- **Accessibility Testing** - Built-in a11y addon for WCAG compliance checks
- **Interaction Testing** - Play functions for automated interaction testing
- **Visual Testing** - Chromatic integration for visual regression testing

### Writing Stories

Every component MUST have a `.stories.tsx` file demonstrating all variants and states.

**Story File Structure:**

```typescript
// button.stories.tsx
import type { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect, fn } from "storybook/test";

import Button from "./button";
import "./button.scss";  // Import component styles

// Create mock function for event handlers
const buttonClicked = fn();

// Meta object defines component-level settings
const meta = {
  title: "FP.React Components/Buttons",  // Category/Component name
  component: Button,
  tags: ["rc"],  // Tags for organization (rc = React Component)
  args: {
    children: "Click me",  // Default args for all stories
    onClick: buttonClicked,
  },
  parameters: {
    actions: { argTypesRegex: "^on.*" },  // Auto-detect event handlers
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Button>;

// Default story with play function
export const ButtonComponent: Story = {
  args: {
    onClick: buttonClicked,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await step("Button is rendered", async () => {
      expect(button).toBeInTheDocument();
    });

    await step("Button gets focus on tab", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    await step("Button is clicked", async () => {
      await userEvent.click(button);
      expect(buttonClicked).toHaveBeenCalled();
    });
  },
};

// Variant stories
export const Small: Story = {
  args: {
    "data-btn": "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    "data-btn": "lg",
    children: "Large Button",
  },
};

// Demonstrate CSS custom property overrides
export const Custom: Story = {
  args: {
    styles: {
      "--btn-fs": "1.5rem",
      "--btn-primary-bg": "#0066cc",
    },
    children: "Custom Styled",
  },
};
```

### Story Best Practices

#### Meta Object Configuration

```typescript
const meta = {
  title: "Category/ComponentName",  // Defines sidebar organization
  component: ComponentName,
  tags: ["rc"],  // Use "rc" for React Components
  args: {
    // Default props applied to all stories
  },
  argTypes: {
    // Optional: customize controls
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Visual style variant",
    },
  },
  parameters: {
    // Component-level parameters
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Detailed component description for docs page",
      },
    },
  },
} as Meta;
```

#### Creating Story Variants

Create separate exports for each meaningful variant:

```typescript
// Different states
export const Default: Story = { args: { ... } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };

// Different sizes
export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

// Different variants
export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
```

#### Import Component Styles

**ALWAYS import the component's SCSS file** in the story:

```typescript
import Button from "./button";
import "./button.scss";  // Required for styles to load in Storybook
```

### Play Functions

Play functions enable **interaction testing** directly in Storybook, simulating user behavior.

**Key APIs:**
- `within(canvasElement)` - Get Testing Library queries scoped to component
- `userEvent` - Simulate user interactions (click, type, tab, etc.)
- `expect` - Vitest-compatible assertions
- `step()` - Organize tests into labeled steps

**Pattern:**

```typescript
export const InteractiveStory: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Test rendering
    await step("Component renders correctly", async () => {
      const element = canvas.getByRole("button");
      expect(element).toBeInTheDocument();
    });

    // Test keyboard navigation
    await step("Keyboard navigation works", async () => {
      await userEvent.tab();
      expect(canvas.getByRole("button")).toHaveFocus();
    });

    // Test interactions
    await step("Click handler fires", async () => {
      await userEvent.click(canvas.getByRole("button"));
      expect(mockFn).toHaveBeenCalledOnce();
    });

    // Test keyboard activation
    await step("Enter key activates", async () => {
      await userEvent.type(canvas.getByRole("button"), "{enter}");
      expect(mockFn).toHaveBeenCalled();
    });
  },
};
```

**Common Interactions:**

```typescript
// Mouse interactions
await userEvent.click(element);
await userEvent.dblClick(element);
await userEvent.hover(element);

// Keyboard
await userEvent.tab();           // Focus next element
await userEvent.tab({ shift: true });  // Focus previous
await userEvent.type(input, "text");
await userEvent.type(element, "{enter}");
await userEvent.type(element, "{space}");
await userEvent.type(element, "{escape}");

// Form interactions
await userEvent.clear(input);
await userEvent.selectOptions(select, "value");
```

### Storybook Addons

The root Storybook includes these addons:

#### 1. **@storybook/addon-a11y**
- Automatic accessibility auditing
- WCAG 2.1 compliance checking
- Highlights violations in the Accessibility panel
- Use to ensure components meet accessibility standards

**Usage:**
- View "Accessibility" tab in Storybook
- Review violations, passes, and incomplete checks
- Fix issues before committing

#### 2. **@storybook/addon-docs**
- Auto-generates documentation from JSDoc and TypeScript
- Creates "Interactive Guide" docs page for each component
- Displays prop tables with types and descriptions

**Tip:** Write comprehensive JSDoc comments for better auto-docs:

```typescript
export interface ButtonProps {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
```

#### 3. **storybook-addon-tag-badges**
- Display badges for tagged stories
- Use `tags: ["rc"]` in meta object
- Helps organize and filter components

#### 4. **storybook-addon-test-codegen**
- Generate test code from play functions
- Converts Storybook interactions to test files

#### 5. **@chromatic-com/storybook**
- Visual regression testing integration
- Captures screenshots at multiple viewports
- Detects visual changes in components

### Viewport Configuration

Storybook is configured with custom responsive viewports:

```typescript
viewports: {
  reflow: "320px",      // Minimum WCAG reflow width
  nobreakpoint: "375px", // iPhone SE
  sm: "480px",          // Small devices
  md: "768px",          // Tablets
  lg: "992px",          // Desktops
  xl: "1280px",         // Large screens
}
```

**Testing Responsive Components:**
1. Open story in Storybook
2. Click viewport icon in toolbar
3. Select viewport size
4. Verify component layout adapts correctly

**Chromatic Viewports:**
Visual regression tests capture at: 375px, 480px, 768px, 992px, 1280px

### Storybook Configuration Files

**Root `.storybook/main.ts`:**
```typescript
stories: [
  "../packages/fpkit/**/*.mdx",
  "../packages/fpkit/**/*.stories.@(js|jsx|mjs|ts|tsx)"
]
```

**Root `.storybook/preview.ts`:**
- Imports fpkit styles: `../packages/fpkit/src/styles/index.css`
- Configures viewports, controls, and Chromatic settings
- Sets `tags: ["autodocs"]` for automatic documentation

### Story Organization

**Naming Convention:**
- **File:** `{component}.stories.tsx`
- **Title:** Use `/` for categories: `"FP.React Components/Buttons"`
- **Stories:** Use descriptive names (PascalCase)

**Categories:**
```
FP.React Components/
├── Buttons
├── Cards
├── Dialogs
├── Forms
├── Layout
├── Navigation
└── Typography
```

### Testing in Storybook

#### Manual Testing
1. **Visual:** Verify component appearance in different states
2. **Interaction:** Test clicks, hovers, keyboard navigation
3. **Accessibility:** Check a11y tab for violations
4. **Responsive:** Test across viewport sizes

#### Automated Testing (Play Functions)
1. **Rendering:** Verify component renders correctly
2. **Keyboard:** Test tab order and keyboard shortcuts
3. **Events:** Ensure handlers fire correctly
4. **States:** Test different prop combinations

### Common Storybook Tasks

#### View Component in Storybook

```bash
cd /Users/shawnsandy/devbox/acss
npm start
# Navigate to http://localhost:6006
# Select component from sidebar
```

#### Add Story for New Component

1. Create `{component}.stories.tsx` in component directory
2. Import component and styles
3. Define meta object with title, component, tags
4. Create default story with play function
5. Add variant stories for different props
6. Verify in Storybook (auto-reloads)

#### Debug Story

1. Open browser DevTools
2. View "Interactions" panel for play function steps
3. Check "Actions" panel for event handler calls
4. Use "Controls" panel to modify props interactively

#### Update Story After Component Changes

1. Edit story file to reflect new props or variants
2. Storybook auto-reloads (HMR)
3. Verify changes in browser
4. Update play functions if interactions changed

### Storybook Commands

```bash
# Start development server (from root)
npm start                      # Port 6006

# Build static Storybook
npm run build-storybook        # Output: storybook-static/

# Alternative start command
npm run storybook              # Same as npm start
```

### Integration with CI/CD

Storybook can be built and deployed for:
- **Static documentation hosting** (Netlify, Vercel, GitHub Pages)
- **Chromatic visual testing** (automated visual regression)
- **Design review** (share with designers/stakeholders)

Build command:
```bash
npm run build-storybook
```

Output: `storybook-static/` directory (ready to deploy)

## Package Architecture

### Multiple Entry Points

The package exports through multiple entry points:

```json
{
  ".": "./libs/index.js",           // Main components
  "./hooks": "./libs/hooks.js",     // Custom React hooks
  "./icons": "./libs/icons.js",     // Icon components
  "./styles": "./libs/index.css",   // Compiled CSS
  "./css": "./libs/components",     // Component-scoped CSS
  "./scss": "./src/components"      // Source SCSS files
}
```

### Build Output

- **ESM:** `libs/index.js`, `libs/hooks.js`, `libs/icons.js`
- **CJS:** `libs/index.cjs`, `libs/hooks.cjs`, `libs/icons.cjs`
- **Types:** `libs/*.d.ts` (TypeScript declarations)
- **CSS:** `libs/index.css` (main) + `libs/components/` (component-scoped)

### Directory Structure

```
src/
├── components/              # All UI components (25+)
│   ├── alert/              # Alert component
│   ├── buttons/            # Button components
│   ├── cards/              # Card layout components
│   ├── dialog/             # Modal/dialog components
│   ├── form/               # Form controls (input, textarea, etc.)
│   ├── heading/            # Typography components
│   ├── icons/              # Icon components
│   ├── layout/             # Landmark components (header, main, footer)
│   ├── nav/                # Navigation components
│   ├── tables/             # Table components
│   ├── text/               # Text and typography utilities
│   └── [more...]
├── hooks/                   # Custom React hooks
├── types/                   # Shared TypeScript types
├── decorators/              # Storybook decorators
├── test/                    # Test setup and utilities
├── styles/                  # Compiled CSS output
├── index.ts                 # Main entry point
├── hooks.ts                 # Hooks entry point
├── icons.ts                 # Icons entry point
└── index.scss               # Main SCSS entry
```

## Component Categories

### Layout & Structure
- **Layout:** Header, Main, Footer, Aside (semantic landmarks)
- **Cards:** Card, CardTitle, CardContent, CardFooter

### Forms & Input
- **Form:** Field, FieldLabel, FieldInput, FieldTextarea
- **Input:** Input, Textarea
- **Validation:** Form controls with error states

### Navigation
- **Nav:** Navigation components
- **Breadcrumbs:** Breadcrumb trails
- **Links:** Link components

### Content & Typography
- **Heading:** Semantic headings (h1-h6)
- **Text:** Text components with variants
- **Badge:** Badge and tag components
- **Alert:** Alert/notification components

### Interactive
- **Button:** Button with multiple variants
- **Dialog:** Modal and dialog with focus trap
- **Popover:** Popover with positioning
- **Details:** Collapsible details/summary

### Data Display
- **Tables:** Table, TableHead, TableBody, TableRow, TableCell
- **List:** List components
- **Progress:** Progress indicators

### Media & Icons
- **Images:** Image components
- **Icons:** Icon library

### Utilities
- **Text-to-Speech:** TTS utilities
- **Word Count:** Word counting components

## TypeScript Configuration

### Path Aliases

```typescript
// tsconfig.json
{
  "paths": {
    "#*": ["./src/*"],
    "#decorators": ["./src/decorators/*"]
  }
}
```

Usage:
```typescript
import { Button } from '#components/buttons/button';
```

### Strict Mode

- All type annotations required
- No implicit any
- Strict null checks enabled
- No unused locals or parameters

### Component Prop Types

Define interfaces for all component props:

```typescript
export interface ButtonProps {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  // ... more props with JSDoc
}
```

## Testing Standards

### Test Setup

- **Framework:** Vitest (v0.33.0)
- **Environment:** jsdom
- **Library:** @testing-library/react (v14.0.0)
- **Matchers:** @testing-library/jest-dom
- **Setup File:** `src/test/setup.ts`

### Test Pattern

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Test Coverage

Run coverage reports:
```bash
npm run test:coverage   # Generates HTML + text reports
npm run test:ui         # Interactive UI with coverage
```

## Styling System

### SCSS Architecture

**Compilation Pipeline:**
1. Source SCSS: `src/components/**/*.scss`
2. Main entry: `src/index.scss` (imports all component styles)
3. Sass compiler: Compressed output
4. PostCSS: Autoprefixer for vendor prefixes
5. Output: `libs/index.css` + `libs/components/`

### Component SCSS Pattern

```scss
// button.scss
.btn {
  // Use CSS custom properties
  font-size: var(--btn-fs, 1rem);      // 1rem = 16px
  padding: var(--btn-py, 0.5rem) var(--btn-px, 1rem);
  border-radius: var(--btn-radius, 0.25rem);

  // Use rem units only
  margin-bottom: 1rem;                  // NOT 16px
  gap: 0.5rem;                          // NOT 8px

  // Variants
  &--primary {
    background: var(--btn-primary-bg, #0066cc);
  }

  &--large {
    font-size: 1.125rem;                // NOT 18px
    padding: 0.75rem 1.5rem;            // NOT 12px 24px
  }
}
```

### SCSS Commands

```bash
npm run sass:build      # One-time build (compressed)
npm run sass:watch      # Watch mode during development
npm run build:sass      # Full build with PostCSS
```

## Development Best Practices

### Component Design

1. **Semantic HTML:** Use proper semantic elements (button, nav, main, etc.)
2. **Accessibility:** Include ARIA labels, roles, and keyboard navigation
3. **Composition:** Design components to compose together
4. **Props:** Use TypeScript interfaces with JSDoc descriptions
5. **Variants:** Support multiple visual variants via props

### Accessibility Requirements

- **Keyboard Navigation:** All interactive elements keyboard-accessible
- **Focus Management:** Visible focus indicators, focus trap in dialogs
- **ARIA:** Proper ARIA attributes for dynamic content
- **Semantic HTML:** Use semantic elements over divs
- **Screen Readers:** Meaningful labels and descriptions

### Documentation

- **JSDoc:** Required for all public functions and components
- **README.mdx:** Component-level documentation in each component folder
- **Storybook:** Comprehensive stories showing all variants
- **Prop Descriptions:** Clear descriptions for each prop

## Build System

### Full Build Pipeline

```bash
npm run build
```

**Steps:**
1. TypeScript compilation (`tsc`)
2. tsup bundling (generates ESM + CJS + types)
3. SCSS compilation (compressed CSS)
4. PostCSS processing (autoprefixer)

**Output:**
- `libs/index.js` (ESM)
- `libs/index.cjs` (CJS)
- `libs/index.d.ts` (TypeScript types)
- `libs/index.css` (Compiled styles)
- `libs/components/` (Component-scoped CSS)
- `libs/hooks.*`, `libs/icons.*` (Secondary entry points)

### Configuration Files

- **`tsup.config.cjs`** - Main bundler (ESM/CJS)
- **`tsup.components.config.cjs`** - Component bundling
- **`vite.config.ts`** - Dev server
- **`vite.package.config.ts`** - Library build
- **`vitest.config.js`** - Test configuration
- **`tsconfig.json`** - TypeScript settings

## Publishing

### Release Process

```bash
npm run release         # Lerna publish with version bump
```

This will:
1. Run tests and linting
2. Build the package
3. Bump version (follows semver)
4. Publish to npm as `@fpkit/acss`
5. Create git tag

### Version Management

- **Strategy:** Independent versioning (Lerna)
- **Current:** 0.5.11
- **Semver:** Follows semantic versioning
- **Public:** Published to npm (not private)

## Common Tasks

### Add New Component

1. Create component directory: `src/components/{name}/`
2. Create files: `{name}.tsx`, `{name}.scss`, `{name}.stories.tsx`, `{name}.test.tsx`
3. Implement component with TypeScript + JSDoc
4. Add styles using rem units and CSS custom properties
5. Write Storybook stories
6. Write unit tests
7. Export from `src/index.ts`
8. Run `npm run build` to verify

### Modify Existing Component

1. Read existing component files first
2. Update component logic in `.tsx`
3. Update styles in `.scss` (maintain rem units!)
4. Update or add tests in `.test.tsx`
5. Update stories in `.stories.tsx` if needed
6. Run `npm test` to verify tests pass
7. Run `npm run lint-fix` to fix any linting issues

### Add Custom Hook

1. Create hook in `src/hooks/{hook-name}/`
2. Export from `src/hooks.ts`
3. Add tests if applicable
4. Document with JSDoc

### Update Styles

1. Modify SCSS files (rem units only!)
2. Use CSS custom properties for theming
3. Run `npm run sass:watch` during development
4. Verify output in `libs/` directory

## Integration with Root Storybook

The root Storybook (at monorepo root) loads stories from this package:

```typescript
// Root .storybook/main.ts
stories: [
  "../packages/fpkit/**/*.stories.@(js|jsx|mjs|ts|tsx)"
]
```

Start Storybook from root:
```bash
cd /Users/shawnsandy/devbox/acss
npm start   # Launches Storybook on port 6006
```

## Dependencies

### Peer Dependencies (Required)
- `react` ^18.0.0
- `react-dom` ^18.0.0

### Production Dependencies
- `focus-trap` ^7.5.2 (for dialog/popover focus management)
- `jest-mock` ^29.7.0

### Key Dev Dependencies
- TypeScript, tsup, vite
- Vitest, @testing-library/react
- sass, postcss, autoprefixer
- eslint, prettier

## Troubleshooting

### Build Issues

**TypeScript errors:**
```bash
npm run lint            # Check for issues
npx tsc --noEmit        # Type check without build
```

**SCSS compilation errors:**
```bash
npm run sass:build      # Rebuild SCSS
```

**Missing types:**
```bash
npm run package         # Regenerate type definitions
```

### Test Issues

**Tests failing:**
```bash
npm test                # Run all tests
npm run test:ui         # Debug with UI
```

**Coverage reports:**
```bash
npm run test:coverage   # Generate coverage report
```

## Links

- **NPM Package:** https://www.npmjs.com/package/@fpkit/acss
- **Monorepo Root:** `/Users/shawnsandy/devbox/acss`
- **Package Root:** `/Users/shawnsandy/devbox/acss/packages/fpkit`
- **Storybook:** Run `npm start` from root (port 6006)

## Questions?

For questions or issues:
1. Check existing component implementations in `src/components/`
2. Review Storybook stories for usage examples
3. Check test files for testing patterns
4. Refer to root `CLAUDE.md` for monorepo-level guidance
