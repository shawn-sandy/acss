# Flex Column Implementation Plan

## Overview

Add a flex column feature that uses `flex-grow: 1` to fill remaining space after fixed-width columns, different from `.col-auto` which sizes to content and can push other columns.

**API**: `<Col span="flex" />` - special value in existing span prop
**Responsive**: Desktop only (48rem+), mobile stacks to 100% like other columns
**Behavior**: Multiple flex columns share remaining space equally

## Implementation Steps

### 1. Add CSS Utility Class

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/sass/_columns.scss`
**Location**: After `.col-auto` (line 244)

```scss
/* Optional: Flex-Grow Columns */
/**
 * .col-flex provides a column that grows to fill remaining space.
 * Different from .col-auto (content-based) - this uses flex-grow.
 */
.col-flex {
  /* Mobile: Stack like all columns */
  flex: 0 0 100%;
  min-width: 0; /* Prevent content overflow */
  box-sizing: border-box;
}

/* Desktop: Grow to fill available space */
@media (width >= 48rem) {
  .col-flex {
    flex: 1 1 0%; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  }
}
```

**Key Details**:
- Mobile: `flex: 0 0 100%` (stacks like other columns)
- Desktop: `flex: 1 1 0%` (grows to fill space)
- `flex-basis: 0%` ensures equal distribution when multiple flex columns exist
- Follows same responsive pattern as numbered columns

### 2. Update TypeScript Type

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/types/layout-primitives.ts`
**Line**: 63

**Change**:
```typescript
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "flex";
```

**Add JSDoc**:
```typescript
/**
 * Column span values (1-12 columns) or "flex" for flex-grow behavior
 *
 * - Numeric values (1-12): Fixed fractional widths on desktop
 * - "flex": Grows to fill remaining space on desktop (flex: 1 1 0%)
 *
 * All columns stack to 100% width on mobile (< 48rem / 768px)
 */
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "flex";
```

### 3. Update Col Component Logic

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/col/col.tsx`
**Lines**: 73-78

**Change from**:
```typescript
// Auto takes precedence over span
if (auto) {
  utilityClasses.push("col-auto");
} else if (span) {
  utilityClasses.push(`col-${span}`);
}
```

**To**:
```typescript
// Auto takes precedence over span
if (auto) {
  utilityClasses.push("col-auto");
} else if (span === "flex") {
  utilityClasses.push("col-flex");
} else if (span) {
  utilityClasses.push(`col-${span}`);
}
```

**Precedence**: auto > span="flex" > span={number}

### 4. Update Component Props Documentation

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/col/col.types.ts`
**Lines**: 29-35

**Update JSDoc**:
```typescript
/**
 * Column span (1-12 or "flex")
 *
 * - Numeric values (1-12): Maps to .col-{span} utility class (fixed width)
 * - "flex": Maps to .col-flex utility class (grows to fill space)
 *
 * Ignored if auto is true (auto takes precedence)
 *
 * @default undefined
 *
 * @example
 * // Fixed width column
 * <Col span={6}>50% width on desktop</Col>
 *
 * @example
 * // Flex column fills remaining space
 * <Col span="flex">Grows to fill available space</Col>
 */
span?: ColumnSpan;
```

### 5. Add Unit Tests

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/col/col.test.tsx`
**Location**: After "Auto Width" tests (after line 112)

**Add test suite**:
```typescript
describe("Flex Column", () => {
  it("applies col-flex utility class when span is 'flex'", () => {
    const { container } = render(<Col span="flex">Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col).toHaveClass("col-flex");
  });

  it("does not apply numeric col class when span is 'flex'", () => {
    const { container } = render(<Col span="flex">Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col.className).not.toMatch(/col-\d+/);
  });

  it("auto overrides flex when both provided", () => {
    const { container } = render(<Col auto span="flex">Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col).toHaveClass("col-auto");
    expect(col).not.toHaveClass("col-flex");
  });

  it("flex column works with offset", () => {
    const { container } = render(<Col span="flex" offset={2}>Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col).toHaveClass("col-flex");
    expect(col).toHaveClass("col-offset-2");
  });

  it("flex column works with order", () => {
    const { container } = render(<Col span="flex" order="first">Content</Col>);
    const col = container.firstChild as HTMLElement;
    expect(col).toHaveClass("col-flex");
    expect(col).toHaveClass("col-order-first");
  });

  it("flex column works with combined props", () => {
    const { container } = render(
      <Col span="flex" offset={1} order={2}>Content</Col>
    );
    const col = container.firstChild as HTMLElement;
    expect(col).toHaveClass("col-flex");
    expect(col).toHaveClass("col-offset-1");
    expect(col).toHaveClass("col-order-2");
  });
});
```

**Test coverage**: 6 tests covering basic usage, precedence, integration with offset/order

### 6. Add Storybook Stories

**File**: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/col/col.stories.tsx`
**Location**: Add after existing stories

**Add stories**:
```typescript
/**
 * Flex Column - Demonstrates flex-grow behavior to fill remaining space
 */
export const FlexColumn: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Flex vs Auto comparison */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Flex vs Auto Comparison</h3>
        <Row>
          <Col span={3} style={colStyle}>Fixed (25%)</Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7" }}>
            Flex (grows to fill 75%)
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col span={3} style={colStyle}>Fixed (25%)</Col>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>
            Auto (sizes to content)
          </Col>
        </Row>
      </div>

      {/* Multiple flex columns */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Multiple Flex Columns</h3>
        <Row>
          <Col span={2} style={colStyle}>Fixed col-2</Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7" }}>Flex 1</Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7" }}>Flex 2</Col>
        </Row>
      </div>

      {/* Flex with auto */}
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Flex + Auto</h3>
        <Row>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>Button</Col>
          <Col span="flex" style={{ ...colStyle, background: "#fef3c7" }}>Main</Col>
          <Col auto style={{ ...colStyle, background: "#e0e7ff" }}>Icon</Col>
        </Row>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Flex classes are applied correctly", async () => {
      const flexElements = canvasElement.querySelectorAll(".col-flex");
      expect(flexElements.length).toBeGreaterThan(0);
    });
  },
  parameters: {
    docs: {
      description: {
        story: "Flex columns use flex-grow: 1 to fill remaining space. Multiple flex columns share equally. Mobile: all columns stack to 100%.",
      },
    },
  },
};
```

**Story highlights**:
- Visual comparison of flex vs auto behavior
- Multiple flex columns demonstration
- Common layout patterns
- Play function for automated testing

## Key Differences: Auto vs Flex

| Feature | `auto` | `span="flex"` |
|---------|--------|---------------|
| **CSS** | `flex: 0 0 auto` | `flex: 1 1 0%` |
| **Behavior** | Sizes to content width | Grows to fill space |
| **Use case** | Buttons, labels, icons | Main content areas |
| **Mobile** | Content-based | 100% width (stacked) |
| **Desktop** | Content-based | Fills remaining space |

## Build & Verification

After implementation:

```bash
# From fpkit package
cd /Users/shawnsandy/devbox/acss/packages/fpkit

# Run tests
npm test -- col.test.tsx

# Build package
npm run build

# Verify compiled CSS includes .col-flex
cat libs/index.css | grep "col-flex"

# Start Storybook (from root)
cd /Users/shawnsandy/devbox/acss
npm start
# Navigate to FP.React Components/Layout/Col
# Verify "Flex Column" story appears
```

## Files Modified

1. **`packages/fpkit/src/sass/_columns.scss`** - Add `.col-flex` utility (~15 lines)
2. **`packages/fpkit/src/types/layout-primitives.ts`** - Extend `ColumnSpan` type (~3 lines)
3. **`packages/fpkit/src/components/col/col.tsx`** - Update class logic (~3 lines)
4. **`packages/fpkit/src/components/col/col.types.ts`** - Update JSDoc (~10 lines)
5. **`packages/fpkit/src/components/col/col.test.tsx`** - Add test suite (~35 lines)
6. **`packages/fpkit/src/components/col/col.stories.tsx`** - Add stories (~60 lines)

**Total**: 6 files, ~126 lines of changes

## Example Usage After Implementation

```tsx
// Sidebar layout - flex fills remaining space
<Row>
  <Col span={3}>Sidebar (25%)</Col>
  <Col span="flex">Main Content (grows to fill 75%)</Col>
</Row>

// Multiple flex columns share equally
<Row>
  <Col span={2}>Fixed</Col>
  <Col span="flex">Flex 1 (50% of remaining)</Col>
  <Col span="flex">Flex 2 (50% of remaining)</Col>
</Row>

// Button group with spacer
<Row align="center">
  <Col auto><Button>Save</Button></Col>
  <Col span="flex">{/* Spacer */}</Col>
  <Col auto><Button>Cancel</Button></Col>
</Row>

// Works with offset and order
<Row>
  <Col span="flex" offset={2} order="last">Flexible + positioned</Col>
  <Col span={4}>Fixed width</Col>
</Row>
```
