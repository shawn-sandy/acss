
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Quick Reference

| Item | Value |
|------|-------|
| Package | `@fpkit/acss` |
| Node | >= 22.12.0 |
| Package Manager | npm |
| Monorepo Tool | Lerna (independent versioning) |
| Framework | React 18+ / TypeScript |
| Styling | SCSS + CSS custom properties (no Tailwind) |
| Testing | Vitest + React Testing Library |
| Docs | Storybook 10 |

## Project Structure

```
acss/
├── packages/fpkit/          # Main component library (@fpkit/acss)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── icons/           # Icon components
│   │   ├── styles/          # Global SCSS
│   │   └── index.ts         # Main exports
│   └── libs/                # Build output
├── apps/astro-builds/       # Astro integration demo
├── .storybook/              # Storybook config
├── openspec/                # Specs and change proposals
│   └── plans/               # Implementation plans
├── .claude/
│   └── plans/               # Claude-specific plans
└── docs/
    └── css-variables.md     # CSS variable reference
```

## Commands

### Development

```bash
npm start                    # Storybook dev server (port 6006)
npm run lint                 # ESLint check
```

### fpkit Package (`packages/fpkit/`)

```bash
npm start                    # Watch mode (TS + SCSS)
npm run build                # Full production build
npm test                     # Run Vitest
npm run test:coverage        # Coverage report
npm run lint-fix             # Auto-fix lint errors
npm run test:snapshot        # Update Vitest snapshots
npm test -- --run src/components/button/button.test.tsx  # Run single test
```

## Component Development

### File Structure

Each component lives in `packages/fpkit/src/components/{name}/`:

```
button/
├── button.tsx               # Component
├── button.scss              # Styles
├── button.stories.tsx       # Storybook stories
├── button.test.tsx          # Tests
└── index.ts                 # Exports
```

### TypeScript Path Aliases

```
#*            → ./src/*
#decorators   → ./src/decorators/*
```

Example: `import { Button } from '#components/buttons/button'`

### Creating Components

1. Create component with TypeScript + JSDoc
2. Add `.scss` file using **rem units only** (px/16 = rem)
3. Export from `packages/fpkit/src/index.ts`
4. Create Storybook story with `autodocs` tag
5. Add tests using Vitest + RTL

### CSS Variable Naming

Pattern: `--{component}-{element?}-{variant?}-{property}-{state?}`

```scss
--btn-bg
--btn-padding-inline
--btn-primary-bg
--btn-hover-bg
--card-header-padding
```

**Allowed abbreviations:** `bg`, `fs`, `fw`, `gap`, `radius`

**Use full words for:** padding, margin, color, border, display, width, height

**Use logical properties:** `padding-inline`, `padding-block`, `margin-inline`, `margin-block`

### Architectural Patterns

#### Data Attribute Variants

Variants use `data-*` attributes, NOT className:

- `data-btn` → size/block (`sm`, `lg`, `block`)
- `data-style` → visual style (`outline`, `pill`, `text`, `icon`)
- `data-color` → semantic color (`primary`, `danger`, `success`)

SCSS selects with `[data-btn~="lg"]` (space-separated list matching).

#### `useDisabledState` Hook

Located at `src/hooks/useDisabledState.ts`:

- Uses `aria-disabled` instead of native `disabled` to keep buttons in tab order (WCAG 2.1.1)
- Returns `{ disabledProps, handlers }`
- Auto-merges `.is-disabled` className

#### Polymorphic `as` Prop

Base components accept `as` prop to render different HTML elements:

```tsx
<Box as="section">
<Text as="span">
<Flex as="nav">
```

### Storybook Stories

**Always import the component `.scss` in the story file:**

```tsx
import "./button.scss"; // Required in every story file
```

```tsx
const meta: Meta<typeof Component> = {
  title: "FP.React Components/ComponentName",  // Use "FP.React" prefix
  component: Component,
  tags: ["stable"],  // stable | beta | rc | deprecated | experimental | new
};
```

Tag values: `stable | beta | rc | deprecated | experimental | new`

### Testing

```bash
npm test                     # Run all tests
npm run test:ui              # Interactive UI
npm run test:coverage        # Coverage report
```

> **Note:** Testing gotchas:
>
> - `userEvent` is imported from `storybook/test`, NOT `@testing-library/user-event`
> - Mock functions use `jest-mock`: `import jest from 'jest-mock'`
> - `src/test/setup.ts` mocks `HTMLDialogElement` methods (jsdom limitation) — Dialog/Modal tests rely on this

## Plans

Save plans to `.claude/plans/` or `openspec/plans/`. Ask "review plans" to list all plans.

## Publishing

**Always use the `npm-monorepo-publish` skill when asked to publish to npm.**

The skill handles:

- Pre-publish validation (build + lint)
- Release branch workflow (mandatory)
- OTP/2FA handling
- Post-publish verification
- Do not publish a major version bump without explicit approval.

Package publishes to npm as `@fpkit/acss` with independent versioning.

## Plan Mode Instructions

- Keep descriptions minimal, clear and concise.
- Avoid long paragraphs; Always break the plan into small, concise, numbered, testable steps.
- Use bullet points or numbered lists for clarity.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
- Always rename the plan file to reflect the plan's purpose clearly.
- Verify that the plan is actionable and testable before marking it as complete.
