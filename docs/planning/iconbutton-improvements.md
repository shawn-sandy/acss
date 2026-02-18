# Plan: IconButton Component Improvements

## Context

The `IconButton` component exists in `button.tsx` but is incomplete and not production-ready. It has a TypeScript bug (missing `icon` in `ButtonProps`), lacks required accessibility props (`aria-label`), is not exported from the package entry point, and has no stories or tests. This plan fixes all of those gaps.

---

## Issues Found

| # | Issue | Severity |
|---|-------|----------|
| 1 | `icon` prop destructured from `ButtonProps` but not defined there → TypeScript error | Critical |
| 2 | `IconButton` not exported from `src/index.ts` → not available to consumers | Critical |
| 3 | No `aria-label` required → icon-only buttons are inaccessible (WCAG 2.1 SC 1.1.1) | High |
| 4 | No dedicated `IconButtonProps` type | Medium |
| 5 | `variant="icon"` not set as default → must be passed manually | Medium |
| 6 | No Storybook stories | Medium |
| 7 | No unit tests | Medium |
| 8 | Duplicate icon CSS block in `button.scss` (`[data-style~="icon"]` and `[data-btn~="icon"]` identical) | Low |

---

## Critical Files

- `packages/fpkit/src/components/buttons/button.tsx` — component source
- `packages/fpkit/src/components/buttons/button.scss` — styles
- `packages/fpkit/src/components/buttons/button.stories.tsx` — stories
- `packages/fpkit/src/components/buttons/button.test.tsx` — tests
- `packages/fpkit/src/index.ts` — package exports

---

## Implementation Steps

### 1. Fix `button.tsx` — `IconButtonProps` type + component

- Add `IconButtonProps` that extends `ButtonProps`:
  - Add `icon: React.ReactNode` (required)
  - Make `aria-label` required (string)
  - Omit `children` (not needed; icon is the content)
  - Default `variant` to `"icon"`
- Rewrite `IconButton` to use `IconButtonProps`

```ts
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string; // required for a11y
}

export const IconButton = ({ icon, variant = 'icon', ...props }: IconButtonProps) => {
  return <Button variant={variant} {...props}>{icon}</Button>;
};
```

### 2. Export from `src/index.ts`

Add:
```ts
export { IconButton } from './components/buttons/button';
export type { IconButtonProps } from './components/buttons/button';
```

### 3. Clean up `button.scss`

- Consolidate the duplicate icon styles into a single `%icon-btn` SCSS placeholder
- Both `[data-style~="icon"]` and `[data-btn~="icon"]` extend it

### 4. Add Storybook stories to `button.stories.tsx`

Add `IconButton` stories:
- `IconButtonDefault` — with play function (render, focus, click)
- `IconButtonSizes` — xs, sm, md, lg
- `IconButtonColors` — primary, secondary, danger

### 5. Add tests to `button.test.tsx`

- Renders with `aria-label`
- `icon` renders as children
- Click handler fires
- Disabled state prevents click

---

## Verification

1. `npm run lint` — no TypeScript errors
2. `npm test` — all tests pass including new IconButton tests
3. Storybook — navigate to `FP.React Components/Buttons` and verify new stories render correctly with no a11y violations
4. Import `IconButton` from `@fpkit/acss` in a test file and verify types resolve correctly

---

## Unresolved Questions

- None — scope is clear.
