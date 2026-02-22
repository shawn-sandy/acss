# Plan: Responsive Display Utilities

## Context

The library has no `.hide`/`.show` or responsive visibility utilities. Users need a way to show or hide elements at different screen sizes. The flexbox component already established a mobile-first responsive prefix pattern (`sm:`, `md:`, `lg:`, `xl:`) — this plan extends that pattern to display/visibility control and adds accessibility-focused variants.

`.sr-only` is currently defined inside `alert.scss` (a component file); centralizing it into the new utility is a cleanup win.

---

## Decisions Made (via interview)

| Decision | Choice |
|----------|--------|
| Hide method | `display: none` + `visibility: hidden` (`.invisible`) |
| Specificity | All utilities use `!important` |
| sr-only variant | Add `.sr-only-focusable` (visible on focus) |
| Print variant | Add `.print:hide` |
| Responsive `.invisible` | Full sm/md/lg/xl variants |
| Storybook story | Yes — add `display.stories.tsx` |
| `.show` value | `display: revert` (restores browser default per element) |

---

## Steps

1. **Create** `packages/fpkit/src/sass/utilities/_display.scss`

   **Base utilities (no breakpoint):**
   - `.hide` → `display: none !important`
   - `.show` → `display: revert !important`
   - `.invisible` → `visibility: hidden !important`

   **Accessibility utilities:**
   - `.sr-only` — visually hidden, in a11y tree (from `alert.scss`)
   - `.sr-only-focusable` — `.sr-only` that resets to visible on `:focus` / `:focus-within`

   **Print variant:**
   - `.print\:hide` → `@media print { display: none !important }`

   **Responsive variants (sm / md / lg / xl) for each of:**
   - `.{bp}\:hide` → `display: none !important`
   - `.{bp}\:show` → `display: revert !important`
   - `.{bp}\:invisible` → `visibility: hidden !important`

   Breakpoints (matching `flex.scss`):
   - `sm: 30rem` (480px)
   - `md: 48rem` (768px)
   - `lg: 62rem` (992px)
   - `xl: 80rem` (1280px)

   Media query syntax: `@media (width >= {bp})` (modern range syntax, same as `flex.scss`)

2. **Update** `packages/fpkit/src/sass/utilities/_index.scss`
   - Add `@forward "./display";`

3. **Update** `packages/fpkit/src/components/alert/alert.scss`
   - Remove `.sr-only` block (lines 2–12) — now provided by the utility layer (loads before components in `index.scss`)

4. **Create** `packages/fpkit/src/sass/utilities/display.stories.tsx`
   - Story per utility group: hide/show, invisible, sr-only, print, responsive combos
   - Use viewport switching to verify responsive variants at each breakpoint
   - Include cascade combination test: `class="hide md:show"` (hidden by default, shown at md+)

---

## Critical Files

| File | Action |
|------|--------|
| `packages/fpkit/src/sass/utilities/_display.scss` | **Create** |
| `packages/fpkit/src/sass/utilities/_index.scss` | **Edit** — add `@forward "./display"` |
| `packages/fpkit/src/components/alert/alert.scss` | **Edit** — remove `.sr-only` block |
| `packages/fpkit/src/sass/utilities/display.stories.tsx` | **Create** |

No changes needed to `packages/fpkit/src/index.scss` — utilities already loaded via `@use "./sass/utilities"`.

---

## Full Class Reference

```html
<!-- Always hidden (removed from layout + a11y tree) -->
<div class="hide">Never visible</div>

<!-- Always shown (restores browser default display per element) -->
<div class="show">Always visible</div>

<!-- Visually hidden, preserves layout space, not announced by assistive technologies (removed from a11y tree) -->
<div class="invisible">Layout-preserving hide</div>

<!-- Screen reader only -->
<span class="sr-only">For screen readers only</span>

<!-- Visible only on focus (skip links) -->
<a href="#main" class="sr-only-focusable">Skip to content</a>

<!-- Hidden in print -->
<nav class="print:hide">Not printed</nav>

<!-- Responsive: hidden on sm+ (mobile only content) -->
<div class="sm:hide">Mobile only</div>

<!-- Responsive: shown on md+ (tablet and desktop only) -->
<div class="md:show">Tablet and desktop</div>

<!-- Responsive: hidden on lg+ (mobile and tablet only) -->
<div class="lg:hide">Mobile and tablet only</div>

<!-- Combination: hidden by default, shown at md+ -->
<div class="hide md:show">Desktop only</div>

<!-- Responsive invisible -->
<div class="md:invisible">Layout preserved, hidden at md+</div>
```

---

## Verification

1. `npm run build:sass` — no SCSS compile errors
2. `npm run build` — full build succeeds
3. `npm start` → Storybook — verify:
   - Alert component `.sr-only` still works (centralized, not broken)
   - Responsive stories toggle correctly at each viewport
   - Combination `hide md:show` works as expected
4. `npm test` — no test regressions

---

## Unresolved Questions

None.
