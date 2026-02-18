# Plan: IconButton — Own File + Optional Label (Hidden on Mobile)

## Context

The `IconButton` in `button.tsx` is incomplete and co-located with `Button`.

This plan covers:

1. Moving `IconButton` to its own dedicated file (`icon-button.tsx`)
2. Fixing the missing `IconButtonProps` type and accessible label requirement
3. Adding an optional `label` prop (text next to icon) that is hidden on mobile

---

## Issues Found

| # | Issue | Severity |
|---|-------|----------|
| 1 | `icon` prop destructured from `ButtonProps` but not defined there → TypeScript error | Critical |
| 2 | `IconButton` not exported from `src/index.ts` → not available to consumers | Critical |
| 3 | No accessible label required → icon-only buttons are inaccessible (WCAG 2.1 SC 1.1.1) — must support `aria-label` or `aria-labelledby` | High |
| 4 | No dedicated `IconButtonProps` type | Medium |
| 5 | `variant="icon"` not set as default → must be passed manually | Medium |
| 6 | `IconButton` co-located in `button.tsx` — should have its own file | Medium |
| 7 | No optional `label` prop for text alongside icon (hidden on mobile) | Medium |
| 8 | No Storybook stories | Medium |
| 9 | No unit tests | Medium |
| 10 | Duplicate icon CSS block in `button.scss` (`[data-style~="icon"]` and `[data-btn~="icon"]` identical) | Low |

---

## Critical Files

| File | Action |
|------|--------|
| `packages/fpkit/src/components/buttons/button.tsx` | Remove `IconButton` |
| `packages/fpkit/src/components/buttons/button.scss` | Delete dead `[data-btn~="icon"]` block |
| `packages/fpkit/src/components/buttons/icon-button.tsx` | Create — component + types |
| `packages/fpkit/src/components/buttons/icon-button.scss` | Create — label + responsive styles |
| `packages/fpkit/src/components/buttons/icon-button.stories.tsx` | Create — stories |
| `packages/fpkit/src/components/buttons/icon-button.test.tsx` | Create — unit tests |
| `packages/fpkit/src/index.ts` | Add `IconButton` + `IconButtonProps` exports |

---

## Implementation Steps

### 1. Remove `IconButton` from `button.tsx`

- Delete the existing `IconButton` function (buggy — `icon` not in `ButtonProps`)
- Leave `Button`, `ButtonProps`, and all other exports untouched

### 2. Fix duplicate icon block in `button.scss`

- Delete `[data-btn~="icon"]` entirely — it is dead code
- `[data-style~="icon"]` (written by the `variant` prop) is the canonical selector
- No `%placeholder` needed — removing the duplicate is sufficient

### 3. Create `icon-button.tsx`

Accessible label is enforced via a strict TypeScript XOR union — exactly one of
`aria-label` or `aria-labelledby` is required; passing both is a compile-time error.

```tsx
// Strict XOR: exactly one of aria-label or aria-labelledby required
type WithAriaLabel = { 'aria-label': string; 'aria-labelledby'?: never };
type WithAriaLabelledBy = { 'aria-label'?: never; 'aria-labelledby': string };

export type IconButtonProps = Omit<ButtonProps, 'children'> &
  (WithAriaLabel | WithAriaLabelledBy) & {
    /** Required — the icon element rendered inside the button */
    icon: React.ReactNode;
    /**
     * Optional text shown alongside the icon at desktop widths.
     * Hidden visually on mobile (< $icon-label-bp) but remains in the
     * accessibility tree — screen readers always announce it.
     *
     * NOTE: When `label` is used, `variant="icon"` (the default) removes
     * padding. Override with e.g. `variant="outline"` for a padded layout.
     */
    label?: string;
  };

export const IconButton = ({ icon, label, variant = 'icon', ...props }: IconButtonProps) => (
  <Button variant={variant} data-icon-btn={label ? 'has-label' : undefined} {...props}>
    {icon}
    {label && <span data-icon-label>{label}</span>}
  </Button>
);
```

- `data-icon-btn="has-label"` provides a CSS hook when label is present
- `variant` defaults to `'icon'` — consumer must override when using a label
- Label span has no `aria-hidden` — screen readers read it at all viewport sizes

### 4. Create `icon-button.scss`

Breakpoint is a SCSS variable so consumers using the SCSS source can override it.
CSS custom properties cannot be used in `@media` conditions — this is a known CSS limitation.

```scss
$icon-label-bp: 48rem !default; // 768px — override in your SCSS before importing

// Layout when label is present
// Higher specificity than [data-style~="icon"] to restore padding
button[data-icon-btn~='has-label'] {
  gap: 0.375rem;
  padding-inline: 0.75rem;

  [data-icon-label] {
    font-size: var(--btn-fs, 0.875rem);
    line-height: 1;
    white-space: nowrap;
  }
}

// Hide label text on mobile — icon only
// Label remains in accessibility tree (no aria-hidden); screen readers still read it
@media (max-width: #{$icon-label-bp}) {
  [data-icon-label] {
    display: none;
  }
}
```

### 5. Create `icon-button.stories.tsx`

- `IconButtonDefault` — play: render, focus, click (with `aria-label`)
- `IconButtonLabelledBy` — demonstrates `aria-labelledby` variant
- `IconButtonWithLabel` — icon + label (demonstrates responsive hiding)
- `IconButtonSizes` — xs, sm, md, lg
- `IconButtonColors` — primary, secondary, danger
- `IconButtonDisabled` — disabled state

### 6. Create `icon-button.test.tsx`

- Renders with `aria-label`
- Renders with `aria-labelledby` (references external element)
- Icon renders as child
- `label` text renders when provided
- `data-icon-label` attribute present on label span
- `data-icon-btn="has-label"` on button when label provided
- No label span when `label` is omitted
- Click handler fires
- Disabled state blocks click

### 7. Update `src/index.ts`

Add after the `Button` export:

```ts
export { IconButton } from './components/buttons/icon-button';
export type { IconButtonProps } from './components/buttons/icon-button';
```

---

## Decisions Log

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| Accessible label type | Strict XOR union (`never`) | Compile-time safety for WCAG 2.1 SC 1.1.1 |
| Label visibility on mobile | Visual only (no `aria-hidden`) | Screen readers should always read the label |
| `variant` default with label | Keep `'icon'`, consumer overrides | Simpler implementation; document the trade-off |
| SCSS duplicate cleanup | Delete `[data-btn~="icon"]` | It is dead code; `data-style` is canonical |
| Mobile breakpoint | SCSS variable `$icon-label-bp: 48rem` | CSS vars can't be used in `@media` conditions |

---

## Verification

1. `npm run lint` — no TypeScript errors
2. `npm test` (in `packages/fpkit/`) — all tests pass
3. Storybook — navigate to `FP.React Components/Buttons`:
   - `IconButtonWithLabel` shows icon + text at desktop widths
   - Resize to < 768px — label hides, icon only remains
4. Import check: `import { IconButton, type IconButtonProps } from '@fpkit/acss'` resolves correctly
5. TypeScript: passing both `aria-label` and `aria-labelledby` produces a compile error
