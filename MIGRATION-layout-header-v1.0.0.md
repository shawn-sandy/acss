# Layout Header Component CSS Variable Migration Guide

**Component:** Layout Header (Overlay/Hero)
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Layout Header component (overlay/hero patterns) to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--overlay-px` | `--overlay-padding-inline` | Horizontal padding | Default: auto |
| `--overlay-py` | `--overlay-padding-block` | Vertical padding | Default: auto |
| `--overlay-mx` | `--overlay-margin-inline` | Horizontal margin | Default: auto |
| `--overlay-my` | `--overlay-margin-block` | Vertical margin | Default: auto |
| `--overlay-h` | `--overlay-height` | Minimum height | Default: 40vh |
| `--overlay-max-h` | `--overlay-max-height` | Maximum height | Default: 500px |
| `--overlay-w` | `--overlay-width` | Width | Default: 100% |
| `--overlay-content-w` | `--overlay-content-width` | Content max width | Default: 80% |
| `--header-lh` | `--header-line-height` | Heading line height | Default: 1.1 |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Header/Overlay styles in your custom CSS, update variable names:

**Before:**
```css
header,
[data-hero],
[data-grid~='overlay'] {
  --overlay-px: auto;
  --overlay-py: auto;
  --overlay-mx: auto;
  --overlay-my: auto;
  --overlay-h: 50vh;
  --overlay-max-h: 600px;
  --overlay-w: 100%;
  --overlay-content-w: 70%;
  --header-lh: 1.2;
}
```

**After:**
```css
header,
[data-hero],
[data-grid~='overlay'] {
  --overlay-padding-inline: auto;
  --overlay-padding-block: auto;
  --overlay-margin-inline: auto;
  --overlay-margin-block: auto;
  --overlay-height: 50vh;
  --overlay-max-height: 600px;
  --overlay-width: 100%;
  --overlay-content-width: 70%;
  --header-line-height: 1.2;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Header style={{
  '--overlay-h': '60vh',
  '--overlay-w': '90%',
  '--overlay-content-w': '75%',
  '--header-lh': '1.15'
}}>
  {/* content */}
</Header>
```

**After:**
```tsx
<Header style={{
  '--overlay-height': '60vh',
  '--overlay-width': '90%',
  '--overlay-content-width': '75%',
  '--header-line-height': '1.15'
}}>
  {/* content */}
</Header>
```

### 3. Update Theme Files

If you have theme configuration files defining Header/Overlay variables:

**Before:**
```css
/* theme.css */
:root {
  --overlay-px: auto;
  --overlay-py: auto;
  --overlay-mx: auto;
  --overlay-my: auto;
  --overlay-h: 40vh;
  --overlay-max-h: 500px;
  --overlay-w: 100%;
  --overlay-content-w: 80%;
  --header-lh: 1.1;
}
```

**After:**
```css
/* theme.css */
:root {
  --overlay-padding-inline: auto;
  --overlay-padding-block: auto;
  --overlay-margin-inline: auto;
  --overlay-margin-block: auto;
  --overlay-height: 40vh;
  --overlay-max-height: 500px;
  --overlay-width: 100%;
  --overlay-content-width: 80%;
  --header-line-height: 1.1;
}
```

## Updated Variable Reference

### Layout & Display
- `--overlay-display`: Display mode (default: grid)
- `--overlay-grid-area`: Grid area name (default: overlay)
- `--overlay-placement`: Item placement (default: center)

### Sizing
- `--overlay-width`: Overlay width (default: 100%)
- `--overlay-height`: Minimum overlay height (default: 40vh)
- `--overlay-max-height`: Maximum overlay height (default: 500px / 31.25rem)
- `--overlay-content-width`: Content max width (default: 80%)

### Spacing
- `--overlay-padding`: General padding (default: 2rem)
- `--overlay-padding-inline`: Horizontal padding (default: auto)
- `--overlay-padding-block`: Vertical padding (default: auto)
- `--overlay-margin-inline`: Horizontal margin (default: auto)
- `--overlay-margin-block`: Vertical margin (default: auto)
- `--overlay-gap`: Gap between elements (default: 2rem)

### Colors & Typography
- `--overlay-color`: Text color (default: currentColor)
- `--overlay-bg`: Background color (default: whitesmoke)
- `--header-line-height`: Heading line height (default: 1.1)

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Test with `[data-hero]` attribute
- [ ] Test with `[data-grid~='overlay']` attribute
- [ ] Verify grid overlay with background images
- [ ] Test responsive behavior (viewport units like 40vh)
- [ ] Verify content centering and alignment
- [ ] Test heading line heights (h1, h2, h3)
- [ ] Check max-width constraints on content
- [ ] Verify gap spacing between elements
- [ ] Test with custom theme overrides
- [ ] Validate hero pattern with various content types
- [ ] Check accessibility with screen readers

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--overlay-px\|--overlay-py\|--overlay-mx\|--overlay-my\|--overlay-h\b\|--overlay-max-h\|--overlay-w\b\|--overlay-content-w\|--header-lh" .

# Sed replacements (use with caution, test first)
sed -i 's/--overlay-px/--overlay-padding-inline/g' your-file.css
sed -i 's/--overlay-py/--overlay-padding-block/g' your-file.css
sed -i 's/--overlay-mx/--overlay-margin-inline/g' your-file.css
sed -i 's/--overlay-my/--overlay-margin-block/g' your-file.css
sed -i 's/--overlay-h\b/--overlay-height/g' your-file.css
sed -i 's/--overlay-max-h/--overlay-max-height/g' your-file.css
sed -i 's/--overlay-w\b/--overlay-width/g' your-file.css
sed -i 's/--overlay-content-w/--overlay-content-width/g' your-file.css
sed -i 's/--header-lh/--header-line-height/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Notable Implementation Details

### Grid Overlay Pattern

The Header component uses CSS Grid with overlay pattern:
```scss
grid-template-areas: 'overlay';
place-items: var(--overlay-placement);
```

All direct children are placed in the same grid area (`overlay`), allowing background images to layer with content.

### Viewport-Based Height

Default height uses viewport units (`40vh`) for responsive hero sections:
- `--overlay-height`: Minimum height (40vh)
- `--overlay-max-height`: Maximum height cap (500px)

This ensures consistent sizing across devices while preventing excessive height on large screens.

### Content Width Constraint

Content width is constrained for readability:
- `--overlay-content-width`: 80% (default)
- Paragraph max-width: 60ch (for optimal line length)

### Auto Padding/Margin

Default `auto` values for padding/margin enable flexible centering:
```css
--overlay-padding-inline: auto;
--overlay-margin-inline: auto;
```

Override these for custom spacing needs.

## Selectors Affected

This refactoring affects elements with these selectors:
- `header`
- `[data-hero]`
- `[data-grid~='overlay']`

All three selectors share the same CSS variable scope.

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Layout/Landmarks component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Nav component: MIGRATION-nav-v1.0.0.md
- Details component: MIGRATION-details-v1.0.0.md
- Button component: MIGRATION-button-v1.0.0.md
- Card component: MIGRATION-card-v1.0.0.md
- Form component: MIGRATION-form-v1.0.0.md

## Standards Reference

This migration follows the CSS Variable Naming Standard (v1.0):

- **Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`
- **Approved abbreviations:** `bg`, `fs`, `fw`, `radius`, `gap`
- **Prohibited abbreviations:** `px`/`py`, `w`/`h`, `mx`/`my`, `lh` (use `line-height`)
- **Units:** All spacing in rem (not px), viewport units (vh) allowed for specific use cases
- **Logical properties:** Use `padding-inline`/`padding-block`, `margin-inline`/`margin-block`
