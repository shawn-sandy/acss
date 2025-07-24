# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo using Lerna that builds FPKit (@fpkit/acss), a lightweight React UI component library. The architecture follows a dual export strategy for both convenience and optimization.

**Key directories:**
- `packages/fpkit/` - Main UI library package
- `apps/astro-builds/` - Astro documentation site
- `.storybook/` - Storybook configuration for component development

The main package (`packages/fpkit/`) contains:
- `src/components/` - Component source files (.tsx)
- `src/styles/` - SCSS styling files
- `libs/` - Built library output (JS, CSS, TypeScript definitions)
- Component exports via individual imports (`@fpkit/acss/button`) and barrel imports

## Common Commands

**Root level commands:**
- `npm run start` - Start Storybook development server on port 6006
- `npm run build` - Build TypeScript and Vite bundle
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

**FPKit package commands (run from packages/fpkit/):**
- `npm run dev` - Start Vite development server
- `npm run build` - Full build (package, sass, build:sass, build:css)
- `npm run package` - Build TypeScript and tsup bundle with types
- `npm run test` - Run Vitest tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run Vitest UI with coverage
- `npm run lint` - ESLint for .jsx,.tsx files

**Sass/CSS workflow:**
- `npm run sass:watch` - Watch SCSS files and compile to src/styles/
- `npm run build:sass` - Build SCSS to libs/ (compressed)

## Architecture Patterns

**Component Structure:**
Components follow a standardized pattern using a `UI` wrapper from `#components/ui`. Each component:
- Uses TypeScript with proper prop types
- Implements accessibility (WCAG 2.1)
- Includes JSDoc documentation
- Has corresponding .stories.tsx and .test.tsx files
- Uses SCSS for styling in component directories

**Dual Export Strategy:**
- Barrel imports: `import { Button } from '@fpkit/acss'` (convenience)
- Individual imports: `import { Button } from '@fpkit/acss/button'` (tree-shaking)

**Key conventions:**
- PascalCase component names
- Component files use `displayName` property
- Props interface named `{ComponentName}Props`
- SCSS files alongside components, compiled to libs/components/
- CSS custom properties for theming

**Testing:**
- Vitest for unit testing
- React Testing Library for component testing
- Snapshot testing with `.snap` files
- Tests located alongside components or in `__snapshots__/`

**Component Scaffold Pattern:**
```tsx
import React from 'react'
import UI from '#components/ui'

export type ComponentNameProps = {
  children: React.ReactNode;
}

const ComponentName = ({children, ...props}: ComponentNameProps): React.JSX.Element => {
  return (
    <UI as="div" {...props}>
      {children}
    </UI>
  )
}

export default ComponentName
ComponentName.displayName = 'ComponentName'
```

**Development workflow:**
- SCSS files are compiled and watched during development
- TypeScript builds generate both ES modules and CommonJS
- Components are exported individually for tree-shaking
- Storybook provides component development environment