# Implementation Tasks

## 1. Update UI Component JSDoc

- [ ] 1.1 Add accessibility-focused `@example` sections to main JSDoc comment
  - [ ] 1.1.1 Add "Good" example: accessible button with aria-label
  - [ ] 1.1.2 Add "Good" example: accessible link with descriptive text
  - [ ] 1.1.3 Add "Bad" example: button without accessible name (with warning)
  - [ ] 1.1.4 Add "Good" example: custom focus indicator styling
- [ ] 1.2 Document ARIA attribute forwarding
  - [ ] 1.2.1 Add section documenting that all ARIA props are forwarded
  - [ ] 1.2.2 List common ARIA attributes (aria-label, aria-expanded, aria-describedby, role, etc.)
- [ ] 1.3 Document focus indicator responsibility
  - [ ] 1.3.1 Add note that consumers must ensure WCAG 2.4.7 compliance (3:1 contrast) for focus indicators
  - [ ] 1.3.2 Provide example of custom focus styling with CSS
- [ ] 1.4 Add semantic HTML guidance
  - [ ] 1.4.1 Add examples showing when to use semantic vs generic elements
  - [ ] 1.4.2 Document that interactive functionality requires semantic elements or proper ARIA

## 2. Fix Default Element Type Mismatch

- [ ] 2.1 Review current default element implementation
  - [ ] 2.1.1 Check type definition default (currently `span` on line 126)
  - [ ] 2.1.2 Check runtime implementation default (currently `div` on line 190)
- [ ] 2.2 Align default element type
  - [ ] 2.2.1 Choose consistent default (`div` recommended for block-level container use cases)
  - [ ] 2.2.2 Update type definition to match chosen default
  - [ ] 2.2.3 Update runtime implementation to match chosen default
  - [ ] 2.2.4 Update JSDoc to clearly state the default element type

## 3. Add TypeScript Accessibility Pattern Examples

- [ ] 3.1 Create JSDoc example showing accessible button wrapper
  - [ ] 3.1.1 Show extending `UIProps<'button'>` with custom props
  - [ ] 3.1.2 Demonstrate proper ref forwarding with types
  - [ ] 3.1.3 Include accessible name requirement (aria-label or children)
- [ ] 3.2 Add utility type example for accessible name enforcement
  - [ ] 3.2.1 Show type that requires either aria-label or children for interactive elements
  - [ ] 3.2.2 Document how to create compile-time accessibility checks

## 4. Update Storybook Stories

- [ ] 4.1 Check if ui.stories.tsx exists, create if needed
  - [ ] 4.1.1 Set up story file structure with proper meta configuration
  - [ ] 4.1.2 Configure Storybook a11y addon for UI component stories
- [ ] 4.2 Create "Accessible Interactive Elements" story
  - [ ] 4.2.1 Add accessible button example with aria-label and icon
  - [ ] 4.2.2 Add accessible link example with descriptive text
  - [ ] 4.2.3 Add custom interactive element with proper role and tabIndex
  - [ ] 4.2.4 Add form input with proper label association
- [ ] 4.3 Create "Accessibility Patterns" story
  - [ ] 4.3.1 Show focus indicator customization
  - [ ] 4.3.2 Demonstrate ARIA attribute usage (aria-expanded, aria-controls)
  - [ ] 4.3.3 Show semantic vs generic element choices
- [ ] 4.4 Create "Common Mistakes" story (optional but recommended)
  - [ ] 4.4.1 Show button without accessible name (with warning in description)
  - [ ] 4.4.2 Show link without descriptive text
  - [ ] 4.4.3 Add story descriptions explaining why each is problematic
- [ ] 4.5 Verify all stories pass Storybook a11y addon checks

## 5. Add Testing Documentation

- [ ] 5.1 Create or update README section on accessibility testing
  - [ ] 5.1.1 Recommend eslint-plugin-jsx-a11y for linting
  - [ ] 5.1.2 Recommend jest-axe for unit testing
  - [ ] 5.1.3 Note that Storybook a11y addon is already configured
- [ ] 5.2 Provide basic testing examples
  - [ ] 5.2.1 Show jest-axe example for UI component
  - [ ] 5.2.2 Provide manual testing checklist (keyboard, screen reader, focus)

## 6. Type Definition Updates

- [ ] 6.1 Add JSDoc to UIProps type explaining accessibility props
- [ ] 6.2 Add JSDoc to PolymorphicComponentPropWithRef explaining ref usage for focus management
- [ ] 6.3 Ensure all type definitions have clear accessibility-related documentation

## 7. Testing and Validation

- [ ] 7.1 Run TypeScript compiler to verify no type errors
- [ ] 7.2 Run Storybook and verify all stories render correctly
- [ ] 7.3 Run Storybook a11y addon and verify no new violations
- [ ] 7.4 Run existing tests to ensure no regressions
- [ ] 7.5 Build package and verify exports work correctly

## 8. Documentation Review

- [ ] 8.1 Review all JSDoc changes for clarity and completeness
- [ ] 8.2 Verify all examples use correct syntax and are runnable
- [ ] 8.3 Check that accessibility guidance is accurate per WCAG 2.1 AA
- [ ] 8.4 Ensure documentation matches implementation behavior
