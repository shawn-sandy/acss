# Layout Primitives Implementation Plan

**Status:** Planning
**Date:** 2025-12-03
**Components:** Box, Stack, Cluster, Grid
**Approach:** Utility Classes (consistent with Flex component)

---

## Executive Summary

This document outlines the implementation plan for four layout primitive components that will enhance the fpkit component library's layout capabilities:

- **Box** - General-purpose container with spacing/sizing controls
- **Stack** - Vertical/horizontal layouts with gap between children
- **Cluster** - Wrapping flex layout for inline groups (tags, buttons)
- **Grid** - CSS Grid layout with responsive columns

These primitives follow fpkit's existing patterns: TypeScript with strict typing, utility class-based styling, rem units only, CSS custom properties for theming, and comprehensive testing with Storybook.

---

## Research Findings

### Existing Architecture Analysis

**Component Patterns:**
- fpkit uses a polymorphic `UI` base component for all primitives
- Components use `forwardRef` for ref forwarding
- Props extend `ComponentProps` interface from `src/types/component-props.ts`
- Compound component pattern used for complex components (Card, Flex)

**Existing Layout Components:**
- **Flex** - Full-featured flexbox primitive with responsive props, sub-components (Item, Spacer)
- **Landmarks** - Semantic HTML5 wrappers (Header, Main, Footer, Aside) without layout controls
- **Card** - Container component with compound sub-components

**Gaps Identified:**
- No generic Box primitive for basic spacing/sizing control
- No CSS Grid primitive (only Flexbox via Flex)
- No simplified Stack component (users must use full Flex API)
- No semantic Cluster component for wrapping inline groups

**Styling System:**
- SCSS with CSS custom properties (NO Tailwind)
- All units in rem (1rem = 16px base)
- CSS variable naming: `--{component}-{element}-{variant}-{property}-{modifier}`
- Approved abbreviations: `bg`, `fs`, `fw`, `radius`, `gap`
- Full words required: `padding`, `padding-inline`, `padding-block`, `margin`, `color`, `border`

**Existing Spacing Scale (from flex.scss):**
```scss
:root {
  --flex-gap-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);   /* 4-8px */
  --flex-gap-sm: clamp(0.5rem, 0.45rem + 0.35vw, 0.75rem);  /* 8-12px */
  --flex-gap-md: clamp(0.75rem, 0.65rem + 0.45vw, 1.125rem); /* 12-18px */
  --flex-gap-lg: clamp(1rem, 0.85rem + 0.6vw, 1.5rem);      /* 16-24px */
  --flex-gap-xl: clamp(1.5rem, 1.25rem + 0.75vw, 2rem);     /* 24-32px */
}
```

**Component File Structure:**
```
{component}/
├── {component}.tsx          # Main component (TypeScript + JSDoc + forwardRef)
├── {component}.types.ts     # TypeScript interfaces
├── {component}.scss         # Styles with utility classes (rem only!)
├── {component}.stories.tsx  # Storybook stories + play tests
├── {component}.test.tsx     # Vitest unit tests
├── README.mdx              # Component usage documentation
└── STYLES.mdx              # CSS variable reference
```

---

## Component Specifications

### 1. Box Component

**Purpose:** Fundamental container primitive for spacing and sizing control.

**TypeScript Props:**
```typescript
export interface BoxProps extends Partial<ComponentProps> {
  /** Padding on all sides */
  padding?: SpacingScale;
  /** Padding on inline axis (left/right in LTR) */
  paddingInline?: SpacingScale;
  /** Padding on block axis (top/bottom) */
  paddingBlock?: SpacingScale;
  /** Margin on all sides */
  margin?: SpacingScale;
  /** Margin on inline axis */
  marginInline?: SpacingScale;
  /** Margin on block axis */
  marginBlock?: SpacingScale;
  /** Width behavior */
  width?: 'auto' | 'full' | 'fit' | 'max';
  /** Maximum width constraint */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'container';
  /** Border radius */
  radius?: SpacingScale | 'full';
  /** Polymorphic element type */
  as?: BoxElement;
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

export type SpacingScale = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BoxElement =
  | 'div' | 'section' | 'article' | 'aside' | 'main'
  | 'header' | 'footer' | 'nav';
```

**CSS Variables:**
```scss
:root {
  // Spacing scale (shared with Stack, Cluster)
  --spacing-0: 0;
  --spacing-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --spacing-sm: clamp(0.5rem, 0.45rem + 0.35vw, 0.75rem);
  --spacing-md: clamp(0.75rem, 0.65rem + 0.45vw, 1.125rem);
  --spacing-lg: clamp(1rem, 0.85rem + 0.6vw, 1.5rem);
  --spacing-xl: clamp(1.5rem, 1.25rem + 0.75vw, 2rem);

  // Max width scale
  --box-max-width-xs: 30rem;    /* 480px */
  --box-max-width-sm: 40rem;    /* 640px */
  --box-max-width-md: 48rem;    /* 768px */
  --box-max-width-lg: 64rem;    /* 1024px */
  --box-max-width-xl: 80rem;    /* 1280px */
  --box-max-width-container: 75rem; /* 1200px */

  // Border radius scale
  --box-radius-xs: 0.125rem;    /* 2px */
  --box-radius-sm: 0.25rem;     /* 4px */
  --box-radius-md: 0.375rem;    /* 6px */
  --box-radius-lg: 0.5rem;      /* 8px */
  --box-radius-xl: 0.75rem;     /* 12px */
  --box-radius-full: 9999px;
}
```

**Utility Classes:**
```scss
// Padding utilities
.box-padding-0 { padding: 0; }
.box-padding-xs { padding: var(--spacing-xs); }
.box-padding-sm { padding: var(--spacing-sm); }
.box-padding-md { padding: var(--spacing-md); }
.box-padding-lg { padding: var(--spacing-lg); }
.box-padding-xl { padding: var(--spacing-xl); }

// Padding inline (logical properties)
.box-padding-inline-xs { padding-inline: var(--spacing-xs); }
.box-padding-inline-sm { padding-inline: var(--spacing-sm); }
.box-padding-inline-md { padding-inline: var(--spacing-md); }
.box-padding-inline-lg { padding-inline: var(--spacing-lg); }
.box-padding-inline-xl { padding-inline: var(--spacing-xl); }

// Padding block (logical properties)
.box-padding-block-xs { padding-block: var(--spacing-xs); }
.box-padding-block-sm { padding-block: var(--spacing-sm); }
.box-padding-block-md { padding-block: var(--spacing-md); }
.box-padding-block-lg { padding-block: var(--spacing-lg); }
.box-padding-block-xl { padding-block: var(--spacing-xl); }

// Margin utilities (similar pattern)
.box-margin-0 { margin: 0; }
.box-margin-xs { margin: var(--spacing-xs); }
// ... etc

// Width utilities
.box-width-auto { width: auto; }
.box-width-full { width: 100%; }
.box-width-fit { width: fit-content; }
.box-width-max { width: max-content; }

// Max-width utilities
.box-max-width-xs { max-width: var(--box-max-width-xs); }
.box-max-width-sm { max-width: var(--box-max-width-sm); }
.box-max-width-md { max-width: var(--box-max-width-md); }
.box-max-width-lg { max-width: var(--box-max-width-lg); }
.box-max-width-xl { max-width: var(--box-max-width-xl); }
.box-max-width-container { max-width: var(--box-max-width-container); }

// Border radius utilities
.box-radius-xs { border-radius: var(--box-radius-xs); }
.box-radius-sm { border-radius: var(--box-radius-sm); }
.box-radius-md { border-radius: var(--box-radius-md); }
.box-radius-lg { border-radius: var(--box-radius-lg); }
.box-radius-xl { border-radius: var(--box-radius-xl); }
.box-radius-full { border-radius: var(--box-radius-full); }
```

**Usage Examples:**
```tsx
// Basic container with padding
<Box padding="md">
  <h1>Content</h1>
</Box>

// Centered container with max width
<Box
  padding="lg"
  maxWidth="container"
  margin="0"
  style={{ marginInline: 'auto' }}
>
  <article>Centered content</article>
</Box>

// Card-like box
<Box
  padding="lg"
  radius="md"
  as="article"
  styles={{
    '--box-bg': '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}
>
  <h2>Card Title</h2>
  <p>Card content</p>
</Box>

// Asymmetric spacing with logical properties
<Box
  paddingInline="xl"
  paddingBlock="md"
  as="section"
>
  <p>Wide horizontal padding, narrow vertical</p>
</Box>
```

---

### 2. Stack Component

**Purpose:** Simplified layout for vertical or horizontal spacing between children.

**TypeScript Props:**
```typescript
export interface StackProps extends Partial<ComponentProps> {
  /** Gap between children */
  gap?: SpacingScale;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Alignment on cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Alignment on main axis */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Allow wrapping */
  wrap?: 'wrap' | 'nowrap';
  /** Polymorphic element type */
  as?: StackElement;
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

export type StackElement =
  | 'div' | 'section' | 'article' | 'ul' | 'ol' | 'nav';
```

**CSS Variables:**
```scss
:root {
  // Reuses --spacing-* variables from Box
  --stack-gap: var(--spacing-md);
  --stack-gap-xs: var(--spacing-xs);
  --stack-gap-sm: var(--spacing-sm);
  --stack-gap-md: var(--spacing-md);
  --stack-gap-lg: var(--spacing-lg);
  --stack-gap-xl: var(--spacing-xl);
}
```

**Utility Classes:**
```scss
// Base stack
.stack {
  display: flex;
  flex-direction: column;
}

// Direction
.stack-vertical { flex-direction: column; }
.stack-horizontal { flex-direction: row; }

// Gap
.stack-gap-0 { gap: 0; }
.stack-gap-xs { gap: var(--stack-gap-xs); }
.stack-gap-sm { gap: var(--stack-gap-sm); }
.stack-gap-md { gap: var(--stack-gap-md); }
.stack-gap-lg { gap: var(--stack-gap-lg); }
.stack-gap-xl { gap: var(--stack-gap-xl); }

// Align (cross-axis)
.stack-align-start { align-items: flex-start; }
.stack-align-center { align-items: center; }
.stack-align-end { align-items: flex-end; }
.stack-align-stretch { align-items: stretch; }

// Justify (main-axis)
.stack-justify-start { justify-content: flex-start; }
.stack-justify-center { justify-content: center; }
.stack-justify-end { justify-content: flex-end; }
.stack-justify-between { justify-content: space-between; }

// Wrap
.stack-wrap { flex-wrap: wrap; }
.stack-nowrap { flex-wrap: nowrap; }
```

**Usage Examples:**
```tsx
// Vertical stack with medium gap (default)
<Stack gap="md">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Stack>

// Horizontal stack for button group
<Stack direction="horizontal" gap="sm">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>

// Centered vertical stack
<Stack
  gap="lg"
  align="center"
  justify="center"
  style={{ minHeight: '100vh' }}
>
  <Logo />
  <h1>Welcome</h1>
  <Button>Get Started</Button>
</Stack>

// Navigation with horizontal layout
<Stack
  as="nav"
  direction="horizontal"
  gap="md"
  justify="between"
  align="center"
>
  <Logo />
  <Stack direction="horizontal" gap="sm">
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </Stack>
</Stack>
```

---

### 3. Cluster Component

**Purpose:** Wrapping flex layout for inline groups with semantic naming.

**TypeScript Props:**
```typescript
export interface ClusterProps extends Partial<ComponentProps> {
  /** Gap between items */
  gap?: SpacingScale;
  /** Horizontal alignment */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Vertical alignment */
  align?: 'start' | 'center' | 'end' | 'baseline';
  /** Polymorphic element type */
  as?: ClusterElement;
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

export type ClusterElement =
  | 'div' | 'ul' | 'ol' | 'nav' | 'section';
```

**CSS Variables:**
```scss
:root {
  // Reuses --spacing-* variables
  --cluster-gap: var(--spacing-sm);
  --cluster-gap-xs: var(--spacing-xs);
  --cluster-gap-sm: var(--spacing-sm);
  --cluster-gap-md: var(--spacing-md);
  --cluster-gap-lg: var(--spacing-lg);
  --cluster-gap-xl: var(--spacing-xl);
}
```

**Utility Classes:**
```scss
// Base cluster
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap);
}

// Gap
.cluster-gap-0 { gap: 0; }
.cluster-gap-xs { gap: var(--cluster-gap-xs); }
.cluster-gap-sm { gap: var(--cluster-gap-sm); }
.cluster-gap-md { gap: var(--cluster-gap-md); }
.cluster-gap-lg { gap: var(--cluster-gap-lg); }
.cluster-gap-xl { gap: var(--cluster-gap-xl); }

// Justify
.cluster-justify-start { justify-content: flex-start; }
.cluster-justify-center { justify-content: center; }
.cluster-justify-end { justify-content: flex-end; }
.cluster-justify-between { justify-content: space-between; }

// Align
.cluster-align-start { align-items: flex-start; }
.cluster-align-center { align-items: center; }
.cluster-align-end { align-items: flex-end; }
.cluster-align-baseline { align-items: baseline; }
```

**Usage Examples:**
```tsx
// Tag cloud
<Cluster gap="sm" justify="center">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>CSS</Tag>
  <Tag>Accessibility</Tag>
  <Tag>Performance</Tag>
</Cluster>

// Button group with wrapping
<Cluster gap="md">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
  <Button>Action 4</Button>
</Cluster>

// Inline list navigation
<Cluster as="nav" gap="lg" justify="center" align="baseline">
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</Cluster>

// Badge cluster
<Cluster gap="xs">
  <Badge variant="success">Active</Badge>
  <Badge variant="info">New</Badge>
  <Badge variant="warning">Beta</Badge>
</Cluster>
```

---

### 4. Grid Component

**Purpose:** CSS Grid layout with responsive columns and compound sub-component.

**TypeScript Props:**
```typescript
export interface GridProps extends Partial<ComponentProps> {
  /** Number of columns */
  columns?: GridColumns;
  /** Gap between all grid items */
  gap?: SpacingScale;
  /** Gap between rows */
  rowGap?: SpacingScale;
  /** Gap between columns */
  columnGap?: SpacingScale;
  /** Responsive overrides for small screens (≥480px) */
  sm?: ResponsiveGridProps;
  /** Responsive overrides for medium screens (≥768px) */
  md?: ResponsiveGridProps;
  /** Responsive overrides for large screens (≥992px) */
  lg?: ResponsiveGridProps;
  /** Responsive overrides for extra large screens (≥1280px) */
  xl?: ResponsiveGridProps;
  /** Polymorphic element type */
  as?: GridElement;
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

export interface GridItemProps extends Partial<ComponentProps> {
  /** Number of columns to span */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Starting column position */
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Ending column position */
  end?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  /** Polymorphic element type */
  as?: 'div' | 'section' | 'article' | 'li';
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto';

export type ResponsiveGridProps = {
  columns?: GridColumns;
  gap?: SpacingScale;
  rowGap?: SpacingScale;
  columnGap?: SpacingScale;
};

export type GridElement =
  | 'div' | 'section' | 'article' | 'ul' | 'ol';
```

**CSS Variables:**
```scss
:root {
  // Reuses --spacing-* variables for gaps
  --grid-gap: var(--spacing-md);
  --grid-gap-xs: var(--spacing-xs);
  --grid-gap-sm: var(--spacing-sm);
  --grid-gap-md: var(--spacing-md);
  --grid-gap-lg: var(--spacing-lg);
  --grid-gap-xl: var(--spacing-xl);

  // Column counts
  --grid-columns: 1;
}
```

**Utility Classes:**
```scss
// Base grid
.grid {
  display: grid;
  gap: var(--grid-gap);
}

// Column layouts
.grid-columns-1 { grid-template-columns: repeat(1, 1fr); }
.grid-columns-2 { grid-template-columns: repeat(2, 1fr); }
.grid-columns-3 { grid-template-columns: repeat(3, 1fr); }
.grid-columns-4 { grid-template-columns: repeat(4, 1fr); }
.grid-columns-5 { grid-template-columns: repeat(5, 1fr); }
.grid-columns-6 { grid-template-columns: repeat(6, 1fr); }
.grid-columns-12 { grid-template-columns: repeat(12, 1fr); }
.grid-columns-auto { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }

// Gap utilities
.grid-gap-0 { gap: 0; }
.grid-gap-xs { gap: var(--grid-gap-xs); }
.grid-gap-sm { gap: var(--grid-gap-sm); }
.grid-gap-md { gap: var(--grid-gap-md); }
.grid-gap-lg { gap: var(--grid-gap-lg); }
.grid-gap-xl { gap: var(--grid-gap-xl); }

// Row gap
.grid-row-gap-xs { row-gap: var(--grid-gap-xs); }
.grid-row-gap-sm { row-gap: var(--grid-gap-sm); }
.grid-row-gap-md { row-gap: var(--grid-gap-md); }
.grid-row-gap-lg { row-gap: var(--grid-gap-lg); }
.grid-row-gap-xl { row-gap: var(--grid-gap-xl); }

// Column gap
.grid-column-gap-xs { column-gap: var(--grid-gap-xs); }
.grid-column-gap-sm { column-gap: var(--grid-gap-sm); }
.grid-column-gap-md { column-gap: var(--grid-gap-md); }
.grid-column-gap-lg { column-gap: var(--grid-gap-lg); }
.grid-column-gap-xl { column-gap: var(--grid-gap-xl); }

// Grid item span
.grid-item-span-1 { grid-column: span 1; }
.grid-item-span-2 { grid-column: span 2; }
.grid-item-span-3 { grid-column: span 3; }
.grid-item-span-4 { grid-column: span 4; }
.grid-item-span-5 { grid-column: span 5; }
.grid-item-span-6 { grid-column: span 6; }
.grid-item-span-7 { grid-column: span 7; }
.grid-item-span-8 { grid-column: span 8; }
.grid-item-span-9 { grid-column: span 9; }
.grid-item-span-10 { grid-column: span 10; }
.grid-item-span-11 { grid-column: span 11; }
.grid-item-span-12 { grid-column: span 12; }

// Grid item start position
.grid-item-start-1 { grid-column-start: 1; }
.grid-item-start-2 { grid-column-start: 2; }
// ... etc

// Responsive utilities (mobile-first)
@media (min-width: 30rem) { /* 480px - sm */
  .grid-sm-columns-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-sm-columns-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-sm-columns-3 { grid-template-columns: repeat(3, 1fr); }
  // ... etc
}

@media (min-width: 48rem) { /* 768px - md */
  .grid-md-columns-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-md-columns-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-md-columns-3 { grid-template-columns: repeat(3, 1fr); }
  // ... etc
}

@media (min-width: 62rem) { /* 992px - lg */
  .grid-lg-columns-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-lg-columns-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-lg-columns-3 { grid-template-columns: repeat(3, 1fr); }
  // ... etc
}

@media (min-width: 80rem) { /* 1280px - xl */
  .grid-xl-columns-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-xl-columns-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-xl-columns-3 { grid-template-columns: repeat(3, 1fr); }
  // ... etc
}
```

**Usage Examples:**
```tsx
// Basic 3-column grid
<Grid columns={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</Grid>

// Responsive grid (1 col mobile, 2 tablet, 3 desktop)
<Grid
  columns={1}
  gap="lg"
  sm={{ columns: 2 }}
  lg={{ columns: 3 }}
>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>

// Grid with spanning items
<Grid columns={12} gap="md">
  <Grid.Item span={12}>
    <Header />
  </Grid.Item>
  <Grid.Item span={3}>
    <Sidebar />
  </Grid.Item>
  <Grid.Item span={9}>
    <Main />
  </Grid.Item>
  <Grid.Item span={12}>
    <Footer />
  </Grid.Item>
</Grid>

// Auto-fit grid (responsive without breakpoints)
<Grid columns="auto" gap="lg">
  <ProductCard />
  <ProductCard />
  <ProductCard />
  <ProductCard />
</Grid>

// Asymmetric gaps
<Grid
  columns={3}
  rowGap="lg"
  columnGap="md"
>
  <Image />
  <Image />
  <Image />
</Grid>
```

---

## Implementation Phases

### Phase 0: Foundation Setup

**Goals:**
- Establish unified spacing system across all primitives
- Update global SCSS with shared CSS variables
- Create shared TypeScript types

**Tasks:**

1. **Update `src/sass/_globals.scss`**
   - Add unified spacing scale (reuse flex-gap pattern)
   - Add max-width scale for Box
   - Add border-radius scale for Box
   - Ensure all values use rem units

2. **Create `src/types/layout-primitives.ts`**
   - Define `SpacingScale` type
   - Define shared element types
   - Export for use across all layout components

3. **Verification:**
   - SCSS compiles without errors
   - TypeScript types resolve correctly
   - No breaking changes to existing components

**Estimated Time:** 30 minutes

---

### Phase 1: Box Component

**Goals:**
- Implement fundamental container primitive
- Establish utility class pattern for other primitives
- Comprehensive testing and documentation

**Tasks:**

1. **Create component directory:** `src/components/box/`

2. **Implement `box.types.ts`**
   - Define `BoxProps` interface
   - Define `BoxElement` type
   - Export all types

3. **Implement `box.tsx`**
   - Create component with `forwardRef`
   - Build on `UI` primitive (if suitable) or create standalone
   - Generate utility classes from props
   - Handle polymorphic `as` prop
   - Add comprehensive JSDoc comments
   - Default element: `div`

4. **Create `box.scss`**
   - Define all CSS custom properties
   - Create utility classes for padding, margin, width, max-width, radius
   - Use logical properties (padding-inline, padding-block)
   - All values in rem units

5. **Write `box.stories.tsx`**
   - Default story with basic usage
   - Variants: different padding/margin combinations
   - Variants: width and max-width examples
   - Variant: border radius examples
   - Variant: polymorphic rendering (div, section, article)
   - Variant: CSS custom property overrides
   - Play function: verify rendering, tab focus, accessibility
   - Import `box.scss` in stories

6. **Write `box.test.tsx`**
   - Test default rendering
   - Test all prop variants
   - Test polymorphic `as` prop
   - Test CSS class generation
   - Test ref forwarding
   - Test accessibility (semantic HTML)

7. **Create `README.mdx`**
   - Component overview and purpose
   - API reference (all props with descriptions)
   - Usage examples (basic, variants, composition)
   - Accessibility notes
   - Related components (Stack, Grid)

8. **Create `STYLES.mdx`**
   - All CSS custom properties with descriptions
   - Spacing scale reference
   - Max-width scale reference
   - Radius scale reference
   - Customization examples

9. **Export from `src/index.ts`**
   ```typescript
   export { Box } from './components/box/box';
   export type { BoxProps } from './components/box/box.types';
   ```

10. **Verification:**
    - `npm test` passes
    - `npm run build` succeeds
    - Storybook displays component correctly
    - All stories render without errors
    - Play tests pass
    - a11y addon shows no violations

**Estimated Time:** 3-4 hours

---

### Phase 2: Stack Component

**Goals:**
- Simplified vertical/horizontal layout primitive
- Complement Flex with simpler API for common pattern
- Maintain consistency with Box implementation

**Tasks:**

1. **Create component directory:** `src/components/stack/`

2. **Implement `stack.types.ts`**
   - Define `StackProps` interface
   - Define `StackElement` type
   - Reuse `SpacingScale` from layout-primitives types
   - Export all types

3. **Implement `stack.tsx`**
   - Create component with `forwardRef`
   - Build on flexbox display
   - Generate utility classes from props
   - Handle direction prop (default: vertical)
   - Handle polymorphic `as` prop
   - Add comprehensive JSDoc comments
   - Default element: `div`

4. **Create `stack.scss`**
   - Define CSS custom properties for gaps
   - Create utility classes for direction, gap, align, justify, wrap
   - Base class: `.stack { display: flex; flex-direction: column; }`
   - All values in rem units

5. **Write `stack.stories.tsx`**
   - Default story: vertical stack with medium gap
   - Variant: horizontal stack (button group)
   - Variant: different gap sizes
   - Variant: centered alignment (both axes)
   - Variant: space-between justification
   - Variant: wrapping horizontal stack
   - Variant: polymorphic rendering (nav, ul, section)
   - Play function: verify rendering, keyboard navigation
   - Import `stack.scss`

6. **Write `stack.test.tsx`**
   - Test default rendering (vertical)
   - Test horizontal direction
   - Test all gap sizes
   - Test align and justify props
   - Test wrap prop
   - Test polymorphic `as` prop
   - Test ref forwarding

7. **Create `README.mdx`**
   - Component overview and use cases
   - API reference
   - Usage examples (vertical, horizontal, nested)
   - Comparison with Flex component
   - Accessibility considerations

8. **Create `STYLES.mdx`**
   - CSS custom properties reference
   - Gap scale documentation
   - Customization examples

9. **Export from `src/index.ts`**
   ```typescript
   export { Stack } from './components/stack/stack';
   export type { StackProps } from './components/stack/stack.types';
   ```

10. **Verification:**
    - All tests pass
    - Build succeeds
    - Storybook renders correctly
    - Play tests pass
    - No a11y violations

**Estimated Time:** 3-4 hours

---

### Phase 3: Cluster Component

**Goals:**
- Wrapping flex primitive with semantic naming
- Simplified API for inline groups
- Consistency with Box and Stack

**Tasks:**

1. **Create component directory:** `src/components/cluster/`

2. **Implement `cluster.types.ts`**
   - Define `ClusterProps` interface
   - Define `ClusterElement` type
   - Reuse `SpacingScale`
   - Export all types

3. **Implement `cluster.tsx`**
   - Create component with `forwardRef`
   - Build on flexbox with wrap enabled
   - Generate utility classes from props
   - Handle polymorphic `as` prop
   - Add comprehensive JSDoc comments
   - Default element: `div`

4. **Create `cluster.scss`**
   - Define CSS custom properties
   - Base class: `.cluster { display: flex; flex-wrap: wrap; }`
   - Create utility classes for gap, justify, align
   - All values in rem units

5. **Write `cluster.stories.tsx`**
   - Default story: tag cloud
   - Variant: button group with wrapping
   - Variant: centered cluster
   - Variant: different gap sizes
   - Variant: baseline alignment for text
   - Variant: navigation links
   - Variant: badge cluster
   - Play function: verify rendering and wrapping behavior
   - Import `cluster.scss`

6. **Write `cluster.test.tsx`**
   - Test default rendering
   - Test all gap sizes
   - Test justify and align props
   - Test polymorphic `as` prop
   - Test ref forwarding
   - Test wrapping behavior (if possible)

7. **Create `README.mdx`**
   - Component overview and common use cases
   - API reference
   - Usage examples (tags, buttons, navigation)
   - When to use Cluster vs Flex vs Stack

8. **Create `STYLES.mdx`**
   - CSS custom properties reference
   - Gap customization
   - Examples with different content types

9. **Export from `src/index.ts`**
   ```typescript
   export { Cluster } from './components/cluster/cluster';
   export type { ClusterProps } from './components/cluster/cluster.types';
   ```

10. **Verification:**
    - All tests pass
    - Build succeeds
    - Storybook renders correctly
    - Play tests pass
    - No a11y violations

**Estimated Time:** 2-3 hours

---

### Phase 4: Grid Component

**Goals:**
- CSS Grid primitive with responsive columns
- Compound component with Grid.Item sub-component
- Most complex of the four primitives

**Tasks:**

1. **Create component directory:** `src/components/grid/`

2. **Implement `grid.types.ts`**
   - Define `GridProps` interface with responsive props
   - Define `GridItemProps` interface
   - Define `GridColumns` type
   - Define `ResponsiveGridProps` type
   - Define `GridElement` type
   - Reuse `SpacingScale`
   - Export all types

3. **Implement `grid.tsx`**
   - Create component with `forwardRef`
   - Build on CSS Grid display
   - Generate utility classes from props
   - Handle responsive breakpoint props (sm, md, lg, xl)
   - Handle polymorphic `as` prop
   - Add comprehensive JSDoc comments
   - Default element: `div`

4. **Implement `grid-item.tsx`**
   - Create sub-component with `forwardRef`
   - Handle span, start, end props
   - Generate utility classes for grid positioning
   - Handle polymorphic `as` prop
   - Add JSDoc comments
   - Default element: `div`

5. **Attach sub-component to Grid:**
   ```typescript
   Grid.Item = GridItem;
   export default Grid;
   ```

6. **Create `grid.scss`**
   - Define CSS custom properties
   - Base class: `.grid { display: grid; }`
   - Create utility classes for columns (1-12, auto)
   - Create utility classes for gaps
   - Create utility classes for Grid.Item (span, start, end)
   - Create responsive utility classes with media queries
   - Breakpoints: 30rem (sm), 48rem (md), 62rem (lg), 80rem (xl)
   - All values in rem units

7. **Write `grid.stories.tsx`**
   - Default story: basic 3-column grid
   - Variant: 2-column, 4-column, 6-column, 12-column
   - Variant: auto-fit responsive grid
   - Variant: responsive grid (mobile → tablet → desktop)
   - Variant: grid with spanning items (Grid.Item)
   - Variant: asymmetric gaps (row vs column)
   - Variant: 12-column layout system example
   - Play function: verify rendering and responsiveness
   - Import `grid.scss`

8. **Write `grid.test.tsx`**
   - Test default rendering
   - Test all column counts
   - Test gap props (gap, rowGap, columnGap)
   - Test responsive props (sm, md, lg, xl)
   - Test Grid.Item rendering
   - Test Grid.Item span/start/end props
   - Test polymorphic `as` prop on both Grid and Grid.Item
   - Test ref forwarding on both components
   - Test compound component pattern

9. **Create `README.mdx`**
   - Component overview
   - API reference for Grid and Grid.Item
   - Usage examples (basic grids, responsive, spanning)
   - 12-column layout system guide
   - Comparison with Flex component
   - Accessibility considerations

10. **Create `STYLES.mdx`**
    - CSS custom properties reference
    - Gap customization
    - Responsive breakpoints documentation
    - Custom column templates
    - Grid.Item positioning examples

11. **Export from `src/index.ts`**
    ```typescript
    export { default as Grid } from './components/grid/grid';
    export type { GridProps, GridItemProps } from './components/grid/grid.types';
    ```

12. **Verification:**
    - All tests pass (Grid and Grid.Item)
    - Build succeeds
    - Storybook renders correctly
    - Play tests pass
    - Responsive behavior works at all breakpoints
    - No a11y violations

**Estimated Time:** 4-5 hours

---

### Phase 5: Integration & Testing

**Goals:**
- Verify all components work together
- Test composition patterns
- Ensure package builds and exports correctly
- Full accessibility audit

**Tasks:**

1. **Integration Tests**
   - Test Box + Stack composition
   - Test Grid with Box items
   - Test Cluster with Box wrapper
   - Test all primitives with existing fpkit components

2. **Build Verification**
   - Run `npm run build` from fpkit directory
   - Verify all components exported correctly
   - Check build output for correct file structure
   - Verify types are generated

3. **Storybook Verification**
   - Start Storybook from root (`npm start`)
   - Navigate to each component
   - Verify all stories render
   - Run all play tests
   - Check for console errors

4. **Accessibility Audit**
   - Use Storybook a11y addon on all components
   - Verify no WCAG violations
   - Test keyboard navigation (Tab, Arrow keys, Enter, Space)
   - Verify focus indicators visible
   - Test with semantic HTML variations (as prop)

5. **Responsive Testing**
   - Test Grid responsive behavior at all breakpoints
   - Test fluid spacing (clamp() values) at various viewport sizes
   - Verify layout doesn't break at edge cases (320px, 1920px)

6. **Cross-Component Testing**
   - Create example compositions in Storybook
   - Test nested primitives (Stack inside Grid, Box inside Cluster, etc.)
   - Verify CSS custom property inheritance

7. **Documentation Review**
   - Review all README.mdx files for completeness
   - Review all STYLES.mdx files for accuracy
   - Verify JSDoc comments are comprehensive
   - Check for typos and formatting issues

8. **Performance Check**
   - Verify utility classes don't bloat CSS bundle excessively
   - Check for unnecessary duplicate CSS
   - Verify tree-shaking works (unused utilities not included)

**Estimated Time:** 2-3 hours

---

### Phase 6: Final Documentation & Polish

**Goals:**
- Complete documentation for all components
- Add usage guides for common patterns
- Prepare for release

**Tasks:**

1. **Update Main Documentation**
   - Update fpkit `README.md` with new components
   - Add layout primitives section
   - Document when to use each primitive

2. **Create Composition Guide** (optional)
   - Create Storybook MDX with composition patterns
   - Examples: Page layouts using primitives
   - Examples: Card grid with Box + Grid
   - Examples: Navigation using Stack + Cluster

3. **Update CHANGELOG.md**
   - Document new components
   - List breaking changes (if any)
   - Version bump decision

4. **Final Review**
   - Review all code for consistency
   - Check naming conventions
   - Verify all rem units (no px!)
   - Verify CSS variable naming follows standard

5. **Prepare Release Notes**
   - Feature highlights
   - Migration guide (if needed)
   - Examples and demos

**Estimated Time:** 1-2 hours

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

**Required Tests Per Component:**

1. **Rendering Tests**
   - Component renders with default props
   - Component renders with all prop variants
   - Component renders children correctly

2. **Prop Tests**
   - Each prop generates correct CSS classes
   - Spacing props work (padding, margin, gap)
   - Layout props work (direction, columns, align, justify)
   - Sizing props work (width, maxWidth, radius)
   - Polymorphic `as` prop renders correct element

3. **Type Safety Tests**
   - TypeScript types enforce correct prop values
   - Invalid props are caught at compile time

4. **Ref Forwarding Tests**
   - Ref forwarding works correctly
   - Forwarded ref points to correct DOM element

5. **Accessibility Tests**
   - Semantic HTML by default
   - ARIA attributes passed through correctly
   - Focus management works

**Test Example Pattern:**
```typescript
describe('Box', () => {
  it('renders with default props', () => {
    render(<Box>Content</Box>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies padding classes', () => {
    render(<Box padding="md" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('box-padding-md');
  });

  it('renders as different elements', () => {
    render(<Box as="section" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box.tagName).toBe('SECTION');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
```

---

### Storybook Play Tests

**Required Play Tests Per Component:**

1. **Visual Rendering**
   - Component renders in DOM
   - Correct element type
   - Children render correctly

2. **Keyboard Navigation**
   - Tab focus works (if interactive or contains focusables)
   - Focus indicators visible
   - Keyboard shortcuts work (if applicable)

3. **Interaction Tests** (if applicable)
   - Click handlers fire
   - State changes reflected visually

**Play Test Example Pattern:**
```typescript
export const BoxDefault: Story = {
  args: {
    padding: 'md',
    children: 'Box content',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Box renders correctly', async () => {
      const box = canvas.getByText('Box content');
      expect(box).toBeInTheDocument();
      expect(box).toHaveClass('box-padding-md');
    });

    await step('Box is accessible', async () => {
      const box = canvas.getByText('Box content');
      // Check for any a11y violations would be done by addon
      expect(box.tagName).toBe('DIV'); // semantic HTML
    });
  },
};
```

---

### Accessibility Testing

**Checklist Per Component:**

- [ ] Uses semantic HTML elements
- [ ] Supports polymorphic `as` prop for semantic flexibility
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible (rely on browser defaults or fpkit global styles)
- [ ] ARIA attributes supported via spread props
- [ ] No a11y violations in Storybook a11y addon
- [ ] Color contrast sufficient (if component adds colors)
- [ ] Responsive at 320px viewport (WCAG reflow requirement)

**Storybook a11y Addon:**
- Review Accessibility tab for each story
- Address all violations before release
- Document any "incomplete" checks that require manual testing

---

### Responsive Testing

**Grid Component Specific:**

Test at breakpoints:
- 320px (minimum - WCAG reflow)
- 375px (iPhone SE - nobreakpoint)
- 480px (sm breakpoint)
- 768px (md breakpoint)
- 992px (lg breakpoint)
- 1280px (xl breakpoint)
- 1920px (large desktop)

**Verify:**
- Responsive props apply correctly at each breakpoint
- Fluid spacing (clamp) scales appropriately
- No layout breaks or overflow issues
- Grid columns adjust as expected

---

## File Structure Overview

After implementation, the file structure will be:

```
packages/fpkit/src/
├── components/
│   ├── box/
│   │   ├── box.tsx
│   │   ├── box.types.ts
│   │   ├── box.scss
│   │   ├── box.stories.tsx
│   │   ├── box.test.tsx
│   │   ├── README.mdx
│   │   └── STYLES.mdx
│   ├── stack/
│   │   ├── stack.tsx
│   │   ├── stack.types.ts
│   │   ├── stack.scss
│   │   ├── stack.stories.tsx
│   │   ├── stack.test.tsx
│   │   ├── README.mdx
│   │   └── STYLES.mdx
│   ├── cluster/
│   │   ├── cluster.tsx
│   │   ├── cluster.types.ts
│   │   ├── cluster.scss
│   │   ├── cluster.stories.tsx
│   │   ├── cluster.test.tsx
│   │   ├── README.mdx
│   │   └── STYLES.mdx
│   └── grid/
│       ├── grid.tsx
│       ├── grid-item.tsx
│       ├── grid.types.ts
│       ├── grid.scss
│       ├── grid.stories.tsx
│       ├── grid.test.tsx
│       ├── README.mdx
│       └── STYLES.mdx
├── types/
│   └── layout-primitives.ts  # Shared types
├── sass/
│   └── _globals.scss  # Updated with spacing scale
└── index.ts  # Updated with exports
```

**Build Output:**
```
packages/fpkit/libs/
├── components/
│   ├── box/
│   │   └── box.css  # Compiled SCSS
│   ├── stack/
│   │   └── stack.css
│   ├── cluster/
│   │   └── cluster.css
│   └── grid/
│       └── grid.css
├── index.js  # ESM with Box, Stack, Cluster, Grid exports
├── index.cjs  # CJS
├── index.d.ts  # TypeScript types
└── index.css  # Main stylesheet (includes all components)
```

---

## Success Criteria

### Functional Requirements

✅ **Box Component:**
- Renders as polymorphic container
- Supports padding, margin, width, maxWidth, radius props
- All props generate correct utility classes
- CSS custom properties customizable
- Tests pass (unit + play)
- Documentation complete

✅ **Stack Component:**
- Renders as flex container with direction
- Supports gap, align, justify, wrap props
- Simpler API than Flex for common pattern
- Tests pass
- Documentation complete

✅ **Cluster Component:**
- Renders as wrapping flex container
- Supports gap, justify, align props
- Semantic naming for inline groups
- Tests pass
- Documentation complete

✅ **Grid Component:**
- Renders as CSS Grid container
- Supports columns, gap props
- Responsive breakpoint props work (sm, md, lg, xl)
- Grid.Item sub-component for spanning
- Tests pass
- Documentation complete

### Quality Requirements

✅ **Code Quality:**
- TypeScript strict mode compliance
- All components use forwardRef
- Comprehensive JSDoc comments
- Follows fpkit naming conventions
- ESLint passes with no errors

✅ **Styling:**
- All units in rem (no px!)
- CSS variables follow naming standard
- Utility classes generated correctly
- SCSS compiles without errors
- No CSS bloat (reasonable file sizes)

✅ **Testing:**
- 100% of components have unit tests
- All unit tests pass
- All Storybook play tests pass
- No console errors in Storybook
- Test coverage >80% (if tracked)

✅ **Accessibility:**
- No violations in a11y addon
- Semantic HTML by default
- Keyboard navigation works
- Focus indicators visible
- WCAG 2.1 Level AA compliant

✅ **Documentation:**
- README.mdx for each component
- STYLES.mdx for each component
- JSDoc on all public APIs
- Storybook stories cover all variants
- Usage examples provided

✅ **Build & Integration:**
- `npm run build` succeeds
- Package exports correctly (ESM + CJS)
- Types generated correctly
- No breaking changes to existing components
- Storybook starts without errors

---

## Potential Risks & Mitigations

### Risk: Redundancy with Flex Component

**Concern:** Stack overlaps significantly with Flex functionality.

**Mitigation:**
- Position Stack as simplified API for common pattern
- Document when to use Stack vs Flex
- Show in README.mdx that Stack is for simple vertical/horizontal spacing, Flex is for complex layouts
- Accept some redundancy for DX improvement

### Risk: CSS Bundle Size Increase

**Concern:** Utility classes for 4 components could bloat CSS bundle.

**Mitigation:**
- Use sensible defaults to minimize utility class count
- Rely on tree-shaking for unused utilities (if possible)
- Monitor bundle size during build
- Consider splitting component CSS into separate files for granular imports

### Risk: Breaking Changes to Existing Components

**Concern:** Adding global spacing variables might affect existing components.

**Mitigation:**
- Use namespaced variables (`--spacing-*` vs `--flex-gap-*`)
- Test existing components after global changes
- Run full test suite before and after
- Use distinct class names to avoid collisions

### Risk: Inconsistent API Across Primitives

**Concern:** Different props or patterns between Box, Stack, Cluster, Grid.

**Mitigation:**
- Reuse `SpacingScale` type across all components
- Consistent prop naming (gap, padding, margin)
- Follow same utility class generation pattern
- Review API consistency in Phase 5

### Risk: Accessibility Violations

**Concern:** Generic container components might encourage non-semantic usage.

**Mitigation:**
- Support polymorphic `as` prop for semantic flexibility
- Document semantic HTML best practices in README.mdx
- Provide examples with semantic elements (section, article, nav)
- Use a11y addon to catch violations

### Risk: Incomplete Responsive Support

**Concern:** Grid responsive props might not cover all use cases.

**Mitigation:**
- Support inline styles via `styles` prop for edge cases
- Document CSS custom property overrides
- Provide responsive utility classes as fallback
- Gather user feedback for future enhancements

---

## Timeline Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 0: Foundation | 0.5 hours | 0.5 hours |
| Phase 1: Box | 3-4 hours | 4-4.5 hours |
| Phase 2: Stack | 3-4 hours | 7-8.5 hours |
| Phase 3: Cluster | 2-3 hours | 9-11.5 hours |
| Phase 4: Grid | 4-5 hours | 13-16.5 hours |
| Phase 5: Integration & Testing | 2-3 hours | 15-19.5 hours |
| Phase 6: Documentation & Polish | 1-2 hours | 16-21.5 hours |

**Total Estimated Time:** 16-22 hours (2-3 full working days)

---

## Post-Implementation Tasks

### Immediate (Pre-Release)
- [ ] Run full test suite one final time
- [ ] Build package and verify exports
- [ ] Update package version (minor bump: 0.5.11 → 0.6.0)
- [ ] Update CHANGELOG.md
- [ ] Create git commit with all changes
- [ ] Review diff for any unintended changes

### Short-Term (Post-Release)
- [ ] Monitor for bug reports
- [ ] Gather user feedback on API
- [ ] Create example projects using primitives
- [ ] Write blog post or announcement
- [ ] Update Storybook deployed demo

### Long-Term (Future Enhancements)
- [ ] Consider adding more size scales if needed
- [ ] Evaluate responsive prop support for Box, Stack, Cluster
- [ ] Add more Grid.Item positioning props if requested
- [ ] Create preset composition components (e.g., PageLayout, CardGrid)
- [ ] Investigate performance optimizations for utility classes

---

## References

### Key Files to Reference During Implementation

**Component Examples:**
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/buttons/button.tsx`
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/cards/card.tsx`
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/flexbox/flex.tsx`

**Type Definitions:**
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/types/component-props.ts`
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/flexbox/flex.types.ts`

**Styling:**
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_globals.scss`
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/flexbox/flex.scss`

**Documentation:**
- `/Users/shawnsandy/devbox/acss/packages/fpkit/CLAUDE.md`
- `/Users/shawnsandy/devbox/acss/docs/css-variables.md`

**Configuration:**
- `/Users/shawnsandy/devbox/acss/packages/fpkit/tsconfig.json`
- `/Users/shawnsandy/devbox/acss/packages/fpkit/package.json`

### External Resources

- **CSS Custom Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **CSS Logical Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
- **CSS Grid:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- **Flexbox:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
- **Clamp():** https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **React forwardRef:** https://react.dev/reference/react/forwardRef
- **TypeScript Generics:** https://www.typescriptlang.org/docs/handbook/2/generics.html

---

## Notes for Implementation

### Design Decisions Made

1. **Separate Stack component** instead of Flex preset (user choice)
2. **All 4 components** will be implemented (user choice)
3. **Utility classes** approach for consistency with Flex (user choice)
4. **Unified spacing scale** reusing flex-gap clamp() pattern
5. **Logical properties** (padding-inline, margin-block) for internationalization
6. **Compound component** pattern for Grid.Item (following Card pattern)
7. **Polymorphic `as` prop** for semantic flexibility
8. **rem units only** (no px) per fpkit standards

### Important Patterns to Follow

- Always use `forwardRef` for ref forwarding
- Import component SCSS in stories file
- Add comprehensive JSDoc comments
- Use `ComponentProps` as base (but not including `ref`)
- Generate utility classes from props (don't use inline styles for layout)
- Default to `div` element, support semantic elements via `as` prop
- Use play tests for interaction testing in Storybook
- Create both README.mdx and STYLES.mdx for each component

### Common Pitfalls to Avoid

- ❌ Don't use px units (use rem!)
- ❌ Don't forget to import SCSS in stories
- ❌ Don't skip JSDoc comments
- ❌ Don't forget to export from `src/index.ts`
- ❌ Don't create CSS variables with non-standard names
- ❌ Don't use Tailwind utility naming (no `p-4`, use `box-padding-md`)
- ❌ Don't forget ref forwarding tests
- ❌ Don't skip accessibility testing with a11y addon
- ❌ Don't use absolute units in media queries (use rem: 30rem not 480px)

---

**End of Implementation Plan**
