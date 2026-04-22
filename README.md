# @fpkit/acss

A lightweight React UI component library for building modern and accessible applications that leverage CSS custom properties for reactive styling.

[![npm version](https://img.shields.io/npm/v/@fpkit/acss.svg)](https://www.npmjs.com/package/@fpkit/acss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs site](https://img.shields.io/badge/docs-astro-ff5d01.svg)](apps/astro-builds/)
[![Design system v6](https://img.shields.io/badge/design--system-v6-blueviolet.svg)](packages/fpkit/docs/DESIGN-SYSTEM-v6.md)

## Design system

`@fpkit/acss` ships a complete design system as of v6.x: tokens, theming, CI quality gates, and a public docs site.

- 📖 **[Design System v6 Overview](packages/fpkit/docs/DESIGN-SYSTEM-v6.md)** — narrative of everything that shipped in v6.x.
- 🗺️ **[Documentation index](packages/fpkit/docs/README.md)** — one-line-per-guide directory of all 13 guides.
- ⬆️ **[Upgrade guide](packages/fpkit/MIGRATION-v7.md#minimum-viable-v6x-upgrade)** — five-step minimum-viable upgrade path.
- 🎨 **[Astro docs site](apps/astro-builds/)** — live Foundations pages and `/status` maturity dashboard.

## Claude Code plugins

Plugins for building applications with `@fpkit/acss` are distributed through a separate marketplace: **[shawn-sandy/acss-plugins](https://github.com/shawn-sandy/acss-plugins)**.

```bash
/plugin marketplace add shawn-sandy/acss-plugins
/plugin install acss-app-builder@shawn-sandy-acss-plugins
```

Three plugins are available: `acss-app-builder` (app scaffolding), `acss-kit-builder` (component generation), and `fpkit-developer` (deprecated).

## Features

- **Modern React** - Built with React 18+ and TypeScript for type-safe development
- **Accessibility First** - WCAG 2.1 AA compliant components with comprehensive ARIA support
- **CSS Custom Properties** - Reactive styling using native CSS variables (no Tailwind dependency)
- **Lightweight** - Small bundle size with tree-shaking support
- **Flexible Styling** - SCSS source files with compiled CSS output in rem units
- **Multiple Entry Points** - Import components, hooks, icons, and styles separately
- **Developer Experience** - Full TypeScript support with comprehensive documentation

## Installation

```bash
npm install @fpkit/acss
```

```bash
yarn add @fpkit/acss
```

```bash
pnpm add @fpkit/acss
```

## Quick Start

```tsx
import { Button, Title, Card } from '@fpkit/acss';
import '@fpkit/acss/styles';

function App() {
  return (
    <Card>
      <Title level="h2">Welcome</Title>
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

## Available Components

### UI Components
- **Alert** - Display important messages and notifications (semantic variants: error, success, warning, info)
- **Badge** - Labels and status indicators with auto-scaling
- **Breadcrumb** - Navigation path with improved accessibility
- **Button** - Interactive button elements (sizes `xs`–`2xl`, `block` for full-width, semantic `color`)
- **Card** - Content containers with interactive features
- **Details** - Collapsible content sections (WCAG AA compliant)
- **Dialog** - Modal dialogs with controlled component pattern; optional `icon` prop for IconButton triggers
- **Fieldset** - Accessible fieldset wrapper with semantic `legend` support
- **Form** - Form elements and validation
- **IconButton** - Standalone icon button with accessible label (visually-hidden or responsive)
- **Link** - Accessible link components (with WCAG 2.1.1-compliant `disabled` state)
- **List** - Styled list components
- **Modal** - Overlay modals and dialogs
- **Nav** - Navigation components
- **Popover** - Contextual popup content
- **Progress** - Progress indicators
- **Table** - Data table components
- **Tag** - Tagging and categorization
- **Text** - Typography components
- **Title** - Semantic heading component (h1-h6) with size and color variants

### Theming & Tokens
- **ThemeProvider / ThemeToggle / useTheme** - Light/dark theming runtime (system-preference aware)
- **`@fpkit/acss/tokens`** - DTCG-compliant design token JSON artifact

### Specialized Components
- **Icons** - Icon library and components
- **Image** - Responsive image components
- **TextToSpeech** - Text-to-speech functionality
- **WordCount** - Word counting utilities

## What's New in v6.x

See the [Design System v6 Overview](packages/fpkit/docs/DESIGN-SYSTEM-v6.md) for the full narrative. Major additions since `1.0.0-beta.0` (CSS-variable rename — see [MIGRATION-v7.md](packages/fpkit/MIGRATION-v7.md)):

- **Theming runtime** — `ThemeProvider`, `useTheme`, `ThemeToggle`, and `getThemeFoucScript()` for SSR. Light/dark via a single `data-theme` attribute on `<html>`; system-preference tracking built in. See the [Theming guide](packages/fpkit/docs/guides/theming.md).
- **Design token pipeline** — `@fpkit/acss/tokens` ships a DTCG-compliant JSON artifact with primitive and semantic colors (plus per-token dark-mode overrides), motion durations and easings, and responsive breakpoints. Ready for Figma bridges, docs sites, and custom builds. Typography and spacing tokens are on the roadmap. See the [Design Tokens guide](packages/fpkit/docs/guides/design-tokens.md).
- **Public Astro docs site** — [apps/astro-builds/](apps/astro-builds/) renders Foundations pages (Colors, Typography, Spacing, Motion) and a live [component maturity dashboard](apps/astro-builds/src/pages/status.astro) derived from Storybook lifecycle tags.
- **CI quality gates** — Vitest coverage thresholds, `size-limit` bundle budgets, axe-powered a11y auditing in the Storybook test-runner, and Changesets for versioning.
- **New components / APIs** — `IconButton` (v6.3.0), `Fieldset` (v6.2.0), Button `xl` / `2xl` / `block`, Dialog `icon` prop, responsive display utilities, Alert `info` variant, Link `disabled` (WCAG 2.1.1 compliant).

## Importing Styles

Import the main stylesheet in your app:

```tsx
// Import all styles
import '@fpkit/acss/styles';
```

Or import specific component styles:

```tsx
// Import specific components
import '@fpkit/acss/css/button/button.css';
import '@fpkit/acss/css/card/card.css';
```

## Theming

Ship light/dark theming without a flash of unthemed content:

```tsx
import { ThemeProvider, ThemeToggle } from '@fpkit/acss';

function App() {
  return (
    <ThemeProvider defaultPreference="system">
      <ThemeToggle />
      {/* your app */}
    </ThemeProvider>
  );
}
```

For SSR frameworks, `getThemeFoucScript()` returns an inline script string you place in `<head>` so `data-theme` is set before React hydrates. Framework-specific patterns (Next.js `app/layout.tsx`, Astro layouts, Remix) and the full API — `useTheme`, custom storage keys, creating additional themes — live in the [Theming guide](packages/fpkit/docs/guides/theming.md).

## Design Tokens

Consume the token JSON directly for docs sites, Figma bridges, and custom builds:

```ts
import tokens from '@fpkit/acss/tokens';
// tokens.color.primary, tokens.duration.base, tokens.ease.standard, tokens.breakpoint.md
```

Tokens are DTCG-compliant (129 tokens as of v6.5) and include primitive color scales, semantic colors with per-token dark-mode overrides, motion (durations + easings), and responsive breakpoints. See the [Design Tokens guide](packages/fpkit/docs/guides/design-tokens.md) for the full shape and consumption patterns.

## Using Hooks

The library provides custom hooks through a separate entry point:

```tsx
import { useModal, useToggle } from '@fpkit/acss/hooks';

function MyComponent() {
  const [isOpen, toggle] = useToggle(false);
  // ... use hooks
}
```

## Using Icons

Access the icon library:

```tsx
import { Icon, IconName } from '@fpkit/acss/icons';

function MyComponent() {
  return <Icon name="chevron-right" size="1.5rem" />;
}
```

## Monorepo Structure

This is a monorepo using Lerna for task orchestration and Changesets for versioning:

```
acss/
├── packages/
│   └── fpkit/              # Main component library (@fpkit/acss)
├── apps/
│   └── astro-builds/       # Public Astro docs site (Foundations + /status dashboard)
├── .storybook/             # Storybook configuration
└── storybook-static/       # Built Storybook docs
```

## Docs Site & Component Maturity

The project ships a companion Astro docs site at [apps/astro-builds/](apps/astro-builds/):

- **Foundations pages** (`/foundations/colors`, `/foundations/typography`, `/foundations/spacing`, `/foundations/motion`) render live views straight from the token JSON — they stay in sync with the library automatically.
- **Component maturity dashboard** at [/status](apps/astro-builds/src/pages/status.astro) shows every component's lifecycle stage (experimental → beta → rc → stable → deprecated) alongside coverage signals (tests present, a11y verified, dark-mode verified), auto-derived from Storybook tags. See the [component lifecycle guide](packages/fpkit/docs/guides/component-lifecycle.md) for promotion criteria.

Run the docs site locally:

```bash
cd apps/astro-builds
npm run dev
```

## Development

### Prerequisites

- Node.js >= 22.12.0
- npm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/shawn-sandy/fpkit.git
cd acss

# Install dependencies
npm install

# Start Storybook for component development
npm start
```

### Available Scripts

#### Root Project (Storybook)
```bash
npm start                # Start Storybook dev server on port 6006
npm run storybook        # Alternative to start Storybook
npm run build-storybook  # Build Storybook static site
npm run lint             # Run ESLint
```

#### fpkit Package (packages/fpkit/)
```bash
# Development
npm run dev              # Start Vite dev server
npm start                # Watch mode: builds package + SASS

# Building
npm run build            # Full build: tokens → TS → SCSS → CSS
npm run tokens:build     # Extract tokens.json from SCSS sources
npm run package          # Build TypeScript with tsup
npm run sass:build       # Compile SCSS to CSS

# Testing
npm test                 # Run Vitest tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
npm run size             # Check bundle-size budgets (size-limit)
npm run size:why         # Visualize what's in each bundle

# Publishing
npm run changeset        # Create a changeset entry (at monorepo root)
npm run version-packages # Apply changesets and bump versions
```

### CI Quality Gates

Contributors should know what the CI enforces before opening a PR. Full details in the [CI Gates guide](packages/fpkit/docs/guides/ci-gates.md):

- **Test coverage thresholds** — lines 89%, branches 90%, functions 66%, statements 89% ([vitest.config.js](packages/fpkit/vitest.config.js)).
- **Bundle-size budgets** — main 18 KB, hooks 3 KB, icons 6 KB, CSS 18 KB gzipped ([.size-limit.cjs](packages/fpkit/.size-limit.cjs)). Run `npm run size` to check locally.
- **Accessibility audit** — Storybook test-runner + axe. Non-blocking during triage; [flip criteria documented](packages/fpkit/docs/guides/ci-gates.md#flipping-to-blocking).
- **Visual regression** — Chromatic, gated on `CHROMATIC_PROJECT_TOKEN` secret.
- **Versioning** — Changesets owns `CHANGELOG.md` and version bumps. Hand-edits will be clobbered on the next release.

## TypeScript Support

The library is fully typed with TypeScript. All components export their prop types:

```tsx
import { ButtonProps, TitleProps, CardProps } from '@fpkit/acss';

interface MyButtonProps extends ButtonProps {
  custom?: boolean;
}
```

## Browser Support

- Modern browsers with ES2020+ support
- React 18.0.0 or higher required

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- [Component Documentation](https://fpkit.dev) - Interactive component examples and API docs
- [Storybook](https://storybook.fpkit.dev) - Live component playground
- [GitHub Repository](https://github.com/shawn-sandy/fpkit)

## License

MIT © FirstPaint

## Support

- [Report Issues](https://github.com/shawn-sandy/fpkit/issues)
- [Discussions](https://github.com/shawn-sandy/fpkit/discussions)
- [Documentation](https://fpkit.dev)

---

Built with React, TypeScript, and CSS Custom Properties
