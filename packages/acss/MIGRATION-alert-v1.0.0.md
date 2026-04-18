# Alert Component Migration Guide - v1.0.0

## Overview
This guide covers the CSS variable refactoring for the Alert component to align with the standardized naming conventions.

## Breaking Changes

### CSS Variable Renames

| Old Variable | New Variable | Rationale |
|--------------|--------------|-----------|
| `--alert-border-radius` | `--alert-radius` | Use approved abbreviation `radius` instead of full `border-radius` |
| `--alert-title-weight` | `--alert-title-fw` | Use approved abbreviation `fw` (font-weight) for consistency |
| `--alert-title-size` | `--alert-title-fs` | Use approved abbreviation `fs` (font-size) for consistency |

## Migration Steps

### 1. Update Custom Styles

If you're using these CSS variables in your custom styles, update them:

**Before:**
```css
[role="alert"] {
  --alert-border-radius: 0.5rem;
  --alert-title-weight: 700;
  --alert-title-size: 1.125rem;
}
```

**After:**
```css
[role="alert"] {
  --alert-radius: 0.5rem;
  --alert-title-fw: 700;
  --alert-title-fs: 1.125rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via style prop:

**Before:**
```jsx
<Alert
  style={{
    '--alert-border-radius': '0.5rem',
    '--alert-title-weight': '700',
    '--alert-title-size': '1.125rem',
  }}
/>
```

**After:**
```jsx
<Alert
  style={{
    '--alert-radius': '0.5rem',
    '--alert-title-fw': '700',
    '--alert-title-fs': '1.125rem',
  }}
/>
```

### 3. Search and Replace (Automated)

Use these patterns for automated migration:

```bash
# Border radius
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--alert-border-radius/--alert-radius/g' {} +

# Title font weight
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--alert-title-weight/--alert-title-fw/g' {} +

# Title font size
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--alert-title-size/--alert-title-fs/g' {} +
```

Or manually search your codebase for:
- `--alert-border-radius` → replace with `--alert-radius`
- `--alert-title-weight` → replace with `--alert-title-fw`
- `--alert-title-size` → replace with `--alert-title-fs`

## Updated Variable Reference

### Complete CSS Variables List

#### Layout & Structure
- `--alert-bg`: Background color (default: `whitesmoke`)
- `--alert-color`: Text color (default: `currentColor`)
- `--alert-border`: Border style (default: `thin solid currentColor`)
- `--alert-radius`: Border radius (default: `var(--border-radius)`) **[UPDATED]**
- `--alert-padding`: Internal padding (default: `var(--spc-4)`)
- `--alert-margin-block-end`: Bottom margin
- `--alert-gap`: Gap between icon and content (default: `var(--spc-4)`)

#### Severity Colors
**Success:**
- `--alert-success-bg`: `#e6f4ea`
- `--alert-success-border`: `#34a853`
- `--alert-success-text`: `#1e4620`

**Error:**
- `--alert-error-bg`: `#fdeded`
- `--alert-error-border`: `#d32f2f`
- `--alert-error-text`: `#5f2120`

**Warning:**
- `--alert-warning-bg`: `#fff4e5`
- `--alert-warning-border`: `#ff9800`
- `--alert-warning-text`: `#663c00`

**Info:**
- `--alert-info-bg`: `#e5f6fd`
- `--alert-info-border`: `#0288d1`
- `--alert-info-text`: `#084154`

#### Typography
- `--alert-title-fw`: Title font weight (default: `600`) **[UPDATED]**
- `--alert-title-fs`: Title font size (default: `inherit`) **[UPDATED]**

#### Animation
- `--alert-transition-duration`: Animation timing (default: `0.3s`)

## Testing Checklist

After migration, verify:

- [ ] Alert renders correctly with all severity levels (success, error, warning, info)
- [ ] Custom border radius applies correctly via `--alert-radius`
- [ ] Custom title font weight applies correctly via `--alert-title-fw`
- [ ] Custom title font size applies correctly via `--alert-title-fs`
- [ ] All alert variants display properly (outlined, filled, soft)
- [ ] Dismissible alerts function correctly
- [ ] Auto-dismiss alerts work as expected
- [ ] Focus indicators appear correctly (WCAG 2.4.7)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announcements work properly
- [ ] Animations respect prefers-reduced-motion
- [ ] Build succeeds without errors: `npm run build`
- [ ] Lint passes without errors: `npm run lint`

## Naming Standard Reference

This refactoring follows the CSS variable naming standard documented in `docs/css-variables.md`:

**Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`

**Approved Abbreviations:**
- ✅ `bg`, `fs`, `fw`, `radius`, `gap`
- ❌ `px`/`py`, `w`/`h`, `cl`, `dsp`, `bdr`, `lh`

**Why These Changes?**
- **Consistency**: Aligns with approved abbreviations across all components
- **Brevity**: Shorter variable names reduce verbosity (`radius` vs `border-radius`)
- **Standard compliance**: Matches the project-wide CSS variable naming convention
- **Developer experience**: Predictable patterns improve discoverability

## Need Help?

- **CSS Variable Standard**: See `docs/css-variables.md`
- **Component Documentation**: Check Storybook after running `npm start`
- **Questions**: Review existing components for similar patterns

---

**Migration Version:** 1.0.0
**Component:** Alert
**Date:** 2025-11-04
