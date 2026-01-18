# Changelog

All notable changes to @fpkit/acss will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.2.0] - 2026-01-18

### Added
- **Fieldset component** with WCAG 2.1 Level AA accessibility compliance
- Enhanced section and legend styling in landmarks.css
- Improved landmark components styling for better semantic structure

### Changed
- Updated Fieldset component with comprehensive accessibility features
- Enhanced layout components with better landmark integration

## [3.7.0] - 2026-01-06

### Added
- Title component with size variants (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl) via `data-title` attribute
- Title component with color variants (primary, secondary, accent, danger, warning, success, info) via `data-title` attribute
- Comprehensive Storybook documentation for title size and color variants
- Responsive documentation improvements for layout components

### Fixed
- Columns component JSX syntax error in responsive examples
- Enhanced responsive documentation clarity for columns component

### Changed
- Layout components (Header, Main, Footer, Aside) marked as beta status in Storybook
- Improved story formatting and organization for layout components
- Updated Storybook stories with better examples and documentation

## [1.0.0-beta.0] - 2025-11-04

> **Beta Release** - This is a pre-release version for testing. Please test thoroughly and report any issues before the final 1.0.0 release.

### ⚠️ BREAKING CHANGES

This is a **major release** with breaking changes to CSS custom property names across three core components. See the [Migration Guide](./MIGRATION-v1.0.0.md) for complete migration instructions.

**Total Changes: 39 variables renamed + 10 new variables added**

### CSS Variables - Button Component

**26 variables renamed** for clarity and consistency:

#### Size Tokens (Pattern: `--btn-size-{size}`)
- ❌ `--btn-xs` → ✅ `--btn-size-xs`
- ❌ `--btn-sm` → ✅ `--btn-size-sm`
- ❌ `--btn-md` → ✅ `--btn-size-md`
- ❌ `--btn-lg` → ✅ `--btn-size-lg`

#### Logical Properties (Full Names)
- ❌ `--btn-px` → ✅ `--btn-padding-inline`
- ❌ `--btn-py` → ✅ `--btn-padding-block`

#### Visual Properties (Expanded Abbreviations)
- ❌ `--btn-rds` → ✅ `--btn-radius`
- ❌ `--btn-cl` → ✅ `--btn-color`
- ❌ `--btn-dsp` → ✅ `--btn-display`
- ❌ `--btn-bdr` → ✅ `--btn-border`
- ❌ `--btn-wspc` → ✅ `--btn-whitespace`
- ❌ `--btn-spc` → ✅ `--btn-spacing`

#### State Variables (Consistency)
- ❌ `--btn-hov-bg` → ✅ `--btn-hover-bg`

**Kept (Approved Abbreviations):**
- `--btn-fs` (font-size) ✅
- `--btn-bg` (background) ✅
- `--btn-fw` (font-weight) ✅

### CSS Variables - Form/Input Component

**12 variables renamed + 4 new state variables:**

#### Logical Properties
- ❌ `--input-px` → ✅ `--input-padding-inline`
- ❌ `--input-py` → ✅ `--input-padding-block`
- ❌ `--input-w` → ✅ `--input-width`

#### New Focus State Variables (WCAG 2.4.7 Compliance)
- ✨ `--input-focus-outline` - Custom focus indicator
- ✨ `--input-focus-outline-offset` - Focus outline offset

#### New Disabled State Variables
- ✨ `--input-disabled-bg` - Background when disabled
- ✨ `--input-disabled-opacity` - Opacity when disabled
- ✨ `--input-disabled-cursor` - Cursor style when disabled

**Kept (Approved Abbreviations):**
- `--input-fs` (font-size) ✅
- `--placeholder-fs` (placeholder font-size) ✅

### CSS Variables - Card Component

**1 variable renamed + 6 new element-scoped variables:**

#### Base Property (Expanded)
- ❌ `--card-p` → ✅ `--card-padding`

#### New Element-Scoped Variables (Granular Control)

**Header:**
- ✨ `--card-header-padding` - Header padding
- ✨ `--card-header-bg` - Header background color
- ✨ `--card-header-border-bottom` - Header bottom border

**Body:**
- ✨ `--card-body-padding` - Body content padding

**Footer:**
- ✨ `--card-footer-padding` - Footer padding
- ✨ `--card-footer-bg` - Footer background color
- ✨ `--card-footer-border-top` - Footer top border

**Kept (Already Good):**
- `--card-bg`, `--card-radius`, `--card-display`, `--card-direction`, `--card-gap` ✅

### Migration

**See [MIGRATION-v1.0.0.md](./MIGRATION-v1.0.0.md) for:**
- Complete before/after variable mapping tables
- Find-and-replace regex patterns for automated migration
- Migration examples for common scenarios
- Testing checklist to verify no visual regressions
- Troubleshooting guide for common issues

**Quick Migration:**
1. Update package: `npm install @fpkit/acss@^1.0.0`
2. Use find-and-replace patterns from migration guide
3. Test all component variants
4. Verify accessibility (focus indicators)

### Benefits

✅ **Predictable naming** - Type `--btn-` to see all button properties via IDE autocomplete
✅ **Modern CSS** - Logical properties (`--btn-padding-inline` vs ambiguous `--btn-px`)
✅ **Improved accessibility** - Explicit focus state variables for WCAG compliance
✅ **Element scoping** - Granular control over card headers, bodies, footers
✅ **Consistency** - Standardized naming pattern across all components
✅ **Better DX** - No more guessing what abbreviations mean

### Documentation

- 📚 Storybook updated with "Customization" stories for all refactored components
- 📝 Complete CSS variable reference in Storybook docs
- 🎨 Live examples demonstrating new variables
- ♿ Accessibility-focused examples (WCAG-compliant focus indicators)
- 🌓 Dark theme customization examples

---

## [0.6.2] - 2025-01-03

Previous release. See git history for details.

[1.0.0-beta.0]: https://github.com/fpkit/acss/compare/v0.6.2...v1.0.0-beta.0
[0.6.2]: https://github.com/fpkit/acss/releases/tag/v0.6.2
