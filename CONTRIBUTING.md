# Contributing to @fpkit/acss

Thank you for considering a contribution. This guide covers how to propose changes, where to file plans, and what quality bars apply to code, styles, and documentation.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Where to File Plans and Proposals](#where-to-file-plans-and-proposals)
- [Proposing Substantive Changes (RFCs)](#proposing-substantive-changes-rfcs)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Style, Testing, and Accessibility Bars](#style-testing-and-accessibility-bars)
- [Release Process](#release-process)

---

## Code of Conduct

All participants are expected to act in good faith, credit others, and keep discussion focused on the work. Report concerns via issue or direct maintainer contact.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install` at the monorepo root.
3. Start the Storybook dev server: `npm start` (serves on port 6006 and watches every package).
4. Run tests for the main package: `cd packages/fpkit && npm test`.
5. See `CLAUDE.md` (root) and `packages/fpkit/CLAUDE.md` for project structure, commands, and conventions.

## Where to File Plans and Proposals

This repo historically uses three plan directories. **Going forward, please follow this policy:**

| Directory | Purpose | When to Use |
|---|---|---|
| `openspec/changes/` | Formal change proposals with specs | **RFC-grade changes**: new public APIs, breaking changes, cross-component conventions, architectural shifts. Must include `proposal.md`, `tasks.md`, and `specs/`. |
| `openspec/plans/` | Long-lived implementation plans tied to OpenSpec proposals | Multi-week implementation tracks for approved OpenSpec proposals. |
| `.claude/plans/` | Personal/working plans for a single contributor's current task | Short-lived planning notes for in-flight work. Not source of truth. |
| `docs/planning/` | **Deprecated for new plans.** Historical archive only. | Do not add new files here. Existing files are preserved for history. **Explicit exception:** the cross-cutting design-system roadmap `docs/planning/i-want-to-convert-nested-waffle.md` lives here because it spans every directory covered by OpenSpec (tokens, components, CI, docs site) — a single-spec home would misrepresent its scope. New plans still go to `openspec/plans/` or `openspec/changes/` unless they have the same scale. |

**Decision tree:**

- Is this a public-API or convention change? → `openspec/changes/` (start with `openspec:proposal` skill).
- Is this an approved OpenSpec proposal you're implementing? → `openspec/plans/`.
- Is this a quick task plan for your own use? → `.claude/plans/`.
- Everything else → prefer Issues/PRs over plan files.

**Duplicate avoidance**: Before creating a plan, search both `openspec/plans/` and `.claude/plans/` by topic. If you find an existing plan, extend it rather than duplicating. Two current offenders (`checkbox-component-implementation.md`, `fpkit-mcp-server-implementation.md`) live in both directories — we are consolidating these to `openspec/plans/` only.

**`.backup` files are not a version-control convention.** Use git branches, stashes, or `openspec/changes/` for in-flight work. Committed `.backup` files will be removed.

## Proposing Substantive Changes (RFCs)

For changes that affect the public API, variant conventions, tokens, or architecture, open an OpenSpec proposal in `openspec/changes/<change-slug>/`. A proposal must include:

- `proposal.md` — what and why, alternatives considered
- `tasks.md` — breakdown of the implementation
- `specs/` — before/after specs for each affected capability
- `design.md` (optional) — architectural notes for complex changes

Use the `openspec:proposal` skill to scaffold. Reviewers look for: clear problem statement, stated non-goals, migration plan, accessibility impact.

**Small changes** (bug fixes, single-component tweaks, docs fixes) do not require an OpenSpec proposal — open a PR directly.

## Development Workflow

1. Create a topic branch from `main` (e.g., `feat/alert-dark-mode`, `fix/button-focus-ring`).
2. Make changes with tests and stories.
3. Run local checks: `npm run lint`, `npm test`, `npm run build` from `packages/fpkit/`.
4. Open a PR against `main`. Describe the change, link any OpenSpec proposal, and include Storybook screenshots for visual changes.
5. Respond to review; squash-merge when approved.

## Commit Conventions

We follow **Conventional Commits**. Prefixes in use: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`. Scope with the package or component: `feat(alert): add autoHideDuration`, `fix(button): restore focus-visible outline`, `docs(planning): add roadmap`.

Breaking changes get `!` and a `BREAKING CHANGE:` footer: `feat(alert)!: rename severity prop to intent`.

## Style, Testing, and Accessibility Bars

- **Units**: rem only in SCSS. No px.
- **No Tailwind**. SCSS + CSS custom properties only.
- **CSS variables**: follow the standard in `packages/fpkit/docs/guides/css-variables.md` — no `--btn-px` / `--btn-cl` / `--btn-rds` style names.
- **Colors in component SCSS**: reference semantic tokens (`--color-primary`, `--color-text-inverse`). No hex/rgb literals.
- **TypeScript**: strict mode; explicit prop interfaces with JSDoc.
- **Tests**: Vitest + React Testing Library. Every component gets a `.test.tsx` and a `.stories.tsx` with at least one play function.
- **Accessibility**: WCAG 2.1 AA minimum. Keyboard navigation, visible focus, semantic HTML, ARIA only where HTML can't express the semantic. The Storybook a11y addon should report no violations.
- **Disabled state**: use the `useDisabledState` hook from `#hooks/use-disabled-state` so components stay keyboard-reachable (`aria-disabled`, not native `disabled`).
- **Variants**: follow `.claude/rules/component-conventions.md` — `data-{component}` for size/layout, `data-style` for appearance, `data-color` for semantic intent. See `packages/fpkit/docs/guides/variants.md` for the prop-vs-attribute policy.

See `packages/fpkit/docs/guides/` for deep-dives on accessibility, architecture, composition, testing, CSS variables, and Storybook.

## Release Process

Releases use the `npm-monorepo-publish` skill. The workflow is:

1. Work merges to `main`.
2. A release-branch PR bumps versions and assembles a changelog.
3. After review, the skill runs `npm publish` with OTP/2FA.

Do **not** bump major versions without explicit approval from maintainers. See `.claude/rules/publishing.md` for the full procedure.

---

Questions? Open a discussion or ping a maintainer. Every contribution — code, docs, issue triage — is appreciated.
