---
paths:
  - "packages/acss/src/components/**"
  - "packages/acss/src/**/*.stories.tsx"
  - "packages/acss/src/**/*.test.tsx"
---

# Component Conventions

## CSS Variable Naming

Pattern: `--{component}-{element?}-{variant?}-{property}-{state?}`

```scss
--btn-bg
--btn-padding-inline
--btn-primary-bg
--btn-hover-bg
--card-header-padding
```

**Allowed abbreviations:** `bg`, `fs`, `fw`, `gap`, `radius`

**Use full words for:** padding, margin, color, border, display, width, height

**Use logical properties:** `padding-inline`, `padding-block`, `margin-inline`, `margin-block`

## Architectural Patterns

### Data Attribute Variants

Variants use `data-*` attributes, NOT className:

- `data-btn` → size/block (`sm`, `lg`, `block`)
- `data-style` → visual style (`outline`, `pill`, `text`, `icon`)
- `data-color` → semantic color (`primary`, `danger`, `success`)

SCSS selects with `[data-btn~="lg"]` (space-separated list matching).

### `useDisabledState` Hook

Located at `src/hooks/useDisabledState.ts`:

- Uses `aria-disabled` instead of native `disabled` to keep buttons in tab order (WCAG 2.1.1)
- Returns `{ disabledProps, handlers }`
- Auto-merges `.is-disabled` className

### Polymorphic `as` Prop

Base components accept `as` prop to render different HTML elements:

```tsx
<Box as="section">
<Text as="span">
<Flex as="nav">
```

## Storybook Stories

**Always import the component `.scss` in the story file:**

```tsx
import "./button.scss"; // Required in every story file
```

```tsx
const meta: Meta<typeof Component> = {
  title: "FP.React Components/ComponentName",  // Use "FP.React" prefix
  component: Component,
  tags: ["stable"],  // stable | beta | rc | deprecated | experimental | new
};
```

Tag values: `stable | beta | rc | deprecated | experimental | new`

## Testing Gotchas

- `userEvent` is imported from `storybook/test`, NOT `@testing-library/user-event`
- Mock functions use `jest-mock`: `import jest from 'jest-mock'`
- `src/test/setup.ts` mocks `HTMLDialogElement` methods (jsdom limitation) — Dialog/Modal tests rely on this
