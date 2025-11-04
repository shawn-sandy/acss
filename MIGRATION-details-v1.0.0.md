# Details Component CSS Variable Migration Guide

**Component:** Details
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Details component to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

All deprecated abbreviated CSS variables have been replaced with full descriptive names following the `--{component}-{property}` pattern.

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--details-px` | `--details-padding-inline` | Horizontal padding | Used in multiple locations |
| `--details-py` | `--details-padding-block` | Vertical padding | Used in multiple locations |
| `--details-h` | `--details-height` | Height | Default: max-content |
| `--details-w` | `--details-width` | Width | Default: 100% |
| `--max-h-closed` | `--details-max-height-closed` | Max height (closed) | Properly scoped |
| `--max-h-open` | `--details-max-height-open` | Max height (open) | Properly scoped |
| `--summary-px` | `--summary-padding-inline` | Summary horizontal padding | Falls back to details padding |
| `--summary-py` | `--summary-padding-block` | Summary vertical padding | Falls back to details padding |

### Scoping Improvements

Previously non-scoped variables have been properly namespaced with `details-` prefix:

| Old Variable | New Variable | Context | Notes |
|--------------|--------------|---------|-------|
| `--max-h-closed` | `--details-max-height-closed` | Root details element | Component-scoped |
| `--max-h-open` | `--details-max-height-open` | Open details state | Component-scoped |

## Migration Steps

### 1. Update Custom CSS

If you're overriding Details styles in your custom CSS, update variable names:

**Before:**
```css
details {
  --details-px: 2rem;
  --details-py: 1.5rem;
  --details-h: auto;
  --details-w: 90%;
  --max-h-closed: 5rem;
  --max-h-open: 60rem;
  --summary-px: 2rem;
  --summary-py: 1rem;
}
```

**After:**
```css
details {
  --details-padding-inline: 2rem;
  --details-padding-block: 1.5rem;
  --details-height: auto;
  --details-width: 90%;
  --details-max-height-closed: 5rem;
  --details-max-height-open: 60rem;
  --summary-padding-inline: 2rem;
  --summary-padding-block: 1rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via inline styles or the `style` prop:

**Before:**
```tsx
<Details style={{
  '--details-px': '2.5rem',
  '--details-py': '1.25rem',
  '--max-h-open': '40rem'
}}>
  {/* content */}
</Details>
```

**After:**
```tsx
<Details style={{
  '--details-padding-inline': '2.5rem',
  '--details-padding-block': '1.25rem',
  '--details-max-height-open': '40rem'
}}>
  {/* content */}
</Details>
```

### 3. Update Theme Files

If you have theme configuration files defining Details variables:

**Before:**
```css
/* theme.css */
:root {
  --details-px: 1.5rem;
  --details-py: 1rem;
  --details-w: 100%;
  --max-h-closed: 6.25rem;
  --max-h-open: 50rem;
}
```

**After:**
```css
/* theme.css */
:root {
  --details-padding-inline: 1.5rem;
  --details-padding-block: 1rem;
  --details-width: 100%;
  --details-max-height-closed: 6.25rem;
  --details-max-height-open: 50rem;
}
```

## Updated Variable Reference

### Layout & Display
- `--details-display`: Display mode (default: flex)
- `--details-direction`: Flex direction (default: column)
- `--details-justify`: Content justification (default: flex-start)
- `--details-width`: Details width (default: 100%)
- `--details-height`: Details height (default: max-content)
- `--details-gap`: Gap between elements (default: 0rem)

### Sizing & Constraints
- `--details-max-height-closed`: Max height when closed (default: 6.25rem / 100px)
- `--details-max-height-open`: Max height when open (default: 50rem / 800px)

### Spacing
- `--details-padding-inline`: Horizontal padding (default: 1.5rem / 24px)
- `--details-padding-block`: Vertical padding (default: 1rem / 16px)

### Borders & Radius
- `--details-border`: Border style (default: 0.0625rem solid #dfdfdf)
- `--details-radius`: Border radius (default: 0)

### Summary Element
- `--summary-display`: Summary display mode (default: flex)
- `--summary-justify`: Summary content justification (default: flex-start)
- `--summary-align`: Summary vertical alignment (default: center)
- `--summary-gap`: Gap within summary (default: 0.5rem)
- `--summary-padding-inline`: Summary horizontal padding (fallback: `--details-padding-inline`)
- `--summary-padding-block`: Summary vertical padding (fallback: `--details-padding-block`)
- `--summary-cursor`: Summary cursor style (default: pointer)
- `--summary-transitions`: Transition timing (default: all 0.75s ease-in-out)

## Testing Checklist

- [ ] Visual regression testing in Storybook
- [ ] Test open/close transitions
- [ ] Verify keyboard interactions (Enter, Space)
- [ ] Test accordion behavior with `name` attribute
- [ ] Verify focus states and `:focus-within` styling
- [ ] Test with nested content (paragraphs, lists, etc.)
- [ ] Check responsive behavior at different viewport sizes
- [ ] Validate `interpolate-size: allow-keywords` support
- [ ] Test `@starting-style` animations
- [ ] Verify `transition-behavior: allow-discrete` fallback
- [ ] Check border radius on first/last/only-child details
- [ ] Test custom theme overrides

## Automated Search & Replace

For large codebases, use these regex patterns:

```bash
# Find old variable usage
grep -r "--details-px\|--details-py\|--details-h\b\|--details-w\b\|--max-h-closed\|--max-h-open\|--summary-px\|--summary-py" .

# Sed replacements (use with caution, test first)
sed -i 's/--details-px/--details-padding-inline/g' your-file.css
sed -i 's/--details-py/--details-padding-block/g' your-file.css
sed -i 's/--details-h\b/--details-height/g' your-file.css
sed -i 's/--details-w\b/--details-width/g' your-file.css
sed -i 's/--max-h-closed/--details-max-height-closed/g' your-file.css
sed -i 's/--max-h-open/--details-max-height-open/g' your-file.css
sed -i 's/--summary-px/--summary-padding-inline/g' your-file.css
sed -i 's/--summary-py/--summary-padding-block/g' your-file.css
```

## Backwards Compatibility

**This is a breaking change.** There is no backwards compatibility layer. Projects using the old variable names must update to the new naming convention.

### Migration Timeline

1. **Immediate:** Update internal component SCSS
2. **v1.0.0 Release:** Publish with new variable names
3. **Documentation:** Update Storybook stories and migration guide
4. **Communication:** Notify users via CHANGELOG and release notes

## Notable Implementation Details

### Transition Support

The Details component uses modern CSS features for smooth animations:

1. **interpolate-size: allow-keywords** - Enables smooth transitions between `auto` and fixed sizes
2. **@starting-style** - Defines initial state for enter animations
3. **transition-behavior: allow-discrete** - Allows transitions on discrete properties (with fallback)

These features ensure smooth expand/collapse animations while maintaining accessibility.

### Max Height Strategy

The component uses max-height for animations:
- **Closed:** `--details-max-height-closed` (default: 6.25rem)
- **Open:** `--details-max-height-open` (default: 50rem)

Adjust these values based on your content to prevent clipping or excessive whitespace.

### Summary Padding Fallback

Summary padding variables fallback to details padding:
```css
padding-inline: var(--summary-padding-inline, var(--details-padding-inline));
padding-block: var(--summary-padding-block, var(--details-padding-block));
```

This allows independent summary styling while maintaining consistency by default.

## Support

If you encounter issues during migration:

1. Check the [CSS Variable Naming Standard](docs/css-variables.md)
2. Review Details component stories in Storybook
3. Refer to the updated component documentation
4. Report issues on GitHub

## Related Changes

- Nav component: MIGRATION-nav-v1.0.0.md
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
- **Scoping:** All variables must be component-prefixed
