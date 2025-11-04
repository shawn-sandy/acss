# CSS Variable Migration Guide Template

## Overview

This template provides a migration path for refactoring CSS custom properties to follow the @fpkit/acss naming standard. Use this guide when implementing variable name changes in components.

### Why Migrate?

The standardized naming convention provides:
- ✅ **Predictable variable discovery** - Type `--btn-` to see all button properties
- ✅ **Better IDE autocomplete** - Consistent patterns improve developer experience
- ✅ **Clearer property meanings** - Full words replace cryptic abbreviations
- ✅ **Easier customization** - Users can intuitively find and override variables
- ✅ **Long-term maintainability** - Consistent standard for all future components

### Migration Strategy

1. **Identify affected components** (see Component-by-Component Changes)
2. **Update component SCSS files** with new variable names
3. **Run find-and-replace** in your custom stylesheets
4. **Test thoroughly** in all contexts (themes, variants, responsive)
5. **Update Storybook examples** to demonstrate new variables

---

## Quick Reference: Common Changes

### Padding Properties

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-px` | `--{component}-padding-inline` | Logical property clarity |
| `--{component}-py` | `--{component}-padding-block` | Logical property clarity |
| `--{component}-p` | `--{component}-padding` | Full word for consistency |

**Example:**
```css
/* Before */
--btn-px: 1.5rem;
--btn-py: 0.5rem;

/* After */
--btn-padding-inline: 1.5rem;
--btn-padding-block: 0.5rem;
```

### Margin Properties

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-mx` | `--{component}-margin-inline` | Logical property clarity |
| `--{component}-my` | `--{component}-margin-block` | Logical property clarity |
| `--{component}-m` | `--{component}-margin` | Full word for consistency |
| `--{component}-mb` | `--{component}-margin-block-end` | Logical property clarity |

**Example:**
```css
/* Before */
--alert-my: 1rem;
--nav-mb: 1rem;

/* After */
--alert-margin-block: 1rem;
--nav-margin-block-end: 1rem;
```

### Dimension Properties

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-w` | `--{component}-width` | Single-letter abbreviations harm clarity |
| `--{component}-h` | `--{component}-height` | Single-letter abbreviations harm clarity |
| `--{component}-min-w` | `--{component}-min-width` | Consistency with width |
| `--{component}-max-h` | `--{component}-max-height` | Consistency with height |

**Example:**
```css
/* Before */
--input-w: 100%;
--dialog-max-h: 80vh;

/* After */
--input-width: 100%;
--dialog-max-height: 80vh;
```

### Border and Radius

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-rds` | `--{component}-radius` | Clearer than abbreviation |
| `--{component}-bdr` | `--{component}-border` | Avoid abbreviation confusion |
| `--{component}-bdr-rds` | `--{component}-radius` | Simplified and clearer |

**Example:**
```css
/* Before */
--btn-rds: 0.375rem;
--card-bdr: 1px solid #ddd;

/* After */
--btn-radius: 0.375rem;
--card-border: 1px solid #ddd;
```

### Display and Color

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-dsp` | `--{component}-display` | Not universally recognized |
| `--{component}-cl` | `--{component}-color` | Too ambiguous when abbreviated |

**Example:**
```css
/* Before */
--btn-dsp: inline-flex;
--btn-cl: currentColor;

/* After */
--btn-display: inline-flex;
--btn-color: currentColor;
```

### State Variables

| Old Variable | New Variable | Reason |
|--------------|--------------|--------|
| `--{component}-hov-{property}` | `--{component}-hover-{property}` | Consistent state naming |
| `--{component}-fcs-{property}` | `--{component}-focus-{property}` | Full word for clarity |
| `--{component}-dis-{property}` | `--{component}-disabled-{property}` | Full word for clarity |

**Example:**
```css
/* Before */
--btn-hov-bg: #0052a3;
--btn-fcs-outline: 2px solid blue;

/* After */
--btn-hover-bg: #0052a3;
--btn-focus-outline: 2px solid blue;
```

---

## Find and Replace Patterns

### Global Regex Patterns

Use these regex patterns for bulk replacements across your codebase:

**Padding Inline (px → padding-inline):**
```regex
Find:    --([a-z]+)-px:
Replace: --$1-padding-inline:
```

**Padding Block (py → padding-block):**
```regex
Find:    --([a-z]+)-py:
Replace: --$1-padding-block:
```

**Width (w → width):**
```regex
Find:    --([a-z]+)-w:
Replace: --$1-width:
```

**Height (h → height):**
```regex
Find:    --([a-z]+)-h:
Replace: --$1-height:
```

**Border Radius (rds → radius):**
```regex
Find:    --([a-z]+)-rds:
Replace: --$1-radius:
```

**Color (cl → color):**
```regex
Find:    --([a-z]+)-cl:
Replace: --$1-color:
```

**Display (dsp → display):**
```regex
Find:    --([a-z]+)-dsp:
Replace: --$1-display:
```

**Border (bdr → border):**
```regex
Find:    --([a-z]+)-bdr:
Replace: --$1-border:
```

**Hover State (hov → hover):**
```regex
Find:    --([a-z]+)-hov-
Replace: --$1-hover-
```

**Focus State (fcs → focus):**
```regex
Find:    --([a-z]+)-fcs-
Replace: --$1-focus-
```

### Using Find and Replace

**VS Code:**
1. Press `Cmd+Shift+F` (Mac) or `Ctrl+Shift+H` (Windows/Linux)
2. Enable regex mode (icon: `.*`)
3. Enter find pattern and replace pattern
4. Click "Replace All" or review each match

**Command Line (ripgrep + sed):**
```bash
# Find occurrences
rg '--([a-z]+)-px:' packages/fpkit/src/

# Replace (example for padding-inline)
find packages/fpkit/src -name "*.scss" -exec sed -i '' 's/--\([a-z]\+\)-px:/--\1-padding-inline:/g' {} +
```

---

## Component-by-Component Changes

### Button Component

**File:** `packages/fpkit/src/components/button/button.scss`

| Old Variable | New Variable |
|--------------|--------------|
| `--btn-xs` | `--btn-size-xs` |
| `--btn-sm` | `--btn-size-sm` |
| `--btn-md` | `--btn-size-md` |
| `--btn-lg` | `--btn-size-lg` |
| `--btn-px` | `--btn-padding-inline` |
| `--btn-py` | `--btn-padding-block` |
| `--btn-rds` | `--btn-radius` |
| `--btn-cl` | `--btn-color` |
| `--btn-dsp` | `--btn-display` |
| `--btn-bdr` | `--btn-border` |
| `--btn-hov-bg` | `--btn-hover-bg` |
| `--btn-fcs-outline` | `--btn-focus-outline` |

**Migration Steps:**
1. Update SCSS file with new variable definitions
2. Update component TypeScript (if variables are referenced)
3. Update Storybook stories with new variable examples
4. Test all button variants (primary, secondary, tertiary)
5. Test all states (hover, focus, disabled, active)
6. Test all sizes (xs, sm, md, lg)

### Card Component

**File:** `packages/fpkit/src/components/card/card.scss`

| Old Variable | New Variable |
|--------------|--------------|
| `--card-p` | `--card-padding` |
| `--card-rds` | `--card-radius` |
| `--card-bdr` | `--card-border` |

**New Variables (element scoping):**
```css
/* Add if card has header/footer */
--card-header-padding
--card-header-bg
--card-header-border-bottom
--card-body-padding
--card-footer-padding
--card-footer-bg
--card-footer-border-top
```

**Migration Steps:**
1. Replace abbreviated variables
2. Add element-specific variables if applicable
3. Update card stories
4. Test with and without header/footer

### Form/Input Component

**File:** `packages/fpkit/src/components/input/input.scss`

| Old Variable | New Variable |
|--------------|--------------|
| `--input-px` | `--input-padding-inline` |
| `--input-py` | `--input-padding-block` |
| `--input-w` | `--input-width` |
| `--input-rds` | `--input-radius` |
| `--input-bdr` | `--input-border` |
| `--input-fcs-outline` | `--input-focus-outline` |

**Migration Steps:**
1. Update all input-related variables
2. Test focus states
3. Test disabled states
4. Test validation states (error, success)

### Navigation Component

**File:** `packages/fpkit/src/components/nav/nav.scss`

| Old Variable | New Variable |
|--------------|--------------|
| `--nav-dsp` | `--nav-display` |
| `--nav-hov-bg` | `--nav-hover-bg` |
| `--nav-mb` | `--nav-margin-block-end` |
| `--nav-px` | `--nav-padding-inline` |
| `--nav-py` | `--nav-padding-block` |

**Migration Steps:**
1. Update navigation layout variables
2. Test hover states on nav items
3. Test responsive behavior

### Alert Component

**File:** `packages/fpkit/src/components/alert/alert.scss`

**Good news!** Alert already follows the standard. No changes needed.

**Existing (keep these):**
```css
--alert-padding
--alert-margin-block-end
--alert-radius
--alert-gap
--alert-border
--alert-bg
--alert-color
--alert-success-bg
--alert-error-bg
--alert-warning-bg
--alert-info-bg
```

✅ **Use Alert as reference pattern for other components.**

---

## Testing Your Migration

### Checklist

- [ ] **Build succeeds** - No SCSS compilation errors
- [ ] **TypeScript compiles** - No type errors from changed variable names
- [ ] **Storybook loads** - All component stories render correctly
- [ ] **Visual regression** - Components look identical to before migration
- [ ] **All variants work** - Primary, secondary, error, success, etc.
- [ ] **All states work** - Hover, focus, disabled, active
- [ ] **All sizes work** - xs, sm, md, lg (if applicable)
- [ ] **Dark mode works** - If theme switching is supported
- [ ] **Custom overrides work** - User-defined CSS variables still apply
- [ ] **Documentation updated** - Component docs reference new variables

### Visual Regression Testing

**Method 1: Storybook Visual Tests**
```bash
npm run storybook
# Manually review each component story
# Check before/after screenshots
```

**Method 2: Browser DevTools**
1. Open component in browser
2. Inspect element and check "Computed" styles
3. Verify CSS variables resolve correctly
4. Test state changes (hover, focus)

**Method 3: Automated Testing (if available)**
```bash
npm run test:visual
# If project has visual regression tests configured
```

### Common Issues

**Issue 1: Variable not found**
```
Error: Undefined variable: "--btn-px"
```
**Solution:** Missed a variable reference. Search for old variable name and replace.

**Issue 2: Hover state broken**
```css
/* Forgot to update pseudo-class reference */
.button:hover {
  background: var(--btn-hov-bg);  /* ❌ Old name */
}

/* Fix */
.button:hover {
  background: var(--btn-hover-bg);  /* ✅ New name */
}
```

**Issue 3: Custom stylesheet breaks**
```css
/* User's custom CSS */
:root {
  --btn-px: 2rem;  /* ❌ Old variable no longer used by component */
}

/* Fix */
:root {
  --btn-padding-inline: 2rem;  /* ✅ New variable name */
}
```

---

## Rollback Instructions

If migration causes critical issues:

### Option 1: Git Revert

```bash
# Revert the migration commit
git revert <commit-hash>

# Or reset to before migration
git reset --hard <commit-before-migration>
```

### Option 2: Temporary Alias Variables

Add compatibility aliases until issues are resolved:

```scss
// In component SCSS file
:root {
  /* New standardized variables */
  --btn-padding-inline: 1.5rem;
  --btn-padding-block: 0.5rem;

  /* Temporary aliases for backward compatibility */
  --btn-px: var(--btn-padding-inline);
  --btn-py: var(--btn-padding-block);
}
```

**Note:** Remove aliases in next major version.

---

## Common Migration Scenarios

### Scenario 1: User Has Custom Theme

**User's custom CSS (before migration):**
```css
:root {
  --btn-px: 2rem;
  --btn-py: 0.75rem;
  --btn-rds: 2rem;
  --btn-primary-bg: #7c3aed;
}
```

**After migration (update user's CSS):**
```css
:root {
  --btn-padding-inline: 2rem;
  --btn-padding-block: 0.75rem;
  --btn-radius: 2rem;
  --btn-primary-bg: #7c3aed;
}
```

### Scenario 2: Storybook Args Customization

**Before migration:**
```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me'
  },
  parameters: {
    cssVariables: {
      '--btn-px': '2rem',
      '--btn-py': '0.75rem'
    }
  }
}
```

**After migration:**
```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me'
  },
  parameters: {
    cssVariables: {
      '--btn-padding-inline': '2rem',
      '--btn-padding-block': '0.75rem'
    }
  }
}
```

### Scenario 3: Runtime CSS Variable Updates

**Before migration (JavaScript):**
```javascript
document.documentElement.style.setProperty('--btn-px', '2rem');
document.documentElement.style.setProperty('--btn-rds', '2rem');
```

**After migration:**
```javascript
document.documentElement.style.setProperty('--btn-padding-inline', '2rem');
document.documentElement.style.setProperty('--btn-radius', '2rem');
```

### Scenario 4: CSS-in-JS Libraries

**Before migration (styled-components):**
```javascript
const StyledButton = styled.button`
  padding-inline: var(--btn-px);
  padding-block: var(--btn-py);
  border-radius: var(--btn-rds);
`;
```

**After migration:**
```javascript
const StyledButton = styled.button`
  padding-inline: var(--btn-padding-inline);
  padding-block: var(--btn-padding-block);
  border-radius: var(--btn-radius);
`;
```

---

## Storybook Customization Examples

### Example 1: Button Customization Story

**Before migration:**
```tsx
export const CustomizedButton: Story = {
  args: {
    children: 'Custom Button'
  },
  decorators: [
    (Story) => (
      <div style={{
        '--btn-px': '3rem',
        '--btn-py': '1rem',
        '--btn-rds': '2rem',
        '--btn-primary-bg': 'linear-gradient(135deg, #667eea, #764ba2)'
      }}>
        <Story />
      </div>
    )
  ]
}
```

**After migration:**
```tsx
export const CustomizedButton: Story = {
  args: {
    children: 'Custom Button'
  },
  decorators: [
    (Story) => (
      <div style={{
        '--btn-padding-inline': '3rem',
        '--btn-padding-block': '1rem',
        '--btn-radius': '2rem',
        '--btn-primary-bg': 'linear-gradient(135deg, #667eea, #764ba2)'
      }}>
        <Story />
      </div>
    )
  ]
}
```

### Example 2: Dark Theme Story

**After migration (new variable names):**
```tsx
export const DarkTheme: Story = {
  args: {
    children: 'Dark Mode Button'
  },
  decorators: [
    (Story) => (
      <div className="dark-theme" style={{
        '--btn-bg': '#2d2d2d',
        '--btn-color': '#e0e0e0',
        '--btn-border': '1px solid #404040',
        '--btn-hover-bg': '#404040',
        '--btn-primary-bg': '#7c3aed',
        '--btn-primary-hover-bg': '#6d28d9'
      }}>
        <Story />
      </div>
    )
  ]
}
```

---

## FAQ

### Q: Will this break my existing customizations?

**A:** Yes, if you've overridden CSS variables in your custom styles. You'll need to update your variable names to match the new standard. See the Quick Reference and Find & Replace sections.

### Q: Can I use both old and new variable names during transition?

**A:** Yes, temporarily. Add alias variables for backward compatibility:
```scss
--btn-padding-inline: 1.5rem;
--btn-px: var(--btn-padding-inline);  /* Alias */
```
Remove aliases in the next major version.

### Q: Do I need to migrate all components at once?

**A:** No. Migrate component-by-component to reduce risk. Start with high-impact components (Button, Form, Card) and gradually migrate the rest.

### Q: How do I know if I've updated all references?

**A:** Use global search:
```bash
# Search for old variable patterns
rg '--[a-z]+-px:' --type scss
rg '--[a-z]+-py:' --type scss
rg '--[a-z]+-rds:' --type scss
```

### Q: What if my IDE doesn't show autocomplete for new variables?

**A:** Ensure your IDE is configured for CSS custom properties. See "IDE Setup Tips" in `docs/css-variables.md`.

### Q: Should I update variable names in component tests?

**A:** Only if tests directly reference CSS variable names (e.g., snapshot tests with computed styles). Most functional tests shouldn't need changes.

### Q: How do I migrate third-party integrations?

**A:** Update any third-party code that overrides @fpkit/acss variables. Contact integration authors if you don't control the code.

### Q: What's the timeline for deprecating old variables?

**A:** Old variables will be removed in the next major version (v2.0.0). Migrate during the current minor version cycle to avoid breaking changes.

---

## Support and Resources

### Documentation
- **CSS Variable Reference Guide** - `docs/css-variables.md`
- **Contribution Guidelines** - `CLAUDE.md`
- **Component Source** - `packages/fpkit/src/components/`

### Getting Help
- **GitHub Discussions** - Ask questions and share migration experiences
- **GitHub Issues** - Report bugs or inconsistencies
- **Pull Requests** - Contribute fixes and improvements

### Reporting Issues

If you encounter migration problems:

1. **Check this guide** for common issues
2. **Search GitHub Issues** for similar reports
3. **Create a new issue** with:
   - Component name
   - Old and new variable names
   - Error message or unexpected behavior
   - Steps to reproduce

---

## Migration Tracking Template

Copy this checklist to track your migration progress:

### High-Impact Components (Migrate First)
- [ ] Button
- [ ] Form/Input
- [ ] Card

### Medium-Impact Components
- [ ] Alert (already compliant ✅)
- [ ] Dialog
- [ ] Navigation
- [ ] Table

### Low-Impact Components
- [ ] Badge
- [ ] Tag
- [ ] List
- [ ] Link
- [ ] Checkbox
- [ ] Toggle
- [ ] Select
- [ ] Textarea

### Post-Migration Tasks
- [ ] All builds succeed
- [ ] Storybook loads without errors
- [ ] Visual regression tests pass
- [ ] Custom themes tested
- [ ] Documentation updated
- [ ] Team notified of changes
- [ ] Deprecated variables removed (next major version)

---

**Last Updated:** November 3, 2025
**Template Version:** 1.0.0
**For Library Version:** @fpkit/acss v0.6.2+
