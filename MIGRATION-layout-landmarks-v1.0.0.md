# Layout Landmarks Component CSS Variable Migration Guide

**Component:** Layout Landmarks (Main, Footer)
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Layout Landmarks component (main, footer elements) to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--content-w` | `--content-width` | Max content width | Default: min(100%, 1480px) |
| `--content-mx` | `--content-margin-inline` | Horizontal margin | Default: auto (for centering) |
| `--content-px` | `--content-padding-inline` | Horizontal padding | Default: 1rem |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Main/Footer styles in your custom CSS, update variable names:

**Before:**
```css
main,
footer {
  --content-w: min(100%, 1200px);
  --content-mx: auto;
  --content-px: 2rem;
  --content-gap: 3rem;
}
```

**After:**
```css
main,
footer {
  --content-width: min(100%, 1200px);
  --content-margin-inline: auto;
  --content-padding-inline: 2rem;
  --content-gap: 3rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Main style={{
  '--content-w': 'min(100%, 1600px)',
  '--content-mx': 'auto',
  '--content-px': '1.5rem'
}}>
  {/* content */}
</Main>
```

**After:**
```tsx
<Main style={{
  '--content-width': 'min(100%, 1600px)',
  '--content-margin-inline': 'auto',
  '--content-padding-inline': '1.5rem'
}}>
  {/* content */}
</Main>
```

### 3. Update Theme Files

If you have theme configuration files defining Landmarks variables:

**Before:**
```css
/* theme.css */
:root {
  --content-w: min(100%, 1480px);
  --content-mx: auto;
  --content-px: 1rem;
  --content-gap: 2rem;
}
```

**After:**
```css
/* theme.css */
:root {
  --content-width: min(100%, 1480px);
  --content-margin-inline: auto;
  --content-padding-inline: 1rem;
  --content-gap: 2rem;
}
```

## Updated Variable Reference

### Content Layout (Main/Footer)
- `--content-width`: Max content width (default: min(100%, 1480px))
- `--content-margin-inline`: Horizontal margin for centering (default: auto)
- `--content-padding-inline`: Horizontal padding (default: 1rem)
- `--content-gap`: Gap between article and aside in sidebar layout (default: 2rem)

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Test max-width constraint (1480px)
- [ ] Verify content centering with margin-inline: auto
- [ ] Test responsive behavior below 1480px
- [ ] Verify sidebar layout (article + aside)
- [ ] Check gap spacing between article and aside
- [ ] Test padding on small viewports
- [ ] Verify footer layout
- [ ] Test with nested sections
- [ ] Check accessibility with screen readers
- [ ] Validate semantic landmarks (main, footer)

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--content-w\b\|--content-mx\|--content-px" .

# Sed replacements (use with caution, test first)
sed -i 's/--content-w\b/--content-width/g' your-file.css
sed -i 's/--content-mx/--content-margin-inline/g' your-file.css
sed -i 's/--content-px/--content-padding-inline/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Notable Implementation Details

### Responsive Content Width

The default content width uses `min()` function for fluid max-width:
```css
--content-width: min(100%, 1480px);
```

This ensures:
- Content never exceeds 1480px (readable line lengths)
- Content is 100% width on smaller screens
- No media queries needed for basic responsiveness

### Auto-Centering Pattern

Content is centered using logical properties:
```css
margin-inline: var(--content-margin-inline);  // auto
```

This creates horizontally centered content while respecting text direction (LTR/RTL).

### Sidebar Layout (Article + Aside)

The component includes automatic sidebar layout when sections contain article + aside:

```css
&:has(> article, > aside) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--content-gap);  // 2rem

  > article {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
  }

  > aside {
    flex-basis: 20rem;
    flex-grow: 1;
  }
}
```

**Benefits:**
- Article takes priority (flex-grow: 999)
- Aside has minimum width of 20rem
- Automatic wrapping on narrow screens
- Customizable gap via `--content-gap`

## Selectors Affected

This refactoring affects:
- `main` element
- `footer` element
- Any element using `--content-*` variables

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Layout/Landmarks component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Layout Header: MIGRATION-layout-header-v1.0.0.md
- Nav component: MIGRATION-nav-v1.0.0.md
- Details component: MIGRATION-details-v1.0.0.md
- Button component: MIGRATION-button-v1.0.0.md
- Card component: MIGRATION-card-v1.0.0.md
- Form component: MIGRATION-form-v1.0.0.md

## Standards Reference

This migration follows the CSS Variable Naming Standard (v1.0):

- **Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`
- **Approved abbreviations:** `bg`, `fs`, `fw`, `radius`, `gap`
- **Prohibited abbreviations:** `px`/`py`, `w`/`h`, `mx`/`my`
- **Units:** All spacing in rem (not px)
- **Logical properties:** Use `padding-inline`, `margin-inline` instead of `px`, `mx`
