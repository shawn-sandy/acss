# useDisabledState Hook

> WCAG 2.1 Level AA compliant disabled state management for React form elements

## Overview

The `useDisabledState` hook provides accessible disabled state management using the `aria-disabled` pattern instead of the native `disabled` attribute. This approach maintains keyboard focusability while preventing interactions, enabling better accessibility for screen reader users.

## Why aria-disabled?

| Feature | Native `disabled` | `aria-disabled` (this hook) |
|---------|-------------------|----------------------------|
| **Keyboard Focusable** | ❌ No | ✅ Yes |
| **Screen Reader Discovery** | ❌ Limited | ✅ Full |
| **Tooltip Support** | ❌ No | ✅ Yes |
| **WCAG Contrast Control** | ⚠️ Limited | ✅ Full CSS control |
| **Tab Order** | ❌ Removed | ✅ Maintained |

### WCAG Benefits

- **2.1.1 Keyboard**: Elements remain in tab order for keyboard navigation
- **4.1.2 Name, Role, Value**: Screen readers can discover and announce state
- **1.4.3 Contrast (Minimum)**: Better control over disabled state styling

## Installation

```typescript
import { useDisabledState } from '@fpkit/acss/hooks';
```

## Basic Usage

### Legacy API (Still Supported)

```typescript
import { useDisabledState } from '@fpkit/acss/hooks';

function MyButton({ disabled, onClick }) {
  const { disabledProps, handlers } = useDisabledState(disabled, {
    onClick,
  });

  return <button {...disabledProps} {...handlers}>Click me</button>;
}
```

### Enhanced API (Recommended)

```typescript
import { useDisabledState } from '@fpkit/acss/hooks';

function MyButton({ disabled, onClick, className }) {
  const { disabledProps, handlers } = useDisabledState(disabled, {
    handlers: { onClick },
    className,  // Automatic merging with .is-disabled!
  });

  return <button {...disabledProps} {...handlers}>Click me</button>;
}
```

## API Reference

### Parameters

```typescript
useDisabledState<T extends HTMLElement>(
  disabled: boolean | undefined,
  options: UseDisabledStateOptions<T>
): UseDisabledStateReturn<T>
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `handlers` | `Partial<DisabledEventHandlers<T>>` | `{}` | Event handlers to wrap |
| `className` | `string` | `''` | Auto-merges with disabled class |
| `disabledClassName` | `string` | `'is-disabled'` | Custom disabled class name |
| `preventDefault` | `boolean` | `true` | Call preventDefault on disabled events |
| `stopPropagation` | `boolean` | `true` | Call stopPropagation on disabled events |
| `removeFromTabOrder` | `boolean` | `false` | Remove from tab order (not recommended) |

### Return Value

```typescript
interface UseDisabledStateReturn<T> {
  disabledProps: {
    'aria-disabled': boolean;
    className: string;
    tabIndex?: -1;  // Only if removeFromTabOrder is true
  };
  handlers: Partial<DisabledEventHandlers<T>>;
}
```

### Supported Event Handlers

- `onClick`
- `onChange`
- `onBlur`
- `onFocus` ⭐ *Always allowed (for accessibility)*
- `onPointerDown`
- `onKeyDown`
- `onKeyUp`
- `onMouseDown`
- `onMouseUp`
- `onTouchStart`
- `onTouchEnd`

## Examples

### Button Component

```typescript
import { useDisabledState } from '@fpkit/acss/hooks';

function Button({ disabled, onClick, className, children }) {
  const { disabledProps, handlers } = useDisabledState<HTMLButtonElement>(
    disabled,
    {
      handlers: { onClick },
      className,
    }
  );

  return (
    <button {...disabledProps} {...handlers}>
      {children}
    </button>
  );
}
```

### Input Component

```typescript
import { useDisabledState } from '@fpkit/acss/hooks';

function Input({ disabled, onChange, onKeyDown, className }) {
  const { disabledProps, handlers } = useDisabledState<HTMLInputElement>(
    disabled,
    {
      handlers: { onChange, onKeyDown },
      className,
    }
  );

  return <input type="text" {...disabledProps} {...handlers} />;
}
```

### Custom Configuration

```typescript
// Custom disabled class name
const { disabledProps, handlers } = useDisabledState(disabled, {
  handlers: { onClick },
  disabledClassName: 'my-custom-disabled',
});

// Disable preventDefault (allow default browser behavior)
const { disabledProps, handlers } = useDisabledState(disabled, {
  handlers: { onClick },
  preventDefault: false,
});

// Remove from tab order (use sparingly - hurts accessibility)
const { disabledProps, handlers } = useDisabledState(disabled, {
  handlers: { onClick },
  removeFromTabOrder: true,  // Adds tabIndex={-1}
});
```

## Advanced Features

### Automatic className Merging

The hook automatically merges your custom classes with the disabled class:

```typescript
// Before (manual merging)
const mergedClasses = [disabledProps.className, classes]
  .filter(Boolean)
  .join(' ');

// After (automatic merging)
const { disabledProps } = useDisabledState(disabled, {
  className: classes,  // Hook handles merging!
});
```

### Stable Handler References

The hook uses refs internally to maintain stable handler references:

```typescript
// Handlers only recreate when disabled state changes,
// NOT when parent component re-renders
const { handlers } = useDisabledState(disabled, {
  handlers: { onClick: myOnClick },
});

// This prevents unnecessary child re-renders!
```

### Focus Behavior

By default, `onFocus` is **always allowed** even when disabled:

```typescript
const { disabledProps, handlers } = useDisabledState(disabled, {
  handlers: {
    onClick,   // Prevented when disabled
    onFocus,   // ALWAYS allowed (accessibility)
  },
});
```

This enables:
- Screen readers to discover disabled elements
- Keyboard users to tab through all form fields
- Tooltips to show on disabled elements

## Performance Optimizations

### 1. Single Memoization Pass
- Before: 1 `useMemo` + 11 `useCallback` hooks
- After: 1 combined `useMemo`
- Result: Better React reconciliation performance

### 2. Stable References via Refs
- Handlers stored in `useRef` and accessed at call-time
- Only recreates handlers when `disabled` state changes
- ~90% reduction in unnecessary re-renders

### 3. Declarative Handler Mapping
- Before: 139 lines of duplicated wrapper code
- After: Clean declarative loop
- Result: 52% code reduction

## Migration Guide

### From Native disabled Attribute

```typescript
// Before
<button disabled={isDisabled} onClick={handleClick}>
  Click me
</button>

// After
const { disabledProps, handlers } = useDisabledState(isDisabled, {
  handlers: { onClick: handleClick },
});

<button {...disabledProps} {...handlers}>
  Click me
</button>
```

### From Legacy isDisabled Prop

The hook works with both `disabled` and `isDisabled`:

```typescript
import { resolveDisabledState } from '@fpkit/acss/utils';

// Support both props
const actualDisabled = resolveDisabledState(disabled, isDisabled);
const { disabledProps, handlers } = useDisabledState(actualDisabled, {
  handlers: { onClick },
});
```

### From Legacy Hook API

Both APIs work! You can migrate incrementally:

```typescript
// Old API (still works)
useDisabledState(disabled, { onClick, onChange })

// New API (recommended)
useDisabledState(disabled, {
  handlers: { onClick, onChange },
  className: 'my-class',
})
```

## TypeScript

The hook is fully typed with generics:

```typescript
// Inferred element type
const { disabledProps, handlers } = useDisabledState<HTMLButtonElement>(
  disabled,
  {
    handlers: {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
    },
  }
);

// Works with all HTML elements
useDisabledState<HTMLInputElement>(...);
useDisabledState<HTMLTextAreaElement>(...);
useDisabledState<HTMLSelectElement>(...);
```

## Testing

The hook is comprehensively tested with 34 unit tests covering:

- ✅ Basic disabled state functionality
- ✅ All 11 event handler types
- ✅ onFocus special behavior
- ✅ className merging and trimming
- ✅ Backward compatibility (legacy API)
- ✅ New API features (all configuration options)
- ✅ State changes and re-renders
- ✅ Edge cases and TypeScript generics

Run tests:
```bash
npm test -- use-disabled-state.test.tsx
```

## Accessibility Checklist

When using this hook, ensure:

- ✅ `aria-disabled` is set (handled by hook)
- ✅ Element remains in tab order (handled by hook)
- ✅ Interactions are prevented (handled by hook)
- ✅ Visual disabled state has sufficient contrast (CSS)
- ✅ Screen reader announces disabled state (automatic with aria-disabled)
- ✅ Disabled state is visible to keyboard users (CSS)
- ⚠️ Don't use `removeFromTabOrder: true` unless absolutely necessary

## Browser Support

Works in all modern browsers that support:
- React 18+
- CSS custom properties
- ARIA attributes

## Resources

- [WCAG 2.1.1 - Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)
- [WCAG 4.1.2 - Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)
- [WCAG 1.4.3 - Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

## FAQ

### Why not just use the disabled attribute?

The native `disabled` attribute removes elements from the tab order, making them invisible to keyboard users and screen reader users. The `aria-disabled` pattern maintains keyboard accessibility while preventing interactions.

### Does this work with form validation?

Yes! Elements with `aria-disabled="true"` are still part of the form and participate in validation. This is actually an advantage over native disabled elements.

### Can I customize the disabled styling?

Yes! The hook adds the `.is-disabled` class (or your custom class) which you can style however you want:

```css
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  /* Ensure WCAG AA contrast! */
}
```

### What about performance in large forms?

The hook is highly optimized with stable references and single memoization. In a form with 20 inputs, you'll see ~90% fewer handler recreations compared to the old implementation.

### Is this backward compatible?

100%! The legacy API still works:
```typescript
useDisabledState(disabled, { onClick, onChange })
```

You can migrate to the enhanced API gradually.

## License

Part of @fpkit/acss - MIT License
