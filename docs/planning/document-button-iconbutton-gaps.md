# Plan: Document Remaining Button/IconButton Gaps

## Context

Recent commits on `feat/buttom-updates` updated `README.mdx`, `STYLES.mdx`, and `CHANGELOG.md` to cover breaking changes (default `--btn-bg`, height multiplier, `.btn-pill` scoping) and the disabled-state handler precedence fix. Three minor documentation gaps remain.

---

## Gaps to Fill

### 1. Handler Precedence Behavior — `README.mdx`

**Commit:** `908c7f0` — handlers spread _after_ `restProps` so disabled-state wrappers always take precedence over consumer-supplied handlers.

**Add:** A short note under the "Disabled State" or "Advanced Usage" section in `README.mdx`:

> When `disabled` or `isDisabled` is set, built-in pointer handlers (`onPointerDown`, `onPointerOver`, `onPointerLeave`, `onClick`) take precedence over any handlers passed via props. This prevents interaction callbacks from firing on a disabled button.

**File:** `packages/fpkit/src/components/buttons/README.mdx`

---

### 2. IconButton Label Breakpoint — `STYLES.mdx`

**Gap:** The `label` prop hides at `48rem` (768px), documented only in JSDoc — not in `STYLES.mdx`.

**Add:** Under the IconButton section in `STYLES.mdx`, add a breakpoint note:

> The `label` text is visually hidden below `48rem` (768px) but remains in the accessibility tree at all viewport sizes.

**File:** `packages/fpkit/src/components/buttons/STYLES.mdx`

---

### 3. Conflicting `size` + `data-btn` Values — `README.mdx`

**Gap:** No guidance on what happens if `size="lg"` and `data-btn="--btn-fs: var(--btn-size-sm)"` conflict.

**Add:** A brief note in the `data-btn` prop description:

> `data-btn` tokens are applied as inline CSS and take precedence over the `size` prop's class-based tokens. If both are set, `data-btn` wins.

**File:** `packages/fpkit/src/components/buttons/README.mdx`

---

## Steps

1. Edit `README.mdx` — add handler precedence note under Disabled State section.
2. Edit `README.mdx` — add `data-btn` vs `size` precedence note in the `data-btn` prop row.
3. Edit `STYLES.mdx` — add `48rem` breakpoint note under the IconButton label section.

---

## Verification

- `npm start` (Storybook) — confirm MDX renders without errors.
- Visually review the 3 added notes in Storybook docs panel.
- No code changes required; docs only.

---

## Unresolved Questions

None.
