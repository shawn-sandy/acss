# Implementation Plan: Add Size Prop to Checkbox Component

## Overview

Add a semantic `size` prop to the Checkbox component to provide a cleaner developer experience for changing checkbox sizes, while maintaining CSS variable override capability for custom sizes.

**Current State:**
- Checkbox sizes are controlled via inline `styles` prop with CSS variables (`--checkbox-size`)
- CheckboxCustomSize story demonstrates 4 sizes using CSS variable overrides
- Size tokens already defined in form.scss: `--checkbox-size-sm`, `--checkbox-size-md`, `--checkbox-size-lg`

**Target State:**
- Add `size?: 'xs' | 'sm' | 'md' | 'lg'` prop to CheckboxProps interface
- Map size prop to CSS variable via `data-checkbox-size` attribute
- Maintain backward compatibility: keep `styles` prop for custom size overrides
- Default size: `md` (1.25rem) - no breaking change
- Update CheckboxCustomSize story to use new size prop

## Design Decisions

1. **Size Naming:** Extended variant with `xs`, `sm`, `md`, `lg` (matches Button pattern + extra small)
2. **Implementation Method:** Data attribute pattern (`data-checkbox-size`) + SCSS attribute selectors
3. **Flexibility:** Both size prop (semantic) and styles prop (custom values) supported
4. **Default:** `md` (1.25rem) maintains current behavior

## Files to Modify

### 1. **`packages/fpkit/src/components/form/checkbox.tsx`**
   - Add `size?: 'xs' | 'sm' | 'md' | 'lg'` to CheckboxProps interface
   - Add JSDoc documentation for size prop with examples
   - Map size prop to `data-checkbox-size` attribute on wrapper div
   - Pass through to wrapper div's data attribute

### 2. **`packages/fpkit/src/components/form/checkbox.scss`**
   - Add size variant selectors using `&[data-checkbox-size]` pattern
   - Map each size to corresponding CSS variable token
   - Pattern: `div:has(> input[type="checkbox"])[data-checkbox-size~="sm"]`

### 3. **`packages/fpkit/src/components/form/form.scss`**
   - Add `--checkbox-size-xs: 0.875rem` token (14px - new extra small)
   - Verify existing tokens: `--checkbox-size-sm` (1rem), `--checkbox-size-md` (1.25rem), `--checkbox-size-lg` (1.5rem)
   - Add corresponding gap tokens for each size to maintain proper spacing

### 4. **`packages/fpkit/src/components/form/input.stories.tsx`**
   - Update CheckboxCustomSize story to demonstrate new size prop
   - Show all 4 size variants (xs, sm, md, lg) using prop instead of styles
   - Add separate story showing CSS variable override still works
   - Add play function to verify size prop applies correct data attribute

## Implementation Steps

### Phase 1: TypeScript Type Definition

**File:** `checkbox.tsx`

1. Add size prop to CheckboxProps interface:
```typescript
export interface CheckboxProps extends Omit<InputProps, ...> {
  // ... existing props

  /**
   * Predefined size variant for the checkbox.
   * Maps to standardized size tokens for consistent sizing across the design system.
   *
   * Available sizes:
   * - `xs`: Extra small (0.875rem / 14px) - Compact forms, tight spaces
   * - `sm`: Small (1rem / 16px) - Dense layouts
   * - `md`: Medium (1.25rem / 20px) - Default, optimal for most use cases
   * - `lg`: Large (1.5rem / 24px) - Touch-friendly, prominent CTAs
   *
   * For custom sizes beyond these presets, use the `styles` prop:
   * ```tsx
   * styles={{ '--checkbox-size': '2rem' }}
   * ```
   *
   * @default 'md'
   * @example
   * ```tsx
   * <Checkbox id="small" label="Small checkbox" size="sm" />
   * <Checkbox id="large" label="Large checkbox" size="lg" />
   * ```
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  // ... rest of existing props
}
```

### Phase 2: Component Logic

**File:** `checkbox.tsx`

2. Extract size prop from props and apply to wrapper div:
```typescript
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id, label, checked, defaultChecked, value = "on",
    onChange, classes, inputClasses, styles,
    size,  // <-- Add size prop extraction
    name, disabled, required, validationState,
    errorMessage, hintText, onBlur, onFocus, autoFocus,
    ...props
  }, ref) => {
    // ... existing hooks

    return (
      <div
        className={classes}
        style={styles}
        data-checkbox-size={size}  // <-- Map size to data attribute
      >
        {/* ... rest of component */}
      </div>
    );
  }
);
```

### Phase 3: SCSS Size Variants

**File:** `form.scss`

3. Add extra-small token:
```scss
:root {
  // Add new xs size token
  --checkbox-size-xs: 0.875rem;  /* 14px - extra small */

  // Existing tokens (verify these exist):
  --checkbox-size-sm: 1rem;      /* 16px */
  --checkbox-size-md: 1.25rem;   /* 20px */
  --checkbox-size-lg: 1.5rem;    /* 24px */

  // Add gap tokens for each size (optional but recommended)
  --checkbox-gap-xs: 0.375rem;   /* 6px */
  --checkbox-gap-sm: 0.5rem;     /* 8px */
  --checkbox-gap-md: 0.5rem;     /* 8px - default */
  --checkbox-gap-lg: 0.625rem;   /* 10px */
}
```

**File:** `checkbox.scss`

4. Add size variant selectors at the end of the file:
```scss
// Size variant selectors - Applied via data-checkbox-size attribute
// Uses :has() selector to target wrapper div containing checkbox input
div:has(> input[type="checkbox"]) {
  // ... existing base styles

  // Extra Small variant
  &[data-checkbox-size~="xs"] {
    --checkbox-size: var(--checkbox-size-xs);
    --checkbox-gap: var(--checkbox-gap-xs, 0.375rem);
  }

  // Small variant
  &[data-checkbox-size~="sm"] {
    --checkbox-size: var(--checkbox-size-sm);
    --checkbox-gap: var(--checkbox-gap-sm, 0.5rem);
  }

  // Medium variant (default - no attribute needed)
  &[data-checkbox-size~="md"] {
    --checkbox-size: var(--checkbox-size-md);
    --checkbox-gap: var(--checkbox-gap-md, 0.5rem);
  }

  // Large variant
  &[data-checkbox-size~="lg"] {
    --checkbox-size: var(--checkbox-size-lg);
    --checkbox-gap: var(--checkbox-gap-lg, 0.625rem);
  }
}
```

### Phase 4: Update Stories

**File:** `input.stories.tsx`

5. Replace CheckboxCustomSize story to use size prop:
```typescript
/**
 * CheckboxCustomSize - Predefined size variants using size prop
 *
 * Demonstrates semantic size prop for common size variants.
 * For custom sizes, see CheckboxCustomSizeCSSOverride story.
 */
export const CheckboxCustomSize: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexDirection: "column" }}>
      <CheckboxComponent
        id="xs"
        label="Extra Small (0.875rem / 14px)"
        size="xs"
      />
      <CheckboxComponent
        id="sm"
        label="Small (1rem / 16px)"
        size="sm"
      />
      <CheckboxComponent
        id="md"
        label="Medium (1.25rem / 20px) - Default"
        size="md"
      />
      <CheckboxComponent
        id="lg"
        label="Large (1.5rem / 24px)"
        size="lg"
      />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("XS checkbox has correct data attribute", async () => {
      const wrapper = canvas.getByRole("checkbox", { name: /Extra Small/ }).closest('div');
      expect(wrapper).toHaveAttribute("data-checkbox-size", "xs");
    });

    await step("LG checkbox has correct data attribute", async () => {
      const wrapper = canvas.getByRole("checkbox", { name: /Large/ }).closest('div');
      expect(wrapper).toHaveAttribute("data-checkbox-size", "lg");
    });

    await step("All checkboxes are functional", async () => {
      const xsCheckbox = canvas.getByRole("checkbox", { name: /Extra Small/ });
      await userEvent.click(xsCheckbox);
      expect(xsCheckbox).toBeChecked();
    });
  },
};

/**
 * CheckboxCustomSizeCSSOverride - Custom sizes via CSS variables
 *
 * Demonstrates that CSS variable overrides still work for custom sizes
 * beyond the predefined xs/sm/md/lg variants.
 */
export const CheckboxCustomSizeCSSOverride: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexDirection: "column" }}>
      <CheckboxComponent
        id="custom-tiny"
        label="Custom Tiny (0.75rem)"
        styles={{
          "--checkbox-size": "0.75rem",
          "--checkbox-gap": "0.375rem",
        } as React.CSSProperties}
      />
      <CheckboxComponent
        id="custom-huge"
        label="Custom Huge (2.5rem)"
        styles={{
          "--checkbox-size": "2.5rem",
          "--checkbox-gap": "1rem",
        } as React.CSSProperties}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
For sizes outside the predefined variants, use the \`styles\` prop to override CSS variables directly.
This provides maximum flexibility while keeping the API clean for common cases.
        `,
      },
    },
  },
};
```

### Phase 5: Build & Test

6. Rebuild SCSS:
```bash
cd packages/fpkit
npm run sass:build
```

7. Start Storybook to verify visually:
```bash
cd /Users/shawnsandy/devbox/acss
npm start
```

8. Run tests to ensure no regressions:
```bash
cd packages/fpkit
npm test
```

## CSS Variable Naming Compliance

All new CSS variables follow the standardized naming convention from `docs/css-variables.md`:

**Pattern:** `--{component}-{element}-{variant}-{property}-{modifier}`

**Variables Added:**
- `--checkbox-size-xs`: Size token (approved abbreviation: `xs`)
- `--checkbox-gap-xs`, `--checkbox-gap-sm`, `--checkbox-gap-md`, `--checkbox-gap-lg`: Gap tokens
- Uses full word `gap` (approved abbreviation per docs)

**Data Attribute:** `data-checkbox-size` (follows Button pattern with `data-btn`)

## Backward Compatibility

✅ **No Breaking Changes:**
- Default behavior unchanged (md size = 1.25rem)
- Existing `styles` prop still works for custom overrides
- All existing CheckboxWrapper stories continue to work
- Adding new optional prop doesn't affect existing usage

## Key Benefits

1. **Cleaner API:** `<Checkbox size="lg" ... />` vs `styles={{ '--checkbox-size': '1.5rem' }}`
2. **Type Safety:** TypeScript autocomplete for size variants
3. **Consistency:** Follows Button component data-attribute pattern
4. **Flexibility:** Both semantic sizes AND custom CSS overrides supported
5. **Design System Integration:** Maps to standardized size tokens
6. **Documentation:** JSDoc comments explain each size's use case

## Verification Plan

### Manual Testing in Storybook

1. **Navigate to CheckboxCustomSize story:**
   - Verify 4 checkboxes render (xs, sm, md, lg)
   - Visually confirm sizes increase progressively
   - Verify gaps are appropriate for each size

2. **Navigate to CheckboxCustomSizeCSSOverride story:**
   - Verify custom sizes via `styles` prop still work
   - Confirm CSS overrides take precedence over size prop

3. **Inspect DOM in DevTools:**
   - Verify `data-checkbox-size` attribute applied correctly
   - Check computed CSS variables match expected values

4. **Accessibility:**
   - All checkboxes remain keyboard accessible
   - Labels clickable for all sizes
   - Focus indicators visible on all sizes

### Automated Testing

5. **Play Function Tests:**
   - CheckboxCustomSize play function verifies:
     - Data attributes applied correctly
     - All sizes remain functional (clickable)
     - No JavaScript errors

6. **Existing Test Suite:**
   - Run `npm test` to ensure no regressions
   - All existing Checkbox tests should pass

### Cross-Browser Testing (Optional)

7. **Test in:**
   - Chrome (primary)
   - Firefox (verify :has() support)
   - Safari (verify :has() support)

## Success Criteria

✅ Size prop works: `<Checkbox size="sm" />` renders small checkbox
✅ All 4 sizes (xs, sm, md, lg) render correctly
✅ Default size remains md (1.25rem) - no breaking change
✅ CSS variable override still works via `styles` prop
✅ Data attribute `data-checkbox-size` applied to wrapper div
✅ SCSS attribute selectors map sizes to CSS variables
✅ Storybook stories updated and play functions pass
✅ TypeScript types include size prop with JSDoc
✅ No test regressions
✅ Documentation clear on when to use size vs styles

## Potential Issues & Mitigations

**Issue 1:** :has() selector browser support
- **Mitigation:** :has() is supported in all modern browsers (Chrome 105+, Firefox 121+, Safari 15.4+)
- **Fallback:** Existing checkbox styles work without :has() selectors

**Issue 2:** Data attribute not applied
- **Mitigation:** Verify size prop extracted from props and passed to wrapper div

**Issue 3:** CSS cascade order
- **Mitigation:** CSS variable overrides via `styles` prop have higher specificity than data-attribute selectors (inline styles win)

## Related Documentation

- CSS Variable Naming: `/docs/css-variables.md`
- Button Size Implementation: `/packages/fpkit/src/components/buttons/button.tsx`
- Checkbox Component: `/packages/fpkit/src/components/form/checkbox.tsx`
- Form Styles: `/packages/fpkit/src/components/form/form.scss`
