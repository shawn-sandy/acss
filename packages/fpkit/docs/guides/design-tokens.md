# Design Tokens Guide

@fpkit/acss ships a DTCG-compliant JSON token artifact at `@fpkit/acss/tokens`, plus a typed TypeScript companion that resolves to CSS custom properties. This guide covers the shape of that artifact and how to consume it.

- [Why tokens, not just CSS variables?](#why-tokens-not-just-css-variables)
- [Shipped categories](#shipped-categories)
- [The JSON artifact — `@fpkit/acss/tokens`](#the-json-artifact--fpkitacsstokens)
- [The typed TS artifact — `src/tokens/index.ts`](#the-typed-ts-artifact--srctokensindexts)
- [Consumption patterns](#consumption-patterns)
- [The build pipeline](#the-build-pipeline)
- [Relationship to CSS variables](#relationship-to-css-variables)

---

## Why tokens, not just CSS variables?

The component library has always exposed CSS custom properties for styling (see [CSS Variables Guide](./css-variables.md)). Those are the *consumer-facing override surface* — what you set in your app's CSS to theme the library.

Design tokens are a separate concern: a *portable, machine-readable description* of the design system's values. They unlock:

- **Figma bridges** — the Figma plugin reads the JSON and offers tokens as Figma variables, so designers pick from the same palette the code uses.
- **Docs sites** — the Astro docs app at [apps/astro-builds/](../../../../apps/astro-builds/) renders Foundations pages ([Colors](../../../../apps/astro-builds/src/pages/foundations/colors.astro), [Typography](../../../../apps/astro-builds/src/pages/foundations/typography.astro), [Spacing](../../../../apps/astro-builds/src/pages/foundations/spacing.astro), [Motion](../../../../apps/astro-builds/src/pages/foundations/motion.astro)) straight from the JSON, so the docs stay in sync with the library automatically.
- **Cross-platform consumers** — any tool that speaks DTCG (native iOS/Android, Qt, Flutter generators) can consume the same tokens.

**SCSS is the source of truth**, not JSON. Designers and library authors edit SCSS tokens in [packages/fpkit/src/sass/tokens/](../../src/sass/tokens/); the JSON is a generated artifact rebuilt by `npm run tokens:build`.

---

## Shipped categories

As of v6.5, the extracted JSON covers **three** categories:

| Category | Source | Notes |
|---|---|---|
| **Color** | [_color-primitives.scss](../../src/sass/tokens/_color-primitives.scss), [_color-semantic.scss](../../src/sass/tokens/_color-semantic.scss) | Two tiers: primitive scales (neutral, blue, green, red, amber, cyan — each with 100–900 steps) and semantic mappings (`primary`, `secondary`, `success`, `error`, `warning`, `info`, `surface`, `text`, etc.). Semantic mappings nest their own `.hover` and `.active` variants. Dark-mode overrides live in `[data-theme="dark"]` blocks in SCSS and are extracted into a per-token `$extensions.com.fpkit.themeModes.dark` slot. |
| **Motion** | [_motion.scss](../../src/sass/tokens/_motion.scss) | Durations (`instant`, `fast`, `base`, `slow`, `slower`) and easings (`standard`, `accelerate`, `decelerate`, `emphasized`). |
| **Breakpoints** | [_breakpoints.scss](../../src/sass/tokens/_breakpoints.scss) | Responsive layout thresholds in `rem` (`reflow` 20rem, `xs` 23.4375rem, `sm` 30rem, `md` 48rem, `lg` 62rem, `xl` 80rem, `2xl` 96rem). |

**Not yet in the token pipeline** (but exposed as CSS variables):

- **Typography** — font families, sizes, weights, line heights. Planned for a future tokens pass; today they live in [_type.scss](../../src/sass/_type.scss) and component-scoped SCSS.
- **Spacing** — a spacing scale is not yet centrally defined as tokens; components reference literal `rem` values or component-scoped variables like `--btn-padding-inline`.

Track the roadmap for typography + spacing in [MIGRATION-v7.md](../../MIGRATION-v7.md).

---

## The JSON artifact — `@fpkit/acss/tokens`

Exposed via the package subpath export:

```ts
import tokens from '@fpkit/acss/tokens';
```

The artifact is DTCG-formatted (Design Tokens Community Group spec), produced by Style Dictionary. As of v6.5, 129 tokens extract from the SCSS sources.

**Top-level categories:** `color`, `duration`, `ease`, `breakpoint`.

Each leaf has `$value` and `$type`. Semantic colors nest their own `hover`/`active` variants. Dark-mode values live inside a per-token `$extensions.com.fpkit.themeModes.dark` slot — not a separate theme slice. Shape sketch:

```jsonc
{
  "color": {
    "blue": {
      "600": {
        "key": "{color.blue.600}",
        "$value": "#2563eb",
        "$type": "color",
        "path": ["color", "blue", "600"]
        // ...plus Style Dictionary metadata: name, attributes, original, filePath, isSource
      }
      // ...full neutral, blue, green, red, amber, cyan scales
    },
    "primary": {
      "$value": "#2563eb",
      "$type": "color",
      "$extensions": {
        "com.fpkit.themeModes": { "dark": "#3b82f6" }
      },
      "hover":  { "$value": "#1d4ed8", "$extensions": { "com.fpkit.themeModes": { "dark": "#60a5fa" } } },
      "active": { "$value": "#1e40af", "$extensions": { "com.fpkit.themeModes": { "dark": "#93c5fd" } } }
    },
    "error":   { "$value": "#dc2626", /* same nesting as primary */ },
    "success": { /* ... */ },
    "warning": { /* ... */ },
    "surface": { /* ... */ },
    "text":    { /* ... */ }
    // full list of semantic groups: primary, secondary, success, error, warning, info,
    // surface, border, text, focus, ui, hover, active, disabled, link, required,
    // valid, invalid, skip
  },
  "duration":   { "instant": {...}, "fast": {...}, "base": {...}, "slow": {...}, "slower": {...} },
  "ease":       { "standard": {...}, "accelerate": {...}, "decelerate": {...}, "emphasized": {...} },
  "breakpoint": { "reflow": {...}, "xs": {...}, "sm": {...}, "md": {...}, "lg": {...}, "xl": {...}, "2xl": {...} }
}
```

Every leaf also carries Style Dictionary's bookkeeping (`name`, `attributes`, `original`, `filePath`, `isSource`) — useful if you're building tooling on top, ignorable if you only need `$value` and `$type`.

> **Check the actual shape before building against it.** Run `npm run tokens:build` once in `packages/fpkit/` and inspect the output at `packages/fpkit/libs/tokens.json` — the sketch above is a shape guide, not a frozen contract.

### Reading dark-mode values

For tools that need both light and dark (Figma plugins with multiple modes, cross-platform theming):

```ts
import tokens from '@fpkit/acss/tokens';

const light = tokens.color.primary.$value;                                        // "#2563eb"
const dark  = tokens.color.primary.$extensions?.['com.fpkit.themeModes']?.dark;   // "#3b82f6"
```

Not every token defines a dark override — primitives (like `color.blue.600`) don't need one because only the semantic mappings flip. If `$extensions` is absent, the light value is used in both modes.

---

## The typed TS artifact — `src/tokens/index.ts`

The same build step also emits a TypeScript module where each token resolves to a **CSS variable reference**, not a raw value:

```ts
// Generated file — do not edit by hand
export const tokens = {
  color: {
    primary:      `var(--color-primary)`,
    primaryHover: `var(--color-primary-hover)`,
    error:        `var(--color-error)`,
    // ...
  },
  duration: {
    base: `var(--duration-base)`,
    fast: `var(--duration-fast)`,
  },
  // ...
} as const;

export type Tokens = typeof tokens;
```

This is the module you want for **runtime theme switching**. Because each entry is a `var()` reference, the resolved color follows whatever `[data-theme]` is active on `<html>` — no rebuild required.

```tsx
import { tokens } from '@fpkit/acss/tokens'; // typed export

const styles = {
  color: tokens.color.primary,     // "var(--color-primary)"
  transition: `color ${tokens.duration.base} ${tokens.ease.standard}`,
};

<div style={styles}>Themed at runtime</div>;
```

> **Two outputs, different jobs:** The JSON is the *design-system artifact* (cross-platform, portable). The TS module is the *React runtime convenience* (typed, theme-aware at runtime). Most apps want the TS module; tools want the JSON.

---

## Consumption patterns

### Using tokens in a Next.js or Astro docs site

Import the JSON directly and render it — that's how the fpkit Astro docs site renders its [Foundations pages](../../../../apps/astro-builds/src/pages/foundations/). Reference implementation:

```tsx
import tokens from '@fpkit/acss/tokens';

export function ColorSwatches() {
  return (
    <ul>
      {Object.entries(tokens.color)
        .filter(([, v]) => '$value' in v)
        .map(([name, v]) => (
          <li key={name} style={{ background: v.$value }}>{name}</li>
        ))}
    </ul>
  );
}
```

### Feeding a Figma bridge

Point your Figma plugin at the JSON path (`node_modules/@fpkit/acss/libs/tokens.json`) or the SCSS-to-Figma variable bridge of your choice. The DTCG `$type` fields map one-to-one with Figma's variable types (`color`, `number`, `string`).

### Generating custom CSS at build time

If you want a CSS output keyed on your own prefix (e.g. `--mybrand-*` instead of `--color-*`), feed `tokens.json` into Style Dictionary with a custom transform:

```js
// Your build script
import tokens from '@fpkit/acss/tokens';
// ...run through style-dictionary or your preferred generator
```

### Dark-theme-aware consumers

For tools that need both light and dark values (e.g. a Figma plugin with two token modes), read each semantic token's `$value` for the light value and `$extensions["com.fpkit.themeModes"].dark` for the dark value. Primitive scales don't carry dark overrides — only semantic mappings do.

---

## The build pipeline

Two stages, orchestrated by `npm run tokens:build` in `packages/fpkit/`:

1. **Extract** — [scripts/extract-tokens.mjs](../../scripts/extract-tokens.mjs) compiles [src/sass/tokens/_index.scss](../../src/sass/tokens/_index.scss) via Sass, walks the resulting CSS AST with PostCSS, and emits a DTCG-formatted intermediate at `tokens/generated/source.json`.
2. **Build** — [style-dictionary.config.mjs](../../style-dictionary.config.mjs) reads that intermediate and writes two outputs:
   - `libs/tokens.json` — the artifact consumed by external tools (Figma, docs site, native apps)
   - `src/tokens/index.ts` — the typed TS module consumed by React apps

The full library build (`npm run build`) runs `tokens:build` first, so `libs/tokens.json` is always in sync with the compiled JS. The Astro docs site guards against stale state via an `ensure-fpkit-build` prescript that rebuilds the library if `libs/tokens.json` is missing.

### Regenerating after editing SCSS

```bash
cd packages/fpkit
npm run tokens:build
```

Then commit both generated files along with your SCSS edits — they're checked into the repo so consumers using the package as a workspace dependency don't need to rebuild.

---

## Relationship to CSS variables

Tokens and CSS variables are two views of the same underlying data:

| Aspect | CSS Variables (`--color-primary`) | Tokens (`@fpkit/acss/tokens`) |
|---|---|---|
| Authored in | SCSS | Generated from SCSS |
| Changes at runtime | Yes — live under `[data-theme]` switching | The JSON is static; the TS `var()` references are live |
| Who sets overrides | Consumer's CSS (your `:root` rules) | Tokens are read-only to consumers |
| What to use for | Component styling, theme overrides | Design-system tooling (Figma, docs, cross-platform) |
| Discovery | IDE autocomplete on `--`, see [CSS Variables Guide](./css-variables.md) | TypeScript autocomplete on `tokens.` |

Use the CSS variables for *styling decisions* (what a component looks like). Use the tokens for *system decisions* (what colors and motion the whole library offers).

---

## See also

- [Theming Guide](./theming.md) — runtime light/dark switching that flips the tokens live
- [CSS Variables Guide](./css-variables.md) — the consumer-facing override surface
- [Foundations pages in the Astro docs site](../../../../apps/astro-builds/src/pages/foundations/) — live reference rendered directly from these tokens
