# CLAUDE.md Update Plan — Session Learnings (fix/button-icon)

## Context

The `fix/button-icon` branch modernized `icon-button.scss` with several patterns that are not yet documented in the root `CLAUDE.md`. This plan captures those learnings to improve future session effectiveness.

---

## Proposed Changes

### 1. Fix Plans Directory

**File:** `CLAUDE.md` — Plans section (line 176)

**Why:** Plans are saved to `docs/planning/` in practice, but CLAUDE.md only lists `.claude/plans/` and `openspec/plans/`.

```diff
- Save plans to `.claude/plans/` or `openspec/plans/`. Ask "review plans" to list all plans.
+ Save plans to `docs/planning/` (primary), `.claude/plans/`, or `openspec/plans/`. Ask "review plans" to list all plans.
```

---

### 2. Add SCSS Patterns Section

**File:** `CLAUDE.md` — after "CSS Variable Naming" section

**Why:** The icon-button refactor confirmed several SCSS conventions not yet documented.

```diff
+ ### SCSS Patterns
+
+ - **Mobile-first media queries:** Use `min-width`, never `max-width`. Base styles apply small-screen; reveal at breakpoints.
+ - **Breakpoint variables:** Use SCSS variables (not CSS custom properties) for `@media` conditions: `$icon-label-bp: 48rem !default`
+ - **Centering:** Prefer `display: inline-grid; place-items: center` (not `inline-flex + align/justify-items`)
+ - **Side-by-side layout:** Add `grid-auto-flow: column` when icon + label need horizontal alignment
+ - **Global tokens:** Expose magic numbers as `:root { --component-size: 3rem; }` for consumer override
+ - **Visually hidden:** Use `clip-path: inset(50%)` (modern) + `clip: rect(0,0,0,0)` (legacy fallback) together
```

---

### 3. Add css-variables.md Update Requirement

**File:** `CLAUDE.md` — after CSS Variable Naming section or in the Component Development workflow

**Why:** `docs/css-variables.md` must be updated whenever new public CSS tokens are added, but this isn't documented anywhere.

```diff
+ > **Note:** Update `docs/css-variables.md` whenever new CSS custom properties are added to a component.
```

---

### 4. Add CHANGELOG Requirement for Breaking Changes

**File:** `CLAUDE.md` — Publishing section or Component Development

**Why:** The mobile-first flip was a breaking change that required a CHANGELOG entry. This process isn't documented.

```diff
+ > **Breaking changes:** Add an entry to `packages/fpkit/CHANGELOG.md` and bump the minor version when behavior changes for existing users.
```

---

## Files to Modify

- `CLAUDE.md` (root) — primary target

---

## Verification

After applying:

1. Read `CLAUDE.md` to confirm changes are accurate and concise
2. No added emojis, no verbose paragraphs — each addition is one line or a short list

---

## Unresolved Questions

None.
