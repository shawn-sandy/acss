# Publish @fpkit/acss v6.4.3

## Context

Branch `chore/publish-modal` has 2 commits ahead of `main` since the v6.4.2 release:
- `fix(dialog)`: format export of DialogProps and DialogModalProps types
- `chore(package)`: update gitHead in package.json

Files changed: `packages/acss/package.json`, `packages/acss/src/index.ts`

These changes need to be merged to `main` before publishing. The fix commit warrants a **patch** bump: `6.4.2 → 6.4.3`.

---

## Plan

### Phase 1: Pre-flight validation

1. Confirm npm auth: `npm whoami` (expected: `shawnsandy`)
2. Confirm Node >= 22.12.0 and npm >= 8.0.0
3. Confirm `@fpkit/acss@6.4.3` does not already exist on npm registry

### Phase 2: Merge chore/publish-modal → main

4. Push `chore/publish-modal` to remote (already up to date)
5. Create PR: `chore/publish-modal → main`
   - Title: `fix(dialog): format export of DialogProps and DialogModalProps types`
6. Merge the PR after review

### Phase 3: Build & validate on main

7. Switch to `main` and pull latest
8. In `packages/acss/`, run sequentially:
   - `npm run build`
   - `npm run lint`
   - `npm test`
9. All must exit 0 before proceeding

### Phase 4: Create release branch

10. Create branch: `release/v6.4.3` from `main`
11. Run: `lerna version patch --no-push --no-git-tag-version`
    - Updates `packages/acss/package.json` version to `6.4.3`

### Phase 5: Update CHANGELOG

12. Add entry at top of `CHANGELOG.md`:

```
## [6.4.3] - 2026-03-07

### Fixed

- **Dialog type export formatting** — Corrected export format for `DialogProps`
  and `DialogModalProps` in the package index for proper type resolution.
```

13. Commit both changes:
    - Message: `chore(release): publish @fpkit/acss@6.4.3`

### Phase 6: PR review

14. Push `release/v6.4.3` to remote
15. Create PR: `release/v6.4.3 → main`
    - Title: `chore(release): publish @fpkit/acss@6.4.3`
16. Merge after review

### Phase 7: Publish to npm

17. Switch to `main` and pull latest
18. Request fresh OTP from authenticator app
19. Run: `lerna publish from-package --yes --otp={6-digit-code}`
20. Run: `git push --follow-tags`

### Phase 8: Cleanup

21. Delete release branch locally and remotely:
    - `git branch -d release/v6.4.3`
    - `git push origin --delete release/v6.4.3`
22. Verify on npm: `npm view @fpkit/acss version` (should return `6.4.3`)

---

## Key Files

- `packages/acss/package.json` — version field updated by Lerna (Step 11)
- `CHANGELOG.md` — release notes added (Step 12)
- `packages/acss/src/index.ts` — already updated on `chore/publish-modal`

---

## Verification

- `npm view @fpkit/acss version` returns `6.4.3`
- `npm view @fpkit/acss@6.4.3` shows correct metadata
- GitHub shows merged release PR and new tag `v6.4.3`
