# Plan: Create npm-monorepo-publish Skill

## Objective
Create npm publishing skill for @fpkit/acss monorepo with release branch workflow (branch → version → PR → merge → publish).

## Context
- **Monorepo:** Lerna 8.1.9 with independent versioning + conventional commits
- **Current package:** @fpkit/acss v6.1.0 (public on npm)
- **Workflow:** Release branch required for all publishes (never publish from main directly)
- **Target:** `.claude/skills/npm-monorepo-publish/SKILL.md`

## Implementation Steps

### 1. Create SKILL.md with Frontmatter
**File:** `.claude/skills/npm-monorepo-publish/SKILL.md`

**Structure:**
- YAML frontmatter (name, description, version)
- Purpose section
- **Single workflow:** Release Branch → PR → Publish (8 steps)
- Dry-run mode (`--dry-run` flag)
- Safety checks
- OTP/2FA handling
- Troubleshooting & rollback

### 2. Workflow: Release Branch Publishing (8 Steps)
**Philosophy:** All publishes go through release branch + PR review before publishing to npm.

#### Step 1: Pre-flight Checks
- Verify on `main` branch
- Check clean working tree (no uncommitted changes)
- Validate Node >= 22.12.0, npm >= 8.0.0
- Verify package.json fields (name, version, files, exports, publishConfig)

#### Step 2: Version Validation & Review
- Check current version vs npm registry
- Verify version doesn't already exist on npm
- Show commits since last tag: `git log $(git describe --tags --abbrev=0)..HEAD`
- Ask version bump type (patch/minor/major) OR auto-determine from conventional commits
- **CRITICAL:** If major version, block and require explicit approval with warning

#### Step 3: Pre-publish Build & Test
- Run build: `cd packages/fpkit && npm run build`
- Verify build output exists in `libs/`
- Run lint: `npm run lint`
- Run tests: `npm test`
- **If any fail:** Abort and show errors

#### Step 4: Create Release Branch
- Determine next version (from user input or conventional commits)
- Branch naming: `release/v{next-version}` (e.g., `release/v6.2.0`)
- Create from `main`: `git checkout -b release/v{version}`

#### Step 5: Version Bump (No Publish Yet)
- Use Lerna to bump version: `lerna version {patch|minor|major} --no-push --no-git-tag-version`
- Or manual: update package.json version field
- Commit version changes: `git commit -am "chore(release): bump version to {version}"`
- **Note:** No git tag created yet, no npm publish yet

#### Step 6: Update CHANGELOG
- Check if Lerna auto-generated CHANGELOG via conventional commits
- If not auto-generated, manually add version entry with date
- Format: `## [{version}] - {YYYY-MM-DD}`
- List changes from commits since last tag
- Commit changelog: `git commit -am "docs: update CHANGELOG for v{version}"`

#### Step 7: Push & Create PR
- Push release branch: `git push -u origin release/v{version}`
- Create PR: `gh pr create --title "chore(release): publish @fpkit/acss@{version}" --body "{changelog excerpt}"`
- **Prompt user:** "PR created. Please review and merge when ready."
- **Wait for user confirmation** that PR is merged

#### Step 8: Publish After PR Merged
- Switch to main: `git checkout main`
- Pull latest: `git pull origin main`
- Publish to npm: `lerna publish from-package --yes`
  - Uses version from package.json
  - Creates git tag
  - Publishes to npm
  - Auto-handles OTP if 2FA enabled
- Push tags: `git push --follow-tags`
- Delete release branch: `git branch -d release/v{version}` and `git push origin --delete release/v{version}`
- Post-publish verification (check npm registry)
- Show npm package URL

### 3. Dry-Run Mode
**Flag:** `--dry-run`

- Runs Steps 1-3 (checks, validation, build & test)
- Shows version that WOULD be bumped to
- Lists files that WOULD be published (via `npm pack --dry-run`)
- Shows what WOULD happen (branch creation, PR creation) without doing it
- Exits without creating branch or publishing

### 4. Safety Checks

**Pre-publish Blockers:**
- Uncommitted changes → abort
- Not on `main` branch at start → abort
- Build/lint/test failures → abort
- Node/npm version mismatch → abort

**Major Version Protection:**
- Detect X.0.0 bumps
- Show breaking changes warning
- Require explicit `--allow-major` flag OR interactive confirmation
- Suggest creating migration guide

**Registry Validation:**
- Check version doesn't exist: `npm view @fpkit/acss@{version}` (should 404)
- Verify package name available (new packages only)

### 6. OTP/2FA Handling
- Lerna auto-prompts for OTP when needed
- If OTP fails: guide user to generate new code
- Alternative: pass `--otp=123456` flag to `lerna publish`
- Detect OTP errors and provide retry guidance

### 5. Best Practices Included
- **Always use release branches** (never publish from `main` directly)
- **Never reset/force-push main** - Always fix forward with new PRs
- Version bump on branch, publish after PR merge (safe rollback if needed)
- Leverage conventional commits for auto-changelog (already configured)
- Fail fast: validate and test BEFORE creating branch
- Review changes in PR before publishing to npm (irreversible)
- Keep publishConfig.access=public in package.json
- Use `lerna publish from-package` after merge (publishes committed version)
- If issues after merge: create corrective PR, never undo merges

### 8. Rollback Guidance

**IMPORTANT: Never use `git reset` or force push on main branch. Always fix forward with PRs.**

**If issues found before PR merge:**
- **On release branch:** Abandon branch, fix issues on main, create new release branch
- **Build/test failures:** Fix issues, commit to release branch, update PR
- **Wrong version number:** Update package.json on release branch, commit, update PR

**If issues found after PR merge but before npm publish:**
- **Stop immediately** - Do NOT run `lerna publish`
- **Fix forward:** Create new PR with corrected version
- **Delete bad tag:** `git tag -d v{version}` (local) and `git push origin :refs/tags/v{version}` (remote)
- **Never reset commits on main** - Always fix with new commits

**If package already published to npm:**
- **Cannot unpublish** - npm policy prevents unpublishing
- **Fix forward:** Publish corrective patch version via new PR
- **Document:** Add note to CHANGELOG explaining issue and fix
- **Deprecate if critical:** `npm deprecate @fpkit/acss@{bad-version} "Issue: {description}. Use {fixed-version} instead."`

**OTP/2FA failures:**
- Generate new OTP code
- Retry: `lerna publish from-package --otp=123456`

**Recovery workflow:**
1. **Assess:** What succeeded? (tags created, commits merged, npm published)
2. **If only release branch affected:** Delete branch, start over
3. **If main branch affected:** Create PR to fix forward
4. **If npm published:** Publish corrective version via PR
5. **Document:** Update CHANGELOG with what happened and resolution

## Critical Files

**Create:**
- `.claude/skills/npm-monorepo-publish/SKILL.md` - Main skill file

**Reference (read-only):**
- `lerna.json` - Lerna config (conventionalCommits: true, independent versioning)
- `packages/fpkit/package.json` - Package metadata (version, files, publishConfig)
- Root `package.json` - Publish script (`lerna publish`)
- `CHANGELOG.md` - Version history (Keep a Changelog format)

## Resolved Decisions

1. **Release branch:** ✅ ALWAYS required - never publish from `main` directly
2. **Workflow order:** ✅ Branch → Version → PR → Merge → Publish (safe, reviewable)
3. **Changelog:** ✅ Let Lerna auto-generate via conventional commits, manual fallback
4. **Version + Publish:** ✅ Split operations - version on branch, publish after merge
5. **Auto-merge PRs:** ❌ Never - always prompt user to merge manually
6. **Dry run:** ✅ Support via `--dry-run` flag
7. **Major version protection:** ✅ Require explicit approval with breaking changes warning
8. **PR creation:** ✅ Auto-create via `gh pr create` with changelog in body

## Key Workflow Benefits

**Safety:**
- Release branch allows rollback before npm publish (can't unpublish from npm)
- PR review catches errors before irreversible publish
- Build/test failures abort before creating branch

**Traceability:**
- Every publish has associated PR for audit trail
- CHANGELOG updated in version control before publish
- Git tags link to PR via commit history

**Team collaboration:**
- PRs allow team review of version bumps and changes
- Breaking changes (major versions) reviewed before publish
- Changelog visible in PR for stakeholder review

**Git hygiene:**
- Main branch never force-pushed (preserves shared history)
- All fixes go through PRs (never `git reset` on main)
- Release branches disposable (abandon and restart if issues found)
- Forward-only commits on main (no rewriting history)

## Success Criteria

- [ ] Skill file created with proper frontmatter
- [ ] Single workflow documented: Release Branch → PR → Publish (8 steps)
- [ ] Release branch ALWAYS created (never publish from main)
- [ ] Dry-run mode supported via `--dry-run` flag
- [ ] Changelog auto-generated via Lerna conventional commits (manual fallback)
- [ ] PR auto-created via `gh pr create` with changelog excerpt
- [ ] Safety checks prevent major version bumps without approval
- [ ] OTP/2FA handling auto-handled by Lerna (documented)
- [ ] Post-publish verification (npm registry check)
- [ ] Rollback guidance: NEVER `git reset` on main - always fix forward with PRs
- [ ] Build verification checks `libs/` output exists
- [ ] Version validation checks npm registry BEFORE building
- [ ] User prompted to merge PR manually (no auto-merge)
- [ ] Branch cleanup after successful publish
- [ ] Main branch protected: no force pushes, no rewriting history
- [ ] Skill invocable via `/npm-monorepo-publish`
