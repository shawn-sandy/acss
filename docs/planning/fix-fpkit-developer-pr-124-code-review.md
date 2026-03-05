# Fix PR #124 Code Review Issues

## Context

Claude Code reviewed PR #124 (fpkit-developer plugin + docs/rules) and flagged 2 bugs, 1 path mismatch, and 2 minor issues. All fixes are confined to documentation/skill files — no library source code changes needed.

---

## Issues to Fix

### Bug 1 — `disabled` vs `aria-disabled` contradiction (3 files)

The `LoadingButton` examples use native `disabled={...}`, which contradicts the prose in the same files stating that fpkit Button uses `aria-disabled` to keep buttons in the tab order.

**Fix:** Replace `disabled={isLoading || props.disabled}` → `aria-disabled={isLoading || props.disabled}` in all examples.

Affected locations:
- `SKILL.md` line ~174 (Step 4 example)
- `references/composition.md` line ~152 (Pattern 3), line ~607 (TypeScript Support section)
- `references/architecture.md` line ~265 (Pattern 3), line ~561 (forwardRef example)

---

### Bug 2 — `useState(loading)` stale state (3 files)

`useState(loading)` only reads the `loading` prop once at mount; prop changes after mount are silently ignored. Since `onClickAsync` drives loading state, initialize with `false`.

**Fix:** `useState(loading)` → `useState(false)` in all stateful examples.

Affected locations:
- `SKILL.md` line ~158 (Step 4 example)
- `references/composition.md` line ~140 (Pattern 3)
- `references/architecture.md` line ~251 (Pattern 3)

---

### Path Mismatch — Script path in `fpkit-dev.md`

The command says `scripts/validate_css_vars.py` which won't resolve from a user's project root. The script lives inside the plugin at `skills/fpkit-developer/scripts/validate_css_vars.py`.

**Fix:** Update step 4 in `commands/fpkit-dev.md` to document the correct plugin-relative path so Claude can locate the script.

File: `.claude/plugins/fpkit-developer/commands/fpkit-dev.md`

---

### Minor — Compatibility version in README and SKILL.md

Both say `@fpkit/acss v0.1.x` but the library is at `v0.5.11+`. The skill is not locked to 0.1.x.

**Fix:** Change to `>= v0.1.x` in:
- `.claude/plugins/fpkit-developer/README.md` (Compatibility section)
- `.claude/plugins/fpkit-developer/skills/fpkit-developer/SKILL.md` (bottom footer line)

---

### Minor — Deprecated stub install command incomplete

`.claude/skills/fpkit-developer/SKILL.md` has:
```
/plugin install fpkit-developer
```
The correct full command per the README is:
```
/plugin install fpkit-developer@shawn-sandy-acss
```

**Fix:** Update the stub with the complete install command.

---

## Files to Modify

| File | Changes |
|------|---------|
| `.claude/plugins/fpkit-developer/skills/fpkit-developer/SKILL.md` | Bug 1 (aria-disabled), Bug 2 (useState), version string |
| `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/composition.md` | Bug 1 (2 locations), Bug 2 |
| `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/architecture.md` | Bug 1 (2 locations), Bug 2 |
| `.claude/plugins/fpkit-developer/commands/fpkit-dev.md` | Script path |
| `.claude/plugins/fpkit-developer/README.md` | Version string |
| `.claude/skills/fpkit-developer/SKILL.md` | Install command |

---

## Steps

1. Fix `SKILL.md` — `useState(false)`, `aria-disabled`, version footer
2. Fix `composition.md` — `useState(false)`, `aria-disabled` in Pattern 3 and TypeScript Support
3. Fix `architecture.md` — `useState(false)`, `aria-disabled` in Pattern 3 and forwardRef example
4. Fix `fpkit-dev.md` — clarify script path for the CSS var validator
5. Fix `README.md` — update `v0.1.x` → `>= v0.1.x`
6. Fix deprecated stub — update install command to full `@shawn-sandy-acss` qualifier

---

## Verification

- Grep for `disabled={isLoading` and `disabled={loading` across the plugin directory — should return 0 results
- Grep for `useState(loading)` — should return 0 results
- Manually review `fpkit-dev.md` step 4 wording for clarity
- No build/test steps required (docs-only changes)
