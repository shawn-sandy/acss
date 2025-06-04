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

// Usage
<Button type="button" onClick={() => console.log('clicked')}>
  Click me
</Button>

// With TypeScript
import { Button, type ButtonProps } from '@fpkit/acss/button';

const buttonProps: ButtonProps = {
  type: 'submit',
  disabled: false,
  children: 'Submit Form'
};
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

- **Button** - Accessible button with variants
- **Card** - Flexible card container with composable parts
- **Modal** - Accessible modal dialog
- **Dialog** - General purpose dialog component
- **Input** - Form input with validation
- **Field** - Form field wrapper with label and error
- **Link** - Accessible link component
- **List** - Semantic list components

### Layout Components

- **Box** - Generic container component
- **Nav** - Navigation components
- **Landmarks** - Semantic landmark components

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
