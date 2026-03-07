# Fix: Dialog should open centered by default

## Context

The dialog appears at the top of the viewport instead of centered when opened. While `position = "center"` is the default prop and `data-position="center"` CSS rule exists, the **base** `dialog` rule in `dialog.scss` lacks explicit centering (`margin: auto; inset: 0;`). This means the browser's UA centering can be overridden by cascade/specificity issues. The fix adds centering directly to the base `dialog` rule as a true CSS default.

## Steps

### 1. Fix Storybook port conflict in `.claude/launch.json`
- Add `"autoPort": true` so it picks an available port when 6006 is busy
- **File**: `.claude/launch.json`

### 2. Add centering to base `dialog` rule in SCSS
- Add `margin: auto;` and `inset: 0;` to the base `dialog` selector (line 38 of `dialog.scss`)
- This ensures centering works as an inherent default, not just via `data-position`
- **File**: `packages/fpkit/src/components/dialog/dialog.scss` (around line 38)

### 3. Verify in Storybook
- Start the dev server with `preview_start`
- Open a dialog story and confirm it opens centered
- Take a screenshot for proof

## Files to modify

| File | Change |
|------|--------|
| `.claude/launch.json` | Add `"autoPort": true` to storybook config |
| `packages/fpkit/src/components/dialog/dialog.scss` | Add `margin: auto; inset: 0;` to base `dialog` rule |

## Verification

1. Run Storybook dev server
2. Open the default Dialog story (no `position` prop)
3. Confirm dialog is vertically and horizontally centered
4. Run existing tests: `npm test -- --run src/components/dialog/`
