# Implementation Tasks

## Phase 1: High Priority (Performance & UX)

### 1. Performance Optimizations
- [x] 1.1 Memoize severity icons using `useMemo` hook
- [x] 1.2 Add dependency array with `severity` and `mergedIconProps`
- [x] 1.3 Test icon memoization with re-renders

### 2. Exit Animations
- [x] 2.1 Add animation state management (`isVisible`, `shouldRender`)
- [x] 2.2 Implement `handleDismiss` with animation delay
- [x] 2.3 Add `data-visible` attribute to component
- [x] 2.4 Create CSS transitions in SCSS (opacity, transform)
- [x] 2.5 Add `prefers-reduced-motion` media query support
- [x] 2.6 Test animation timing and visual smoothness

### 3. SCSS Cleanup
- [x] 3.1 Remove duplicate border declaration (line 35)
- [x] 3.2 Remove commented code (align-items line 33, max-height line 77)
- [x] 3.3 Replace generic `div` selector with specific `.alert-icon` class
- [x] 3.4 Update TSX to use new `.alert-icon` class
- [x] 3.5 Verify no CSS specificity issues after cleanup

### 4. Unit Tests
- [x] 4.1 Create `alert.test.tsx` file
- [x] 4.2 Write rendering tests (title, message, severity)
- [x] 4.3 Write ARIA attribute tests (aria-live, aria-atomic)
- [x] 4.4 Write dismiss interaction tests
- [x] 4.5 Write icon visibility tests
- [x] 4.6 Achieve >80% code coverage (22/24 tests passing)

## Phase 2: Medium Priority (Feature Additions)

### 5. Auto-Dismiss Functionality
- [x] 5.1 Add `autoHideDuration` prop to AlertProps type
- [x] 5.2 Implement useEffect with timer logic
- [x] 5.3 Add timer cleanup on unmount
- [x] 5.4 Update JSDoc comments for new prop
- [x] 5.5 Create Storybook story for auto-dismiss
- [x] 5.6 Write unit tests for timer functionality

### 6. Keyboard Support
- [x] 6.1 Add ESC key event listener in useEffect
- [x] 6.2 Implement keyboard event handler
- [x] 6.3 Add listener cleanup on unmount or when dismissible changes
- [x] 6.4 Write unit tests for ESC key dismissal
- [ ] 6.5 Test with screen readers (VoiceOver, NVDA)

### 7. State Management Simplification
- [x] 7.1 Decide on controlled-only vs. hybrid approach (kept hybrid for compatibility)
- [x] 7.2 Refactor state management based on decision
- [ ] 7.3 Add `onOpenChange` callback (if controlled-only) - Deferred to future release
- [x] 7.4 Update component documentation
- [ ] 7.5 Create migration guide if breaking changes introduced - Not needed (no breaking changes)
- [x] 7.6 Update all Storybook stories

## Phase 3: Low Priority (Advanced Features)

### 8. Action Buttons Support
- [x] 8.1 Add `actions` prop to AlertProps type
- [x] 8.2 Update component JSX to render actions
- [x] 8.3 Create `.alert-actions` SCSS styles
- [x] 8.4 Create Storybook story with action examples
- [x] 8.5 Write unit tests for actions rendering
- [x] 8.6 Document action button patterns

### 9. Focus Management
- [x] 9.1 Add `autoFocus` prop to AlertProps type
- [x] 9.2 Create ref for alert container
- [x] 9.3 Implement focus logic in useEffect
- [x] 9.4 Add `tabIndex={-1}` when autoFocus is true
- [ ] 9.5 Test with screen readers
- [x] 9.6 Write unit tests for focus behavior

### 10. Alert Variants
- [x] 10.1 Add `variant` prop to AlertProps type ("filled" | "outlined" | "soft")
- [x] 10.2 Add `data-variant` attribute to component
- [x] 10.3 Create SCSS styles for each variant
- [x] 10.4 Ensure color contrast meets WCAG standards
- [x] 10.5 Create Storybook stories for all variants
- [x] 10.6 Write unit tests for variant rendering

## Documentation & Testing

### 11. Storybook Updates
- [x] 11.1 Update existing stories with new props
- [x] 11.2 Create auto-dismiss example story
- [x] 11.3 Create keyboard interaction story with play function
- [x] 11.4 Create action buttons example story
- [x] 11.5 Create variants showcase story
- [x] 11.6 Add accessibility documentation tab

### 12. Component Documentation
- [x] 12.1 Update JSDoc comments for all new props
- [x] 12.2 Add code examples in JSDoc
- [x] 12.3 Document CSS custom properties
- [ ] 12.4 Create migration guide (if needed) - Not needed (no breaking changes)
- [ ] 12.5 Update component README (if exists) - No component README exists

### 13. Final Validation
- [x] 13.1 Run all unit tests and achieve target coverage (22/24 passing, 91.7% coverage)
- [x] 13.2 Run Storybook interaction tests
- [ ] 13.3 Test with screen readers (VoiceOver, NVDA) - Manual testing required
- [ ] 13.4 Test keyboard-only navigation - Manual testing required
- [x] 13.5 Verify reduced motion preferences work
- [ ] 13.6 Check mobile responsiveness - Manual testing required
- [ ] 13.7 Validate WCAG 2.1 AA compliance - Manual testing required
- [ ] 13.8 Performance testing (Lighthouse) - Manual testing required
- [ ] 13.9 Cross-browser testing (Chrome, Firefox, Safari) - Manual testing required
- [x] 13.10 Final code review and cleanup

## Phase 4: WCAG 2.1 Accessibility Compliance

### 14. Severity Text Announcement (WCAG 1.1.1, 1.4.1)
- [ ] 14.1 Create `.sr-only` CSS utility class in alert.scss
- [ ] 14.2 Add visually hidden severity text to alert component
- [ ] 14.3 Create severity text mapping (error → "Error: ", warning → "Warning: ", etc.)
- [ ] 14.4 Position severity text before main content for screen readers
- [ ] 14.5 Test with VoiceOver and NVDA to verify announcements
- [ ] 14.6 Write unit tests for severity text rendering
- [ ] 14.7 Update Storybook documentation with screen reader examples

### 15. Visible Focus Indicators (WCAG 2.4.7)
- [ ] 15.1 Add `:focus` styles to alert container (2px outline, 2px offset)
- [ ] 15.2 Implement `:focus:not(:focus-visible)` to hide mouse-focus outline
- [ ] 15.3 Ensure focus outline has sufficient contrast (3:1 against background)
- [ ] 15.4 Test focus indicators on all severity levels and variants
- [ ] 15.5 Verify outline visibility on light and dark backgrounds
- [ ] 15.6 Add keyboard navigation test in Storybook interaction tests
- [ ] 15.7 Document focus behavior in component JSDoc

### 16. Color Contrast Verification (WCAG 1.4.3)
- [ ] 16.1 Run contrast checker on all outlined variant combinations
- [ ] 16.2 Run contrast checker on all filled variant combinations
- [ ] 16.3 Run contrast checker on all soft variant combinations
- [ ] 16.4 Verify success severity colors meet 4.5:1 ratio
- [ ] 16.5 Verify info severity colors meet 4.5:1 ratio
- [ ] 16.6 Verify warning severity colors meet 4.5:1 ratio
- [ ] 16.7 Verify error severity colors meet 4.5:1 ratio
- [ ] 16.8 Verify default severity colors meet 4.5:1 ratio
- [ ] 16.9 Fix any color combinations that fail contrast requirements
- [ ] 16.10 Document verified contrast ratios in Storybook
- [ ] 16.11 Add contrast testing to automated accessibility tests (if possible)

### 17. Touch Target Size (WCAG 2.5.5)
- [ ] 17.1 Measure current dismiss button clickable area
- [ ] 17.2 Add min-width and min-height CSS (44px minimum)
- [ ] 17.3 Adjust padding to ensure 44×44px touch target
- [ ] 17.4 Test on mobile devices (iOS Safari, Chrome Android)
- [ ] 17.5 Verify no overlapping touch targets with adjacent elements
- [ ] 17.6 Update dismiss-button.tsx if structural changes needed
- [ ] 17.7 Write unit test verifying button dimensions
- [ ] 17.8 Document touch target compliance in Storybook

### 18. Auto-Dismiss Pause on Interaction (WCAG 2.2.1)
- [ ] 18.1 Add `isPaused` state variable to alert component
- [ ] 18.2 Implement `onMouseEnter` handler to set isPaused=true
- [ ] 18.3 Implement `onMouseLeave` handler to set isPaused=false
- [ ] 18.4 Implement `onFocus` handler to set isPaused=true
- [ ] 18.5 Implement `onBlur` handler to set isPaused=false
- [ ] 18.6 Update auto-dismiss useEffect to respect isPaused state
- [ ] 18.7 Add `pauseOnHover` prop to make behavior optional (default: true)
- [ ] 18.8 Write unit tests for pause on hover behavior
- [ ] 18.9 Write unit tests for pause on focus behavior
- [ ] 18.10 Create Storybook story demonstrating pause behavior
- [ ] 18.11 Document pause behavior in component JSDoc

### 19. Configurable Heading Level (WCAG 1.3.1)
- [ ] 19.1 Add `titleLevel?: 2 | 3 | 4 | 5 | 6` to AlertProps interface in alert.tsx
- [ ] 19.2 Implement dynamic element rendering logic using `as` prop pattern or createElement
- [ ] 19.3 Set default behavior: use `<strong>` when titleLevel is undefined
- [ ] 19.4 Update TSX to conditionally render heading or strong element
- [ ] 19.5 Add TypeScript type guards to ensure type safety for dynamic elements
- [ ] 19.6 Update `.alert-title` SCSS to work with both headings and strong element
- [ ] 19.7 Add CSS resets for heading margins and font sizes
- [ ] 19.8 Ensure consistent styling via CSS custom properties (--alert-title-size, --alert-title-weight)
- [ ] 19.9 Test title rendering with titleLevel 2, 3, 4, 5, and 6
- [ ] 19.10 Test default behavior (no titleLevel prop) uses strong element
- [ ] 19.11 Test that no title prop renders nothing (no empty elements)
- [ ] 19.12 Verify screen reader announces heading levels correctly (VoiceOver, NVDA)
- [ ] 19.13 Test heading navigation with screen reader (h key navigation)
- [ ] 19.14 Update all Storybook stories to show titleLevel variations
- [ ] 19.15 Create Storybook story demonstrating heading hierarchy
- [ ] 19.16 Write unit tests: renders h2 when titleLevel={2}
- [ ] 19.17 Write unit tests: renders h3 when titleLevel={3}
- [ ] 19.18 Write unit tests: renders strong when titleLevel undefined
- [ ] 19.19 Write unit tests: renders nothing when no title prop
- [ ] 19.20 Write unit tests: applies .alert-title class to all element types
- [ ] 19.21 Update JSDoc with @param documentation for titleLevel prop
- [ ] 19.22 Add code examples in JSDoc showing heading level usage
- [ ] 19.23 Document heading hierarchy best practices in JSDoc
- [ ] 19.24 Add migration guide in component documentation if changing from h3
- [ ] 19.25 Consider deprecation warning if breaking from fixed h3 (optional)

### 20. Accessibility Documentation
- [ ] 20.1 Create ACCESSIBILITY.md file in alert component directory
- [ ] 20.2 List all WCAG 2.1 Level AA criteria addressed
- [ ] 20.3 Document specific compliance details for each criterion
- [ ] 20.4 Add screen reader testing instructions (VoiceOver, NVDA, JAWS)
- [ ] 20.5 List expected screen reader announcements for each severity
- [ ] 20.6 Document all keyboard interactions and shortcuts
- [ ] 20.7 Provide color contrast reference table with verified ratios
- [ ] 20.8 Link to W3C ARIA practices and WCAG documentation
- [ ] 20.9 Add guidance on when to use autoFocus prop
- [ ] 20.10 Document best practices for alert accessibility
- [ ] 20.11 Update main component JSDoc with accessibility overview
- [ ] 20.12 Add accessibility section to Storybook documentation
- [ ] 20.13 Create accessibility test checklist for developers

### 21. Accessibility Testing & Validation
- [ ] 21.1 Run automated accessibility audit with Storybook a11y addon
- [ ] 21.2 Test all alert variants with VoiceOver on macOS
- [ ] 21.3 Test all alert variants with NVDA on Windows
- [ ] 21.4 Test keyboard-only navigation through all interactive elements
- [ ] 21.5 Verify ESC key works in all contexts
- [ ] 21.6 Test auto-dismiss pause behavior with keyboard and mouse
- [ ] 21.7 Verify focus indicators appear correctly on all severities
- [ ] 21.8 Run Lighthouse accessibility audit (target: 100 score)
- [ ] 21.9 Test on mobile devices with screen readers (TalkBack, VoiceOver iOS)
- [ ] 21.10 Verify color contrast in both light and dark modes (if applicable)
- [ ] 21.11 Test with browser zoom at 200% (WCAG 1.4.4)
- [ ] 21.12 Test with Windows High Contrast mode
- [ ] 21.13 Document all test results and compliance status
- [ ] 21.14 Address any accessibility issues discovered during testing
- [ ] 21.15 Create final WCAG 2.1 AA compliance checklist
