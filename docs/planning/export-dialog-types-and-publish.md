# Export Dialog Types and Publish

## Context

`DialogModal` and `Dialog` are exported from `packages/fpkit/src/index.ts` but their TypeScript types (`DialogModalProps`, `DialogProps`) are not. Every other component in the library follows the pattern of co-exporting its props type (e.g., `export { Button, type ButtonProps }`). Consumers currently cannot import these types without reaching into internal paths.

## Changes

### 1. Add type exports to `packages/fpkit/src/index.ts`

Add a type export line for dialog types from `./components/dialog/dialog.types`:

```ts
// Line 90-91 (current)
export { Dialog } from "./components/dialog/dialog";
export { DialogModal } from "./components/dialog/dialog-modal";

// Add after line 91:
export type { DialogProps, DialogModalProps } from "./components/dialog/dialog.types";
```

### 2. Build and test

- Run `npm run build` in `packages/fpkit/`
- Run `npm test` in `packages/fpkit/`

### 3. Publish to npm

- Use the `npm-monorepo-publish` skill
- This is a patch-level fix (type export addition, no runtime changes)

## Verification

1. Confirm types appear in `libs/` build output `.d.ts` files
2. Tests pass
3. Package published successfully
