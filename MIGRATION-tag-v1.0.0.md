# Tag Component CSS Variable Migration Guide

**Component:** Tag
**Version:** 1.0.0
**Date:** 2025-11-03
**Migration Type:** CSS Variable Naming Standard Compliance

## Overview

This guide documents the CSS variable naming changes for the Tag component to comply with the standardized naming convention outlined in `docs/css-variables.md`.

## Breaking Changes

### CSS Variable Name Changes

| Old Variable Name | New Variable Name | Property | Notes |
|-------------------|-------------------|----------|-------|
| `--tag-px` | `--tag-padding-inline` | Horizontal padding | Default: 0.7rem (11.2px) |
| `--tag-py` | `--tag-padding-block` | Vertical padding | Default: 0.2rem (3.2px) |

## Migration Steps

### Update Custom CSS

**Before:**
```css
[data-tag] {
  --tag-px: 1rem;
  --tag-py: 0.5rem;
  --tag-fs: 0.9rem;
}
```

**After:**
```css
[data-tag] {
  --tag-padding-inline: 1rem;
  --tag-padding-block: 0.5rem;
  --tag-fs: 0.9rem;
}
```

### Automated Search & Replace

```bash
sed -i 's/--tag-px/--tag-padding-inline/g' your-file.css
sed -i 's/--tag-py/--tag-padding-block/g' your-file.css
```

## Updated Variable Reference

### Spacing
- `--tag-padding-inline`: Horizontal padding (default: 0.7rem / 11.2px)
- `--tag-padding-block`: Vertical padding (default: 0.2rem / 3.2px)

### Typography
- `--tag-fs`: Font size (default: 0.8rem / 12.8px)
- `--tag-fw`: Font weight (default: 500)
- `--tag-color`: Text color (default: currentColor)

### Appearance
- `--tag-bg`: Background color (default: lightgray)
- `--tag-radius`: Border radius (default: 99rem for pill, 0.5rem for block)
- `--tag-display`: Display mode (default: inline-block)

### Variant Colors (WCAG AA Compliant)
- `--beta`: Amber (#fbbf24) - 6.94:1 contrast
- `--stable`: Dark green (#0f7c3e) - 4.56:1 contrast
- `--production`: Dark blue (#1e3a8a) - 8.59:1 contrast

## Standards Reference

This migration follows the CSS Variable Naming Standard (v1.0):
- **Approved abbreviations:** `bg`, `fs`, `fw`, `radius`
- **Prohibited abbreviations:** `px`/`py` (use `padding-inline`/`padding-block`)
- **Units:** All spacing in rem
