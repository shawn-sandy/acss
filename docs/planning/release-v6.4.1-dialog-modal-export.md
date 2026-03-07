# Release Plan: @fpkit/acss v6.4.1

## Context

`DialogModal` was developed and included in v6.4.0 internally, but its public export was accidentally omitted from `packages/fpkit/src/index.ts`. This patch release adds that missing export so consumers can import `DialogModal` directly from `@fpkit/acss`.

**Change:** Add `export { DialogModal }` to `packages/fpkit/src/index.ts`
**Bump type:** Patch (`6.4.0` → `6.4.1`)

---

## Pre-flight Status

| Check | Status |
|-------|--------|
| Branch | `main` (clean, up to date) |
| Node | v24.10.0 (OK) |
| npm | 11.6.0 (OK) |
| npm auth | NOT LOGGED IN — must run `npm login` before Step 8 |
| Uncommitted change | `packages/fpkit/src/index.ts` — must commit to main first |
| Local version | 6.4.0 |
| npm registry version | 6.4.0 |

---

## Steps

1. **Commit the export fix to main**
   - Stage and commit `packages/fpkit/src/index.ts`
   - Message: `fix(dialog): export DialogModal from package index`

2. **Validate: build, lint, test**
   ```bash
   cd packages/fpkit
   npm run build && npm run lint && npm test
   cd ../..
   ```

3. **Create release branch**
   ```bash
   git checkout -b release/v6.4.1
   ```

4. **Bump version with Lerna**
   ```bash
   lerna version patch --no-push --no-git-tag-version
   ```
   - Updates `packages/fpkit/package.json` version to `6.4.1`

5. **Update CHANGELOG.md**
   - Add entry for `6.4.1` documenting the `DialogModal` export fix

6. **Commit version + changelog**
   ```bash
   git add packages/fpkit/package.json CHANGELOG.md
   git commit -m "chore(release): publish @fpkit/acss@6.4.1"
   ```

7. **Push branch and open PR**
   ```bash
   git push -u origin release/v6.4.1
   gh pr create --title "chore(release): publish @fpkit/acss@6.4.1" \
     --body "Patch release: exports DialogModal from package public API."
   ```

8. **After PR merge — publish**
   ```bash
   npm login   # Enter credentials + OTP
   git checkout main && git pull
   lerna publish from-package --yes --otp={6-digit-code}
   git push --follow-tags
   ```

9. **Cleanup**
   ```bash
   git branch -d release/v6.4.1
   git push origin --delete release/v6.4.1
   ```

---

## Files Modified

| File | Change |
|------|--------|
| `packages/fpkit/src/index.ts` | Add `export { DialogModal }` (already staged) |
| `packages/fpkit/package.json` | Version bump `6.4.0` → `6.4.1` (via Lerna) |
| `CHANGELOG.md` | Add `6.4.1` release notes |

---

## Verification

- After publish: `npm view @fpkit/acss version` should return `6.4.1`
- Install in a test project: `npm install @fpkit/acss@6.4.1`
- Verify import works: `import { DialogModal } from '@fpkit/acss'`
- Confirm Storybook still runs: `npm start` at repo root

---

## Unresolved Questions

None.
