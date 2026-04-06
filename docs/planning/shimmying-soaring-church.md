# Fix PR #142 Review Issues

## Context

PR #142 (`feat/acss-kit-builder-skill`) received a code review identifying 3 red issues, 2 warnings, and 2 suggestions. This plan addresses the red issues and warnings. Suggestions are deferred to Next Steps.

## Objective

Resolve all blocking review findings so the PR is merge-ready.

---

## Steps

### 1. Fix `React.ReactElement | any` type in UIComponent

The `| any` union erases all polymorphic type safety. Change to `| null`.

**Files:**
- `packages/fpkit/src/components/ui.tsx:165` — the source component
- `.claude/plugins/acss-kit-builder/assets/foundation/ui.tsx:112` — the plugin asset copy

**Change:**
```ts
// Before
) => React.ReactElement | any) & { displayName?: string };

// After
) => React.ReactElement | null) & { displayName?: string };
```

Both files get the same fix since the asset is a verbatim copy of the source.

### 2. Replace blanket `/* eslint-disable */` with targeted disables

Both `ui.tsx` files open with `/* eslint-disable */` which suppresses all lint rules. This is the foundation component that gets copied into developer projects.

**Files:**
- `packages/fpkit/src/components/ui.tsx:2`
- `.claude/plugins/acss-kit-builder/assets/foundation/ui.tsx:2`

**Approach:**
1. Remove `/* eslint-disable */`
2. Run `npx eslint packages/fpkit/src/components/ui.tsx` to identify specific violations
3. Add targeted `// eslint-disable-next-line <rule>` comments only where needed
4. Apply the same targeted disables to the asset copy

### 3. Fix `any` types in `wrapHandler` in accessibility.md

The `useDisabledState` snippet in `accessibility.md` uses `(e: any)` in the `wrapHandler` helper. Since this is a generation template, `any` propagates into every interactive component.

**File:** `.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/accessibility.md:79-81`

**Change:**
```ts
// Before
const wrapHandler = <E extends Event>(handler?: (e: any) => void) => {
  if (!handler) return undefined
  return (e: any) => {

// After
const wrapHandler = <E extends React.SyntheticEvent>(handler?: (e: E) => void) => {
  if (!handler) return undefined
  return (e: E) => {
```

The generic `E` is already declared but unused — this fix wires it up properly. The callers (`onClick`, `onKeyDown`, `onPointerDown`) already pass correctly typed handlers, so TypeScript infers `E` at each call site.

### 4. Fix cross-project relative link in README

The README links to `../../../docs/css-variables.md` which only resolves inside this monorepo. When a developer copies the plugin to another project, this link breaks.

**File:** `.claude/plugins/acss-kit-builder/README.md`

**Change:** Replace the relative link with the plugin's own CSS variables reference:

```md
<!-- Before -->
See the project's [CSS Variable Reference](../../../docs/css-variables.md)

<!-- After -->
See [references/css-variables.md](skills/acss-kit-builder/references/css-variables.md) for the full naming convention and approved abbreviations.
```

This links to the plugin's own bundled reference doc, which travels with the plugin when copied.

### 5. Clean up planning docs location

Two planning docs are committed to `docs/planning/` but CLAUDE.md specifies plans go in `.claude/plans/` or `openspec/plans/`. Additionally, `lucky-cuddling-plum.md` is a superseded draft (auto-generated name, marked "replaces the original").

**Actions:**
- Move `docs/planning/acss-kit-builder-skill.md` → `openspec/plans/acss-kit-builder-skill.md`
- Delete `docs/planning/lucky-cuddling-plum.md` (superseded by the renamed plan)
- Remove `docs/planning/` directory if empty after moves

---

## Verification

1. Run `npx eslint packages/fpkit/src/components/ui.tsx` — should pass with only targeted disables
2. Run `npx tsc --noEmit` from `packages/fpkit/` — UIComponent type should resolve correctly
3. Run `npm test` from `packages/fpkit/` — existing tests should pass (type change is narrowing, not breaking)
4. Confirm the README link resolves: `ls .claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/css-variables.md`

---

## Next Steps

- Add `ui.test.tsx` for the foundation component (verify `as` prop, ref forwarding, `classes`/`className` precedence, style merging)
- Remove `renderStyles?: boolean` deprecated prop from UIProps (unused, never implemented)
- Consider whether source `ui.tsx` changes warrant a patch version bump of `@fpkit/acss`
