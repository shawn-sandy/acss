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

Each component lives in `packages/fpkit/src/components/{name}/`. See `.claude/rules/component-dev.md` for detailed SCSS patterns, CSS variable naming, architectural patterns, and Storybook/testing conventions.

### Creating Components

1. Create component with TypeScript + JSDoc
2. Add `.scss` file using **rem units only** (px/16 = rem)
3. Export from `packages/fpkit/src/index.ts`
4. Create Storybook story with `autodocs` tag
5. Add tests using Vitest + RTL

### TypeScript Path Aliases

```
#*            → ./src/*
#decorators   → ./src/decorators/*
```

Example: `import { Button } from '#components/buttons/button'`

## Plans

Save plans to `docs/planning/` (primary), `.claude/plans/`, or `openspec/plans/`. Ask "review plans" to list all plans. Always rename the plan to reflect the problem being solved, not the branch name. For example, `fix/button-icon` becomes "Modernize icon-button SCSS patterns" to capture the broader learnings beyond just that one component.

## Publishing

**Use the `npm-monorepo-publish` skill for all npm releases.** Do not publish a major version bump without explicit approval. Add an entry to `packages/fpkit/CHANGELOG.md` and bump the minor version when behavior changes for existing users.
