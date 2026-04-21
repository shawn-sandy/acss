# Plan: Switch marketplace plugin sources to `git-subdir` so installs fetch only plugin files

## Context

**Problem.** When a user runs `/plugin install fpkit-developer@acss-plugins`, Claude Code currently ships the **entire `@fpkit/acss` monorepo** to their cache — `packages/fpkit/`, `apps/astro-builds/`, `openspec/`, `docs/`, and so on — because `.claude-plugin/marketplace.json` declares each plugin with a relative-path source (`"./.claude/plugins/fpkit-developer"`). Relative paths assume the marketplace's full repo is already cloned locally, so nothing scopes the transfer down to the plugin directory.

**Root cause.** Relative-path sources work by resolving against the already-cloned marketplace repo. They do not trigger a separate, narrower fetch.

**Target.** Use the [`git-subdir` source type](https://code.claude.com/docs/en/plugin-marketplaces#git-subdirectories), which tells Claude Code to do a sparse, partial clone of just the plugin's subdirectory within the repo. Only the plugin files transfer — the rest of the monorepo never leaves GitHub.

**Secondary goal.** Register the two plugins that physically exist in `.claude/plugins/` but are not in the catalog yet: `acss-kit-builder` (standalone component generator) and `acss-app-builder` (app scaffolder, supersedes `fpkit-developer`). Mark `fpkit-developer` as deprecated in both the marketplace entry and its own `plugin.json` so users see a consistent deprecation signal regardless of which source Claude Code reads.

**Implementation note — original plan revised.** The plan originally intended to defer the `metadata.*` reshuffle, but `claude plugin validate .` rejects the root-level `$schema`, `version`, and `description` keys outright (`Unrecognized keys` error). The reshuffle is therefore required, not optional. The final file drops `$schema` entirely (Claude Code doesn't recognize it; it was IDE hinting only) and moves `version`/`description` into `metadata.*`.

**Dependency note.** This plan assumes `shawn-sandy/acss` remains a **public** GitHub repo. If the repo is ever made private, `git-subdir` installs require users to set `GITHUB_TOKEN` in their environment (per Claude Code plugin docs). Not a concern today, but worth flagging.

**Two caches, two concerns.** Claude Code keeps two separate caches per marketplace and the refactor only narrows one of them:

| Cache | Path | Before refactor | After refactor | Fix |
|-------|------|----------------|----------------|-----|
| Marketplace (holds `marketplace.json`) | `~/.claude/plugins/marketplaces/<name>/` | ~14 MB full monorepo | Still ~14 MB — same repo | **User-side CLI flag**: `--sparse .claude-plugin` on `marketplace add` → ~1.6 MB |
| Plugin payload (what actually runs) | `~/.claude/plugins/cache/<name>/<plugin>/<version>/` | ~14 MB full monorepo per plugin | ~150–325 K per plugin | `git-subdir` source type in `marketplace.json` (this refactor) |

The marketplace-cache reduction requires the user to pass `--sparse .claude-plugin`; we can't enforce it from `marketplace.json`. Plugin READMEs now recommend it as the default install flow.

---

## Objective

1. Rewrite `.claude-plugin/marketplace.json` so each plugin entry uses a `git-subdir` source and all three plugins are registered.
2. Update `fpkit-developer/plugin.json` description so its deprecation signal matches the marketplace entry.
3. Update each plugin's README with the correct install instructions, including the reinstall step existing users need.

---

## Current State

**File:** `.claude-plugin/marketplace.json` (repo root)

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "acss-plugins",
  "version": "0.1.6",
  "description": "Claude Code plugins for building applications with @fpkit/acss React components",
  "owner": { "name": "Shawn Sandy", "url": "https://github.com/shawn-sandy/acss" },
  "plugins": [
    {
      "name": "fpkit-developer",
      "source": "./.claude/plugins/fpkit-developer",
      "version": "0.1.6",
      "description": "…",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "css-variables", "accessibility", "wcag", "component-composition"]
    }
  ]
}
```

**Plugin directories present** (each has its own `.claude-plugin/plugin.json`):
- `.claude/plugins/fpkit-developer/` — v0.1.6 (in catalog today)
- `.claude/plugins/acss-kit-builder/` — v0.1.0 (NOT in catalog)
- `.claude/plugins/acss-app-builder/` — v0.1.0 (NOT in catalog; supersedes fpkit-developer per its own manifest)

---

## Target State

### 1. `.claude-plugin/marketplace.json` (rewritten)

```json
{
  "name": "acss-plugins",
  "owner": {
    "name": "Shawn Sandy",
    "url": "https://github.com/shawn-sandy/acss"
  },
  "metadata": {
    "version": "0.2.0",
    "description": "Claude Code plugins for building applications with @fpkit/acss React components"
  },
  "plugins": [
    {
      "name": "acss-app-builder",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss.git",
        "path": ".claude/plugins/acss-app-builder"
      },
      "description": "Scaffold apps with the @fpkit/acss design system: layouts, pages, themes, forms, patterns. Works with the @fpkit/acss npm package OR generated acss-kit-builder source. Supersedes the deprecated fpkit-developer plugin.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "app-scaffolding", "layouts", "themes", "forms"]
    },
    {
      "name": "acss-kit-builder",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss.git",
        "path": ".claude/plugins/acss-kit-builder"
      },
      "description": "Generate fpkit-style React components without installing @fpkit/acss. Reference-guided generation with CSS custom properties. Requires only React + sass.",
      "category": "development",
      "tags": ["fpkit", "acss", "react", "component-generation", "css-variables", "standalone"]
    },
    {
      "name": "fpkit-developer",
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss.git",
        "path": ".claude/plugins/fpkit-developer"
      },
      "description": "[DEPRECATED — use acss-app-builder] Guides development of applications built with @fpkit/acss React components. Kept for backwards compatibility with existing installs.",
      "category": "development",
      "tags": ["deprecated", "fpkit", "acss", "react", "css-variables", "accessibility", "wcag"]
    }
  ]
}
```

### 2. `.claude/plugins/fpkit-developer/.claude-plugin/plugin.json` (description updated)

```json
{
  "name": "fpkit-developer",
  "description": "[DEPRECATED — use acss-app-builder] Guides development of applications built with @fpkit/acss React components. Provides component composition workflows, CSS variable validation, and WCAG accessibility guidance.",
  "version": "0.1.7",
  "author": { "name": "Shawn Sandy", "url": "https://github.com/shawn-sandy/acss" },
  "license": "MIT"
}
```

### 3. Plugin READMEs (install instructions updated)

Each of the three plugin READMEs (`.claude/plugins/<name>/README.md`) must show:

```markdown
## Install

    /plugin marketplace add shawn-sandy/acss
    /plugin install <plugin-name>@acss-plugins

## Upgrading from a pre-git-subdir install (required for existing users)

    /plugin uninstall <plugin-name>
    /plugin marketplace update acss-plugins
    /plugin install <plugin-name>@acss-plugins
```

For `fpkit-developer/README.md`, add a deprecation notice at the top:

```markdown
> **DEPRECATED.** Use `acss-app-builder` instead. This plugin is retained for
> backwards compatibility with existing installs and will be removed in a
> future release.
```

### What changes vs current marketplace.json

| Change | Why |
|--------|-----|
| `source` string → `source` object with `source: "git-subdir"`, `url`, `path` | Triggers sparse clone; only plugin subdir transfers on install |
| Bump marketplace `version` 0.1.6 → 0.2.0 | Signals to users that catalog semantics changed |
| Remove per-plugin `version` field | Docs warn: for non-relative sources, `plugin.json` wins silently — setting it in both places causes confusion |
| Add `acss-app-builder` entry (listed first) | New plugin, supersedes fpkit-developer. Ordering steers new users toward it. |
| Add `acss-kit-builder` entry | New plugin for standalone component generation |
| Rewrite `fpkit-developer` description with `[DEPRECATED]` prefix + `deprecated` tag | Signal supersession without removing the plugin |
| `url: "https://github.com/shawn-sandy/acss.git"` (full HTTPS URL) | **Revised from shorthand during implementation.** Shorthand (`shawn-sandy/acss`) resolves to `git@github.com:...` (SSH) by default, which fails on machines without SSH keys configured. HTTPS works for any user with network access. |
| No `ref` / `sha` pinning | Tracks default branch; updates flow automatically on push to main |
| Move `version` / `description` to `metadata.*`, drop `$schema` | **Revised from "defer reshuffle" during implementation.** Validator rejects root-level `$schema`, `version`, `description` as unrecognized keys. Schema-correct form is mandatory, not optional. |

---

## Implementation Steps

These are the file edits only. All testing is documented in the next section.

1. **Rewrite `.claude-plugin/marketplace.json`** with the target JSON above.
2. **Update `.claude/plugins/fpkit-developer/.claude-plugin/plugin.json`** — prepend `[DEPRECATED — use acss-app-builder]` to the description.
3. **Update the three READMEs** (`.claude/plugins/<name>/README.md`) with the install + upgrade instructions shown in Target State. Add the deprecation banner to `fpkit-developer/README.md` only.
4. **Commit to a feature branch** — do NOT merge until Testing (Sections A–C below) passes.

---

## Testing

Testing has three distinct phases with different failure modes. A developer running these top-to-bottom can take the change from edit → merge with confidence.

### A. Local validation (pre-push, on the feature branch)

**Goal.** Catch JSON schema errors and confirm the marketplace catalog parses. This also exercises the full `git-subdir` sparse-clone path because the URL is a real public GitHub repo — the local-path marketplace only controls where the catalog is read from, not how plugin sources resolve.

**Implementation finding.** During this refactor we discovered that `git-subdir` sparse-clone **is** triggered by a local-path marketplace install, contrary to the initial assumption. The sparse clone pulls from whatever `url` is in `source` regardless of how the marketplace itself was registered. So local tests CAN verify the core claim of the refactor.

**URL gotcha.** Initially the plan used the GitHub shorthand `"url": "shawn-sandy/acss"`, assuming it would default to HTTPS. It does not — it resolves to `git@github.com:...` (SSH) and fails on machines without configured SSH keys. For public OSS distribution, **always use the full HTTPS URL** (`https://github.com/<owner>/<repo>.git`). This is already applied in the target JSON.

**Steps.**

1. **Lint JSON syntax and schema** from the repo root:

    ```bash
    claude plugin validate .
    ```

    Expected: `No validation errors.` or equivalent. If errors appear, fix before continuing.

2. **Remove any previous local registration of the marketplace** so step 3 starts clean:

    ```bash
    claude plugin marketplace remove acss-plugins   # no-op if not registered
    ```

3. **Register the marketplace from the working tree:**

    ```bash
    claude plugin marketplace add ./
    ```

    Expected: success message naming the marketplace `acss-plugins`.

4. **List the advertised plugins:**

    ```bash
    claude plugin marketplace list --json | jq '.[] | select(.name=="acss-plugins") | .plugins[].name'
    ```

    Expected: three lines — `acss-app-builder`, `acss-kit-builder`, `fpkit-developer`. Any missing name means the catalog is wrong.

5. **Inspect plugin descriptions** to confirm deprecation messaging is present:

    ```bash
    claude plugin marketplace list --json | jq '.[] | select(.name=="acss-plugins") | .plugins[] | select(.name=="fpkit-developer") | .description'
    ```

    Expected: string begins with `[DEPRECATED — use acss-app-builder]`.

6. **Clean up before the next phase** so feature-branch tests don't conflict:

    ```bash
    claude plugin marketplace remove acss-plugins
    ```

**Pass criteria for Section A.**
- Step 1 reports no errors.
- Step 4 lists all three plugins.
- Step 5 shows the deprecation prefix.

### B. Feature-branch install test (pre-merge, against the pushed branch)

**Goal.** Prove that `git-subdir` sparse-clones only the plugin subdirectory from the real remote. This is the critical gate. Anything short of a clean remote test leaves the core claim unverified.

**Prerequisites.**
- Feature branch pushed to `origin` (`git push -u origin <branch>`).
- A clean plugin cache (a different machine is ideal; otherwise wipe the local cache as below).

**Steps.**

1. **Wipe the plugin cache** to simulate a fresh user:

    ```bash
    claude plugin marketplace remove acss-plugins 2>/dev/null || true
    rm -rf ~/.claude/plugins/cache/acss-plugins
    rm -rf ~/.claude/plugins/marketplaces/acss-plugins
    ```

2. **Add the marketplace pinned to the feature branch** using the `@ref` suffix:

    ```bash
    claude plugin marketplace add shawn-sandy/acss@<feature-branch-name>
    ```

    > The `@<ref>` suffix pins the *marketplace source* (the thing that hosts `marketplace.json`) to the feature branch. Plugin sources still fetch from whatever ref is in `marketplace.json` (default branch, since we didn't pin). For end-to-end feature-branch testing, also pin each plugin source by temporarily adding `"ref": "<feature-branch-name>"` to each `source` object in `marketplace.json` on the feature branch only — revert before merging to main.

3. **Install each plugin:**

    ```bash
    claude plugin install acss-app-builder@acss-plugins
    claude plugin install acss-kit-builder@acss-plugins
    claude plugin install fpkit-developer@acss-plugins
    ```

    Expected: each install completes in seconds, not minutes. Long install = full-repo transfer = sparse-clone not working.

4. **Measure cache size per plugin:**

    ```bash
    du -sh ~/.claude/plugins/cache/acss-plugins/acss-app-builder/*/
    du -sh ~/.claude/plugins/cache/acss-plugins/acss-kit-builder/*/
    du -sh ~/.claude/plugins/cache/acss-plugins/fpkit-developer/*/
    ```

    Expected: each directory under ~10 MB. If any is hundreds of MB or comparable to the full repo size, sparse-clone is NOT working — STOP, do not merge.

5. **Inspect cache contents per plugin:**

    ```bash
    ls -la ~/.claude/plugins/cache/acss-plugins/acss-app-builder/*/
    ```

    Expected contents: `.claude-plugin/`, `commands/`, `skills/`, `agents/`, `README.md`, and whatever else the plugin ships. **Must NOT contain**: `packages/`, `apps/`, `openspec/`, `docs/`, `.storybook/`, `.github/`, or any other monorepo top-level directory. Any leak = sparse-clone failed.

6. **Run a plugin command to confirm runtime loading works:**

    - For `fpkit-developer`: invoke `/fpkit-developer:fpkit-dev` in Claude Code.
    - For `acss-app-builder` / `acss-kit-builder`: run any command each plugin exposes.

    Expected: the command loads and responds. A "plugin not found" or "command not found" error means the plugin directory structure is intact in the cache but something about paths or manifest is broken.

**Pass criteria for Section B.**
- All three installs complete quickly.
- All three cache directories are small (<10 MB each).
- Cache contents contain only plugin files, nothing from the rest of the monorepo.
- At least one command per plugin loads and runs.

### C. Upgrade-path test (pre-merge)

**Goal.** Confirm existing users who installed `fpkit-developer` via the old relative-path setup can get to the new state without a broken cache.

**Prerequisites.** A machine (or cache state) that currently has `fpkit-developer` installed from the pre-refactor marketplace. If none is available, simulate by checking out the commit before this refactor, installing, then switching back.

**Steps.**

1. **Verify the starting cache state** is the pre-refactor form (contains full monorepo):

    ```bash
    du -sh ~/.claude/plugins/cache/acss-plugins/fpkit-developer/*/
    ls ~/.claude/plugins/cache/acss-plugins/fpkit-developer/*/
    ```

    Expected starting state: large directory, contains `packages/`, `apps/`, etc.

2. **Run the documented upgrade command:**

    ```bash
    claude plugin marketplace update acss-plugins
    ```

3. **Re-inspect the cache:**

    ```bash
    du -sh ~/.claude/plugins/cache/acss-plugins/fpkit-developer/*/
    ls ~/.claude/plugins/cache/acss-plugins/fpkit-developer/*/
    ```

    - **Path A (cache refreshes cleanly):** directory is now small, subdir-only → the `update` command is sufficient. No user action beyond `update` needed.
    - **Path B (cache keeps stale files):** directory still contains monorepo content → document that users MUST run the reinstall recovery. Proceed to step 4 to confirm the recovery works.

4. **Test the reinstall recovery** (only if Path B):

    ```bash
    claude plugin uninstall fpkit-developer
    claude plugin marketplace update acss-plugins
    claude plugin install fpkit-developer@acss-plugins
    ```

    Re-inspect as in step 3 — cache should now be clean.

**Pass criteria for Section C.**
- Either Path A works (simplest case), or Path B fails cleanly and the documented recovery in Path B step 4 restores a good state.
- Whichever path applies, the README upgrade instructions already cover both cases.

### D. Post-merge smoke check (after merging to main)

Run once, on any machine, to confirm the default-branch path works:

1. **Wipe and reinstall from main:**

    ```bash
    claude plugin marketplace remove acss-plugins 2>/dev/null || true
    rm -rf ~/.claude/plugins/cache/acss-plugins ~/.claude/plugins/marketplaces/acss-plugins
    claude plugin marketplace add shawn-sandy/acss
    claude plugin install acss-app-builder@acss-plugins
    ```

2. **Confirm cache size and contents** per Section B steps 4–5. Same pass criteria.

3. **Confirm the deprecation notice is visible** when listing:

    ```bash
    claude plugin marketplace list --json | jq '.[] | select(.name=="acss-plugins") | .plugins[] | select(.name=="fpkit-developer") | .description'
    ```

    Expected: description still begins with `[DEPRECATED — use acss-app-builder]`.

---

## Files to modify

| Path | Action |
|------|--------|
| `.claude-plugin/marketplace.json` | Rewrite (all three plugin entries, bump marketplace version) |
| `.claude/plugins/fpkit-developer/.claude-plugin/plugin.json` | Edit (prepend `[DEPRECATED — use acss-app-builder]` to description) |
| `.claude/plugins/acss-app-builder/README.md` | Edit (install + upgrade instructions) |
| `.claude/plugins/acss-kit-builder/README.md` | Edit (install + upgrade instructions) |
| `.claude/plugins/fpkit-developer/README.md` | Edit (deprecation banner + install + upgrade instructions) |

No other files change.

---

## Next Steps (out of scope — flag for follow-up)

- **CI drift-guard**: add `claude plugin validate .` to the repo's CI so any future plugin added to `.claude/plugins/` without a matching marketplace entry is caught automatically. (This bug — two plugins present but not registered — produced the user-facing symptom in the first place. The validator would have caught both the missing plugins and the schema issues discovered during this implementation.)
- **Top-level `PLUGINS.md`**: consolidate install guidance (currently spread across three plugin READMEs) into one repo-level entry point. The `--sparse .claude-plugin` recommendation is already in each plugin's README.
- **Release tagging**: consider tagging future plugin releases (e.g., `acss-app-builder-v0.2.0`) so downstream users can pin via `source.ref`. Default-branch tracking is fine while plugins are still stabilizing.
- **Remove `fpkit-developer` entry** once `acss-app-builder` adoption is confirmed and telemetry/feedback shows no active fpkit-developer installs.

---

## Unresolved Questions

None.

---

## Interview Summary

This plan was stress-tested via `/plan-interview:plan-interview` on 2026-04-21. The summary below captures the decisions and risks surfaced.

### Key Decisions Confirmed

- **Deprecation applied in two places, not one**: `fpkit-developer/plugin.json` description gets the `[DEPRECATED]` prefix in addition to marketplace.json. Plugin.json can win silently when users inspect an installed plugin, so both sources must agree.
- **Feature-branch test before merge**: push the refactor to a branch, add the marketplace via `shawn-sandy/acss@<branch>`, verify sparse-clone fetches only the plugin subdirectory, then merge. Avoids a broken state on main.
- **Explicit upgrade-path coverage**: testing includes a dedicated section (Testing § C) that verifies existing `fpkit-developer` installs refresh cleanly. READMEs document the reinstall path (`uninstall → update → install`) required if `update` alone leaves stale files.
- **Full HTTPS URL** (revised from shorthand during implementation): `"url": "https://github.com/shawn-sandy/acss.git"`. The original decision was to use GitHub shorthand (`shawn-sandy/acss`), but shorthand resolves to `git@github.com:...` (SSH) and fails on machines without SSH keys configured. HTTPS works for any user with network access and is the only portable choice for public OSS distribution.
- **`metadata.*` reshuffle required, not deferred** (revised during implementation): the original decision was to defer moving root-level `version`/`description` into a `metadata` object so the git-subdir change could be bisected independently. The validator hard-rejects root-level `$schema`/`version`/`description` as unrecognized keys, making the reshuffle mandatory. The final file drops `$schema` (Claude Code doesn't recognize it — it was IDE hinting only) and nests `version`/`description` under `metadata`.

### Plan Naming

| Element | Before | Issue | After |
|---------|--------|-------|-------|
| Filename | `the-plugins-distribute-all-linked-dove.md` | Random worktree-name suffix, unrelated to content | `marketplace-git-subdir-refactor.md` (renamed) |
| H1 Heading | `# Plan: Switch marketplace plugin sources to \`git-subdir\` …` | Passes | (unchanged) |

### Open Risks & Concerns

- **Public-repo dependency**: plan implicitly requires `shawn-sandy/acss` to stay public on GitHub. Private repo would require users to set `GITHUB_TOKEN`. Noted in Context.
- **No CI guard against plugin-catalog drift**: nothing prevents a future plugin from being added to `.claude/plugins/` without being registered in marketplace.json — exactly the bug this plan partly fixes. Flagged as a Next Step.
- **~~Local testing cannot prove sparse-clone works~~** — Disproven during implementation. A local-path marketplace with a `git-subdir` source DOES trigger a real sparse partial clone from the URL. The refactor was verified end-to-end locally before any push.

### Recommended Next Steps (amendments folded in above)

1. Added step: update `fpkit-developer/plugin.json` description with `[DEPRECATED]` prefix.
2. Added explicit Testing section with three pre-merge phases (local validation, feature-branch install, upgrade-path) and a post-merge smoke check.
3. Moved README install/reinstall instructions into in-scope Implementation Steps and Target State.
4. Added private-repo risk note in Context.
5. Applied the required `metadata.*` reshuffle into the target JSON: dropped unsupported root-level `$schema` and moved `version`/`description` into `metadata.*` because `claude plugin validate .` requires that structure. (Originally planned to defer; validator forced it.)
6. Added CI drift-guard (`claude plugin validate .` in CI) to Next Steps.
7. (Added in this revision) Expanded Testing into Sections A–D with concrete commands, expected outputs, and pass criteria.
8. (Added after initial review) Switched plugin source URL from GitHub shorthand to full HTTPS URL because shorthand resolves to SSH and fails without configured keys.

### Simplification Opportunities

None. The plan is already minimal — no abstractions to remove, no layers to collapse. The required `metadata.*` reshuffle is already folded into the target state to satisfy validation, so there is no remaining scope reduction to apply there.
