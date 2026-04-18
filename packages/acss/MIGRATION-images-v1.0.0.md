# Images Component Migration Guide - v1.0.0

## Overview
This guide covers the CSS variable refactoring for the Images (Figure/Figcaption) component to align with the standardized naming conventions.

## Breaking Changes

### CSS Variable Renames

| Old Variable | New Variable | Rationale |
|--------------|--------------|-----------|
| `--fig-p` | `--fig-padding` | Use full word `padding` instead of abbreviation `p` |
| `--fig-w` | `--fig-width` | Use full word `width` instead of abbreviation `w` |
| `--caption-p` | `--caption-padding` | Use full word `padding` instead of abbreviation `p` for consistency |

## Migration Steps

### 1. Update Custom Styles

If you're using these CSS variables in your custom styles, update them:

**Before:**
```css
figure:has(img[alt]) {
  --fig-p: 1rem;
  --fig-w: 40rem;
  --caption-p: 1.5rem;
}
```

**After:**
```css
figure:has(img[alt]) {
  --fig-padding: 1rem;
  --fig-width: 40rem;
  --caption-padding: 1.5rem;
}
```

### 2. Update Inline Styles

If you're passing CSS variables via style prop:

**Before:**
```jsx
<figure
  style={{
    '--fig-p': '1rem',
    '--fig-w': '40rem',
    '--caption-p': '1.5rem',
  }}
>
  <img src="..." alt="..." />
  <figcaption>Caption text</figcaption>
</figure>
```

**After:**
```jsx
<figure
  style={{
    '--fig-padding': '1rem',
    '--fig-width': '40rem',
    '--caption-padding': '1.5rem',
  }}
>
  <img src="..." alt="..." />
  <figcaption>Caption text</figcaption>
</figure>
```

### 3. Search and Replace (Automated)

Use these patterns for automated migration:

```bash
# Figure padding
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--fig-p\>/--fig-padding/g' {} +

# Figure width
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--fig-w\>/--fig-width/g' {} +

# Caption padding
find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.tsx" -o -name "*.jsx" \) \
  -exec sed -i '' 's/--caption-p\>/--caption-padding/g' {} +
```

Or manually search your codebase for:
- `--fig-p` → replace with `--fig-padding`
- `--fig-w` → replace with `--fig-width`
- `--caption-p` → replace with `--caption-padding`

**Note:** The `\>` in the sed patterns ensures word boundaries to avoid matching variables like `--fig-position`.

## Updated Variable Reference

### Complete CSS Variables List

#### Image Variables (img[alt])
- `--img-max-width`: Maximum width (default: `100%`)
- `--img-height`: Height value (default: `auto`)
- `--img-display`: Display type (default: `inline-block`)
- `--img-object-fit`: Object fit mode (default: `cover`)
- `--img-object-position`: Object position (default: `center`)
- `--img-aspect-ratio`: Aspect ratio (default: `auto 2/3`)

#### Figure Variables (figure:has(img[alt]))
- `--fig-display`: Display type (default: `flex`)
- `--fig-padding`: Figure padding (default: `0.5rem`) **[UPDATED]**
- `--fig-bg`: Background color (default: `rgba(245, 245, 245, 0.683)`)
- `--fig-width`: Max width constraint (default: `fit-content`) **[UPDATED]**
- `--fig-bottom`: Figcaption bottom offset (default: `var(--fig-padding)`)
- `--fig-left`: Figcaption left offset (default: `var(--fig-padding)`)
- `--fig-right`: Figcaption right offset (default: `var(--fig-padding)`)

#### Figcaption Variables
- `--caption-padding`: Caption padding (default: `var(--spc-3)`) **[UPDATED]**

## Testing Checklist

After migration, verify:

- [ ] Figure elements render correctly with images
- [ ] Custom figure padding applies correctly via `--fig-padding`
- [ ] Custom figure width applies correctly via `--fig-width`
- [ ] Custom caption padding applies correctly via `--caption-padding`
- [ ] Figcaption positioning works with custom offsets
- [ ] Figure backgrounds display correctly
- [ ] Image object-fit and aspect-ratio work as expected
- [ ] Responsive images scale properly (max-width behavior)
- [ ] Decorative images (alt="") render correctly
- [ ] Semantic images with alt text display properly
- [ ] Build succeeds without errors: `npm run build`
- [ ] Lint passes without errors: `npm run lint`

## Naming Standard Reference

This refactoring follows the CSS variable naming standard documented in `docs/css-variables.md`:

**Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`

**Approved Abbreviations:**
- ✅ `bg`, `fs`, `fw`, `radius`, `gap`
- ❌ `px`/`py`, `w`/`h`, `cl`, `dsp`, `bdr`, `lh`, `p` (without direction)

**Why These Changes?**
- **Consistency**: Aligns with approved naming pattern using full words for dimensions
- **Clarity**: `padding` is clearer than `p`, and `width` is clearer than `w`
- **Standard compliance**: Matches the project-wide CSS variable naming convention
- **Maintainability**: Full words are more searchable and self-documenting
- **Logical properties**: Prepares for future migration to logical properties (though padding/width don't need inline/block here)

## Need Help?

- **CSS Variable Standard**: See `docs/css-variables.md`
- **Component Documentation**: Check Storybook after running `npm start` from monorepo root
- **Questions**: Review existing components for similar patterns

---

**Migration Version:** 1.0.0
**Component:** Images (Figure/Figcaption)
**Date:** 2025-11-04
