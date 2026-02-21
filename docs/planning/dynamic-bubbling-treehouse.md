# Plan: Storybook Documentation for Display Utilities & Icon-Button

## Context

Two sets of changes were shipped in the `feat/icon-dimensions` branch (PR #119):
1. **Display utilities** — new `_display.scss` with `.hide`, `.show`, `.invisible`, `.sr-only`, `.sr-only-focusable`, `.print:hide`, and responsive breakpoint variants (`sm/md/lg/xl`). Stories exist but no standalone MDX doc page.
2. **Icon-button rem fix** — `width`/`height` converted from `48px` → `3rem`. No README.mdx or STYLES.mdx exists for this component.

Goal: add Storybook-surfaced MDX documentation for both changes.

---

## Files to Create

### 1. `packages/fpkit/src/sass/utilities/display.mdx`

Standalone Storybook MDX doc page for display/visibility utilities.

**Structure:**
- `<Meta title="FP.React Components/Utilities/Display/Readme" />`
- Summary — what this utility layer provides and why
- Full class reference table (class, effect, use case)
- Breakpoint reference table (sm/md/lg/xl rem + px)
- Responsive pattern examples (e.g. `.hide.md:show`)
- Accessibility utilities section (sr-only, sr-only-focusable, WCAG references)
- Print utility section
- Best practices / notes on `!important`

### 2. `packages/fpkit/src/components/buttons/icon-button.mdx`

New README-style MDX doc for IconButton in Storybook.

**Structure:**
- `<Meta title="FP.React Components/Buttons/IconButton/Readme" />`
- Summary — icon-only and labeled icon button
- Props table (icon, aria-label, label, onClick, etc.)
- Sizing note — `3rem` fixed tap target (48px equivalent, WCAG 2.5.5)
- Label visibility — sr-only on mobile (`< 48rem`), visible on wider viewports
- Usage examples — icon-only, with label, colored variants
- Accessibility notes — `aria-label` required for icon-only

---

## Steps

1. Create `packages/fpkit/src/sass/utilities/display.mdx`
2. Create `packages/fpkit/src/components/buttons/icon-button.mdx`
3. Verify both pages appear in Storybook sidebar under their expected titles

---

## Verification

- Run `npm start` from repo root → confirm "Display/Readme" page appears under `Utilities/Display`
- Confirm "IconButton/Readme" page appears under `Buttons/IconButton`
- Check all tables and code blocks render correctly in the Docs view

---

## Unresolved Questions

_None._
