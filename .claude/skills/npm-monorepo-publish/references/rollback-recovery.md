# Rollback & Recovery Guide

Comprehensive recovery scenarios for npm publish failures and issues.

---

## Core Principle: Fix Forward Only

**CRITICAL:** Never use `git reset` or force-push on main branch. Always fix forward with new PRs.

**Why:**
- Preserves git history for collaborators
- Prevents orphaned commits on team members' machines
- Maintains audit trail for compliance
- Avoids breaking CI/CD pipelines

**Fix Forward Means:**
- ✅ New commits to fix issues
- ✅ New PRs for corrections
- ✅ Document mistakes in CHANGELOG
- ❌ Never rewrite published history
- ❌ Never force-push shared branches

---

## Recovery Decision Tree

```
Was package published to npm?
│
├─ NO → Was PR merged?
│        ├─ NO → Delete branch, fix issues, restart
│        │       (Safe: no permanent changes made)
│        │
│        └─ YES → Fix forward on main, new release PR
│                 (Version in package.json updated but not published)
│
└─ YES → Publish corrective patch via new PR
         (Cannot unpublish from npm)
         Options:
         - Publish patch fix
         - Deprecate bad version
         - Document in CHANGELOG
```

**Quick Reference:**

| Situation | Action | Safe? |
|-----------|--------|-------|
| Pre-flight failed | Fix, restart | ✅ Completely safe |
| Release branch created, PR not merged | Delete branch, restart | ✅ Safe |
| PR merged, not published | Fix forward with new PR | ⚠️ Use caution |
| Published to npm | Patch release + deprecate | ❌ Cannot undo |

---

## Scenario 1: Issues on Release Branch (Before PR Merge)

**What happened:**
- ✅ Release branch created: `release/v6.2.0`
- ❌ Found issues (build errors, wrong version, typos)
- ⚠️ PR not merged yet

**Status:** **Safe to delete and restart**

**Actions:**

```bash
# 1. Switch back to main
git checkout main

# 2. Delete local release branch
git branch -D release/v6.2.0

# 3. Delete remote release branch (if pushed)
git push origin --delete release/v6.2.0

# 4. Fix issues on main branch
# (Make commits to fix the problems)

# 5. Restart publish workflow
# /npm-monorepo-publish
```

**Why this is safe:**
- Release branch never merged
- No permanent changes to main
- No tags created
- No npm publish attempted
- Team unaffected

**Example:**

```bash
$ git checkout -b release/v6.2.0
# ... realize version should be 6.3.0 not 6.2.0

$ git checkout main
$ git branch -D release/v6.2.0
Deleted branch release/v6.2.0

# Fix and restart
```

---

## Scenario 2: Issues After PR Merge (Before npm Publish)

**What happened:**
- ✅ Release branch created
- ✅ PR merged into main
- ⚠️ Found issues before running `lerna publish`
- ❌ Not published to npm yet

**Status:** **Must fix forward** (cannot delete merged commits)

**DO NOT run `lerna publish`!**

**Option A: Fix and Continue (Minor Issues)**

If issues are minor and version is correct:

```bash
# 1. Create fix on main branch
git checkout main
git pull origin main

# 2. Make fixes
# (Edit files as needed)

# 3. Commit fixes
git add .
git commit -m "fix: resolve issue before publish"
git push origin main

# 4. Continue with publish
lerna publish from-package --yes --otp={code}
```

**Option B: New Release PR (Major Issues)**

If issues require different version or significant changes:

```bash
# 1. Delete git tag if created
git tag -d v6.2.0
git push origin :refs/tags/v6.2.0

# 2. Fix issues on main
git checkout main
# Make necessary fixes
git commit -m "fix: correct issues"
git push origin main

# 3. Create new release PR with corrected version
# Start fresh: /npm-monorepo-publish
# Use v6.2.1 (patch) or appropriate version
```

**Why fix forward:**
- PR already merged - commits are permanent
- Other developers may have pulled changes
- CI/CD may have recorded the merge
- Rewriting would break their local repos

**Example:**

```bash
# PR merged with version 6.2.0
# Discover critical bug in code

# DON'T publish broken version
# Fix on main
$ git checkout main
$ git pull
$ # Fix bug
$ git commit -m "fix: critical bug before publish"
$ git push

# Now safe to publish
$ lerna publish from-package --yes --otp=123456
```

---

## Scenario 3: Package Already Published to npm

**What happened:**
- ✅ Package published to npm
- ❌ Found bug/issue after publish
- ⚠️ Users may already be installing broken version

**Status:** **Cannot unpublish** (npm policy)

**Reality Check:**
- npm unpublish only allowed within 72 hours
- Only if package has NO dependents
- Permanently removes package (scorched earth)
- **Not recommended** - breaks existing users

**Recommended Approach: Patch Release**

### Step 1: Deprecate Bad Version

```bash
npm deprecate @fpkit/acss@6.2.0 "Issue: [description]. Use @fpkit/acss@6.2.1 instead."
```

**Effect:**
- Adds warning when users install that version
- Doesn't prevent installation (users can still use it)
- Shows in `npm view` output
- Guides users to correct version

### Step 2: Publish Corrective Patch

```bash
# 1. Create fix on main branch
git checkout main
git pull origin main

# 2. Fix the issue
# (Make code changes)

# 3. Commit fix
git add .
git commit -m "fix: resolve issue in v6.2.0"

# 4. Start new publish workflow for v6.2.1
# /npm-monorepo-publish
# Choose "patch" version bump
```

### Step 3: Update CHANGELOG

Document the issue transparently:

```markdown
## [6.2.1] - 2024-01-07

### Fixed
- Resolved issue in v6.2.0 where [description of bug]
- Updated [component] to handle [edge case]

## [6.2.0] - 2024-01-06 [DEPRECATED]

**⚠️ This version is deprecated. Use 6.2.1 instead.**

### Issue
- [Description of what was wrong]

### Added
- [Original features from this release]
```

**Example:**

```bash
# Published @fpkit/acss@6.2.0
# Users report button component crash

# 1. Deprecate immediately
$ npm deprecate @fpkit/acss@6.2.0 "Button component crash on null props. Use @fpkit/acss@6.2.1"

# 2. Fix bug on main
$ git checkout main
$ # Fix button component
$ git commit -m "fix: button null safety"

# 3. Publish patch
$ # Start publish workflow for v6.2.1
```

**Communication:**

- Update GitHub release notes
- Post issue on GitHub if users reported bug
- Tweet/announce if major package
- Update documentation if needed

---

## Scenario 4: OTP/2FA Failure

**What happened:**
- Everything ready to publish
- OTP code expired or invalid
- Publish failed with authentication error

**Status:** **Easy to retry** (no permanent changes)

### Symptom 1: OTP Expired

```bash
$ lerna publish from-package --yes --otp=123456
npm ERR! code EOTP
npm ERR! This operation requires a one-time password.
npm ERR! You can provide a one-time password by passing --otp=<code>
```

**Solution:**

```bash
# 1. Get fresh OTP from authenticator app
# 2. Retry immediately
lerna publish from-package --yes --otp={new-code}
```

**Tips:**
- Generate OTP right before publishing
- Don't wait >20 seconds to use code
- Keep authenticator app open and ready
- If near expiration, wait for new code

### Symptom 2: Repeated OTP Failures

**Possible causes:**
- Clock drift on authenticator device
- Wrong npm account in authenticator
- 2FA not properly configured

**Solutions:**

```bash
# 1. Verify authentication
npm whoami
# Should match your npm username

# 2. Check 2FA settings
npm profile get
# Look for "tfa": "auth-and-writes"

# 3. Sync authenticator app time
# (Check app settings for time sync option)

# 4. Re-login if needed
npm logout
npm login
# Enter credentials and new OTP

# 5. Retry publish
lerna publish from-package --yes --otp={code}
```

**Verify 2FA on npmjs.com:**
1. Log into npmjs.com
2. Go to Account Settings
3. Check Two-Factor Authentication section
4. Ensure "Require 2FA for writes" is enabled

---

## Scenario 5: Build Failure After Release Branch Created

**What happened:**
- ✅ Release branch created
- ✅ Version bumped
- ❌ Build fails (maybe updated dependencies broke something)

**Status:** **Delete branch and fix** (PR not merged yet)

**Actions:**

```bash
# 1. Return to main
git checkout main

# 2. Delete release branch
git branch -D release/v6.2.0
git push origin --delete release/v6.2.0

# 3. Fix build on main branch
# (Update code, fix dependencies, etc.)
git add .
git commit -m "fix: resolve build errors"
git push origin main

# 4. Verify build passes
npm run build
npm test

# 5. Restart publish workflow
# /npm-monorepo-publish
```

**Why not fix on release branch:**
- Build failures indicate incomplete work
- Should never publish broken builds
- Fix should go through normal PR review
- Ensures main branch stays clean

---

## Scenario 6: Git Push Failed After Publish

**What happened:**
- ✅ Package published to npm
- ✅ Git tags created locally
- ❌ Git push failed (network, permissions, etc.)

**Status:** **Published but incomplete** (needs manual cleanup)

**Symptoms:**

```bash
$ lerna publish from-package --yes --otp=123456
Successfully published:
 - @fpkit/acss@6.2.0

$ git push --follow-tags
error: failed to push some refs
```

**Recovery:**

```bash
# 1. Verify package published
npm view @fpkit/acss version
# Shows: 6.2.0 ✅

# 2. Check local tags
git tag
# Shows: v6.2.0 ✅

# 3. Retry git push
git push origin main --follow-tags

# 4. If still fails, push separately
git push origin main
git push origin v6.2.0

# 5. Verify remote tags
git ls-remote --tags origin
```

**If push continues to fail:**

```bash
# Check permissions
git remote -v
# Ensure you have write access

# Check branch protection
# May need to temporarily disable or use --force-with-lease

# Create GitHub release manually
gh release create v6.2.0 --generate-notes
```

---

## Scenario 7: Wrong Version Published

**What happened:**
- ✅ Published to npm
- ❌ Wrong version number (meant 6.3.0, published 6.2.0)

**Status:** **Cannot change** (version is permanent on npm)

**Options:**

### Option A: Publish Correct Version

```bash
# 1. Accept 6.2.0 exists
# 2. Publish intended version as 6.3.0
# /npm-monorepo-publish
# Choose "minor" for 6.3.0

# 3. Deprecate wrong version
npm deprecate @fpkit/acss@6.2.0 "Published in error. Use @fpkit/acss@6.3.0"

# 4. Update CHANGELOG
## [6.3.0] - 2024-01-07
This is the intended release.

## [6.2.0] - 2024-01-07 [DEPRECATED]
Published with incorrect version number. Use 6.3.0 instead.
```

### Option B: Continue from Wrong Version

```bash
# 1. Accept 6.2.0 as published
# 2. Continue with 6.2.x series
# 3. Publish major features as 6.3.0 later

# Treat as learning experience
```

**Prevent this:**
- Always review version in dry-run
- Double-check version before confirming publish
- Use automated version selection when possible

---

## Scenario 8: Partial Publish (Multi-Package Monorepo)

**What happened:**
- ✅ Package A published successfully
- ❌ Package B failed (OTP expired)
- ⚠️ Inconsistent state

**Status:** **Use from-package to recover**

**Recovery:**

```bash
# 1. Check what published
npm view @fpkit/acss version      # Published ✅
npm view @fpkit/utils version     # Failed ❌

# 2. Verify package.json versions
cat packages/fpkit/package.json | grep version    # 6.2.0
cat packages/utils/package.json | grep version    # 1.5.0

# 3. Get fresh OTP
# 4. Publish remaining packages
lerna publish from-package --yes --otp={fresh-code}

# Output:
# - @fpkit/acss: 6.2.0 (already on npm, skipped)
# - @fpkit/utils: 1.5.0 (publishing...)

# 5. Verify all published
npm view @fpkit/acss version
npm view @fpkit/utils version
```

**How `from-package` works:**
- Compares package.json version to npm registry
- Only publishes if package.json > npm version
- Skips already-published packages
- Perfect for recovery scenarios

---

## Prevention Checklist

Use this checklist before every publish to avoid recovery scenarios:

**Before Creating Release Branch:**
- [ ] Clean working tree (`git status`)
- [ ] On main branch
- [ ] Latest changes pulled (`git pull`)
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] npm authenticated (`npm whoami`)
- [ ] Conventional commits used

**Before Publishing to npm:**
- [ ] PR reviewed and merged
- [ ] Version correct in package.json
- [ ] CHANGELOG updated
- [ ] Authenticator app ready
- [ ] OTP fresh (<20 seconds old)
- [ ] Network connection stable

**After Publishing:**
- [ ] Verify on npm registry
- [ ] Git tags pushed
- [ ] Release branch deleted
- [ ] Team notified
- [ ] Documentation updated (if needed)

---

## Emergency Contacts

**If recovery fails:**

1. **Check npm status:** https://status.npmjs.org/
2. **npm support:** https://npm.community/
3. **Lerna issues:** https://github.com/lerna/lerna/issues
4. **Lerna docs:** https://lerna.js.org/docs/features/version-and-publish

**For major issues:**
- Document exact error messages
- Note which step failed
- Check npm registry state
- Check git repository state
- Consult team before force operations
