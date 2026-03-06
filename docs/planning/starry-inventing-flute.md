# Plan: Support IconButton trigger in DialogModal

## Context

Currently `DialogModal` always renders a `<Button>` as its trigger. Users want the option to use an `<IconButton>` instead, by simply passing an `icon` prop. This avoids needing to drop down to the controlled `Dialog` component just to customize the trigger button type.

## Files to Modify

1. `packages/fpkit/src/components/dialog/dialog.types.ts` — add `icon` prop to `DialogModalProps`
2. `packages/fpkit/src/components/dialog/dialog-modal.tsx` — conditionally render `IconButton` vs `Button`
3. `packages/fpkit/src/components/dialog/dialog-modal.stories.tsx` — add story showing icon trigger
4. `packages/fpkit/src/components/dialog/dialog-modal.test.tsx` — add tests for icon trigger behavior

## Existing code to reuse

- `IconButton` from `#components/buttons/icon-button` (already exported from package)
- `IconButtonProps` type for reference
- `btnLabel` already defaults to `"Open Dialog"` — reuse as `aria-label` for IconButton

## Steps

### 1. Update `DialogModalProps` in `dialog.types.ts`

Add one new optional prop:
```ts
/**
 * Optional icon element. When provided, renders an IconButton instead of a regular Button as the trigger.
 * When using icon, `btnLabel` serves as both `aria-label` and the visible label text (shown at desktop widths).
 * Note: `aria-labelledby` cannot be passed via `btnProps` when icon is set — use `btnLabel` instead.
 */
icon?: React.ReactElement;
```

### 2. Update `dialog-modal.tsx`

1. Import `IconButton` from `#components/buttons/icon-button.jsx`
2. Destructure `icon` from props
3. Add `aria-haspopup="dialog"` to **both** trigger types (Button and IconButton)
4. Conditionally render the trigger:
   - **If `icon` is provided**: render `<IconButton>` with:
     - `icon={icon}`
     - `aria-label={btnLabel}` (always derived from btnLabel, no override)
     - `label={btnLabel}` (visible text alongside icon at desktop widths)
     - `type="button"`
     - `size={btnSize}` (map to IconButton's native size prop)
     - `onClick={handleButtonClick}`
     - `data-btn={btnSize}` (preserve data attribute for CSS hooks)
     - `aria-haspopup="dialog"`
     - Spread `btnProps` for additional customization (e.g., `variant`)
   - **If no `icon`**: render `<Button>` as before, adding only `aria-haspopup="dialog"`

### 3. Add Storybook story

- Add an `IconTrigger` story with icon-only trigger (default `variant="icon"`)
- Add an `IconTriggerWithLabel` story showing icon + visible label at desktop widths

### 4. Add/update tests

- Test that passing `icon` renders an `IconButton` (check for `data-icon-btn` attribute)
- Test that omitting `icon` still renders the regular `Button`
- Test that `btnLabel` becomes `aria-label` on the icon button
- Test that `btnLabel` is passed as visible `label` on the icon button
- Test that clicking the icon button opens the dialog
- Test that `aria-haspopup="dialog"` is present on both trigger types
- Update any existing snapshots that break from the `aria-haspopup` addition

## Verification

1. Run `npm test -- --run src/components/dialog/` in `packages/fpkit/`
2. Run `npm start` (Storybook) and visually confirm both button types work
3. Verify the icon button has proper `aria-label` in browser DevTools

## Interview Summary

### Key Decisions Confirmed

1. **Size**: Pass both `size` and `data-btn` to the IconButton trigger
2. **Aria labelling**: Always derive `aria-label` from `btnLabel` — no override mechanism
3. **Visible label**: Pass `btnLabel` to IconButton's `label` prop (visible at desktop widths)
4. **Icon type**: Use `React.ReactElement` instead of `ReactNode` for stricter typing
5. **Variant**: Default `"icon"` — user controls via `btnProps` (no auto-switching)
6. **Focus restoration**: No changes needed — existing logic works
7. **`aria-haspopup="dialog"`**: Add to **both** Button and IconButton triggers
8. **XOR constraint**: Document in JSDoc that `aria-labelledby` cannot be passed via `btnProps`
9. **Dialog labelling**: Keep current `dialogTitle`-based accessible name

### Open Risks & Concerns

- Adding `aria-haspopup="dialog"` to the existing Button trigger is a minor behavior change — existing snapshots may break
- Default `btnLabel` ("Open Dialog") may not be ideal visible text next to an icon — should be documented

### Recommended Next Steps

1. Update the plan file with all confirmed decisions before implementation
2. After implementation, update any existing snapshot tests that break from the `aria-haspopup` addition
3. Ensure Storybook story demonstrates both icon-only and icon+label variations

### Simplification Opportunities

None — the plan is already minimal.
