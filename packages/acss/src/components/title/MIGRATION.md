# Migration Guide: Heading → Title

## Summary of Changes

The `Heading` component has been refactored and renamed to `Title` with improved API design, better accessibility, and enhanced developer experience.

## What Changed?

### 1. Component Name
- **Old**: `Heading`
- **New**: `Title`

### 2. Prop Names
- **Old**: `type` prop
- **New**: `level` prop (more semantic)

### 3. Default Behavior
- **Old**: Default heading level was `h3`
- **New**: Default heading level is `h2`

### 4. Improvements Added
- ✅ **Memoization**: Component wrapped with `React.memo` for performance
- ✅ **Ref Forwarding**: Properly typed refs for DOM access
- ✅ **Better TypeScript**: Comprehensive JSDoc comments for IDE support
- ✅ **Enhanced Accessibility**: Better WCAG 2.1 AA compliance documentation
- ✅ **Comprehensive Tests**: 31 test cases covering all functionality
- ✅ **Storybook Stories**: Interactive examples with accessibility checks

## Quick Migration

### Before (Deprecated)
```tsx
import { Heading } from '@fpkit/acss';

<Heading type="h2">Section Title</Heading>
<Heading type="h3" id="subsection">Subsection</Heading>
<Heading>Default (renders as h3)</Heading>
```

### After (Recommended)
```tsx
import { Title } from '@fpkit/acss';

<Title level="h2">Section Title</Title>
<Title level="h3" id="subsection">Subsection</Title>
<Title>Default (renders as h2)</Title>
```

## Backwards Compatibility

The `Heading` component **still works** and provides 100% backwards compatibility:

- ✅ All existing code continues to function
- ⚠️ Console warnings in development mode
- 📅 Will be removed in **v3.0.0**

### Deprecation Warnings

In development mode, you'll see:

```
[@fpkit/acss] Heading component is deprecated and will be removed in v3.0.0.
Please use the Title component instead.
Migration: <Heading type="h2"> → <Title level="h2">
See documentation: https://fpkit.dev/components/title
```

## Migration Steps

### Step 1: Find All Usages

```bash
# Search for all Heading imports
grep -r "import.*Heading" src/

# Search for all Heading components in JSX
grep -r "<Heading" src/
```

### Step 2: Update Imports

```tsx
// Before:
import { Heading } from '@fpkit/acss';

// After:
import { Title } from '@fpkit/acss';
```

### Step 3: Update Component Names and Props

```tsx
// Before:
<Heading type="h1">Page Title</Heading>
<Heading type="h2">Section</Heading>

// After:
<Title level="h1">Page Title</Title>
<Title level="h2">Section</Title>
```

### Step 4: Handle Default Behavior

If you relied on the default `h3` behavior:

```tsx
// Before (default was h3):
<Heading>Title</Heading>

// After (default is now h2):
// Option 1: Accept new default
<Title>Title</Title>

// Option 2: Explicitly use h3
<Title level="h3">Title</Title>
```

### Step 5: Test Your Changes

```bash
# Run your tests
npm test

# Check your app visually
npm start
```

## Automated Migration (Optional)

You can use find-and-replace, but **review changes carefully**:

```bash
# Replace component name (dry run first!)
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i '' 's/<Heading/<Title/g' {} +

# Replace prop name
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i '' 's/type="/level="/g' {} +

# Update imports
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i '' 's/import { Heading }/import { Title }/g' {} +
```

⚠️ **Warning**: The `type=` replacement may affect other components. Review all changes!

## Type Safety

Both components are fully typed:

```tsx
import { Title, type TitleProps, type HeadingLevel } from '@fpkit/acss';

// Custom wrapper
interface SectionTitleProps extends TitleProps {
  emphasized?: boolean;
}

const SectionTitle = ({ emphasized, ...props }: SectionTitleProps) => (
  <Title
    {...props}
    className={emphasized ? 'font-bold' : ''}
  />
);
```

## Benefits of Migrating

### Better API
- `level` is more semantic than `type`
- Clearer intent in code

### Performance
- Memoization reduces unnecessary re-renders
- Better for large component trees

### Developer Experience
- Comprehensive JSDoc comments
- Better IDE autocomplete
- Improved error messages

### Accessibility
- Enhanced WCAG 2.1 documentation
- Better examples for screen reader support
- Improved heading hierarchy guidance

## Need Help?

- 📚 [Full Documentation](README.md)
- 📖 [Storybook Examples](?path=/docs/fp-react-components-title--docs)
- 🐛 [Report Issues](https://github.com/fpkit/acss/issues)

## Timeline

- **v2.x**: Both components available, `Heading` deprecated
- **v3.0.0**: `Heading` component removed (breaking change)

Migrate before v3.0.0 to avoid breaking changes!
