# Design System Theming Specification

## ADDED Requirements

### Requirement: CSS Variable Naming Convention

All CSS custom properties in the @fpkit/acss library SHALL follow a consistent, hierarchical naming pattern to enable predictable customization and better developer experience.

The naming pattern SHALL be: `--{component}-{element}-{variant}-{property}-{modifier}` where:
- **component** (required): Component name in kebab-case (`btn`, `alert`, `card`, `nav`, etc.)
- **element** (optional): Sub-element name for complex components (`header`, `footer`, `body`, `title`)
- **variant** (optional): Visual or semantic variant (`primary`, `secondary`, `error`, `success`, `warning`)
- **property** (required): CSS property name using approved abbreviations or full words
- **modifier** (optional): Property modifier for compound properties (`offset`, `width`, `style`)

Components SHALL prefix all custom properties with their component name to prevent naming collisions and enable IDE autocomplete by component.

#### Scenario: Basic component property variable

- **WHEN** a component defines a background color variable
- **THEN** the variable SHALL be named `--{component}-bg`
- **AND** the variable SHALL be scoped to the component
- **EXAMPLE**: `--btn-bg`, `--card-bg`, `--alert-bg`

#### Scenario: Variant-specific property variable

- **WHEN** a component has multiple style variants with different colors
- **THEN** the variable SHALL be named `--{component}-{variant}-{property}`
- **AND** the variant name SHALL come before the property name
- **EXAMPLE**: `--btn-primary-bg`, `--alert-error-border`, `--btn-secondary-color`

#### Scenario: State-specific property variable

- **WHEN** a component has interactive states with custom styling
- **THEN** the variable SHALL be named `--{component}-{state}-{property}`
- **AND** the state name SHALL follow CSS pseudo-class names (hover, focus, active, disabled)
- **EXAMPLE**: `--btn-hover-bg`, `--link-focus-outline`, `--btn-disabled-opacity`

#### Scenario: Element-specific property variable

- **WHEN** a complex component has distinct visual sections
- **THEN** the variable SHALL be named `--{component}-{element}-{property}`
- **AND** the element name SHALL describe the sub-component (header, footer, body)
- **EXAMPLE**: `--card-header-padding`, `--dialog-footer-bg`, `--card-body-gap`

#### Scenario: Compound property variable

- **WHEN** a CSS property has multiple sub-properties
- **THEN** the variable SHALL include a modifier as the final segment
- **EXAMPLE**: `--btn-focus-outline-offset`, `--alert-border-width`, `--card-border-radius`

### Requirement: Approved Abbreviations

CSS custom properties SHALL use approved abbreviations for common CSS properties to balance brevity with clarity. The library SHALL maintain a definitive list of approved abbreviations and require full words for all other properties.

**Approved abbreviations:**
- `bg` for background or background-color
- `fs` for font-size
- `fw` for font-weight
- `radius` for border-radius (preferred over `border-radius`)
- `gap` for gap (no abbreviation needed, already short)

**Required full words:**
- `padding`, `padding-inline`, `padding-block` (NOT `p`, `px`, `py`)
- `margin`, `margin-inline`, `margin-block` (NOT `m`, `mx`, `my`)
- `color` (NOT `cl`, `c`)
- `border` (NOT `bdr`, `br`)
- `display` (NOT `dsp`, `d`)
- `width`, `min-width`, `max-width` (NOT `w`, `min-w`, `max-w`)
- `height`, `min-height`, `max-height` (NOT `h`, `min-h`, `max-h`)

The abbreviation list SHALL be documented in the CSS Variable Reference Guide and SHALL be updated through the OpenSpec proposal process if new abbreviations are needed.

#### Scenario: Using approved abbreviation

- **WHEN** a component defines a background color variable
- **THEN** the variable SHALL use `bg` abbreviation
- **AND** the full name SHALL be documented in comments or documentation
- **EXAMPLE**: `--btn-bg` (background), `--alert-error-bg` (background-color)

#### Scenario: Using full word for logical property

- **WHEN** a component defines padding using logical properties
- **THEN** the variable SHALL use the full logical property name
- **AND** the variable SHALL NOT use abbreviations like `px` or `py`
- **EXAMPLE**: `--btn-padding-inline` (NOT `--btn-px`), `--card-padding-block` (NOT `--card-py`)

#### Scenario: Using full word for clarity

- **WHEN** a component defines width, height, color, border, or display
- **THEN** the variable SHALL use the full property name
- **AND** single-letter abbreviations SHALL NOT be used
- **EXAMPLE**: `--input-width` (NOT `--input-w`), `--nav-height` (NOT `--nav-h`), `--btn-color` (NOT `--btn-cl`)

#### Scenario: Rejecting non-approved abbreviation

- **WHEN** a developer attempts to use a non-approved abbreviation
- **THEN** code review SHALL request the full property name
- **AND** the variable SHALL be renamed to comply with the standard
- **EXAMPLE**: `--btn-dsp` SHALL be changed to `--btn-display`, `--card-p` SHALL be changed to `--card-padding`

### Requirement: Variable Discovery and IDE Support

CSS custom properties SHALL be organized to optimize IDE autocomplete and variable discovery, enabling developers to efficiently find and customize component styles.

The hierarchical naming pattern SHALL group related variables by typing component prefixes, allowing developers to:
1. Type `--{component}-` to see all component variables
2. Type `--{component}-{variant}-` to see all variant-specific variables
3. Type `--{component}-{state}-` to see all state-specific variables
4. Type `--{component}-{element}-` to see all element-specific variables

Components SHALL define variables in a predictable order: base properties, variant properties, state properties, element properties.

#### Scenario: Discovering all button properties

- **WHEN** a developer types `--btn-` in their IDE
- **THEN** the autocomplete SHALL show all button-related variables
- **AND** the variables SHALL be grouped logically (base, primary, secondary, hover, focus, disabled)
- **EXAMPLE**: `--btn-bg`, `--btn-padding`, `--btn-primary-bg`, `--btn-hover-bg`, `--btn-focus-outline`

#### Scenario: Discovering variant-specific properties

- **WHEN** a developer types `--alert-error-` in their IDE
- **THEN** the autocomplete SHALL show all error alert variables
- **AND** all error-related styling SHALL be discoverable
- **EXAMPLE**: `--alert-error-bg`, `--alert-error-border`, `--alert-error-color`

#### Scenario: Discovering state-specific properties

- **WHEN** a developer types `--btn-hover-` in their IDE
- **THEN** the autocomplete SHALL show all hover state variables
- **AND** all hover styling SHALL be grouped together
- **EXAMPLE**: `--btn-hover-bg`, `--btn-hover-transform`, `--btn-hover-filter`

### Requirement: Migration Documentation

When CSS custom property names change due to refactoring, the library SHALL provide comprehensive migration documentation to help users update their customizations.

Migration documentation SHALL include:
1. A complete mapping of old variable names to new variable names
2. Find-and-replace patterns with regex examples
3. Component-by-component change lists
4. Code examples showing before and after customization
5. Testing guidance to verify migrations
6. Rollback instructions if issues occur

The library SHALL publish migration guides as part of major version releases that include breaking changes to CSS variable names.

#### Scenario: Migrating renamed variables

- **WHEN** a CSS variable is renamed in a breaking change
- **THEN** the migration guide SHALL list the old name and new name
- **AND** the guide SHALL provide a find-and-replace pattern
- **EXAMPLE**: `--btn-px` → `--btn-padding-inline`, find pattern: `--btn-px\b`, replace with: `--btn-padding-inline`

#### Scenario: Testing migrated customizations

- **WHEN** a user completes variable name migration
- **THEN** the migration guide SHALL provide a testing checklist
- **AND** the checklist SHALL include visual verification steps
- **EXAMPLE**: "1. Check button variants render correctly, 2. Verify hover states, 3. Test in both light and dark themes"

#### Scenario: Understanding breaking changes

- **WHEN** a user reads a CHANGELOG for a major version
- **THEN** the changelog SHALL clearly mark CSS variable breaking changes
- **AND** the changelog SHALL link to the migration guide
- **EXAMPLE**: "**BREAKING**: CSS variables renamed for consistency. See [MIGRATION.md](./MIGRATION.md) for details."

#### Scenario: Rolling back migration

- **WHEN** a user encounters issues after migrating variables
- **THEN** the migration guide SHALL provide rollback instructions
- **AND** the instructions SHALL allow reverting to previous version
- **EXAMPLE**: "To rollback: 1. Revert CSS changes, 2. Downgrade package version: `npm install @fpkit/acss@0.5.x`"

### Requirement: Documentation and Reference

The library SHALL maintain a comprehensive CSS Variable Reference Guide that documents the naming convention, approved abbreviations, and all available CSS custom properties for each component.

The reference guide SHALL include:
1. Explanation of the naming pattern with examples
2. Complete list of approved abbreviations with rationale
3. Component-by-component variable tables with descriptions
4. Real-world customization examples (at least 5 scenarios)
5. IDE setup tips for better autocomplete
6. Links to migration guides for major versions

The reference guide SHALL be updated whenever:
- New components are added with CSS variables
- Existing components add new customizable properties
- The naming standard is updated through OpenSpec proposals

#### Scenario: Finding all button variables

- **WHEN** a developer wants to customize a button
- **THEN** the CSS Variable Reference Guide SHALL list all button variables
- **AND** each variable SHALL have a description explaining its purpose
- **EXAMPLE**: Table with columns: Variable Name, Description, Default Value, Example Usage

#### Scenario: Learning the naming pattern

- **WHEN** a new contributor adds a component
- **THEN** the CSS Variable Reference Guide SHALL explain the naming pattern
- **AND** the guide SHALL provide examples for different component types
- **EXAMPLE**: "Simple components (Badge): `--badge-bg`, Complex components with elements (Card): `--card-header-padding`"

#### Scenario: Customizing component theme

- **WHEN** a user wants to apply custom brand colors
- **THEN** the CSS Variable Reference Guide SHALL provide theme customization examples
- **AND** the examples SHALL show complete working code
- **EXAMPLE**: Code snippet showing how to override `--btn-primary-bg`, `--btn-primary-color`, and `--btn-hover-bg` for brand consistency
