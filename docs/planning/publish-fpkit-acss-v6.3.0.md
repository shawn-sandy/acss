# Plan: Publish @fpkit/acss v6.3.0 (Minor Release)

## Context

Current version is `6.2.0`. User requests minor bump to `6.3.0`. The `feat/buttom-updates`
branch contains button component updates (new sizes, pill fix, IconButton, Popover). Breaking
changes acknowledged; user confirmed minor bump. Branch is clean and up to date.

## Pre-flight State

| Check | Status |
|-------|--------|
| Current branch | `feat/buttom-updates` (must merge to main first) |
| Current version | 6.2.0 |
| Target version | 6.3.0 |
| Node | v24.10.0 ✅ |
| npm | 11.6.0 ✅ |
| Working tree | Clean ✅ |

---

## Steps

### Phase A — Merge Feature Branch to Main

1. Create PR: `feat/buttom-updates` → `main`
   ```bash
   git checkout main && git pull
   gh pr create --title "feat(button): button updates, IconButton, Popover" \
     --base main --head feat/buttom-updates
   ```
2. User reviews and merges PR.
3. Pull main:
   ```bash
   git checkout main && git pull
   ```

### Phase B — Build & Validate

4. Run full validation from `packages/fpkit/`:
   ```bash
   cd packages/fpkit
   npm run build && npm run lint && npm test
   cd ../..
   ```

### Phase C — Release Branch

5. Create release branch:
   ```bash
   git checkout -b release/v6.3.0
   ```

### Phase D — Bump Version & CHANGELOG

6. Bump version with Lerna (no push, no tag yet):
   ```bash
   lerna version minor --no-push --no-git-tag-version
   ```
   Confirms `packages/fpkit/package.json` → `6.3.0`

7. Update `CHANGELOG.md` — add `## [6.3.0] - 2026-02-18` section with:
   - New: xl/2xl button sizes, IconButton component, Popover component
   - Fix: `.btn-pill` scoped to `button` element
   - Breaking: `--btn-bg` default changed to `--color-primary`, height multiplier 2.25→2.75

8. Commit changes:
   ```bash
   git add packages/fpkit/package.json CHANGELOG.md
   git commit -m "chore(release): publish @fpkit/acss@6.3.0"
   ```

### Phase E — PR & Publish

9. Push release branch and create PR:
   ```bash
   git push -u origin release/v6.3.0
   gh pr create --title "chore(release): publish @fpkit/acss@6.3.0" \
     --base main --body "Minor release — button updates, IconButton, Popover"
   ```

10. User reviews PR and merges.

11. Pull main, then publish (requires fresh OTP):
    ```bash
    git checkout main && git pull
    lerna publish from-package --yes --otp={6-digit-OTP}
    git push --follow-tags
    ```

12. Cleanup:
    ```bash
    git branch -d release/v6.3.0
    git push origin --delete release/v6.3.0
    ```

13. Verify: `npm view @fpkit/acss version` → should return `6.3.0`

---

## Critical Files

- `packages/fpkit/package.json` — version field updated by Lerna (Step 6)
- `CHANGELOG.md` — manually updated (Step 7)
- `lerna.json` — read-only reference

## Unresolved Questions

- None. User confirmed minor bump; branch is clean and ready.
