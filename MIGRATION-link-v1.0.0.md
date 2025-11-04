# Link Component CSS Variable Migration Guide

**Component:** Link
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Link component to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names or approved abbreviations following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--link-px` | `--link-padding-inline` | Horizontal padding | For button variants |
| `--link-py` | `--link-padding-block` | Vertical padding | For button variants |
| `--link-weight` | `--link-fw` | Font weight | `fw` is approved abbreviation |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Link styles in your custom CSS, update variable names:

**Before:**
```css
a[href] {
  --link-color: #085ab7;
  --link-weight: 500;
  --link-px: 1rem;
  --link-py: 0.5rem;
  --link-fs: 1.125rem;
}
```

**After:**
```css
a[href] {
  --link-color: #085ab7;
  --link-fw: 500;
  --link-padding-inline: 1rem;
  --link-padding-block: 0.5rem;
  --link-fs: 1.125rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Link
  href="/products"
  style={{
    '--link-weight': '600',
    '--link-px': '1.5rem',
    '--link-py': '0.75rem'
  }}
>
  Products
</Link>
```

**After:**
```tsx
<Link
  href="/products"
  style={{
    '--link-fw': '600',
    '--link-padding-inline': '1.5rem',
    '--link-padding-block': '0.75rem'
  }}
>
  Products
</Link>
```

### 3. Update Theme Files

If you have theme configuration files defining Link variables:

**Before:**
```css
/* theme.css */
:root {
  --link-color: #085ab7;
  --link-weight: 400;
  --link-fs: 1rem;
  --link-px: 0;
  --link-py: 0;
  --link-bg: transparent;
  --link-radius: 0.25rem;
}
```

**After:**
```css
/* theme.css */
:root {
  --link-color: #085ab7;
  --link-fw: 400;
  --link-fs: 1rem;
  --link-padding-inline: 0;
  --link-padding-block: 0;
  --link-bg: transparent;
  --link-radius: 0.25rem;
}
```

## Updated Variable Reference

### Typography & Color
- `--link-color`: Link text color (default: #085ab7)
- `--link-fw`: Font weight (default: 400) - *Updated (approved abbreviation)*
- `--link-fs`: Font size (default: 1rem) - *Unchanged (approved abbreviation)*

### Text Decoration
- `--link-decoration`: Text decoration style (default: none, underline on hover/focus)
- `--link-decoration-offset`: Underline offset (default: 0.09375rem / 1.5px)
- `--link-decoration-thickness`: Underline thickness (default: 0.0625rem / 1px)
- `--link-skip-ink`: Text decoration skip ink (default: auto)

### Background & Border
- `--link-bg`: Background color (default: transparent) - *Unchanged (approved abbreviation)*
- `--link-radius`: Border radius (default: 0.25rem, 99rem for pills) - *Unchanged (approved abbreviation)*

### Spacing (Button Variants)
- `--link-padding-inline`: Horizontal padding (default: 0, calculated for button variants) - *Updated*
- `--link-padding-block`: Vertical padding (default: 0, calculated for button variants) - *Updated*

### Focus Indicators (WCAG 2.4.7)
- `--link-focus-color`: Focus outline color (default: currentColor)
- `--link-focus-width`: Focus outline width (default: 0.125rem / 2px)
- `--link-focus-offset`: Focus outline offset (default: 0.125rem / 2px)
- `--link-focus-style`: Focus outline style (default: solid)

### Transitions
- `--link-transition`: Transition timing (default: all 0.75s ease-in-out)

### Button Variants
- `--link-button-color`: Button link text color (default: var(--link-color))
- `--link-border-width`: Button border width (default: 0.125rem / 2px)
- `--link-border-color`: Button border color (default: currentColor)
- `--link-border-style`: Button border style (default: solid)

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Test standard text links
- [ ] Test button-styled links (`[data-btn]`)
- [ ] Test pill variant (`[data-link~='pill']`)
- [ ] Test links with `<b>` wrapper (button style)
- [ ] Test links with `<i>` wrapper (pill style)
- [ ] Verify hover state (underline appears)
- [ ] Test focus indicators (keyboard navigation)
- [ ] Verify `:focus-visible` behavior (keyboard vs mouse)
- [ ] Test visited and active states
- [ ] Check external link security (`rel="noopener noreferrer"`)
- [ ] Validate WCAG 2.1 AA compliance:
  - [ ] Focus indicators meet 2.4.7 (3:1 contrast)
  - [ ] Color contrast meets 1.4.3 (4.5:1 for normal text)
  - [ ] Underline offset and thickness readable
- [ ] Test scale transitions on button variants
- [ ] Verify prefetch attribute functionality

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--link-px\|--link-py\|--link-weight\b" .

# Sed replacements (use with caution, test first)
sed -i 's/--link-px/--link-padding-inline/g' your-file.css
sed -i 's/--link-py/--link-padding-block/g' your-file.css
sed -i 's/--link-weight\b/--link-fw/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Notable Implementation Details

### Button-Styled Links

The Link component supports multiple ways to apply button styling:

1. **Data attribute:** `<Link href="/" data-btn>Button Link</Link>`
2. **Bold wrapper:** `<Link href="/"><b>Button Link</b></Link>`
3. **Italic wrapper (pill):** `<Link href="/"><i>Pill Link</i></Link>`

All variants use the same CSS variables for consistent styling.

### Dynamic Padding Calculation

Button variant padding is dynamically calculated based on font size:

```scss
padding-inline: var(--link-fs);
padding-block: calc(var(--link-fs) - 0.4rem);
```

This ensures proportional spacing regardless of font size changes.

### WCAG 2.1 AA Compliance Features

#### Focus Indicators (2.4.7)
- Minimum 3:1 contrast ratio
- 2px outline width
- Separate `:focus` and `:focus-visible` states
- Visible outline on keyboard navigation

#### Color Contrast (1.4.3)
- Default link color #085ab7 meets 4.5:1 ratio on white background
- Underline added on hover/focus for additional clarity

#### Text Decoration
- Optimized underline offset (1.5px) for readability
- Proper skip-ink behavior for descenders
- Consistent 1px thickness

### Pill Variant

Pill links use `--link-radius: 99rem` for fully rounded corners:

```scss
&[data-link~='pill'],
&:has(> i) {
  --link-radius: 99rem;
  --link-decoration: none;
}
```

This creates the characteristic pill shape while maintaining button-style functionality.

### Security for External Links

External links automatically receive security attributes:
- `rel="noopener noreferrer"` to prevent tab-napping
- `target="_blank"` support with appropriate rel attributes

## Selectors Affected

This refactoring affects:
- `a[href]` (all anchor elements with href attribute)
- `a[data-btn]` (button-styled links)
- `a[data-link~='pill']` (pill variant)
- `a:has(> b)` (bold-wrapped button links)
- `a:has(> i)` (italic-wrapped pill links)

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Link component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Nav component: MIGRATION-nav-v1.0.0.md
- Breadcrumbs: MIGRATION-breadcrumbs-v1.0.0.md
- Layout Header: MIGRATION-layout-header-v1.0.0.md
- Layout Landmarks: MIGRATION-layout-landmarks-v1.0.0.md
- Details component: MIGRATION-details-v1.0.0.md
- Button component: MIGRATION-button-v1.0.0.md
- Card component: MIGRATION-card-v1.0.0.md
- Form component: MIGRATION-form-v1.0.0.md

## Standards Reference

This migration follows the CSS Variable Naming Standard (v1.0):

- **Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`
- **Approved abbreviations:** `bg`, `fs`, `fw`, `radius`, `gap`
- **Prohibited abbreviations:** `px`/`py`, `weight` (use `fw`)
- **Units:** All spacing in rem (not px)
- **Logical properties:** Use `padding-inline`/`padding-block` instead of `px`/`py`
