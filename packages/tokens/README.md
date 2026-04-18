# @fpkit/tokens

Design tokens for the `@fpkit/acss` design system.

Ships two artifacts:

- **`@fpkit/tokens`** — typed TypeScript module exporting `tokens` and `Tokens` type. Each leaf is a CSS `var(...)` reference so consumers pick up theme switches at runtime.
- **`@fpkit/tokens/tokens.json`** — flat DTCG-compliant JSON. Suitable for Figma Tokens Studio, CDN consumption, or any non-JS tooling.

## Install

```bash
npm install @fpkit/tokens
```

No runtime dependencies. Works in any JS runtime that supports ES2022.

## Usage

### Typed tokens (TypeScript)

```ts
import { tokens } from '@fpkit/tokens';

const brand = tokens.color.primary;
// => "var(--color-primary)"
```

The return value is a CSS custom property reference, not a resolved value. That means consumers can switch themes (e.g., light/dark) without rebundling and the token reference still resolves correctly.

### Raw JSON

```ts
import tokens from '@fpkit/tokens/tokens.json';
```

The JSON follows the [Design Tokens Community Group](https://www.designtokens.org/) spec. Use this for Figma bridges, documentation sites, or any non-JavaScript consumer.

## Source of truth

SCSS tokens in [`packages/acss/src/sass/tokens/`](../acss/src/sass/tokens/) are the source of truth. A build pipeline (see [`packages/acss/scripts/extract-tokens.mjs`](../acss/scripts/extract-tokens.mjs) and [`style-dictionary.config.mjs`](../acss/style-dictionary.config.mjs)) extracts those tokens and emits this package's artifacts.

## License

MIT
