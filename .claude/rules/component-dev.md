---
paths:
  - "packages/fpkit/src/**"
---

# Component Development Conventions

## File Structure

```
{name}/
├── {name}.tsx               # Component
├── {name}.scss              # Styles
├── {name}.stories.tsx       # Storybook stories
├── {name}.test.tsx          # Tests
└── index.ts                 # Exports
```

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

> Update `docs/css-variables.md` whenever new CSS custom properties are added.

## SCSS Patterns

- **Mobile-first:** Use `min-width`, never `max-width`. Base styles apply small-screen.
- **Breakpoints:** Use SCSS variables (not CSS custom properties): `$icon-label-bp: 48rem !default`
- **Centering:** Prefer `display: inline-grid; place-items: center` (not `inline-flex + align/justify-items`)
- **Side-by-side layout:** Add `grid-auto-flow: column` for icon + label horizontal alignment
- **Global tokens:** Expose magic numbers as `:root { --component-size: 3rem; }` for consumer override
- **Visually hidden:** `clip-path: inset(50%)` (modern) + `clip: rect(0,0,0,0)` (legacy fallback) together

## Architectural Patterns

**Data attribute variants** (NOT className):

- `data-btn` → size/block (`sm`, `lg`, `block`)
- `data-style` → visual style (`outline`, `pill`, `text`, `icon`)
- `data-color` → semantic color (`primary`, `danger`, `success`)

SCSS selects with `[data-btn~="lg"]` (space-separated list matching).

**`useDisabledState` hook** (`src/hooks/useDisabledState.ts`):

- Uses `aria-disabled` instead of native `disabled` to keep buttons in tab order (WCAG 2.1.1)
- Returns `{ disabledProps, handlers }`, auto-merges `.is-disabled`

**Polymorphic `as` prop:** Base components accept `as` to render different HTML elements.

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
  title: "FP.React Components/ComponentName",
  component: Component,
  tags: ["stable"],  // stable | beta | rc | deprecated | experimental | new
};
```

## Testing Gotchas

- `userEvent` is from `storybook/test`, NOT `@testing-library/user-event`
- Mock functions: `import jest from 'jest-mock'`
- `src/test/setup.ts` mocks `HTMLDialogElement` methods (jsdom limitation) — Dialog/Modal tests rely on this
