# Design Principles

`@fpkit/acss` is a design system disguised as a component library. These principles explain the choices behind it so contributors and consumers can extend it consistently.

## 1. Accessibility-First

Accessibility is not a review gate; it is the starting point.

- Every interactive component is keyboard operable, announces itself to screen readers, and meets **WCAG 2.1 Level AA** minimum contrast.
- Disabled states use `aria-disabled` (via `useDisabledState`) so they remain in tab order, per WCAG 2.1.1.
- Focus is always visible and intentional; the `:focus-visible` outline is a design element, not a leftover.
- Semantic HTML comes before ARIA. We reach for `<button>`, `<nav>`, `<dialog>` before we reach for `role="…"`.

If a choice improves visual polish but degrades accessibility, we change the visual choice.

## 2. Composition Over Configuration

Components combine to do more than any single component offers.

- Prefer **small primitives** (`Box`, `Stack`, `Cluster`, `Grid`, `Flex`) that compose, over monolithic components with many flags.
- Expose a polymorphic `as` prop on base components so a `Box` can be a `section`, a `Stack` can be a `nav`, and the right semantics always win.
- Subcomponents (e.g., `Card.Title`, `Card.Content`, `Card.Footer`) give consumers layout control without growing the parent's prop surface.
- Avoid prop explosions. If a component needs more than ~10 props, split it or expose slots.

When in doubt: can this be done with composition? Do it with composition.

## 3. Tokens as Contract

CSS custom properties are the theming contract between the library and its consumers.

- The three-tier token system is load-bearing:
  1. **Primitives** (`--color-neutral-0`…`900`, `--color-blue-600`) — raw values. Rarely consumed directly.
  2. **Semantic tokens** (`--color-primary`, `--color-surface`, `--color-text`) — intent. Reference these from component SCSS.
  3. **Component tokens** (`--btn-bg`, `--card-header-padding`) — consumer overrides. Reference semantic tokens internally.
- Naming follows the pattern in `docs/css-variables.md`. No shorthand that sacrifices clarity (`--btn-padding-inline`, not `--btn-px`).
- Consumers override at any tier. Global brand change → override semantic. One-off visual → override component-scoped.
- No hex literals in component SCSS. Colors always resolve through a semantic token.

## 4. Opinionated Where It Matters, Flexible Where It Doesn't

We have opinions on architecture and none on aesthetics.

- **Opinionated**: SCSS + CSS variables (no Tailwind), rem units (no px), `data-*` variant conventions, functional React + TypeScript strict, WCAG AA.
- **Flexible**: every visual choice is themeable via tokens. Consumers can build a brutalist site or a Material-inspired one on the same library.
- New abstractions pay their way. Three similar lines is better than a premature helper.

## 5. Lifecycle Honesty

Every component has a maturity level, and we say so.

- Stories are tagged: `experimental` → `beta` → `rc` → `stable` → `deprecated`. See `component-lifecycle.md` for the criteria.
- We deprecate loudly before removing; removals land only on major versions with migration guides.
- If a component doesn't have tests, stories, and accessibility coverage, it isn't `stable`.

## 6. Readable Machines, Readable Humans

Code, styles, and docs should make sense to both compilers and humans.

- JSDoc on public APIs. Prop interfaces are documentation.
- TypeScript strict — no `any`, no `@ts-ignore` without justification.
- Comments explain the *why*, never the *what*. Well-named identifiers do the "what."
- Commit messages follow Conventional Commits so the changelog writes itself.

## 7. Small Blast Radius

Changes to shared systems (tokens, base components, conventions) affect every consumer.

- **Breaking changes are a ceremony**: RFC in `openspec/changes/`, migration guide, major version bump.
- **Non-breaking changes are the default**: additive props, new variants, new tokens.
- Aliases and deprecation warnings cushion renames for at least one minor version.

---

**In short**: build the smallest thing that passes the accessibility bar, compose it with tokens as the public surface, and don't break people on the way to improving it.
