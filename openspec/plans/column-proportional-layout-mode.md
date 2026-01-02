# Column System: Add Proportional Layout Mode

## Problem Summary

The 12-column utility system currently uses mobile-first responsive design where columns stack at 100% width below 768px viewport. This is viewport-based, not container-based, causing columns to wrap even on tablets when the parent container is large enough to accommodate them.

**User Request:** Columns should maintain their proportional layout on tablets and larger screens, with wrapping only occurring on mobile phones (< 480px) where stacking is necessary for readability.

## Solution Approach

Implement an **opt-in proportional mode** that keeps the current mobile-first responsive stacking as the default but allows developers to disable it for specific layouts. This will be controlled via:

1. **CSS utility class:** `.col-row-proportional`
2. **Row component prop:** `alwaysProportional` (boolean)

## Critical Files

- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_columns.scss` - Add proportional layout utility class
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/row/row.tsx` - Add component prop
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/row/row.types.ts` - Update TypeScript interface
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/row/row.stories.tsx` - Add story examples
- `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/row/row.test.tsx` - Add tests

## Implementation Steps

### 1. Add CSS Proportional Layout Utility

**File:** `_columns.scss`

Add a new utility class that applies proportional column widths starting from small tablets (30rem/480px) and above:

```scss
/* Proportional layout mode - columns maintain proportional width on tablets and larger
   Wrapping still occurs on mobile phones (< 30rem / 480px) */
@media (width >= 30rem) {
  .col-row-proportional {
    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6,
    .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
      flex: 0 0 auto; /* Allow proportional sizing */
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

**Location:** Add after the existing responsive media query (after line 78)

**Key Details:**
- Wraps in media query `@media (width >= 30rem)` (480px - small tablet breakpoint)
- Scopes the proportional widths to children of `.col-row-proportional`
- Overrides the mobile-first `flex: 0 0 100%` behavior on tablets and larger
- Uses existing `--col-*` CSS custom properties
- **Mobile phones (< 480px):** Columns still stack at 100% width
- **Tablets & larger (≥ 480px):** Columns maintain proportional layout

### 2. Update Row Component TypeScript Interface

**File:** `row.types.ts`

Add the new prop to the `RowProps` interface:

```typescript
export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  // ... existing props ...

  /**
   * When true, columns maintain their proportional layout on tablets and larger
   * instead of stacking to 100% width on all mobile devices (< 768px).
   *
   * Wrapping behavior with this prop:
   * - Mobile phones (< 480px): Columns still stack at 100% width
   * - Tablets & larger (≥ 480px): Columns maintain proportional layout
   *
   * Use this when you want columns to stay side-by-side on tablets and desktops
   * but still provide mobile-friendly stacking on phones.
   *
   * @default false
   * @example
   * <Row alwaysProportional>
   *   <Col span={6}>Column 1</Col>
   *   <Col span={6}>Column 2</Col>
   * </Row>
   */
  alwaysProportional?: boolean;
}
```

**Location:** Add after the existing props (around line 30-40)

### 3. Update Row Component Implementation

**File:** `row.tsx`

Modify the component to:
1. Destructure the new `alwaysProportional` prop
2. Conditionally add the `.col-row-proportional` class
3. Update JSDoc

**Changes:**

```typescript
export const Row = ({
  as = 'div',
  gap,
  justify,
  align,
  wrap,
  alwaysProportional = false, // Add this
  className,
  classes,
  children,
  ...props
}: RowProps) => {
  const Element = as as React.ElementType;

  const rowClasses = cn(
    'col-row',
    gap && `col-row-gap-${gap}`,
    justify && `col-row-justify-${justify}`,
    align && `col-row-align-${align}`,
    wrap && `col-row-${wrap}`,
    alwaysProportional && 'col-row-proportional', // Add this
    className,
    classes
  );

  return (
    <Element className={rowClasses} {...props}>
      {children}
    </Element>
  );
};
```

**Location:** Modify the destructuring (around line 15-25) and className composition (around line 27-35)

### 4. Add Storybook Story Examples

**File:** `row.stories.tsx`

Add new stories demonstrating the proportional layout behavior:

```typescript
/**
 * Demonstrates responsive stacking (default behavior)
 * Below 768px, columns stack vertically at 100% width
 */
export const ResponsiveStacking: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Col span={6}>
          <div style={{ padding: '1rem', background: '#e0e7ff', borderRadius: '0.25rem' }}>
            Column 1 (col-6)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '0.25rem' }}>
            Column 2 (col-6)
          </div>
        </Col>
      </>
    ),
  },
};

/**
 * Demonstrates proportional layout on tablets and larger
 * Columns stack on phones (< 480px) but maintain 50/50 split on tablets+ (≥ 480px)
 */
export const AlwaysProportional: Story = {
  args: {
    alwaysProportional: true,
    gap: 'md',
    children: (
      <>
        <Col span={6}>
          <div style={{ padding: '1rem', background: '#e0e7ff', borderRadius: '0.25rem' }}>
            Column 1 (50% on tablets+)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '0.25rem' }}>
            Column 2 (50% on tablets+)
          </div>
        </Col>
      </>
    ),
  },
};

/**
 * Three-column layout that stays proportional at all sizes
 */
export const ThreeColumnsProportional: Story = {
  args: {
    alwaysProportional: true,
    gap: 'sm',
    children: (
      <>
        <Col span={4}>
          <div style={{ padding: '1rem', background: '#e0e7ff', borderRadius: '0.25rem' }}>
            33.33%
          </div>
        </Col>
        <Col span={4}>
          <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '0.25rem' }}>
            33.33%
          </div>
        </Col>
        <Col span={4}>
          <div style={{ padding: '1rem', background: '#fce7f3', borderRadius: '0.25rem' }}>
            33.33%
          </div>
        </Col>
      </>
    ),
  },
};
```

**Location:** Add after existing stories (before the export default)

### 5. Add Component Tests

**File:** `row.test.tsx`

Add tests for the new functionality:

```typescript
describe('Row - Proportional Layout', () => {
  it('applies col-row-proportional class when alwaysProportional is true', () => {
    render(
      <Row alwaysProportional data-testid="row">
        <Col span={6}>Column 1</Col>
        <Col span={6}>Column 2</Col>
      </Row>
    );

    const row = screen.getByTestId('row');
    expect(row).toHaveClass('col-row-proportional');
  });

  it('does not apply col-row-proportional class by default', () => {
    render(
      <Row data-testid="row">
        <Col span={6}>Column 1</Col>
        <Col span={6}>Column 2</Col>
      </Row>
    );

    const row = screen.getByTestId('row');
    expect(row).not.toHaveClass('col-row-proportional');
  });

  it('combines alwaysProportional with other row utilities', () => {
    render(
      <Row
        alwaysProportional
        gap="lg"
        justify="center"
        data-testid="row"
      >
        <Col span={4}>Column</Col>
      </Row>
    );

    const row = screen.getByTestId('row');
    expect(row).toHaveClass('col-row-proportional');
    expect(row).toHaveClass('col-row-gap-lg');
    expect(row).toHaveClass('col-row-justify-center');
  });
});
```

**Location:** Add new describe block in the test file (after existing tests)

### 6. Build and Verify

Run the following commands to ensure everything works:

```bash
# From packages/fpkit/
npm run build:sass      # Compile SCSS with new utility class
npm test                # Verify tests pass
npm run lint-fix        # Fix any linting issues

# From root
npm start               # Launch Storybook to visually verify
```

**Verification Steps:**
1. Check Storybook stories render correctly
2. Resize browser to verify proportional mode works at all sizes
3. Verify default behavior still stacks columns on mobile
4. Run tests to ensure no regressions

## Expected Behavior After Implementation

### Default Responsive Stacking (Unchanged)

```tsx
<Row>
  <Col span={6}>Column 1</Col>
  <Col span={6}>Column 2</Col>
</Row>
```

- **Desktop (≥ 768px):** Two columns side-by-side (50% each)
- **Mobile (< 768px):** Columns stack vertically (100% each)

### Proportional Layout Mode (New)

```tsx
<Row alwaysProportional>
  <Col span={6}>Column 1</Col>
  <Col span={6}>Column 2</Col>
</Row>
```

- **Mobile phones (< 480px):** Columns stack vertically (100% each) - same as default
- **Tablets (≥ 480px, < 768px):** Two columns side-by-side (50% each) - proportional
- **Desktop (≥ 768px):** Two columns side-by-side (50% each) - proportional
- Columns scale down proportionally on tablets and larger

### CSS-Only Usage (New)

```html
<div class="col-row col-row-proportional">
  <div class="col-6">Column 1</div>
  <div class="col-6">Column 2</div>
</div>
```

Same proportional behavior for vanilla HTML/CSS usage.

## Design Rationale

**Why opt-in instead of changing the default:**
- Preserves mobile-first accessibility for existing implementations
- Allows fine-grained control per layout
- Maintains backward compatibility with existing code

**Mobile breakpoint choice (30rem / 480px):**
- Below this: True mobile phones (iPhone SE: 375px, standard phones: 360-428px)
- Above this: Tablets and larger screens have enough width for multi-column layouts
- Prevents cramped, unreadable columns on phones while maintaining layout on tablets

**Naming Choice:** `alwaysProportional` clearly communicates the behavior - columns maintain their proportional widths on tablets and larger.

**CSS Approach:** Using a scoped selector inside a media query (`.col-row-proportional .col-*`) ensures the override only affects direct children on appropriate screen sizes and doesn't conflict with nested column systems.

## Accessibility Considerations

- **Default stacking is more accessible** for mobile users (easier to read stacked content)
- **Proportional mode** should be used when content truly benefits from side-by-side layout at all sizes
- Developers should test with actual content to ensure text remains readable when columns shrink

## Browser Support

- Works in all modern browsers (IE11+ with flex support)
- CSS custom properties already used throughout the column system
- No new CSS features required
