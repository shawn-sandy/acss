# Workflow Examples

This reference provides comprehensive workflow examples for publishing npm monorepo packages using the npm-monorepo-publish skill.

## Example 1: Standard Publish Workflow

**Scenario:** Publishing a single package with bug fixes after all tests pass.

**User request:** "Publish the updated components to npm"

**Workflow:**

```bash
# Step 1: Pre-flight validation
$ bash scripts/pre-flight-check.sh
🔍 Running pre-flight checks...
1/3 Checking npm authentication...
✅ Authenticated as: johnsmith
2/3 Verifying Lerna monorepo...
✅ Lerna configuration found
3/3 Running build and lint...
✅ All pre-flight checks passed!

# Step 2: Dry-run preview
$ lerna publish --no-git-tag-version --no-push --yes
lerna notice cli v6.4.1
lerna info versioning independent
lerna info Looking for changed packages since @fpkit/acss@0.6.1

Changes:
 - @fpkit/acss: 0.6.1 => 0.6.2

? Are you sure you want to publish these packages? Yes

# Step 3: User provides OTP
Enter your 6-digit OTP code: 123456

# Step 4: Actual publish
$ lerna publish --otp 123456
lerna notice cli v6.4.1
lerna info versioning independent
Successfully published:
 - @fpkit/acss@0.6.2

# Step 5: Verification
$ npm view @fpkit/acss version
0.6.2

$ npm view @fpkit/acss time
{
  '0.6.1': '2024-01-05T10:30:00.000Z',
  '0.6.2': '2024-01-06T14:22:00.000Z'
}
```

**Result:** ✅ Package successfully published to npm registry

---

## Example 2: Build Failure During Validation

**Scenario:** Pre-flight checks catch TypeScript errors before attempting publish.

**User request:** "Release the new version"

**Workflow:**

```bash
# Step 1: Pre-flight validation
$ bash scripts/pre-flight-check.sh
🔍 Running pre-flight checks...
1/3 Checking npm authentication...
✅ Authenticated as: johnsmith
2/3 Verifying Lerna monorepo...
✅ Lerna configuration found
3/3 Running build and lint...
❌ Build failed. Fix errors before publishing.

# Build output showing errors:
Error: src/components/Button.tsx(45,18): error TS2339: Property 'disabled' does not exist on type 'ButtonProps'.
Error: src/components/Card.tsx(12,10): error TS2322: Type 'string' is not assignable to type 'number'.
Error: src/utils/helpers.ts(8,3): error TS7006: Parameter 'value' implicitly has an 'any' type.

Found 3 errors. Watching for file changes.
```

**User fixes errors:**
```bash
# Fix TypeScript errors
$ git add .
$ git commit -m "fix: resolve TypeScript errors in Button and Card components"

# Re-run pre-flight checks
$ bash scripts/pre-flight-check.sh
✅ All pre-flight checks passed!

# Continue with publish...
```

**Result:** ✅ Build errors caught before publish, preventing broken package release

---

## Example 3: OTP Expiration and Retry

**Scenario:** First OTP code expires, user provides fresh code on retry.

**User request:** "Publish to npm"

**Workflow:**

```bash
# Steps 1-2 complete successfully

# Step 3: First OTP attempt
Enter your 6-digit OTP code: 123456

$ lerna publish --otp 123456
lerna ERR! E401 Incorrect or expired OTP
lerna ERR! Unable to authenticate

# Retry with fresh OTP
Enter your 6-digit OTP code: 789012

$ lerna publish --otp 789012
lerna notice cli v6.4.1
lerna info versioning independent
Successfully published:
 - @fpkit/acss@0.6.2
```

**Using the interactive script (automatic retry):**
```bash
$ python3 scripts/publish-interactive.py

🔐 Step 4: OTP authentication
Enter 6-digit OTP code (attempt 1/3): 123456
❌ OTP expired or invalid. 2 attempts remaining.

Enter 6-digit OTP code (attempt 2/3): 789012
✅ Successfully published!
```

**Result:** ✅ Automatic retry logic handles OTP expiration gracefully

---

## Example 4: Multi-Package Publish (Independent Versioning)

**Scenario:** Publishing multiple packages with different version bumps.

**User request:** "Publish all changed packages"

**Workflow:**

```bash
# Dry-run shows multiple changed packages
$ lerna publish --no-git-tag-version --no-push --yes

Changes:
 - @fpkit/acss: 0.6.1 => 0.7.0 (new feature added)
 - @fpkit/utils: 1.2.3 => 1.2.4 (bug fix)
 - @fpkit/icons: 2.1.0 => 3.0.0 (breaking change)

# Actual publish
$ lerna publish --otp 123456
Successfully published:
 - @fpkit/acss@0.7.0
 - @fpkit/utils@1.2.4
 - @fpkit/icons@3.0.0

lerna success published 3 packages
```

**Git tags created:**
```bash
$ git tag
@fpkit/acss@0.7.0
@fpkit/utils@1.2.4
@fpkit/icons@3.0.0
```

**Result:** ✅ Each package published with appropriate version bump based on conventional commits

---

## Example 5: Force Version Bump (Manual Override)

**Scenario:** Manually specify version bump type instead of using conventional commits.

**User request:** "Publish a minor version bump"

**Workflow:**

```bash
# Force minor version bump
$ lerna publish minor --otp 123456
lerna notice cli v6.4.1
lerna info versioning independent
lerna info Assuming all packages changed

Changes:
 - @fpkit/acss: 0.6.1 => 0.7.0

? Are you sure you want to publish these packages? Yes
Successfully published:
 - @fpkit/acss@0.7.0
```

**Other force bump options:**
```bash
# Force patch: 0.6.1 → 0.6.2
lerna publish patch --otp <code>

# Force major: 0.6.1 → 1.0.0
lerna publish major --otp <code>

# Specific version: 0.6.1 → 2.0.0
lerna publish 2.0.0 --otp <code>
```

**Result:** ✅ Manual version override when conventional commits aren't sufficient

---

## Example 6: From-Package Publish (Recovery Scenario)

**Scenario:** Recovering from partial publish failure or manual version update.

**User request:** "Something went wrong during publish, some packages didn't publish"

**Workflow:**

```bash
# Check which packages need publishing
$ lerna publish from-package --dry-run

Changes:
 - @fpkit/acss: 0.6.2 (already at 0.6.2 in package.json but not on npm)
 - @fpkit/utils: 1.2.4 (already at 1.2.4 in package.json but not on npm)

# Publish only packages where version in package.json > version on npm
$ lerna publish from-package --otp 123456
Successfully published:
 - @fpkit/acss@0.6.2
 - @fpkit/utils@1.2.4
```

**When to use `from-package`:**
- Partial publish failure (some packages succeeded, others failed)
- Manual version bump in package.json
- Git tags exist but npm publish failed
- Recovery from interrupted publish process

**Result:** ✅ Publishes packages based on package.json version, skipping git history analysis

---

## Example 7: GitHub Releases Integration

**Scenario:** Publishing with automatic GitHub release creation.

**User request:** "Publish and create GitHub release"

**Prerequisites:**
```bash
# Set GitHub token
export GH_TOKEN="ghp_your_github_token_here"

# Verify lerna.json configuration
$ cat lerna.json
{
  "version": "independent",
  "conventionalCommits": true,
  "command": {
    "publish": {
      "createRelease": "github"
    }
  }
}
```

**Workflow:**

```bash
# Publish with GitHub release
$ lerna publish --otp 123456
lerna notice cli v6.4.1
lerna info versioning independent

Successfully published:
 - @fpkit/acss@0.6.2

lerna info Creating GitHub release for @fpkit/acss@0.6.2
lerna success GitHub release created: https://github.com/user/repo/releases/tag/@fpkit/acss@0.6.2
```

**GitHub release includes:**
- Git tag: `@fpkit/acss@0.6.2`
- Release title: "@fpkit/acss@0.6.2"
- Changelog: Auto-generated from conventional commits
- Link to npm package

**Result:** ✅ Package published to npm AND GitHub release created automatically

---

## Example 8: Private Registry Publish

**Scenario:** Publishing scoped packages to custom private registry.

**User request:** "Publish to our company registry"

**Configuration:**

**.npmrc in monorepo root:**
```bash
@yourcompany:registry=https://npm.yourcompany.com/
//npm.yourcompany.com/:_authToken=${NPM_TOKEN}
```

**package.json:**
```json
{
  "name": "@yourcompany/package-name",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.yourcompany.com/",
    "access": "restricted"
  }
}
```

**Workflow:**

```bash
# Verify authentication with custom registry
$ npm whoami --registry=https://npm.yourcompany.com/
johnsmith

# Publish to custom registry
$ lerna publish --otp 123456
lerna notice cli v6.4.1
Publishing to https://npm.yourcompany.com/

Successfully published:
 - @yourcompany/package-name@1.0.0

# Verify on custom registry
$ npm view @yourcompany/package-name --registry=https://npm.yourcompany.com/
{
  name: '@yourcompany/package-name',
  version: '1.0.0',
  ...
}
```

**Result:** ✅ Package published to private company registry instead of public npm

---

## Example 9: Canary Release

**Scenario:** Creating experimental pre-release version for testing.

**User request:** "Create a canary release for testing"

**Workflow:**

```bash
# Create canary release (adds unique suffix)
$ lerna publish --canary --otp 123456
lerna notice cli v6.4.1
lerna info versioning independent

Changes:
 - @fpkit/acss: 0.6.1 => 0.6.2-alpha.0+sha.abc1234

Successfully published:
 - @fpkit/acss@0.6.2-alpha.0+sha.abc1234

# Install canary version
$ npm install @fpkit/acss@0.6.2-alpha.0+sha.abc1234
```

**Canary version format:**
- Base version: `0.6.2`
- Pre-release tag: `alpha.0`
- Git SHA: `sha.abc1234`

**Benefits:**
- Test changes without affecting `latest` tag
- Unique version per commit
- Easy to identify experimental releases

**Result:** ✅ Canary release published for testing without affecting stable releases

---

## Example 10: Scoped Package with Public Access

**Scenario:** Publishing scoped package with public access to npm.

**User request:** "Publish my scoped package publicly"

**Configuration in package.json:**
```json
{
  "name": "@yourname/awesome-package",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  }
}
```

**Workflow:**

```bash
# Without "access": "public", scoped packages default to restricted
# This would fail for free npm accounts:
❌ npm ERR! 402 Payment Required - You must sign up for a paid account

# With "access": "public" in publishConfig:
$ lerna publish --otp 123456
✅ Successfully published:
 - @yourname/awesome-package@1.0.0

# Package is now publicly accessible
$ npm view @yourname/awesome-package
{
  name: '@yourname/awesome-package',
  version: '1.0.0',
  ...
}
```

**Result:** ✅ Scoped package published with public access on free npm account

---

## Example 11: Release Branch Workflow

**Scenario:** Publishing with isolated release branch for better git history tracking and safer release management.

**User request:** "Publish to npm using release branch workflow"

**Workflow:**

```bash
$ python3 scripts/publish-interactive.py

🚀 NPM Monorepo Publisher
==================================================

📋 Step 1: Pre-flight validation
--------------------------------------------------
🔍 Running pre-flight checks...
1/5 Checking npm authentication...
✅ Authenticated as: johnsmith
2/5 Verifying Lerna monorepo...
✅ Lerna configuration found
3/5 Checking git state...
Current branch: main
⚠️  Warning: Uncommitted changes detected
4/5 Running build...
✅ Build successful
5/5 Running lint...
✅ Lint passed
✅ All pre-flight checks passed!

🌿 Step 2: Git state validation
--------------------------------------------------
Current branch: main
Default branch: main
✅ Git state validated

🔍 Step 3: Dry-run preview
--------------------------------------------------
Analyzing changed packages...
lerna notice cli v6.4.1
lerna info versioning independent

Changes:
 - @fpkit/acss: 0.6.1 => 0.6.2

Release branch: release/v0.6.2

❓ Step 4: Confirm publish
--------------------------------------------------
Proceed with publish? (yes/no): yes

🌿 Step 5: Create release branch
--------------------------------------------------
✅ Created release branch: release/v0.6.2

🔐 Step 6: OTP authentication
--------------------------------------------------
Enter 6-digit OTP code (attempt 1/3): 123456

📦 Publishing with OTP: 123456
lerna notice cli v6.4.1
lerna info versioning independent
Successfully published:
 - @fpkit/acss@0.6.2

✅ Successfully published!

🔀 Step 7: Merge and cleanup
--------------------------------------------------
Checking out main...
Merging release/v0.6.2 into main...
Pushing to origin main...
✅ Merged release/v0.6.2 into main
✅ Deleted local branch: release/v0.6.2

✅ Step 8: Post-publish verification
--------------------------------------------------
To verify published packages:
  npm view @fpkit/acss version
  npm view @fpkit/acss time
```

**Git history after publish:**

```bash
$ git log --oneline --graph -5
* abc1234 chore: merge release v0.6.2
|\
| * def5678 chore(release): publish @fpkit/acss@0.6.2
|/
* 789abcd feat: add new component
* efg4567 fix: resolve navigation bug
```

**Remote branches:**

```bash
$ git branch -r
  origin/main
  origin/release/v0.6.2
```

**Result:** ✅ Published with clean release branch history, merge commit preserves release context, remote release branch preserved for auditing

**Multi-package example:**

For monorepos with multiple packages being published simultaneously:

```bash
Changes:
 - @fpkit/acss: 0.6.1 => 0.6.2
 - @fpkit/utils: 1.2.3 => 1.2.4

Release branch: release/multi-20260106-143052
```

---

## Grep Patterns

Use these patterns to quickly locate relevant examples:

- `lerna publish --otp` - Standard publish workflows
- `release branch` - Release branch workflow (Example 11)
- `build failed` - Build failure scenarios
- `from-package` - Recovery and partial publish
- `--canary` - Canary release examples
- `GH_TOKEN` - GitHub releases integration
- `publishConfig` - Registry and access configuration
- `conventional` - Conventional commits workflows
