# Export Dialog Types and Publish to npm

## Context

`Dialog` and `DialogModal` are exported from `packages/fpkit/src/index.ts` (lines 90-91) but their TypeScript types (`DialogProps`, `DialogModalProps`) are **not** re-exported. Every other component follows the pattern of co-exporting props types (e.g., `export { Button, type ButtonProps }`). This forces consumers to use deep imports for the types, which is incorrect for a published package.

## Changes

### 1. Update `packages/fpkit/src/index.ts` (lines 90-92)

Add type exports from `./components/dialog/dialog.types`:

```ts
// Current (lines 90-91):
export { Dialog } from "./components/dialog/dialog";
export { DialogModal } from "./components/dialog/dialog-modal";

// After:
export { Dialog } from "./components/dialog/dialog";
export { DialogModal } from "./components/dialog/dialog-modal";
export type { DialogProps, DialogModalProps } from "./components/dialog/dialog.types";
```

### 2. Build and test (`packages/fpkit/`)

- `npm run build` — confirm `.d.ts` output includes the new type exports
- `npm test` — all tests pass

### 3. Publish patch to npm

- Use the `npm-monorepo-publish` skill
- Version bump: **patch** (type export only, no runtime change)

## Verification

1. After build, grep `libs/` for `DialogModalProps` and `DialogProps` in `.d.ts` files
2. All existing tests pass
3. Package published to npm
