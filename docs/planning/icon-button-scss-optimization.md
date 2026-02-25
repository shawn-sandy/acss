# Icon Button SCSS Optimization Plan

## Context

The `icon-button.scss` file contains several issues that deviate from:
- The project's established SCSS patterns (from `button.scss` and shared utilities)
- Modern CSS best practices (deprecated properties, repeated magic numbers)
- The project's CSS custom property theming approach (magic numbers not exposed as variables)

This plan optimizes the file without changing any visual output or component behavior.

**File:** `packages/fpkit/src/components/buttons/icon-button.scss`

---

## Issues Identified

| # | Issue | Severity |
|---|-------|----------|
| 1 | `clip: rect(0, 0, 0, 0)` is a deprecated CSS2 property | High |
| 2 | `align-items: center; justify-content: center;` — button.scss uses `place-items: center` shorthand | Low |
| 3 | `padding-inline: 0; padding-block: 0;` — two declarations to zero; shorthand `padding: 0` is simpler | Low |
| 4 | `3rem` repeated 3× (width, height, min-width) — not exposed as a CSS custom property for consumer customization | Medium |
| 5 | `0.375rem` (gap) and `0.75rem` (padding-inline) are magic numbers — not themeable | Medium |

---

## Planned Changes

### 1. Replace deprecated `clip` with `clip-path`

**Before:** `clip: rect(0, 0, 0, 0);`
**After:** `clip-path: inset(50%);`

`clip` is deprecated since CSS 2.1. `clip-path: inset(50%)` is the modern W3C equivalent — same visual result (element fully clipped) while keeping it in the accessibility tree.

### 2. Add CSS custom properties for magic numbers

Expose sizing values following the same pattern as `button.scss` (`--btn-fs`, `--btn-padding-inline`, etc.).

Add at the top of the rule block:
```scss
--icon-btn-size: 3rem;
--icon-btn-gap: 0.375rem;
--icon-btn-padding-inline: 0.75rem;
```

Enables consumer customization via `styles={{ "--icon-btn-size": "2.5rem" }}`.

### 3. Replace `align-items` + `justify-content` with `place-items`

`button.scss` already uses `place-items: center`. Aligns with existing project pattern.

### 4. Simplify padding reset

`padding-inline: 0; padding-block: 0;` → `padding: 0`

The project uses logical properties for non-zero values only. Matches `button.scss` where `padding: unset` is used.

---

## Final Optimized File

> Updated after plan interview to reflect all confirmed decisions.

```scss
// Breakpoint at which the label becomes visible (mobile-first).
// Override this variable in your own SCSS before importing to customise.
// NOTE: CSS custom properties cannot be used in @media conditions — this must be a SCSS variable.
$icon-label-bp: 48rem !default; // 768px

// Global theming tokens for icon buttons.
// Override in your theme stylesheet: :root { --icon-btn-size: 2.5rem; }
// Minimum tap target recommended: 2.75rem (44px, WCAG 2.5.5).
:root {
  --icon-btn-size: 3rem;
  --icon-btn-gap: 0.375rem;
  --icon-btn-padding-inline: 0.75rem;
}

// Label is visually hidden by default (screen-reader accessible at all sizes).
// Revealed at tablet+ via min-width media query below.
[data-icon-btn] [data-icon-label],
[data-icon-btn] .icon-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);       // fallback for older browsers
  clip-path: inset(50%);         // modern replacement (97%+ support)
  white-space: nowrap;
  border: 0;
}

button[data-icon-btn],
button.icon-btn,
[data-icon-btn],
.icon-btn {
  --btn-color: currentColor;

  padding: 0;
  width: var(--icon-btn-size);
  height: var(--icon-btn-size);
  display: inline-grid;
  place-items: center;

  // Layout when a visible label is present alongside the icon.
  // Higher specificity than button[data-style~="icon"] (which uses padding: unset)
  // so padding is restored without needing a consumer override.
  &[data-icon-btn~="has-label"] {
    width: max-content;
    min-width: var(--icon-btn-size);
    gap: var(--icon-btn-gap);
    padding-inline: var(--icon-btn-padding-inline);
    grid-auto-flow: column; // keep icon + label side-by-side

    [data-icon-label],
    .icon-label {
      font-size: var(--btn-fs, 0.875rem);
      line-height: 1;
      white-space: nowrap;
    }
  }
}

// Reveal label text at tablet+ — icon + label visible together.
// Uses min-width (mobile-first): hidden by default, shown at 48rem+.
// BREAKING CHANGE: Previously max-width (desktop-first).
@media (min-width: #{$icon-label-bp}) {
  [data-icon-btn] [data-icon-label],
  [data-icon-btn] .icon-label {
    position: static;
    width: auto;
    height: auto;
    padding: unset;
    margin: unset;
    overflow: visible;
    clip: unset;
    clip-path: unset;
    white-space: nowrap;
    border: unset;
  }
}
```

---

## Verification

1. **Storybook grid test** — Run `npm start` from root; verify all icon button stories render identically with `display: inline-grid`
2. **Responsive label** — Toggle viewport to below 48rem; confirm label is visually hidden but readable by screen reader (Storybook a11y panel)
3. **Customization** — Override `--icon-btn-size` in `:root`; confirm button resizes correctly across all variants
4. **Build** — `npm run build:sass` in `packages/fpkit/` — confirm no SCSS compile errors
5. **Tests** — `npm test` in `packages/fpkit/`
6. **CHANGELOG** — Add breaking change entry for mobile-first media query flip
7. **CSS variables doc** — Update `docs/css-variables.md` to document `--icon-btn-size`, `--icon-btn-gap`, `--icon-btn-padding-inline`

---

## Unresolved Questions

~~None — all changes are non-breaking optimizations with no behavior or output changes.~~

> Updated after plan interview — see Interview Summary below.

---

## Interview Summary

### Key Decisions Confirmed

1. **Drop `place-items` via flex, switch to `display: inline-grid`** — `place-items` only works bidirectionally in grid. Icon button layout changes from `inline-flex` to `inline-grid`.
2. **Keep both `clip` + `clip-path`** — `clip: rect(0,0,0,0)` stays as a fallback; `clip-path: inset(50%)` added alongside as progressive enhancement.
3. **CSS variables move to `:root`** — `--icon-btn-size`, `--icon-btn-gap`, `--icon-btn-padding-inline` defined globally for theme-level overrides.
4. **Mobile-first media query (`min-width: 48rem`)** — Label visually hidden by default; revealed at tablet+ viewport.
5. **Label selector scoped to `[data-icon-btn] [data-icon-label]`** — Not a global `[data-icon-label]` selector.
6. **Breaking change acknowledged** — CHANGELOG entry + minor version bump required.
7. **Tap target trust delegated to consumer** — Document 2.75rem minimum in comments; no enforced floor.

### Open Risks & Concerns

- **Grid column direction for `has-label`** — `display: inline-grid` defaults to a single column. The icon + label side-by-side layout needs `grid-auto-flow: column` or `grid-template-columns: auto auto` explicitly set. Not in the original plan.
- **Grid impact on icon children** — Unknown whether icons have complex internal layout. Storybook testing required before commit.
- **Root-scoped variable documentation** — `docs/css-variables.md` needs updating for the three new public tokens.
- **CHANGELOG entry missing** — Breaking change (mobile-first flip) requires CHANGELOG and minor version bump per the npm-monorepo-publish workflow.

### Recommended Next Steps

1. **Amend the plan** to reflect:
   - Add `grid-auto-flow: column` to `has-label` variant for horizontal layout
   - Replace global `[data-icon-label]` with `[data-icon-btn] [data-icon-label]` in visually-hidden block
   - Add `:root` block for three new CSS custom property defaults
   - Restructure media query to `min-width: #{$icon-label-bp}` with label hidden as base default
2. **Test in Storybook** before committing — verify `inline-grid` doesn't break existing icon button stories
3. **Add to verification** — CHANGELOG update + `docs/css-variables.md` update

### Simplification Opportunities

- The `clip + clip-path` dual approach adds a declaration for essentially 0% browser usage in this library's target environments. Dropping `clip` entirely would be simpler — but progressive enhancement was explicitly chosen.
