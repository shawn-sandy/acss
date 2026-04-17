# Variant Conventions

This guide documents **how components expose variants** and **how SCSS selects on them**. The conventions here resolve a real tension: typed React props give compile-time safety, while `data-*` attributes drive the CSS cascade and let consumers override without re-rendering. We use both, deliberately.

## The Ratified Rule

> **Public API is a typed React prop. Styling hook is a `data-*` attribute the component writes internally.**

Consumers write:

```tsx
<Button variant="pill" color="primary" size="lg">Save</Button>
<Alert severity="error" variant="filled">Oops</Alert>
```

The component writes to the DOM:

```html
<button data-style="pill" data-color="primary" data-btn="lg">Save</button>
<div data-alert data-color="error" data-style="filled">Oops</div>
```

The SCSS matches on the attribute:

```scss
button[data-color="primary"] { --btn-bg: var(--color-primary); }
button[data-btn~="lg"]       { --btn-fs: var(--btn-size-lg); }
[data-alert][data-style="filled"] { /* … */ }
```

## The Three Axes

| Axis | Public prop | Internal attribute | Values |
|---|---|---|---|
| **Size / layout** | `size`, `block` | `data-{component}` (space-separated list) | `xs` `sm` `md` `lg` `xl` `2xl` `block` |
| **Visual style** | `variant` | `data-style` | component-specific: `outline` `pill` `text` `icon` `filled` `soft` |
| **Semantic intent** | `color`, `severity`, `intent` | `data-color` | `primary` `secondary` `danger` `success` `warning` `info` |

## Why Both?

**Typed props**:
- IDE autocomplete and type checking.
- JSDoc describes valid values.
- Self-documenting component API.

**Data attributes**:
- SCSS cascade without CSS-in-JS overhead.
- Consumers can override via devtools or inline style without forking the component.
- Space-separated list matching (`~=`) composes cleanly: `data-btn="lg block"`.
- Zero runtime cost for variant switching.

## Prop-Name Conventions by Component Type

Not every component uses every prop. The naming is intentionally consistent:

- **Style variants** → prop named `variant` (Button, Alert, Card).
- **Semantic color** → prop named `color` for generic (Button), `severity` for feedback components (Alert), `intent` for form fields.
- **Size** → prop named `size`. Some components (Button) also accept a raw `data-btn` pass-through for power users.

## SCSS Selector Patterns

### Exact match

```scss
&[data-color="primary"] { /* … */ }
```

### Whitespace-separated list match

For attributes that can hold multiple values (sizes can combine with `block`):

```scss
&[data-btn~="lg"]    { /* matches "lg", "lg block", "block lg" */ }
&[data-btn~="block"] { width: 100%; }
```

### State overlay

Combine with pseudo-classes:

```scss
&[data-color="primary"]:hover {
  --btn-bg: var(--color-primary-hover);
}
```

## Passing Arbitrary Data Attributes

Components should spread `...rest` onto the root element so consumers can pass their own data attributes without friction. The component's own data attributes take precedence.

```tsx
<Button data-testid="save-btn" data-color="primary">Save</Button>
// → <button data-testid="save-btn" data-color="primary">
```

## Consumer Override via CSS Variables

Because SCSS reads from `--btn-*` component tokens, consumers can override at any scope without attribute changes:

```css
.checkout-cta {
  --btn-bg: linear-gradient(…);
  --btn-color: white;
  --btn-radius: 2rem;
}
```

This is the third axis — arguably the most powerful — and lives alongside the prop/attribute system.

## Exceptions & Open Issues

- **Legacy**: a few older components (Text, Heading) still use className-based variants. These are slated for migration to the data-attribute pattern.
- **Custom props per component**: some components have component-specific props that don't fit the three-axis model (e.g., Alert's `dismissible`, Dialog's `modal`). These stay as typed React props and don't need data-attribute mirrors unless styling depends on them.
- **Alert uses `data-alert` + `data-variant` (documented exception)**: Alert exposes `severity` and `variant` props mapped to `data-alert={severity}` and `data-variant={variant}` rather than the generic `data-color` + `data-style`. This exception is deliberate:
  - `data-alert="error"` reads more semantically than `data-color="error"` — an alert *is* an error, not just coloured red.
  - The Alert SCSS has ~12 selectors tied to these attributes; a rename would cascade through every downstream consumer that overrides Alert styling.
  - Consumers can still access the same data via the public props (`severity`, `variant`); only the internal DOM selector differs.
  A future major version may add `data-color` / `data-style` as aliases alongside the current attributes to enable cross-component overrides; the rename itself is not planned.
- **SSR hydration**: data attributes serialize cleanly, so no hydration mismatch concerns.

## Migration Note

The prop-as-public, attribute-as-internal policy was ratified as part of Phase 1 of the design-system conversion. Earlier drafts considered an "attributes-only" policy (no typed enum props). That was rejected because losing compile-time safety for consumers was a bigger loss than avoiding the indirection cost of prop → attribute mapping.

See `docs/planning/i-want-to-convert-nested-waffle.md` (Phase 1, R2-7) for the stress-test finding that prompted this decision.
