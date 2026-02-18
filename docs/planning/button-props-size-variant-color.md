# Button: Add size, variant, color Props

## Context

The Button component currently exposes styling only via raw `data-btn` HTML attributes (e.g. `data-btn="sm"`, `data-btn="pill"`). There is no typed API for size, style variant, or color — consumers must know the internal CSS attribute convention. The Link component (`link.tsx`) already supports a `btnStyle` prop and outline-style button rendering. This plan adds first-class `size`, `variant`, and `color` props to Button, matching the ergonomics of newer components.

---

## Files to Modify

| File | Change |
|------|--------|
| `packages/fpkit/src/components/buttons/button.tsx` | Add `size`, `variant`, `color` props; merge into data attributes |
| `packages/fpkit/src/components/buttons/button.scss` | Add `[data-color]` and `[data-style]` variant selectors |
| `packages/fpkit/src/components/buttons/button.stories.tsx` | Add size, variant, color stories; update meta argTypes |

---

## Step-by-Step Plan

### 1. Update `ButtonProps` in `button.tsx`

Add three new optional props to the type:

```typescript
export type ButtonProps = Partial<React.ComponentProps<typeof UI>> &
  DisabledStateProps & {
    type: "button" | "submit" | "reset";
    /** Size token: maps to data-btn attribute */
    size?: "xs" | "sm" | "md" | "lg";
    /** Style variant: maps to data-style attribute */
    variant?: "text" | "pill" | "icon" | "outline";
    /** Color variant: maps to data-color attribute */
    color?: "primary" | "secondary" | "danger" | "success" | "warning";
  };
```

### 2. Update `Button` render in `button.tsx`

- Destructure `size`, `variant`, `color` from props
- Merge `size` with any explicit `data-btn` passed by the consumer (space-separated, so both `size="sm"` and `data-btn="pill"` can coexist)
- Pass `variant` as `data-style`, `color` as `data-color`

```tsx
const { "data-btn": dataBtnProp, ...restProps } = props;
const dataBtnValue = [size, dataBtnProp as string | undefined]
  .filter(Boolean).join(" ") || undefined;

return (
  <UI
    as="button"
    type={type}
    data-btn={dataBtnValue}
    data-style={variant}
    data-color={color}
    aria-disabled={disabledProps["aria-disabled"]}
    style={styles}
    className={disabledProps.className}
    onPointerOver={onPointerOver}
    onPointerLeave={onPointerLeave}
    {...handlers}
    {...restProps}
  >
    {children}
  </UI>
);
```

### 3. Add `[data-color]` selectors to `button.scss`

Color variants use semantic tokens from `index.css`. Place after the reset/submit type rules:

```scss
// Color variants
&[data-color="primary"] {
  --btn-bg: var(--color-primary);
  --btn-color: var(--color-text-inverse);
}
&[data-color="secondary"] {
  --btn-bg: var(--color-secondary);
  --btn-color: var(--color-text-inverse);
}
&[data-color="danger"] {
  --btn-bg: var(--color-error);
  --btn-color: var(--color-text-inverse);
}
&[data-color="success"] {
  --btn-bg: var(--color-success);
  --btn-color: var(--color-text-inverse);
}
&[data-color="warning"] {
  --btn-bg: var(--color-warning);
  --btn-color: var(--color-text-inverse);
}
```

### 4. Add `[data-style~="outline"]` selector to `button.scss`

Mirrors the link button's outlined style. Add alongside existing `[data-btn~="text"]`:

```scss
&[data-style~="outline"] {
  --btn-bg: transparent;
  --btn-color: currentColor;
  --btn-border: 0.125rem solid currentColor;

  &:is(:hover, :focus) {
    background-color: color-mix(in srgb, currentColor 10%, transparent);
    filter: none;
    outline: 0.025rem solid currentColor;
    outline-offset: 0;
  }
}
```

Also alias existing `data-btn` style variants to `data-style` for consistency (size/style separation):

```scss
// Allow variant prop (data-style) for existing btn styles
&[data-style~="pill"] {
  border-radius: var(--btn-pill, 100rem);
}
&[data-style~="text"] {
  // same tokens as [data-btn~="text"]
  --btn-bg: transparent;
  --btn-color: currentColor;
  --btn-border: none;
  --btn-height: unset;
  --btn-width: unset;
  --btn-padding-block: 0.75rem;
  --btn-padding-inline: 0.75rem;
  &:is(:hover, :focus) {
    background-color: color-mix(in srgb, var(--btn-color) 10%, transparent);
    outline: 0.025rem solid var(--btn-color);
    outline-offset: 0;
    filter: none;
  }
}
&[data-style~="icon"] {
  padding: unset;
  height: unset;
  --btn-bg: transparent;
  min-width: 1.5rem;
  min-height: 1.5rem;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### 5. Update `button.stories.tsx`

- Add `argTypes` to meta for `size`, `variant`, `color` (control: "select")
- Add size stories using the `size` prop (replacing raw `data-btn`)
- Add variant stories: `Pill`, `TextVariant`, `Outline`, `IconVariant`
- Add color stories: `Primary`, `Secondary`, `Danger`, `Success`, `Warning`
- Add combination stories: `PrimaryOutline`, `DangerPill`, `SuccessPill`

---

## Verification

1. Run `npm test` in `packages/fpkit/` — all existing tests must pass
2. Run Storybook (`npm start` from root) — verify:
   - New size/variant/color stories render with correct styles
   - `data-btn` prop still works as before (backward-compatible)
   - Disabled state works across all new color variants
   - `variant="outline"` matches the bordered style of link's button mode
3. Check TypeScript: `npx tsc --noEmit` in `packages/fpkit/`

---

## Unresolved Questions

None — no ambiguities remain.
