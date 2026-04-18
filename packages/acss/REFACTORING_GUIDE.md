# @fpkit/acss Refactoring Guide

## Overview

This document outlines the refactoring strategy for the @fpkit/acss component library to support both **barrel exports** (all components in one import) and **individual component exports** (tree-shakable imports).

## Export Strategy

### 1. Barrel Exports (Main Bundle)

Import all components from the main entry point:

```typescript
// Import all components at once
import { Button, Card, Modal, Input, Link } from '@fpkit/acss';

// Or import specific components
import { Button, type ButtonProps } from '@fpkit/acss';
```

### 2. Individual Component Exports

Import components individually for better tree-shaking:

```typescript
// Individual component imports
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';
import { Modal } from '@fpkit/acss/modal';

// With TypeScript types
import { Button, type ButtonProps } from '@fpkit/acss/button';
import { Card, type CardProps } from '@fpkit/acss/card';
```

## Build Configuration

### Main Build (`tsup.config.cjs`)

- Builds the main bundle with all components
- Creates `libs/index.js` and `libs/index.cjs`
- Includes hooks and icons as separate bundles

### Component Build (`tsup.components.config.cjs`)

- Builds individual component bundles
- Creates `libs/components/[component].js` files
- Optimized for tree-shaking

## File Structure

```
src/
├── index.ts                    # Main barrel export
├── hooks.ts                    # Hooks barrel export
├── icons.ts                    # Icons barrel export
├── components/
│   ├── button.ts              # Individual button export
│   ├── card.ts                # Individual card export
│   ├── modal.ts               # Individual modal export
│   ├── buttons/
│   │   └── button.tsx         # Button component implementation
│   ├── cards/
│   │   └── card.tsx           # Card component implementation
│   └── modal/
│       └── modal.tsx          # Modal component implementation
```

## Package.json Exports

The `package.json` exports field defines how consumers can import components:

```json
{
  "exports": {
    ".": "./libs/index.js",           // Main bundle
    "./button": "./libs/components/button.js",
    "./card": "./libs/components/card.js",
    "./modal": "./libs/components/modal.js",
    "./hooks": "./libs/hooks.js",
    "./icons": "./libs/icons.js",
    "./styles": "./libs/index.css"
  }
}
```

## Usage Examples

### React Application

```tsx
// Option 1: Barrel imports (easier, larger bundle)
import { Button, Card, Modal } from '@fpkit/acss';
import '@fpkit/acss/styles';

function App() {
  return (
    <div>
      <Button type="button">Click me</Button>
      <Card>
        <Card.Title>Hello World</Card.Title>
        <Card.Content>This is a card</Card.Content>
      </Card>
    </div>
  );
}

// Option 2: Individual imports (better tree-shaking)
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';
import '@fpkit/acss/styles';

function App() {
  return (
    <div>
      <Button type="button">Click me</Button>
      <Card>
        <Card.Title>Hello World</Card.Title>
        <Card.Content>This is a card</Card.Content>
      </Card>
    </div>
  );
}
```

### Next.js Application

```tsx
// pages/_app.tsx
import '@fpkit/acss/styles';

// components/MyComponent.tsx
import { Button } from '@fpkit/acss/button';
import { Card } from '@fpkit/acss/card';

export default function MyComponent() {
  return (
    <Card>
      <Card.Title>Next.js Example</Card.Title>
      <Card.Content>
        <Button type="button">Action</Button>
      </Card.Content>
    </Card>
  );
}
```

## Build Scripts

```bash
# Build everything (main bundle + individual components)
npm run build

# Build only individual components
npm run build:components

# Development with watch mode
npm run package:watch

# Build with Sass compilation
npm run build:sass
```

## Benefits

### For Library Maintainers

- **Backward Compatibility**: Existing imports continue to work
- **Flexible Distribution**: Support both use cases
- **Better DX**: Clear separation of concerns
- **Easier Testing**: Individual components can be tested in isolation

### For Library Consumers

- **Bundle Size Optimization**: Import only what you need
- **Better Tree Shaking**: Webpack/Vite can eliminate unused code
- **Faster Build Times**: Smaller dependency graphs
- **Cleaner Imports**: Choose the import style that fits your project

## Migration Path

### Phase 1: Add Individual Exports (Current)

- ✅ Create individual component export files
- ✅ Update build configuration
- ✅ Add package.json exports
- ✅ Maintain backward compatibility

### Phase 2: Optimize Components (Future)

- Create more individual export files for remaining components
- Add comprehensive TypeScript types
- Optimize bundle splitting
- Add component-specific CSS exports

### Phase 3: Documentation & Tooling (Future)

- Update Storybook to showcase both import methods
- Create migration guide for existing users
- Add bundle analyzer to track size improvements
- Create ESLint rules for consistent imports

## Component Export Template

When adding new components, follow this pattern:

```typescript
// src/components/[component-name].ts
export { ComponentName, type ComponentProps } from './[component-folder]/[component-name]';
export { default } from './[component-folder]/[component-name]'; // Only if default export exists
```

Then add to:

1. `tsup.config.cjs` entry array
2. `tsup.components.config.cjs` entry array  
3. `package.json` exports object
4. Main `src/index.ts` barrel export

## TypeScript Support

All individual exports maintain full TypeScript support:

```typescript
import { Button, type ButtonProps } from '@fpkit/acss/button';

const buttonProps: ButtonProps = {
  type: 'button',
  children: 'Click me'
};

<Button {...buttonProps} />
```

## CSS and Styling

Styles are available through multiple import paths:

```typescript
// Main stylesheet (all components)
import '@fpkit/acss/styles';

// Individual component styles (future enhancement)
import '@fpkit/acss/button/styles';
import '@fpkit/acss/card/styles';
```
