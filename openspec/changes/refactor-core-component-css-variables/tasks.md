# Implementation Tasks

## 1. Button Component Refactoring

- [ ] 1.1 Read current `packages/fpkit/src/components/buttons/button.scss`
- [ ] 1.2 Create backup of button.scss
- [ ] 1.3 Refactor size tokens: `--btn-xs` → `--btn-size-xs`, etc. (4 variables)
- [ ] 1.4 Refactor logical properties: `--btn-px` → `--btn-padding-inline`, `--btn-py` → `--btn-padding-block`
- [ ] 1.5 Refactor visual properties: `--btn-rds` → `--btn-radius`, `--btn-cl` → `--btn-color`, `--btn-dsp` → `--btn-display`, `--btn-bdr` → `--btn-border`
- [ ] 1.6 Refactor whitespace/spacing: `--btn-wspc` → `--btn-whitespace`, `--btn-spc` → `--btn-spacing`
- [ ] 1.7 Standardize state variables: `--btn-hov-bg` → `--btn-hover-bg`
- [ ] 1.8 Add explicit variant variables: `--btn-primary-bg`, `--btn-primary-color`, `--btn-secondary-bg`, `--btn-secondary-border`
- [ ] 1.9 Update all references within button.scss to use new names
- [ ] 1.10 Verify button component renders correctly in browser
- [ ] 1.11 Test all button variants (sizes, colors, states)
- [ ] 1.12 Test button hover states
- [ ] 1.13 Test button focus states
- [ ] 1.14 Test button disabled state
- [ ] 1.15 Update `button.stories.tsx` to use new variable names in controls
- [ ] 1.16 Add Storybook customization examples with new variables
- [ ] 1.17 Run `npm run lint` on button files
- [ ] 1.18 Run `npm run sass:build` to compile SCSS
- [ ] 1.19 Verify no TypeScript errors in button component
- [ ] 1.20 Create migration table for button variables (old → new)

## 2. Form/Input Component Refactoring

- [ ] 2.1 Read current `packages/fpkit/src/components/form/form.scss`
- [ ] 2.2 Create backup of form.scss
- [ ] 2.3 Refactor logical properties: `--input-px` → `--input-padding-inline`, `--input-py` → `--input-padding-block`
- [ ] 2.4 Refactor sizing: `--input-w` → `--input-width`
- [ ] 2.5 Keep approved abbreviations: `--input-fs` (font-size)
- [ ] 2.6 Add missing focus state variables: `--input-focus-outline`, `--input-focus-outline-offset`
- [ ] 2.7 Add missing disabled state variables: `--input-disabled-bg`, `--input-disabled-opacity`
- [ ] 2.8 Update placeholder variables if needed: `--placeholder-fs`, `--placeholder-color`
- [ ] 2.9 Update all references within form.scss to use new names
- [ ] 2.10 Verify input renders correctly in browser
- [ ] 2.11 Test input focus state
- [ ] 2.12 Test input disabled state
- [ ] 2.13 Test input error state (if applicable)
- [ ] 2.14 Test textarea variant
- [ ] 2.15 Test select variant
- [ ] 2.16 Update form/input stories with new variable names
- [ ] 2.17 Add Storybook customization examples
- [ ] 2.18 Run accessibility tests (focus indicators meet WCAG standards)
- [ ] 2.19 Run `npm run lint` on form files
- [ ] 2.20 Run `npm run sass:build` to compile SCSS
- [ ] 2.21 Create migration table for form/input variables (old → new)

## 3. Card Component Refactoring

- [ ] 3.1 Read current `packages/fpkit/src/components/cards/card.scss`
- [ ] 3.2 Create backup of card.scss
- [ ] 3.3 Refactor abbreviated padding: `--card-p` → `--card-padding`
- [ ] 3.4 Verify existing good variables: `--card-bg`, `--card-radius`, `--card-display`, `--card-direction`, `--card-gap`
- [ ] 3.5 Add element-specific variables for complex cards: `--card-header-padding`, `--card-header-bg`, `--card-header-border-bottom`
- [ ] 3.6 Add body element variables: `--card-body-padding`
- [ ] 3.7 Add footer element variables: `--card-footer-padding`, `--card-footer-bg`
- [ ] 3.8 Update all references within card.scss to use new names
- [ ] 3.9 Verify card component renders correctly
- [ ] 3.10 Test basic card layout
- [ ] 3.11 Test card with header
- [ ] 3.12 Test card with footer
- [ ] 3.13 Test card with header + body + footer
- [ ] 3.14 Update card.stories.tsx with new variable names
- [ ] 3.15 Add Storybook examples showing element-specific customization
- [ ] 3.16 Run `npm run lint` on card files
- [ ] 3.17 Run `npm run sass:build` to compile SCSS
- [ ] 3.18 Create migration table for card variables (old → new)

## 4. Testing & Validation

- [ ] 4.1 Run full test suite: `npm test`
- [ ] 4.2 Verify all existing tests pass without modification
- [ ] 4.3 Run Vitest with UI and coverage: `npm run test:ui`
- [ ] 4.4 Verify no test coverage regressions
- [ ] 4.5 Start Storybook: `npm start` (from root)
- [ ] 4.6 Visually verify all button variants in Storybook
- [ ] 4.7 Visually verify all form/input variants in Storybook
- [ ] 4.8 Visually verify all card variants in Storybook
- [ ] 4.9 Run Storybook accessibility addon checks
- [ ] 4.10 Verify no new a11y violations
- [ ] 4.11 Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] 4.12 Run full build: `npm run build` (from fpkit directory)
- [ ] 4.13 Verify build succeeds without errors
- [ ] 4.14 Check build output in `libs/` directory
- [ ] 4.15 Run linter: `npm run lint`
- [ ] 4.16 Fix any linting errors with `npm run lint-fix`
- [ ] 4.17 Test in demo app (astro-builds) if applicable
- [ ] 4.18 Verify compiled CSS contains new variable names
- [ ] 4.19 Grep for old variable names to ensure none remain
- [ ] 4.20 Visual regression testing (compare before/after screenshots)

## 5. Migration Documentation

- [ ] 5.1 Create `MIGRATION-v{X}.md` file in root
- [ ] 5.2 Write "Overview" section explaining breaking changes
- [ ] 5.3 Add "Quick Summary" with total number of changed variables
- [ ] 5.4 Create "Button Component" section with before/after table (26 variables)
- [ ] 5.5 Create "Form/Input Component" section with before/after table (12 variables)
- [ ] 5.6 Create "Card Component" section with before/after table (8 variables)
- [ ] 5.7 Add "Find and Replace Patterns" section with regex examples
- [ ] 5.8 Include example: Find `--btn-px\b`, Replace `--btn-padding-inline`
- [ ] 5.9 Add "Testing Your Migration" checklist
- [ ] 5.10 Include "Before You Migrate" preparation steps
- [ ] 5.11 Add "After Migration" verification steps
- [ ] 5.12 Create "Common Migration Scenarios" with code examples
- [ ] 5.13 Add "Troubleshooting" section for common issues
- [ ] 5.14 Include "Rollback Instructions" if users encounter problems
- [ ] 5.15 Add "Frequently Asked Questions" section
- [ ] 5.16 Proofread migration guide for clarity
- [ ] 5.17 Test all find-and-replace patterns on sample code
- [ ] 5.18 Get peer review of migration guide

## 6. CHANGELOG Updates

- [ ] 6.1 Read current `CHANGELOG.md`
- [ ] 6.2 Create new version section for major release
- [ ] 6.3 Add "BREAKING CHANGES" subsection at top
- [ ] 6.4 List all CSS variable changes with summary
- [ ] 6.5 Link to migration guide: `See [MIGRATION-v{X}.md](./MIGRATION-v{X}.md)`
- [ ] 6.6 Add "CSS Variables" section listing specific changes
- [ ] 6.7 Document Button component changes
- [ ] 6.8 Document Form/Input component changes
- [ ] 6.9 Document Card component changes
- [ ] 6.10 Add "Migration" section with quick tips
- [ ] 6.11 Add "Benefits" section explaining improvements
- [ ] 6.12 Include release date
- [ ] 6.13 Follow existing CHANGELOG format/style
- [ ] 6.14 Verify all links work

## 7. Storybook Documentation

- [ ] 7.1 Update button.stories.tsx controls to reflect new variable names
- [ ] 7.2 Add "Customization" story for Button showing variable overrides
- [ ] 7.3 Add code example in Button docs showing how to customize with new variables
- [ ] 7.4 Update form.stories.tsx controls
- [ ] 7.5 Add "Customization" story for Form/Input
- [ ] 7.6 Add code example in Form docs
- [ ] 7.7 Update card.stories.tsx controls
- [ ] 7.8 Add "Customization" story for Card showing header/footer styling
- [ ] 7.9 Add code example in Card docs
- [ ] 7.10 Add "CSS Variables" section to each component's Storybook docs page
- [ ] 7.11 List all available variables in docs
- [ ] 7.12 Include default values where helpful
- [ ] 7.13 Verify all Storybook stories load without errors
- [ ] 7.14 Test interactive controls for new variables
- [ ] 7.15 Ensure documentation renders correctly in Storybook

## 8. Version Management

- [ ] 8.1 Determine next major version number (e.g., 1.0.0 or 2.0.0)
- [ ] 8.2 Update `packages/fpkit/package.json` version
- [ ] 8.3 Verify version follows semantic versioning (major bump for breaking changes)
- [ ] 8.4 Update root `package-lock.json` if needed
- [ ] 8.5 Tag version for Lerna: `git tag v{X}.0.0`
- [ ] 8.6 Verify package.json version matches CHANGELOG version

## 9. Beta Release (Optional but Recommended)

- [ ] 9.1 Create beta branch: `release/v{X}.0.0-beta`
- [ ] 9.2 Publish beta to npm: `npm publish --tag beta`
- [ ] 9.3 Announce beta release to users/team
- [ ] 9.4 Create test project using beta version
- [ ] 9.5 Apply migrations in test project
- [ ] 9.6 Document any issues found
- [ ] 9.7 Gather feedback from at least 2 beta testers
- [ ] 9.8 Incorporate feedback and fix any issues
- [ ] 9.9 Publish second beta if needed
- [ ] 9.10 Confirm beta is stable before final release

## 10. Final Release

- [ ] 10.1 Merge all changes to main branch
- [ ] 10.2 Verify all tests pass on main
- [ ] 10.3 Run full build on main
- [ ] 10.4 Publish to npm: `npm run release` (from fpkit directory)
- [ ] 10.5 Verify package published successfully
- [ ] 10.6 Create GitHub release with changelog
- [ ] 10.7 Tag release in Git
- [ ] 10.8 Announce release to users
- [ ] 10.9 Update documentation site (if applicable)
- [ ] 10.10 Share migration guide prominently
- [ ] 10.11 Monitor for issues after release
- [ ] 10.12 Respond to user questions/issues quickly

## 11. Post-Release

- [ ] 11.1 Monitor npm download stats
- [ ] 11.2 Watch for GitHub issues related to migration
- [ ] 11.3 Collect user feedback on new variable names
- [ ] 11.4 Document lessons learned for future refactoring
- [ ] 11.5 Plan next phase (remaining components)
- [ ] 11.6 Update internal documentation with migration metrics
- [ ] 11.7 Celebrate successful release! 🎉

## Notes

- **Critical**: Do NOT skip testing steps - these are breaking changes
- **Order Matters**: Complete components sequentially to catch issues early
- **Git Commits**: Make atomic commits per component for easier rollback if needed
- **Backup Files**: Keep backups until changes are verified working
- **Communication**: Keep users informed throughout beta and release process

## Acceptance Criteria

- [ ] All 46 variables renamed according to standard
- [ ] All tests pass without modification
- [ ] All components render correctly in Storybook
- [ ] No visual regressions detected
- [ ] Migration guide complete and tested
- [ ] CHANGELOG documents all breaking changes
- [ ] Beta tested by at least 2 users (if beta release used)
- [ ] Build succeeds without errors or warnings
- [ ] Lint passes without errors
- [ ] Documentation updated with new variable names
- [ ] Customization examples work as documented
- [ ] Final release published to npm successfully
