/**
 * Backward-compat shim for the `@fpkit/acss/icons` subpath export.
 *
 * Post-Phase 7B, the individual SVG icons live in `@fpkit/icons`; the `Icon`
 * wrapper (which depends on acss-internal primitives like `UI`) stays here.
 * The wrapper attaches every icon as a static property (Icon.Add etc.), so
 * legacy usage of `import { Icon } from '@fpkit/acss/icons'` keeps working.
 * New consumers should prefer `import { Add } from '@fpkit/icons'`.
 */
export * from './components/icons/icon'
