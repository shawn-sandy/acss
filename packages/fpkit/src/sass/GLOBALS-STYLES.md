# Global Styles Documentation

Typography and layout styling with CSS custom properties for @fpkit/acss.

## Overview

Global styles provide baseline typography, layout, and semantic HTML element styling across your application. All styles use:

- **Rem units** for responsive sizing (1rem = 16px default)
- **Logical properties** for internationalization (`padding-inline`, `margin-block`)
- **CSS custom properties** for complete customization
- **Semantic naming** following project conventions

---

## Table of Contents

- [Typography](#typography)
  - [Horizontal Rule (HR)](#horizontal-rule-hr)
  - [Blockquote](#blockquote)
  - [Headings](#headings)
  - [Paragraphs](#paragraphs)
  - [Lists](#lists)
- [Layout](#layout)
  - [Body](#body)
  - [Sections](#sections)
  - [Skip Links](#skip-links)
- [Utility Variables](#utility-variables)
- [Best Practices](#best-practices)

---

## Typography

### Horizontal Rule (HR)

Horizontal rules for content dividers.

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--hr-border-width` | `0.0625rem` | Line thickness (1px) |
| `--hr-border-style` | `solid` | Line style (`solid`, `dashed`, `dotted`) |
| `--hr-border-color` | `var(--color-border-subtle, #d3d3d3)` | Line color (uses global theme) |
| `--hr-margin-block` | `1.5rem` | Vertical spacing above and below |

#### Default Styles

```css
hr {
  --hr-border-width: 0.0625rem;
  --hr-border-style: solid;
  --hr-border-color: var(--color-border-subtle, #d3d3d3);
  --hr-margin-block: 1.5rem;

  border: none;
  border-bottom: var(--hr-border-width) var(--hr-border-style) var(--hr-border-color);
  margin-block: var(--hr-margin-block);
  display: block;
  min-width: 100%;
}
```

#### Customization Examples

**Thicker HR:**
```css
hr.thick {
  --hr-border-width: 0.125rem; /* 2px */
  --hr-border-color: #000000;
}
```

**Dashed Divider:**
```css
hr.dashed {
  --hr-border-style: dashed;
}
```

**Minimal HR with Extra Spacing:**
```css
hr.minimal {
  --hr-border-width: 0.0625rem;
  --hr-border-color: var(--color-border-subtle);
  --hr-margin-block: 3rem;
}
```

**Accent HR:**
```css
hr.accent {
  --hr-border-width: 0.1875rem; /* 3px */
  --hr-border-color: #667eea;
  --hr-margin-block: 2rem;
}
```

---

### Blockquote

Styled quotations with left border accent.

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--blockquote-padding` | `1rem` | Internal padding |
| `--blockquote-border-width` | `0.3125rem` | Left border width (5px) |
| `--blockquote-border-style` | `solid` | Border style |
| `--blockquote-border-color` | `var(--color-border, #d3d3d3)` | Border color (uses global theme) |

#### Default Styles

```css
blockquote {
  --blockquote-padding: 1rem;
  --blockquote-border-width: 0.3125rem;
  --blockquote-border-style: solid;
  --blockquote-border-color: var(--color-border, #d3d3d3);

  padding: var(--blockquote-padding);
  border-left: var(--blockquote-border-width) var(--blockquote-border-style) var(--blockquote-border-color);
}
```

#### Customization Examples

**Thick Accent Blockquote:**
```css
blockquote.accent {
  --blockquote-border-width: 0.5rem; /* 8px */
  --blockquote-border-color: #667eea;
  --blockquote-padding: 1.5rem;
}
```

**Minimal Blockquote:**
```css
blockquote.minimal {
  --blockquote-border-width: 0.125rem; /* 2px */
  --blockquote-border-color: var(--color-border-subtle);
  --blockquote-padding: 0.75rem;
}
```

**Dashed Border:**
```css
blockquote.dashed {
  --blockquote-border-style: dashed;
  --blockquote-border-width: 0.1875rem; /* 3px */
}
```

**Callout Box:**
```css
blockquote.callout {
  --blockquote-padding: 1.5rem;
  --blockquote-border-width: 0.25rem;
  --blockquote-border-color: #ffc107;
  background-color: #fff3cd;
  border-radius: 0.25rem;
}
```

---

### Headings

Semantic heading styles (h1-h6).

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--fs-weight` | `500` | Font weight for headings and strong text |

#### Default Styles

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--fs-weight);
  margin-block-start: 0;
  margin-block-end: 1rem;
  line-height: 1.2;
}
```

#### Customization

```css
/* Bolder headings */
:root {
  --fs-weight: 700;
}

/* Individual heading styles */
h1 {
  font-size: 2.5rem;
  --fs-weight: 800;
}

h2 {
  font-size: 2rem;
  --fs-weight: 700;
}
```

---

### Paragraphs

Default paragraph styling with optimal line length.

#### Default Styles

```css
p {
  max-width: 75ch; /* Optimal reading width */
  font-size: var(--fs-0); /* Base font size */
  line-height: 1.6; /* Comfortable reading */
}

p + p {
  margin-block-start: 1rem; /* Spacing between paragraphs */
}
```

#### Customization

```css
/* Wide paragraphs */
p.wide {
  max-width: 100ch;
}

/* Narrow paragraphs */
p.narrow {
  max-width: 60ch;
}

/* Tight spacing */
p.tight + p.tight {
  margin-block-start: 0.5rem;
}

/* Loose spacing */
p.loose + p.loose {
  margin-block-start: 2rem;
}
```

---

### Lists

Flexible list styling with CSS custom properties.

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--li-display` | `flex` | Display mode for lists |
| `--li-direction` | `column` | Flex direction |
| `--li-gap` | `0.2rem` | Gap between list items |
| `--li-wrap` | `nowrap` | Flex wrap behavior |
| `--li-ps` | `var(--spc-3)` | Padding start (left padding) |
| `--li-style` | `none` | List style for unstyled lists |

#### Default Styles

```css
ul, ol {
  display: var(--li-display, flex);
  flex-direction: var(--li-direction, column);
  gap: var(--li-gap, 0.2rem);
  flex-wrap: var(--li-wrap, nowrap);
  padding-inline-start: var(--li-ps, var(--spc-3));
}

/* Unstyled lists */
[role="list"],
[data-list~="unstyled"] {
  list-style: var(--li-style, none);
  margin-block-end: var(--li-my, 0);
  margin-block-start: var(--li-mx, 0);
}

/* Inline lists */
[data-list~="inline"] {
  --li-direction: row;
  --li-gap: 1rem;
  --li-wrap: wrap;
  --li-px: 0;
  --li-pi: 0;
}
```

#### Examples

**Inline Navigation:**
```html
<ul data-list="unstyled inline">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>
```

**Spaced List:**
```css
ul.spaced {
  --li-gap: 1rem;
}
```

**Compact List:**
```css
ul.compact {
  --li-gap: 0.1rem;
}
```

---

## Layout

### Body

Root body layout configuration.

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--body-display` | `flex` | Display mode |
| `--body-direction` | `column` | Flex direction |

#### Default Styles

```css
body {
  display: var(--body-display, flex);
  min-height: 100%;
  flex-direction: var(--body-direction, column);
  min-width: 20.3125rem; /* 325px minimum */
  font-size: var(--fs-0);
}

main {
  flex-grow: 1; /* Main content fills available space */
}
```

---

### Sections

Semantic section spacing.

#### CSS Variables

| Variable | Description |
|----------|-------------|
| `--sect-y` | Horizontal margin (inline) |
| `--sect-x` | Vertical padding (block) |

#### Default Styles

```css
section:not(nav) {
  margin-inline: var(--sect-y, auto);
  padding-block: var(--sect-x, --spc-4);
}
```

---

### Skip Links

Accessibility feature for keyboard navigation.

#### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-skip-link-bg` | `#f5f5f5` | Background color when focused |

#### Default Styles

```css
body > a[href^="#"] {
  position: absolute;
  top: -4rem;
  left: 0;
  width: 100%;
  display: block;
  justify-content: flex-start;
  padding: 1rem;
  z-index: 100;
  transition: top 0.3s;
  border-radius: 0;
  background-color: var(--color-skip-link-bg, #f5f5f5);
}

body > a[href^="#"]:focus {
  top: 0; /* Slides into view on focus */
}
```

#### Usage

```html
<body>
  <a href="#main-content">Skip to main content</a>
  <!-- Page content -->
  <main id="main-content">
    <!-- Main content starts here -->
  </main>
</body>
```

---

## Utility Variables

### Boolean-Like Variables

Special variables for conditional CSS logic.

| Variable | Value | Purpose |
|----------|-------|---------|
| `--TRUE` | `initial` | Enables a CSS property |
| `--FALSE` | ` ` (empty) | Disables a CSS property |

#### Documentation

```css
/* Boolean-like utility variables for conditional CSS logic
 * Usage: property: var(--condition, var(--TRUE)) value;
 * --TRUE (initial) applies the value, --FALSE (empty) skips it
 */
:root {
  --TRUE: initial;
  --FALSE: ;
}
```

#### Example Usage

```css
/* Conditional border */
.element {
  border: var(--enable-border, var(--FALSE)) 1px solid black;
}

/* Enable the border */
.element.bordered {
  --enable-border: var(--TRUE);
}
```

---

## Best Practices

### 1. Use Rem Units

Convert all pixel values to rem for responsive scaling.

```css
/* ❌ Don't use pixels */
hr {
  --hr-border-width: 2px;
  --hr-margin-block: 24px;
}

/* ✅ Use rem */
hr {
  --hr-border-width: 0.125rem; /* 2px ÷ 16 = 0.125rem */
  --hr-margin-block: 1.5rem;   /* 24px ÷ 16 = 1.5rem */
}
```

### 2. Use Logical Properties

Support internationalization with logical properties.

```css
/* ❌ Physical properties */
margin-left: 1rem;
margin-right: 1rem;
margin-top: 2rem;
margin-bottom: 2rem;

/* ✅ Logical properties */
margin-inline: 1rem;  /* Left/right in LTR, right/left in RTL */
margin-block: 2rem;   /* Top/bottom */
```

### 3. Reference Global Theme Colors

Use semantic color variables that cascade from global theme.

```css
/* ❌ Hard-coded colors */
hr {
  --hr-border-color: #d3d3d3;
}

/* ✅ Semantic theme colors */
hr {
  --hr-border-color: var(--color-border-subtle, #d3d3d3);
}
```

### 4. Split Compound Properties

Enable partial overrides with atomic properties.

```css
/* ❌ Shorthand property */
--blockquote-border: 5px solid #d3d3d3;

/* ✅ Atomic properties */
--blockquote-border-width: 0.3125rem;
--blockquote-border-style: solid;
--blockquote-border-color: var(--color-border, #d3d3d3);
```

---

## Theming Examples

### Dark Theme

```css
:root {
  --color-border-subtle: #333333;
  --color-border: #404040;
  --color-skip-link-bg: #2d2d2d;
}
```

### High Contrast Theme

```css
:root {
  --hr-border-width: 0.125rem;
  --hr-border-color: #000000;
  --blockquote-border-width: 0.5rem;
  --blockquote-border-color: #000000;
  --fs-weight: 700;
}
```

### Minimal Theme

```css
:root {
  --hr-border-width: 0.0625rem;
  --hr-border-color: var(--color-border-subtle);
  --hr-margin-block: 3rem;
  --blockquote-border-width: 0.125rem;
}
```

---

## Resources

- **CSS Variables Reference** - See [CSS-VARIABLES.md](../../CSS-VARIABLES.md) for complete documentation
- **Theme Examples** - See [theme-examples.css](../../theme-examples.css) for pre-built themes
- **Card Styles** - See [components/cards/STYLES.mdx](../components/cards/STYLES.mdx) for card-specific variables

---

## Quick Reference

### HR Variables

```css
--hr-border-width: 0.0625rem;
--hr-border-style: solid;
--hr-border-color: var(--color-border-subtle, #d3d3d3);
--hr-margin-block: 1.5rem;
```

### Blockquote Variables

```css
--blockquote-padding: 1rem;
--blockquote-border-width: 0.3125rem;
--blockquote-border-style: solid;
--blockquote-border-color: var(--color-border, #d3d3d3);
```

### Typography Variables

```css
--fs-weight: 500;
```

### Layout Variables

```css
--body-display: flex;
--body-direction: column;
```

### Utility Variables

```css
--TRUE: initial;
--FALSE: ;
```

---

## Browser Support

All global styles use modern CSS features:

- ✅ **CSS Custom Properties** - All modern browsers (IE11 not supported)
- ✅ **Logical Properties** (`padding-inline`, `margin-block`) - Chrome 87+, Firefox 66+, Safari 14.1+
- ✅ **Flexbox** - All modern browsers
- ✅ **`:focus-visible`** - Chrome 86+, Firefox 85+, Safari 15.4+

For older browser support, fallback values ensure graceful degradation.
