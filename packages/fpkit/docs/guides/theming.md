# Theming Guide

@fpkit/acss ships a small theming runtime — `ThemeProvider`, `useTheme`, `ThemeToggle`, and `getThemeFoucScript` — for shipping light/dark themes without a flash of the wrong colors on first paint.

This guide covers:

- [How it works](#how-it-works)
- [Quick start](#quick-start)
- [`ThemeProvider`](#themeprovider)
- [`useTheme`](#usetheme)
- [`ThemeToggle`](#themetoggle)
- [Preventing theme flash (SSR)](#preventing-theme-flash-ssr)
- [Creating a custom theme](#creating-a-custom-theme)
- [API reference](#api-reference)
- [Accessibility notes](#accessibility-notes)
- [Verification & troubleshooting](#verification--troubleshooting)

---

## How it works

The runtime is built on a single DOM contract: a `data-theme="light|dark"` attribute on `<html>`. All theme-dependent CSS variables are re-declared under `[data-theme="dark"]` selectors in [packages/fpkit/src/styles/tokens/](../../src/sass/tokens/), so toggling the attribute switches every token-driven component at once — no re-render required.

Responsibilities split three ways:

- **`ThemeProvider`** owns the user's *preference* (`"light"`, `"dark"`, or `"system"`), resolves `"system"` against `prefers-color-scheme`, and writes `data-theme` on every change.
- **`useTheme`** reads/writes preference from React components.
- **`getThemeFoucScript()`** returns a tiny inline script (<500 bytes) for SSR consumers to apply the stored preference *before* React hydrates — otherwise you see a flash of the server-rendered default.

The preference is persisted to `localStorage` under the key `"fpkit-theme-preference"` (configurable via `ThemeProvider`'s `storageKey` prop).

---

## Quick start

Wrap your app:

```tsx
import { ThemeProvider, ThemeToggle } from '@fpkit/acss';

function App() {
  return (
    <ThemeProvider defaultPreference="system">
      <header>
        <ThemeToggle />
      </header>
      <main>{/* your app */}</main>
    </ThemeProvider>
  );
}
```

That's enough for a client-only app. For SSR, see [Preventing theme flash (SSR)](#preventing-theme-flash-ssr).

---

## `ThemeProvider`

Context provider that owns theme state. Place it once, as high in the tree as possible.

```tsx
import { ThemeProvider } from '@fpkit/acss';

<ThemeProvider
  defaultPreference="system"           // "light" | "dark" | "system"
  storageKey="my-app-theme-preference" // optional, namespace per app
>
  {children}
</ThemeProvider>
```

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `children` | `ReactNode` | — | Subtree that can read theme via `useTheme` |
| `defaultPreference` | `"light" \| "dark" \| "system"` | `"system"` | Initial preference before the stored value loads |
| `storageKey` | `string` | `"fpkit-theme-preference"` | Where the preference persists in `localStorage` |

**What it does on mount:**

1. Reads `localStorage[storageKey]` — falls back to `defaultPreference` if missing.
2. Resolves `"system"` against `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Sets `data-theme` on `<html>`.
4. Subscribes to `prefers-color-scheme` change events so "system" mode stays in sync when the OS theme changes at runtime.

---

## `useTheme`

Hook that exposes the current state and setters. **Must be called inside a `ThemeProvider`** — it throws otherwise, intentionally, to prevent the silent desync bugs that default-to-light fallbacks cause.

```tsx
import { useTheme } from '@fpkit/acss';

function ProfileMenu() {
  const { theme, preference, setPreference, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current: {theme}</p>          {/* "light" | "dark" — never "system" */}
      <p>Preference: {preference}</p>  {/* "light" | "dark" | "system" */}

      <button onClick={() => setPreference('light')}>Light</button>
      <button onClick={() => setPreference('dark')}>Dark</button>
      <button onClick={() => setPreference('system')}>Match system</button>

      <button onClick={toggleTheme}>Cycle light → dark → system</button>
    </div>
  );
}
```

| Field | Type | Notes |
|---|---|---|
| `preference` | `"light" \| "dark" \| "system"` | What the user asked for |
| `theme` | `"light" \| "dark"` | What's actually applied right now |
| `setPreference` | `(next) => void` | Persists to `localStorage` and updates DOM |
| `toggleTheme` | `() => void` | Cycles light → dark → system → light |

Use `setPreference` when you're building a picker (three explicit buttons). Use `toggleTheme` for the single-button cycler pattern — that's what `ThemeToggle` does internally.

---

## `ThemeToggle`

Drop-in button that cycles through light → dark → system. Rendered as a `<Button variant="text">` so it inherits focus/keyboard handling automatically.

```tsx
import { ThemeToggle } from '@fpkit/acss';

// Default: icon + text
<ThemeToggle />

// Icon only (accessible label still set via aria-label)
<ThemeToggle display="icon" />

// Text only
<ThemeToggle display="text" />

// Custom accessible label prefix
<ThemeToggle srLabel="Theme is currently" />
```

| Prop | Type | Default |
|---|---|---|
| `display` | `"icon" \| "text" \| "both"` | `"both"` |
| `srLabel` | `string` | `"Current theme:"` |
| `className` | `string` | — |

For more complex UI (a settings menu with three explicit radio buttons, a dropdown picker), compose your own component with `useTheme()` instead — `ThemeToggle` is optimized for the common header-bar use case.

---

## Preventing theme flash (SSR)

The problem: in SSR, the server renders with one theme (usually the default), then React hydrates on the client and `ThemeProvider` reads `localStorage` and sets the correct theme. That gap — render → hydrate → read → set — produces a visible flash for users whose stored preference doesn't match the server default.

The fix: inline a sub-500-byte script in `<head>` that reads `localStorage` synchronously and sets `data-theme` before the first paint. `getThemeFoucScript()` returns exactly that script as a string:

```ts
import { getThemeFoucScript } from '@fpkit/acss';

const script = getThemeFoucScript();
// (function(){ try { ... document.documentElement.setAttribute('data-theme', t); } catch(_){} })();
```

You then inline this string as the body of a `<script>` element in your document head. **How** you inline it depends on the framework — the mechanics differ, the script content does not.

### Astro

Astro's `set:html` directive renders a raw string into an inline `<script>`. Pair with `is:inline` so the script isn't bundled and runs synchronously before hydration:

```astro
---
import { getThemeFoucScript } from '@fpkit/acss';
---
<!doctype html>
<html>
  <head>
    <script is:inline set:html={getThemeFoucScript()} />
    {/* ... */}
  </head>
  <body><slot /></body>
</html>
```

### Next.js (App Router)

In `app/layout.tsx`, render a `<script>` element whose content is `getThemeFoucScript()`. The canonical way to inline arbitrary script text inside a React element tree is via the element's raw-HTML escape hatch; Next.js's own docs use this pattern for analytics and theme scripts, so you can safely follow the recipe from [the Next.js theming docs](https://nextjs.org/docs/app/api-reference/components/script).

Two things to know:

- The script content is a hardcoded string produced by fpkit — it is not user-supplied, so the standard XSS considerations around raw HTML injection do not apply here. (Never pass user input through `getThemeFoucScript`; it's not a template.)
- Add `suppressHydrationWarning` to the `<html>` element. The FOUC script sets `data-theme` before React hydrates, which produces a legitimate attribute-mismatch warning without this flag.

### Remix

Same shape as Next.js: inline the script string in `<head>` from `app/root.tsx`. Remix's documentation covers the raw-HTML-in-React pattern under the name *inline scripts*.

### Custom storage key

Pair `ThemeProvider`'s `storageKey` prop with `getThemeFoucScript(storageKey)`. **Both must match** — mismatched keys make the FOUC script read the wrong slot and the flash comes back:

```tsx
// App
<ThemeProvider storageKey="my-app-theme">{children}</ThemeProvider>

// Document head script source
getThemeFoucScript('my-app-theme');
```

---

## Creating a custom theme

The two built-in themes live in [packages/fpkit/src/styles/tokens/](../../src/sass/tokens/) as `:root` declarations (light, the default) and `[data-theme="dark"]` overrides (dark). To add a third theme (say `"sepia"`):

1. **Add the override block** in your app CSS (or a new SCSS partial):

   ```css
   [data-theme="sepia"] {
     --color-background: #f4ecd8;
     --color-text: #433422;
     --color-primary: #8b5a2b;
     /* ...etc. Only override what differs from :root. */
   }
   ```

2. **Drive `data-theme` yourself.** `ThemeProvider` accepts `"light" | "dark" | "system"` out of the box — for additional named themes, call `document.documentElement.setAttribute('data-theme', 'sepia')` from your own picker component. `useTheme()` will still report the last `"light"` or `"dark"` value; if your app needs the richer state, maintain it in your own context.

> **Note:** The library's built-in components are tested against light and dark only. Custom themes are your responsibility to verify for contrast and readability — see the [Accessibility guide](./accessibility.md) for the WCAG 2.1 AA color-contrast rules.

---

## API reference

All exports are available from the main barrel `@fpkit/acss`:

| Export | Kind | Purpose |
|---|---|---|
| `ThemeProvider` | component | Owns theme state; provides context |
| `ThemeToggle` | component | Single-button cycler (light → dark → system) |
| `useTheme` | hook | Read/write theme from components |
| `getThemeFoucScript(storageKey?)` | function | Returns inline script string for SSR FOUC prevention |
| `THEME_STORAGE_KEY` | constant | Default `localStorage` key (`"fpkit-theme-preference"`) |
| `ThemePreference` | type | `"light" \| "dark" \| "system"` |
| `ResolvedTheme` | type | `"light" \| "dark"` |
| `ThemeContextValue` | type | Return type of `useTheme()` |
| `ThemeProviderProps` | type | Props for `ThemeProvider` |
| `ThemeToggleProps` | type | Props for `ThemeToggle` |

---

## Accessibility notes

- **Respects `prefers-color-scheme` by default.** When `preference === "system"`, the runtime subscribes to the media query and updates on OS theme changes — you don't need to do anything.
- **`ThemeToggle` has a descriptive accessible label.** The default label is `"Current theme: {Light|Dark|System}. Click to cycle."` — screen reader users learn the current state and the interaction in one announcement.
- **No focus flash.** Because theme switching is a single attribute change on `<html>`, focus rings and component state don't flicker.
- **No JS required for visual theming.** If JS is disabled, the page renders with the `:root` (light) theme and remains fully usable. Only the toggle and preference persistence require JS.
- **Respect `prefers-reduced-motion`.** The runtime itself doesn't animate, but custom themes should ensure transitions on `color`/`background-color` honor the user's reduced-motion preference.

---

## Verification & troubleshooting

A short checklist for verifying dark mode works correctly, plus the common issues teams hit when wiring the runtime into a new app.

### Verifying dark mode in Storybook

Until a Storybook theme toolbar addon ships (tracked as a Phase 3 follow-up), toggle dark mode manually from DevTools:

```js
// In the browser DevTools console while viewing any story:
document.documentElement.setAttribute('data-theme', 'dark');

// Back to light:
document.documentElement.setAttribute('data-theme', 'light');
```

Every component that references semantic tokens (`--color-primary`, `--color-surface`, etc.) flips immediately. Step through every variant in your story — hover states, active states, focus rings, disabled appearance — and confirm:

1. **Text contrast remains ≥ 4.5:1** against the new surface. Use the axe DevTools extension or WebAIM's contrast checker.
2. **Focus indicators are still visible.** The default focus ring uses `currentColor`, which means it inherits whichever foreground color the component is using — double-check it doesn't blend into the new surface.
3. **Semantic colors remain distinguishable.** Error / success / warning / info should still read as their intended emotion, not all converge to "slightly-different-gray."
4. **Custom SCSS overrides still work.** If your story sets `--btn-bg: #7c3aed` in `styles`, that hex value *won't* flip — that's the point of the override. Ensure the color you picked works in both themes.

### Capturing Chromatic baselines for dark mode

Once [`CHROMATIC_PROJECT_TOKEN`](ci-gates.md#visual-regression-chromatic) is populated and the initial light-mode baseline is approved, add dark-mode snapshots per story:

```tsx
export default {
  component: Button,
  parameters: {
    chromatic: {
      modes: ['light', 'dark'],
    },
  },
} satisfies Meta;
```

Chromatic will capture one snapshot per mode. When you introduce a change that affects both themes, both baselines diff — a regression in just dark mode is caught without any extra work.

**Baseline reset procedure** (if you accept a bulk theme change and want the current state to become the new baseline):

1. Merge the PR with the change.
2. In the Chromatic UI, navigate to the affected component.
3. For each story, click **"Approve this change"** on the dark-mode diff (and light-mode, if both changed).
4. The next run uses the approved snapshots as the baseline.

Don't run `chromatic --auto-accept-changes` on `main` unless you've manually reviewed the changes — it approves *everything*, including regressions you didn't intend.

### Common issues

**FOUC still flashes even though I added `getThemeFoucScript()`**

Most likely: your `ThemeProvider` and the FOUC script use different `storageKey` values. The script reads `localStorage['fpkit-theme-preference']` by default; if the provider uses a custom key, pass it to both:

```tsx
<ThemeProvider storageKey="my-app-theme">{children}</ThemeProvider>

// And in <head>:
getThemeFoucScript('my-app-theme');
```

Other suspects:

- The script is in `<body>` instead of `<head>` — move it so it runs before any stylesheet loads.
- The script is bundled (`<script type="module">`) instead of inline — `is:inline` (Astro) or `dangerouslySetInnerHTML` (React) is required.
- A CSS-in-JS library is hydrating styles *before* the FOUC script runs — check your framework's script-ordering guarantees.

**`useTheme()` throws "must be used inside a ThemeProvider"**

The hook intentionally throws when called outside a provider. Common causes:

- The provider is rendered *inside* the component that calls the hook (wrap higher up).
- Two React trees (e.g. a portal, a separate `createRoot` call) — the provider only reaches its own subtree.
- SSR hydration is swapping trees — confirm `ThemeProvider` is in the server-rendered output too.

**Custom theme name isn't detected by `ThemeToggle`**

Expected. `ThemeToggle` is a three-state cycler (`light` → `dark` → `system`); it doesn't know about `sepia` or any other custom theme. For apps with custom themes, compose your own picker with `useTheme()`:

```tsx
function ThemePicker() {
  const { preference, setPreference } = useTheme();
  return (
    <select
      value={preference}
      onChange={(e) => setPreference(e.target.value as ThemePreference)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
      {/* For a third custom theme, set data-theme directly on <html> — */}
      {/* the provider only tracks the three built-in preferences. */}
    </select>
  );
}
```

**Theme preference doesn't persist across page reloads**

Check browser DevTools → Application → Local Storage. The key is `fpkit-theme-preference` (or your custom `storageKey`). If it's missing:

- Third-party cookies / storage blocked (Safari ITP, strict privacy modes) — graceful fallback is to the `defaultPreference` prop.
- `localStorage` quota exceeded (unusual but possible) — other code in the app may be writing large values.
- SSR hydration mismatch wiping the attribute before the provider mounts — ensure `getThemeFoucScript()` runs before React hydrates.

**Dark-mode colors look washed out**

The semantic color mappings flip values between light and dark (e.g. primary goes from `#2563eb` → `#3b82f6`, a lighter blue for dark-mode legibility). If custom overrides look wrong under dark mode, you're probably overriding the *light value* and missing the dark one. Either:

1. Set the override in `:root` only and accept the library's dark value.
2. Add a matching override under `[data-theme="dark"]` in your CSS.

```css
:root {
  --color-primary: #7c3aed;  /* your brand purple for light mode */
}
[data-theme="dark"] {
  --color-primary: #a78bfa;  /* a lighter purple for dark mode */
}
```

---

## See also

- [Design Tokens Guide](./design-tokens.md) — the underlying JSON artifact that powers every theme
- [CSS Variables Guide](./css-variables.md) — which CSS variables get overridden in dark mode
- [Accessibility Guide](./accessibility.md) — color contrast rules for custom themes
- [Foundations/Colors page](../../../../apps/astro-builds/src/pages/foundations/colors.astro) — live view of every color token in light and dark
