# Nav Component CSS Variable Migration Guide

**Component:** Nav
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Nav component to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--nav-px` | `--nav-padding-inline` | Horizontal padding | Used in multiple locations |
| `--nav-py` | `--nav-padding-block` | Vertical padding | For nav sections/lists |
| `--nav-h` | `--nav-height` | Minimum height | Root nav element |
| `--nav-w` | `--nav-width` | Width | Root nav element |
| `--nav-mx` | `--nav-margin-inline` | Horizontal margin | Root nav element |
| `--nav-mb` | `--nav-margin-block-end` | Bottom margin | For nav sections/lists |
| `--nav-dsp` | `--nav-display` | Display mode | Default: flex |
| `--nav-cl` | `--nav-color` | Text color | For `[data-variant]` |
| `--nav-hov-bg` | `--nav-hover-bg` | Hover background | List item hover state |

### Non-Scoped Variables Fixed

Previously non-scoped variables have been properly namespaced:

| Old Variable | New Variable | Context | Notes |
|--------------|--------------|---------|-------|
| `--py` | `--nav-padding-block` | nav > section > div | Properly scoped |
| `--px` | `--nav-img-padding-inline` | nav img[alt] | Image-specific padding |
| `--w` | `--nav-img-width` | nav img[alt] | Image-specific width |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Nav styles in your custom CSS, update variable names:

**Before:**
```css
nav {
  --nav-px: 1.5rem;
  --nav-py: 0.5rem;
  --nav-h: 4rem;
  --nav-w: 100%;
  --nav-mx: auto;
  --nav-mb: 1rem;
  --nav-dsp: flex;
  --nav-cl: #333;
  --nav-hov-bg: #f0f0f0;
}
```

**After:**
```css
nav {
  --nav-padding-inline: 1.5rem;
  --nav-padding-block: 0.5rem;
  --nav-height: 4rem;
  --nav-width: 100%;
  --nav-margin-inline: auto;
  --nav-margin-block-end: 1rem;
  --nav-display: flex;
  --nav-color: #333;
  --nav-hover-bg: #f0f0f0;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Nav style={{
  '--nav-px': '2rem',
  '--nav-bg': '#ffffff',
  '--nav-hov-bg': '#e0e0e0'
}}>
  {/* content */}
</Nav>
```

**After:**
```tsx
<Nav style={{
  '--nav-padding-inline': '2rem',
  '--nav-bg': '#ffffff',
  '--nav-hover-bg': '#e0e0e0'
}}>
  {/* content */}
</Nav>
```

### 3. Update Theme Files

If you have theme configuration files defining Nav variables:

**Before:**
```css
/* theme.css */
:root {
  --nav-px: 1rem;
  --nav-py: 0;
  --nav-dsp: flex;
  --nav-cl: var(--color-text);
}
```

**After:**
```css
/* theme.css */
:root {
  --nav-padding-inline: 1rem;
  --nav-padding-block: 0;
  --nav-display: flex;
  --nav-color: var(--color-text);
}
```

## Updated Variable Reference

### Layout & Sizing
- `--nav-display`: Display mode (default: flex)
- `--nav-width`: Nav width (default: auto)
- `--nav-height`: Minimum height (default: fit-content)
- `--nav-direction`: Flex direction (default: row)
- `--nav-align`: Vertical alignment (default: center)
- `--nav-justify`: Horizontal justification (default: space-between)

### Spacing
- `--nav-padding-inline`: Horizontal padding (default: 1rem)
- `--nav-padding-block`: Vertical padding (default: 0)
- `--nav-margin-inline`: Horizontal margin (default: 0)
- `--nav-margin-block-end`: Bottom margin (default: 0)
- `--nav-gap`: Gap between nav items (default: 0)

### Typography & Color
- `--nav-fs`: Font size (default: 0.9rem) - *Unchanged (approved abbreviation)*
- `--nav-color`: Text color
- `--nav-bg`: Background color (default: initial) - *Unchanged (approved abbreviation)*
- `--nav-hover-bg`: Background color on hover (default: #e8e8e8)

### Focus Indicators (WCAG 2.4.7)
- `--nav-focus-color`: Focus outline color (default: currentColor)
- `--nav-focus-width`: Focus outline width (default: 0.125rem / 2px)
- `--nav-focus-offset`: Focus outline offset (default: 0.125rem / 2px)
- `--nav-focus-style`: Focus outline style (default: solid)

### Image Elements
- `--nav-img-padding-inline`: Image padding (default: 0 var(--s1))
- `--nav-img-width`: Image width (default: var(--brand-w, 3.6rem))

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Verify responsive behavior (mobile/tablet/desktop)
- [ ] Test keyboard navigation (Tab, Enter, Arrow keys)
- [ ] Verify focus indicators meet WCAG 2.4.7
- [ ] Test with `data-variant` attribute
- [ ] Test block layout (`data-list="block"`)
- [ ] Verify custom theme overrides
- [ ] Test with images in nav items
- [ ] Validate hover states
- [ ] Check accessibility with screen readers

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--nav-px\|--nav-py\|--nav-h\b\|--nav-w\b\|--nav-mx\|--nav-mb\|--nav-dsp\|--nav-cl\|--nav-hov-bg" .

# Sed replacements (use with caution, test first)
sed -i 's/--nav-px/--nav-padding-inline/g' your-file.css
sed -i 's/--nav-py/--nav-padding-block/g' your-file.css
sed -i 's/--nav-h\b/--nav-height/g' your-file.css
sed -i 's/--nav-w\b/--nav-width/g' your-file.css
sed -i 's/--nav-mx/--nav-margin-inline/g' your-file.css
sed -i 's/--nav-mb/--nav-margin-block-end/g' your-file.css
sed -i 's/--nav-dsp/--nav-display/g' your-file.css
sed -i 's/--nav-cl/--nav-color/g' your-file.css
sed -i 's/--nav-hov-bg/--nav-hover-bg/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Nav component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Button component: MIGRATION-button-v1.0.0.md
- Card component: MIGRATION-card-v1.0.0.md
- Form component: MIGRATION-form-v1.0.0.md

## Standards Reference

This migration follows the CSS Variable Naming Standard (v1.0):

- **Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`
- **Approved abbreviations:** `bg`, `fs`, `fw`, `radius`, `gap`
- **Prohibited abbreviations:** `px`/`py`, `w`/`h`, `cl`, `dsp`, `bdr`
- **Units:** All spacing in rem (not px)
- **Logical properties:** Use `padding-inline`/`padding-block` instead of `px`/`py`
