# CLAUDE.md Quality Audit & Improvement Plan

## Context

The project has 4 CLAUDE.md/rules files across the monorepo. Two package-level files have not been updated since November 15, creating significant version drift and potentially misleading Claude in future sessions. This plan targets surgical fixes — no rewrites, just accurate corrections and high-value additions.

---

## Quality Report

### Summary

| File | Lines | Last Modified | Score | Grade |
|------|-------|---------------|-------|-------|
| `CLAUDE.md` (root) | 87 | Feb 25 | 86/100 | B |
| `packages/fpkit/CLAUDE.md` | 946 | Nov 15 | 66/100 | D |
| `apps/astro-builds/CLAUDE.md` | 699 | Nov 15 | 65/100 | D |
| `.claude/rules/component-dev.md` | 91 | Feb 25 | 90/100 | A- |

---

### File-by-File Assessment

#### 1. `CLAUDE.md` (root) — Score: 86/100 (B)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | All key commands present |
| Architecture clarity | 18/20 | Clear monorepo diagram |
| Non-obvious patterns | 8/15 | Missing package entry points |
| Conciseness | 14/15 | Well-structured, not verbose |
| Currency | 15/15 | Updated Feb 25 |
| Actionability | 13/15 | Commands are copy-paste ready |

**Issues:**
- No documentation of the multiple package entry points (`./hooks`, `./icons`, `./styles`, `./css`, `./scss`) — critical for consumers
- No cross-reference to `apps/astro-builds/CLAUDE.md`
- `docs/css-variables.md` referenced in structure tree but not as a key resource for styling work

**Recommended additions:**
- Package entry points section with usage examples
- Link to astro-builds CLAUDE.md under Project Structure

---

#### 2. `packages/fpkit/CLAUDE.md` — Score: 66/100 (D)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 20/20 | Comprehensive |
| Architecture clarity | 18/20 | Very thorough |
| Non-obvious patterns | 12/15 | Misses recent refactors |
| Conciseness | 5/15 | 946 lines duplicates component-dev.md |
| Currency | 3/15 | Version 0.5.11 (actual: 6.3.0) |
| Actionability | 8/15 | Commands good but stale version erodes trust |

**Issues:**
- Version `0.5.11` is **severely outdated** — actual is `6.3.0` (12x version jump)
- Component count says "25+" — actual is 44+
- Does not reflect icon-button SCSS modernization (mobile-first, clip-path visually-hidden, CSS tokens)
- Duplicates content already in `.claude/rules/component-dev.md`

**Recommended additions:**
- Update version to `6.3.0`
- Update component count to `44+`
- Add note about icon-button SCSS modernization patterns (cross-reference component-dev.md)

---

#### 3. `apps/astro-builds/CLAUDE.md` — Score: 65/100 (D)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | Good coverage |
| Architecture clarity | 17/20 | Clear structure |
| Non-obvious patterns | 12/15 | Good Astro patterns |
| Conciseness | 6/15 | 699 lines, very verbose |
| Currency | 3/15 | Version 0.0.12 (actual: 1.2.2) |
| Actionability | 9/15 | Commands good but Node version wrong |

**Issues:**
- Version `0.0.12` is **severely outdated** — actual is `1.2.2`
- Node requirement shows `>=20.9.0` — project requires `>=22.12.0`

**Recommended additions:**
- Update version to `1.2.2`
- Update Node requirement to `>=22.12.0`

---

#### 4. `.claude/rules/component-dev.md` — Score: 90/100 (A-)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Non-obvious patterns | 15/15 | Excellent gotchas |
| Conciseness | 14/15 | Focused and well-scoped |
| Currency | 15/15 | Updated Feb 25 |
| Actionability | 14/15 | Patterns are executable |
| Path scoping | 15/15 | Correctly scoped to `packages/fpkit/src/**` |

**Issues:** None significant. Near-ideal rules file.

---

## Implementation Steps

### Step 1 — Fix version drift in `packages/fpkit/CLAUDE.md`

1. Update `**Version:** 0.5.11` → `**Version:** 6.3.0`
2. Update `25+ components` → `44+ components`
3. Add note after Critical Styling Rules:
   ```
   > See `.claude/rules/component-dev.md` (path-scoped to `packages/fpkit/src/**`) for the
   > authoritative SCSS patterns, CSS variable naming, and testing gotchas. This file takes
   > precedence over any SCSS guidance in this CLAUDE.md.
   ```

### Step 2 — Fix version drift in `apps/astro-builds/CLAUDE.md`

1. Update `**Version:** 0.0.12` → `**Version:** 1.2.2`
2. Update `**Node:** >= 20.9.0` → `**Node:** >= 22.12.0`

### Step 3 — Add entry points section to root `CLAUDE.md`

Add after the Commands section:

```markdown
## Package Entry Points

`@fpkit/acss` ships multiple entry points for tree-shaking:

```ts
import { Button } from '@fpkit/acss'          // Main components
import { useDisabledState } from '@fpkit/acss/hooks'  // Custom hooks
import { Icon } from '@fpkit/acss/icons'       // Icon components
import '@fpkit/acss/styles'                    // Compiled CSS (full bundle)
// Or source SCSS:
// @use '@fpkit/acss/scss/button/button'       // Per-component SCSS
```
```

### Step 4 — Add astro-builds cross-reference to root `CLAUDE.md`

Add to Project Structure section, after the `apps/astro-builds/` line:

```
│   └── CLAUDE.md                # Astro-specific guidance
```

---

## Files to Modify

| File | Change |
|------|--------|
| `packages/fpkit/CLAUDE.md` | Version, count, add component-dev.md reference |
| `apps/astro-builds/CLAUDE.md` | Version, Node requirement |
| `CLAUDE.md` (root) | Entry points section, astro-builds cross-reference |

## Verification

1. After updates, run: `grep -n "Version" packages/fpkit/CLAUDE.md` → should show `6.3.0`
2. Run: `grep -n "Version" apps/astro-builds/CLAUDE.md` → should show `1.2.2`
3. Run: `grep -n "Node" apps/astro-builds/CLAUDE.md` → should show `22.12.0`
4. Confirm root CLAUDE.md now contains `@fpkit/acss/hooks` in entry points section
5. Start a new Claude Code session and verify `@` context correctly reflects updated versions

---

## Interview Summary

*Generated via `/plan-interview` stress test.*

### Key Decisions Confirmed

- **Full rewrites** of `packages/fpkit/CLAUDE.md` (946 lines) and `apps/astro-builds/CLAUDE.md` (699 lines) targeting concise focused summaries
- **Remove duplicates** from fpkit/CLAUDE.md that already live in `.claude/rules/component-dev.md`, paired with a callout pointing there
- **Package Entry Points section** belongs in root `CLAUDE.md`
- **Storybook v9→v10** references in scope for correction

### Open Risks & Concerns

1. **Content-loss risk** — No preservation checklist defined for unique content in the large files (Storybook tags/viewports, component categories, Astro hydration patterns)
2. **Storybook migration audit missing** — Specific v9→v10 API changes not yet identified; fixing "Storybook version" without knowing what changed could produce inaccurate docs
3. **No "keep vs remove" inventory** — Rewriting 800+ lines without categorizing content first risks silent deletion of non-redundant material

### Recommended Next Steps (plan amendments)

1. **Add a content triage step** before the rewrite: read fpkit/CLAUDE.md and astro-builds/CLAUDE.md in full, classify each section as "duplicate → remove", "unique → keep", or "outdated → update"
2. **Define target structure** for each rewritten file (e.g., fpkit: Overview + Commands + Entry Points + Storybook reference + Publishing)
3. **Audit Storybook v9→v10 diff** before writing updated Storybook guidance (check `.storybook/` config for current addon API shapes)
4. **Consider scoped rewrite instead of full rewrite** to reduce risk while still raising conciseness scores meaningfully

### Simplification Opportunities

Removing the ~200 lines of SCSS/testing content that duplicates `component-dev.md` would raise conciseness score from 5/15 to ~10/15 with zero risk of losing unique content — without a full blank-slate rewrite.
