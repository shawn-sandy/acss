# @fpkit/acss Documentation

Welcome to the @fpkit/acss documentation! This collection of guides helps you build accessible, maintainable applications using the fpkit component library.

> **New here?** Start with the [Design System v6 Overview](./DESIGN-SYSTEM-v6.md) — a one-page narrative of everything that shipped in v6.x.
> **Upgrading?** Jump to the [minimum-viable upgrade checklist](../MIGRATION-v7.md#minimum-viable-v6x-upgrade).

---

## 📚 Guides

### [Theming Guide](./guides/theming.md)

Ship light/dark theming without a flash of the wrong theme on first paint.

**Topics:**
- `ThemeProvider`, `useTheme`, `ThemeToggle`
- How the `data-theme` attribute powers runtime switching
- `getThemeFoucScript()` for SSR (Astro, Next.js, Remix)
- Creating a custom theme
- Accessibility notes (`prefers-color-scheme`, toggle labeling)

**Use when:**
- Adding light/dark mode to an app
- Preventing theme flash in SSR frameworks
- Building a custom theme on top of fpkit

---

### [Design Tokens Guide](./guides/design-tokens.md)

Consume `@fpkit/acss/tokens` — the DTCG-compliant design token artifact that powers the Figma bridge and the public docs site.

**Topics:**
- Shipped categories: color, motion, breakpoints (typography and spacing are on the roadmap)
- The JSON artifact vs. the typed TS module (`var()` references)
- Feeding Figma bridges, docs sites, and custom CSS generators
- The extract-tokens + Style Dictionary pipeline
- Relationship to CSS variables

**Use when:**
- Building a docs site or design-system tool that reads fpkit tokens
- Bridging fpkit values into Figma variables
- Generating custom CSS output from the same source

---

### [CSS Variables Guide](./guides/css-variables.md)

Learn how to discover, customize, and override CSS custom properties in fpkit components.

**Topics:**
- Understanding the naming convention
- Discovering available variables
- Customization strategies (global, theme, component-specific)
- rem units and accessibility
- Framework integration (React, Next.js, CSS Modules)

**Use when:**
- Customizing component appearance
- Creating themes
- Building design systems
- Understanding fpkit styling architecture

---

### [Composition Guide](./guides/composition.md)

Master component composition patterns to build custom components by combining fpkit primitives.

**Topics:**
- Composition vs creation decision tree
- Common composition patterns (container + content, conditional, enhanced wrapper, compound)
- Real-world examples (AlertDialog, IconButton, TagInput)
- Anti-patterns to avoid
- TypeScript support for compositions

**Use when:**
- Building custom components
- Extending fpkit functionality
- Creating application-specific components
- Deciding whether to compose or create from scratch

---

### [Accessibility Guide](./guides/accessibility.md)

Understand and maintain WCAG 2.1 Level AA compliance when using and composing fpkit components.

**Topics:**
- Core accessibility principles
- ARIA attributes and patterns
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast requirements
- Testing accessibility (manual and automated)

**Use when:**
- Ensuring accessible applications
- Testing for WCAG compliance
- Implementing keyboard navigation
- Adding ARIA attributes
- Composing accessible custom components

---

### [Architecture Guide](./guides/architecture.md)

Learn fpkit's architectural patterns, component structure, and how to work effectively with the library.

**Topics:**
- Polymorphic UI component foundation
- Simple vs compound component patterns
- TypeScript support and prop types
- Composition patterns
- Styling architecture (data attributes, CSS variables)
- Props patterns and conventions
- Framework integration

**Use when:**
- Understanding fpkit component structure
- Working with polymorphic `as` prop
- Extending component props
- Integrating with frameworks (React, Next.js)
- Building type-safe compositions

---

### [Testing Guide](./guides/testing.md)

Test applications and custom components built with fpkit using Vitest and React Testing Library.

**Topics:**
- Vitest and React Testing Library setup
- Testing composed components
- Query best practices (getByRole, getByLabelText)
- Event testing (clicks, keyboard, forms)
- Accessibility testing (automated with jest-axe)
- Async testing and loading states
- Mock functions and test organization

**Use when:**
- Setting up test infrastructure
- Testing custom compositions
- Testing user interactions
- Testing accessibility
- Writing integration tests

---

### [Storybook Guide](./guides/storybook.md)

Document custom components and compositions using Storybook for development and showcase.

**Topics:**
- Storybook setup and configuration
- Story structure and patterns
- Documenting composed components
- CSS variable customization stories
- Interactive testing with play functions
- ArgTypes configuration
- Accessibility testing in Storybook

**Use when:**
- Documenting custom components
- Creating component showcases
- Interactive component development
- Testing components in isolation
- Building internal component libraries

---

### [Component Lifecycle Guide](./guides/component-lifecycle.md)

Understand the lifecycle tags (`experimental`, `beta`, `rc`, `stable`, `deprecated`) and the promotion criteria between them.

**Topics:**
- Lifecycle stage definitions and what they promise users
- How tags are applied in Storybook story meta objects
- Coverage signals that feed the [Component Maturity Dashboard](../../../apps/astro-builds/src/pages/status.astro): `hasTests`, `a11y-verified`, `dark-mode-verified`
- Promotion checklist for moving a component stage up (or demoting it)

**Use when:**
- Authoring a new component and choosing its initial lifecycle stage
- Reviewing whether a component is ready to promote from beta → rc → stable
- Reading the `/status` dashboard and interpreting its signals

---

### [Component Maturity Dashboard Guide](./guides/maturity-dashboard.md)

Understand the `/status` page — how signals are extracted from Storybook meta, what each column means, and how to tag a component so it shows up correctly.

**Topics:**
- Lifecycle vocabulary and how it maps to visual pills
- Signal columns (Tests / A11y / Dark mode) — what each source of truth is
- Tagging conventions (`tags: ["stable", "a11y-verified", "dark-mode-verified"]`)
- Troubleshooting a component that shows as untagged or missing a signal

**Use when:**
- Tagging a new component's story
- Debugging why the dashboard doesn't reflect your recent changes
- Reviewing the dashboard before promoting a component

---

### [CI Quality Gates Guide](./guides/ci-gates.md)

The CI gates that enforce code quality on every PR — coverage thresholds, bundle-size budgets, a11y audit, visual regression, and the Changesets release flow.

**Topics:**
- Coverage thresholds (lines 89%, branches 90%, functions 66%, statements 89%) — why these numbers, roadmap target
- Bundle-size budgets per entry point with headroom and diagnostic tools (`npm run size:why`)
- Non-blocking gates (axe, Chromatic) and the criteria to flip them to blocking
- Changesets workflow: authoring a changeset, the Version Packages PR, release.yml
- Pre-PR local checklist

**Use when:**
- A PR fails a CI gate and you need to diagnose
- Tightening or relaxing a threshold
- Understanding the release flow
- Onboarding a new contributor

---

## 🚀 Quick Start

### Installation

```bash
npm install @fpkit/acss
```

### Basic Usage

```tsx
import { Button, Card } from '@fpkit/acss'
import '@fpkit/acss/libs/index.css'

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>Get started with fpkit components.</p>
        <Button variant="primary">Get Started</Button>
      </Card.Content>
    </Card>
  )
}
```

---

## 📖 Guide Navigator

### I want to...

**Add light/dark theming to my app**
→ Follow [Theming Guide](./guides/theming.md) (and the [Design Tokens Guide](./guides/design-tokens.md) if building a docs site or Figma bridge)

**Customize component appearance**
→ Start with [CSS Variables Guide](./guides/css-variables.md)

**Build a custom component**
→ Read [Composition Guide](./guides/composition.md), then [Architecture Guide](./guides/architecture.md)

**Ensure my app is accessible**
→ Study [Accessibility Guide](./guides/accessibility.md)

**Test my components**
→ Follow [Testing Guide](./guides/testing.md)

**Document components**
→ Learn [Storybook Guide](./guides/storybook.md)

**Promote a component from beta → stable (or author a new one)**
→ Read [Component Lifecycle Guide](./guides/component-lifecycle.md) and the [Maturity Dashboard Guide](./guides/maturity-dashboard.md), then check the live [`/status` dashboard](../../../apps/astro-builds/src/pages/status.astro)

**Understand fpkit patterns**
→ Start with [Architecture Guide](./guides/architecture.md)

**My PR failed a CI gate**
→ [CI Quality Gates Guide](./guides/ci-gates.md)

**Upgrade my app to the latest v6.x**
→ [Minimum-viable upgrade checklist](../MIGRATION-v7.md#minimum-viable-v6x-upgrade)

**See everything that shipped in v6.x**
→ [Design System v6 Overview](./DESIGN-SYSTEM-v6.md)

---

## 🎯 Common Workflows

### Creating a Custom Component

1. **Plan** - Use [Composition Guide](./guides/composition.md) decision tree
2. **Compose** - Combine fpkit components following [Architecture Guide](./guides/architecture.md) patterns
3. **Style** - Customize with CSS variables from [CSS Variables Guide](./guides/css-variables.md)
4. **Accessibility** - Maintain standards from [Accessibility Guide](./guides/accessibility.md)
5. **Test** - Write tests using [Testing Guide](./guides/testing.md)
6. **Document** - Create stories with [Storybook Guide](./guides/storybook.md)

### Building an Accessible Application

1. **Foundation** - Use semantic fpkit components ([Architecture Guide](./guides/architecture.md))
2. **Compliance** - Follow patterns in [Accessibility Guide](./guides/accessibility.md)
3. **Testing** - Verify with manual and automated tests ([Testing Guide](./guides/testing.md))
4. **Theming** - Ensure color contrast ([CSS Variables Guide](./guides/css-variables.md))

### Creating a Theme

1. **Runtime** - Understand light/dark runtime switching ([Theming Guide](./guides/theming.md))
2. **Tokens** - Know what color categories exist ([Design Tokens Guide](./guides/design-tokens.md))
3. **Variables** - Discover customizable CSS variables ([CSS Variables Guide](./guides/css-variables.md))
4. **Contrast** - Verify color contrast ratios ([Accessibility Guide](./guides/accessibility.md))
5. **Testing** - Test theme across components ([Testing Guide](./guides/testing.md))
6. **Documentation** - Document theme in Storybook ([Storybook Guide](./guides/storybook.md))

---

## 💡 Key Concepts

### Composition Over Creation

fpkit encourages **composing** existing components rather than creating new ones from scratch. This ensures:
- Consistency across your application
- Maintained accessibility features
- Reduced code duplication
- Leveraged test coverage

Learn more in the [Composition Guide](./guides/composition.md).

### CSS Variables for Customization

All fpkit components use **CSS custom properties** for styling, enabling:
- Theme creation without rebuilding
- Component-specific customization
- Real-time style updates
- Scoped styling overrides

Learn more in the [CSS Variables Guide](./guides/css-variables.md).

### WCAG 2.1 Level AA Compliance

fpkit components meet **WCAG 2.1 Level AA** standards by default:
- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Sufficient color contrast

Learn more in the [Accessibility Guide](./guides/accessibility.md).

### Polymorphic Components

Most fpkit components support the **`as` prop** for rendering as different HTML elements:
- Semantic flexibility (Button as `<a>`, Card as `<section>`)
- Type-safe prop spreading
- Maintained component behavior

Learn more in the [Architecture Guide](./guides/architecture.md).

---

## 🔗 External Resources

### fpkit Resources
- [GitHub Repository](https://github.com/shawn-sandy/acss)
- [Storybook Documentation](https://fpkit.netlify.app) _(if deployed)_
- [npm Package](https://www.npmjs.com/package/@fpkit/acss)
- [Component Maturity Dashboard](../../../apps/astro-builds/src/pages/status.astro) - Live view of every component's lifecycle and coverage
- [Astro Foundations Pages](../../../apps/astro-builds/src/pages/foundations/) - Colors, Typography, Spacing, Motion rendered from tokens

### Web Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Testing Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [jest-axe](https://github.com/nickcolley/jest-axe)

### Development Tools
- [Storybook](https://storybook.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

## 🆘 Getting Help

### Common Issues

**Problem: Styles not loading**
→ Ensure you've imported `@fpkit/acss/libs/index.css` in your entry file

**Problem: TypeScript errors with `as` prop**
→ Check that you're passing valid HTML element props for the specified `as` value

**Problem: Custom CSS variables not applying**
→ Verify you're using the correct naming convention (see [CSS Variables Guide](./guides/css-variables.md))

**Problem: Component not keyboard accessible**
→ Review accessibility patterns in [Accessibility Guide](./guides/accessibility.md)

### Contributing

Found an issue or want to contribute? Visit our [GitHub repository](https://github.com/shawn-sandy/acss).

---

## 📝 Documentation Structure

```
docs/
├── README.md                   - This index
├── DESIGN-SYSTEM-v6.md         - Narrative overview of the v6.x conversion
└── guides/
    ├── theming.md              - Light/dark runtime, custom themes, verification
    ├── design-tokens.md        - @fpkit/acss/tokens artifact and pipeline
    ├── css-variables.md        - Styling and customization
    ├── composition.md          - Component composition patterns
    ├── accessibility.md        - WCAG compliance and a11y
    ├── architecture.md         - Component structure and patterns
    ├── component-lifecycle.md  - Lifecycle stages and promotion criteria
    ├── maturity-dashboard.md   - /status page signals and tagging conventions
    ├── ci-gates.md             - Coverage, size, a11y, Chromatic, release flow
    ├── design-principles.md    - Design system principles
    ├── variants.md             - Variant authoring patterns
    ├── testing.md              - Testing strategies
    └── storybook.md            - Component documentation
```

Also at the package root: [`../MIGRATION-v7.md`](../MIGRATION-v7.md) — per-change upgrade steps with before/after code.

---

**Version**: 1.2.0
**Last Updated**: 2026-04-19
**License**: MIT
