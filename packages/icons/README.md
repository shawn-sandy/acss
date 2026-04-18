# @fpkit/icons

Tree-shakeable React SVG icon set for the [`@fpkit/acss`](../acss) design system.

## Install

```bash
npm install @fpkit/icons
```

React 18 or 19 is a required peer dependency.

## Usage

Each icon is exported as a named React component:

```tsx
import { Add, ArrowRight, AlertSolid } from '@fpkit/icons';

<button>
  <Add size={20} />
  Add item
</button>
```

Icons are decorative by default and accept a small set of presentation props (`fill`, `size`, `strokeColor`, `styles`, `role`, `alt`). For semantic icons — e.g. an icon-only button — use an accessible wrapper (the `Icon` component in `@fpkit/acss`, or your own).

```tsx
import { Remove } from '@fpkit/icons';

// ❌ No accessible name — screen readers will announce nothing useful
<button><Remove /></button>

// ✅ Provide an accessible name on the button
<button aria-label="Close dialog">
  <Remove aria-hidden="true" />
</button>
```

## Relationship to `@fpkit/acss`

`@fpkit/acss` re-exports every icon from this package via its `./icons` subpath import, so existing consumers using `@fpkit/acss/icons` keep working with no code change. New consumers should import from `@fpkit/icons` directly.

```tsx
// Works (backward-compatible shim):
import { Add } from '@fpkit/acss/icons';

// Preferred (direct, smaller install):
import { Add } from '@fpkit/icons';
```

## License

MIT
