# Implementation Plan: 12-Column Utility System

## Overview

Create a Bootstrap/Foundation-compatible 12-column utility class system for the fpkit package. This system provides `.col-1` through `.col-12` classes that work with **Flexbox containers** (via the Flex component or custom flex containers), using percentage-based widths that switch to 100% on mobile screens.

## Plan Optimizations (v2)

This plan has been reviewed and optimized for production use:

✅ **Fixed**: Changed from `width` to `flex-basis` for better flex container compatibility
✅ **Fixed**: Added `min-width: 0` to prevent content overflow in flex items
✅ **Fixed**: Corrected misleading examples (removed non-existent responsive classes)
✅ **Added**: Clear separation from existing Grid component (CSS Grid vs Flexbox)
✅ **Added**: Container pattern recommendations (use Flex component)
✅ **Added**: Comprehensive troubleshooting guide
✅ **Added**: Migration guide from Bootstrap/Foundation
✅ **Added**: Performance analysis and bundle size estimates
✅ **Added**: Future enhancement roadmap (Phase 2 features)
✅ **Clarified**: Spacing/gutters pattern (use gap utilities, not padding)
✅ **Clarified**: Optional features are included by default (~3.7KB total)

## Requirements

- **Layout-agnostic**: Works with existing Flex/Grid components or standalone
- **12-column system**: `.col-1` = 8.333%, `.col-6` = 50%, `.col-12` = 100%
- **Mobile-first responsive**: 100% width on mobile (< 48rem), percentage on desktop (>= 48rem)
- **CSS utility classes only**: No React components, pure SCSS
- **Follows fpkit patterns**: rem units, CSS custom properties, modern media queries

## Implementation Steps

### 1. Create Core SCSS File

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_columns.scss`

**Content structure**:
```scss
/**
 * 12-Column Utility System
 *
 * Layout-agnostic column width utilities following Bootstrap/Foundation patterns.
 * Works with Flex, Grid, or standalone elements.
 *
 * Responsive Behavior:
 * - Mobile (< 48rem): All columns 100% width (stacked)
 * - Desktop (>= 48rem): Fractional percentage widths
 *
 * All units in rem (1rem = 16px base).
 */

/* CSS Custom Properties */
:root {
  --col-breakpoint: 48rem; /* 768px - matches fpkit md breakpoint */

  /* Column width percentages (fractions of 12) */
  --col-1: 8.333333%;
  --col-2: 16.666667%;
  --col-3: 25%;
  --col-4: 33.333333%;
  --col-5: 41.666667%;
  --col-6: 50%;
  --col-7: 58.333333%;
  --col-8: 66.666667%;
  --col-9: 75%;
  --col-10: 83.333333%;
  --col-11: 91.666667%;
  --col-12: 100%;
}

/* Base Column Classes - Mobile First (100% width) */
.col-1, .col-2, .col-3, .col-4, .col-5, .col-6,
.col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
  flex: 0 0 100%;       /* flex-grow flex-shrink flex-basis */
  min-width: 0;         /* Prevent content overflow in flex containers */
  box-sizing: border-box;
}

/* Desktop Column Widths (>= 48rem / 768px) */
@media (width >= 48rem) {
  .col-1 { flex-basis: var(--col-1); }
  .col-2 { flex-basis: var(--col-2); }
  .col-3 { flex-basis: var(--col-3); }
  .col-4 { flex-basis: var(--col-4); }
  .col-5 { flex-basis: var(--col-5); }
  .col-6 { flex-basis: var(--col-6); }
  .col-7 { flex-basis: var(--col-7); }
  .col-8 { flex-basis: var(--col-8); }
  .col-9 { flex-basis: var(--col-9); }
  .col-10 { flex-basis: var(--col-10); }
  .col-11 { flex-basis: var(--col-11); }
  .col-12 { flex-basis: var(--col-12); }
}

/* Optional: Column Offset Utilities */
@media (width >= 48rem) {
  .col-offset-0 { margin-inline-start: 0; }
  .col-offset-1 { margin-inline-start: var(--col-1); }
  .col-offset-2 { margin-inline-start: var(--col-2); }
  .col-offset-3 { margin-inline-start: var(--col-3); }
  .col-offset-4 { margin-inline-start: var(--col-4); }
  .col-offset-5 { margin-inline-start: var(--col-5); }
  .col-offset-6 { margin-inline-start: var(--col-6); }
  .col-offset-7 { margin-inline-start: var(--col-7); }
  .col-offset-8 { margin-inline-start: var(--col-8); }
  .col-offset-9 { margin-inline-start: var(--col-9); }
  .col-offset-10 { margin-inline-start: var(--col-10); }
  .col-offset-11 { margin-inline-start: var(--col-11); }
}

/* Optional: Auto-Width Columns */
.col-auto {
  width: auto;
  flex: 0 0 auto;
}

/* Optional: Column Order Utilities */
@media (width >= 48rem) {
  .col-order-first { order: -1; }
  .col-order-last { order: 13; }
  .col-order-0 { order: 0; }
  .col-order-1 { order: 1; }
  .col-order-2 { order: 2; }
  .col-order-3 { order: 3; }
  .col-order-4 { order: 4; }
  .col-order-5 { order: 5; }
  .col-order-6 { order: 6; }
  .col-order-7 { order: 7; }
  .col-order-8 { order: 8; }
  .col-order-9 { order: 9; }
  .col-order-10 { order: 10; }
  .col-order-11 { order: 11; }
  .col-order-12 { order: 12; }
}
```

**Key patterns to follow**:
- Use `flex-basis` instead of `width` for better flex container compatibility
- Include `min-width: 0` to prevent content overflow in flex items
- Use `@media (width >= 48rem)` (modern range syntax, matches existing flex.scss)
- Use `margin-inline-start` for offsets (logical property for i18n)
- All percentages defined as CSS custom properties
- Mobile-first: base styles are 100%, media query adds percentage widths
- Include comprehensive header comment

### 2. Integrate into Build System

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/index.scss`

**Action**: Add one line after line 21 (after the grid-legacy import):

```scss
@use "./sass/_grid.scss" as grid-legacy;
@use "./sass/_columns.scss";  // ADD THIS LINE
@use "./components/badge/badge.scss";
```

This ensures the column utilities are compiled into the main `libs/index.css` output.

### 3. Create Documentation

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/README.mdx` (create if doesn't exist)

**Content**: Document the column utility system with:
- Quick start examples
- Usage with Flex, Grid, and standalone
- Column class reference table (col-1 through col-12)
- Offset utilities examples
- Order utilities examples
- Customization via CSS custom properties
- Responsive behavior explanation

### 4. Create Storybook Stories (Optional but Recommended)

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/columns.stories.tsx`

**Purpose**: Demonstrate column utilities in Storybook

**Content structure**:
```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../sass/_columns.scss";

const meta: Meta = {
  title: "FP.React Components/Utilities/Columns",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories demonstrating:
// - All column sizes (col-1 through col-12)
// - Two-column layout (col-6 + col-6)
// - Three-column layout (col-4 + col-4 + col-4)
// - Sidebar layout (col-3 + col-9)
// - Offset examples
// - Order examples
// - Usage with Flex component
// - Usage with Grid component
```

### 5. Build and Test

**Commands to run**:
```bash
# Compile SCSS
cd /Users/shawnsandy/devbox/acss/packages/fpkit
npm run sass:build

# Verify output includes column utilities
cat libs/index.css | grep "\.col-"

# Full build
npm run build

# Start Storybook (from root)
cd /Users/shawnsandy/devbox/acss
npm start
```

**Manual testing checklist**:
- [ ] Verify `.col-1` through `.col-12` exist in compiled CSS
- [ ] Test at mobile viewport (< 768px) - all columns should be 100% width
- [ ] Test at desktop viewport (>= 768px) - columns should use percentage widths
- [ ] Test with existing Flex component
- [ ] Test with existing Grid component
- [ ] Test offset utilities work correctly
- [ ] Test order utilities work correctly
- [ ] Verify no conflicts with existing utility classes

## Usage Examples

### With Flex Component
```jsx
<Flex className="flex-wrap gap-md">
  <div className="col-6">Left Half</div>
  <div className="col-6">Right Half</div>
</Flex>
```

### ⚠️ NOT Compatible with Grid Component
```jsx
{/* DON'T DO THIS - Grid uses CSS Grid, not Flexbox */}
<div className="grid gap-md">  {/* Grid component uses display: grid */}
  <div className="col-4">Won't work as expected</div>  {/* .col-* are flex utilities */}
</div>

{/* Instead, use Grid's built-in column spanning */}
<div className="grid grid-cols-12 gap-md">
  <div className="grid-col-span-4">Sidebar</div>
  <div className="grid-col-span-8">Main Content</div>
</div>
```

**Important**: Column utilities (`.col-*`) are designed for **Flexbox only**. The existing Grid component uses CSS Grid with `.grid-col-span-*` classes instead.

### Standalone (Requires Flex Container)
```jsx
{/* Create flex container with gap for spacing */}
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
  <div className="col-6">Card 1</div>
  <div className="col-6">Card 2</div>
  <div className="col-4">Card 3</div>
  <div className="col-4">Card 4</div>
  <div className="col-4">Card 5</div>
</div>
```

**Important**: Column utilities work with **Flexbox containers only** (`display: flex`). For standalone usage, you must create a flex container with `flex-wrap: wrap`.

### With Offset
```jsx
<Flex className="flex-wrap">
  <div className="col-6 col-offset-3">Centered Content</div>
</Flex>
```

## Important Considerations

### Flex Container Requirements

Column utilities **require a flex container** to work correctly. The container must have:
- `display: flex` (or use the `<Flex>` component)
- `flex-wrap: wrap` (to allow columns to wrap to new rows)
- Optional: `gap` property for spacing between columns

**Recommended Container Patterns:**

```jsx
// Option 1: Use existing Flex component (RECOMMENDED)
<Flex wrap="wrap" gap="md">
  <div className="col-6">Column</div>
</Flex>

// Option 2: Custom container with inline styles
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
  <div className="col-6">Column</div>
</div>

// Option 3: Custom container with utility classes
<div className="flex flex-wrap gap-md">
  <div className="col-6">Column</div>
</div>
```

### Grid vs Columns Clarification

**Two DIFFERENT systems exist:**

| System | Purpose | Display Mode | Classes | Use Case |
|--------|---------|--------------|---------|----------|
| **Grid Component** | CSS Grid layouts | `display: grid` | `.grid-cols-*`, `.grid-col-span-*` | Multi-dimensional layouts, explicit grid templates |
| **Column Utilities** (NEW) | Percentage widths | `display: flex` | `.col-1` through `.col-12` | Flexbox-based layouts, Bootstrap-style columns |

**They are NOT interchangeable**:
- `.col-6` (new utility) = 50% width for flex items
- `.grid-cols-6` (existing) = 6-column grid template
- `.grid-col-span-6` (existing) = span 6 grid columns

### Spacing/Gutters Pattern

**Unlike Bootstrap**, these column utilities do NOT have built-in gutters. Instead, use fpkit's existing gap utilities:

```jsx
// ✅ CORRECT: Use gap on the container
<Flex wrap="wrap" gap="md">
  <div className="col-6">Has spacing via gap</div>
  <div className="col-6">Has spacing via gap</div>
</Flex>

// ❌ WRONG: Don't add padding to columns
<Flex wrap="wrap">
  <div className="col-6" style={{ padding: '0.5rem' }}>
    Breaks the 12-column math!
  </div>
</Flex>
```

**Available gap utilities**:
- `gap-0` (0)
- `gap-xs` (0.25-0.5rem)
- `gap-sm` (0.5-0.75rem)
- `gap-md` (0.75-1.125rem) **← Recommended default**
- `gap-lg` (1-1.5rem)
- `gap-xl` (1.5-2rem)

### Optional Features Decision

The "optional" features (offsets, auto-width, ordering) are **included by default** in the core `_columns.scss` file. They add approximately 100 lines of CSS (~3KB).

**To exclude optional features** (keep only core col-1 through col-12):
1. Remove the "Optional" sections from `_columns.scss`
2. Saves ~3KB of CSS
3. Reduces complexity for users who don't need these features

**Recommendation**: Start with all features included. Remove only if bundle size becomes a concern.

## Troubleshooting Guide

### Columns not wrapping to new rows
**Problem**: All columns stay on one row and shrink
**Solution**: Add `flex-wrap: wrap` to the container

```jsx
// ❌ WRONG
<Flex>
  <div className="col-6">...</div>
  <div className="col-6">...</div>
  <div className="col-6">...</div>  {/* Doesn't wrap! */}
</Flex>

// ✅ CORRECT
<Flex wrap="wrap">
  <div className="col-6">...</div>
  <div className="col-6">...</div>
  <div className="col-6">...</div>  {/* Wraps to new row */}
</Flex>
```

### Content overflowing from columns
**Problem**: Long text or images overflow the column width
**Solution**: The `min-width: 0` in the utility prevents this, but verify container has `flex-wrap: wrap`

### Columns not sized correctly on mobile
**Problem**: Columns show percentage widths on mobile screens
**Solution**: Check browser width is actually < 768px (48rem). Use browser DevTools responsive mode to verify.

### Columns not adding up to 100%
**Problem**: `.col-4 + .col-4 + .col-4 != 100%`
**Solution**: This is correct! 33.333% × 3 = 99.999% (rounds to 100%). Browsers handle this correctly.

### Can't use with Grid component
**Problem**: `.col-6` doesn't work inside `<Grid>` component
**Solution**: Use `.grid-col-span-6` instead. Column utilities only work with Flexbox, not CSS Grid.

## Migration from Bootstrap/Foundation

### Bootstrap Row/Col Pattern

**Bootstrap:**
```html
<div class="row">
  <div class="col-6">Column</div>
  <div class="col-6">Column</div>
</div>
```

**fpkit equivalent:**
```jsx
<Flex wrap="wrap" gap="md">
  <div className="col-6">Column</div>
  <div className="col-6">Column</div>
</Flex>
```

**Key differences:**
- No `.row` class needed - use `<Flex>` component instead
- Add `gap` for spacing (Bootstrap uses negative margins on row + padding on columns)
- Same class names (`.col-1` through `.col-12`)
- Same percentage calculations
- Mobile-first responsive (100% on small screens)

### Foundation Grid Pattern

**Foundation:**
```html
<div class="grid-x grid-padding-x">
  <div class="cell medium-6">Column</div>
  <div class="cell medium-6">Column</div>
</div>
```

**fpkit equivalent:**
```jsx
<Flex wrap="wrap" gap="md">
  <div className="col-6">Column</div>
  <div className="col-6">Column</div>
</Flex>
```

**Key differences:**
- Use `.col-*` instead of `.cell .medium-*`
- Only one breakpoint (48rem) - no sm/md/lg/xl variants yet
- Use `<Flex>` component or custom flex container
- Spacing via `gap` property

## Critical Files

### Files to CREATE:
1. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_columns.scss` - Core implementation
2. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/README.mdx` - Documentation
3. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/columns.stories.tsx` - Storybook stories (optional)

### Files to MODIFY:
1. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/index.scss` - Add import (1 line)

### Files for REFERENCE:
1. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/flexbox/flex.scss` - Media query pattern
2. `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_globals.scss` - Spacing scale, breakpoints
3. `/Users/shawnsandy/devbox/acss/docs/css-variables.md` - CSS variable naming standards

## Success Criteria

- [ ] Column utilities compiled successfully into `libs/index.css`
- [ ] All 12 column classes (`.col-1` through `.col-12`) work correctly
- [ ] Mobile-first responsive behavior: 100% on small screens, percentage on large
- [ ] Works seamlessly with existing Flex and Grid components
- [ ] No naming conflicts with existing utility classes
- [ ] CSS custom properties allow customization of breakpoint and widths
- [ ] Optional features (offsets, auto, ordering) implemented
- [ ] Documentation created
- [ ] Storybook stories demonstrate usage
- [ ] Build pipeline generates expected output

## Estimated Effort

- Core SCSS file: 1-2 hours
- Integration and build testing: 30 minutes
- Documentation: 1 hour
- Storybook stories: 1-2 hours
- **Total**: 4-6 hours

## Performance & Bundle Size

### CSS Output Size Estimate

| Feature | Lines of Code | Approx. Size | Included by Default |
|---------|---------------|--------------|---------------------|
| Core columns (.col-1 through .col-12) | ~30 lines | ~1KB | ✅ Yes |
| CSS custom properties | ~15 lines | ~0.5KB | ✅ Yes |
| Offset utilities | ~30 lines | ~1KB | ✅ Yes |
| Auto-width utility | ~5 lines | ~0.2KB | ✅ Yes |
| Order utilities | ~30 lines | ~1KB | ✅ Yes |
| **Total** | **~110 lines** | **~3.7KB** | - |

**After minification**: Approximately **1.5-2KB** (compressed)

**Impact on main CSS bundle**: Minimal (<2% for typical component library)

### Modular Approach (Optional Future Enhancement)

If bundle size becomes a concern, consider splitting into multiple files:

```scss
// Core (always needed)
@use "./sass/columns/_core.scss";

// Optional features (import as needed)
@use "./sass/columns/_offsets.scss";
@use "./sass/columns/_order.scss";
```

**Current recommendation**: Include all features in single file for simplicity.

## Future Enhancements (Phase 2)

The current implementation provides a solid foundation. Future enhancements could include:

### 1. Multiple Responsive Breakpoints

**Current**: Single breakpoint at 48rem (mobile → desktop)
**Future**: Multiple breakpoints (sm/md/lg/xl)

```scss
// Potential future syntax
.col-12        // 100% on all screens
.md\:col-6     // 50% at 768px+
.lg\:col-4     // 33.33% at 992px+
```

**Complexity**: High (adds ~300 lines of CSS)
**Benefit**: More granular responsive control
**Alternative**: Use existing responsive Flex component props instead

### 2. Row Utility (Bootstrap-style Container)

**Current**: Requires manual flex container creation
**Future**: Optional `.col-row` utility

```scss
.col-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}
```

**Complexity**: Low (~10 lines)
**Benefit**: Convenience for standalone usage
**Trade-off**: Duplicates existing Flex component functionality

### 3. Pull Utilities (Visual Reordering)

**Current**: Only push (offsets with margin-inline-start)
**Future**: Pull utilities (negative margins)

```scss
.col-pull-3 {
  margin-inline-start: calc(var(--col-3) * -1);
}
```

**Complexity**: Medium (~30 lines)
**Benefit**: More layout flexibility
**Trade-off**: Rarely used in modern layouts (flexbox order is better)

### 4. Alignment Utilities

**Current**: No column-specific alignment
**Future**: Per-column alignment

```scss
.col-align-start { align-self: flex-start; }
.col-align-center { align-self: center; }
.col-align-end { align-self: flex-end; }
```

**Complexity**: Low (~15 lines)
**Benefit**: Fine-grained alignment control
**Alternative**: Use existing Flex.Item alignSelf prop

**Recommendation**: Implement Phase 2 enhancements only if users request them. The current implementation covers 90% of use cases.

## Notes

- No React components needed - this is pure CSS utilities
- No JavaScript configuration changes required
- Follows existing patterns (rem units, CSS custom properties, modern media queries)
- Compatible with existing Flex, Box, Stack components (NOT Grid - uses CSS Grid)
- Uses logical properties (`margin-inline-start`) for internationalization support
- Breakpoint (48rem) matches fpkit's existing `md` breakpoint
- Uses `flex-basis` instead of `width` for better flex container compatibility
- Includes `min-width: 0` to prevent content overflow in flex items
