
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

CSS variable reference: @docs/css-variables.md

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

**Example:**
```ts
import { Button } from '#components/button/button'
import { useToggle } from '#hooks/use-toggle'
```

### Creating Components

1. Create component with TypeScript + JSDoc
2. Add `.scss` file using **rem units only** (px/16 = rem)
3. Export from `packages/fpkit/src/index.ts`
4. Create Storybook story with `autodocs` tag
5. Add tests using Vitest + RTL

See `.claude/rules/component-conventions.md` for CSS naming, variant patterns, Storybook rules, and testing gotchas.

## Plans

Save plans to `.claude/plans/` or `openspec/plans/`. Ask "review plans" to list all plans.

## Plugins

Claude Code plugins that extend this project live in a separate repository: **[shawn-sandy/acss-plugins](https://github.com/shawn-sandy/acss-plugins)**.

The local `.claude-plugin/marketplace.json` in this repo is a transparent redirect — existing subscribers of `shawn-sandy/acss` continue to receive updates through `/plugin marketplace update`. Three plugins are currently distributed:

- **acss-app-builder** — scaffold apps with the @fpkit/acss design system (layouts, pages, themes, forms, patterns)
- **acss-kit-builder** — generate fpkit-style React components without installing `@fpkit/acss`
- **fpkit-developer** (deprecated) — superseded by acss-app-builder

For plugin development, file an issue or PR at the new repo.

## Publishing

**Always use the `npm-monorepo-publish` skill when asked to publish to npm.** Do not publish a major version bump without explicit approval.

See `.claude/rules/publishing.md` for workflow details.

## Local Overrides

Use `CLAUDE.local.md` for machine-specific or personal settings (auto-gitignored by Claude Code).
