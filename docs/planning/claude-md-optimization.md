# CLAUDE.md Optimization Plan

**Source:** CLAUDE.md audit (score 9/12 — Functional)
**Goal:** Reduce constant instruction load; improve progressive disclosure via path-scoped rules.

## Steps

1. **Create `.claude/rules/component-dev.md`** with `paths: packages/fpkit/src/**` frontmatter
   - Extract from CLAUDE.md: CSS variable naming, SCSS patterns, architectural patterns, Storybook conventions, testing gotchas
   - Rule activates only when editing component files — zero load otherwise
   - Verify: `.claude/rules/` directory created, frontmatter is valid

2. **Trim `## Component Development`** in CLAUDE.md
   - Keep: "Creating Components" checklist (5 steps), TypeScript path aliases
   - Remove: All detailed pattern sub-sections (delegated to rules file)
   - Add: One-line reference pointing to `.claude/rules/component-dev.md`

3. **Trim `## Publishing`** to a single directive (3 lines max)
   - Keep: "Use `npm-monorepo-publish` skill" + "no major bump without approval"
   - Keep: CHANGELOG/minor bump note
   - Remove: Workflow bullets (pre-publish validation, release branch, OTP, post-verify) — these live in the skill

4. **Remove `## Plan Mode Instructions`**
   - Already present verbatim in `~/.claude/CLAUDE.md` (global user memory)
   - Duplicate risks drift; project-level should only contain project-specific overrides

## Expected Outcome

- CLAUDE.md drops from 213 → ~100 lines
- Estimated instructions: ~20 (down from ~35)
- Component conventions load only for `packages/fpkit/src/**` sessions

## Verification

- [ ] CLAUDE.md line count < 120
- [ ] `.claude/rules/component-dev.md` exists with valid `paths:` frontmatter
- [ ] No component conventions duplicated across both files
- [ ] Publishing section ≤ 3 lines
- [ ] Plan Mode Instructions removed from project CLAUDE.md
