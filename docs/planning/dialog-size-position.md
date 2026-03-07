# Plan: Dialog Size and Position Props

## Context

The Dialog/DialogModal components currently have no way to control their size or screen position. The only dimension variable is `--dialog-min-width: max(20rem, 80%)` and the browser's default centering. This plan adds `size` and `position` **React props** to enable full-screen modals, drawers, bottom sheets, and corner-positioned dialogs. The components internally map these props to `data-size` / `data-position` attributes on the rendered `<dialog>` element, keeping the API idiomatic React while the CSS uses attribute selectors for styling.

## Files to Modify

| File | Change |
|------|--------|
| `packages/fpkit/src/components/dialog/dialog.types.ts` | Add `DialogSize`, `DialogPosition` types to `BaseDialogProps` |
| `packages/fpkit/src/components/dialog/dialog.tsx` | Pass `data-size` and `data-position` attributes to `<dialog>` |
| `packages/fpkit/src/components/dialog/dialog-modal.tsx` | Destructure and forward `size`/`position` to `<Dialog>` |
| `packages/fpkit/src/components/dialog/dialog.scss` | Add size/position CSS rules via attribute selectors |
| `packages/fpkit/src/components/dialog/dialog-modal.stories.tsx` | Add stories for sizes and positions |
| `packages/fpkit/src/components/dialog/dialog.test.tsx` | Add tests for data attribute rendering |
| `packages/fpkit/src/index.ts` | Export `DialogSize` and `DialogPosition` types |

## Implementation Steps

### 1. Update types (`dialog.types.ts`)

Add two union types and include them in `BaseDialogProps`:

```ts
export type DialogSize = "sm" | "md" | "lg" | "full";
export type DialogPosition =
  | "center" | "top" | "bottom"
  | "left" | "right"
  | "top-left" | "top-right"
  | "bottom-left" | "bottom-right";
```

Add to `BaseDialogProps`:
- `size?: DialogSize` -- Controls dialog dimensions
- `position?: DialogPosition` -- Controls where the modal appears

### 2. Update Dialog component (`dialog.tsx`)

Destructure `size` and `position` as regular React props. The component maps them to `data-*` attributes internally -- consumers never write `data-*` directly:

```tsx
// Consumer writes:
<Dialog size="full" position="right" ... />
// or
<DialogModal size="lg" position="top" ... />

// Component renders:
<dialog data-size="full" data-position="right" ... />
```

Implementation on the `<UI as="dialog">` element:

```tsx
{...(size && { "data-size": size })}
{...(position && { "data-position": position })}
```

### 3. Update DialogModal component (`dialog-modal.tsx`)

Destructure `size` and `position` from props. Forward to inner `<Dialog>`:

```tsx
<Dialog ... size={size} position={position}>
```

### 4. Add SCSS rules (`dialog.scss`)

#### 4a. New CSS custom properties in `:root`

```scss
--dialog-width: max(20rem, 80%);
--dialog-max-width: 90vw;
--dialog-height: auto;
--dialog-max-height: 85vh;
--dialog-margin: auto;
--dialog-inset: unset;
```

Keep `--dialog-min-width` as a deprecated fallback: `--dialog-width: var(--dialog-min-width, max(20rem, 80%))`.

#### 4b. Update base `dialog` rule to use new variables

```scss
dialog {
  width: var(--dialog-width);
  max-width: var(--dialog-max-width);
  height: var(--dialog-height);
  max-height: var(--dialog-max-height);
  margin: var(--dialog-margin);
  inset: var(--dialog-inset);
  border-radius: var(--dialog-border-radius);
  /* ...existing styles */
}
```

Remove old `min-width: var(--dialog-min-width)` line.

#### 4c. Size selectors

```scss
dialog[data-size="sm"]   { --dialog-width: 25rem; }
dialog[data-size="md"]   { --dialog-width: 32rem; }
dialog[data-size="lg"]   { --dialog-width: 48rem; }
dialog[data-size="full"] {
  --dialog-width: 100vw;
  --dialog-max-width: 100vw;
  --dialog-height: 100vh;
  --dialog-max-height: 100vh;
  --dialog-border-radius: 0;
  --dialog-margin: 0;
  --dialog-inset: 0;
}
```

#### 4d. Position selectors

| Position | `--dialog-margin` | `--dialog-inset` | Extra |
|----------|-------------------|-------------------|-------|
| `center` | `auto` | (unset) | Default behavior |
| `top` | `0 auto auto auto` | `0` | -- |
| `bottom` | `auto auto 0 auto` | `0` | -- |
| `left` | `0 auto 0 0` | `0` | `height: 100vh`, `border-radius: 0` |
| `right` | `0 0 0 auto` | `0` | `height: 100vh`, `border-radius: 0` |
| `top-left` | `0 auto auto 0` | `0` | -- |
| `top-right` | `0 0 auto auto` | `0` | -- |
| `bottom-left` | `auto auto 0 0` | `0` | -- |
| `bottom-right` | `auto 0 0 auto` | `0` | -- |

`left` and `right` positions set `height: 100vh` to create a drawer/panel effect.

### 5. Add stories (`dialog-modal.stories.tsx`)

- `SmallDialog` -- `size: "sm"`
- `LargeDialog` -- `size: "lg"`
- `FullScreenDialog` -- `size: "full"`
- `TopPositioned` -- `position: "top"`
- `RightDrawer` -- `position: "right", size: "sm"`
- `BottomSheet` -- `position: "bottom"`
- Add `argTypes` for `size` and `position` with `control: "select"`

### 6. Add tests (`dialog.test.tsx`)

- Renders `data-size` attribute when `size` prop is set
- Renders `data-position` attribute when `position` prop is set
- Does NOT render `data-size` when prop is undefined
- Does NOT render `data-position` when prop is undefined

### 7. Export types (`index.ts`)

Add `DialogSize` and `DialogPosition` to the existing type export block.

## Backward Compatibility

- `--dialog-min-width` kept as a fallback via `var(--dialog-min-width, max(20rem, 80%))` so existing overrides still work
- No props are required; omitting `size` and `position` preserves current behavior exactly

## Verification

1. Run `npm test` in `packages/fpkit/` -- all tests pass
2. Run `npm start` from root -- open Storybook, verify new stories render correctly
3. Test each size visually: sm, md, lg, full
4. Test each position visually: center, top, bottom, left, right, corners
5. Test `size="full"` + `position` combinations (full should win)
6. Verify keyboard/escape still works at all sizes/positions
7. Run `npm run build` in `packages/fpkit/` -- build succeeds
