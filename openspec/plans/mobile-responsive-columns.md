# Mobile Responsive Column Support Implementation Plan

**Feature:** Add mobile-first responsive column utilities to fpkit's 12-column system

**Date:** 2026-01-03

---

## Overview

Add full responsive column support with mobile-first utility classes (`.col-{breakpoint}-{span}`) across 4 breakpoints. Deprecate `alwaysProportional` in favor of explicit responsive utilities.

### User Requirements
- ✅ **API:** Utility classes (`.col-sm-6`, `.col-md-4`)
- ✅ **Breakpoints:** xs (0px), sm (480px), md (768px), lg (1024px)
- ✅ **Full responsive support:** span, offset, AND order variants
- ✅ **Deprecation:** Replace `alwaysProportional` with responsive utilities

### Current State
- Single breakpoint system at 48rem (768px)
- Mobile stacks at 100%, desktop shows proportional widths
- Recent features: flex-grow columns, proportional mode, column shrinking
- Col component uses pure utility class composition (no base class)

### Key Optimizations in This Plan

1. **SCSS Loops Instead of Manual Classes** 🔥
   - Use `@each` and `@for` to generate utilities programmatically
   - **Result:** ~100 lines of SCSS instead of ~500 lines
   - Same CSS output, much more maintainable

2. **Incremental Implementation with Testing**
   - Phase-by-phase approach with commits after each phase
   - Test immediately after each addition
   - **Result:** Easier to debug, safer deployment

3. **Backward Compatibility with Graceful Deprecation**
   - Existing code continues working
   - Deprecation warnings only in development mode
   - **Result:** No breaking changes, smooth migration path

4. **Performance Focused**
   - Pure CSS solution (no JavaScript overhead)
   - Target <5KB gzipped
   - Native browser media query matching
   - **Result:** Fast, efficient, scalable

**Time Estimate:** 4-6 hours (vs 2-3 days without optimization)

---

## Breakpoint System

### CSS Custom Properties

Add to `/packages/fpkit/src/sass/_columns.scss` after existing `:root` block:

```scss
/**
 * Responsive Breakpoints (mobile-first)
 */
:root {
  --col-breakpoint-xs: 0rem;      /* 0px - base mobile */
  --col-breakpoint-sm: 30rem;     /* 480px - large phones */
  --col-breakpoint-md: 48rem;     /* 768px - tablets */
  --col-breakpoint-lg: 64rem;     /* 1024px - desktops */

  /* Legacy support - keep for backward compatibility */
  --col-breakpoint: var(--col-breakpoint-md);
}
```

**Rationale:**
- Configurable via CSS custom properties
- Single source of truth for breakpoint values
- Visible in DevTools for debugging
- Minimal bundle size impact

---

## SCSS Implementation (Optimized)

### File: `/packages/fpkit/src/sass/_columns.scss`

**Implementation Strategy:** Use SCSS loops and maps to generate utilities programmatically. This reduces code from ~500 lines to ~100 lines while producing the same CSS output.

### 1. Breakpoint Map

Add after CSS custom properties:

```scss
/**
 * Breakpoint map for loop generation
 * Maps breakpoint name to CSS variable
 */
$col-breakpoints: (
  'sm': var(--col-breakpoint-sm),
  'md': var(--col-breakpoint-md),
  'lg': var(--col-breakpoint-lg),
);
```

### 2. Responsive Span Utilities (Generated with Loops)

Add after existing desktop column styles (~line 120):

```scss
/* ============================================================================
   Responsive Column Span Utilities (Generated)
   ========================================================================== */

/**
 * Generate responsive span utilities for all breakpoints
 * Produces: .col-{sm|md|lg}-{1-12}, .col-{sm|md|lg}-auto, .col-{sm|md|lg}-flex
 */
@each $breakpoint, $min-width in $col-breakpoints {
  @media (width >= #{$min-width}) {
    // Generate .col-{breakpoint}-{1-12} classes
    @for $i from 1 through 12 {
      .col-#{$breakpoint}-#{$i} {
        flex: 0 1 var(--col-#{$i});
      }
    }

    // Auto-width variant
    .col-#{$breakpoint}-auto {
      flex: 0 0 auto;
      width: auto;
    }

    // Flex-grow variant
    .col-#{$breakpoint}-flex {
      flex: 1 1 0%;
      min-width: 0;
    }
  }
}
```

### 3. Responsive Offset Utilities (Generated with Loops)

```scss
/* ============================================================================
   Responsive Column Offset Utilities (Generated)
   ========================================================================== */

/**
 * Generate responsive offset utilities for all breakpoints
 * Produces: .col-{sm|md|lg}-offset-{0-11}
 */
@each $breakpoint, $min-width in $col-breakpoints {
  @media (width >= #{$min-width}) {
    @for $i from 0 through 11 {
      .col-#{$breakpoint}-offset-#{$i} {
        margin-inline-start: if($i == 0, 0, var(--col-#{$i}));
      }
    }
  }
}
```

### 4. Responsive Order Utilities (Generated with Loops)

```scss
/* ============================================================================
   Responsive Column Order Utilities (Generated)
   ========================================================================== */

/**
 * Generate responsive order utilities for all breakpoints
 * Produces: .col-{sm|md|lg}-order-{first|last|0-12}
 */
@each $breakpoint, $min-width in $col-breakpoints {
  @media (width >= #{$min-width}) {
    .col-#{$breakpoint}-order-first { order: -1; }
    .col-#{$breakpoint}-order-last { order: 13; }

    @for $i from 0 through 12 {
      .col-#{$breakpoint}-order-#{$i} {
        order: $i;
      }
    }
  }
}
```

**Why This Approach:**
- ✅ **DRY (Don't Repeat Yourself)** - Write once, generate for all breakpoints
- ✅ **Maintainable** - Add new breakpoint by updating one map
- ✅ **Scalable** - Easy to add xl, xxl breakpoints later
- ✅ **Same CSS Output** - Compiled CSS is identical to manual approach
- ✅ **Smaller Source File** - ~100 lines instead of ~500 lines

### 4. Deprecate .col-row-proportional

Update existing `.col-row-proportional` section (~line 143):

```scss
/* ============================================================================
   DEPRECATED: Proportional Layout Mode
   ========================================================================== */

/**
 * @deprecated Use responsive utility classes instead (.col-sm-*, .col-md-*, .col-lg-*)
 * This class will be removed in v5.0.0
 *
 * Migration:
 *   Before: <Row alwaysProportional><Col span={6} /></Row>
 *   After:  <Row><div className="col-sm-6" /></Row>
 *
 * For now, maintains backward compatibility
 */
@media (width >= 30rem) {
  .col-row-proportional {
    /* Keep existing implementation for backward compatibility */
    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6,
    .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
      flex: 0 1 auto;
    }

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
}
```

---

## TypeScript Updates

### File: `/packages/fpkit/src/components/row/row.tsx`

Add deprecation warning:

```tsx
export const Row = React.forwardRef<HTMLElement, RowProps>(
  (
    {
      gap,
      justify,
      align,
      wrap,
      alwaysProportional = false,
      as = "div",
      className,
      classes,
      children,
      ...props
    },
    ref
  ) => {
    // Deprecation warning in development
    if (process.env.NODE_ENV === 'development' && alwaysProportional) {
      console.warn(
        '[fpkit] Row: alwaysProportional is deprecated and will be removed in v5.0.0. ' +
        'Use responsive column utilities instead: className="col-sm-6 col-md-4"'
      );
    }

    // Rest of implementation unchanged...
```

### File: `/packages/fpkit/src/components/row/row.types.ts`

Add `@deprecated` JSDoc:

```tsx
/**
 * @deprecated This prop will be removed in v5.0.0
 *
 * Use responsive column utility classes instead for better control.
 *
 * @example
 * // Before (deprecated):
 * <Row alwaysProportional>
 *   <Col span={6}>Column</Col>
 * </Row>
 *
 * // After (recommended):
 * <Row>
 *   <div className="col-sm-6">Column</div>
 * </Row>
 *
 * // Or with Col component:
 * <Row>
 *   <Col span={12} className="col-sm-6">Column</Col>
 * </Row>
 */
alwaysProportional?: boolean;
```

---

## Implementation Order (Optimized)

### Phase 1: Foundation (30 min)
1. **Add breakpoint CSS variables** to `_columns.scss` `:root` block
2. **Create breakpoint map** `$col-breakpoints` after CSS variables
3. **Test SCSS compilation** - ensure no syntax errors
4. **Commit:** "feat(columns): add responsive breakpoint system"

### Phase 2: Span Utilities (45 min)
5. **Implement span utility loop** using `@each` and `@for`
6. **Build SCSS:** `npm run sass:build` in fpkit package
7. **Test in browser DevTools:**
   - Verify `.col-sm-6`, `.col-md-4`, `.col-lg-3` classes exist in compiled CSS
   - Test at different viewport widths (320px, 480px, 768px, 1024px)
8. **Create Storybook story** with basic responsive examples
9. **Commit:** "feat(columns): add responsive span utilities (sm/md/lg)"

### Phase 3: Offset & Order Utilities (30 min)
10. **Implement offset utility loop**
11. **Implement order utility loop**
12. **Build and test:**
   - Verify offset classes apply correct `margin-inline-start`
   - Verify order classes change visual order
   - Test RTL mode (if supported)
13. **Update Storybook story** with offset/order examples
14. **Commit:** "feat(columns): add responsive offset and order utilities"

### Phase 4: Deprecation (15 min)
15. **Add deprecation warning** to `row.tsx` (dev mode only)
16. **Update JSDoc** in `row.types.ts` with `@deprecated` tag
17. **Add deprecation comment** to `.col-row-proportional` SCSS
18. **Test deprecation warning** appears in console
19. **Commit:** "feat(columns): deprecate alwaysProportional prop"

### Phase 5: Testing (1-2 hours)
20. **Write unit tests** for utility class generation
21. **Test deprecation warning** in development mode
22. **Visual regression testing** in Storybook across breakpoints
23. **Manual testing checklist:**
   - Mobile (320px): All columns stack
   - Small (480px): `.col-sm-*` applies
   - Medium (768px): `.col-md-*` applies
   - Large (1024px): `.col-lg-*` applies
   - Offset works at each breakpoint
   - Order works at each breakpoint
   - Combining multiple breakpoint classes cascades correctly
24. **Commit:** "test(columns): add responsive utility tests"

### Phase 6: Documentation (1 hour)
25. **Add comprehensive examples** to `col.stories.tsx`:
   - Mobile-first responsive layout
   - Responsive offsets
   - Responsive ordering
   - Mixing breakpoints
26. **Create migration guide** in README or separate MIGRATION.md
27. **Document CSS variables** and how to customize breakpoints
28. **Add accessibility notes** about visual vs DOM order
29. **Commit:** "docs(columns): add responsive utility documentation"

### Phase 7: Build Optimization (30 min)
30. **Verify bundle size:**
   - Build production bundle
   - Check gzipped CSS size (<5KB acceptable)
31. **Test tree-shaking** (if applicable)
32. **Performance audit** in Storybook
33. **Commit:** "chore(columns): verify responsive utilities bundle size"

**Total Time Estimate: 4-6 hours** (with testing and documentation)

---

## Usage Examples

### Mobile-First Responsive Layout
```tsx
<Row>
  {/* Stacks on mobile, 2 cols on tablet, 3 cols on desktop */}
  <div className="col-12 col-md-6 col-lg-4">Column 1</div>
  <div className="col-12 col-md-6 col-lg-4">Column 2</div>
  <div className="col-12 col-md-6 col-lg-4">Column 3</div>
</Row>
```

### With Col Component
```tsx
<Row>
  <Col span={12} className="col-sm-6 col-lg-3">
    Combined props and classes
  </Col>
</Row>
```

### Responsive Offset
```tsx
<Row>
  <div className="col-12 col-md-6 col-md-offset-3">
    Centered on tablet+
  </div>
</Row>
```

### Responsive Order
```tsx
<Row>
  <div className="col-12 col-md-order-2">
    First on mobile, second on tablet
  </div>
  <div className="col-12 col-md-order-1">
    Second on mobile, first on tablet
  </div>
</Row>
```

---

## Backward Compatibility

✅ **Existing `<Col span={6}>` props continue working**
✅ **`alwaysProportional` continues working (with dev warning)**
✅ **Existing `.col-{1-12}` classes unchanged**
✅ **Can combine props and utility classes**

### Migration from alwaysProportional

**Before:**
```tsx
<Row alwaysProportional>
  <Col span={6}>Half width on tablet+</Col>
</Row>
```

**After:**
```tsx
<Row>
  <div className="col-sm-6">Half width on tablet+</div>
</Row>
```

---

## Bundle Size Impact

- **Current:** ~3KB uncompressed
- **With responsive utilities:** ~19KB uncompressed
- **Gzipped:** ~4-5KB (CSS compresses very well)
- **Comparison:** Bootstrap's grid is ~7KB gzipped

This is acceptable for the flexibility gained.

---

## Testing Checklist

- [ ] Span utilities work at each breakpoint (sm, md, lg)
- [ ] Offset utilities work at each breakpoint
- [ ] Order utilities work at each breakpoint
- [ ] Auto and flex variants work responsively
- [ ] Deprecation warning appears in development mode
- [ ] Existing Col props continue working
- [ ] Existing .col-row-proportional continues working
- [ ] RTL support with logical properties
- [ ] Visual regression testing in Storybook
- [ ] SCSS compiles without errors
- [ ] Bundle size is acceptable
- [ ] TypeScript types work correctly
- [ ] No console errors in production build

---

## Build Optimization

### SCSS Compilation
```bash
# In packages/fpkit/
npm run sass:build      # Compile SCSS to CSS
npm run sass:watch      # Watch mode for development
```

### Bundle Size Monitoring
```bash
# Check compiled CSS size
ls -lh packages/fpkit/libs/index.css

# Check gzipped size (production)
gzip -c packages/fpkit/libs/index.css | wc -c
```

**Target Sizes:**
- Uncompressed CSS: ~19KB (acceptable)
- Gzipped CSS: <5KB (target)

### Performance Considerations

1. **CSS Output Optimization:**
   - SCSS loops generate identical media queries for each breakpoint
   - Modern browsers handle this efficiently
   - CSS minification removes unnecessary whitespace
   - Gzip compression deduplicates repeated patterns

2. **Critical CSS Strategy:**
   - Base column classes (`.col-{1-12}`) should be in critical CSS
   - Responsive utilities can be lazy-loaded if needed
   - Consider splitting into separate files: `columns-base.css` and `columns-responsive.css`

3. **Tree-Shaking:**
   - Not applicable for CSS (no tree-shaking)
   - All utilities will be in final bundle
   - Acceptable tradeoff for flexibility

4. **Runtime Performance:**
   - No JavaScript required for responsive columns
   - Pure CSS solution performs better than JS-based grids
   - Browser handles media query matching natively

---

## Critical Files (Updated Estimates)

1. **`/packages/fpkit/src/sass/_columns.scss`** - Primary implementation
   - **Add:** ~100-120 lines (using SCSS loops)
   - **Modify:** ~20 lines (deprecation comments)
   - **Total change:** ~120 lines (vs 500-600 without loops)

2. **`/packages/fpkit/src/components/row/row.tsx`** - Deprecation warning
   - **Add:** ~10 lines (console.warn in development)

3. **`/packages/fpkit/src/components/row/row.types.ts`** - JSDoc update
   - **Modify:** ~20 lines (@deprecated tag and migration examples)

4. **`/packages/fpkit/src/components/col/col.stories.tsx`** - Responsive examples
   - **Add:** ~150-200 lines (comprehensive examples for all breakpoints)

5. **`/packages/fpkit/src/components/row/row.stories.tsx`** - Deprecation story
   - **Add:** ~30-40 lines (show deprecation warning in Storybook)

**Total Code Addition: ~300-400 lines** (much smaller with SCSS optimization)

---

## Potential Gotchas

1. **Specificity conflicts** - Multiple breakpoint classes cascade correctly
2. **Combining props and classes** - Both apply, cascade determines winner
3. **RTL support** - Already using `margin-inline-start` logical properties
4. **Flex-wrap behavior** - Users can override with Row's `wrap` prop
5. **Accessibility** - Document visual reordering considerations for screen readers
6. **Browser support** - `width >=` syntax works in all modern browsers
7. **Performance** - Many classes have minimal impact in modern browsers

---

## Alternative Approaches Considered

### ❌ Option 1: Responsive Props (spanXs, spanSm, spanMd, spanLg)
```tsx
<Col spanXs={12} spanSm={6} spanMd={4} spanLg={3}>Content</Col>
```

**Why Not:**
- Requires updating Col component TypeScript types significantly
- Adds ~40-50 new props (spanXs, spanSm, spanMd, spanLg, offsetXs, etc.)
- Complex prop precedence logic
- Larger JavaScript bundle size
- User requested utility classes, not props

### ❌ Option 2: CSS Grid Instead of Flexbox
```scss
.col-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
```

**Why Not:**
- Breaking change from current flexbox implementation
- Would require rewriting all existing column logic
- CSS Grid and Flexbox solve different problems (2D vs 1D)
- Current flexbox approach is well-tested and working

### ❌ Option 3: JavaScript-Based Responsive System
```tsx
const breakpoint = useBreakpoint();
return <Col span={breakpoint === 'mobile' ? 12 : 6}>Content</Col>
```

**Why Not:**
- Requires JavaScript runtime
- Poorer performance than CSS media queries
- Server-side rendering complications
- Layout shift on hydration
- CSS-only solution is simpler and faster

### ✅ Option 4: Utility Classes with SCSS Loops (CHOSEN)
```tsx
<div className="col-12 col-sm-6 col-md-4 col-lg-3">Content</div>
```

**Why This Wins:**
- User's explicit preference (utility classes)
- No JavaScript overhead
- Familiar API (similar to Bootstrap, Tailwind)
- SCSS loops make it maintainable
- Works with any element (not just Col component)
- Easy to override with additional classes
- No breaking changes

---

## Related Plans

- `12-column-utility-system.md` - Original column system implementation
- `flex-column-implementation.md` - Flex-grow column feature
- `column-proportional-layout-mode.md` - alwaysProportional feature (being deprecated)

---

## Summary

This plan provides a **comprehensive, optimized approach** to adding mobile-responsive column support:

- ✅ **Efficient:** SCSS loops reduce code from 500 to 100 lines
- ✅ **Fast:** 4-6 hour implementation (not days)
- ✅ **Safe:** No breaking changes, backward compatible
- ✅ **Tested:** Phase-by-phase with testing at each step
- ✅ **Performant:** <5KB gzipped, pure CSS solution
- ✅ **Maintainable:** Easy to add xl, xxl breakpoints later
- ✅ **Documented:** Comprehensive examples and migration guide

**Ready to implement!** 🚀
