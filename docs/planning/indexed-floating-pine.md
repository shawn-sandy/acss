# Export Dialog Types and Publish

## Context

`Dialog` and `DialogModal` are exported from `packages/acss/src/index.ts` but their TypeScript types (`DialogProps`, `DialogModalProps`) are not. All other components co-export their props types. Consumers cannot import dialog types without reaching into internal paths.

## Steps

1. **Add type exports** to `packages/acss/src/index.ts` after line 91:
   ```ts
   export type { DialogProps, DialogModalProps } from "./components/dialog/dialog.types";
   ```
   - File: `packages/acss/src/index.ts` (lines 90-91 — current dialog exports)
   - Types source: `packages/acss/src/components/dialog/dialog.types.ts`

2. **Build** — run `npm run build` in `packages/acss/`

3. **Test** — run `npm test` in `packages/acss/`

4. **Publish** — use the `npm-monorepo-publish` skill (patch-level bump, no runtime changes)

## Verification

- `libs/` build output `.d.ts` files include `DialogProps` and `DialogModalProps`
- All tests pass
- Package published to npm successfully
