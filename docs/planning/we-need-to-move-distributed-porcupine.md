# Plan: Move Marketplace and Plugins to a New Repository

## Context

Claude Code plugin marketplaces are distributed by cloning the repo they live in. Today, any user running `/plugin marketplace add shawn-sandy/acss` pulls down the entire fpkit library — roughly **14 MB and 911 files** — just to get ~86 plugin files (~573 KB). The npm package `@fpkit/acss` is already clean (`packages/fpkit/package.json` "files" field excludes `.claude/`), so this is strictly about the **git-based marketplace install footprint**, not npm.

We also want the new plugin repo to reference the current `shawn-sandy/acss` repo for ongoing plugin development — e.g., `acss-kit-builder` generates components that must match live fpkit patterns, so plugin authors need access to the real source during development.

**Outcome targets**
- Fresh marketplace install drops from ~14 MB → ~600 KB
- Plugin development continues with clear cross-repo conventions
- No existing user breaks on their next `/plugin marketplace update`

## Decisions (confirmed with user)

| Decision | Choice |
|---|---|
| New repo name | `shawn-sandy/acss-plugins` |
| Layout | Option A — plugins at repo root |
| Git history | Preserve via `git filter-repo` |
| Backward compatibility | Transparent redirect (rewrite `acss` marketplace.json to point at new repo) |
| Bidirectional reference | Full GitHub URLs in plugin docs (no sibling-clone dependency) |
| Cleanup scope | Delete `.claude/plugins/` and root stale zips only; keep standalone skill, `downloads/`, and historical planning docs |

## Execution status (as of 2026-04-21)

**✅ Phase 1 complete** — commit `f3a4c31` on `claude/move-marketplace-plugins-repo-8kXL9`, pushed to origin:
- All three plugins registered in `/home/user/acss/.claude-plugin/marketplace.json`
- Plugin versions bumped (`fpkit-developer` 0.1.7, `acss-kit-builder` 0.1.1, `acss-app-builder` 0.1.1)
- `fpkit-developer/README.md` and `acss-kit-builder/README.md` install instructions rewritten for `shawn-sandy/acss-plugins`
- SKILL.md + reference docs repo-relative paths rewritten to full GitHub URLs

**✅ Phase 0 step 3b (schema verification) complete** — docs confirm `git-subdir` source type supports subdirectory targeting with sparse clone. Transparent-redirect strategy validated.

**🟡 Phase 2 partially complete** — local extraction to `/tmp/acss-plugins-extract` done, ready for push once remote repo exists:
- `git-filter-repo` installed at `~/.local/bin/git-filter-repo`
- `git clone --no-local /home/user/acss /tmp/acss-plugins-extract` done
- Filter applied: 62 commits → 7 commits (just the plugin-touching ones), paths renamed to root
- Pre-push checkpoint passed: 91 files, 9 root entries, all source paths rewritten to `./<name>`, all 3 plugin.json manifests intact
- Scaffolding files added and staged (not yet committed — the commit-signing server in this sandbox rejects commits from `/tmp/` paths): `README.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`, updated `marketplace.json`
- Current branch in extract: `claude/move-marketplace-plugins-repo-8kXL9` (needs rename to `main`)
- **Scaffolding files preserved in tree** at `docs/planning/acss-plugins-scaffolding/` so the user can re-run extraction on their own laptop without losing the prepared content. See `docs/planning/acss-plugins-scaffolding/HANDOFF.md` for the step-by-step laptop workflow.

### Handoff: to finish Phase 2

**Recommended path** — re-run the extraction on the user's laptop using the deterministic commands and scaffolding files stored in `docs/planning/acss-plugins-scaffolding/`. Full instructions in `docs/planning/acss-plugins-scaffolding/HANDOFF.md`. This works regardless of sandbox lifecycle.

**Sandbox-resident path** (only valid while `/tmp/acss-plugins-extract` survives) — run these on a machine where commit signing works:

```bash
# 1. Create the remote repo at github.com/shawn-sandy/acss-plugins (empty, no README/LICENSE)

# 2. Commit the staged scaffolding
cd /tmp/acss-plugins-extract
git status    # should show 5 staged files ready
git commit -m "$(cat <<'EOF'
chore: initial standalone-repo scaffolding

Added after git filter-repo extraction from shawn-sandy/acss:
- README.md, CONTRIBUTING.md, LICENSE, .gitignore (top-level)
- Rewrote marketplace.json source paths from ./.claude/plugins/<name>
  to ./<name> to match the new flat repo layout.
- Bumped marketplace version to 0.2.0.
- Removed redundant per-plugin version fields from marketplace.json
  (plugin.json always wins silently per Claude Code docs).
- Updated owner.url to this repo's URL.
EOF
)"

# 3. Rename branch to main and set up remote
git branch -m claude/move-marketplace-plugins-repo-8kXL9 main
git remote add origin https://github.com/shawn-sandy/acss-plugins.git
git push -u origin main
```

Once `shawn-sandy/acss-plugins` is live, proceed to Phase 3 in the main acss repo.

## Stress-test findings (incorporated into plan below)

Gaps and assumptions caught during review; each maps to a concrete plan change:

| # | Finding | Where it's addressed |
|---|---|---|
| 1 | "Sibling-clone" wasn't an existing convention — no script does this | **Round 2 resolution**: dropped the sibling-clone prescription. All fpkit references in plugin docs are rewritten to full GitHub URLs (Phase 1 step 6a), removing any runtime dependency on a local fpkit checkout. CONTRIBUTING.md documents *how* references work, not a required workflow |
| 2 | SKILL.md files reference `packages/fpkit/src/...` which won't exist in new repo | New Phase 1 step 6a: rewrite repo-relative paths to full `github.com/shawn-sandy/acss/...` URLs before extraction |
| 3 | `README.md` has no existing plugin section | Phase 3 step 16: *add* a plugins section (not "update if present") |
| 4 | `git filter-repo` drops root `.gitignore` | Phase 2 step 12a: recreate `.gitignore` explicitly |
| 5 | Marketplace name collision (`"name": "acss-plugins"` in both repos) is unverified | Phase 0 step 3a: verify Claude Code keys marketplaces by repo slug, not `name` field |
| 6 | Double-subscription UX unspecified | Phase 0 step 3a test also covers this |
| 7 | Git-URL `source` object form schema support unverified — linchpin risk | Phase 0 step 3b: fetch and check the marketplace schema; if unsupported, switch to hard-cutover fallback before Phase 1 begins |
| 8 | No pre-push verification in Phase 2 | Phase 2 step 12b: file-count check and spot-check before `git push` |
| 9 | Plugin-level `plugin.json` versions not bumped → `/plugin update` may no-op | Phase 1 step 7a: bump each `plugin.json` patch version |
| 10 | Openspec not used for discoverability | Out of scope — plan-mode scaffold directs to `docs/planning/`; noted for post-merge follow-up |
| **Second round** | | |
| 11 | `find . -type f \| wc -l` in Phase 2 verification would count `.git/` internals (thousands) — false safety | Fixed in step 12b: now uses `-not -path './.git/*'` |
| 12 | Phase 4 never tested the "existing subscriber" scenario — the exact population the redirect serves | Fixed in step 20: split into Scenario A (fresh) and Scenario B (existing subscriber) |
| 13 | `source` object JSON shape was committed to speculatively before Phase 0 step 3b verifies the schema | Fixed in step 14: illustrative example marked TBD pending schema verification |
| 14 | CLAUDE.md edit landed in a section where there's nothing to update | Fixed in step 16: new `## Plugins` section between Plans and Publishing |
| 15 | Internal contradiction — hardened plan prescribed both URL rewrites and sibling-clone convention | Fixed: dropped sibling-clone; CONTRIBUTING.md now describes the URL-based reference scheme only |
| 16 | CC version compatibility of git-URL `source` objects unexamined | Added to Risks table; Phase 0 step 3b now also captures the minimum CC version |
| 17 | `marketplace.json.version` bump assumed to force re-clone; actually may be cosmetic | Added to Risks table; plan relies on plugin-level version bumps for re-fetch, not marketplace version |
| 18 | `validate_css_vars.py` duplication across plugins preserved by migration | Added to Risks table as out-of-scope follow-up |
| 19 | Users who never run `/plugin marketplace update` stay on stale cache | Added to Risks table as accepted; README post-migration note suggests running update once |

## Scope

### What gets moved to `shawn-sandy/acss-plugins`
- `/home/user/acss/.claude-plugin/marketplace.json` (then path-rewritten)
- `/home/user/acss/.claude/plugins/acss-app-builder/` (48 files)
- `/home/user/acss/.claude/plugins/acss-kit-builder/` (25 files)
- `/home/user/acss/.claude/plugins/fpkit-developer/` (13 files, still in deprecation window)

### What stays in `shawn-sandy/acss`
- A **redirect** `.claude-plugin/marketplace.json` (same plugin names, git-URL `source` fields pointing at `shawn-sandy/acss-plugins`)
- `.claude/skills/fpkit-developer/` — separate standalone project-local skill (11 files)
- `downloads/fpkit-developer/` — historical release zips
- All `docs/planning/` historical plugin docs (unchanged)

### What gets deleted
- `/home/user/acss/.claude/plugins/` (entire directory after migration)
- `/home/user/acss/fpkit-developer.zip` (~50 KB, stale at root)
- `/home/user/acss/fpkit-component-builder.zip` (~127 KB, stale at root)

## Target repo layout

```
acss-plugins/
├── .claude-plugin/marketplace.json    # paths rewritten: ./acss-app-builder, etc.
├── acss-app-builder/
├── acss-kit-builder/
├── fpkit-developer/                    # removed after one release cycle
├── README.md                           # overview + link back to shawn-sandy/acss
├── CONTRIBUTING.md                     # sibling-clone dev workflow
├── LICENSE                             # MIT, matches existing plugin manifests
└── .gitignore
```

## Execution order

### Phase 0 — User prerequisites (manual)

**User must do these before the implementation starts** — GitHub MCP tools here are scoped to `shawn-sandy/acss` and cannot create repos in other namespaces:

1. Create empty repo `github.com/shawn-sandy/acss-plugins` (no README, no license — keep history clean for import).
2. Install `git-filter-repo`: `pip install git-filter-repo`.
3. Confirm working tree clean: `git status` in `/home/user/acss`.
3a. **Marketplace keying + double-subscribe smoke test** (resolves stress-test findings #5, #6): in a disposable Claude Code session, `/plugin marketplace add shawn-sandy/acss`, then manually add a second marketplace with the same internal `name` field (e.g., a temporary fork) and run `/plugin marketplace list`. Confirm Claude Code keys by repo slug, not `name`. If it keys by `name`, abandon the transparent-redirect strategy and fall back to hard cutover.
3b. **Marketplace schema verification** — **✅ RESOLVED on 2026-04-21** (stress-test finding #7). Docs at <https://code.claude.com/docs/en/plugin-marketplaces#plugin-sources> confirm five `source` types. For the redirect strategy the correct type is **`git-subdir`**, not `github`:
    ```json
    "source": {
      "source": "git-subdir",
      "url": "https://github.com/shawn-sandy/acss-plugins.git",
      "path": "acss-app-builder"
    }
    ```
    `git-subdir` "clones sparsely to minimize bandwidth for monorepos" — so users of the redirect stub automatically get the ~600 KB sparse clone instead of full-repo download. The install-size goal is achieved for existing users even without re-adding the new marketplace.
3c. **Version field placement** (new, from schema docs): the docs warn "The plugin manifest always wins silently…For relative-path plugins, set the version in the marketplace entry. For all other plugin sources, set it in the plugin manifest." Accordingly:
    - New repo (`acss-plugins`, relative-path sources): version belongs in **marketplace entry only**, remove from individual `plugin.json` files
    - acss redirect stub (`git-subdir` sources): version belongs in **plugin.json only**, remove from marketplace entry
    - Phase 1's commit currently has versions in both — non-breaking but violates the docs. Phase 2/3 edits must correct this.

### Phase 1 — Prepare plugin files for extraction (in `/home/user/acss` on branch `claude/move-marketplace-plugins-repo-8kXL9`)

4. Edit `/home/user/acss/.claude/plugins/fpkit-developer/README.md`:
   - Lines 49–50: change `shawn-sandy/acss` → `shawn-sandy/acss-plugins`
   - Lines 56, 64, 70: change marketplace suffix `@shawn-sandy-acss` → `@shawn-sandy-acss-plugins`
   - Lines 79–94: rewrite manual-clone instructions to clone `acss-plugins` instead of `acss`
5. Edit `/home/user/acss/.claude/plugins/acss-kit-builder/README.md` (lines 26–31): rewrite "lives at `.claude/plugins/acss-kit-builder/` in this repository" for standalone-repo context.
6. Edit `/home/user/acss/.claude/plugins/acss-app-builder/README.md`: spot-check the `../acss-kit-builder/` relative link on line 8 — still resolves under Option A layout, no change needed.
6a. **Rewrite repo-relative fpkit references in SKILL.md files** (resolves stress-test findings #1, #2) so they remain clickable and accurate from the new repo:
    - `/home/user/acss/.claude/plugins/acss-app-builder/skills/acss-app-builder/SKILL.md` lines 94, 209: replace `packages/fpkit/src/index.ts` with `https://github.com/shawn-sandy/acss/blob/main/packages/fpkit/src/index.ts`
    - `/home/user/acss/.claude/plugins/acss-app-builder/skills/acss-app-builder/references/component-source.md` line 42: same treatment
    - `/home/user/acss/.claude/plugins/acss-app-builder/skills/acss-app-builder/references/forms.md` line 5: rewrite `packages/fpkit/src/components/form/fields.tsx` to full GitHub URL
    - `/home/user/acss/.claude/plugins/acss-app-builder/assets/forms/field-renderers.tsx` line 6 (comment): same
    - Sweep all `skills/**/*.md` files in all three plugins for further `packages/fpkit/` mentions and rewrite to full URLs
7. Edit `/home/user/acss/.claude-plugin/marketplace.json`: add all three plugins to the `plugins` array (currently only `fpkit-developer`). This pre-extract state becomes the seed for the new repo's manifest.
7a. **Bump individual plugin versions in plugin.json ONLY** (resolves stress-test finding #9) so `/plugin update` detects a change after the redirect lands.
    - `/home/user/acss/.claude/plugins/fpkit-developer/.claude-plugin/plugin.json`: 0.1.6 → 0.1.7
    - `/home/user/acss/.claude/plugins/acss-kit-builder/.claude-plugin/plugin.json`: 0.1.0 → 0.1.1
    - `/home/user/acss/.claude/plugins/acss-app-builder/.claude-plugin/plugin.json`: 0.1.0 → 0.1.1
    - **Do NOT mirror version into `marketplace.json` entries.** The Claude Code docs warn: *"The plugin manifest always wins silently. For relative-path plugins, set the version in the marketplace entry. For all other plugin sources, set it in the plugin manifest."* Since the redirect uses `git-subdir` (not relative paths), plugin.json is the authoritative source. Also remove the stale `"version": "0.1.6"` that currently sits inside the `fpkit-developer` marketplace entry when rewriting marketplace.json in step 7 — it's the dual-version anti-pattern the docs flag.
8. Commit: `chore(plugins): prepare READMEs, paths, and manifests for extraction`.

### Phase 2 — Extract plugins into the new repo

9. Clone a mirror to a temp location (never filter-repo the working clone):
   ```bash
   git clone --no-local /home/user/acss /tmp/acss-plugins-extract
   cd /tmp/acss-plugins-extract
   ```
10. Run `git filter-repo` with paths and renames:
    ```bash
    git filter-repo \
      --path .claude-plugin/ \
      --path .claude/plugins/acss-app-builder/ \
      --path .claude/plugins/acss-kit-builder/ \
      --path .claude/plugins/fpkit-developer/ \
      --path-rename .claude/plugins/acss-app-builder/:acss-app-builder/ \
      --path-rename .claude/plugins/acss-kit-builder/:acss-kit-builder/ \
      --path-rename .claude/plugins/fpkit-developer/:fpkit-developer/
    ```
11. Edit `.claude-plugin/marketplace.json` in the extracted repo: change each plugin's `source` from `./.claude/plugins/<name>` to `./<name>`. Bump version to `0.2.0`.
12. Add new top-level files:
    - `README.md` — short overview, install instructions, link to `shawn-sandy/acss` for ongoing fpkit development
    - `CONTRIBUTING.md` — short doc explaining that fpkit source references in plugin skills use full GitHub URLs pointing at `shawn-sandy/acss`. No sibling clone is required to follow them. If a contributor wants a local fpkit checkout for deep development, they can clone `shawn-sandy/acss` anywhere (sibling is one convenient choice, not a requirement).
    - `LICENSE` — MIT, matching existing plugin manifests
12a. **Recreate `.gitignore`** (resolves stress-test finding #4, since `git filter-repo` dropped the original): `node_modules/`, `.DS_Store`, `*.log`, `.env*`
12b. **Pre-push verification checkpoint** (resolves stress-test finding #8): before pushing, in `/tmp/acss-plugins-extract`:
    - `find . -type f -not -path './.git/*' | wc -l` → expect ~90 files (86 plugin files + ~4 new top-level files). Halt and investigate if the count differs by more than 5. (The `-not -path './.git/*'` filter is essential — without it, the count includes thousands of git internals and the check is meaningless.)
    - `ls` at repo root → expect exactly: `.claude-plugin/`, `acss-app-builder/`, `acss-kit-builder/`, `fpkit-developer/`, `README.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`, `.git/`. Any leftover directories (e.g., a stray `.claude/`) mean `git filter-repo` missed a rename.
    - `cat .claude-plugin/marketplace.json` → confirm all three plugins present and each `source` starts with `./` (not `./.claude/plugins/`).
    - Spot-check one plugin manifest: `cat acss-app-builder/.claude-plugin/plugin.json` → confirm intact JSON with the bumped version from Phase 1 step 7a.
13. Set remote and push:
    ```bash
    git remote add origin https://github.com/shawn-sandy/acss-plugins.git
    git push -u origin main
    ```

### Phase 3 — Rewrite the acss repo as a redirect stub

Back in `/home/user/acss` on branch `claude/move-marketplace-plugins-repo-8kXL9`:

14. Rewrite `/home/user/acss/.claude-plugin/marketplace.json`:
    - Keep `name: "acss-plugins"`, bump `version` to `0.2.0`
    - Keep all three plugin entries
    - Change each `source` from relative path → `git-subdir` object form (**verified against https://code.claude.com/docs/en/plugin-marketplaces**):
      ```json
      "source": {
        "source": "git-subdir",
        "url": "https://github.com/shawn-sandy/acss-plugins.git",
        "path": "acss-app-builder"
      }
      ```
      Why `git-subdir` and not `github`: the `github` source type assumes the whole repo is one plugin — no `path` field. `git-subdir` is purpose-built for multi-plugin monorepos and clones sparsely, minimizing bandwidth.
    - **Remove `version` from each plugin entry** in this redirect stub — per Phase 0 step 3c, non-relative-path sources take version from `plugin.json`, and setting both causes the marketplace entry to be silently ignored.
    - Add a `description` line noting the move: "Plugins now live at shawn-sandy/acss-plugins; this marketplace redirects automatically."
15. Delete:
    - `/home/user/acss/.claude/plugins/` (entire tree — `rm -rf`)
    - `/home/user/acss/fpkit-developer.zip`
    - `/home/user/acss/fpkit-component-builder.zip`
16. Update cross-references:
    - `/home/user/acss/docs/acss-kit-builder-tutorial.md` — rewrite any `.claude/plugins/acss-kit-builder/` paths to `github.com/shawn-sandy/acss-plugins/tree/main/acss-kit-builder/`
    - `/home/user/acss/openspec/plans/acss-kit-builder-skill.md` — same treatment
    - `/home/user/acss/packages/fpkit/src/docs/fpkit-developer.mdx` (if present) — update install instructions
    - `/home/user/acss/README.md` — *add* a new "Claude Code plugins" section below the "Design system" section (README currently has no plugin mention at all; resolves stress-test finding #3). One paragraph: name the three plugins, point to `shawn-sandy/acss-plugins`.
    - `/home/user/acss/CLAUDE.md` — add a new short section (heading `## Plugins`) between "Plans" and "Publishing", since the existing Project Structure tree does not list `.claude/plugins/` and the Plans section is about planning docs. Content: one paragraph naming `shawn-sandy/acss-plugins` as the new home, note that the marketplace here now redirects, and list the three plugin names.
17. Commit: `refactor(plugins): extract to shawn-sandy/acss-plugins with redirect stub`.
18. Push branch: `git push -u origin claude/move-marketplace-plugins-repo-8kXL9`.

### Phase 4 — Verification

19. **Marketplace install works from new repo**, in a fresh Claude Code session:
    ```
    /plugin marketplace add shawn-sandy/acss-plugins
    /plugin install acss-app-builder@shawn-sandy-acss-plugins
    ```
    Confirm `/app-init` slash command appears.
20. **Redirect stub works from old repo** (two scenarios — the second is the one that matters most):
    - **Scenario A — fresh subscriber**: In a clean session, run `/plugin marketplace add shawn-sandy/acss` then `/plugin install fpkit-developer@shawn-sandy-acss`. Confirm `/fpkit-developer:fpkit-dev` appears and plugin files match new-repo content (spot-check a file's size or checksum).
    - **Scenario B — existing subscriber (critical)**: Simulate a user who already had `shawn-sandy/acss` subscribed *before* the migration. Easiest reproduction: check out the branch point *before* Phase 3, subscribe (`/plugin marketplace add shawn-sandy/acss`), then check out the migrated state and run only `/plugin marketplace update shawn-sandy-acss`. No `remove` + re-`add`. Confirm the update succeeds, the local cache shrinks to ~600 KB, and `/plugin install fpkit-developer@shawn-sandy-acss` still resolves. This is the scenario the entire redirect strategy exists to serve.
21. **acss main repo unaffected**:
    ```
    npm install && npm run lint
    npm run build --workspace=@fpkit/acss
    npm start                              # storybook still opens on :6006
    ```
22. **Plugin dev flow works**:
    - Clone both repos as siblings: `~/work/acss` and `~/work/acss-plugins`
    - From `~/work/acss-plugins`, confirm any plugin validation script can resolve `../acss/packages/fpkit/src/index.ts`
23. **Install footprint measurement** (the core outcome target):
    ```bash
    du -sh ~/.config/claude/marketplaces/shawn-sandy-acss-plugins/
    ```
    Expected: ~600 KB (vs. previous ~14 MB for `shawn-sandy/acss`).

### Phase 5 — Post-release followup (separate change, after one release cycle)

24. Delete `/home/user/acss/.claude-plugin/marketplace.json` and the now-empty `.claude-plugin/` directory.
25. Remove `fpkit-developer` from `acss-plugins/.claude-plugin/marketplace.json` once its deprecation window closes.

## Critical files

### Must be edited in `/home/user/acss` (this branch)
- `/home/user/acss/.claude/plugins/fpkit-developer/README.md` — install-instruction rewrite (Phase 1)
- `/home/user/acss/.claude/plugins/acss-kit-builder/README.md` — standalone-repo context (Phase 1)
- `/home/user/acss/.claude-plugin/marketplace.json` — twice: Phase 1 (add all plugins) and Phase 3 (convert to redirect)
- `/home/user/acss/docs/acss-kit-builder-tutorial.md` — path rewrites (Phase 3)
- `/home/user/acss/openspec/plans/acss-kit-builder-skill.md` — path rewrites (Phase 3)
- `/home/user/acss/README.md` — plugin link update (Phase 3)
- `/home/user/acss/CLAUDE.md` — marker note under Plans (Phase 3)

### Must be created in new repo
- `acss-plugins/README.md` (new)
- `acss-plugins/CONTRIBUTING.md` (new — sibling-clone workflow doc)
- `acss-plugins/LICENSE` (new — MIT)
- `acss-plugins/.gitignore` (new)

### Existing utilities/conventions to reuse
- **Marketplace schema**: `https://anthropic.com/claude-code/marketplace.schema.json` (already referenced in current `marketplace.json`)
- **Existing plugin manifests** at `.claude/plugins/*/.claude-plugin/plugin.json` — these need no changes; they get carried into the new repo by `git filter-repo` as-is
- **CLAUDE.md Plans convention** — plans live in `.claude/plans/` or `openspec/plans/`; this plan lives in `docs/planning/` per the plan-mode scaffold
- **Branch convention**: all work on `claude/move-marketplace-plugins-repo-8kXL9`; push with `git push -u origin <branch>`

## Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| `git filter-repo` not installed | Low | Phase 0 step 2 calls it out; fallback is clean copy with no history |
| **Marketplace schema doesn't accept git-URL `source` objects** (stress-test #7) | **High — blocks redirect strategy** | Phase 0 step 3b verifies the schema up front; if unsupported, halt and switch to hard cutover *before* any other work |
| Marketplace keying by `name` field could cause old+new to collide (stress-test #5) | Medium | Phase 0 step 3a smoke-tests this in a disposable Claude Code session |
| Double-subscribed users see duplicate plugins (stress-test #6) | Low | Same smoke test resolves it; README note instructs users to `/plugin marketplace remove shawn-sandy-acss` if they see duplicates |
| `git filter-repo` drops root `.gitignore` (stress-test #4) | Low | Phase 2 step 12a explicitly recreates it |
| SKILL.md files reference paths that don't exist in new repo (stress-test #2) | Medium — silent breakage for plugin authors browsing the new repo | Phase 1 step 6a rewrites to full GitHub URLs |
| `/plugin update` no-ops after redirect because plugin.json versions unchanged (stress-test #9) | Medium | Phase 1 step 7a bumps each plugin's patch version |
| Typo in `git filter-repo --path-rename` ships wrong tree as first commit to remote (stress-test #8) | Medium | Phase 2 step 12b adds file-count + spot-check gate before `git push` |
| Existing users on old marketplace see stale plugin files cached | Low | `/plugin marketplace update` re-fetches; marketplace.json version bump to `0.2.0` plus individual plugin version bumps force this |
| Relative cross-link `../acss-kit-builder/` in acss-app-builder README breaks | Low | Option A preserves sibling layout, so this link still resolves |
| User accidentally publishes to the wrong remote | Low | Phase 2 uses an explicit `/tmp/` clone; the working clone at `/home/user/acss` is never filter-repo'd |
| Git-URL `source` objects may be gated on a recent Claude Code version | Medium | During Phase 0 step 3b, note which CC version introduced this schema form. If it's newer than the acss-app-builder `claudeCodeMinVersion: 1.0.33`, add the newer minimum to the redirect `marketplace.json` and mention the bump in the new README so users on older CC know to upgrade |
| `marketplace.json.version` bump (0.1.6 → 0.2.0) may be cosmetic rather than cache-invalidating | Low | The *plugin-level* version bumps in step 7a are doing the real re-fetch work. The marketplace version bump is documentation; do not rely on it to force client updates |
| `validate_css_vars.py` is duplicated across `fpkit-developer` and `acss-app-builder` and the duplication carries into the new repo | Low — out of scope | Flag as a follow-up; consolidating into a shared location would further reduce install footprint but is orthogonal to this migration |
| User never runs `/plugin marketplace update` after migration → stays on stale local cache indefinitely | Low | Acceptable: Claude Code only reads remote state on explicit update. The README in `shawn-sandy/acss` should suggest running `/plugin marketplace update shawn-sandy-acss` once post-migration |

## Out of scope (for a later PR)

- Deleting the standalone skill at `/home/user/acss/.claude/skills/fpkit-developer/` — kept for project-local use
- Cleaning out `/home/user/acss/downloads/fpkit-developer/` historical release zips — move to GitHub Releases separately
- Removing the redirect stub from `acss` — scheduled for Phase 5 (next release cycle)
- Updating historical `docs/planning/*.md` docs that mention plugins — left as historical record
