# Checkbox Component Implementation Plan

**Project:** @fpkit/acss Component Library
**Component:** Checkbox with size variants and style customization
**Date:** 2026-01-08
**Status:** Ready for Implementation

---

## Executive Summary

This plan provides a complete blueprint for implementing a fully accessible, customizable Checkbox component for the @fpkit/acss library following all established patterns and conventions discovered through codebase exploration.

### Requirements Met

✅ **Size Variants:** Small (sm), Medium (md), Large (lg) - t-shirt sizing
✅ **Color Variants:** Primary, Secondary, Error, Success
✅ **States:** Checked, Unchecked, Indeterminate, Disabled, Hover, Focus
✅ **Label Support:** With left/right positioning
✅ **Description Text:** Helper text with aria-describedby
✅ **Error Messages:** Validation support with aria-invalid and aria-errormessage
✅ **Dual Modes:** Controlled (checked/onChange) and Uncontrolled (defaultChecked)
✅ **Accessibility:** WCAG 2.1 AA compliant with keyboard navigation

### Key Design Decisions

1. **Native input with custom visual indicator**: Hidden native checkbox maintains accessibility while custom SVG provides visual styling
2. **Data attribute pattern**: Follow existing `data-checkbox` pattern like Title and Button components (e.g., `data-checkbox="sm primary"`)
3. **CSS custom properties**: All styling via CSS variables following standardized naming convention from `docs/css-variables.md`
4. **useDisabledState hook**: WCAG-compliant disabled state management keeping elements focusable
5. **Indeterminate state**: JavaScript-controlled via ref to set `input.indeterminate` property

---

## Component API Design

### TypeScript Types and Interfaces

```typescript
/**
 * Size variants for checkbox component (t-shirt sizing)
 */
export type CheckboxSize = "sm" | "md" | "lg";

/**
 * Color variants for checkbox component
 */
export type CheckboxColor = "primary" | "secondary" | "error" | "success";

/**
 * Label positioning relative to checkbox
 */
export type CheckboxLabelPosition = "left" | "right";

/**
 * Checkbox component props
 */
export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<"input">, "type" | "size"> {
  /** Unique identifier (required for aria-describedby linking) */
  id: string;

  /** Label text content */
  label?: React.ReactNode;

  /** Child content (alternative to label prop) */
  children?: React.ReactNode;

  /** Size variant @default "md" */
  size?: CheckboxSize;

  /** Color variant @default "primary" */
  color?: CheckboxColor;

  /** Label position @default "right" */
  labelPosition?: CheckboxLabelPosition;

  /** Helper text displayed below checkbox */
  description?: string;

  /** Error message for validation */
  errorMessage?: string;

  /** Validation state @default "none" */
  validationState?: "valid" | "invalid" | "none";

  /** Checked state (controlled mode) */
  checked?: boolean;

  /** Default checked state (uncontrolled mode) */
  defaultChecked?: boolean;

  /** Indeterminate state @default false */
  indeterminate?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Required field indicator @default false */
  required?: boolean;

  /** Name for form submission */
  name?: string;

  /** Value for form submission */
  value?: string;

  /** CSS class names */
  classes?: string;

  /** Inline styles */
  styles?: React.CSSProperties;

  /** Event handlers */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
```

---

## File Structure

### Files to Create

All files will be created in: `/Users/shawnsandy/devbox/acss/packages/fpkit/src/components/checkbox/`

```
checkbox/
├── checkbox.tsx           # Main component (~350-400 lines)
├── checkbox.scss          # Styles with CSS variables (~200-250 lines)
├── checkbox.stories.tsx   # Storybook stories (~400-500 lines)
├── checkbox.test.tsx      # Vitest unit tests (~300-400 lines)
├── README.mdx            # Component documentation
└── STYLES.mdx            # CSS variable documentation
```

### Export Updates

Add to `/Users/shawnsandy/devbox/acss/packages/fpkit/src/index.ts`:

```typescript
// Checkbox Component
export { Checkbox } from './components/checkbox/checkbox';
export type {
  CheckboxProps,
  CheckboxSize,
  CheckboxColor,
  CheckboxLabelPosition
} from './components/checkbox/checkbox';
```

---

## CSS Architecture

### Complete CSS Custom Properties

Following the standardized naming convention from `docs/css-variables.md`:

```scss
:root {
  /* ============================================
     Size Tokens
     ============================================ */
  --checkbox-size-sm: 1rem;           /* 16px */
  --checkbox-size-md: 1.25rem;        /* 20px */
  --checkbox-size-lg: 1.5rem;         /* 24px */

  /* ============================================
     Base Properties
     ============================================ */
  --checkbox-size: var(--checkbox-size-md);
  --checkbox-bg: #ffffff;
  --checkbox-border: 0.125rem solid #6b7280;
  --checkbox-radius: 0.25rem;
  --checkbox-cursor: pointer;
  --checkbox-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* ============================================
     Checkmark Indicator
     ============================================ */
  --checkbox-checkmark-color: #ffffff;
  --checkbox-checkmark-width: 0.125rem;
  --checkbox-checkmark-scale: 0;

  /* ============================================
     Label Properties
     ============================================ */
  --checkbox-label-gap: 0.5rem;
  --checkbox-label-fs: 1rem;
  --checkbox-label-color: inherit;
  --checkbox-label-cursor: pointer;

  /* ============================================
     Description Properties
     ============================================ */
  --checkbox-description-fs: 0.875rem;
  --checkbox-description-color: #6b7280;
  --checkbox-description-margin-block-start: 0.25rem;

  /* ============================================
     Error Message Properties
     ============================================ */
  --checkbox-error-fs: 0.875rem;
  --checkbox-error-color: #dc2626;
  --checkbox-error-margin-block-start: 0.25rem;

  /* ============================================
     Color Variants - WCAG AA Compliant
     ============================================ */

  /* Primary Variant */
  --checkbox-primary-checked-bg: #2563eb;      /* 4.68:1 contrast */
  --checkbox-primary-checked-border: #2563eb;
  --checkbox-primary-hover-border: #3b82f6;
  --checkbox-primary-focus-outline-color: #93c5fd;

  /* Secondary Variant */
  --checkbox-secondary-checked-bg: #4b5563;    /* 7.56:1 contrast */
  --checkbox-secondary-checked-border: #4b5563;
  --checkbox-secondary-hover-border: #6b7280;
  --checkbox-secondary-focus-outline-color: #9ca3af;

  /* Error Variant */
  --checkbox-error-checked-bg: #dc2626;        /* 5.14:1 contrast */
  --checkbox-error-checked-border: #dc2626;
  --checkbox-error-hover-border: #ef4444;
  --checkbox-error-focus-outline-color: #fca5a5;

  /* Success Variant */
  --checkbox-success-checked-bg: #16a34a;      /* 4.54:1 contrast */
  --checkbox-success-checked-border: #16a34a;
  --checkbox-success-hover-border: #22c55e;
  --checkbox-success-focus-outline-color: #86efac;

  /* ============================================
     State Variables
     ============================================ */

  /* Hover State */
  --checkbox-hover-border-color: #9ca3af;
  --checkbox-hover-bg: #f9fafb;

  /* Focus State */
  --checkbox-focus-outline: 0.125rem solid;
  --checkbox-focus-outline-offset: 0.125rem;
  --checkbox-focus-outline-color: #93c5fd;

  /* Checked State */
  --checkbox-checked-bg: var(--checkbox-primary-checked-bg);
  --checkbox-checked-border: var(--checkbox-primary-checked-border);
  --checkbox-checked-checkmark-scale: 1;

  /* Indeterminate State */
  --checkbox-indeterminate-bg: var(--checkbox-primary-checked-bg);
  --checkbox-indeterminate-border: var(--checkbox-primary-checked-border);
  --checkbox-indeterminate-dash-width: 0.625rem;
  --checkbox-indeterminate-dash-height: 0.125rem;

  /* Disabled State */
  --checkbox-disabled-bg: #f3f4f6;
  --checkbox-disabled-border-color: #d1d5db;
  --checkbox-disabled-opacity: 0.6;
  --checkbox-disabled-cursor: not-allowed;

  /* Invalid State */
  --checkbox-invalid-border-color: #dc2626;
  --checkbox-invalid-focus-outline-color: #fca5a5;

  /* Required Indicator */
  --checkbox-required-color: #dc2626;
}
```

### SCSS Structure

```scss
[data-checkbox] {
  /* Base checkbox wrapper styles */
  display: inline-flex;
  align-items: flex-start;
  gap: var(--checkbox-label-gap);
  cursor: var(--checkbox-cursor);

  /* Size variants */
  &[data-checkbox~="sm"] {
    --checkbox-size: var(--checkbox-size-sm);
    --checkbox-label-fs: 0.875rem;
  }

  &[data-checkbox~="md"] {
    --checkbox-size: var(--checkbox-size-md);
  }

  &[data-checkbox~="lg"] {
    --checkbox-size: var(--checkbox-size-lg);
    --checkbox-label-fs: 1.125rem;
  }

  /* Color variants */
  &[data-checkbox~="primary"] {
    --checkbox-checked-bg: var(--checkbox-primary-checked-bg);
    --checkbox-checked-border: var(--checkbox-primary-checked-border);
    --checkbox-focus-outline-color: var(--checkbox-primary-focus-outline-color);
  }

  &[data-checkbox~="secondary"] {
    --checkbox-checked-bg: var(--checkbox-secondary-checked-bg);
    --checkbox-checked-border: var(--checkbox-secondary-checked-border);
    --checkbox-focus-outline-color: var(--checkbox-secondary-focus-outline-color);
  }

  &[data-checkbox~="error"] {
    --checkbox-checked-bg: var(--checkbox-error-checked-bg);
    --checkbox-checked-border: var(--checkbox-error-checked-border);
    --checkbox-focus-outline-color: var(--checkbox-error-focus-outline-color);
  }

  &[data-checkbox~="success"] {
    --checkbox-checked-bg: var(--checkbox-success-checked-bg);
    --checkbox-checked-border: var(--checkbox-success-checked-border);
    --checkbox-focus-outline-color: var(--checkbox-success-focus-outline-color);
  }
}

.checkbox-input {
  /* Hide native input visually but keep accessible */
  position: absolute;
  opacity: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  cursor: var(--checkbox-cursor);

  &:focus-visible + .checkbox-indicator {
    outline: var(--checkbox-focus-outline);
    outline-color: var(--checkbox-focus-outline-color);
    outline-offset: var(--checkbox-focus-outline-offset);
  }

  &:checked + .checkbox-indicator {
    background-color: var(--checkbox-checked-bg);
    border-color: var(--checkbox-checked-border);
  }

  &:indeterminate + .checkbox-indicator {
    background-color: var(--checkbox-indeterminate-bg);
    border-color: var(--checkbox-indeterminate-border);
  }

  &:disabled,
  &[aria-disabled="true"] {
    cursor: var(--checkbox-disabled-cursor);
  }
}

.checkbox-indicator {
  /* Custom visual checkbox */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  background-color: var(--checkbox-bg);
  border: var(--checkbox-border);
  border-radius: var(--checkbox-radius);
  transition: var(--checkbox-transition);

  &:hover {
    background-color: var(--checkbox-hover-bg);
    border-color: var(--checkbox-hover-border-color);
  }
}
```

---

## Implementation Strategy

### Component Structure

**HTML Structure:**

```jsx
<div data-checkbox="md primary" className="checkbox-wrapper">
  <div className="checkbox-container">
    {labelPosition === "left" && <label>{label}</label>}

    <input
      type="checkbox"
      className="checkbox-input"
      ref={inputRef}
      id={id}
      checked={isChecked}
      defaultChecked={isDefaultChecked}
      aria-disabled={isDisabled}
      aria-invalid={isInvalid}
      aria-describedby={describedByIds}
      {...handlers}
    />

    <span className="checkbox-indicator" aria-hidden="true">
      <svg className="checkbox-checkmark">
        {/* Checkmark path */}
      </svg>
      <span className="checkbox-indeterminate-dash" />
    </span>

    {labelPosition === "right" && <label>{label}</label>}
  </div>

  {description && (
    <div id={`${id}-description`} className="checkbox-description">
      {description}
    </div>
  )}

  {errorMessage && (
    <div id={`${id}-error`} className="checkbox-error">
      {errorMessage}
    </div>
  )}
</div>
```

### Key Implementation Details

**1. Indeterminate State:**

```typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.indeterminate = indeterminate ?? false;
  }
}, [indeterminate]);
```

**2. Controlled vs Uncontrolled:**

```typescript
const isControlled = checked !== undefined;
const isChecked = isControlled ? checked : undefined;
const isDefaultChecked = !isControlled ? defaultChecked : undefined;
```

**3. Accessibility:**

```typescript
// Use useDisabledState hook
const { disabledProps, handlers } = useDisabledState<HTMLInputElement>(
  disabled,
  {
    handlers: { onChange, onBlur, onFocus },
    className: classes,
  }
);

// Generate describedby IDs
const describedByIds: string[] = [];
if (description && id) {
  describedByIds.push(`${id}-description`);
}
if (errorMessage && id) {
  describedByIds.push(`${id}-error`);
}
const ariaDescribedBy = describedByIds.length > 0
  ? describedByIds.join(" ")
  : undefined;
```

**4. Data Attribute Construction:**

```typescript
const dataCheckbox = [size, color].filter(Boolean).join(" ") || undefined;
```

---

## Testing Strategy

### Unit Tests (31 Tests Planned)

**Test Categories:**

1. **Rendering (8 tests)**
   - Renders with label
   - Renders with children
   - Renders with description
   - Renders with error message
   - Renders size variants (sm, md, lg)
   - Renders color variants (primary, secondary, error, success)
   - Renders label position (left, right)
   - Renders with custom classes and styles

2. **Interaction (4 tests)**
   - Toggles on click
   - Toggles on Space key press
   - Fires onChange handler
   - Prevents interaction when disabled

3. **Controlled/Uncontrolled (3 tests)**
   - Works in controlled mode (checked prop)
   - Works in uncontrolled mode (defaultChecked prop)
   - Does not mix controlled and uncontrolled

4. **Indeterminate State (2 tests)**
   - Applies indeterminate property to input
   - Shows indeterminate visual indicator

5. **Disabled State (4 tests)**
   - Sets aria-disabled attribute
   - Remains focusable for accessibility
   - Prevents onChange when disabled
   - Applies .is-disabled class

6. **Validation (3 tests)**
   - Sets aria-invalid when validationState="invalid"
   - Links error message with aria-errormessage
   - Displays error message

7. **Accessibility (5 tests)**
   - Has accessible name from label
   - Links description with aria-describedby
   - Sets aria-required when required
   - Has visible focus indicator
   - Maintains keyboard navigation

8. **Label Position (2 tests)**
   - Positions label on left
   - Positions label on right

---

## Storybook Stories

### 12 Stories Planned

1. **CheckboxComponent** - Default with play function testing keyboard and mouse interaction
2. **Sizes** - sm, md, lg side by side comparison
3. **Colors** - primary, secondary, error, success variants
4. **States** - unchecked, checked, indeterminate, disabled
5. **WithDescription** - Helper text example
6. **WithError** - Validation error example
7. **LabelPositions** - Left and right positioning
8. **Controlled** - Controlled mode with state management
9. **Uncontrolled** - Uncontrolled mode with defaultChecked
10. **Required** - Required field indicator
11. **ComplexForm** - Full form validation example with multiple checkboxes
12. **SelectAll** - Indeterminate "select all" pattern demonstration

### Example Story with Play Function:

```typescript
export const CheckboxComponent: Story = {
  args: {
    id: "default-checkbox",
    label: "Accept terms and conditions",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("Checkbox is rendered", async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    await step("Checkbox gets focus on tab", async () => {
      await userEvent.tab();
      expect(checkbox).toHaveFocus();
    });

    await step("Checkbox toggles on space key", async () => {
      await userEvent.keyboard("{space}");
      expect(checkbox).toBeChecked();
    });

    await step("Checkbox toggles on click", async () => {
      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  },
};
```

---

## Step-by-Step Implementation Sequence

### Phase 1: Foundation (Estimated: 4 hours)

1. Create directory structure: `src/components/checkbox/`
2. Create `checkbox.tsx` with TypeScript interfaces and comprehensive JSDoc
3. Implement base component structure with wrapper, input, indicator
4. Implement controlled/uncontrolled logic
5. Add data attribute construction for variants

### Phase 2: Visual Styling (Estimated: 6 hours)

6. Create `checkbox.scss` with all CSS custom properties
7. Implement base checkbox styles with proper rem units
8. Add size variants (sm, md, lg) using data attributes
9. Add color variants (primary, secondary, error, success)
10. Verify WCAG AA contrast ratios for all colors
11. Test in Storybook with basic stories

### Phase 3: States & Interactions (Estimated: 4 hours)

12. Implement indeterminate state with ref and useEffect
13. Integrate `useDisabledState` hook for disabled state
14. Implement hover and focus states with WCAG-compliant indicators
15. Add checkmark SVG with animation
16. Add indeterminate dash indicator
17. Test state transitions in Storybook

### Phase 4: Accessibility (Estimated: 5 hours)

18. Implement label with htmlFor linking
19. Add description text with aria-describedby
20. Add validation support with aria-invalid and aria-errormessage
21. Implement required state with aria-required
22. Add label positioning (left/right)
23. Test keyboard navigation and screen reader announcements

### Phase 5: Testing (Estimated: 6 hours)

24. Write 31 unit tests covering all functionality
25. Run tests and fix any failures
26. Achieve >90% test coverage
27. Fix any edge cases discovered

### Phase 6: Documentation (Estimated: 7 hours)

28. Create 12 Storybook stories with play functions
29. Test all stories in Storybook browser
30. Create `README.mdx` with usage examples and guidelines
31. Create `STYLES.mdx` with CSS variable reference
32. Add accessibility documentation

### Phase 7: Integration (Estimated: 2 hours)

33. Export component from `src/index.ts`
34. Run full build: `npm run build`
35. Verify compiled output in `libs/` directory
36. Test in Storybook from root

### Phase 8: Polish (Estimated: 3 hours)

37. Code review against checklist
38. Performance review (memoization if needed)
39. Documentation review for completeness
40. Final manual testing in multiple browsers

**Total Estimated Time: 37 hours (~5 days)**

---

## Critical Files for Reference

### Implementation References

1. **`packages/fpkit/src/hooks/use-disabled-state.ts`**
   - Study WCAG-compliant disabled state pattern
   - Use this hook for disabled state management

2. **`packages/fpkit/src/components/title/title.tsx`**
   - Reference for data attribute variant pattern
   - Study how size and color props are combined

3. **`packages/fpkit/src/components/form/inputs.tsx`**
   - Reference for form validation patterns
   - Study aria-describedby and aria-invalid usage

4. **`docs/css-variables.md`**
   - Mandatory CSS variable naming standard
   - Must follow this exactly for all variables

5. **`packages/fpkit/src/components/buttons/button.stories.tsx`**
   - Reference for Storybook story patterns
   - Study play function examples

---

## Verification Checklist

### Functional Requirements

- [ ] Checkbox toggles between checked/unchecked states
- [ ] Supports controlled mode (checked + onChange)
- [ ] Supports uncontrolled mode (defaultChecked)
- [ ] Indeterminate state works correctly
- [ ] All size variants render (sm, md, lg)
- [ ] All color variants render (primary, secondary, error, success)
- [ ] Label positioning works (left, right)
- [ ] Description text displays and links via aria-describedby
- [ ] Error messages display and link via aria-errormessage
- [ ] Required indicator displays

### Accessibility Requirements (WCAG 2.1 AA)

- [ ] Has accessible name from label or aria-label
- [ ] Keyboard navigable (Tab to focus)
- [ ] Space key toggles checked state
- [ ] Focus indicator visible with 3:1 contrast
- [ ] aria-disabled set correctly (not native disabled)
- [ ] Remains focusable when disabled
- [ ] aria-invalid set when validation fails
- [ ] aria-describedby links description
- [ ] aria-errormessage links error message
- [ ] aria-required set when required
- [ ] Color contrast meets 4.5:1 minimum for all variants
- [ ] Screen reader announces state changes correctly

### Code Quality

- [ ] TypeScript strict mode passing
- [ ] ESLint passing with no warnings
- [ ] All CSS variables follow naming convention
- [ ] All units use rem (no px)
- [ ] JSDoc comments complete for all public APIs
- [ ] Component exports correctly from index.ts

### Testing

- [ ] 31+ unit tests passing
- [ ] Test coverage >90%
- [ ] All interactions tested (click, keyboard)
- [ ] All states tested (checked, indeterminate, disabled)
- [ ] Accessibility tests passing

### Documentation

- [ ] README.mdx created with usage examples
- [ ] STYLES.mdx created with CSS variable reference
- [ ] 12 Storybook stories created
- [ ] Play functions test interactions
- [ ] No accessibility violations in Storybook a11y addon

---

## Success Metrics

### Performance
- Component renders in <16ms
- No unnecessary re-renders
- Stable event handler references

### Accessibility
- 100% keyboard accessible
- Zero violations in axe DevTools
- Proper screen reader announcements

### Developer Experience
- Clear TypeScript types with autocomplete
- Comprehensive documentation
- Easy to customize via CSS variables

### User Experience
- Smooth animations (60fps)
- Clear visual feedback for all states
- Intuitive label positioning

---

## Next Steps After Implementation

1. **User Testing**: Test with real users for usability
2. **Integration Testing**: Use in a real form context
3. **Visual Regression**: Add Chromatic visual tests
4. **Performance Testing**: Test with 100+ checkboxes
5. **Documentation**: Add to component documentation site
6. **Examples**: Create real-world usage examples

---

## Notes and Considerations

### Design Patterns Followed

- **Polymorphic Component**: Not needed for checkbox (always input element)
- **Data Attributes**: Used for variants (size, color)
- **CSS Custom Properties**: All styling customizable
- **Composition**: Works with Field component for complete form controls
- **Accessibility-First**: WCAG 2.1 AA compliant by default

### Industry Standards Implemented

- **Native Input**: Uses native `<input type="checkbox">` for accessibility
- **Custom Styling**: Custom visual indicator with full style control
- **Indeterminate**: Supports three-state checkbox (checked, unchecked, indeterminate)
- **Focus Management**: Visible focus ring with proper contrast
- **Label Association**: Proper label/input linking via htmlFor

### Potential Extensions (Future)

- Checkbox group component for related checkboxes
- Visual variants (switch/toggle style)
- Icon customization for checkmark
- Animation customization
- Form integration component

---

**Plan Status:** ✅ Ready for Implementation
**Estimated Completion:** 5 days (37 hours)
**Risk Level:** Low (following established patterns)
**Blockers:** None identified
