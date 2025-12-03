# CSS Variables Documentation

Complete reference for all CSS custom properties in @fpkit/acss.

## Table of Contents

- [Overview](#overview)
- [Naming Convention](#naming-convention)
- [Global Theme Variables](#global-theme-variables)
- [Card Component Variables](#card-component-variables)
- [Typography Variables](#typography-variables)
- [Utility Variables](#utility-variables)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)

---

## Overview

@fpkit/acss uses CSS custom properties (variables) to enable:

- **Theming** - Global color schemes with semantic naming
- **Customization** - Component-level styling without SCSS edits
- **Consistency** - Centralized design tokens
- **Accessibility** - Responsive units (rem) that respect user preferences

### Key Principles

1. **Semantic naming** - Variables describe purpose, not appearance (`--color-surface` vs `--white`)
2. **Fallback values** - All variables include sensible defaults
3. **Rem units** - All sizing uses rem for responsive scaling (1rem = 16px default)
4. **Layered theming** - Global → Component → Instance cascade

---

## Naming Convention

CSS variables follow this pattern:

```
--{scope}-{element}-{variant}-{property}-{modifier}
```

### Examples

```css
--card-bg                           /* Component base property */
--card-header-bg                    /* Element-specific property */
--card-hover-lift                   /* State-specific property */
--card-header-border-bottom-color   /* Complex element property */
--color-surface                     /* Global theme property */
```

### Approved Abbreviations

| Abbreviation | Meaning | Use |
|--------------|---------|-----|
| `bg` | background | ✅ Always use |
| `fs` | font-size | ✅ Always use |
| `fw` | font-weight | ✅ Always use |
| `radius` | border-radius | ✅ Always use |
| `gap` | gap | ✅ Always use |

### Avoid These Abbreviations

| ❌ Don't Use | ✅ Use Instead |
|-------------|---------------|
| `px`, `py` | `padding-inline`, `padding-block` |
| `w`, `h` | `width`, `height` |
| `cl` | `color` |
| `dsp` | `display` |
| `bdr` | `border` |

---

## Global Theme Variables

These variables define your application's color scheme. Override at `:root` to theme the entire application.

### Color: Surface

Background colors for different surface levels.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--color-surface` | `#ffffff` | Primary surface background (cards, containers) |
| `--color-surface-secondary` | `#f8f9fa` | Secondary surfaces (headers, footers, sidebars) |

**Usage:**

```css
/* Apply globally */
:root {
  --color-surface: #1a1a1a;
  --color-surface-secondary: #2d2d2d;
}

/* Component automatically inherits */
[data-card] {
  background-color: var(--card-bg); /* Uses --color-surface */
}
```

### Color: Borders

Border colors for dividers and outlines.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--color-border` | `#dee2e6` | Standard borders (cards, headers, footers) |
| `--color-border-subtle` | `#d3d3d3` | Subtle borders (hr, light dividers) |

**Usage:**

```css
:root {
  --color-border: #404040;
  --color-border-subtle: #333333;
}
```

### Color: Interactive States

Colors for interactive elements and focus indicators.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--color-focus` | `#0066cc` | Focus outline color (WCAG 2.4.7 compliant) |

**Usage:**

```css
:root {
  --color-focus: #4a9eff;
}

/* All interactive elements inherit */
button:focus-visible {
  outline: 0.125rem solid var(--color-focus);
}
```

### Color: Accessibility

Colors for accessibility features.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--color-skip-link-bg` | `#f5f5f5` | Skip navigation link background |

**Usage:**

```css
:root {
  --color-skip-link-bg: #2d2d2d;
}
```

---

## Card Component Variables

### Base Properties

| Variable | Default | Purpose |
|----------|---------|---------|
| `--card-padding` | `1.5rem` | Internal padding for card content |
| `--card-bg` | `var(--color-surface, #ffffff)` | Card background color |
| `--card-radius` | `calc(var(--card-padding) / 4)` | Border radius (0.375rem) |
| `--card-gap` | `1rem` | Gap between card children |
| `--card-align` | `left` | Text alignment |

**Usage:**

```css
/* Larger cards */
:root {
  --card-padding: 2rem;
}

/* Rounded cards */
:root {
  --card-radius: 1rem;
}

/* Individual card */
[data-card].custom {
  --card-bg: #f0f8ff;
  --card-padding: 3rem;
}
```

### Header Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `--card-header-padding` | `1rem 1.5rem` | Header padding |
| `--card-header-bg` | `var(--color-surface-secondary, #f8f9fa)` | Header background |
| `--card-header-border-bottom-width` | `0.0625rem` | Border width (1px) |
| `--card-header-border-bottom-style` | `solid` | Border style |
| `--card-header-border-bottom-color` | `var(--color-border, #dee2e6)` | Border color |

**Usage:**

```css
/* Remove header border */
[data-card] {
  --card-header-border-bottom-width: 0;
}

/* Thicker header border */
[data-card] {
  --card-header-border-bottom-width: 0.125rem;
  --card-header-border-bottom-color: #667eea;
}
```

### Body Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `--card-body-padding` | `1.5rem` | Body section padding |

### Footer Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `--card-footer-padding` | `1rem 1.5rem` | Footer padding |
| `--card-footer-bg` | `var(--color-surface-secondary, #f8f9fa)` | Footer background |
| `--card-footer-border-top-width` | `0.0625rem` | Border width (1px) |
| `--card-footer-border-top-style` | `solid` | Border style |
| `--card-footer-border-top-color` | `var(--color-border, #dee2e6)` | Border color |

### Interactive Card Variables

Applied to `[data-card="interactive"]` cards.

| Variable | Default | Purpose |
|----------|---------|---------|
| `--card-transition-duration` | `0.2s` | Animation duration |
| `--card-transition-timing` | `ease` | Timing function |
| `--card-hover-lift` | `-0.125rem` | Hover lift distance (-2px) |
| `--card-hover-shadow` | `0 0.25rem 0.75rem rgba(0, 0, 0, 0.15)` | Hover shadow |

**Usage:**

```css
/* Slow, smooth animations */
[data-card="interactive"].slow {
  --card-transition-duration: 0.6s;
  --card-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dramatic hover effect */
[data-card="interactive"].dramatic {
  --card-hover-lift: -0.5rem;
  --card-hover-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
}
```

---

## Typography Variables

### HR (Horizontal Rule)

| Variable | Default | Purpose |
|----------|---------|---------|
| `--hr-border-width` | `0.0625rem` | Line thickness (1px) |
| `--hr-border-style` | `solid` | Line style |
| `--hr-border-color` | `var(--color-border-subtle, #d3d3d3)` | Line color |
| `--hr-margin-block` | `1.5rem` | Vertical spacing |

**Usage:**

```css
/* Thicker, darker HR */
hr {
  --hr-border-width: 0.125rem;
  --hr-border-color: #000000;
}

/* More spacing */
hr {
  --hr-margin-block: 3rem;
}
```

### Blockquote

| Variable | Default | Purpose |
|----------|---------|---------|
| `--blockquote-padding` | `1rem` | Internal padding |
| `--blockquote-border-width` | `0.3125rem` | Left border width (5px) |
| `--blockquote-border-style` | `solid` | Border style |
| `--blockquote-border-color` | `var(--color-border, #d3d3d3)` | Border color |

**Usage:**

```css
/* Thick accent border */
blockquote {
  --blockquote-border-width: 0.5rem;
  --blockquote-border-color: #667eea;
  --blockquote-padding: 1.5rem;
}
```

### Body Layout

| Variable | Default | Purpose |
|----------|---------|---------|
| `--body-display` | `flex` | Body display mode |
| `--body-direction` | `column` | Flex direction |

---

## Utility Variables

### Boolean-Like Variables

Special variables for conditional CSS logic.

| Variable | Value | Purpose |
|----------|-------|---------|
| `--TRUE` | `initial` | Enables a CSS property |
| `--FALSE` | ` ` (empty) | Disables a CSS property |

**Usage:**

```css
/* Conditional property application */
.element {
  display: var(--show-element, var(--TRUE)) block;
  /* If --show-element is undefined, uses --TRUE (applies 'block') */
  /* Set --show-element to --FALSE to hide */
}

/* Example: Conditional border */
.box {
  border: var(--enable-border, var(--FALSE)) 1px solid black;
}
```

---

## Best Practices

### 1. Use Semantic Variables for Theming

❌ **Don't:**

```css
[data-card] {
  background: #ffffff;
  border-color: #dee2e6;
}
```

✅ **Do:**

```css
[data-card] {
  background: var(--color-surface, #ffffff);
  border-color: var(--color-border, #dee2e6);
}
```

### 2. Always Include Fallback Values

❌ **Don't:**

```css
.element {
  color: var(--color-text);
}
```

✅ **Do:**

```css
.element {
  color: var(--color-text, #333333);
}
```

### 3. Use Rem Units for Sizing

❌ **Don't:**

```css
:root {
  --card-padding: 24px;
  --border-width: 2px;
}
```

✅ **Do:**

```css
:root {
  --card-padding: 1.5rem;      /* 24px ÷ 16 = 1.5rem */
  --border-width: 0.125rem;    /* 2px ÷ 16 = 0.125rem */
}
```

### 4. Split Complex Properties into Atomic Variables

❌ **Don't:**

```css
:root {
  --card-border: 1px solid #dee2e6;
}

[data-card] {
  border: var(--card-border);
}
```

✅ **Do:**

```css
:root {
  --card-border-width: 0.0625rem;
  --card-border-style: solid;
  --card-border-color: var(--color-border, #dee2e6);
}

[data-card] {
  border: var(--card-border-width) var(--card-border-style) var(--card-border-color);
}

/* Now users can override just the color */
[data-card].custom {
  --card-border-color: #667eea;
}
```

### 5. Layer Your Theme Variables

```css
/* Level 1: Global theme tokens */
:root {
  --color-surface: #ffffff;
  --color-border: #dee2e6;
}

/* Level 2: Component-specific variables reference global */
:root {
  --card-bg: var(--color-surface, #ffffff);
  --card-header-border-color: var(--color-border, #dee2e6);
}

/* Level 3: Component implementation uses component variables */
[data-card] {
  background: var(--card-bg);
}

/* Level 4: Instance-level overrides */
[data-card].custom {
  --card-bg: #f0f8ff;
}
```

This creates a cascade where changing `--color-surface` affects all components.

---

## Migration Guide

### From Hard-Coded Values

**Before:**

```scss
.card {
  background: #ffffff;
  padding: 24px;
  border: 1px solid #dee2e6;
}
```

**After:**

```scss
:root {
  --card-bg: var(--color-surface, #ffffff);
  --card-padding: 1.5rem;
  --card-border-width: 0.0625rem;
  --card-border-color: var(--color-border, #dee2e6);
}

.card {
  background: var(--card-bg);
  padding: var(--card-padding);
  border: var(--card-border-width) solid var(--card-border-color);
}
```

### From Pixel to Rem

```javascript
// Conversion formula
const rem = px / 16;

// Examples
1px   → 0.0625rem
2px   → 0.125rem
4px   → 0.25rem
8px   → 0.5rem
12px  → 0.75rem
16px  → 1rem
24px  → 1.5rem
32px  → 2rem
48px  → 3rem
```

### From Shorthand to Atomic Properties

**Before:**

```css
--card-border: 1px solid #dee2e6;
border: var(--card-border);
```

**After:**

```css
--card-border-width: 0.0625rem;
--card-border-style: solid;
--card-border-color: var(--color-border, #dee2e6);
border: var(--card-border-width) var(--card-border-style) var(--card-border-color);
```

**Benefits:**

- Override individual properties
- Reference global theme colors
- More flexible customization

---

## Examples

### Example 1: Dark Theme

```css
:root {
  --color-surface: #1a1a1a;
  --color-surface-secondary: #2d2d2d;
  --color-border: #404040;
  --color-border-subtle: #333333;
  --color-focus: #4a9eff;
}
```

### Example 2: Custom Gradient Card

```css
[data-card].gradient {
  --card-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-header-bg: transparent;
  --card-header-border-bottom-color: rgba(255, 255, 255, 0.2);
  color: white;
}
```

### Example 3: Animated Interactive Card

```css
[data-card="interactive"].bouncy {
  --card-transition-duration: 0.4s;
  --card-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --card-hover-lift: -0.5rem;
  --card-hover-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.25);
}
```

### Example 4: Minimal HR

```css
hr.minimal {
  --hr-border-width: 0.0625rem;
  --hr-border-color: var(--color-border-subtle);
  --hr-margin-block: 3rem;
}
```

---

## Resources

- [Theme Examples](./theme-examples.css) - Pre-built color schemes
- [Card Styles Documentation](./src/components/cards/STYLES.mdx) - Card-specific styling
- [Global Styles Documentation](./src/sass/GLOBALS-STYLES.md) - Typography and layout

---

## Support

For questions or issues:

- Check component README.mdx files
- Review Storybook stories for usage examples
