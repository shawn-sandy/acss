# Title Component

A semantic heading component for document structure and hierarchy.

## Overview

The `Title` component renders semantic HTML headings (h1-h6) with proper accessibility support, ensuring WCAG 2.1 AA compliance by maintaining semantic document structure for screen readers and assistive technologies.

## Features

- ✅ **Semantic HTML** - Renders actual heading elements (h1-h6) for proper document outline
- ✅ **Accessibility** - Full ARIA support and proper heading hierarchy
- ✅ **Flexible Styling** - Supports fpkit's UI system, custom classes, and inline styles
- ✅ **Type Safety** - Fully typed with TypeScript for excellent developer experience
- ✅ **Performance** - Memoized to prevent unnecessary re-renders
- ✅ **Ref Forwarding** - Access the underlying DOM element for focus management

## Installation

```bash
npm install @fpkit/acss
```

## Basic Usage

```tsx
import { Title } from '@fpkit/acss';

function MyComponent() {
  return (
    <>
      <Title level="h1">Page Title</Title>
      <Title level="h2">Section Heading</Title>
      <Title level="h3">Subsection Heading</Title>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h2"` | The semantic heading level to render |
| `children` | `React.ReactNode` | *required* | The content to display in the heading |
| `id` | `string` | - | Unique identifier (useful for anchor links) |
| `ui` | `string` | - | Data attribute for fpkit styling hooks |
| `className` | `string` | - | CSS class names to apply |
| `styles` | `React.CSSProperties` | - | Inline styles to apply |
| `ref` | `React.Ref<HTMLHeadingElement>` | - | Forwarded ref to the heading element |

The component also accepts all standard HTML heading attributes and ARIA properties.

## Examples

### Default Usage

```tsx
<Title>This renders as h2 (default)</Title>
```

### Page Title

```tsx
<Title level="h1">Welcome to Our Application</Title>
```

### With ID for Anchor Links

```tsx
<Title level="h2" id="getting-started">
  Getting Started
</Title>

{/* Link to this section */}
<a href="#getting-started">Jump to Getting Started</a>
```

### With Custom Styling

```tsx
{/* Using fpkit's UI system */}
<Title level="h2" ui="section-title">
  Features Overview
</Title>

{/* Using CSS classes */}
<Title level="h2" className="text-primary font-bold">
  Custom Styled Title
</Title>

{/* Using inline styles */}
<Title
  level="h2"
  styles={{ color: '#0066cc', marginBottom: '1rem' }}
>
  Inline Styled Title
</Title>
```

### With ARIA Attributes

```tsx
{/* Enhanced accessibility with aria-label */}
<Title level="h2" aria-label="User dashboard overview">
  Dashboard
</Title>

{/* Using aria-labelledby */}
<>
  <div id="section-label">Important Section</div>
  <Title level="h2" aria-labelledby="section-label">
    Section Content
  </Title>
</>
```

### With Ref for Focus Management

```tsx
import { useRef, useEffect } from 'react';

function AutoFocusTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus the title on mount (useful for accessibility)
    titleRef.current?.focus();
  }, []);

  return (
    <Title ref={titleRef} tabIndex={-1}>
      This title receives focus
    </Title>
  );
}
```

### Complex Content

```tsx
<Title level="h2">
  <Icon name="chart" aria-hidden="true" />
  <span>Statistics Dashboard</span>
</Title>
```

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

The Title component helps you comply with:

- **1.3.1 Info and Relationships (Level A)** - Semantic heading elements preserve document structure
- **2.4.6 Headings and Labels (Level AA)** - Headings should be descriptive and properly ordered
- **2.4.10 Section Headings (Level AAA)** - Use headings to organize content

### Best Practices

#### ✅ DO: Maintain Proper Heading Hierarchy

```tsx
<Title level="h1">Page Title</Title>
<Title level="h2">Main Section</Title>
<Title level="h3">Subsection</Title>
<Title level="h4">Sub-subsection</Title>
```

**Why?** Screen readers use heading hierarchy to build a document outline for navigation.

#### ❌ DON'T: Skip Heading Levels

```tsx
{/* ❌ BAD: Skipping from h1 to h4 */}
<Title level="h1">Page Title</Title>
<Title level="h4">Skipped h2 and h3</Title>
```

**Why?** This confuses screen reader users and violates WCAG guidelines.

#### ✅ DO: Use One h1 Per Page

```tsx
<Title level="h1">Main Page Title</Title>
{/* Only one h1 per page */}
<Title level="h2">Section 1</Title>
<Title level="h2">Section 2</Title>
```

**Why?** Multiple h1 elements can confuse users about the page's main purpose.

#### ✅ DO: Make Headings Descriptive

```tsx
{/* ✅ GOOD: Descriptive */}
<Title level="h2">User Account Settings</Title>

{/* ❌ BAD: Vague */}
<Title level="h2">Settings</Title>
```

**Why?** Users navigating by headings need context to understand each section.

#### ✅ DO: Avoid Empty or Meaningless Headings

```tsx
{/* ❌ BAD: No meaningful content */}
<Title level="h2"> </Title>

{/* ✅ GOOD: Clear content */}
<Title level="h2">Contact Information</Title>
```

## Performance Considerations

The Title component is wrapped with `React.memo`, which prevents re-renders when parent components update if the props haven't changed.

```tsx
// This will only re-render when `title` prop changes
function ParentComponent({ title, someOtherState }) {
  return (
    <>
      <Title level="h2">{title}</Title>
      <p>{someOtherState}</p>
    </>
  );
}
```

## TypeScript

The component is fully typed with comprehensive TypeScript support:

```tsx
import { Title, type TitleProps, type HeadingLevel } from '@fpkit/acss';

// Custom wrapper with additional props
interface SectionTitleProps extends TitleProps {
  highlighted?: boolean;
}

function SectionTitle({ highlighted, ...props }: SectionTitleProps) {
  return (
    <Title
      {...props}
      className={highlighted ? 'highlighted' : ''}
    />
  );
}

// Type-safe heading level
const level: HeadingLevel = 'h2';
<Title level={level}>Typed Title</Title>
```

## Migration from Heading Component

If you're migrating from the deprecated `Heading` component, follow these steps:

### Step 1: Update Imports

```tsx
// Before:
import { Heading } from '@fpkit/acss';

// After:
import { Title } from '@fpkit/acss';
```

### Step 2: Update Component Name and Props

```tsx
// Before:
<Heading type="h2">Section Title</Heading>

// After:
<Title level="h2">Section Title</Title>
```

### Step 3: Update Default Behavior

The default heading level changed from `h3` to `h2`:

```tsx
// Before (rendered as h3):
<Heading>Default Heading</Heading>

// After (renders as h2):
<Title>Default Title</Title>

// To maintain h3 behavior explicitly:
<Title level="h3">Default Title</Title>
```

### Automated Migration

You can use a codemod or find-and-replace:

```bash
# Find all instances
grep -r "Heading" src/

# Replace in files (review changes before committing!)
find src/ -type f -name "*.tsx" -exec sed -i '' 's/<Heading/<Title/g' {} +
find src/ -type f -name "*.tsx" -exec sed -i '' 's/type="/level="/g' {} +
```

### Deprecation Timeline

- **Current**: `Heading` component works but logs warnings in development
- **v3.0.0**: `Heading` component will be removed

## Related Components

- **Text** - For body text and paragraphs
- **UI** - The underlying polymorphic component

## Support

For issues, questions, or contributions, visit:
- GitHub: [fpkit/acss](https://github.com/fpkit/acss)
- Documentation: [fpkit.dev](https://fpkit.dev)

## License

MIT © FirstPaint
