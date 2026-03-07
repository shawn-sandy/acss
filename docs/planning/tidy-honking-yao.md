# Replace Dialog Close Button with IconButton + Configurable Icon Size

## Context

The dialog header's close button uses a generic `Button` with `data-btn="icon"` and a hardcoded `Icon.Remove` at size `16`. The user wants to:
1. Replace it with the library's own `IconButton` component
2. Make the close icon size configurable via a prop, defaulting to `24`

## Files to Modify

| File | Change |
|------|--------|
| `packages/fpkit/src/components/dialog/dialog.types.ts` | Add `closeIconSize` to `BaseDialogProps` and `DialogHeaderProps` |
| `packages/fpkit/src/components/dialog/views/dialog-header.tsx` | Swap `Button` for `IconButton`, use `closeIconSize` prop |
| `packages/fpkit/src/components/dialog/dialog.tsx` | Forward `closeIconSize` to `DialogHeader` |
| `packages/fpkit/src/components/dialog/dialog-modal.tsx` | Forward `closeIconSize` to `Dialog` |

## Steps

### 1. Add `closeIconSize` prop to types

**File:** `packages/fpkit/src/components/dialog/dialog.types.ts`

- Add to `BaseDialogProps`:
  ```ts
  /** Size of the close button icon in pixels. @default 24 */
  closeIconSize?: number;
  ```
- Add to `DialogHeaderProps`:
  ```ts
  /** Size of the close button icon in pixels. @default 24 */
  closeIconSize?: number;
  ```

### 2. Replace `Button` with `IconButton` in dialog-header

**File:** `packages/fpkit/src/components/dialog/views/dialog-header.tsx`

- Replace `Button` import with `IconButton` from `#components/buttons/icon-button`
- Accept `closeIconSize = 24` in destructured props
- Replace the `<Button>` JSX with:
  ```tsx
  <IconButton
    type="button"
    onClick={handleClose}
    className="dialog-close"
    aria-label="Close dialog"
    icon={
      <Icon>
        <Icon.Remove size={closeIconSize} />
      </Icon>
    }
  />
  ```

### 3. Forward `closeIconSize` in `Dialog`

**File:** `packages/fpkit/src/components/dialog/dialog.tsx`

- Destructure `closeIconSize` from props
- Pass to `<DialogHeader closeIconSize={closeIconSize} />`

### 4. Forward `closeIconSize` in `DialogModal`

**File:** `packages/fpkit/src/components/dialog/dialog-modal.tsx`

- Destructure `closeIconSize` from props
- Pass to `<Dialog closeIconSize={closeIconSize} />`

### 5. Run tests

No test changes expected — existing tests query by role/accessible name which remain unchanged.

## Verification

1. `cd packages/fpkit && npm test -- --run src/components/dialog/dialog.test.tsx`
2. `npm start` (Storybook) — visually confirm the close icon renders at the new default size (24px) and that custom sizes work
