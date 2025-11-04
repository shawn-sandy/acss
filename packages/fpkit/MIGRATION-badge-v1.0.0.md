# Badge Component Migration Guide - v1.0.0

## Overview
This guide covers the CSS variable refactoring for the Badge component to align with the standardized naming conventions.

## Breaking Changes

### CSS Variable Renames

| Old Variable | New Variable | Rationale |
|--------------|--------------|-----------|
| `--badge-v-align` | `--badge-vertical-align` | Use full word `vertical-align` instead of abbreviation `v-align` |

## Migration Steps

### 1. Update Custom Styles

If you're using this CSS variable in your custom styles, update it:

**Before:**
```css
sup:has(> span) {
  --badge-v-align: 0.75rem;
}
```

**After:**
```css
sup:has(> span) {
  --badge-vertical-align: 0.75rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via style prop:

**Before:**
```jsx
<Badge
  style={{
    '--badge-v-align': '0.75rem',
  }}
>
  5
</Badge>
```

**After:**
```jsx
<Badge
  style={{
    '--badge-vertical-align': '0.75rem',
  }}
>
  5
</Badge>
```

### 3. Search and Replace (Automated)

Use this pattern for automated migration:

```bash
# Badge vertical align
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--badge-v-align/--badge-vertical-align/g' {} +
```

Or manually search your codebase for:
- `--badge-v-align` → replace with `--badge-vertical-align`

## Updated Variable Reference

### Complete CSS Variables List

#### Layout & Structure
- `--badge-bg`: Background color (default: `lightgray`)
- `--badge-color`: Text color (default: `currentColor`)
- `--badge-radius`: Border radius (default: `0.5rem`)
- `--badge-padding`: Internal padding (default: `0.3rem`)
- `--badge-vertical-align`: Vertical alignment (default: `0.5rem`) **[UPDATED]**

#### Typography
- `--badge-fs`: Font size (default: `var(--fs-1)`)

#### Rounded Variant (when variant="rounded")
- `--badge-size`: Fixed circular size (default: `1.5625rem`)
- Automatically applies:
  - Border radius: `50%`
  - Padding: `0`
  - Ellipsis truncation for overflow

## Testing Checklist

After migration, verify:

- [ ] Badge renders correctly with default styling
- [ ] Custom vertical alignment applies correctly via `--badge-vertical-align`
- [ ] Badge background and text colors display properly
- [ ] Border radius works as expected
- [ ] Padding is applied correctly
- [ ] Font size inheritance works
- [ ] Rounded variant displays as perfect circles
- [ ] Rounded variant truncates long content with ellipsis
- [ ] Badge aligns properly alongside text content
- [ ] Accessibility: aria-label is properly announced by screen readers
- [ ] Build succeeds without errors: `npm run build`
- [ ] Lint passes without errors: `npm run lint`

## Naming Standard Reference

This refactoring follows the CSS variable naming standard documented in `docs/css-variables.md`:

**Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`

**Approved Abbreviations:**
- ✅ `bg`, `fs`, `fw`, `radius`, `gap`
- ❌ `px`/`py`, `w`/`h`, `cl`, `dsp`, `bdr`, `lh`, `v-align` (use `vertical-align`)

**Why This Change?**
- **Consistency**: Aligns with CSS property name `vertical-align` rather than custom abbreviation
- **Clarity**: `vertical-align` is self-explanatory; `v-align` requires knowledge of the abbreviation
- **Standard compliance**: Matches the project-wide CSS variable naming convention
- **Searchability**: Full property names are easier to find in codebases
- **CSS alignment**: Mirrors the actual CSS property name for better developer experience

## Need Help?

- **CSS Variable Standard**: See `docs/css-variables.md`
- **Component Documentation**: Check Storybook after running `npm start` from monorepo root
- **Questions**: Review existing components for similar patterns

---

**Migration Version:** 1.0.0
**Component:** Badge
**Date:** 2025-11-04
