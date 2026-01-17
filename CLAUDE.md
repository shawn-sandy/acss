<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

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

### Creating Components

1. Create component with TypeScript + JSDoc
2. Add `.scss` file using **rem units only** (px/16 = rem)
3. Export from `packages/fpkit/src/index.ts`
4. Create Storybook story with `autodocs` tag
5. Add tests using Vitest + RTL

### CSS Variable Naming

Pattern: `--{component}-{element?}-{variant?}-{property}-{state?}`

```scss
// Good
--btn-bg
--btn-padding-inline
--btn-primary-bg
--btn-hover-bg
--card-header-padding

// Bad - avoid abbreviations
--btn-px              // Use --btn-padding-inline
--btn-cl              // Use --btn-color
--card-w              // Use --card-width
```

**Allowed abbreviations:** `bg`, `fs`, `fw`, `gap`, `radius`

**Use full words for:** padding, margin, color, border, display, width, height

**Use logical properties:** `padding-inline`, `padding-block`, `margin-inline`, `margin-block`

### Storybook Stories

```tsx
const meta: Meta<typeof Component> = {
  title: "FP.React Components/ComponentName",  // Use "FP.React" prefix
  component: Component,
  tags: ["stable"],  // stable | beta | deprecated | experimental | new
};
```

### Testing

```bash
npm test                     # Run all tests
npm run test:ui              # Interactive UI
npm run test:coverage        # Coverage report
```

## Documentation Requirements

When documenting components, create:

- `README.mdx` - Component usage and API documentation
- `STYLES.mdx` - CSS variables and styling guide

Both files must be Storybook-compatible MDX format.

## Plans

Save implementation plans to:

- `.claude/plans/` - Claude-specific plans
- `openspec/plans/` - OpenSpec change proposals

**To review plans:** Ask "review plans" — always list all plans first so user can pick which to read

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Build Output

| Output | Location |
|--------|----------|
| JS (ESM/CJS) | `packages/fpkit/libs/` |
| CSS | `packages/fpkit/libs/index.css` |
| Types | `packages/fpkit/libs/*.d.ts` |
| Storybook | `storybook-static/` |

## Publishing

**Always use the `npm-monorepo-publish` skill when asked to publish to npm.**

The skill handles:

- Pre-publish validation (build + lint)
- Release branch workflow (mandatory)
- OTP/2FA handling
- Post-publish verification
- Do not publish a major version bump without explicit approval.

Package publishes to npm as `@fpkit/acss` with independent versioning.
