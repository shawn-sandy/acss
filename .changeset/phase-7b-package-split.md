---
"@fpkit/tokens": minor
"@fpkit/icons": minor
"@fpkit/acss": minor
---

Phase 7B — split the @fpkit design system into three installable packages.

**New: `@fpkit/tokens@0.1.0`** — DTCG-compliant `tokens.json` plus a typed
TypeScript module (`tokens.color.primary` → `var(--color-primary)`). Zero
runtime dependencies. Aimed at designers (Figma Tokens Studio, etc.) and
non-JS consumers who want just the tokens without the component library.

**New: `@fpkit/icons@0.1.0`** — 33 React SVG icons with a tiny, self-contained
types surface. React 18+ as a peer dependency. Tree-shakeable named exports
(`import { Add, ArrowRight } from '@fpkit/icons'`). No dependency on the rest
of the design system.

**Changed: `@fpkit/acss`** — now depends on `@fpkit/tokens` and `@fpkit/icons`
via local `file:` links. Internally:

- Icon component sources moved to `@fpkit/icons`; the `Icon` wrapper (which
  depends on the internal `UI` primitive) stays in acss and re-exports each
  icon as a static property (`Icon.Add`, etc.), so the `@fpkit/acss/icons`
  subpath keeps working for existing consumers with no code change.
- The SCSS → Style Dictionary pipeline now emits the canonical tokens into
  `@fpkit/tokens/`; a shim copy at `packages/acss/libs/tokens.json` keeps the
  legacy `@fpkit/acss/tokens` subpath working.
- The `packages/fpkit/` directory was renamed to `packages/acss/` to match
  the published package name (administrative cleanup; no consumer impact).

No runtime/behavioural changes for any consumer. All existing subpath imports
continue to resolve through shim re-exports.
