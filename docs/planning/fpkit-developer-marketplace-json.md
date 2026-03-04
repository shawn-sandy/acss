# Plan: Create marketplace.json for shawn-sandy/acss repo

## Context

The `fpkit-developer` plugin README documents a marketplace install via:
```
/plugin marketplace add shawn-sandy/acss
/plugin install fpkit-developer@shawn-sandy-acss
```

This requires a `.claude-plugin/marketplace.json` at the **repo root** of `shawn-sandy/acss`. Without it, Claude Code cannot discover or install the plugin from the GitHub marketplace source. The file registers which plugins the repo contains and where their source directories are.

---

## File to Create

**Path:** `/Users/shawnsandy/devbox/acss/.claude-plugin/marketplace.json`

---

## Content

Based on the schema used by `claude-code-marketplace` and `agentics-kit`:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "acss-plugins",
  "version": "0.1.6",
  "description": "Claude Code plugins for building applications with @fpkit/acss React components",
  "owner": {
    "name": "Shawn Sandy",
    "url": "https://github.com/shawn-sandy/acss"
  },
  "plugins": [
    {
      "name": "fpkit-developer",
      "source": "./.claude/plugins/fpkit-developer",
      "version": "0.1.6",
      "description": "Guides development of applications built with @fpkit/acss React components. Use when composing custom components from fpkit primitives, validating or customizing CSS variables, extending fpkit components, or ensuring WCAG accessibility compliance.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "css-variables", "accessibility", "wcag", "component-composition"]
    }
  ]
}
```

---

## Key decisions

- `name: "acss-plugins"` — marketplace identifier (different from the plugin name to avoid collision)
- `source: "./.claude/plugins/fpkit-developer"` — relative path from marketplace.json location to plugin root
- `$schema` — included for IDE validation (matches agentics-kit pattern)
- `category: "development"` and `tags` — enable discovery filtering in the plugin UI

---

## Files to create

| Path | Action |
|------|--------|
| `.claude-plugin/marketplace.json` | Create (repo root) |

---

## Verification

1. Confirm file exists: `ls .claude-plugin/marketplace.json`
2. Validate JSON: `python -m json.tool .claude-plugin/marketplace.json`
3. Test marketplace add in Claude Code:
   ```
   /plugin marketplace add shawn-sandy/acss
   ```
4. Confirm plugin appears in Discover tab:
   ```
   /plugin install fpkit-developer@acss-plugins
   ```
5. Check plugin loads: run `/plugin` → Installed tab → confirm `fpkit-developer` listed

---

## Unresolved questions

- None — schema is well understood from existing examples.
