# Implementation Plan: 12-Column Utility System

## Overview

Create a Bootstrap/Foundation-compatible 12-column utility class system for the fpkit package. This system provides `.col-1` through `.col-12` classes that work with Flex, Grid, or standalone elements, using percentage-based widths that switch to 100% on mobile screens.

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
  width: 100%;
  box-sizing: border-box;
}

/* Desktop Column Widths (>= 48rem / 768px) */
@media (width >= 48rem) {
  .col-1 { width: var(--col-1); }
  .col-2 { width: var(--col-2); }
  .col-3 { width: var(--col-3); }
  .col-4 { width: var(--col-4); }
  .col-5 { width: var(--col-5); }
  .col-6 { width: var(--col-6); }
  .col-7 { width: var(--col-7); }
  .col-8 { width: var(--col-8); }
  .col-9 { width: var(--col-9); }
  .col-10 { width: var(--col-10); }
  .col-11 { width: var(--col-11); }
  .col-12 { width: var(--col-12); }
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

### With Grid Component
```jsx
<div className="grid gap-md">
  <div className="col-4">Sidebar</div>
  <div className="col-8">Main Content</div>
</div>
```

### Standalone
```jsx
<div style={{ display: 'flex', flexWrap: 'wrap' }}>
  <div className="col-12 col-md-6 col-lg-4">Card 1</div>
  <div className="col-12 col-md-6 col-lg-4">Card 2</div>
  <div className="col-12 col-md-6 col-lg-4">Card 3</div>
</div>
```

### With Offset
```jsx
<Flex className="flex-wrap">
  <div className="col-6 col-offset-3">Centered Content</div>
</Flex>
```

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

## Notes

- No React components needed - this is pure CSS utilities
- No JavaScript configuration changes required
- Follows existing patterns (rem units, CSS custom properties, modern media queries)
- Compatible with existing layout components (Flex, Grid, Box, Stack)
- Uses logical properties (`margin-inline-start`) for internationalization support
- Breakpoint (48rem) matches fpkit's existing `md` breakpoint
