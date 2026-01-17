# Technical Reference

This reference provides technical specifications, best practices, and debugging guidance for the npm-monorepo-publish skill.

## Working Directory Requirements

**Location:** The skill must be executed from the **monorepo root directory** where `lerna.json` exists.

**Validation:**
```bash
# Check current location
pwd

# Verify lerna.json exists
ls -la lerna.json

# Check Lerna version
npx lerna --version
```

**Directory structure example:**
```
monorepo-root/
├── lerna.json          # Required
├── package.json        # Required
├── packages/
│   ├── package-a/
│   │   └── package.json
│   └── package-b/
│       └── package.json
└── node_modules/
```

**Common issues:**
- Running from package subdirectory → Move to monorepo root
- Missing lerna.json → Initialize with `npx lerna init`
- No packages/ directory → Configure workspace paths in lerna.json

## OTP Format Specifications

**Format:** Exactly 6 numeric digits

**Characteristics:**
- **Length:** 6 digits (no more, no less)
- **Characters:** Numeric only (`0-9`)
- **Expiry:** ~30 seconds after generation
- **Single-use:** One OTP code per publish operation
- **No separators:** No spaces, dashes, or other characters

**Valid examples:**
```
123456 ✅
789012 ✅
000000 ✅
```

**Invalid examples:**
```
12345      ❌ (too short)
1234567    ❌ (too long)
12 34 56   ❌ (spaces)
123-456    ❌ (dashes)
abcdef     ❌ (letters)
```

**Timing best practices:**
- Generate OTP immediately before publishing
- Don't wait >20 seconds before using code
- Have authenticator app ready before starting publish
- If code expires, request fresh one (don't retry same code)

## Lerna Behavior Details

**Change detection:** Lerna analyzes git history since the last git tag to determine which packages have changed.

**How it works:**
```bash
# Lerna finds last published tag
git describe --tags --abbrev=0

# Compares current HEAD to that tag
git diff <last-tag>...HEAD

# Identifies changed packages
# Only packages with changes get published
```

**Version bump logic:**
1. Scan commit messages since last tag
2. Find highest-priority conventional commit type per package
3. Apply version bump based on priority:
   - `BREAKING CHANGE` → major (1.0.0)
   - `feat:` → minor (0.1.0)
   - `fix:` → patch (0.0.1)
4. Update package.json with new version
5. Create git tag: `package-name@version`

**Changed packages detection:**
```bash
# Preview which packages changed
npx lerna changed

# See what version bumps would be applied
npx lerna publish --dry-run
```

**Edge cases:**
- No changes since last tag → Nothing to publish
- Manual version bump in package.json → Use `from-package` flag
- Missing git tags → Lerna may try to publish all packages

## NPM Registry Configuration

**Default registry:** `https://registry.npmjs.org/`

**Custom registry via .npmrc:**
```bash
# Project-level .npmrc (monorepo root)
registry=https://custom-registry.com/

# Scoped registry
@yourscope:registry=https://custom-registry.com/
```

**Authentication:**
```bash
# Default npm registry
npm login

# Custom registry
npm login --registry=https://custom-registry.com/

# Verify authentication
npm whoami
npm whoami --registry=https://custom-registry.com/
```

**Scoped packages:**
- Format: `@scope/package-name`
- Requires `publishConfig.access` in package.json
- Default to restricted unless set to `"public"`
- Example: `@fpkit/acss` → scope is `fpkit`

**Private registries:**
- Verdaccio (local npm registry)
- GitHub Packages
- Azure Artifacts
- JFrog Artifactory
- AWS CodeArtifact

## Environment Variables

**GH_TOKEN** - GitHub personal access token for releases
```bash
export GH_TOKEN="ghp_your_token_here"
```
- Required for `createRelease: "github"` in lerna.json
- Needs `repo` scope for private repos
- Needs `public_repo` scope for public repos
- Generate at: https://github.com/settings/tokens

**NPM_TOKEN** - npm authentication token
```bash
export NPM_TOKEN="npm_token_here"
```
- Alternative to interactive `npm login`
- Useful for CI/CD pipelines
- Can be set in .npmrc: `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`

**LERNA_LOG_LEVEL** - Control Lerna output verbosity
```bash
export LERNA_LOG_LEVEL="verbose"
```
- Values: `silent`, `error`, `warn`, `info`, `verbose`, `silly`
- Default: `info`

## Command-Line Flags Reference

**Primary publish flags:**
```bash
--otp <code>              # One-time password for 2FA (required)
--no-git-tag-version      # Skip git tagging
--no-push                 # Skip git push to remote
--yes                     # Skip confirmation prompts
--dry-run                 # Preview without publishing
from-package              # Publish based on package.json versions
```

**Version bump flags:**
```bash
patch                     # Force patch bump (0.6.1 → 0.6.2)
minor                     # Force minor bump (0.6.1 → 0.7.0)
major                     # Force major bump (0.6.1 → 1.0.0)
--conventional-commits    # Use conventional commits (default with config)
```

**Distribution tags:**
```bash
--dist-tag <tag>          # Publish with custom tag (default: "latest")
                          # Examples: beta, next, canary, rc
```

**Filtering and scoping:**
```bash
--scope <glob>            # Publish only matching packages
                          # Example: --scope @fpkit/*
--ignore <glob>           # Skip matching packages
```

**Other useful flags:**
```bash
--registry <url>          # Override npm registry
--force-publish          # Force publish even without changes
--canary                 # Create canary release
```

## Best Practices

**Pre-publish checklist:**
- [ ] All tests passing
- [ ] Build successful
- [ ] Lint passing
- [ ] Authenticated with npm
- [ ] On correct git branch (main/master)
- [ ] Git status clean (no uncommitted changes)
- [ ] Latest code pulled from remote
- [ ] Conventional commit messages used
- [ ] Authenticator app ready for OTP

**Error prevention:**
- Always run dry-run first (`--no-git-tag-version --no-push --yes`)
- Review dry-run output before actual publish
- Use pre-flight-check.sh script for validation
- Keep build and lint passing at all times
- Don't publish from feature branches
- Ensure git tags are synchronized with remote

**Version management:**
- Let conventional commits drive version bumps
- Only use manual bumps for exceptions
- Keep package versions independent in monorepos
- Use `from-package` for recovery scenarios
- Never commit version bumps manually without publishing

**Security practices:**
- Never commit npm tokens to git
- Use environment variables for credentials
- Enable 2FA on npm account (required by this skill)
- Rotate tokens periodically
- Use scoped packages to prevent typosquatting
- Review package contents before publishing

## Debugging Commands

**Verify npm authentication:**
```bash
npm whoami                          # Show authenticated user
npm token list                      # List active tokens
npm profile get                     # Show account details
```

**Check package permissions:**
```bash
npm access ls-packages              # List packages you can publish
npm access ls-collaborators <pkg>   # Show package collaborators
npm owner ls <package-name>         # Show package owners
```

**Lerna diagnostics:**
```bash
npx lerna changed                   # Show changed packages
npx lerna diff                      # Show changed files
npx lerna ls                        # List all packages
npx lerna exec -- pwd               # Run command in each package
```

**Git tag verification:**
```bash
git tag                             # List all tags
git tag -l "*@*"                    # List Lerna-style tags
git describe --tags                 # Show current tag
git push --tags                     # Push tags to remote
```

**Registry debugging:**
```bash
npm view <package-name>             # Show package info
npm view <package-name> version     # Show latest version
npm view <package-name> versions    # List all versions
npm view <package-name> time        # Show publish timestamps
npm info <package-name>             # Detailed package info
```

**Network diagnostics:**
```bash
npm ping                            # Test npm registry connectivity
npm config get registry             # Show current registry
curl -I https://registry.npmjs.org/ # Test registry HTTP response
```

## Performance Optimization

**Speed up builds:**
- Use `npm ci` instead of `npm install` in CI
- Enable Lerna's build caching
- Use `--ignore-scripts` for faster installs (when safe)
- Parallelize builds with `lerna run build --parallel`

**Reduce publish time:**
- Keep package sizes small
- Use `.npmignore` to exclude unnecessary files
- Minimize dependencies
- Enable tree shaking in builds

## Grep Patterns

Use these patterns to quickly locate relevant content:

- `--otp` - OTP flag usage examples
- `lerna.json` - Configuration file references
- `publishConfig` - Package-level configuration
- `GH_TOKEN` - GitHub token setup
- `npm whoami` - Authentication commands
- `conventional` - Conventional commits info
- `registry` - npm registry configuration
