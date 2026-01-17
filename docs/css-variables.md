# CSS Variable Reference Guide

## Introduction

The @fpkit/acss component library uses **CSS custom properties** (CSS variables) to provide flexible theming and customization. This guide explains how to discover, understand, and customize component styles using our standardized naming convention.

### Why CSS Variables?

CSS variables allow you to customize component appearance without modifying the library's source code:

```css
/* Override button colors globally */
:root {
  --btn-primary-bg: #0066cc;
  --btn-primary-color: white;
}

/* Or scope to specific contexts */
.dark-theme {
  --btn-primary-bg: #66b3ff;
  --btn-bg: #2d2d2d;
}
```

### Quick Start

1. **Discover variables**: Use your IDE's autocomplete - type `--btn-` to see all button variables
2. **Override in your CSS**: Define custom values in `:root` or scoped selectors
3. **Test in Storybook**: Changes reflect immediately in component stories

---

## Naming Convention Pattern

All CSS variables in @fpkit/acss follow a consistent hierarchical structure:

```
--{component}-{element}-{variant}-{property}-{modifier}
```

### Pattern Breakdown

| Segment | Required | Examples | Purpose |
|---------|----------|----------|---------|
| **component** | ✅ Yes | `btn`, `alert`, `card`, `nav` | Component namespace |
| **element** | ❌ Optional | `header`, `footer`, `title`, `icon` | Sub-component part |
| **variant** | ❌ Optional | `primary`, `error`, `success`, `warning` | Style or semantic variant |
| **property** | ✅ Yes | `bg`, `color`, `padding`, `border` | CSS property name |
| **modifier** | ❌ Optional | `offset`, `width`, `radius` | Property modifier |

### Pattern Examples

```scss
// Component base property
--btn-bg

// Variant-specific property
--btn-primary-bg

// State-specific property
--btn-hover-bg
--btn-focus-outline

// Element-specific property
--card-header-padding
--card-footer-bg

// State with modified property
--btn-focus-outline-offset

// Element with variant
--alert-icon-error-color
```

### IDE Autocomplete Benefits

This pattern enables intuitive discovery:

- Type `--btn-` → See all button properties
- Type `--btn-primary-` → See all primary variant properties
- Type `--btn-hover-` → See all hover state properties
- Type `--card-header-` → See all card header properties

---

## Approved Abbreviations

To balance brevity with clarity, we use selective abbreviations:

### ✅ Abbreviated (Widely Recognized)

| Abbreviation | Full Name | Rationale |
|--------------|-----------|-----------|
| `bg` | background / background-color | Universal CSS convention |
| `fs` | font-size | Well-established in typography |
| `fw` | font-weight | Common in typography systems |
| `radius` | border-radius | Short enough, avoids ambiguity |
| `gap` | gap | Already one word |

**Example:**
```scss
--btn-bg: #0066cc;
--btn-fs: 1rem;
--btn-fw: 600;
--btn-radius: 0.375rem;
--btn-gap: 0.5rem;
```

### ✅ Full Words (For Clarity)

| Property | ❌ Don't Use | ✅ Use | Rationale |
|----------|--------------|--------|-----------|
| padding | `p`, `px`, `py` | `padding`, `padding-inline`, `padding-block` | Logical properties need clarity |
| margin | `m`, `mx`, `my` | `margin`, `margin-inline`, `margin-block` | Logical properties need clarity |
| color | `cl`, `c` | `color` | Too ambiguous when abbreviated |
| border | `bdr`, `br` | `border` | Avoid confusion with radius |
| display | `dsp`, `d` | `display` | Not universally recognized |
| width | `w` | `width` | Single letters harm clarity |
| height | `h` | `height` | Single letters harm clarity |

**Example:**
```scss
// ❌ Bad (old style)
--btn-px: 1.5rem;
--btn-py: 0.5rem;
--btn-cl: currentColor;
--btn-dsp: inline-flex;

// ✅ Good (standardized)
--btn-padding-inline: 1.5rem;
--btn-padding-block: 0.5rem;
--btn-color: currentColor;
--btn-display: inline-flex;
```

---

## Variant Organization

Variants represent different visual or semantic styles of a component.

### Pattern

```
--{component}-{variant}-{property}
```

### Semantic Variants

Used for UI states with meaning (alerts, messages):

```scss
// Error variant
--alert-error-bg: #f8d7da;
--alert-error-border: #f5c6cb;
--alert-error-color: #721c24;

// Success variant
--alert-success-bg: #d4edda;
--alert-success-border: #c3e6cb;
--alert-success-color: #155724;

// Warning variant
--alert-warning-bg: #fff3cd;
--alert-warning-border: #ffeeba;
--alert-warning-color: #856404;

// Info variant
--alert-info-bg: #d1ecf1;
--alert-info-border: #bee5eb;
--alert-info-color: #0c5460;
```

### Style Variants

Used for visual hierarchy (buttons, badges):

```scss
// Primary button (high emphasis)
--btn-primary-bg: #0066cc;
--btn-primary-color: white;
--btn-primary-border: 1px solid #0066cc;

// Secondary button (medium emphasis)
--btn-secondary-bg: transparent;
--btn-secondary-color: #0066cc;
--btn-secondary-border: 1px solid currentColor;

// Tertiary button (low emphasis)
--btn-tertiary-bg: transparent;
--btn-tertiary-color: #0066cc;
--btn-tertiary-border: none;
```

### Size Variants

Handled via size tokens:

```scss
// Size tokens
--btn-size-xs: 0.6875rem;
--btn-size-sm: 0.8125rem;
--btn-size-md: 0.9375rem;
--btn-size-lg: 1.125rem;

// Applied size
--btn-fs: var(--btn-size-md);
```

### Discovery Pattern

Type `--{component}-{variant}-` to see all properties for that variant:

```
--btn-primary-    → bg, color, border, hover-bg, etc.
--alert-error-    → bg, border, color, icon-color, etc.
```

---

## State Variables

States represent interactive or conditional component appearances.

### Pattern

```
--{component}-{state}-{property}
```

### Common States

| State | Description | Example Use |
|-------|-------------|-------------|
| `hover` | Mouse hover | `--btn-hover-bg` |
| `focus` | Keyboard focus | `--btn-focus-outline` |
| `active` | Active/pressed | `--btn-active-transform` |
| `disabled` | Disabled state | `--btn-disabled-opacity` |
| `visited` | Visited link | `--link-visited-color` |
| `checked` | Checked checkbox/radio | `--checkbox-checked-bg` |

### State Examples

```scss
// Hover state
--btn-hover-bg: #0052a3;
--btn-hover-transform: translateY(-1px);
--btn-hover-filter: brightness(1.1);

// Focus state
--btn-focus-outline: 2px solid currentColor;
--btn-focus-outline-offset: 2px;
--btn-focus-color: #0066cc;

// Disabled state
--btn-disabled-opacity: 0.6;
--btn-disabled-cursor: not-allowed;
--btn-disabled-bg: #e9ecef;

// Link visited state
--link-visited-color: #551a8b;
--link-visited-text-decoration: underline;
```

### Combining States and Variants

```scss
// Primary button hover
--btn-primary-hover-bg: #0052a3;

// Error alert focus
--alert-error-focus-outline: 2px solid #721c24;
```

---

## Element-Specific Variables

Complex components with multiple visual sections use element scoping.

### Pattern

```
--{component}-{element}-{property}
```

### When to Use Element Scoping

✅ **Use when:**
- Component has distinct visual sections (header, footer, body)
- Each section can be styled independently
- Sub-elements have unique properties

❌ **Don't use when:**
- Simple components with no visual hierarchy (Badge, Tag)
- Elements are purely structural (no custom styling needed)

### Card Example

```scss
// Base card properties
--card-padding: 1rem;
--card-bg: white;
--card-radius: 0.5rem;
--card-border: 1px solid #e0e0e0;

// Card header
--card-header-padding: 1rem 1.5rem;
--card-header-bg: #f9f9f9;
--card-header-border-bottom: 1px solid #e0e0e0;
--card-header-fs: 1.25rem;
--card-header-fw: 600;

// Card body
--card-body-padding: 1.5rem;
--card-body-gap: 1rem;

// Card footer
--card-footer-padding: 1rem 1.5rem;
--card-footer-bg: #f9f9f9;
--card-footer-border-top: 1px solid #e0e0e0;
```

### Dialog Example

```scss
// Base dialog
--dialog-bg: white;
--dialog-padding: 0;
--dialog-radius: 0.5rem;
--dialog-width: 32rem;
--dialog-max-height: 80vh;

// Dialog header
--dialog-header-padding: 1.5rem;
--dialog-header-border-bottom: 1px solid #e0e0e0;

// Dialog body
--dialog-body-padding: 1.5rem;
--dialog-body-max-height: 60vh;

// Dialog footer
--dialog-footer-padding: 1rem 1.5rem;
--dialog-footer-bg: #f9f9f9;
--dialog-footer-gap: 0.75rem;
```

---

## Pattern Examples

### Example 1: Simple Component (Badge)

```scss
// Base properties
--badge-padding-inline: 0.5rem;
--badge-padding-block: 0.25rem;
--badge-fs: 0.75rem;
--badge-fw: 600;
--badge-radius: 0.25rem;
--badge-bg: #e9ecef;
--badge-color: #212529;

// Variants
--badge-primary-bg: #0066cc;
--badge-primary-color: white;

--badge-success-bg: #28a745;
--badge-success-color: white;

--badge-error-bg: #dc3545;
--badge-error-color: white;
```

### Example 2: Interactive Component (Button)

```scss
// Size tokens
--btn-size-xs: 0.6875rem;
--btn-size-sm: 0.8125rem;
--btn-size-md: 0.9375rem;
--btn-size-lg: 1.125rem;

// Base properties
--btn-fs: var(--btn-size-md);
--btn-padding-inline: calc(var(--btn-fs) * 1.5);
--btn-padding-block: calc(var(--btn-fs) * 0.5);
--btn-radius: 0.375rem;
--btn-color: currentColor;
--btn-bg: transparent;
--btn-border: 1px solid currentColor;
--btn-display: inline-flex;
--btn-fw: 500;

// Primary variant
--btn-primary-bg: #0066cc;
--btn-primary-color: white;
--btn-primary-border: 1px solid #0066cc;

// States
--btn-hover-bg: #0052a3;
--btn-hover-transform: translateY(-1px);

--btn-focus-outline: 2px solid currentColor;
--btn-focus-outline-offset: 2px;

--btn-disabled-opacity: 0.6;
--btn-disabled-cursor: not-allowed;
```

### Example 3: Complex Component (Alert)

```scss
// Base properties
--alert-padding: 1rem;
--alert-margin-block-end: 1rem;
--alert-radius: 0.375rem;
--alert-gap: 0.75rem;
--alert-border: 1px solid;
--alert-bg: #f0f0f0;
--alert-color: inherit;
--alert-display: flex;

// Icon element
--alert-icon-size: 1.25rem;
--alert-icon-color: currentColor;

// Title element
--alert-title-fs: 1rem;
--alert-title-fw: 600;
--alert-title-margin-block-end: 0.25rem;

// Semantic variants
--alert-success-bg: #d4edda;
--alert-success-border: #c3e6cb;
--alert-success-color: #155724;
--alert-success-icon-color: #155724;

--alert-error-bg: #f8d7da;
--alert-error-border: #f5c6cb;
--alert-error-color: #721c24;
--alert-error-icon-color: #721c24;

--alert-warning-bg: #fff3cd;
--alert-warning-border: #ffeeba;
--alert-warning-color: #856404;
--alert-warning-icon-color: #856404;

--alert-info-bg: #d1ecf1;
--alert-info-border: #bee5eb;
--alert-info-color: #0c5460;
--alert-info-icon-color: #0c5460;
```

---

## Customization Examples

### Example 1: Custom Brand Colors

```css
/* Override button primary variant with brand colors */
:root {
  --btn-primary-bg: #7c3aed;  /* Brand purple */
  --btn-primary-color: white;
  --btn-primary-hover-bg: #6d28d9;

  --btn-secondary-color: #7c3aed;
  --btn-secondary-border-color: #7c3aed;
}
```

### Example 2: Dark Mode Theme

```css
.dark-theme {
  /* Card dark mode */
  --card-bg: #2d2d2d;
  --card-color: #e0e0e0;
  --card-border: 1px solid #404040;
  --card-header-bg: #1f1f1f;
  --card-header-border-bottom: 1px solid #404040;

  /* Button dark mode */
  --btn-bg: #404040;
  --btn-color: #e0e0e0;
  --btn-hover-bg: #4a4a4a;

  /* Alert dark mode */
  --alert-error-bg: #3d1a1f;
  --alert-error-color: #f5c6cb;
  --alert-error-border: #721c24;
}
```

### Example 3: Larger Spacing Scale

```css
/* Increase component spacing globally */
:root {
  --btn-padding-inline: 2rem;
  --btn-padding-block: 0.75rem;

  --card-padding: 2rem;
  --card-header-padding: 1.5rem 2rem;
  --card-body-padding: 2rem;

  --alert-padding: 1.5rem;
  --alert-gap: 1rem;
}
```

### Example 4: Custom Alert Variant

```css
/* Create a custom "notice" alert variant */
:root {
  --alert-notice-bg: #e8f4fd;
  --alert-notice-border: #b3d9f2;
  --alert-notice-color: #0c5460;
  --alert-notice-icon-color: #0c5460;
}

/* Usage in HTML */
/* <alert variant="notice">Custom alert styling</alert> */
```

### Example 5: Typography Scale

```css
/* Adjust font sizes for better readability */
:root {
  /* Button typography */
  --btn-fs: 1.125rem;
  --btn-fw: 600;

  /* Alert typography */
  --alert-fs: 1rem;
  --alert-title-fs: 1.25rem;

  /* Card typography */
  --card-header-fs: 1.5rem;
  --card-fs: 1rem;
}
```

### Example 6: Rounded Design System

```css
/* Apply rounded corners throughout */
:root {
  --btn-radius: 2rem;          /* Pill buttons */
  --card-radius: 1rem;         /* Rounded cards */
  --alert-radius: 0.75rem;     /* Rounded alerts */
  --input-radius: 0.75rem;     /* Rounded inputs */
  --badge-radius: 2rem;        /* Pill badges */
  --dialog-radius: 1rem;       /* Rounded dialogs */
}
```

### Example 7: Subtle Shadow System

```css
/* Add elevation with shadows */
:root {
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
                 0 1px 2px rgba(0, 0, 0, 0.06);
  --card-hover-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
                       0 2px 4px rgba(0, 0, 0, 0.06);

  --btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --btn-hover-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  --dialog-shadow: 0 20px 25px rgba(0, 0, 0, 0.15),
                   0 10px 10px rgba(0, 0, 0, 0.04);
}
```

### Example 8: Scoped Component Customization

```css
/* Customize buttons only within a specific section */
.pricing-section {
  --btn-primary-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --btn-primary-border: none;
  --btn-radius: 2rem;
  --btn-padding-inline: 2.5rem;
  --btn-fw: 700;
  --btn-hover-transform: scale(1.05);
}

/* Customize alerts in sidebar */
.sidebar {
  --alert-padding: 0.75rem;
  --alert-fs: 0.875rem;
  --alert-gap: 0.5rem;
  --alert-radius: 0.25rem;
}
```

### Example 9: Themeable Select Arrow

```css
/* Customize select dropdown arrow color */
:root {
  --select-arrow-color: #0066cc;  /* Brand color for arrow */
}

.dark-theme {
  --select-arrow-color: #66b3ff;  /* Lighter arrow for dark mode */
}

/* Note: Select elements share most styling through --input-* variables */
/* Override shared input variables for all form controls including select */
:root {
  --input-border-color: #d0d0d0;
  --input-bg: #fafafa;
  --input-padding-inline: 1rem;
  --input-radius: 0.5rem;
}
```

---

## Component Variable Reference

### Core Components

| Component | Variable Prefix | Example Variables | Count |
|-----------|----------------|-------------------|-------|
| Alert | `--alert-` | `--alert-bg`, `--alert-error-bg`, `--alert-padding` | 25+ |
| Badge | `--badge-` | `--badge-bg`, `--badge-primary-color`, `--badge-fs` | 12+ |
| Button | `--btn-` | `--btn-bg`, `--btn-primary-bg`, `--btn-hover-bg` | 30+ |
| Card | `--card-` | `--card-bg`, `--card-header-padding`, `--card-radius` | 20+ |
| Checkbox | `--checkbox-` | `--checkbox-bg`, `--checkbox-checked-bg` | 15+ |
| Dialog | `--dialog-` | `--dialog-bg`, `--dialog-width`, `--dialog-padding` | 18+ |
| Form | `--form-` | `--form-gap`, `--form-label-fs` | 10+ |
| Input | `--input-` | `--input-bg`, `--input-padding-inline`, `--input-fs` | 20+ |
| Link | `--link-` | `--link-color`, `--link-hover-color`, `--link-visited-color` | 12+ |
| List | `--list-` | `--list-item-padding`, `--list-marker-color` | 15+ |
| Nav | `--nav-` | `--nav-bg`, `--nav-gap`, `--nav-link-color` | 18+ |
| Select | `--select-` | `--select-arrow-color` (shares `--input-*` for other properties) | 1 select-specific + 16+ shared |
| Table | `--table-` | `--table-bg`, `--table-header-bg`, `--table-border` | 22+ |
| Tag | `--tag-` | `--tag-bg`, `--tag-color`, `--tag-radius` | 10+ |
| Textarea | `--textarea-` | `--textarea-padding`, `--textarea-fs`, `--textarea-min-height` | 14+ |
| Toggle | `--toggle-` | `--toggle-bg`, `--toggle-checked-bg`, `--toggle-width` | 12+ |

> **Note:** Variable counts are approximate and may change as components evolve. Use IDE autocomplete to discover all available variables for each component.

### Discovering Component Variables

**Method 1: IDE Autocomplete**
1. Open your CSS file
2. Type `--{component}-` (e.g., `--btn-`)
3. Your IDE will show all available variables for that component

**Method 2: Inspect Source**
1. Navigate to `packages/fpkit/src/components/{component}/{component}.scss`
2. Look for CSS custom property definitions (variables starting with `--`)
3. Check for `:root` or component class selectors

**Method 3: Browser DevTools**
1. Open your app in a browser
2. Inspect the component element
3. Look at "Computed" styles to see all applied CSS variables
4. Hover over variable values to see the cascade

---

## IDE Setup Tips

### VS Code

**1. Install Extensions:**
- **CSS Variables Autocomplete** - Shows variable definitions on hover
- **IntelliSense for CSS class names** - Autocomplete for CSS classes

**2. Configure Settings:**
```json
{
  "css.customData": [".vscode/css-custom-data.json"],
  "css.lint.unknownProperties": "ignore"
}
```

**3. Better Autocomplete:**
Create `.vscode/css-custom-data.json`:
```json
{
  "version": 1.1,
  "properties": [
    {
      "name": "--btn-*",
      "description": "Button component CSS variables"
    },
    {
      "name": "--alert-*",
      "description": "Alert component CSS variables"
    }
  ]
}
```

### WebStorm / IntelliJ

**1. Enable CSS Variable Support:**
- Settings → Languages & Frameworks → Style Sheets → CSS
- Enable "CSS Custom Properties"

**2. Autocomplete Configuration:**
- Variables are automatically detected from imported stylesheets
- Use Ctrl+Space to trigger autocomplete

### Sublime Text

**1. Install Package:**
- Install "CSS3" package via Package Control

**2. Enhanced Support:**
- Variables from imported files appear in autocomplete
- Use Ctrl+Space to show completions

---

## Migration from Old Names

If you're migrating from older versions of @fpkit/acss with inconsistent variable names, see our **Migration Guide Template** (`MIGRATION-template.md`) for:

- Before/after naming tables
- Find-and-replace regex patterns
- Component-specific migration instructions
- Testing checklist

**Common Migrations:**

```css
/* Before (old inconsistent names) */
--btn-px: 1.5rem;
--btn-py: 0.5rem;
--btn-rds: 0.375rem;
--btn-cl: currentColor;

/* After (standardized names) */
--btn-padding-inline: 1.5rem;
--btn-padding-block: 0.5rem;
--btn-radius: 0.375rem;
--btn-color: currentColor;
```

---

## Best Practices

### ✅ Do

- **Use the naming pattern consistently** when creating custom variables
- **Override at the appropriate scope** (`:root` for global, `.theme` for scoped)
- **Use logical properties** (`padding-inline`, `margin-block`) for better RTL support
- **Test changes in multiple contexts** (light/dark modes, responsive)
- **Document custom variables** if you add them to your design system

### ❌ Don't

- **Don't abbreviate randomly** - follow approved abbreviations only
- **Don't mix old and new variable names** - migrate completely
- **Don't override library source files** - use CSS cascade instead
- **Don't use `!important`** unless absolutely necessary
- **Don't create one-off variables** - use the component pattern

---

## Support

### Questions?

- Check the [GitHub Discussions](https://github.com/your-org/fpkit/discussions)
- Review component source at `packages/fpkit/src/components/`
- Search existing [GitHub Issues](https://github.com/your-org/fpkit/issues)

### Found a Variable Bug?

- Report inconsistencies in variable naming
- Suggest improvements to the standard
- Contribute fixes via pull requests

### Contributing

When adding new components, follow this naming standard. See `CLAUDE.md` for contribution guidelines.

---

## Appendix: Variable Naming Decision Tree

```
┌─ Creating a new CSS variable?
│
├─ Is it component-specific?
│  └─ YES: Start with --{component}-
│     │
│     ├─ Does it apply to a sub-element (header, footer)?
│     │  └─ YES: --{component}-{element}-{property}
│     │      Example: --card-header-padding
│     │
│     ├─ Does it apply to a variant (primary, error)?
│     │  └─ YES: --{component}-{variant}-{property}
│     │      Example: --btn-primary-bg
│     │
│     ├─ Does it apply to a state (hover, focus)?
│     │  └─ YES: --{component}-{state}-{property}
│     │      Example: --btn-hover-bg
│     │
│     └─ Otherwise: --{component}-{property}
│         Example: --btn-padding
│
└─ Is it a global design token?
   └─ YES: Consider a different prefix (--color-, --space-)
       Example: --color-primary, --space-md
```

---

## Version History

- **v1.0.0** (2025-11-03): Initial CSS variable naming standard established
- Future versions will document changes to the standard

---

**Last Updated:** November 3, 2025
**Standard Version:** 1.0.0
**Library Version:** @fpkit/acss v0.6.2
