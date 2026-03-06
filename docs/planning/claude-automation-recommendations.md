# Claude Code Automation Recommendations

## Codebase Profile

- **Type**: TypeScript / Node 22+
- **Framework**: React 18 + Storybook 10
- **Build**: Vite + tsup + Sass
- **Testing**: Vitest + React Testing Library
- **Monorepo**: Lerna (independent versioning)
- **CI/CD**: GitHub Actions (`claude.yml`, `claude-code-review.yml`)
- **Existing Claude config**: `.claude/settings.json` (plan mode default), hooks via husky + lint-staged

---

## Existing Automations (Already In Place)

- Husky pre-commit: `lint-staged` auto-fixes ESLint on staged files
- GitHub Actions: `@claude` mention triggers Claude Code on issues/PRs
- `defaultMode: "plan"` — all sessions start in plan mode
- Existing skills: `fpkit-developer`, `npm-monorepo-publish`, `openspec`

---

## Recommendations

### MCP Servers

#### 1. context7
**Why**: The codebase uses React 18, Storybook 10, Vitest, Sass, and tsup. context7 provides live, version-accurate documentation for all of these — preventing hallucinated APIs when working with Storybook 10's new configuration format or Vitest's latest APIs.
**Install**:
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

#### 2. GitHub MCP
**Why**: The project has GitHub Actions workflows, uses `gh` CLI extensively (already allowed in settings), and has an active PR/issue workflow. The GitHub MCP would allow Claude to read CI results, check PR status, and manage issues without switching context.
**Install**:
```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```
Set `GITHUB_PERSONAL_ACCESS_TOKEN` in env.

---

### Skills

#### 1. new-component (User-invocable)
**Why**: Component creation is the most frequent task in this repo. A skill can scaffold the full 5-file structure (`button.tsx`, `button.scss`, `button.stories.tsx`, `button.test.tsx`, `index.ts`) with correct conventions pre-applied (data-attribute variants, `useDisabledState` import, SCSS CSS variable pattern, Storybook `FP.React Components/` prefix, RTL test boilerplate).
**Create**: `.claude/skills/new-component/SKILL.md`
**Invocation**: User-only (`disable-model-invocation: true`)

Frontmatter:
```yaml
---
name: new-component
description: Scaffold a new fpkit component with all required files following component conventions. Usage: /new-component <component-name>
arguments:
  - name: component-name
    description: The component name in kebab-case (e.g., tooltip, progress-bar)
    required: true
disable-model-invocation: true
---
```

#### 2. accessibility-audit (Claude-invocable)
**Why**: The library ships `@storybook/addon-a11y` and uses `aria-disabled` patterns. A Claude-only skill with WCAG 2.2 AA rules specific to this library's patterns (polymorphic `as` prop, `useDisabledState`, focus-trap for dialogs) would give Claude consistent audit guidance without repeating it in every session.
**Create**: `.claude/skills/accessibility-audit/SKILL.md`
**Invocation**: Claude-only (`user-invocable: false`)

---

### Hooks

#### 1. PostToolUse: TypeScript type-check after file edits
**Why**: The project uses strict TypeScript path aliases (`#components`, `#decorators`) and tsup for bundling. Type errors in component files often only surface at build time. An auto type-check hook catches them immediately after edits.
**Add to `.claude/settings.json`**:
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "cd packages/fpkit && npx tsc --noEmit 2>&1 | head -20"
      }]
    }]
  }
}
```

#### 2. PreToolUse: Block edits to `package-lock.json` and `lerna.json`
**Why**: `lerna.json` and `package-lock.json` should only be modified through controlled publish workflows (the `npm-monorepo-publish` skill). Accidental edits break versioning. The settings already block some files but not these critical ones.
**Add to `.claude/settings.json`**:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "echo '$CLAUDE_TOOL_INPUT' | python3 -c \"import sys,json; d=json.load(sys.stdin); f=d.get('file_path',''); exit(1 if any(x in f for x in ['package-lock.json','lerna.json']) else 0)\" || (echo 'Blocked: Use npm-monorepo-publish skill to modify versioning files' && exit 2)"
      }]
    }]
  }
}
```

---

### Subagents

#### 1. storybook-story-reviewer
**Why**: Story files in this repo have specific conventions: `FP.React Components/` title prefix, required SCSS import, correct tag values (`stable|beta|rc|deprecated|experimental|new`), and `autodocs` tag. A specialized reviewer catches regressions before PRs.
**Create**: `.claude/agents/storybook-story-reviewer.md`

```markdown
---
name: storybook-story-reviewer
description: Reviews Storybook story files for compliance with fpkit conventions. Use when a .stories.tsx file has been modified or created.
---

Review the provided Storybook story file against these fpkit-specific rules:
1. Title must use prefix "FP.React Components/"
2. SCSS file must be imported at the top of the story
3. tags array must only use: stable, beta, rc, deprecated, experimental, new
4. Must include autodocs tag
5. Args must use data-attribute names (data-btn, data-style, data-color), not className
6. No direct className variant props — variants use data-* attributes per component-conventions.md

Report violations with file:line references.
```

---

### Additional Notes

- **Playwright MCP**: Not recommended — Storybook visual testing is handled by Chromatic (already configured in `chromatic.config.json`). Adding Playwright would duplicate coverage.
- **Memory MCP**: The project already uses Claude's built-in auto-memory at `~/.claude/projects/`. No additional MCP needed.

---

## Implementation Priority

1. **context7 MCP** — immediate value on every session
2. **new-component skill** — highest frequency task
3. **PostToolUse TypeScript hook** — catches errors early
4. **storybook-story-reviewer subagent** — enforces conventions on PRs
5. **GitHub MCP** — convenience for CI/issue management
6. **PreToolUse block hook** — safety guard for publish workflow
7. **accessibility-audit skill** — background knowledge for Claude

---

*Generated: 2026-03-06 | Branch: fix/fpkit-developer*
