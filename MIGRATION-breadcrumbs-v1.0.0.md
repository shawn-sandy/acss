# Breadcrumbs Component CSS Variable Migration Guide

**Component:** Breadcrumbs
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Breadcrumbs component to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--breadcrumb-px` | `--breadcrumb-padding-inline` | Horizontal padding | Default: unset |
| `--breadcrumb-dsp` | `--breadcrumb-display` | Display mode | Default: flex |
| `--breadcrumb-w` | `--breadcrumb-width` | List item width | Default: fit-content |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Breadcrumb styles in your custom CSS, update variable names:

**Before:**
```css
nav[data-breadcrumb] {
  --breadcrumb-px: 1rem;
  --breadcrumb-dsp: flex;
  --breadcrumb-w: auto;
  --breadcrumb-gap: 0.75rem;
  --breadcrumb-color: #333;
}
```

**After:**
```css
nav[data-breadcrumb] {
  --breadcrumb-padding-inline: 1rem;
  --breadcrumb-display: flex;
  --breadcrumb-width: auto;
  --breadcrumb-gap: 0.75rem;
  --breadcrumb-color: #333;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Breadcrumb
  currentRoute="/products/shirts"
  style={{
    '--breadcrumb-px': '1.5rem',
    '--breadcrumb-dsp': 'flex',
    '--breadcrumb-w': '100%'
  }}
/>
```

**After:**
```tsx
<Breadcrumb
  currentRoute="/products/shirts"
  style={{
    '--breadcrumb-padding-inline': '1.5rem',
    '--breadcrumb-display': 'flex',
    '--breadcrumb-width': '100%'
  }}
/>
```

### 3. Update Theme Files

If you have theme configuration files defining Breadcrumb variables:

**Before:**
```css
/* theme.css */
:root {
  --breadcrumb-px: unset;
  --breadcrumb-dsp: flex;
  --breadcrumb-w: fit-content;
  --breadcrumb-gap: 0.5rem;
  --breadcrumb-color: currentColor;
  --breadcrumb-current-color: rgb(46, 46, 46);
  --breadcrumb-fs: var(--fs-3);
}
```

**After:**
```css
/* theme.css */
:root {
  --breadcrumb-padding-inline: unset;
  --breadcrumb-display: flex;
  --breadcrumb-width: fit-content;
  --breadcrumb-gap: 0.5rem;
  --breadcrumb-color: currentColor;
  --breadcrumb-current-color: rgb(46, 46, 46);
  --breadcrumb-fs: var(--fs-3);
}
```

## Updated Variable Reference

### Layout & Display
- `--breadcrumb-display`: Display mode for breadcrumb list (default: flex)
- `--breadcrumb-width`: Width of list items (default: fit-content)

### Spacing
- `--breadcrumb-padding-inline`: Horizontal padding (default: unset)
- `--breadcrumb-gap`: Gap between breadcrumb items (default: 0.5rem)

### Typography & Color
- `--breadcrumb-fs`: Font size (default: var(--fs-3)) - *Unchanged (approved abbreviation)*
- `--breadcrumb-color`: Text color (default: currentColor)
- `--breadcrumb-current-color`: Current page color (default: rgb(46, 46, 46))

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Test automatic path parsing from currentRoute
- [ ] Verify custom routes with `routes` prop
- [ ] Test text truncation for long breadcrumb names
- [ ] Verify `aria-current="page"` on current page
- [ ] Check ARIA label on truncated text
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Verify separator rendering (aria-hidden spans)
- [ ] Test with various route depths (2-5+ levels)
- [ ] Check responsive behavior
- [ ] Validate screen reader announcements
- [ ] Test color contrast for WCAG 2.1 AA

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--breadcrumb-px\|--breadcrumb-dsp\|--breadcrumb-w\b" .

# Sed replacements (use with caution, test first)
sed -i 's/--breadcrumb-px/--breadcrumb-padding-inline/g' your-file.css
sed -i 's/--breadcrumb-dsp/--breadcrumb-display/g' your-file.css
sed -i 's/--breadcrumb-w\b/--breadcrumb-width/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Notable Implementation Details

### Selector Specificity

The breadcrumb styles use a specific selector to avoid conflicts with main navigation:

```scss
nav:not(body > nav),
nav[data-breadcrumb] {
  // Breadcrumb styles
}
```

**Why this matters:**
- `nav:not(body > nav)` excludes the main site navigation
- `nav[data-breadcrumb]` provides explicit breadcrumb targeting
- Prevents CSS variable collisions between nav and breadcrumb components

### Automatic Path Parsing

The component automatically generates breadcrumbs from the `currentRoute` prop:
- Route: `/products/shirts` → Home / Products / Shirts
- Capitalizes each segment
- Creates links for all segments except the current page

### Text Truncation

Long breadcrumb names are automatically truncated:
- Visual truncation with CSS `text-overflow: ellipsis`
- Full text preserved in `aria-label` for screen readers
- Configurable via `maxLength` prop

### Accessibility Features

- **Semantic HTML:** Uses `<nav>` with `<ol>` list structure
- **ARIA Labels:** `aria-label="Breadcrumb"` on nav element
- **Current Page:** `aria-current="page"` on active link
- **Hidden Separators:** Separator spans use `aria-hidden="true"`
- **Screen Readers:** Full text in aria-label even when truncated

## Selectors Affected

This refactoring affects:
- `nav:not(body > nav)` (breadcrumb navigation, excluding main nav)
- `nav[data-breadcrumb]` (explicit breadcrumb navigation)

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Breadcrumb component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Nav component: MIGRATION-nav-v1.0.0.md
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
- **Prohibited abbreviations:** `px`/`py`, `w`/`h`, `dsp` (use `display`)
- **Units:** All spacing in rem (not px)
- **Logical properties:** Use `padding-inline` instead of `px`
