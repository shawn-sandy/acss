# Fix: Astro site fails to launch in this worktree

## Context

The user cannot launch the Astro site at `apps/astro-builds/`. This is a **fresh git worktree** (`exciting-banach-9c1b25`) whose filesystem has never had `npm install` executed against it. Git worktrees share the `.git` directory with the main checkout but maintain their own working tree — `node_modules/` and build artifacts (like `packages/fpkit/libs/`) are **not** shared across worktrees.

### Root cause (verified)

- `./node_modules/` — **missing** (worktree root)
- `packages/fpkit/node_modules/` — **missing**
- `packages/fpkit/libs/` (the TS + CSS build output that `@fpkit/acss` `exports` points at) — **missing**
- `apps/astro-builds/node_modules/` — **missing** (no `astro` binary available)

For comparison, the primary checkout at `/Users/shawnsandy/devbox/acss/` has all of these populated. This confirms the issue is worktree-local setup, not repository state.

### Why the `predev` hook alone won't save us

[apps/astro-builds/package.json:7](apps/astro-builds/package.json:7) defines:

```
"ensure-fpkit-build": "test -f ../../packages/fpkit/libs/index.js && test -f ../../packages/fpkit/libs/tokens.json || npm --prefix ../../packages/fpkit run build",
"predev": "npm run ensure-fpkit-build"
```

The hook will auto-build fpkit **if** its deps are installed. But it cannot run at all until `astro-builds` itself has `node_modules/` (no npm cli scripts can run), and the auto-build it triggers will fail until `packages/fpkit/` also has its deps installed (tsup, sass, style-dictionary, etc. are devDependencies).

### Workspace topology

- Root [package.json](package.json) has no `"workspaces"` field — installs do NOT hoist across packages automatically.
- [lerna.json](lerna.json) lists `packages/*` and `apps/*` under `independent` versioning, but `useNx: false` and no `lerna bootstrap` is wired up.
- Therefore each package needs its own `npm install` in this worktree.

## Plan

### Step 1 — Install root deps

Run at worktree root: `npm install`

**Why:** installs husky, changesets, storybook tooling needed by any root-level lifecycle scripts (husky `prepare` script in root package.json). Also makes the root `node_modules/.bin` available.

### Step 2 — Install fpkit package deps

Run: `npm install --prefix packages/fpkit`

**Why:** [packages/fpkit/package.json:13](packages/fpkit/package.json:13) build script is `run-s package tokens:build sass build:sass build:css` — this requires `tsup`, `sass`, `style-dictionary`, `postcss`, `autoprefixer`, `npm-run-all` from its own devDependencies. Without these, the `predev` hook's auto-build will crash, and `@fpkit/acss/styles` (mapped to `libs/index.css`) and `@fpkit/acss/tokens` (mapped to `libs/tokens.json`) won't resolve when Astro tries to import them.

### Step 3 — Install astro-builds deps

Run: `npm install --prefix apps/astro-builds`

**Why:** installs `astro`, `@astrojs/react`, `react`, and resolves the `file:../../packages/fpkit` link. Without this, `npm run dev` has no `astro` binary and the predev hook cannot fire.

### Step 4 — Launch the dev server

Run: `npm run dev --prefix apps/astro-builds`

**Why:** the `predev` hook will verify `../../packages/fpkit/libs/index.js` and `libs/tokens.json` exist. Since step 2 installed fpkit deps but we haven't built yet, the hook will now auto-execute `npm --prefix ../../packages/fpkit run build`, producing `libs/`. Then `astro dev` starts on port 4321.

Expected success indicators:
- Terminal shows: `astro v5.x ready in Nms` and `Local: http://localhost:4321/`
- No `Cannot find package '@fpkit/acss'` error
- No `Failed to resolve entry for package "@fpkit/acss"` error

### Files involved (read-only reference)

- [apps/astro-builds/package.json](apps/astro-builds/package.json) — launch scripts and `predev` hook
- [apps/astro-builds/astro.config.mjs](apps/astro-builds/astro.config.mjs) — minimal config, only enables `@astrojs/react`
- [apps/astro-builds/src/layouts/Layout.astro](apps/astro-builds/src/layouts/Layout.astro) — imports `@fpkit/acss/styles` and `getThemeFoucScript()`
- [apps/astro-builds/src/components/SiteHeader.tsx](apps/astro-builds/src/components/SiteHeader.tsx) — imports `ThemeProvider`, `ThemeToggle` from `@fpkit/acss`
- [packages/fpkit/package.json](packages/fpkit/package.json) — `exports` map pointing to `libs/*` (lines 83–107)

**The original launch failure was caused by worktree-local environment setup**, not by a defect in the checked-in Astro/fpkit source. Any code or config changes in this PR (the Netlify config, the fpkit build-script reorder, the preview port wiring) are follow-up hardening that came out of the diagnosis, not the root cause of this specific failure.

## Verification

1. **Check build artifacts exist after step 2+4:**
   - `ls packages/fpkit/libs/index.js packages/fpkit/libs/index.css packages/fpkit/libs/tokens.json` should list all three.

2. **Check dev server responds:**
   - After step 4 starts the server, open `http://localhost:4321/` in a browser.
   - Verify the home page renders with fpkit-styled components (header, theme toggle).

3. **Check a fpkit-dependent page:**
   - Navigate to `/status` (the Phase 7A component maturity dashboard) and `/foundations/colors` (which imports `@fpkit/acss/tokens`) to confirm both the React island and the JSON tokens export resolve.

4. **No console errors:**
   - Open browser DevTools → Console. No module-resolution or 404 errors for fpkit styles/scripts.

## Follow-ups done in this session

- **Netlify deploy config**: created [apps/astro-builds/netlify.toml](apps/astro-builds/netlify.toml) with base dir, publish dir, Node version, and an install command that brings in both the app and fpkit's devDependencies (so the `prebuild`'s `ensure-fpkit-build` hook can actually build fpkit on Netlify).
- **fpkit build-order fix**: edited [packages/fpkit/package.json:13](packages/fpkit/package.json:13) — `build` script changed from `run-s tokens:build package sass build:sass build:css` to `run-s package tokens:build sass build:sass build:css`. Reason: `tsup` (invoked by `package`) has `clean: true` and wipes the entire `libs/` directory before emitting, which deleted the `libs/tokens.json` that `tokens:build` had just written. Consumers importing `@fpkit/acss/tokens` (e.g. [apps/astro-builds/src/pages/foundations/colors.astro](apps/astro-builds/src/pages/foundations/colors.astro)) would break on fresh builds. Verified: fresh `npm run build --prefix packages/fpkit` now produces all three artifacts (`libs/index.js`, `libs/index.css`, `libs/tokens.json`) with consistent timestamps.
- **preview_start port fix**: edited [.claude/launch.json](.claude/launch.json) to pass `-- --port 4327` through to astro so the preview MCP proxy can bind correctly.

## Commit plan

Single commit on branch `claude/exciting-banach-9c1b25` (not main/master).

**Files to stage (by name, not `-A`):**
- `.claude/launch.json`
- `apps/astro-builds/netlify.toml`
- `apps/astro-builds/package-lock.json`
- `packages/fpkit/package.json`
- `packages/fpkit/package-lock.json`
- `docs/planning/fix-issue-launching-astro-vectorized-stearns.md`

**Files intentionally NOT staged:**
- `.claude/scheduled_tasks.lock` — runtime lock file, ephemeral.

**Commit message (conventional, multi-line body):**
```
fix(astro-builds): enable Netlify deploy and fix fpkit build order

- Add apps/astro-builds/netlify.toml so the Astro site can deploy as a
  separate Netlify project alongside the existing Storybook site.
- Reorder packages/fpkit build script so tsup's clean step runs before
  style-dictionary writes libs/tokens.json. Previously, libs/tokens.json
  was deleted by tsup on every fresh build, breaking consumers that
  import @fpkit/acss/tokens (e.g. /foundations/colors).
- Pass --port through to astro dev via .claude/launch.json so the
  preview MCP proxy binds correctly.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

**Will NOT push** (user did not ask). Branch `claude/exciting-banach-9c1b25` tracks `origin/main`; pushing stays a follow-up.
