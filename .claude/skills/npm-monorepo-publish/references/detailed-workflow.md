# Detailed Workflow Guide

Complete step-by-step instructions for publishing packages using the release branch workflow.

---

## Step 1: Pre-flight Checks

**Objective:** Validate environment before starting

**Verify:**

- On `main` branch with clean working tree
- Node >=22.12.0, npm >=8.0.0
- Package has valid publishConfig (access: public)
- No uncommitted changes

**Commands:**

```bash
# Check git status
git status
git branch --show-current

# Verify versions
node --version
npm --version

# Check npm authentication
npm whoami

# Verify package configuration
cat packages/fpkit/package.json | grep -A 3 "publishConfig"
```

**If checks fail:** Abort and fix issues first.

---

## Step 2: Version Validation & Review

**Objective:** Determine next version and ensure it's available

**Actions:**

1. Get current version from `packages/fpkit/package.json`
2. Check latest on npm: `npm view {package-name} version`
3. Show commits since last tag (for changelog context)
4. Ask user for version bump type (patch/minor/major)
5. **If major version:** Require explicit confirmation with warning:
   - "⚠️ Major version indicates BREAKING CHANGES"
   - "Require: MIGRATION.md, CHANGELOG breaking changes section"
   - Confirm with exact phrase: "yes, publish major version"
6. Verify next version doesn't exist: `npm view {package-name}@{next-version}` (expect 404)

**Commands:**

```bash
# Get current version
cat packages/fpkit/package.json | grep '"version"'

# Check npm latest
npm view @fpkit/acss version

# View commits for changelog
git log --oneline $(git describe --tags --abbrev=0)..HEAD

# Verify next version available (should 404)
npm view @fpkit/acss@{next-version}
```

**Key decision:** Version number determines branch name (`release/v{version}`)

---

## Step 3: Pre-publish Validation

**Objective:** Ensure package builds and tests pass

**Validate in packages/fpkit:**

1. Run build (check package.json for build script)
2. Verify `libs/` directory exists with expected output
3. Run lint - must pass with no errors
4. Run tests - all must pass

**Commands:**

```bash
cd packages/fpkit

# Build
npm run build

# Verify output
ls -la libs/

# Lint
npm run lint

# Test
npm test

cd ../..
```

**If any fail:** Abort publish. Fix issues on main branch before retrying.

**Note:** Build output required for publishing: `libs/index.js`, `libs/index.cjs`, `libs/index.d.ts`, `libs/index.css`

---

## Step 4: Create Release Branch

**Objective:** Isolate version changes on dedicated branch

**Action:** Create branch `release/v{version}` from main

**Commands:**

```bash
# Create and checkout release branch
git checkout -b release/v{version}

# Verify branch created
git branch --show-current
```

**Branch naming:**

- Single package: `release/v6.2.0`
- Multi-package (if expanded): `release/multi-{timestamp}`

---

## Step 5: Version Bump (No Publish)

**Objective:** Update package.json version on release branch

**Preferred method:** Lerna with no-push flag

```bash
lerna version {patch|minor|major} --no-push --no-git-tag-version
```

**Manual alternative:**

```bash
# Edit version in package.json
# Then commit
git add packages/fpkit/package.json
git commit -m "chore(release): bump version to {version}"
```

**Important:** No git tags created yet. No npm publish yet.

**Verify:**

```bash
# Check version updated
cat packages/fpkit/package.json | grep '"version"'

# Check git status
git status
```

---

## Step 6: Update CHANGELOG

**Objective:** Document changes for this release

**Check if auto-generated:**

- Lerna may auto-generate via conventional commits (check `lerna.json`)
- If generated, review and edit if needed

**If not auto-generated:**

1. Add section: `## [{version}] - {YYYY-MM-DD}`
2. Use Keep a Changelog format (Added, Changed, Fixed, Breaking Changes)
3. List changes from commits since last tag
4. Commit: `docs: update CHANGELOG for v{version}`

**Commands:**

```bash
# Check for existing CHANGELOG
cat CHANGELOG.md | head -20

# Edit CHANGELOG (if needed)
# Add new section at top

# Get commits for reference
git log --oneline $(git describe --tags --abbrev=0)..HEAD

# Commit CHANGELOG
git add CHANGELOG.md
git commit -m "docs: update CHANGELOG for v{version}"
```

**Reference:** See existing CHANGELOG.md for format

---

## Step 7: Push & Create PR

**Objective:** Create PR for team review before publishing

**Actions:**

1. Push branch: `git push -u origin release/v{version}`
2. Create PR via GitHub CLI:
   - Title: `chore(release): publish {package-name}@{version}`
   - Body: Paste changelog excerpt
   - Include checklist: version updated, CHANGELOG updated, builds pass
3. **Prompt user:** "PR created at {url}. Review and merge when ready."
4. **Wait for confirmation:** User must confirm PR is merged before Step 8

**Commands:**

```bash
# Push branch
git push -u origin release/v{version}

# Create PR with gh CLI
gh pr create \
  --title "chore(release): publish @fpkit/acss@{version}" \
  --body "$(cat <<'EOF'
## Release @fpkit/acss@{version}

### Changes
[Paste changelog excerpt here]

### Checklist
- [x] Version bumped in package.json
- [x] CHANGELOG updated
- [x] Build passes
- [x] Lint passes
- [x] Tests pass

### Publish Plan
After merge, will publish to npm with `lerna publish from-package --yes`
EOF
)"
```

**If gh CLI unavailable:**

```bash
# Get PR URL manually
echo "Create PR at: https://github.com/{owner}/{repo}/compare/main...release/v{version}"
```

---

## Step 8: Publish After PR Merged

**Objective:** Publish to npm and create git tags

**Pre-conditions:**

- User confirmed PR merged
- Now on main branch with merged changes

**Actions:**

1. Switch to main: `git checkout main`
2. Pull latest: `git pull origin main`
3. Verify version updated in package.json
4. Publish: `lerna publish from-package --yes`
   - Publishes to npm
   - Creates git tag `v{version}`
   - **Auto-prompts for OTP if 2FA enabled**
5. Push tags: `git push --follow-tags`
6. Clean up:
   - Delete local branch: `git branch -d release/v{version}`
   - Delete remote branch: `git push origin --delete release/v{version}`
7. Verify on npm: `npm view {package-name} version` (should show new version)

**Commands:**

```bash
# Switch to main
git checkout main

# Pull merged changes
git pull origin main

# Verify version updated
cat packages/fpkit/package.json | grep '"version"'

# Get OTP from authenticator app
# Then publish
lerna publish from-package --yes --otp={6-digit-code}

# Push tags
git push --follow-tags

# Clean up branches
git branch -d release/v{version}
git push origin --delete release/v{version}

# Verify published
npm view @fpkit/acss version
npm view @fpkit/acss time
```

**OTP handling:**

- OTP expires in ~30 seconds
- If OTP expires, retry with fresh code: `lerna publish from-package --yes --otp={new-code}`
- Keep authenticator app ready before starting publish

**Success indicators:**

```bash
lerna success published 1 package
Successfully published:
 - @fpkit/acss@{version}
```

**Verification:**

```bash
# Check npm registry
npm view @fpkit/acss version
# Should show new version

# Check git tags
git tag | grep "v{version}"
# Should show new tag

# Check package URL
echo "Published: https://www.npmjs.com/package/@fpkit/acss"
```

---

## Parallel Tool Usage

**Optimize workflow with parallel tool calls:**

**Pre-flight checks (Step 1):**
```
✅ Call multiple Bash tools in single response:
- Check git status (parallel)
- Check npm whoami (parallel)
- Verify lerna.json exists (parallel)
```

**Build validation (Step 3):**
```
⚠️ Run sequentially (build must complete before testing):
- Run build (wait for completion)
- Run lint (after build)
- Run tests (after build)
```

**Post-publish (Step 8):**
```
✅ Parallel verification:
- Check npm registry (parallel)
- Check git tags (parallel)
- Verify package.json (parallel)
```

---

## Error Handling

**At each step, if errors occur:**

1. **Step 1-3 (Pre-flight):** Abort, fix issues, restart from Step 1
2. **Step 4-6 (Release branch):** Delete branch, fix on main, restart
3. **Step 7 (PR):** Update PR, force-push to release branch
4. **Step 8 (Publish):** See rollback-recovery.md for detailed scenarios

**Never:**
- Force-push to main branch
- Skip validation steps
- Publish without PR review
- Use `git reset` on shared branches

**Always:**
- Fix forward with new commits
- Create new PRs for corrections
- Document issues in CHANGELOG
- Keep team informed of publish status
