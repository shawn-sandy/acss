# Publish @fpkit/acss@6.5.0

## Context

Dialog component received significant updates since v6.4.3: size/position props, IconButton refactor, centering fixes, and layout/full-size variant styles. These warrant a minor version bump (6.5.0). The `build/dialog-updates` branch has 1 unmerged commit that should be included.

## Pre-conditions

- [ ] npm authentication working (`npm whoami` succeeds) — user must run `npm login` first
- [ ] `build/dialog-updates` merged to `main`

## Steps

### Phase 1: Merge branch to main

1. Create PR from `build/dialog-updates` → `main`
2. Wait for user to approve/merge the PR
3. Switch to `main` and pull latest

### Phase 2: Validate

4. Run build: `cd packages/fpkit && npm run build`
5. Run lint: `npm run lint`
6. Run tests: `npm test`
7. Confirm `npm whoami` succeeds (user must `npm login` if not)

### Phase 3: Release branch

8. Create branch `release/v6.5.0` from `main`
9. Run `lerna version minor --no-push --no-git-tag-version`
10. Update `CHANGELOG.md` with release notes
11. Commit version bump + changelog
12. Push branch, create PR: `chore(release): publish @fpkit/acss@6.5.0`

### Phase 4: Publish

13. After PR merge, switch to `main` and pull
14. Run `lerna publish from-package --yes --otp={code}`
15. Push tags: `git push --follow-tags`
16. Clean up release branch (local + remote)

### Phase 5: Verify

17. `npm view @fpkit/acss version` returns `6.5.0`
18. `npm view @fpkit/acss dist-tags` shows `latest: 6.5.0`

## Key files

- `packages/fpkit/package.json` — version field
- `CHANGELOG.md` — release notes
- `lerna.json` — versioning config

## Blockers

- **npm auth failing (401)** — user must run `npm login` before Step 7
