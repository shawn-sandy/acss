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
| 3 | `padding-inline: 0; padding-block: 0;` — two declarations for zero; shorthand `padding: 0` is simpler | Low |
| 4 | `3rem` repeated 3× (width, height, min-width) — not exposed as a CSS custom property for consumer customization | Medium |
| 5 | `0.375rem` (gap) and `0.75rem` (padding-inline) are magic numbers — not themeable | Medium |

---

## Planned Changes

### 1. Replace deprecated `clip` with `clip-path`

**Before:**
```scss
clip: rect(0, 0, 0, 0);
```
**After:**
```scss
clip-path: inset(50%);
```
`clip-path: inset(50%)` is the modern W3C replacement. `clip` is deprecated since CSS 2.1 and removed from the spec. Both produce the same visual result (element fully clipped/invisible) while keeping the element in the accessibility tree.

---

### 2. Add CSS custom properties for all magic numbers

Expose sizing values as CSS custom properties at the component root — following the same pattern as `button.scss` (`--btn-fs`, `--btn-padding-inline`, etc.).

**Add at top of the rule block:**
```scss
--icon-btn-size: 3rem;
--icon-btn-gap: 0.375rem;
--icon-btn-padding-inline: 0.75rem;
```

Then replace all hardcoded values with `var()` references. Keeps the file DRY and enables consumer customization via `styles={{ "--icon-btn-size": "2.5rem" }}`.

---

### 3. Replace `align-items` + `justify-content` with `place-items`

**Before:**
```scss
align-items: center;
justify-content: center;
```
**After:**
```scss
place-items: center;
```
`button.scss` already uses `place-items: center`. Aligns with existing project pattern.

---

### 4. Simplify padding reset

**Before:**
```scss
padding-inline: 0;
padding-block: 0;
```
**After:**
```scss
padding: 0;
```
The project uses logical properties for non-zero values only. Zeroing all sides with a single shorthand is simpler and matches `button.scss` where `padding: unset` is used.

---

## Final Optimized File

```scss
// Breakpoint at which the label hides (icon-only on mobile).
// Override this variable in your own SCSS before importing to customise.
// NOTE: CSS custom properties cannot be used in @media conditions — this must be a SCSS variable.
$icon-label-bp: 48rem !default; // 768px

button[data-icon-btn],
button.icon-btn,
[data-icon-btn],
.icon-btn {
  // Theming tokens — override via styles={{ "--icon-btn-size": "..." }}
  --btn-color: currentColor;
  --icon-btn-size: 3rem;
  --icon-btn-gap: 0.375rem;
  --icon-btn-padding-inline: 0.75rem;

  padding: 0;
  width: var(--icon-btn-size);
  height: var(--icon-btn-size);
  display: inline-flex;
  place-items: center;

  // Layout when a visible label is present alongside the icon.
  // Higher specificity than button[data-style~="icon"] (which uses padding: unset)
  // so padding is restored without needing a consumer override.
  &[data-icon-btn~="has-label"] {
    width: max-content;
    min-width: var(--icon-btn-size);
    gap: var(--icon-btn-gap);
    padding-inline: var(--icon-btn-padding-inline);

    [data-icon-label],
    .icon-label {
      font-size: var(--btn-fs, 0.875rem);
      line-height: 1;
      white-space: nowrap;
    }
  }
}

// Hide label text visually on mobile — icon only.
// Uses visually-hidden technique so the span stays in the accessibility tree;
// screen readers always read it (display:none would remove it from the a11y tree).
@media (max-width: #{$icon-label-bp}) {
  [data-icon-label],
  .icon-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
}
```

---

## Verification

1. **Visual regression** — Run Storybook (`npm start` from root) and verify all icon button stories render identically
2. **Accessibility** — Check Storybook a11y panel: screen reader label still accessible in mobile viewport
3. **Customization** — Confirm `--icon-btn-size`, `--icon-btn-gap`, `--icon-btn-padding-inline` can be overridden via `styles={{}}`
4. **Build** — Run `npm run build:sass` and confirm no SCSS compile errors
5. **Tests** — Run `npm test` in `packages/fpkit/`

---

## Unresolved Questions

None — all changes are non-breaking optimizations with no behavior changes.
