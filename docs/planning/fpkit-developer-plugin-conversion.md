# Plan: Convert fpkit-developer Skill to Shareable Plugin

## Context

The `fpkit-developer` skill currently lives as a standalone skill at `.claude/skills/fpkit-developer/`. The user wants it converted to a distributable Claude Code plugin — a structured, installable unit with a `plugin.json` manifest that can be packaged as a ZIP and shared. The IDE diagnostics also revealed one real issue: `version:` is not a supported SKILL.md frontmatter attribute and must be removed or moved to `metadata:`.

---

## Plugin Structure Target

```
.claude/plugins/fpkit-developer/
├── .claude-plugin/
│   └── plugin.json              ← Plugin manifest (name, description, author)
├── commands/
│   └── fpkit-dev.md             ← /fpkit-dev slash command
├── skills/
│   └── fpkit-developer/
│       ├── SKILL.md             ← Moved + cleaned (remove unsupported version:)
│       ├── references/          ← Moved from current skill root
│       └── scripts/
│           └── validate_css_vars.py  ← Bundled (requires Python 3.x)
├── README.md                    ← Plugin-level user documentation
└── LICENSE                      ← MIT license
```

---

## Steps

### 1. Create plugin directory skeleton

Create `.claude/plugins/fpkit-developer/` with empty subdirectories:
- `.claude-plugin/`
- `skills/fpkit-developer/`

### 2. Create `.claude-plugin/plugin.json`

```json
{
  "name": "fpkit-developer",
  "description": "Guides development of applications built with @fpkit/acss React components.",
  "version": "0.1.6",
  "author": {
    "name": "Shawn Sandy",
    "url": "https://github.com/shawn-sandy/acss"
  },
  "license": "MIT",
  "skills": [
    "skills/fpkit-developer"
  ]
}
```

### 3. Copy + clean SKILL.md into plugin

- Copy `.claude/skills/fpkit-developer/SKILL.md` → `skills/fpkit-developer/SKILL.md`
- Remove `version: 0.1.6` line from frontmatter (unsupported attribute)
- Move version info to `metadata:` block if needed for tracking:
  ```yaml
  metadata:
    version: "0.1.6"
  ```

### 4. Create `commands/fpkit-dev.md`

Frontmatter:
```yaml
---
description: Start the fpkit-developer workflow for composing, extending, or customizing @fpkit/acss components
argument-hint: [component-name or description]
allowed-tools: [Read, Glob, Grep, Bash]
---
```

Body: One-paragraph prompt that loads the fpkit-developer skill context and asks the user what component task they need help with.

### 6. Copy references/ and scripts/ into plugin

- Copy `.claude/skills/fpkit-developer/references/` → `skills/fpkit-developer/references/`
- Copy `.claude/skills/fpkit-developer/scripts/validate_css_vars.py` → `skills/fpkit-developer/scripts/`

### 7. Create `README.md`

Plugin-level README with the following sections:

**What it does** — 2–3 sentence summary; fpkit + acss context; what the skill and `/fpkit-dev` command enable.

**Prerequisites**
- Claude Code (any recent version with plugin support)
- `@fpkit/acss` ≥ v0.1.x installed in the target project
- Python 3.x (for `scripts/validate_css_vars.py` — verify: `python --version`)

**Installation**

Option A — User-level (available across all projects):
```bash
mkdir -p ~/.claude/plugins/
cp -r fpkit-developer ~/.claude/plugins/
```

Option B — Project-level:
```bash
mkdir -p .claude/plugins/
cp -r fpkit-developer .claude/plugins/
```

**Verify installation**
```bash
ls ~/.claude/plugins/fpkit-developer/.claude-plugin/plugin.json
```
Then restart Claude Code. The `/fpkit-dev` slash command should appear in the command palette.

**Usage**
- Automatic: Claude activates the skill when the conversation involves @fpkit/acss component work
- Manual: Type `/fpkit-dev` in Claude Code to start the guided workflow

**Uninstall**
```bash
rm -rf ~/.claude/plugins/fpkit-developer
# or for project-level:
rm -rf .claude/plugins/fpkit-developer
```

**Compatibility** — `@fpkit/acss` v0.1.x, macOS / Linux / Windows

### 8. Create `LICENSE`

MIT license file.

### 9. (Optional) Keep original skill in place

Leave `.claude/skills/fpkit-developer/` untouched so the skill continues to work locally. The plugin directory is the distributable copy.

---

## Files to Create/Modify

| Action | Path |
|--------|------|
| Create | `.claude/plugins/fpkit-developer/.claude-plugin/plugin.json` |
| Create | `.claude/plugins/fpkit-developer/commands/fpkit-dev.md` |
| Create | `.claude/plugins/fpkit-developer/skills/fpkit-developer/SKILL.md` |
| Copy   | `.claude/plugins/fpkit-developer/skills/fpkit-developer/references/` |
| Copy   | `.claude/plugins/fpkit-developer/skills/fpkit-developer/scripts/validate_css_vars.py` |
| Create | `.claude/plugins/fpkit-developer/README.md` |
| Create | `.claude/plugins/fpkit-developer/LICENSE` |
| Fix    | `.claude/skills/fpkit-developer/SKILL.md` — remove unsupported `version:` line |

---

## Verification

1. Confirm `plugin.json` is valid JSON
2. Confirm SKILL.md frontmatter has no `version:` line (IDE diagnostics should clear)
3. Confirm `references/` paths in SKILL.md body still resolve correctly
4. Run `wc -l` on the plugin SKILL.md to confirm line count stays ≤500

---

## Unresolved Questions

- Should `scripts/validate_css_vars.py` be included in the plugin? (Requires Python on the user's machine)
- Should a user-invocable slash command (e.g. `/fpkit`) be added to the plugin?
