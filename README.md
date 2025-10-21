# @fpkit/acss

A lightweight React UI component library for building modern and accessible applications that leverage CSS custom properties for reactive styling.

[![npm version](https://img.shields.io/npm/v/@fpkit/acss.svg)](https://www.npmjs.com/package/@fpkit/acss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
- **Alert** - Display important messages and notifications
- **Badge** - Labels and status indicators with auto-scaling
- **Breadcrumb** - Navigation path with improved accessibility
- **Button** - Interactive button elements
- **Card** - Content containers with interactive features
- **Details** - Collapsible content sections (WCAG AA compliant)
- **Dialog** - Modal dialogs with controlled component pattern
- **Form** - Form elements and validation
- **Link** - Accessible link components
- **List** - Styled list components
- **Modal** - Overlay modals and dialogs
- **Nav** - Navigation components
- **Popover** - Contextual popup content
- **Progress** - Progress indicators
- **Table** - Data table components
- **Tag** - Tagging and categorization
- **Text** - Typography components
- **Title** - Semantic heading component (h1-h6)

### Specialized Components
- **Icons** - Icon library and components
- **Image** - Responsive image components
- **TextToSpeech** - Text-to-speech functionality
- **WordCount** - Word counting utilities

## Recent Improvements

### v0.5.11
- **Title Component** - New semantic heading component replacing deprecated Heading
- **Dialog Refactoring** - Comprehensive refactoring with controlled component pattern and WCAG AA compliance
- **Details Component** - Enhanced accessibility with live accessibility review
- **Card Component** - Comprehensive refactoring with focus styles and interactive features
- **Breadcrumb Enhancements** - Performance and accessibility improvements
- **Badge Updates** - Auto-scaling functionality and enhanced styles
- **Accessibility Focus** - Improved documentation and WCAG compliance across all components

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

This is a Lerna-managed monorepo containing:

```
acss/
├── packages/
│   └── fpkit/              # Main component library (@fpkit/acss)
├── apps/
│   └── astro-builds/       # Astro integration demo
├── .storybook/             # Storybook configuration
└── storybook-static/       # Built Storybook docs
```

## Development

### Prerequisites

- Node.js >= 20.9.0
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
npm run build            # Full build pipeline
npm run package          # Build TypeScript with tsup
npm run sass:build       # Compile SCSS to CSS

# Testing
npm test                 # Run Vitest tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
```

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
