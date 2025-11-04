# UI Component Specification - CSS Variable Refactoring

## ADDED Requirements

### Requirement: Button Component CSS Variables

The Button component SHALL provide CSS custom properties following the established naming convention to enable users to customize button appearance consistently across all variants and states.

Button CSS variables SHALL follow the pattern `--btn-{variant|state}-{property}` where properties use approved abbreviations (`bg`, `fs`, `fw`) or full words for clarity.

The Button component SHALL support:
1. Size tokens for consistent sizing across variants
2. Base property customization (padding, border, colors, typography)
3. Variant-specific styling (primary, secondary, tertiary)
4. State-specific styling (hover, focus, disabled, active)

All button CSS variables SHALL use logical properties (`padding-inline`, `padding-block`) for better internationalization support.

#### Scenario: Customizing button base properties

- **WHEN** a user wants to customize the default button appearance
- **THEN** they SHALL be able to override base property variables
- **AND** the variables SHALL use clear, predictable names
- **EXAMPLE**: Override `--btn-padding-inline`, `--btn-padding-block`, `--btn-radius`, `--btn-bg`, `--btn-color`

#### Scenario: Customizing button size tokens

- **WHEN** a user wants to adjust button sizes
- **THEN** they SHALL override size token variables
- **AND** size tokens SHALL follow the pattern `--btn-size-{size}`
- **EXAMPLE**: `--btn-size-xs: 0.75rem`, `--btn-size-sm: 0.875rem`, `--btn-size-md: 1rem`, `--btn-size-lg: 1.25rem`

#### Scenario: Customizing button variant colors

- **WHEN** a user wants to apply custom brand colors to button variants
- **THEN** they SHALL override variant-specific color variables
- **AND** variant variables SHALL follow the pattern `--btn-{variant}-{property}`
- **EXAMPLE**: `--btn-primary-bg: #0066cc`, `--btn-primary-color: white`, `--btn-secondary-bg: transparent`, `--btn-secondary-border: 1px solid currentColor`

#### Scenario: Customizing button hover states

- **WHEN** a user wants to customize button hover effects
- **THEN** they SHALL override state-specific variables
- **AND** state variables SHALL follow the pattern `--btn-hover-{property}`
- **EXAMPLE**: `--btn-hover-bg: #0052a3`, `--btn-hover-transform: translateY(-1px)`, `--btn-hover-filter: brightness(1.05)`

#### Scenario: Customizing button focus indicators

- **WHEN** a user wants to customize focus styles for accessibility
- **THEN** they SHALL override focus-specific variables
- **AND** focus variables SHALL follow the pattern `--btn-focus-{property}`
- **EXAMPLE**: `--btn-focus-outline: 2px solid currentColor`, `--btn-focus-outline-offset: 2px`

#### Scenario: Using logical properties for padding

- **WHEN** button padding is customized
- **THEN** the variables SHALL use logical property names
- **AND** logical properties SHALL be spelled out fully (not abbreviated)
- **EXAMPLE**: `--btn-padding-inline` (NOT `--btn-px`), `--btn-padding-block` (NOT `--btn-py`)

### Requirement: Form Input Component CSS Variables

The Form/Input component SHALL provide CSS custom properties following the established naming convention to enable users to customize input field appearance and states.

Form input CSS variables SHALL follow the pattern `--input-{state}-{property}` where properties use approved abbreviations or full words.

The Form/Input component SHALL support:
1. Base property customization (padding, border, background, typography)
2. State-specific styling (focus, disabled, error, valid)
3. Placeholder styling
4. Consistent sizing with logical properties

#### Scenario: Customizing input base properties

- **WHEN** a user wants to customize the default input appearance
- **THEN** they SHALL be able to override base property variables
- **AND** the variables SHALL use clear names with logical properties
- **EXAMPLE**: `--input-padding-inline`, `--input-padding-block`, `--input-border`, `--input-bg`, `--input-color`, `--input-radius`

#### Scenario: Customizing input focus state

- **WHEN** a user wants to customize input focus indicators for accessibility
- **THEN** they SHALL override focus-specific variables
- **AND** focus outline SHALL meet WCAG 2.4.7 requirements (3:1 contrast ratio)
- **EXAMPLE**: `--input-focus-outline: 2px solid #0066cc`, `--input-focus-outline-offset: 0`, `--input-focus-border-color: #0066cc`

#### Scenario: Customizing input disabled state

- **WHEN** a user wants to customize disabled input appearance
- **THEN** they SHALL override disabled-specific variables
- **AND** disabled styles SHALL clearly indicate non-interactive state
- **EXAMPLE**: `--input-disabled-bg: #e9ecef`, `--input-disabled-opacity: 0.6`, `--input-disabled-cursor: not-allowed`

#### Scenario: Customizing placeholder text

- **WHEN** a user wants to customize placeholder styling
- **THEN** they SHALL override placeholder-specific variables
- **AND** placeholder variables SHALL follow the pattern `--placeholder-{property}`
- **EXAMPLE**: `--placeholder-color: #6c757d`, `--placeholder-fs: 0.875rem`, `--placeholder-style: italic`

#### Scenario: Using logical properties for input padding

- **WHEN** input padding is customized
- **THEN** the variables SHALL use logical property names
- **AND** logical properties SHALL be spelled out fully
- **EXAMPLE**: `--input-padding-inline: 0.75rem` (NOT `--input-px`), `--input-padding-block: 0.5rem` (NOT `--input-py`)

#### Scenario: Customizing input width

- **WHEN** a user wants to control default input width
- **THEN** they SHALL override the width variable using the full word
- **AND** the variable SHALL NOT use single-letter abbreviations
- **EXAMPLE**: `--input-width: 100%` (NOT `--input-w`)

### Requirement: Card Component CSS Variables

The Card component SHALL provide CSS custom properties following the established naming convention to enable users to customize card layout and element-specific styling.

Card CSS variables SHALL follow the pattern `--card-{element}-{property}` where element represents sub-components (header, body, footer) when applicable.

The Card component SHALL support:
1. Base card property customization (padding, background, border, layout)
2. Element-specific styling for complex card layouts (header, body, footer)
3. Consistent naming without single-letter abbreviations

#### Scenario: Customizing card base properties

- **WHEN** a user wants to customize the default card appearance
- **THEN** they SHALL be able to override base property variables
- **AND** the variables SHALL use full property names
- **EXAMPLE**: `--card-padding: 1.5rem` (NOT `--card-p`), `--card-bg: white`, `--card-radius: 0.5rem`, `--card-gap: 1rem`

#### Scenario: Customizing card header

- **WHEN** a user wants to customize card header styling separately
- **THEN** they SHALL override header-specific variables
- **AND** header variables SHALL follow the pattern `--card-header-{property}`
- **EXAMPLE**: `--card-header-padding: 1rem 1.5rem`, `--card-header-bg: #f8f9fa`, `--card-header-border-bottom: 1px solid #dee2e6`

#### Scenario: Customizing card body

- **WHEN** a user wants to customize card body styling separately
- **THEN** they SHALL override body-specific variables
- **AND** body variables SHALL follow the pattern `--card-body-{property}`
- **EXAMPLE**: `--card-body-padding: 1.5rem`, `--card-body-gap: 1rem`

#### Scenario: Customizing card footer

- **WHEN** a user wants to customize card footer styling separately
- **THEN** they SHALL override footer-specific variables
- **AND** footer variables SHALL follow the pattern `--card-footer-{property}`
- **EXAMPLE**: `--card-footer-padding: 1rem 1.5rem`, `--card-footer-bg: #f8f9fa`, `--card-footer-border-top: 1px solid #dee2e6`

#### Scenario: Using full property names for card padding

- **WHEN** card padding is customized
- **THEN** the variable SHALL use the full word "padding"
- **AND** single-letter abbreviations SHALL NOT be used
- **EXAMPLE**: `--card-padding: 1.5rem` (NOT `--card-p`)

#### Scenario: Customizing card layout properties

- **WHEN** a user wants to control card layout behavior
- **THEN** they SHALL override layout-specific variables
- **AND** layout variables SHALL use full CSS property names
- **EXAMPLE**: `--card-display: flex`, `--card-direction: column`, `--card-gap: 1rem`, `--card-align: stretch`

### Requirement: CSS Variable Migration Support

When CSS custom property names are changed in a breaking release, the library SHALL provide comprehensive migration documentation and tooling to help users update their customizations.

Migration support SHALL include:
1. Complete before/after mapping of all changed variables
2. Find-and-replace patterns with regex examples
3. Component-by-component migration tables
4. Verification checklist for testing migrations
5. Rollback instructions if issues occur

#### Scenario: Finding old variable names in codebase

- **WHEN** a user needs to migrate from old variable names
- **THEN** the migration guide SHALL provide regex patterns for finding old names
- **AND** patterns SHALL account for word boundaries to avoid partial matches
- **EXAMPLE**: Find pattern: `--btn-px\b`, Replace: `--btn-padding-inline`

#### Scenario: Migrating button variables

- **WHEN** a user needs to update button customizations
- **THEN** the migration guide SHALL provide a complete table of button variable changes
- **AND** the table SHALL include old name, new name, and example usage
- **EXAMPLE TABLE**:
  | Old Variable | New Variable | Example Value |
  |---|---|---|
  | `--btn-px` | `--btn-padding-inline` | `1rem` |
  | `--btn-py` | `--btn-padding-block` | `0.5rem` |
  | `--btn-rds` | `--btn-radius` | `0.375rem` |

#### Scenario: Verifying migration success

- **WHEN** a user completes variable name migration
- **THEN** the migration guide SHALL provide a testing checklist
- **AND** the checklist SHALL include visual and functional verification steps
- **EXAMPLE CHECKLIST**:
  - [ ] All button variants render correctly
  - [ ] Hover states work as expected
  - [ ] Focus indicators are visible
  - [ ] Form inputs have correct styling
  - [ ] Cards display properly with custom styles

#### Scenario: Rolling back after migration issues

- **WHEN** a user encounters problems after migrating
- **THEN** the migration guide SHALL provide rollback instructions
- **AND** instructions SHALL include version downgrade steps
- **EXAMPLE**: "To rollback: 1. Revert CSS changes, 2. Run `npm install @fpkit/acss@0.5.11`"

### Requirement: Storybook Customization Examples

Each refactored component SHALL include Storybook stories demonstrating CSS variable customization using the new naming convention.

Storybook customization examples SHALL show:
1. Basic property overrides with new variable names
2. Variant-specific customization
3. State-specific customization
4. Complete theme customization scenarios

#### Scenario: Button customization example in Storybook

- **WHEN** a developer views Button stories in Storybook
- **THEN** there SHALL be a "Customization" story showing variable overrides
- **AND** the story SHALL include code examples with new variable names
- **EXAMPLE**: Story showing how to override `--btn-primary-bg`, `--btn-padding-inline`, `--btn-radius` for custom branding

#### Scenario: Form input customization example

- **WHEN** a developer views Form/Input stories in Storybook
- **THEN** there SHALL be a "Customization" story showing focus and disabled state styling
- **AND** the story SHALL include accessibility-compliant focus indicator examples
- **EXAMPLE**: Story showing `--input-focus-outline`, `--input-disabled-bg` customization

#### Scenario: Card customization example

- **WHEN** a developer views Card stories in Storybook
- **THEN** there SHALL be a "Customization" story showing element-specific styling
- **AND** the story SHALL demonstrate header, body, and footer customization
- **EXAMPLE**: Story showing `--card-header-bg`, `--card-body-padding`, `--card-footer-border-top` usage

#### Scenario: Dark theme example

- **WHEN** a developer wants to implement dark mode theming
- **THEN** Storybook stories SHALL include dark theme customization examples
- **AND** examples SHALL show how to override multiple variables for cohesive theming
- **EXAMPLE**: Dark mode story overriding button, input, and card background/color variables
