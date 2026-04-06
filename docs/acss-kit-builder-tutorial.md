# How to Build Components with `acss-kit-builder`

A task-oriented walkthrough for generating fpkit-style React components into
your project using the `acss-kit-builder` Claude Code plugin. By the end of
this tutorial you will have a themed `Button`, a `Card`, and a fully
accessible `Dialog` generated into `src/components/fpkit/` — with no runtime
dependency on `@fpkit/acss`.

> **Looking for reference material instead?** See the plugin
> [`README.md`](../.claude/plugins/acss-kit-builder/README.md) for the full
> feature list, the
> [`SKILL.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md)
> for the generation workflow, and
> [`docs/css-variables.md`](./css-variables.md) for the CSS variable naming
> standard. This document is the *how-to*, not the reference.

---

## What you'll build

Three real components in your own project:

1. A `Button` with size, color, and accessible disabled state
2. A `Card` (added in a batched run alongside `Alert` and `Nav`)
3. A `Dialog` that re-uses the `Button` you generated in step 1

Every generated file lives in your repo, is owned by you, and can be edited
freely.

---

## Prerequisites

| Requirement | How to satisfy |
|---|---|
| React + TypeScript project | Any Vite, Next.js, Astro, or CRA template works |
| `sass` (or `sass-embedded`) in `devDependencies` | `npm install -D sass` |
| `acss-kit-builder` plugin available | Already present at `.claude/plugins/acss-kit-builder/` in this repo. To use elsewhere, copy that directory into your project's `.claude/plugins/` folder. |

That's it. The plugin generates plain React + SCSS — there is no `@fpkit/acss`
package to install.

---

## Step 1 — Discover what's available

Before generating anything, see what the catalog offers:

```
/kit-list
```

You'll get a categorized listing similar to:

| Category | Components |
|---|---|
| Simple (no dependencies) | `badge`, `tag`, `heading`, `text` |
| Interactive (`useDisabledState` pattern) | `button`, `link` |
| Layout | `card`, `nav` |
| Complex (multiple dependencies) | `alert`, `dialog`, `form` (input, textarea, select, checkbox, toggle) |

To inspect a single component's props, CSS variables, and dependencies:

```
/kit-list button
```

Use `/kit-list <name>` whenever you want to know what generating something
will pull in **before** committing to it.

---

## Step 2 — Generate your first component

Generate the Button:

```
/kit-add button
```

### What happens on the first run

The plugin runs through its **first-run initialization** (Step A in the
[`SKILL.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md)
workflow):

1. **Sass check.** If `sass`/`sass-embedded` is missing from
   `devDependencies`, generation halts with:
   ```
   sass or sass-embedded not found in devDependencies.
   Run: npm install -D sass
   Then re-run: /kit-add <component>
   ```
2. **Target directory prompt.** You'll be asked once per session:
   ```
   Where should components be generated? (default: src/components/fpkit/)
   ```
   Press Enter to accept the default, or type a different path
   (e.g. `app/components/ui/`). The answer is remembered for the rest of the
   session.
3. **Foundation copy.** A single file, `ui.tsx`, is copied verbatim into your
   target directory. This is the polymorphic base component every other
   generated component imports from. Do not delete it.

### Dependency-tree preview

Next you see a preview of what will be created:

```
Generating the following files in src/components/fpkit/:

  New:
    ui.tsx              (foundation — React only)
    button/button.tsx
    button/button.scss

  Skipped (already exist):
    (none)

Proceed? [Enter to continue, Ctrl+C to cancel]
```

Confirm to generate.

### The result

Your project now contains:

```
src/components/fpkit/
  ui.tsx
  button/
    button.tsx     # React component + inlined types + condensed useDisabledState
    button.scss    # CSS variables with fallbacks, data-* variant selectors
```

The post-generation summary tells you exactly how to import it:

```
Import and usage:

  import Button from './components/fpkit/button/button'
  import './components/fpkit/button/button.scss'

  <Button type="button" onClick={handleClick}>Click me</Button>
  <Button type="button" disabled>Disabled (stays focusable)</Button>
  <Button type="button" data-color="primary" data-btn="lg">Primary Large</Button>
```

---

## Step 3 — Use the component

A minimal `App.tsx` showing the three usage patterns:

```tsx
import Button from './components/fpkit/button/button'
import './components/fpkit/button/button.scss'

export default function App() {
  return (
    <main style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      {/* Default */}
      <Button type="button" onClick={() => console.log('clicked')}>
        Click me
      </Button>

      {/* Color + size variant via the typed props */}
      <Button type="button" color="primary" size="lg">
        Primary Large
      </Button>

      {/* Accessible disabled — stays in keyboard tab order */}
      <Button type="button" disabled color="primary">
        Cannot click (still focusable)
      </Button>
    </main>
  )
}
```

### Why does `disabled` keep the button focusable?

Generated interactive components use **`aria-disabled`** instead of the
native `disabled` attribute. The native attribute removes the element from
the keyboard tab order, which violates [WCAG 2.1.1 Keyboard][wcag-211]:
disabled controls become invisible to keyboard users and screen readers.

The `useDisabledState` hook is **inlined** inside `button.tsx` (about 50
lines, not a separate import) and:

- Sets `aria-disabled="true"` on the button
- Adds an `is-disabled` class for CSS styling
- Wraps `onClick`/`onKeyDown`/`onPointerDown` to call `preventDefault` +
  `stopPropagation` when disabled

The matching SCSS — also generated — uses `pointer-events: none` so mouse
clicks are blocked while focus and screen reader discovery are preserved:

```scss
.btn[aria-disabled="true"],
.btn.is-disabled {
  opacity: var(--btn-disabled-opacity, 0.6);
  cursor: var(--btn-disabled-cursor, not-allowed);
  pointer-events: none;
}
```

For the full rationale and the long-form hook, read
[`references/accessibility.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/accessibility.md).

[wcag-211]: https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html

---

## Step 4 — Theme it with CSS variables

Generated components expose CSS custom properties with hardcoded fallbacks,
so you can re-skin them without touching the generated source. Two patterns
cover almost every case.

### Global brand override

In your app's root stylesheet:

```css
:root {
  --btn-primary-bg: #7c3aed;        /* brand purple */
  --btn-primary-color: #ffffff;
  --btn-primary-hover-bg: #6d28d9;
  --btn-radius: 2rem;               /* pill buttons everywhere */
}
```

Every `<Button color="primary">` in the app picks up the new colors
immediately — no re-generation, no rebuild step.

### Scoped section override

Customize a single area without affecting the rest of the app:

```css
.pricing-section {
  --btn-padding-inline: 2.5rem;
  --btn-fw: 700;
  --btn-hover-transform: scale(1.05);
}
```

The full naming convention (`--{component}-{element?}-{variant?}-{property}`),
the list of approved abbreviations, and many more recipes live in
[`docs/css-variables.md`](./css-variables.md).

---

## Step 5 — Generate a component with dependencies

Now generate the Dialog:

```
/kit-add dialog
```

### Dependency resolution

Dialog declares `dependencies: [button]` in its
[Generation Contract](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/dialog.md),
so the resolved tree is:

```
dialog/dialog.tsx + dialog/dialog.scss
  └─ button/button.tsx + button/button.scss
```

Because you already generated `button/` in Step 2, the preview will report
it as **skipped** — existing files are reused, never overwritten:

```
Generating the following files in src/components/fpkit/:

  New:
    dialog/dialog.tsx
    dialog/dialog.scss

  Skipped (already exist):
    ui.tsx
    button/button.tsx
    button/button.scss

Proceed? [Enter to continue, Ctrl+C to cancel]
```

> **This is the key safety property.** You can re-run `/kit-add` for any
> component without fearing local edits will be wiped out. To force a
> regeneration, delete the file manually first.

### Using the Dialog

The Dialog is a compound component built on the native HTML `<dialog>`
element, so `showModal()` traps focus, Escape closes, and focus returns to
the trigger automatically — no `focus-trap` package required.

```tsx
import { useRef } from 'react'
import Dialog from './components/fpkit/dialog/dialog'
import Button from './components/fpkit/button/button'
import './components/fpkit/dialog/dialog.scss'
import './components/fpkit/button/button.scss'

export default function ConfirmExample() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <>
      <Button type="button" color="primary" onClick={open}>
        Open Dialog
      </Button>

      <Dialog
        dialogRef={dialogRef}
        title="Confirm Action"
        description="This action cannot be undone."
        onClose={() => console.log('closed')}
        footer={
          <>
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={close}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </>
  )
}
```

Note that the two `Button` instances inside the footer are the same
component you generated in Step 2 — the imports are local relative paths,
nothing comes from npm.

---

## Step 6 — Generate multiple components in one go

`/kit-add` accepts multiple component names. To add Card, Alert, and Nav at
once:

```
/kit-add card alert nav
```

The plugin resolves dependencies for each, deduplicates, and shows a single
preview before generating. The summary at the end groups everything created
and skipped, with import snippets for each new component.

---

## Editing generated code

Generated files are **yours**. There is no upgrade path to break, no
package version to chase. Common edits:

- Change a default — edit the SCSS variable's fallback value, e.g.
  `var(--btn-radius, 0.375rem)` → `var(--btn-radius, 0.75rem)`.
- Add a prop — extend the inline `ButtonProps` type and forward the new
  prop to the underlying `<UI>`.
- Tighten the API — delete props you don't need; the type is local, so
  removing fields is just a normal refactor.
- Add a variant — add a new `data-color="..."` selector block in the SCSS
  and a matching value to the `color` prop union.

If you later want to rebase a component on the latest reference, delete the
files and re-run `/kit-add <component>`. Your changes outside that
directory are untouched.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `sass or sass-embedded not found in devDependencies` | `npm install -D sass`, then re-run `/kit-add`. |
| `Component not in catalog` (or similar) | Run `/kit-list` to see valid names. Component names are kebab-case (e.g. `icon-button`, not `IconButton`). |
| You want to regenerate a file from scratch | Delete the file (or its directory) manually, then re-run `/kit-add <component>`. The preview will show it as **New** instead of **Skipped**. |
| Wrong target directory chosen on first run | The choice is per-session. Restart your Claude Code session to re-prompt, or move the existing files manually and update imports. |
| TypeScript errors about JSX or `import.meta` after generation | Confirm `tsconfig.json` has `"jsx": "react-jsx"` and a modern `"moduleResolution"` (`"bundler"` for Vite, `"node16"` for Node ESM). |
| Styles aren't applying | Make sure you imported the matching `.scss` file alongside the component (`import './components/fpkit/button/button.scss'`). The SCSS is not auto-loaded. |
| `useDisabledState` is missing — I want to share it | It's deliberately inlined per component. If you'd rather have one shared hook, extract it into `src/components/fpkit/use-disabled-state.ts` after generation and update each component's import. |

---

## Where to go next

- **Plugin reference:**
  [`.claude/plugins/acss-kit-builder/README.md`](../.claude/plugins/acss-kit-builder/README.md)
- **Generation workflow (what the model executes):**
  [`SKILL.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/SKILL.md)
- **CSS variable naming standard and theming recipes:**
  [`docs/css-variables.md`](./css-variables.md)
- **Per-component contracts (props, CSS vars, dependencies):**
  [`references/components/`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/components/)
- **Accessibility deep-dive:**
  [`references/accessibility.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/accessibility.md)
- **Architecture of the polymorphic `UI` base component:**
  [`references/architecture.md`](../.claude/plugins/acss-kit-builder/skills/acss-kit-builder/references/architecture.md)
