# Fix icon-button px → rem units and commit

## Context
`icon-button.scss` was updated on `feat/icon-dimensions` to add fixed 48px dimensions and flex centering to icon buttons. The changes use `px` units which violates the project rule: **all sizing must use rem** (`px ÷ 16 = rem`).

## Files to Modify
- `packages/fpkit/src/components/buttons/icon-button.scss`

## Steps

1. **Fix px → rem** in `icon-button.scss`:
   - `width: 48px` → `width: 3rem`
   - `height: 48px` → `height: 3rem`
   - `padding-inline: 0px` → `padding-inline: 0`
   - `padding-block: 0px` → `padding-block: 0`

2. **Recompile CSS** from `packages/fpkit/`:
   ```bash
   npm run build:sass
   ```
   This updates `src/styles/buttons/icon-button.css` and `.css.map`.

3. **Commit** all modified files:
   - `packages/fpkit/src/components/buttons/icon-button.scss`
   - `packages/fpkit/src/styles/buttons/icon-button.css`
   - `packages/fpkit/src/styles/buttons/icon-button.css.map`

   Commit message:
   ```
   fix(ui): convert icon-button px units to rem
   ```

## Verification
- Confirm compiled CSS shows `3rem` not `48px`
- Visually verify in Storybook that icon button renders at correct 48px (3rem) size
