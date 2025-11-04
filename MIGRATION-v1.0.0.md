# Migration Guide: v0.6.2 → v1.0.0

## Overview

Version 1.0.0 introduces **breaking changes** to CSS custom property names across three core components: **Button**, **Form/Input**, and **Card**. These changes implement a standardized naming convention that improves developer experience through predictable, discoverable variable names.

**Total Variables Changed: 39 renamed + 10 new**

- Button: 26 variables renamed
- Form/Input: 12 variables renamed + 4 new state variables
- Card: 1 variable renamed + 6 new element-scoped variables

## Quick Summary

| Component | Variables Changed | New Variables | Breaking? |
|---|---|---|---|
| Button | 26 renamed | 0 | ✅ Yes |
| Form/Input | 12 renamed | 4 added | ✅ Yes |
| Card | 1 renamed | 6 added | ✅ Yes |

**Why this change?**

The old naming convention used heavy abbreviations (`--btn-px`, `--btn-rds`, `--input-w`) that were:
- Difficult to discover via IDE autocomplete
- Inconsistent with modern CSS best practices
- Confusing for new users (what does `px` mean? padding-x or pixels?)

The new convention uses:
- Full property names (`--btn-radius`, `--input-width`)
- Logical properties (`--btn-padding-inline`, `--btn-padding-block`)
- Consistent patterns across all components

## Migration Strategy

### Before You Migrate

1. **Audit your custom CSS** - Search your codebase for variables that will change
2. **Backup your stylesheets** - Create a git commit before making changes
3. **Review the migration tables below** - Plan your find-and-replace operations
4. **Test in development first** - Don't deploy to production without testing

### Migration Steps

1. Update package version: `npm install @fpkit/acss@^1.0.0`
2. Use find-and-replace patterns (see below)
3. Test all component variants
4. Verify visual appearance matches previous version
5. Run accessibility tests (focus indicators, etc.)

---

## Button Component Migration

### Changed Variables (26 total)

| Old Variable | New Variable | Example Value | Category |
|---|---|---|---|
| `--btn-xs` | `--btn-size-xs` | `0.6875rem` | Size token |
| `--btn-sm` | `--btn-size-sm` | `0.8125rem` | Size token |
| `--btn-md` | `--btn-size-md` | `0.9375rem` | Size token |
| `--btn-lg` | `--btn-size-lg` | `1.125rem` | Size token |
| `--btn-px` | `--btn-padding-inline` | `1rem` | Logical property |
| `--btn-py` | `--btn-padding-block` | `0.5rem` | Logical property |
| `--btn-rds` | `--btn-radius` | `0.375rem` | Visual property |
| `--btn-cl` | `--btn-color` | `currentColor` | Visual property |
| `--btn-dsp` | `--btn-display` | `inline-flex` | Layout property |
| `--btn-bdr` | `--btn-border` | `none` | Visual property |
| `--btn-wspc` | `--btn-whitespace` | `inherit` | Layout property |
| `--btn-spc` | `--btn-spacing` | `0` | Layout property |
| `--btn-hov-bg` | `--btn-hover-bg` | `#0052a3` | State variable |

**Kept (Approved Abbreviations):**
- `--btn-fs` (font-size) ✅
- `--btn-bg` (background) ✅
- `--btn-fw` (font-weight) ✅

### Find and Replace Patterns (Button)

Use these regex patterns with word boundaries (`\b`) to avoid partial matches:

```regex
Find: --btn-px\b
Replace: --btn-padding-inline

Find: --btn-py\b
Replace: --btn-padding-block

Find: --btn-rds\b
Replace: --btn-radius

Find: --btn-cl\b
Replace: --btn-color

Find: --btn-dsp\b
Replace: --btn-display

Find: --btn-bdr\b
Replace: --btn-border

Find: --btn-wspc\b
Replace: --btn-whitespace

Find: --btn-spc\b
Replace: --btn-spacing

Find: --btn-hov-bg\b
Replace: --btn-hover-bg
```

**Size tokens** (update references):
```regex
Find: var\(--btn-xs\)
Replace: var(--btn-size-xs)

Find: var\(--btn-sm\)
Replace: var(--btn-size-sm)

Find: var\(--btn-md\)
Replace: var(--btn-size-md)

Find: var\(--btn-lg\)
Replace: var(--btn-size-lg)
```

### Button Migration Example

**Before (v0.6.2):**
```css
button {
  --btn-px: 2rem;
  --btn-py: 0.75rem;
  --btn-rds: 0.5rem;
  --btn-cl: white;
  --btn-bg: #0066cc;
  --btn-dsp: inline-flex;
}
```

**After (v1.0.0):**
```css
button {
  --btn-padding-inline: 2rem;
  --btn-padding-block: 0.75rem;
  --btn-radius: 0.5rem;
  --btn-color: white;
  --btn-bg: #0066cc;
  --btn-display: inline-flex;
}
```

---

## Form/Input Component Migration

### Changed Variables (12 renamed + 4 new)

| Old Variable | New Variable | Example Value | Category |
|---|---|---|---|
| `--input-px` | `--input-padding-inline` | `0.75rem` | Logical property |
| `--input-py` | `--input-padding-block` | `0.5rem` | Logical property |
| `--input-w` | `--input-width` | `100%` | Layout property |

**New Focus State Variables:**
| New Variable | Default Value | Purpose |
|---|---|---|
| `--input-focus-outline` | `medium solid` | WCAG-compliant focus indicator |
| `--input-focus-outline-offset` | `0` | Focus outline offset |

**New Disabled State Variables:**
| New Variable | Default Value | Purpose |
|---|---|---|
| `--input-disabled-bg` | `#f5f5f5` | Background when disabled |
| `--input-disabled-opacity` | `0.6` | Opacity when disabled |
| `--input-disabled-cursor` | `not-allowed` | Cursor style when disabled |

**Kept (Approved Abbreviations):**
- `--input-fs` (font-size) ✅
- `--placeholder-fs` (placeholder font-size) ✅
- `--placeholder-color` ✅

### Find and Replace Patterns (Form/Input)

```regex
Find: --input-px\b
Replace: --input-padding-inline

Find: --input-py\b
Replace: --input-padding-block

Find: --input-w\b
Replace: --input-width
```

### Form/Input Migration Example

**Before (v0.6.2):**
```css
input[type="text"] {
  --input-px: 1rem;
  --input-py: 0.75rem;
  --input-w: 300px;
  --input-fs: 1rem;
}
```

**After (v1.0.0):**
```css
input[type="text"] {
  --input-padding-inline: 1rem;
  --input-padding-block: 0.75rem;
  --input-width: 300px;
  --input-fs: 1rem;

  /* Optional: Use new focus state variables */
  --input-focus-outline: 3px solid #0066cc;
  --input-focus-outline-offset: 2px;
}
```

---

## Card Component Migration

### Changed Variables (1 renamed + 6 new)

| Old Variable | New Variable | Example Value | Category |
|---|---|---|---|
| `--card-p` | `--card-padding` | `2rem` | Base property |

**New Element-Scoped Variables:**

#### Header Variables
| New Variable | Default Value | Purpose |
|---|---|---|
| `--card-header-padding` | `1rem 1.5rem` | Header padding |
| `--card-header-bg` | `#f8f9fa` | Header background color |
| `--card-header-border-bottom` | `1px solid #dee2e6` | Header bottom border |

#### Body Variables
| New Variable | Default Value | Purpose |
|---|---|---|
| `--card-body-padding` | `1.5rem` | Body content padding |

#### Footer Variables
| New Variable | Default Value | Purpose |
|---|---|---|
| `--card-footer-padding` | `1rem 1.5rem` | Footer padding |
| `--card-footer-bg` | `#f8f9fa` | Footer background color |
| `--card-footer-border-top` | `1px solid #dee2e6` | Footer top border |

**Kept (Already Good):**
- `--card-bg` (background) ✅
- `--card-radius` ✅
- `--card-display` ✅
- `--card-direction` ✅
- `--card-gap` ✅

### Find and Replace Patterns (Card)

```regex
Find: --card-p\b
Replace: --card-padding
```

### Card Migration Example

**Before (v0.6.2):**
```css
[data-card] {
  --card-p: 2.5rem;
  --card-bg: white;
  --card-radius: 0.5rem;
}
```

**After (v1.0.0):**
```css
[data-card] {
  --card-padding: 2.5rem;
  --card-bg: white;
  --card-radius: 0.5rem;

  /* Optional: Use new element-scoped variables */
  --card-header-padding: 1.5rem 2rem;
  --card-header-bg: #0066cc;
  --card-body-padding: 2rem;
  --card-footer-bg: #f0f0f0;
}
```

---

## Testing Your Migration

After migrating your variable names, verify that everything works correctly:

### Visual Testing Checklist

**Button Component:**
- [ ] All button variants render correctly (primary, secondary, tertiary, etc.)
- [ ] All button sizes display properly (xs, sm, md, lg)
- [ ] Hover states work as expected
- [ ] Focus indicators are visible (WCAG 2.4.7 compliance)
- [ ] Disabled buttons display correctly

**Form/Input Component:**
- [ ] All input types render correctly (text, email, password, etc.)
- [ ] Input focus indicators are visible and meet WCAG standards
- [ ] Disabled inputs have clear visual state
- [ ] Placeholder text displays correctly
- [ ] Custom widths and padding work as expected

**Card Component:**
- [ ] Basic cards render correctly
- [ ] Cards with headers display properly
- [ ] Cards with footers display properly
- [ ] Complex cards (header + body + footer) render correctly
- [ ] Custom padding and spacing work as expected

### Automated Testing

Run your existing test suite to ensure no regressions:

```bash
# Run unit tests
npm test

# Run visual regression tests (if configured)
npm run test:visual

# Build Storybook to verify examples
npm run build-storybook
```

### Accessibility Testing

Verify focus indicators meet WCAG 2.4.7 (Focus Visible):

1. Tab through interactive elements
2. Verify focus outline is visible (3:1 contrast ratio minimum)
3. Test keyboard navigation (Enter, Space keys)
4. Run axe DevTools or similar a11y checker

---

## Common Migration Scenarios

### Scenario 1: Global Theme Overrides

If you're overriding variables globally in a theme file:

**Before:**
```css
:root {
  --btn-px: 1.5rem;
  --btn-py: 0.75rem;
  --btn-rds: 0.5rem;
  --input-px: 1rem;
  --input-w: 100%;
  --card-p: 2rem;
}
```

**After:**
```css
:root {
  --btn-padding-inline: 1.5rem;
  --btn-padding-block: 0.75rem;
  --btn-radius: 0.5rem;
  --input-padding-inline: 1rem;
  --input-width: 100%;
  --card-padding: 2rem;
}
```

### Scenario 2: Component-Specific Overrides

If you're customizing individual components:

**Before:**
```jsx
<Button styles={{ "--btn-px": "2rem", "--btn-rds": "100rem" }}>
  Pill Button
</Button>
```

**After:**
```jsx
<Button styles={{ "--btn-padding-inline": "2rem", "--btn-radius": "100rem" }}>
  Pill Button
</Button>
```

### Scenario 3: Dark Theme Implementation

**Before:**
```css
[data-theme="dark"] {
  --btn-cl: white;
  --btn-bg: #1a1a1a;
  --input-bg: #2a2a2a;
  --card-bg: #2a2a2a;
}
```

**After:**
```css
[data-theme="dark"] {
  --btn-color: white;
  --btn-bg: #1a1a1a;
  --input-bg: #2a2a2a;
  --card-bg: #2a2a2a;

  /* Use new focus state variables for better accessibility */
  --input-focus-outline: 3px solid #3b82f6;
}
```

---

## Troubleshooting

### Issue: Styles not applying after migration

**Cause:** Likely missed a variable or typo in new variable name.

**Solution:**
1. Check browser DevTools for unresolved CSS variables (usually shows as blank)
2. Search your CSS for old variable names: `--btn-px`, `--input-w`, `--card-p`
3. Verify you're using the correct new variable names (check migration tables above)

### Issue: Focus indicators not visible

**Cause:** May need to explicitly set new focus state variables.

**Solution:**
```css
input {
  --input-focus-outline: 3px solid #0066cc;
  --input-focus-outline-offset: 2px;
}
```

### Issue: Card headers/footers not styled

**Cause:** Element-scoped variables only apply to elements with correct selectors.

**Solution:**
Ensure you're using proper HTML structure:
```html
<div data-card>
  <header data-card-header>Header</header>
  <div data-card-body>Body content</div>
  <footer data-card-footer>Footer</footer>
</div>
```

---

## Rollback Instructions

If you encounter issues and need to rollback to v0.6.2:

1. **Revert your CSS changes** (use git to restore previous version)
2. **Downgrade package:**
   ```bash
   npm install @fpkit/acss@0.6.2
   ```
3. **Clear build cache:**
   ```bash
   rm -rf node_modules/.cache
   npm run build
   ```
4. **Test thoroughly** before re-attempting migration

---

## Frequently Asked Questions

### Q: Can I use both old and new variable names during migration?

**A:** No. The old variable names have been completely removed. You must update all references to the new names.

### Q: Will this affect my existing component TypeScript props?

**A:** No. This change only affects CSS custom property names. TypeScript props remain unchanged.

### Q: Do I need to update my Storybook stories?

**A:** Only if your stories use custom styles with the old variable names. Check examples in the updated Storybook documentation.

### Q: What about other components not mentioned here?

**A:** This migration only affects Button, Form/Input, and Card components. Other components will be migrated in future releases.

### Q: How do I know if my focus indicators are WCAG compliant?

**A:** Use the new `--input-focus-outline` and `--input-focus-outline-offset` variables with a minimum 3:1 contrast ratio. Example:
```css
--input-focus-outline: 3px solid #0066cc;
```

### Q: Are the new element-scoped card variables required?

**A:** No, they're optional. Use them when you need granular control over card header/body/footer styling. Basic cards work without them.

---

## Need Help?

- **Documentation:** Check updated Storybook for live examples and variable references
- **Issues:** Report problems at https://github.com/anthropics/claude-code/issues
- **Questions:** Ask on our community discussions

---

## Benefits of Migration

After migrating, you'll benefit from:

✅ **Better IDE Autocomplete** - Type `--btn-` to see all button properties
✅ **Clearer Variable Names** - No more guessing what `px` or `rds` means
✅ **Modern CSS Practices** - Logical properties (`padding-inline` vs `px`)
✅ **Improved Accessibility** - New focus state variables for WCAG compliance
✅ **Element Scoping** - Granular control over card headers, bodies, footers
✅ **Consistency** - Standardized naming across all components

Thank you for migrating to v1.0.0! 🎉
