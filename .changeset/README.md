# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation. Changesets replaces `lerna version` + `lerna publish` as the versioning authority; Lerna remains for task orchestration (`lerna run <script>` across packages) only.

## Adding a changeset

When you open a PR with a user-visible change, add a changeset:

```bash
npx changeset
```

Pick the packages you're changing, the semver bump (`patch` / `minor` / `major`), and write a one-line summary. The CLI drops a markdown file in `.changeset/` that you commit alongside your code.

## Release flow

- **On merge to `main`**: the `release.yml` workflow opens (or updates) a long-lived "Version Packages" PR that bumps versions and writes `CHANGELOG.md` entries for every pending changeset.
- **On merging the Version Packages PR**: the same workflow publishes to npm using the stored `NPM_TOKEN` secret.

This gives you a two-click release: (1) merge your feature PR; (2) merge the auto-generated Version Packages PR. No manual version bumps, no forgotten changelog entries.

## When NOT to add a changeset

Skip `npx changeset` for:

- Internal-only changes (CI, test refactors, docs that don't affect the package on npm)
- Typo fixes in comments
- Changes that only touch `apps/astro-builds` (the demo site is in `ignore` in the config)

For these, add `.changeset/empty.md` with an empty front-matter block if the workflow insists a changeset is required — but the `ignore` list usually covers it.

## Choosing a bump type

- `patch`: bug fixes, internal refactors that don't change the public API
- `minor`: new additive features, new exports, new props on existing components
- `major`: breaking changes — renamed props, removed components, changed behavior

When in doubt, default to `minor` for additions and `patch` for fixes. Breaking changes (`major`) require maintainer approval and a migration note in `packages/acss/MIGRATION-v7.md` (or the active migration guide).
