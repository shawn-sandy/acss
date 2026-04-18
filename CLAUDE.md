
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
├── packages/acss/          # Main component library (@fpkit/acss)
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

CSS variable reference: @docs/css-variables.md

## Commands

### Development

```bash
npm start                    # Storybook dev server (port 6006)
npm run lint                 # ESLint check
```

### fpkit Package (`packages/acss/`)

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

Each component lives in `packages/acss/src/components/{name}/`:

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

**Example:**
```ts
import { Button } from '#components/button/button'
import { useToggle } from '#hooks/use-toggle'
```

### Creating Components

1. Create component with TypeScript + JSDoc
2. Add `.scss` file using **rem units only** (px/16 = rem)
3. Export from `packages/acss/src/index.ts`
4. Create Storybook story with `autodocs` tag
5. Add tests using Vitest + RTL

See `.claude/rules/component-conventions.md` for CSS naming, variant patterns, Storybook rules, and testing gotchas.

## Plans

Save plans to `.claude/plans/` or `openspec/plans/`. Ask "review plans" to list all plans.

## Publishing

**Always use the `npm-monorepo-publish` skill when asked to publish to npm.** Do not publish a major version bump without explicit approval.

See `.claude/rules/publishing.md` for workflow details.

## Local Overrides

Use `CLAUDE.local.md` for machine-specific or personal settings (auto-gitignored by Claude Code).
