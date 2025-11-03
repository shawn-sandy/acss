# Accessible Disabled Form Element State Management

## Why

The current implementation of disabled form elements across the component library has WCAG 2.1 Level AA compliance gaps that impact users with disabilities. A comprehensive accessibility review (reports/accessibility/disabled-elements-accessibility.md) identified that while components use `aria-disabled`, they lack:

- Consistent event prevention when disabled
- WCAG-compliant visual feedback (3:1 contrast minimum for UI components)
- Standardized keyboard focusability patterns
- Developer-friendly reusable patterns

Currently, 7+ form components (Button, Input, Textarea, Select, Checkbox, Radio, Toggle) each implement disabled state handling differently, with manual event checks scattered across components. There's also inconsistency between `disabled` and legacy `isDisabled` prop naming.

Modern accessibility best practices recommend using `aria-disabled="true"` without the native `disabled` attribute because it:
- Keeps elements in keyboard tab order for discoverability
- Allows interactive feedback (tooltips, error messages)
- Provides better visual contrast control
- Gives users context about why elements are disabled

## What Changes

### High Priority

- **Create `useDisabledState` hook** - Reusable hook that manages disabled state, wraps event handlers to prevent interaction, and returns proper ARIA attributes
- **Add WCAG-compliant disabled styling utilities** - Create `.is-disabled` CSS utility class with 3:1 contrast minimum and CSS custom properties for theming
- **Refactor form components** - Update Button, Input, Textarea, Select, Checkbox, Radio, Toggle to use the new hook pattern
- **Standardize prop interface** - Use `disabled` consistently, deprecate legacy `isDisabled` prop (maintain backward compatibility)

### Medium Priority

- **Create accessibility utility functions** - Add `getDisabledStyles()` helper for components needing programmatic style access
- **Add comprehensive JSDoc documentation** - Document hook with WCAG references, usage examples, and accessibility guidance
- **Update Storybook stories** - Add disabled state demonstrations with keyboard navigation examples

### Low Priority

- **Add runtime validation** - Optional dev-mode warnings for common accessibility issues with disabled elements

### Breaking Changes

- **NONE** - All changes are additive or backward compatible. Legacy `isDisabled` prop will continue to work with deprecation notice in JSDoc.

## Impact

### Affected Specs

- **NEW**: `form-accessibility` (creating new capability spec for form accessibility patterns)
- **Related**: `ui-component` (Button uses UI component pattern)

### Affected Code

- `packages/fpkit/src/hooks/use-disabled-state.ts` - New hook (create)
- `packages/fpkit/src/hooks.ts` - Add export (modify)
- `packages/fpkit/src/utils/accessibility.ts` - New utilities (create)
- `packages/fpkit/src/styles/utilities/_disabled.scss` - New utility styles (create)
- `packages/fpkit/src/index.scss` - Import disabled utilities (modify)
- `packages/fpkit/src/types/shared.ts` - Standardize DisabledProps interface (modify)
- `packages/fpkit/src/components/buttons/button.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/inputs.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/textarea.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/select.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/checkbox.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/radio.tsx` - Use new hook (refactor)
- `packages/fpkit/src/components/form/toggle.tsx` - Use new hook (refactor)
- Various `.stories.tsx` files - Add disabled state examples (enhance)
- Various `.test.tsx` files - Add disabled behavior tests (enhance)

### User Impact

- **Positive**: Improved accessibility for users with disabilities (keyboard users, screen reader users, users with motor impairments)
- **Positive**: Consistent disabled behavior across all form components
- **Positive**: Better visual feedback with WCAG-compliant contrast
- **Positive**: Elements remain focusable when disabled, allowing users to discover and understand state
- **Developer**: Simple migration path with backward compatibility
- **Developer**: Clear, reusable pattern for future form components

### Technical Impact

- **Bundle Size**: Minimal increase (~1-2KB for hook + utilities)
- **Performance**: No runtime performance impact (hook uses memoization)
- **Build**: SCSS compilation adds ~0.5KB to compiled CSS
- **Testing**: Requires new tests for hook and updated component tests
- **Maintenance**: Reduces code duplication across components

### Browser Support

- `aria-disabled` attribute supported in all modern browsers and screen readers
- No new browser dependencies introduced
- Maintains existing browser support matrix (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
