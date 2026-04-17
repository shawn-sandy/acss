# Component Lifecycle

Every component in `@fpkit/acss` has a **lifecycle tag** that signals its maturity. Tags appear on Storybook stories via `tags: ["…"]` in the meta object and render as badges in the sidebar.

## The Five States

```
experimental → beta → rc → stable → deprecated
```

Plus the transient `new` tag, which can be applied to any state.

### `experimental`

**Meaning**: early idea, shape may change, may be removed without notice.

**Criteria**:
- Implementation exists.
- At least one story demonstrates intent.
- **No commitment** on API stability.

**Appears in**: Storybook only. Not exported from `src/index.ts` by default.

**Consumer guidance**: do not rely on this in production.

### `beta`

**Meaning**: API shape is proposed; feedback welcome; breaking changes possible before `stable`.

**Criteria**:
- Exported from `src/index.ts`.
- Tests cover the happy path.
- Stories demonstrate main variants.
- JSDoc on public props.
- Accessibility checked manually.

**Consumer guidance**: use in apps that can absorb breaking changes in the next minor version.

### `rc` (release candidate)

**Meaning**: API is frozen pending stable promotion. Unlikely to change.

**Criteria**: all `beta` criteria, plus:
- Full test coverage on all props and states.
- Stories for every variant and edge case.
- Storybook a11y addon passes.
- Keyboard navigation verified.
- Component appears in at least one production consumer or integration test.

**Consumer guidance**: safe to adopt. Breaking changes only on a major version.

### `stable`

**Meaning**: production-ready. Breaking changes require an RFC, a major version bump, and a migration guide.

**Criteria**: all `rc` criteria, plus:
- WCAG 2.1 AA verified (contrast, keyboard, screen reader).
- Chromatic snapshot baseline set.
- Component `README.mdx` complete (usage, props, accessibility notes).
- At least one minor release in `rc` with no changes.

**Consumer guidance**: adopt freely.

### `deprecated`

**Meaning**: scheduled for removal. A replacement exists and is documented.

**Criteria**:
- JSDoc `@deprecated` tag on the component and its exports.
- Console warning in dev mode pointing at the replacement.
- Migration guide entry in `MIGRATION-*.md`.
- Scheduled removal version announced.

**Consumer guidance**: migrate before the scheduled removal.

### `new`

**Meaning**: transient marker (applied for one release cycle) to flag components that just reached `beta` or `stable`. Removed in the following release.

## Promotion & Demotion

**Promotion** (e.g., `beta` → `rc`): open a PR that updates the `tags` in the component's story meta and checks every criterion in this doc. Require one maintainer approval.

**Demotion** (e.g., `stable` → `deprecated`): must reference an RFC in `openspec/changes/` explaining why and what replaces it. Requires maintainer approval plus a migration guide.

**Skipping states** is discouraged. A component should not jump from `experimental` to `stable` — that usually means the criteria weren't verified in between.

## How Tags Appear

In each component's `*.stories.tsx`:

```tsx
const meta = {
  title: "FP.React Components/Alert",
  component: Alert,
  tags: ["stable"],          // <-- lifecycle tag
  // ...
} as Meta;
```

`storybook-addon-tag-badges` renders these as colored chips in the Storybook sidebar.

Allowed values: `experimental` | `beta` | `rc` | `stable` | `deprecated` | `new`.

## Current State

The lifecycle tagging rollout is part of Phase 1 of the design-system conversion (see `docs/planning/i-want-to-convert-nested-waffle.md`). As of this writing, the addon is installed but adoption on individual stories is still underway. Expect every component to carry a tag by end of Phase 1.

## FAQ

**Q: What if a component has tests but no Chromatic baseline?**
A: It can be `rc` but not `stable`. Visual regression coverage is a hard gate for `stable`.

**Q: Can an `experimental` component be used in an app?**
A: Technically yes — it's just a React component. But its API may disappear next week. Prefer `beta` or higher.

**Q: Do lifecycle tags affect npm releases?**
A: Not directly. The same package version ships `experimental` and `stable` components alongside each other. The tag is a documentation and discovery signal.
