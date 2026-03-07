# Fix: DialogModal export missing in Astro consuming app

## Context

The Astro app (`apps/astro-builds`) throws:
> The requested module '@fpkit/acss' does not provide an export named 'DialogModal'

**Root cause:** The Astro app has `"@fpkit/acss": "^0.6.1"` in `package.json` but `node_modules` contains **v0.5.8**, which predates the `DialogModal` component. The current workspace version is **6.4.3** where `DialogModal` is properly exported.

The version mismatch (`^0.6.1` declared vs `0.5.8` installed) suggests the lockfile is stale or npm hasn't resolved the workspace link correctly.

## Files to modify

1. `apps/astro-builds/package.json` — update `@fpkit/acss` dependency version

## Plan

1. Update `apps/astro-builds/package.json` to use `"@fpkit/acss": "^6.4.3"` (or workspace protocol if supported by the monorepo setup)
2. Run `npm install` from the monorepo root to refresh the symlink/installed version
3. Verify the Astro app starts without the export error

## Verification

1. After install, confirm `apps/astro-builds/node_modules/@fpkit/acss/package.json` shows version 6.4.3
2. Run `grep DialogModal apps/astro-builds/node_modules/@fpkit/acss/libs/index.d.ts` — should show the export
3. Start the Astro dev server and confirm no import errors
