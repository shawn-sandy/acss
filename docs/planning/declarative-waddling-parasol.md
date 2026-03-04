# Plan: Address PR #124 Review Comments

## Context

PR #124 adds the `fpkit-developer` Claude Code plugin and updates project rules/docs. A code review (comment #3997581584) flagged one critical issue, one bug, two minor issues, and two observations that should be resolved before merging.

---

## Issues to Fix

### 1. Remove accidentally committed session log (Critical)

**File to delete:** `2026-03-04-081723-local-command-caveatcaveat-the-messages-below-w.txt` (repo root)

Steps:
1. `git rm` the file from the repo
2. Add pattern to `.gitignore` to prevent recurrence: `[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.txt`

**File:** `.gitignore`

---

### 2. Fix validator: check intermediate name parts (Bug)

**File:** `.claude/plugins/fpkit-developer/scripts/validate_css_vars.py`

In `validate_variable_name()`, intermediate segments (between component and final property) are never checked against `FORBIDDEN_ABBREVIATIONS`. A variable like `--btn-cl-bg` would pass silently.

Fix — after existing checks, add a loop over `parts[1:-1]`:

```python
for i, part in enumerate(parts[1:-1], start=1):
    if part in FORBIDDEN_ABBREVIATIONS:
        errors.append(
            f"Segment '{part}' at position {i} uses forbidden abbreviation; "
            f"use '{FORBIDDEN_ABBREVIATIONS[part]}' instead"
        )
```

---

### 3. Remove `re.IGNORECASE` from CSS_VAR_PATTERN (Minor)

**File:** `.claude/plugins/fpkit-developer/scripts/validate_css_vars.py`

CSS custom properties are case-sensitive. The flag allows `--Btn-BG` to pass validation.

Change (line ~57):
```python
# Before
CSS_VAR_PATTERN = re.compile(
    r'--([a-z][a-z0-9-]*)\s*:\s*([^;]+);',
    re.IGNORECASE
)

# After
CSS_VAR_PATTERN = re.compile(
    r'--([a-z][a-z0-9-]*)\s*:\s*([^;]+);'
)
```

---

### 4. Deprecate/remove old skill file (Warning)

**File:** `.claude/skills/fpkit-developer/SKILL.md`

The plugin now contains the canonical version at `.claude/plugins/fpkit-developer/skills/fpkit-developer/SKILL.md`. The old file should either be removed or reduced to a stub that redirects users to the plugin.

Recommended: Replace content with a deprecation notice pointing to the plugin path.

---

### 5. Restore path alias import example in CLAUDE.md (Observation)

**File:** `CLAUDE.md` — lines 77–82 (TypeScript Path Aliases section)

Add a concrete import example under the alias table:

```markdown
**Example:**
```ts
import { Button } from '#components/button/button'
import { useToggle } from '#hooks/use-toggle'
```
```

---

### 6. Rename auto-generated planning doc (Observation)

**File:** `docs/planning/mutable-dreaming-hare.md`

Rename to a descriptive name that reflects the plan's content (check contents first to confirm topic, then rename via `git mv`).

---

## Critical Files

| File | Change |
|------|--------|
| `2026-03-04-*.txt` (root) | Delete via `git rm` |
| `.gitignore` | Add pattern for timestamp-prefixed `.txt` files |
| `.claude/plugins/fpkit-developer/scripts/validate_css_vars.py` | Fix intermediate part validation + remove IGNORECASE |
| `.claude/skills/fpkit-developer/SKILL.md` | Replace with deprecation stub |
| `CLAUDE.md` | Add import example for `#*` alias |
| `docs/planning/mutable-dreaming-hare.md` | Rename via `git mv` |

---

## Verification

1. Run `python validate_css_vars.py` against a file containing `--btn-cl-bg: red;` — expect validation error
2. Run against a file containing `--Btn-BG: red;` — expect no match (case mismatch)
3. Confirm `git status` shows the `.txt` file removed
4. Confirm `.gitignore` blocks new timestamp-prefixed `.txt` files: `echo "" > 2026-03-04-test.txt && git status` (should be ignored)
5. Review `CLAUDE.md` path alias section visually
