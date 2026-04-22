# Plan: Remove Transferred Plugins and Clean Up the acss Repo

## Context

The three Claude Code plugins (`fpkit-developer`, `acss-kit-builder`, `acss-app-builder`) have been successfully extracted to a new standalone repository at **[shawn-sandy/acss-plugins](https://github.com/shawn-sandy/acss-plugins)**. The new repo is live, contains all three plugins under a `plugins/<name>/` layout, and its `marketplace.json` is at version `0.2.0`. Verified 2026-04-22 via `gh api repos/shawn-sandy/acss-plugins/contents`.

This plan executes **Phase 3** of the migration plan at [we-need-to-move-distributed-porcupine.md](docs/planning/we-need-to-move-distributed-porcupine.md): delete the plugin sources from this repo, rewrite the local marketplace as a transparent `git-subdir` redirect (so existing subscribers silently upgrade on their next `/plugin marketplace update`), scrub stale release zips and scaffolding docs, and point CLAUDE.md + README.md at the new repo.

**Outcome**
- Repo footprint drops by ~632 KB of plugin sources + ~177 KB of stale zips
- Existing `/plugin marketplace add shawn-sandy/acss` users transparently follow the redirect to `shawn-sandy/acss-plugins` — no breakage on next update
- Future plugin discovery routes through CLAUDE.md and README.md links to the new repo
- The standalone skill at `.claude/skills/fpkit-developer/`, historical release zips under `downloads/`, and all `docs/planning/*.md` audit-trail docs remain untouched (confirmed Phase 3 scope in the migration plan)

**Important deviation from the original Phase 3 spec:** the migration plan assumed plugins would live at the **root** of the new repo (`./acss-app-builder/`). Live verification on 2026-04-22 shows they're actually under `plugins/<name>/` — so the `git-subdir` redirect `path` values use `plugins/<name>`, not bare `<name>`.

## Decisions (confirmed with user)

| Decision | Choice |
|---|---|
| `.claude-plugin/marketplace.json` | Rewrite as `git-subdir` redirect to shawn-sandy/acss-plugins |
| Stale root zips (`fpkit-developer.zip`, `fpkit-component-builder.zip`) | Delete both |
| `docs/planning/acss-plugins-scaffolding/` | Delete entire subdirectory |
| `.claude/fpkit-component-builder/` | Keep (user-confirmed — retain as project-local skill) |
| `CLAUDE.md` + root `README.md` | Add a short Plugins section pointing to the new repo |
| `openspec/plans/acss-kit-builder-skill.md` | Keep (audit trail) |
| `docs/acss-kit-builder-tutorial.md` | Keep |
| `.claude/settings.json` | No change (verified — no plugin entries to remove) |

## Steps

### 1. Rewrite `.claude-plugin/marketplace.json` as a redirect stub

Replace the entire contents of [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) so each plugin's `source` becomes a `git-subdir` object pointing at the new repo's `plugins/<name>` path. **Remove per-plugin `version` fields** (the Claude Code docs rule is explicit: for non-relative-path sources, `plugin.json` is authoritative; setting it in the marketplace entry is silently ignored and flagged as the "dual-version anti-pattern").

New file content:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "acss-plugins",
  "version": "0.2.0",
  "description": "Plugins now live at shawn-sandy/acss-plugins; this marketplace redirects automatically via git-subdir sources. Run `/plugin marketplace update shawn-sandy-acss` once to pick up the new location.",
  "owner": {
    "name": "Shawn Sandy",
    "url": "https://github.com/shawn-sandy/acss-plugins"
  },
  "plugins": [
    {
      "name": "fpkit-developer",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss-plugins.git",
        "path": "plugins/fpkit-developer"
      },
      "description": "Deprecated — superseded by acss-app-builder. Guides development of applications built with @fpkit/acss React components.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "css-variables", "accessibility", "wcag", "component-composition", "deprecated"]
    },
    {
      "name": "acss-kit-builder",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss-plugins.git",
        "path": "plugins/acss-kit-builder"
      },
      "description": "Generate fpkit-style React components without installing @fpkit/acss. Reference-guided generation with CSS custom properties. Requires only React + sass.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "component-generation", "css-variables", "sass", "typescript"]
    },
    {
      "name": "acss-app-builder",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss-plugins.git",
        "path": "plugins/acss-app-builder"
      },
      "description": "Scaffold apps with the @fpkit/acss design system: layouts, pages, themes, forms, patterns. Works with the @fpkit/acss npm package OR generated acss-kit-builder source.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "scaffolding", "forms", "layouts", "themes", "patterns"]
    }
  ]
}
```

**Why `git-subdir`, not `github`:** `github` assumes the whole repo is one plugin (no `path` field). `git-subdir` sparse-clones only the target subdirectory, which is exactly what makes this migration drop install footprint from ~14 MB to ~600 KB.

### 2. Delete the plugin source tree

```
rm -rf .claude/plugins/
```

This removes all 86 files / ~632 KB across the three plugin directories. After deletion, also remove the now-orphaned parent if empty (it is — only `plugins/` lives there).

### 3. Delete stale release zips at repo root

```
rm fpkit-developer.zip
rm fpkit-component-builder.zip
```

Combined ~177 KB. These are historical release artifacts; future releases will live on the new repo.

### 4. Delete the scaffolding subdirectory

```
rm -rf docs/planning/acss-plugins-scaffolding/
```

Removes 7 files (CLEAN-COPY.md, HANDOFF.md, marketplace.json, README.md, CONTRIBUTING.md, LICENSE, gitignore.template). The scaffolding already served its purpose — the new repo is live with those exact files.

### 5. Add a Plugins section to `CLAUDE.md`

Insert a new `## Plugins` section in [CLAUDE.md](CLAUDE.md) **between the existing `## Plans` section (line 100-102) and `## Publishing` section (line 104)**. Content:

```markdown
## Plugins

Claude Code plugins that extend this project live in a separate repository: **[shawn-sandy/acss-plugins](https://github.com/shawn-sandy/acss-plugins)**.

The local `.claude-plugin/marketplace.json` in this repo is a transparent redirect — existing subscribers of `shawn-sandy/acss` continue to receive updates through `/plugin marketplace update`. Three plugins are currently distributed:

- **acss-app-builder** — scaffold apps with the @fpkit/acss design system (layouts, pages, themes, forms, patterns)
- **acss-kit-builder** — generate fpkit-style React components without installing `@fpkit/acss`
- **fpkit-developer** (deprecated) — superseded by acss-app-builder

For plugin development, file an issue or PR at the new repo.
```

**Why this placement:** the Project Structure tree (lines 21-39) does not list `.claude/plugins/` so we don't need to update it, and the Plans section is about planning documents, not plugins. Placing the new section between Plans and Publishing keeps related topics grouped.

### 6. Add a Plugins section to the root `README.md`

Insert a short section in [README.md](README.md) **after the existing `## Design system` section (lines 10-18) and before the `## Features` section (line 19)**. Content:

```markdown
## Claude Code plugins

Plugins for building applications with `@fpkit/acss` are distributed through a separate marketplace: **[shawn-sandy/acss-plugins](https://github.com/shawn-sandy/acss-plugins)**.

```bash
/plugin marketplace add shawn-sandy/acss-plugins
/plugin install acss-app-builder@shawn-sandy-acss-plugins
```

Three plugins are available: `acss-app-builder` (app scaffolding), `acss-kit-builder` (component generation), and `fpkit-developer` (deprecated).
```

**Why this placement:** the README opens with `## Design system` at line 10; a sibling `## Claude Code plugins` section immediately after it surfaces plugin availability to anyone browsing the project landing page, without disrupting the existing Features → Installation → Quick Start narrative flow.

### 7. Commit and push

Single commit capturing all five deletions + the marketplace rewrite + the two doc updates:

```
refactor(plugins): extract to shawn-sandy/acss-plugins with redirect stub

- Delete .claude/plugins/ (all three plugins now at shawn-sandy/acss-plugins)
- Rewrite .claude-plugin/marketplace.json as git-subdir redirect
- Delete stale root zips: fpkit-developer.zip, fpkit-component-builder.zip
- Delete docs/planning/acss-plugins-scaffolding/ (scaffolding already used)
- Add Plugins section to CLAUDE.md linking to new repo
- Add Claude Code plugins section to README.md linking to new repo
```

Push to the current worktree branch (`claude/hopeful-franklin-07795e`) and open a PR against `main`.

## Critical files to modify

- [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) — rewrite as redirect (step 1)
- [.claude/plugins/](./.claude/plugins/) — delete entire tree (step 2)
- `fpkit-developer.zip` and `fpkit-component-builder.zip` at repo root — delete (step 3)
- [docs/planning/acss-plugins-scaffolding/](docs/planning/acss-plugins-scaffolding/) — delete entire subdirectory (step 4)
- [CLAUDE.md](CLAUDE.md) — insert Plugins section between lines 102 and 104 (step 5)
- [README.md](README.md) — insert Claude Code plugins section between lines 18 and 19 (step 6)

## Files intentionally NOT modified (per user decisions + migration plan)

- [.claude/skills/fpkit-developer/](.claude/skills/fpkit-developer/) — separate standalone project-local skill, out of plugin scope
- [.claude/fpkit-component-builder/](.claude/fpkit-component-builder/) — kept per user direction; retained as a project-local skill even though the related `fpkit-component-builder.zip` is being removed
- [downloads/fpkit-developer/](downloads/fpkit-developer/) — historical release archive
- [openspec/plans/acss-kit-builder-skill.md](openspec/plans/acss-kit-builder-skill.md) — historical audit trail
- [docs/acss-kit-builder-tutorial.md](docs/acss-kit-builder-tutorial.md) — user chose to keep
- [docs/planning/we-need-to-move-distributed-porcupine.md](docs/planning/we-need-to-move-distributed-porcupine.md) and other historical planning docs — audit trail
- [.claude/settings.json](.claude/settings.json) — verified, contains no plugin references
- [packages/fpkit/src/docs/fpkit-developer.mdx](packages/fpkit/src/docs/fpkit-developer.mdx) and [packages/fpkit/README.md](packages/fpkit/README.md) — npm package docs; out of Phase 3 cleanup scope (the original migration plan placed `.mdx` update in Phase 3 step 16, but user's scope here is focused on repo-level plugin delivery, not per-package docs)
- [packages/fpkit/CHANGELOG.md](packages/fpkit/CHANGELOG.md) and root [CHANGELOG.md](CHANGELOG.md) — historical changelog entries remain as-is

## Verification

### Step A — Marketplace schema validity
After rewriting `.claude-plugin/marketplace.json`, pipe through `jq` to confirm it parses:
```bash
jq . .claude-plugin/marketplace.json
```
Confirm each plugin entry's inner `source.source` is `"git-subdir"`, `source.url` ends in `.git`, and `source.path` starts with `plugins/`.

### Step B — Redirect resolves in a fresh Claude Code session
In a disposable Claude Code session (different from the current one to avoid cache):
```
/plugin marketplace add shawn-sandy/acss
/plugin install acss-app-builder@shawn-sandy-acss
```
Confirm the `/app-init` slash command registers — this proves the `git-subdir` source successfully fetched from the new repo through the old marketplace name.

### Step C — Existing-subscriber upgrade path (critical scenario)
This is the exact scenario the redirect exists to serve. Simulate a user who subscribed to `shawn-sandy/acss` *before* this PR:
```
# 1. On the branch point BEFORE step 1's commit, subscribe:
git checkout <pre-PR-sha>
/plugin marketplace add shawn-sandy/acss
/plugin install acss-app-builder@shawn-sandy-acss
# confirm it installs from old .claude/plugins/ layout

# 2. Jump to the migrated state and update ONLY (no re-add):
git checkout claude/hopeful-franklin-07795e
/plugin marketplace update shawn-sandy-acss
```
Expected: update succeeds, plugin files now come from the new repo, local cache shrinks to ~600 KB. If update fails or throws, halt and investigate before merging.

### Step D — acss build/lint still passes
```bash
npm install
npm run lint
npm run build --workspace=@fpkit/acss
```
Nothing in this PR should affect these — but run them to catch accidental collateral damage (e.g., a `tsc` picking up a removed plugin path from some cached config).

### Step E — Storybook still opens
```bash
npm start
```
Confirm http://localhost:6006 loads and components render.

## Next Steps (out of scope — separate changes)

- After one release cycle, delete `.claude-plugin/marketplace.json` and the now-empty `.claude-plugin/` directory entirely (Phase 5 of the original migration plan). Users will need to re-add `shawn-sandy/acss-plugins` directly.
- Remove the `fpkit-developer` entry from the new repo's marketplace once its deprecation window closes.
- Consolidate duplicated `validate_css_vars.py` in the new repo (flagged in the migration plan as out-of-scope follow-up).
- Clean up references to the moved plugins in `packages/fpkit/src/docs/fpkit-developer.mdx` and `packages/fpkit/README.md` — separate PR focused on per-package docs.
