# Improve UI Component Accessibility Documentation and Type Safety

## Why

The UI polymorphic component currently lacks comprehensive accessibility documentation and guidance, which could lead developers to create inaccessible interactive elements. A WCAG 2.1 AA compliance review identified that while the component's implementation is structurally sound (proper ref forwarding, ARIA prop spreading), it places full accessibility responsibility on consumers without sufficient guidance. Additionally, there's a type/implementation mismatch in the default element type.

## What Changes

- **Add comprehensive accessibility JSDoc examples** showing correct and incorrect usage patterns for interactive elements
- **Document ARIA attribute forwarding behavior** to make it explicit that all ARIA props are supported
- **Fix default element type mismatch** between TypeScript definition (defaults to `span`) and implementation (defaults to `div`)
- **Add TypeScript type examples** for creating accessible component wrappers using the UI component
- **Document focus indicator responsibility** for interactive elements
- **Add accessibility testing examples** for consuming applications

## Impact

- **Affected specs**: `ui-component` (new specification)
- **Affected code**:
  - `packages/fpkit/src/components/ui.tsx` - JSDoc improvements, default element alignment
  - `packages/fpkit/src/components/ui.stories.tsx` - Add accessibility-focused stories (if exists)
  - Documentation/README updates to highlight accessibility features

**Breaking Changes**: None. This is a documentation and minor implementation fix (aligning default element type) that maintains backward compatibility.

## Success Criteria

- All JSDoc comments include accessibility examples with ✅ Good and ❌ Bad patterns
- Default element type is consistent between type definition and implementation
- Storybook stories include accessibility-focused examples
- TypeScript developers receive clear guidance on creating accessible wrappers
- WCAG 2.1 AA compliance review shows improved documentation score
