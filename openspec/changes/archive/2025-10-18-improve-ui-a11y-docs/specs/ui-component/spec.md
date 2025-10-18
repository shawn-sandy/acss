# UI Component Specification

## ADDED Requirements

### Requirement: Accessibility Documentation

The UI component documentation SHALL include comprehensive accessibility guidance to help developers create WCAG 2.1 AA compliant implementations.

#### Scenario: Interactive element examples with accessible names

- **WHEN** a developer views the UI component JSDoc
- **THEN** they SHALL see examples showing both correct and incorrect usage of accessible names for buttons, links, and other interactive elements
- **AND** examples SHALL include `aria-label`, `aria-labelledby`, and visible text patterns
- **AND** examples SHALL explicitly mark good patterns with ✅ and bad patterns with ❌

#### Scenario: ARIA attribute forwarding documentation

- **WHEN** a developer needs to add ARIA attributes to a UI component instance
- **THEN** the JSDoc SHALL explicitly document that all ARIA attributes are forwarded through props spreading
- **AND** the documentation SHALL list common ARIA attributes that are supported (aria-label, aria-expanded, aria-describedby, role, etc.)

#### Scenario: Focus indicator responsibility documentation

- **WHEN** a developer uses UI as an interactive element (button, link, input)
- **THEN** the JSDoc SHALL document that consumers are responsible for ensuring focus indicators meet WCAG 2.4.7 (3:1 contrast ratio)
- **AND** examples SHALL show how to provide custom focus styling

### Requirement: TypeScript Accessibility Patterns

The UI component documentation SHALL provide TypeScript examples for creating accessible higher-level components.

#### Scenario: Type-safe accessible button wrapper

- **WHEN** a developer wants to create a custom button component using UI
- **THEN** the JSDoc SHALL include a TypeScript example showing proper type definitions with accessibility props
- **AND** the example SHALL demonstrate extending `UIProps<'button'>` with additional custom props
- **AND** the example SHALL show ref forwarding with correct types

#### Scenario: Polymorphic component with accessible name enforcement

- **WHEN** a developer wants to enforce accessible names at the type level
- **THEN** the documentation SHALL provide example utility types that require either `aria-label` or `children` for interactive elements
- **AND** examples SHALL show how to create type-safe wrappers that catch accessibility issues at compile time

### Requirement: Semantic HTML Guidance

The UI component documentation SHALL guide developers toward using semantic HTML over generic containers.

#### Scenario: Semantic element recommendations

- **WHEN** a developer is choosing which element type to render
- **THEN** the JSDoc SHALL include examples showing when to use semantic elements (`button`, `a`, `nav`, `header`) vs generic containers (`div`, `span`)
- **AND** examples SHALL demonstrate that interactive functionality requires semantic interactive elements or proper ARIA roles

### Requirement: Default Element Type Consistency

The UI component SHALL have consistent default element type between TypeScript definition and runtime implementation.

#### Scenario: Type definition matches implementation

- **WHEN** a developer uses `<UI>` without the `as` prop
- **THEN** the rendered element SHALL match the TypeScript default type
- **AND** both the type definition and implementation SHALL use the same default value (`div` or `span`, consistently chosen)

#### Scenario: Default element is documented

- **WHEN** a developer reads the UI component JSDoc
- **THEN** the documentation SHALL clearly state what element is rendered by default
- **AND** the stated default SHALL match both TypeScript and runtime behavior

### Requirement: Accessibility Testing Guidance

The UI component documentation SHALL provide guidance for testing accessibility in consuming applications.

#### Scenario: Recommended testing tools

- **WHEN** a developer wants to test accessibility of components built with UI
- **THEN** the documentation or README SHALL recommend appropriate testing tools (eslint-plugin-jsx-a11y, jest-axe, Storybook a11y addon)
- **AND** examples SHALL show basic usage patterns for automated accessibility testing

#### Scenario: Manual testing checklist

- **WHEN** a developer builds interactive components with UI
- **THEN** the documentation SHALL provide a basic accessibility testing checklist
- **AND** the checklist SHALL include keyboard navigation, screen reader testing, and focus indicator verification

### Requirement: Storybook Accessibility Examples

The UI component Storybook stories SHALL include accessibility-focused examples demonstrating proper usage patterns.

#### Scenario: Accessible interactive elements story

- **WHEN** a developer views the UI component in Storybook
- **THEN** there SHALL be a story showcasing accessible button, link, and custom interactive element implementations
- **AND** each example SHALL demonstrate proper accessible names and ARIA attributes

#### Scenario: Accessibility violations story

- **WHEN** a developer views the UI component in Storybook
- **THEN** there SHOULD be a story showing common accessibility anti-patterns with clear warnings
- **AND** the story description SHALL explain why each pattern is problematic and how to fix it

#### Scenario: Storybook a11y addon integration

- **WHEN** a developer runs Storybook for the UI component
- **THEN** the Storybook a11y addon SHALL be active and report accessibility violations
- **AND** accessibility-focused stories SHALL pass automated checks without violations
