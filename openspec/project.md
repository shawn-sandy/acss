# Project Context

## Purpose

**@fpkit/acss** is a lightweight React UI component library that leverages CSS custom properties for reactive styling. The project aims to provide modern, accessible, and customizable UI components without relying on utility-first CSS frameworks like Tailwind.

### Goals

- Build reusable React components with TypeScript
- Provide theme-able components via CSS custom properties
- Maintain accessibility standards (WCAG)
- Support both ESM and CommonJS module formats
- Offer comprehensive component documentation via Storybook
- Enable flexible styling through SCSS/CSS custom properties

## Tech Stack

### Core Technologies

- **TypeScript** (v5.1.6+) - Strict mode enabled for type safety
- **React** (v18.0.0+) - Component library framework
- **SASS/SCSS** - Styling system (no Tailwind)
- **Vite** - Build tool and dev server
- **tsup** - TypeScript bundler for library builds

### Development Tools

- **Lerna** (v8.1.9) - Monorepo management with independent versioning
- **Storybook** (v9.0.18) - Component development and documentation
- **Vitest** - Unit testing with React Testing Library
- **ESLint** - Code linting with TypeScript support
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Testing Stack

- Vitest with happy-dom/jsdom
- @testing-library/react
- @testing-library/user-event
- Storybook interaction tests

## Project Conventions

### Code Style

#### ESLint Rules

- No console statements (`no-console: error`)
- Display names warned for React components
- React Hooks exhaustive deps disabled
- React in JSX scope not required (auto-import)
- React Refresh for HMR with constant exports allowed

#### TypeScript Standards

- **Strict mode enabled**
- Explicit type annotations for function parameters and return types
- Avoid `any` types
- Interface-based component props in `src/types/`
- Path aliases: `#*` maps to `./src/*`

#### Naming Conventions

- Component files: PascalCase (e.g., `Alert.tsx`)
- Style files: kebab-case matching component (e.g., `alert.scss`)
- Test files: `*.test.tsx`
- Story files: `*.stories.tsx`
- Hooks: camelCase with `use` prefix

#### Import Organization

1. External dependencies (React, third-party)
2. Internal imports using `#` aliases
3. Type imports
4. Relative imports (avoid when possible)

### Architecture Patterns

#### Monorepo Structure

```text
acss/
├── packages/fpkit/          # Main component library (@fpkit/acss)
│   ├── src/
│   │   ├── components/      # Component source files
│   │   ├── hooks/           # Custom React hooks
│   │   ├── icons/           # Icon components
│   │   └── types/           # TypeScript type definitions
│   └── libs/                # Build output (ESM + CJS)
├── apps/astro-builds/       # Astro demo application
└── (root)                   # Storybook configuration
```

#### Component Organization

Each component follows this structure:

```text
components/{component-name}/
├── {component-name}.tsx     # Component implementation
├── {component-name}.scss    # Component styles
├── {component-name}.stories.tsx  # Storybook documentation
├── {component-name}.test.tsx     # Unit tests (when applicable)
└── elements/                # Sub-components (when needed)
```

#### Export Strategy

- Main export: `src/index.ts` (components)
- Hooks export: `src/hooks.ts`
- Icons export: `src/icons.ts`
- Multiple entry points in package.json exports field

#### Styling System

- **Units: rem only** (base: 16px = 1rem, convert px/16)
- CSS custom properties for all themeable values
- SCSS files compiled to CSS in `libs/components/`
- BEM-like or component-scoped class naming
- No inline styles (use CSS custom properties for dynamic values)

#### Accessibility Requirements

- ARIA attributes where appropriate
- Keyboard navigation support
- Focus management for interactive components
- Screen reader compatibility
- Color contrast compliance

### Testing Strategy

#### Unit Tests (Vitest)

- Test files: `*.test.tsx`
- React Testing Library for component testing
- Setup file: `packages/fpkit/src/test/setup.ts`
- Coverage reports with @vitest/coverage-v8
- Run: `npm test` or `npm run test:ui`

#### Storybook Interaction Tests

- Stories include `play` functions for interaction testing
- Uses @storybook/test utilities
- Accessibility checks via @storybook/addon-a11y

#### Testing Focus Areas

- Component rendering with various props
- User interactions (clicks, keyboard)
- Accessibility compliance
- Edge cases and error states

### Git Workflow

#### Branching Strategy

- Main branch: `main`
- Feature branches: `feature/*` or `feat/*`
- Refactor branches: `refactor/*`
- Bug fixes: `fix/*` or `bugfix/*`

#### Commit Message Convention

Follows conventional commits pattern:

```text
<type>(<scope>): <subject>

Examples:
- feat(button): add additional button variants for improved UI consistency
- refactor(button): enhance hover states with customizable CSS properties
- fix(alert): correct accessibility issue with dismiss button
```

**Types:**

- `feat`: New features
- `fix`: Bug fixes
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `test`: Test additions/changes
- `chore`: Build/tooling changes

#### Pre-commit Hooks

- Husky configured with `npm run prepare`
- lint-staged runs ESLint on staged `.js,.jsx,.ts,.tsx` files
- Auto-fix applied when possible

#### Release Process

- Independent versioning via Lerna
- Release command: `npm run release` (from fpkit directory)
- Commit message: `chore(release): publish %s`
- Published to npm as `@fpkit/acss` (public package)

## Domain Context

### Component Library Philosophy

- **CSS Custom Properties First**: All themeable values use CSS variables, enabling runtime theming without JavaScript
- **Accessibility by Default**: Components include proper ARIA attributes and keyboard support out of the box
- **Minimal Dependencies**: Keep external dependencies low; leverage native browser capabilities
- **Framework Agnostic Styling**: While built for React, styles can be used independently

### Design System Concepts

- **Severity Levels**: Components like Alert use standardized severity (default, info, success, warning, error)
- **Size System**: Uses `rem`-based spacing and sizing for consistency
- **Responsive Design**: Components adapt to different viewport sizes
- **Theme Support**: Light/dark mode via CSS custom properties

### Component Patterns

- Controlled vs Uncontrolled components (prefer controlled when state is external)
- Compound components for complex UI (e.g., Alert with DismissButton)
- Render props and children patterns for flexibility
- Memoization for performance (React.memo, useMemo, useCallback)

## Important Constraints

### Technical Constraints

- **Node.js >= 20.9.0** (enforced in package.json engines)
- **npm >= 8.0.0**
- React 18+ peer dependency
- Must support both ESM and CJS module formats
- TypeScript strict mode compliance

### Styling Constraints

- **No Tailwind CSS** - Uses SCSS/CSS custom properties exclusively
- **rem units only** - No pixel units (except for specific edge cases)
- Styles must be compile-time generated (no CSS-in-JS runtime)
- SCSS source files must remain alongside compiled CSS

### Build Constraints

- Must generate TypeScript declarations (.d.ts)
- Must produce both .js (ESM) and .cjs (CommonJS) outputs
- SCSS compilation happens separately from TS compilation
- Build process: TS → tsup bundle → SASS → CSS processing

### Package Constraints

- Published as scoped package (@fpkit/acss)
- Must maintain backward compatibility within major versions
- Files included in npm package: src, dist, libs, libs/index.css

## External Dependencies

### Core Dependencies

- **focus-trap** (v7.5.2) - Focus management for modals/dialogs
- **react** (^18.0.0) - Peer dependency
- **react-dom** (^18.0.0) - Peer dependency

### Development Dependencies

- **@shawnsandy/first-paint** (v2.18.13) - Base CSS framework/utilities
- **sass-embedded** (v1.83.0) - SASS compiler
- **npm-run-all** (v4.1.5) - Script runner for parallel builds

### Build Tools

- **tsup** - TypeScript bundler
- **vite** - Dev server and build tool
- **postcss** with autoprefixer - CSS post-processing

### No External APIs

This is a component library with no external API dependencies or services. All functionality is self-contained.
