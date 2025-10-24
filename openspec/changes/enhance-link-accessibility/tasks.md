# Implementation Tasks

## 1. TypeScript Type Safety

- [ ] 1.1 Update `link.types.ts` to make `href` required instead of optional
- [ ] 1.2 Add JSDoc documentation explaining the required change and migration path
- [ ] 1.3 Update TypeScript type tests if they exist

## 2. Runtime Validation (Development Mode)

- [ ] 2.1 Add dev-mode validation for icon-only links without `aria-label` or `aria-labelledby`
- [ ] 2.2 Implement helper function to detect if children contain only icons/SVGs
- [ ] 2.3 Add console.warn messages with helpful accessibility guidance
- [ ] 2.4 Ensure validation only runs in `process.env.NODE_ENV !== 'production'`

## 3. SCSS Accessibility Improvements

- [ ] 3.1 Add `@media (prefers-reduced-motion: reduce)` media query
  - [ ] Disable transitions (`--link-transition: none`)
  - [ ] Disable scale transforms on button-styled links
- [ ] 3.2 Update default transition duration from 0.75s to 0.2s
- [ ] 3.3 Add minimum touch target sizes for button-styled links
  - [ ] Set `min-height: 2.75rem` (44px)
  - [ ] Set `min-width: 2.75rem` (44px)
- [ ] 3.4 Update visited link color to use distinct value instead of `currentColor`
  - [ ] Define new CSS custom property `--link-visited-color`
  - [ ] Set default to accessible purple: `#5a3284`
- [ ] 3.5 Enhance hover state with opacity feedback
  - [ ] Add `opacity: 0.8` to hover state

## 4. Storybook Documentation

- [ ] 4.1 Add story demonstrating `prefers-reduced-motion` support
- [ ] 4.2 Add story showing touch target sizing for mobile
- [ ] 4.3 Add story with dev console warnings for missing aria-label
- [ ] 4.4 Update existing stories to use required `href` attribute
- [ ] 4.5 Add accessibility notes to story descriptions

## 5. Testing

- [ ] 5.1 Write unit tests for icon-only link validation warnings
- [ ] 5.2 Write unit tests for required href enforcement
- [ ] 5.3 Add visual regression tests for touch target sizes
- [ ] 5.4 Test reduced motion behavior with media query mocking
- [ ] 5.5 Verify visited link color contrast meets WCAG 1.4.3 (4.5:1 ratio)

## 6. Build & Compilation

- [ ] 6.1 Run `npm run build` in packages/fpkit/
- [ ] 6.2 Verify SCSS compiles without errors
- [ ] 6.3 Check compiled CSS includes media queries
- [ ] 6.4 Verify TypeScript builds with required href

## 7. Validation & Documentation

- [ ] 7.1 Run `npm run lint-fix` to fix any linting issues
- [ ] 7.2 Run all tests with `npm test`
- [ ] 7.3 Build Storybook and verify all stories render correctly
- [ ] 7.4 Update component JSDoc with accessibility improvements
- [ ] 7.5 Add migration notes for breaking change (required href)
- [ ] 7.6 Test with screen readers (VoiceOver/NVDA) if possible
- [ ] 7.7 Validate with `openspec validate enhance-link-accessibility --strict`

## Dependencies

- Task 2 depends on Task 1 (types must be updated before runtime validation)
- Task 4 depends on Tasks 1-3 (stories need updated component)
- Task 5 depends on Tasks 1-3 (tests need implementation)
- Task 6 depends on all implementation tasks (1-3)
- Task 7 must be completed last

## Parallelizable Work

- Tasks 1, 2, and 3 can be worked on in parallel by different developers
- Task 4 (Storybook) can be developed alongside Task 5 (Testing)
