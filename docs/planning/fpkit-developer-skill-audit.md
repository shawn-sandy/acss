# Skill Audit: fpkit-developer SKILL.md

## Context

Automated quality audit of `.claude/skills/fpkit-developer/SKILL.md` against Anthropic skill authoring best practices. Score: 7/10 (Good). This plan captures the recommended improvements to bring the skill to Excellent (9-10/10).

---

## Audit Summary

| Dimension | Score |
|-----------|-------|
| Frontmatter Validity | 2/2 |
| Body Quality | 1/2 |
| Structure & Progressive Disclosure | 1/2 |
| Anti-pattern Detection | 1/2 |
| Discoverability | 2/2 |
| **Total** | **7/10 — Good** |

---

## Improvement Plan

### 1. Add Table of Contents (ERROR — required at ≥100 lines)

- Insert ToC after `# FPKit Developer` heading (line 7)
- Link to: Purpose, Workflow (Steps 1-7), Reference Documentation, Tools, Examples, Best Practices, Troubleshooting, Resources

### 2. Trim Body to <500 Lines (ERROR — currently ~553 lines)

- Move "Quick Reference Search" grep commands (lines 273–302) into `references/composition.md` or a new `references/cheatsheet.md`
- Move "Resources" section (lines 547–553) into a reference file or consolidate with existing docs
- Target: ≤480 lines in SKILL.md body

### 3. Remove Hardcoded Line Reference (WARNING)

- File: line 488
- Change: `"See SKILL.md → Step 4: Extend fpkit Components (lines 117-156)"`
- To: `"See Step 4: Extend fpkit Components above"`

### 4. Fix Version Inconsistency (WARNING)

- File: line 558
- Change: `"version 1.x"` → `"v0.1.x"`
- Ensure heading `"Compatible with @fpkit/acss v0.1.x"` and body text agree

### 5. Add Prerequisites for Scripts (WARNING)

- After the `python scripts/validate_css_vars.py` code block (line 203), add:
  ```
  **Prerequisites:** Python 3.x required. Verify with `python --version`.
  ```
- After `jest-axe` reference (line 225), add:
  ```
  **Install:** `npm install --save-dev jest-axe @types/jest-axe`
  ```

### 6. Add Feedback Loop to Accessibility Step (INFO)

- In Step 6, add a conditional: "If any checklist item fails → return to Step 3/4/5 to fix before proceeding"

---

## Files to Modify

- `.claude/skills/fpkit-developer/SKILL.md` — primary
- `.claude/skills/fpkit-developer/references/composition.md` — move grep cheatsheet here (optional)

---

## Verification

1. Re-run `skill-reviewer:reviewing-skills` after changes
2. Confirm body line count ≤500: `wc -l .claude/skills/fpkit-developer/SKILL.md`
3. Confirm ToC links resolve to correct headings
4. Confirm no `lines NNN-NNN` references remain: `grep -n "lines [0-9]" SKILL.md`
5. Confirm version strings are consistent: `grep -n "version\|v0\." SKILL.md`

---

## Unresolved Questions

- Should the Quick Reference Search section be removed entirely or moved to a reference file?
- Is Python guaranteed available in the target developer environment, or should the script be replaced with a Node.js alternative?
