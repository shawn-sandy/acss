# Implementation Tasks

## 1. Update UI Component JSDoc

- [x] 1.1 Add accessibility-focused `@example` sections to main JSDoc comment
  - [x] 1.1.1 Add "Good" example: accessible button with aria-label
  - [x] 1.1.2 Add "Good" example: accessible link with descriptive text
  - [x] 1.1.3 Add "Bad" example: button without accessible name (with warning)
  - [x] 1.1.4 Add "Good" example: custom focus indicator styling
- [x] 1.2 Document ARIA attribute forwarding
  - [x] 1.2.1 Add section documenting that all ARIA props are forwarded
  - [x] 1.2.2 List common ARIA attributes (aria-label, aria-expanded, aria-describedby, role, etc.)
- [x] 1.3 Document focus indicator responsibility
  - [x] 1.3.1 Add note that consumers must ensure WCAG 2.4.7 compliance (3:1 contrast) for focus indicators
  - [x] 1.3.2 Provide example of custom focus styling with CSS
- [x] 1.4 Add semantic HTML guidance
  - [x] 1.4.1 Add examples showing when to use semantic vs generic elements
  - [x] 1.4.2 Document that interactive functionality requires semantic elements or proper ARIA

## 2. Fix Default Element Type Mismatch

- [x] 2.1 Review current default element implementation
  - [x] 2.1.1 Check type definition default (currently `span` on line 126)
  - [x] 2.1.2 Check runtime implementation default (currently `div` on line 190)
- [x] 2.2 Align default element type
  - [x] 2.2.1 Choose consistent default (`div` recommended for block-level container use cases)
  - [x] 2.2.2 Update type definition to match chosen default
  - [x] 2.2.3 Update runtime implementation to match chosen default
  - [x] 2.2.4 Update JSDoc to clearly state the default element type

## 3. Add TypeScript Accessibility Pattern Examples

- [x] 3.1 Create JSDoc example showing accessible button wrapper
  - [x] 3.1.1 Show extending `UIProps<'button'>` with custom props
  - [x] 3.1.2 Demonstrate proper ref forwarding with types
  - [x] 3.1.3 Include accessible name requirement (aria-label or children)
- [x] 3.2 Add utility type example for accessible name enforcement
  - [x] 3.2.1 Show type that requires either aria-label or children for interactive elements
  - [x] 3.2.2 Document how to create compile-time accessibility checks

## 4. Update Storybook Stories

- [x] 4.1 Check if ui.stories.tsx exists, create if needed
  - [x] 4.1.1 Set up story file structure with proper meta configuration
  - [x] 4.1.2 Configure Storybook a11y addon for UI component stories
- [x] 4.2 Create "Accessible Interactive Elements" story
  - [x] 4.2.1 Add accessible button example with aria-label and icon
  - [x] 4.2.2 Add accessible link example with descriptive text
  - [x] 4.2.3 Add custom interactive element with proper role and tabIndex
  - [x] 4.2.4 Add form input with proper label association
- [x] 4.3 Create "Accessibility Patterns" story
  - [x] 4.3.1 Show focus indicator customization
  - [x] 4.3.2 Demonstrate ARIA attribute usage (aria-expanded, aria-controls)
  - [x] 4.3.3 Show semantic vs generic element choices
- [x] 4.4 Create "Common Mistakes" story (optional but recommended)
  - [x] 4.4.1 Show button without accessible name (with warning in description)
  - [x] 4.4.2 Show link without descriptive text
  - [x] 4.4.3 Add story descriptions explaining why each is problematic
- [x] 4.5 Verify all stories pass Storybook a11y addon checks

## 5. Add Testing Documentation

- [x] 5.1 Create or update README section on accessibility testing
  - [x] 5.1.1 Recommend eslint-plugin-jsx-a11y for linting
  - [x] 5.1.2 Recommend jest-axe for unit testing
  - [x] 5.1.3 Note that Storybook a11y addon is already configured
- [x] 5.2 Provide basic testing examples
  - [x] 5.2.1 Show jest-axe example for UI component
  - [x] 5.2.2 Provide manual testing checklist (keyboard, screen reader, focus)

## 6. Type Definition Updates

- [x] 6.1 Add JSDoc to UIProps type explaining accessibility props
- [x] 6.2 Add JSDoc to PolymorphicComponentPropWithRef explaining ref usage for focus management
- [x] 6.3 Ensure all type definitions have clear accessibility-related documentation

## 7. Testing and Validation

- [x] 7.1 Run TypeScript compiler to verify no type errors
- [x] 7.2 Run Storybook and verify all stories render correctly
- [x] 7.3 Run Storybook a11y addon and verify no new violations
- [x] 7.4 Run existing tests to ensure no regressions
- [x] 7.5 Build package and verify exports work correctly

## 8. Documentation Review

- [x] 8.1 Review all JSDoc changes for clarity and completeness
- [x] 8.2 Verify all examples use correct syntax and are runnable
- [x] 8.3 Check that accessibility guidance is accurate per WCAG 2.1 AA
- [x] 8.4 Ensure documentation matches implementation behavior
