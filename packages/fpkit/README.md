# @fpkit/acss

A lightweight React UI library for building modern and accessible components that leverage CSS custom properties for reactive styles. Built with TypeScript and designed for optimal tree-shaking and bundle size optimization.

[![npm version](https://badge.fury.io/js/@fpkit%2Facss.svg)](https://badge.fury.io/js/@fpkit%2Facss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[📚 **Storybook Documentation**](https://fpkit.netlify.app/?path=/story/guides-introduction--page) | [🎯 **Component Playground**](https://fpkit.netlify.app/)

## ✨ Features

- **🎯 Dual Export Strategy**: Choose between convenience (barrel exports) or optimization (individual imports)
- **📦 Tree-Shakable**: Import only the components you need
- **♿ Accessible**: Built with accessibility best practices
- **🎨 CSS Custom Properties**: Reactive styling with CSS variables
- **📱 Responsive**: Mobile-first design approach
- **⚡ TypeScript**: Full type safety and excellent DX
- **🔧 Headless**: Minimal styling, maximum customization

## ♿ Accessibility

FPKit is built with accessibility as a core principle, following WCAG 2.1 AA standards. All components support ARIA attributes and provide guidance for creating accessible applications.

### Accessibility Features

- **Semantic HTML** - Components use appropriate semantic elements by default
- **ARIA Support** - Full support for ARIA attributes on all components
- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Screen Reader Friendly** - Proper labeling and announcements for assistive technologies
- **Focus Management** - Visible focus indicators and programmatic focus control

### Testing for Accessibility

We recommend the following tools for testing accessibility in your applications:

#### Automated Testing

```bash
# Install recommended packages
npm install --save-dev eslint-plugin-jsx-a11y jest-axe @testing-library/react
```

**ESLint Plugin** - Catch accessibility issues during development:

```js
// .eslintrc.js
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```

**jest-axe** - Automated accessibility testing in unit tests:

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@fpkit/acss/button';

expect.extend(toHaveNoViolations);

test('Button should have no accessibility violations', async () => {
  const { container } = render(
    <Button type="button" aria-label="Submit form">
      Submit
    </Button>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Manual Testing Checklist

When building components with FPKit, verify:

- [ ] **Keyboard Navigation** - All interactive elements are reachable and operable via keyboard
- [ ] **Screen Reader** - Test with VoiceOver (macOS), NVDA (Windows), or JAWS
- [ ] **Focus Indicators** - Visible focus states meet 3:1 contrast ratio (WCAG 2.4.7)
- [ ] **Accessible Names** - All interactive elements have accessible names (via text, `aria-label`, or `aria-labelledby`)
- [ ] **Color Contrast** - Text meets 4.5:1 contrast ratio for normal text, 3:1 for large text
- [ ] **Semantic Structure** - Proper heading hierarchy and landmark regions

### UI Component Accessibility

The foundational [UI component](https://fpkit.netlify.app/?path=/story/fp-ui--accessible-interactive-elements) demonstrates best practices:

```tsx
import { UI } from '@fpkit/acss';

// ✅ Good: Accessible button with aria-label
<UI as="button" aria-label="Close dialog" onClick={handleClose}>
  <CloseIcon />
</UI>

// ✅ Good: Semantic link with descriptive text
<UI as="a" href="/products">
  View all products
</UI>

// ❌ Bad: Button without accessible name
<UI as="button" onClick={handleClose}>
  <CloseIcon />
</UI>
```

See the [UI component Storybook stories](https://fpkit.netlify.app/?path=/story/fp-ui--accessibility-patterns) for more examples and anti-patterns to avoid.

## 📦 Installation

```bash
npm install @fpkit/acss
# or
yarn add @fpkit/acss
# or
pnpm add @fpkit/acss
```

## 🚀 Quick Start

### Option 1: Barrel Imports (Convenience)

Perfect for rapid prototyping and when bundle size isn't critical:

```tsx
import { Button, Card, Input, Modal } from '@fpkit/acss';
import '@fpkit/acss/styles';

function App() {
  return (
    <div>
      <Card>
        <Card.Title>Welcome to FPKit</Card.Title>
        <Card.Content>
          <Input type="text" placeholder="Enter your name" />
          <Button type="button">Submit</Button>
        </Card.Content>
      </Card>
    </div>
  );
}
```

### Option 2: Individual Imports (Tree-Shaking)

Optimal for production builds and bundle size optimization:

```tsx
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';
import { Input } from '@fpkit/acss/input';
import '@fpkit/acss/styles';

function App() {
  return (
    <div>
      <Card>
        <Card.Title>Welcome to FPKit</Card.Title>
        <Card.Content>
          <Input type="text" placeholder="Enter your name" />
          <Button type="button">Submit</Button>
        </Card.Content>
      </Card>
    </div>
  );
}
```

## 🧩 Core Components

### Button

Accessible button component with multiple variants:

```tsx
// Barrel import
import { Button } from '@fpkit/acss';

// Individual import
import { Button } from '@fpkit/acss/button';

// Usage — sizes xs through 2xl, plus `block` for full-width
<Button type="button" size="lg" onClick={() => console.log('clicked')}>
  Click me
</Button>

<Button type="submit" block>Full-width submit</Button>

// With TypeScript
import { Button, type ButtonProps } from '@fpkit/acss/button';

const buttonProps: ButtonProps = {
  type: 'submit',
  disabled: false,
  children: 'Submit Form'
};
```

### IconButton

Icon-only button with a required accessible label and an optional visible text label:

```tsx
import { IconButton, Icon } from '@fpkit/acss';

// Accessible-label-only (visually icon-only)
<IconButton aria-label="Close dialog" onClick={handleClose}>
  <Icon name="close" />
</IconButton>

// With a responsive label (hidden on small viewports, visible on larger)
<IconButton aria-label="Settings" label="Settings">
  <Icon name="settings" />
</IconButton>
```

### Card

Flexible card component with composable parts:

```tsx
// Individual import
import { Card } from '@fpkit/acss/card';

// Usage
<Card>
  <Card.Title>Card Title</Card.Title>
  <Card.Content>
    <p>This is the card content area.</p>
  </Card.Content>
  <Card.Footer>
    <Button type="button">Action</Button>
  </Card.Footer>
</Card>

// Custom styling
<Card classes="custom-card" styles={{ padding: '2rem' }}>
  <Card.Title>Styled Card</Card.Title>
  <Card.Content>Content with custom styling</Card.Content>
</Card>
```

### Modal

Accessible modal dialog with focus management:

```tsx
import { Modal } from '@fpkit/acss/modal';

<Modal
  openChild="Open Modal"
  closeChild="Close"
  modalHeader={<h2>Modal Title</h2>}
  modalFooter={
    <div>
      <Button type="button">Cancel</Button>
      <Button type="button">Confirm</Button>
    </div>
  }
>
  <p>Modal content goes here.</p>
</Modal>
```

### Input

Form input component with validation support:

```tsx
import { Input } from '@fpkit/acss/input';

<Input
  type="email"
  placeholder="Enter your email"
  required
  aria-label="Email address"
/>

// With field wrapper
import { Field } from '@fpkit/acss';

<Field>
  <Field.Label>Email Address</Field.Label>
  <Input type="email" placeholder="you@example.com" />
  <Field.Error>Please enter a valid email</Field.Error>
</Field>
```

### Fieldset

Accessible `<fieldset>` wrapper with a semantic `legend` — groups related form controls for screen readers:

```tsx
import { Fieldset } from '@fpkit/acss';

<Fieldset legend="Shipping address">
  <Field>
    <Field.Label>Street</Field.Label>
    <Input type="text" name="street" />
  </Field>
  <Field>
    <Field.Label>City</Field.Label>
    <Input type="text" name="city" />
  </Field>
</Fieldset>
```

### Navigation

Semantic navigation components:

```tsx
import { Nav, NavList, NavItem } from '@fpkit/acss';

<Nav>
  <NavList>
    <NavItem>
      <Link href="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link href="/about">About</Link>
    </NavItem>
    <NavItem>
      <Link href="/contact">Contact</Link>
    </NavItem>
  </NavList>
</Nav>
```

### Text & Typography

Semantic text components:

```tsx
import { Text, Heading } from '@fpkit/acss';

<Heading as="h1" size="xl">
  Page Title
</Heading>

<Text as="p" size="lg">
  This is a paragraph with large text.
</Text>

<Text as="span" variant="muted">
  Muted text for secondary information.
</Text>
```

## 🎨 Styling & Theming

FPKit uses CSS custom properties for theming and styling:

```css
/* Global theme variables */
:root {
  --fp-color-primary: #007bff;
  --fp-color-secondary: #6c757d;
  --fp-spacing-sm: 0.5rem;
  --fp-spacing-md: 1rem;
  --fp-spacing-lg: 1.5rem;
  --fp-border-radius: 0.375rem;
}

/* Component-specific styling */
.custom-button {
  --fp-button-bg: var(--fp-color-primary);
  --fp-button-color: white;
  --fp-button-padding: var(--fp-spacing-md);
}
```

### Theming Runtime (Light / Dark / System)

FPKit ships a tiny theming runtime built around a single `data-theme` attribute on `<html>`. Wrap your app and drop in a toggle:

```tsx
import { ThemeProvider, ThemeToggle, useTheme } from '@fpkit/acss';

function App() {
  return (
    <ThemeProvider defaultPreference="system">
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}

// In any child component:
function SomeChild() {
  const { theme, preference, setPreference } = useTheme();
  // theme is always "light" or "dark"; preference can also be "system"
  return <span>Current theme: {theme}</span>;
}
```

**For SSR frameworks (Next.js, Astro, Remix):** `getThemeFoucScript()` returns an inline script string you render in `<head>` so `data-theme` is set synchronously before React hydrates — no flash of wrong theme on first paint. Framework-specific recipes and custom-theme authoring live in the [Theming guide](docs/guides/theming.md).

### Design Tokens

The library exports a DTCG-compliant JSON artifact for use in docs sites, Figma bridges, and custom build pipelines:

```ts
import tokens from '@fpkit/acss/tokens';

// Primitive scales:  tokens.color.neutral[600], tokens.color.blue[600], ...
// Semantic colors:   tokens.color.primary, tokens.color.error, tokens.color.surface, ...
// Motion:            tokens.duration.base, tokens.ease.standard, ...
// Layout:            tokens.breakpoint.md, tokens.breakpoint.lg, ...
```

There's also a typed TS export at `src/tokens/index.ts` (generated from SCSS) where each token resolves to its CSS custom property reference — `tokens.color.primary` returns `"var(--color-primary)"` so consumers get runtime theme switching for free. Dark-mode values live inside each semantic token's `$extensions.com.fpkit.themeModes.dark` slot. See the [Design Tokens guide](docs/guides/design-tokens.md) for the full shape, category breakdown, and consumption patterns.

### Component Styling

```tsx
// Inline styles
<Button styles={{ backgroundColor: 'red', color: 'white' }}>
  Styled Button
</Button>

// CSS classes
<Card classes="shadow-lg border-rounded">
  <Card.Content>Styled card</Card.Content>
</Card>

// Data attributes for CSS targeting
<Button data-variant="primary" data-size="large">
  Data Attribute Styling
</Button>
```

## 🛠️ Framework Integration

### Next.js

```tsx
// pages/_app.tsx
import '@fpkit/acss/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// pages/index.tsx
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';

export default function Home() {
  return (
    <main>
      <Card>
        <Card.Title>Next.js + FPKit</Card.Title>
        <Card.Content>
          <Button type="button">Get Started</Button>
        </Card.Content>
      </Card>
    </main>
  );
}
```

### Vite + React

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fpkit/acss/styles';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// App.tsx
import { Button, Card } from '@fpkit/acss';

function App() {
  return (
    <Card>
      <Card.Title>Vite + React + FPKit</Card.Title>
      <Card.Content>
        <Button type="button">Hello World</Button>
      </Card.Content>
    </Card>
  );
}

export default App;
```

## 📋 Available Components

### Core UI Components

- **Button** - Accessible button with variants, sizes xs–2xl, `block` prop
- **IconButton** - Icon-only button with required accessible label
- **Card** - Flexible card container with composable parts
- **Modal** - Accessible modal dialog
- **Dialog** - General purpose dialog component (optional `icon` trigger)
- **Input** - Form input with validation
- **Field** - Form field wrapper with label and error
- **Fieldset** - Accessible fieldset + legend wrapper for grouped form controls
- **Link** - Accessible link component (WCAG 2.1.1-compliant `disabled` state)
- **List** - Semantic list components

### Theming & Tokens

- **ThemeProvider / useTheme / ThemeToggle** - Light/dark theming runtime
- **`getThemeFoucScript()`** - SSR script to prevent theme flash
- **`@fpkit/acss/tokens`** - DTCG design token JSON artifact

### Layout Components

- **Box** - Generic container component
- **Nav** - Navigation components
- **Landmarks** - Semantic landmark components (Header, Main, Footer, Aside, Fieldset)

### Typography

- **Text** - Semantic text component
- **Heading** - Heading component with sizes

### Media

- **Icon** - SVG icon component
- **Image** - Responsive image component

### Data Display

- **Table** - Accessible table components
- **Tag** - Tag/badge component
- **Badge** - Status badge component

### Specialized

- **TextToSpeech** - Text-to-speech component
- **Popover** - Popover/tooltip component
- **Breadcrumb** - Navigation breadcrumbs

## 🎯 Import Strategies

### When to Use Barrel Imports

- Rapid prototyping
- Small applications
- When using many components
- Development/testing environments

### When to Use Individual Imports

- Production applications
- Performance-critical apps
- When using few components
- Library/package development

### Bundle Size Comparison

```bash
# Barrel import (all components)
import { Button, Card, Modal } from '@fpkit/acss';
# Bundle size: ~45KB (example)

# Individual imports (tree-shaken)
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';
import { Modal } from '@fpkit/acss/modal';
# Bundle size: ~12KB (example)
```

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import { Button, type ButtonProps } from '@fpkit/acss/button';
import { Card, type CardProps } from '@fpkit/acss/card';

// Type-safe props
const buttonProps: ButtonProps = {
  type: 'button',
  onClick: (e) => console.log(e),
  children: 'Click me'
};

// Component with proper typing
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🧪 Testing

Components are designed for easy testing:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@fpkit/acss/button';

test('renders button with text', () => {
  render(<Button type="button">Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

## 📚 Documentation

Comprehensive guides to help you build accessible, maintainable applications with @fpkit/acss:

### Core Guides

- **[Theming Guide](docs/guides/theming.md)** - `ThemeProvider`, `useTheme`, `ThemeToggle`, SSR FOUC handling, and creating custom themes
- **[Design Tokens Guide](docs/guides/design-tokens.md)** - Consume the `@fpkit/acss/tokens` JSON artifact; token categories and integration patterns
- **[CSS Variables Guide](docs/guides/css-variables.md)** - Learn how to discover and customize CSS custom properties for theming and styling
- **[Composition Guide](docs/guides/composition.md)** - Master component composition patterns to build custom components by combining fpkit primitives
- **[Accessibility Guide](docs/guides/accessibility.md)** - Understand and maintain WCAG 2.1 Level AA compliance when using and composing components
- **[Architecture Guide](docs/guides/architecture.md)** - Learn fpkit's architectural patterns, component structure, and how to work effectively with the library
- **[Component Lifecycle](docs/guides/component-lifecycle.md)** - Lifecycle stages (experimental → beta → rc → stable → deprecated) and promotion criteria
- **[Testing Guide](docs/guides/testing.md)** - Test applications and custom components using Vitest and React Testing Library
- **[Storybook Guide](docs/guides/storybook.md)** - Document custom components and compositions using Storybook

### Quick Links

- **[Documentation Index](docs/README.md)** - Complete documentation hub with guide navigator and workflows
- **[Storybook](https://fpkit.netlify.app/)** - Interactive component documentation and playground
- **[Component Maturity Dashboard](../../apps/astro-builds/src/pages/status.astro)** - Live view of every component's lifecycle stage and coverage signals (tests, a11y, dark mode) on the Astro docs site

### Common Tasks

**Customizing component appearance?**
→ Start with [CSS Variables Guide](docs/guides/css-variables.md)

**Building a custom component?**
→ Read [Composition Guide](docs/guides/composition.md), then [Architecture Guide](docs/guides/architecture.md)

**Ensuring accessibility?**
→ Study [Accessibility Guide](docs/guides/accessibility.md)

**Testing components?**
→ Follow [Testing Guide](docs/guides/testing.md)

## 🤖 Claude Code Skill

Supercharge your development workflow with the **fpkit-developer** skill for Claude Code! This AI assistant skill helps you build applications using @fpkit/acss components with best practices baked in.

### What the Skill Does

- ✅ **Component Composition** - Get guidance on composing custom components from fpkit primitives
- ✅ **CSS Variable Validation** - Automatically validate your custom styles against fpkit naming conventions
- ✅ **Accessibility Assistance** - Maintain WCAG 2.1 Level AA compliance with automated checks
- ✅ **TypeScript Support** - Type-safe component compositions with proper prop inheritance
- ✅ **Testing Guidance** - Best practices for testing fpkit-based components

### Quick Install

### User-level installation (available in all projects)

```bash
npx gitpick shawn-sandy/acss/tree/main/.claude/skills/fpkit-developer ~/.claude/skills/fpkit-developer
```

### Project-specific installation

```bash
cd /path/to/your/project
```

```bash
npx gitpick shawn-sandy/acss/tree/main/.claude/skills/fpkit-developer ./.claude/skills/fpkit-developer
```

**What is gitpick?** A lightweight tool (<35kb) for selective cloning from GitHub repositories. Learn more at [github.com/nrjdalal/gitpick](https://github.com/nrjdalal/gitpick).

### Usage Examples

Once installed, the skill activates automatically when working with @fpkit/acss:

**Compose a Custom Component:**
```
You: "Create a StatusButton that combines Button and Badge from fpkit"
Claude: [Provides composition with proper TypeScript types and accessibility]
```

**Validate Your Styles:**
```
You: "Check if my CSS variables follow fpkit conventions"
Claude: [Validates naming patterns, units, and provides fixes]
```

**Ensure Accessibility:**
```
You: "Review this component for WCAG AA compliance"
Claude: [Analyzes semantic HTML, ARIA, keyboard nav, and color contrast]
```

### Learn More

- **[Full Skill Documentation](../../.claude/skills/fpkit-developer/README.md)** - Complete usage guide and examples
- **[Reference Guides](../../.claude/skills/fpkit-developer/references/)** - Composition patterns, CSS variables, accessibility, and more
- **Requirements:** Claude Code, @fpkit/acss installed in your project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License

Copyright (c) 2024 Shawn Sandy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
