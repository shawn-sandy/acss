# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **monorepo** managed by **Lerna** containing:
- **@fpkit/acss** - A lightweight React UI component library in `packages/fpkit/`
- **Root Storybook** - Component documentation and development playground
- **astro-fpkit** - Astro integration demo app in `apps/astro-builds/`

The project follows independent versioning where each package maintains its own version number.

## Key Architecture

### Component Library (@fpkit/acss)

Located in `packages/fpkit/`, this is the main React component library that:
- Uses **CSS custom properties** for reactive styling (not Tailwind)
- Built with TypeScript and React 18+
- Exports components via multiple entry points: main, hooks, icons, styles
- Generates both ESM (`libs/index.js`) and CJS (`libs/index.cjs`) builds
- Includes SCSS source files alongside compiled CSS

**Component Organization:**
- Components live in `packages/fpkit/src/components/`
- Each component has its own directory with component, styles (.scss), stories, and tests
- Main exports defined in `packages/fpkit/src/index.ts`
- Separate exports for hooks (`src/hooks.ts`) and icons (`src/icons.ts`)

**Styling System:**
- Uses **SASS/SCSS** exclusively (no Tailwind)
- CSS custom properties for theming
- Units must be in **rem** (not px) - base 16px = 1rem
- Component styles in `src/components/` compiled to `libs/components/`
- Main stylesheet: `src/index.scss` → `libs/index.css`

### Storybook Setup

The root project runs Storybook for component development:
- Stories located in `packages/fpkit/**/*.stories.tsx`
- Configured to load from fpkit package
- Uses addons: a11y, docs, tag-badges, onboarding
- TypeScript with react-docgen-typescript for prop documentation

## Common Commands

### Root Project (Storybook)
```bash
npm start                # Start Storybook dev server on port 6006
npm run storybook        # Alternative to start Storybook
npm run build-storybook  # Build Storybook static site
npm run lint             # Run ESLint
npm run build            # Build root project with Vite
```

### fpkit Package (packages/fpkit/)
```bash
# Development
npm run dev              # Start Vite dev server
npm start                # Watch mode: builds package + SASS in parallel

# Building
npm run build            # Full build: TS compile → tsup bundle → SASS → CSS processing
npm run package          # Build TypeScript with tsup (generates .js, .cjs, .d.ts)
npm run sass:build       # Compile SCSS to CSS (compressed)
npm run sass:watch       # Watch and compile SCSS

# Testing
npm test                 # Run Vitest tests
npm run test:ui          # Run tests with UI and coverage
npm run test:coverage    # Generate coverage report
npm run test:snapshot    # Update snapshots

# Linting
npm run lint             # Run ESLint on .jsx and .tsx files
npm run lint-fix         # Auto-fix ESLint issues
```

### Astro Demo (apps/astro-builds/)
```bash
npm run dev              # Start Astro dev server
npm run build            # Build Astro site
npm run preview          # Preview production build
```

## Development Workflow

### Working on Components

1. **Component files** go in `packages/fpkit/src/components/{component-name}/`
2. Create component with TypeScript and proper JSDoc comments
3. Add corresponding `.scss` file using rem units
4. Export from `packages/fpkit/src/index.ts` (or appropriate entry point)
5. Create `.stories.tsx` file for Storybook documentation
6. Add tests with `.test.tsx` using Vitest + React Testing Library

### Style Guidelines

- Use **rem units only** (convert px/16 = rem)
- Leverage CSS custom properties for theming
- SCSS files should be modular and component-scoped
- Follow BEM-like naming or component-scoped class names
- Avoid inline styles unless necessary for dynamic CSS properties

### Testing

- Tests use Vitest with happy-dom or jsdom
- React Testing Library for component testing
- Test files use `.test.tsx` extension
- Setup files: `packages/fpkit/src/test/setup.ts`

### TypeScript

- Strict typing enforced
- Component props in `src/types/` directory
- Use interfaces for component props
- Import aliases: `#*` for `./src/*`, `#decorators` for `./src/decorators/*`
- tsconfig uses project references (app + node configs)

## Build Output

- **fpkit package**:
  - Compiled JS: `packages/fpkit/libs/`
  - Compiled CSS: `packages/fpkit/libs/index.css` and `libs/components/`
  - Type definitions: `packages/fpkit/libs/*.d.ts`
- **Storybook**: `storybook-static/` (gitignored)

## Git Hooks

- **Husky** configured via `npm run prepare`
- **lint-staged** runs ESLint on staged `.js,.jsx,.ts,.tsx` files

## Publishing

- fpkit package published to npm as `@fpkit/acss`
- Uses independent versioning through Lerna
- Publish command: `npm run release` (from fpkit directory)
- Public npm package (not private)

## Node Version

- Requires Node.js >= 20.9.0 (enforced in package.json engines)
- `.nvmrc` specifies 20.9.0
