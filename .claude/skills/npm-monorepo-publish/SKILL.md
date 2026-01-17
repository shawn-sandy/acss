---
name: npm-monorepo-publish
description: Publish packages to npm using release branch workflow with PR review before publishing
version: 2.1.0
---

# npm Monorepo Publishing Skill

## Purpose

Guide the publishing of packages to npm using a release branch workflow that ensures:

- All publishes reviewed via PR before going live
- Build/test validation before creating release branch
- Main branch never force-pushed (fix forward only)
- Full audit trail with every publish linked to a PR

**Core principle:** Never publish directly from main. Always use release branches.

**Scope:** Works with any package in the monorepo (currently: `@fpkit/acss`, expandable to other packages)

---

## When to Invoke

User requests:

- "Publish to npm"
- "Release a new version"
- "Create a patch/minor/major release"
- "Publish the package"

**Arguments:**

- `--dry-run` - Validate without publishing

**First step:** If multiple packages exist or context is unclear, ask user which package to publish.

---

## Project Context

| File | Purpose |
|------|---------|
| `lerna.json` | Versioning mode (independent), conventional commits |
| `packages/{name}/package.json` | Package name, version, publishConfig, scripts |
| `CHANGELOG.md` | Release history format |

**Key configuration:**

- Versioning: Independent (Lerna manages per-package)
- Conventional commits: Enabled (auto-changelog)
- Requirements: Node >=22.12.0, npm >=8.0.0

**Current packages:**

- `@fpkit/acss` in `packages/fpkit/`

---

## Workflow Overview

**8-Step Release Branch Flow:**

| Step | Action | Changes Made |
|------|--------|--------------|
| 1. **Validate** | Pre-flight checks | None (read-only) |
| 2. **Review** | Version selection | None (read-only) |
| 3. **Build** | Run build/lint/test | Build artifacts in `libs/` |
| 4. **Branch** | Create `release/v{version}` | New git branch |
| 5. **Version** | Bump package.json | package.json updated |
| 6. **Document** | Update CHANGELOG | CHANGELOG.md updated |
| 7. **PR Review** | Push branch, create PR | Remote branch, PR created |
| 8. **Publish** | After merge, publish to npm | npm publish, git tags |

**For detailed instructions:** See `references/detailed-workflow.md`

---

## Quick Reference

**Experienced users - full command sequence:**

```bash
# Validate → Branch → Version → PR → Publish

git checkout main && git status
cd packages/fpkit && npm run build && npm run lint && npm test && cd ../..
git checkout -b release/v{VERSION}
lerna version {patch|minor|major} --no-push --no-git-tag-version
# Update CHANGELOG, commit
git push -u origin release/v{VERSION}
gh pr create --title "chore(release): publish @fpkit/acss@{VERSION}" --body "..."
# After PR merge:
git checkout main && git pull
lerna publish from-package --yes --otp={6-digit-code}
git push --follow-tags
git branch -d release/v{VERSION} && git push origin --delete release/v{VERSION}
```

---

## Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Publish directly from main | Use release branches |
| Skip build/lint/test validation | Run all checks before branching |
| Use `git reset` on main | Fix forward with new commits |
| Proceed without PR review | Always require PR approval |
| Guess version number | Check npm registry first |
| Use expired OTP codes | Generate fresh OTP before publish |
| Force-push shared branches | Push normally, preserve history |
| Publish without CHANGELOG | Update CHANGELOG before PR |

---

## Safety Checks

### Pre-publish Blockers

Abort if **any** of these fail:

| Check | Command | Expected |
|-------|---------|----------|
| Clean working tree | `git status` | No uncommitted changes |
| Correct branch | `git branch --show-current` | `main` |
| Node version | `node --version` | >= 22.12.0 |
| npm version | `npm --version` | >= 8.0.0 |
| Build | `npm run build` | Exit code 0 |
| Lint | `npm run lint` | No errors (warnings OK) |
| Tests | `npm test` | All pass |
| Version available | `npm view {pkg}@{next-ver}` | 404 error |
| npm auth | `npm whoami` | Valid username |

### Major Version Protection

**If major version detected (X.0.0 → X+1.0.0):**

```
⚠️ BREAKING CHANGE - Major version bump

Requires before proceeding:
- MIGRATION.md guide created
- CHANGELOG lists all breaking changes
- Documentation updated

Confirm: "yes, publish major version"
```

Wait for exact confirmation phrase. If not confirmed: **Abort**.

---

## Dry-Run Mode

**Flag:** `--dry-run`

| Action | Behavior |
|--------|----------|
| Steps 1-3 | ✅ Run full validation |
| Steps 4-8 | ℹ️ Preview only - no changes made |
| Output | Shows: branch name, version change, files to publish |

**Use case:** Test workflow before real publish, especially from feature branches

---

## Recovery Decision Tree

```
Was package published to npm?
│
├─ NO → Was PR merged?
│        ├─ NO → Delete branch, fix issues, restart
│        └─ YES → Fix forward on main, new release PR
│
└─ YES → Publish corrective patch via new PR
         (Cannot unpublish from npm)
```

**For detailed recovery scenarios:** See `references/rollback-recovery.md`

**Quick recovery guide:**

| Situation | Action | Risk |
|-----------|--------|------|
| Pre-flight failed | Fix on main, restart | None |
| Release branch created, no PR | Delete branch, restart | None |
| PR merged, not published | Fix forward, new PR | Low |
| Published to npm | Patch + deprecate | Medium |

---

## Tool Usage Guide

**Use these tools in order of preference:**

| Tool | When to Use | Example |
|------|-------------|---------|
| `Read` | Read project files | package.json, lerna.json, CHANGELOG.md |
| `Bash` | Git/npm commands | `git status`, `npm whoami`, `lerna publish` |
| `AskUserQuestion` | Version confirmation | Major version warnings, publish confirmation |
| `TodoWrite` | Track workflow steps | Mark validation complete, track progress |

**Never use:**
- `Write` - Lerna handles file updates automatically
- `Edit` - Version bumps managed by Lerna

**Parallel execution:**
- ✅ Pre-flight checks (Step 1): Run in parallel
- ❌ Build/lint/test (Step 3): Run sequentially
- ✅ Post-publish verification: Run in parallel

---

## Key Files

**This skill reads:**

- `lerna.json` - Lerna configuration
- `packages/fpkit/package.json` - Package metadata
- `CHANGELOG.md` - Release history
- `.git/` - Branch, tags, commits

**This skill modifies:**

- `packages/fpkit/package.json` - Version field (Step 5)
- `CHANGELOG.md` - Release notes (Step 6)
- Git branches, tags (Steps 4, 8)

**This skill publishes to:**

- npm registry: https://www.npmjs.com/package/@fpkit/acss

---

## Version Validation Steps

| Step | Check | Command |
|------|-------|---------|
| 1 | Get current version | `cat packages/fpkit/package.json \| grep version` |
| 2 | Check npm latest | `npm view @fpkit/acss version` |
| 3 | View commit history | `git log --oneline {last-tag}..HEAD` |
| 4 | Ask user for bump type | patch / minor / major |
| 5 | Verify next version free | `npm view @fpkit/acss@{next} version` (expect 404) |

---

## OTP Authentication

**Format:** Exactly 6 numeric digits

| Requirement | Details |
|-------------|---------|
| Length | 6 digits (no more, no less) |
| Characters | Numeric only (0-9) |
| Expiry | ~30 seconds after generation |
| Usage | Single-use per publish |

**Best practices:**
- Generate OTP immediately before publishing
- Don't wait >20 seconds before using code
- Keep authenticator app ready
- If expired, request fresh code (don't retry same)

**See:** `references/technical-reference.md` for OTP debugging

---

## Helper Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `scripts/pre-flight-check.sh` | Validation only | Before starting workflow |
| `scripts/publish-interactive.py` | Full automated workflow | Guided publish with OTP retry |

**Recommendation:** Use interactive script for full automation and built-in error handling

---

## Support & Resources

**Common issues:**

| Issue | Solution | Reference |
|-------|----------|-----------|
| OTP expired | Generate fresh code, retry | `references/troubleshooting.md` |
| Build failed | Fix on main, restart | `references/detailed-workflow.md` |
| Version exists | Choose different version | `references/troubleshooting.md` |
| PR not merged | Wait for review, don't skip | `references/detailed-workflow.md` |
| Publish partial | Use `from-package` flag | `references/rollback-recovery.md` |

**External resources:**

- npm package: https://www.npmjs.com/package/@fpkit/acss
- GitHub repo: https://github.com/shawn-sandy/fpkit
- Lerna docs: https://lerna.js.org/
- npm status: https://status.npmjs.org/

**Reference files:**

- `references/detailed-workflow.md` - Step-by-step instructions for each workflow step
- `references/rollback-recovery.md` - Recovery scenarios and fix-forward strategies
- `references/technical-reference.md` - OTP, Lerna behavior, environment variables
- `references/workflow-examples.md` - Real-world publish examples
- `references/troubleshooting.md` - Error messages and solutions

---

**END OF SKILL**
