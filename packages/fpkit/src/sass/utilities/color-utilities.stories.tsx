import type { Meta, StoryObj } from "@storybook/react";

/**
 * Color Utilities
 *
 * Semantic color utility classes for quick styling. All utilities reference
 * semantic tokens from the 3-tier color system, ensuring WCAG AA compliance
 * and consistent theming across the application.
 *
 * ## Three Utility Categories
 *
 * 1. **Text Colors** - `.text-*` classes for typography
 * 2. **Background Colors** - `.bg-*` classes for surfaces
 * 3. **Border Colors** - `.border-*` classes (requires border-width and border-style)
 *
 * ## Token Architecture
 *
 * All utilities reference **semantic tokens** (Tier 2), not primitive colors:
 * ```
 * Primitives (Tier 1) → Semantic (Tier 2) → Utilities
 * --color-blue-600    → --color-primary  → .text-primary
 * ```
 *
 * This ensures:
 * - Easy theming via token overrides
 * - Consistent color usage across components
 * - WCAG AA accessibility compliance (4.5:1 text, 3:1 UI)
 */
const meta = {
  title: "Utilities/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Semantic color utility classes for rapid development. All utilities maintain WCAG AA contrast ratios and reference the centralized token system.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Text Color Utilities
 *
 * Use `.text-*` classes to apply semantic text colors. All colors meet
 * WCAG AA contrast requirements (4.5:1 minimum) when used on appropriate backgrounds.
 */
export const TextColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Brand Colors</h3>
        <p className="text-primary">
          .text-primary - Primary brand color for emphasis
        </p>
        <p className="text-secondary">
          .text-secondary - Secondary text for less emphasis
        </p>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>State Colors</h3>
        <p className="text-success">
          .text-success - Success messages and positive feedback
        </p>
        <p className="text-error">
          .text-error - Error messages and validation failures
        </p>
        <p className="text-warning">
          .text-warning - Warning messages and cautionary information
        </p>
        <p className="text-info">.text-info - Informational messages</p>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Text Hierarchy</h3>
        <p className="text-muted">
          .text-muted - Muted text for de-emphasized content
        </p>
        <p className="text-disabled">.text-disabled - Disabled state text</p>
        <p className="text-inverse" style={{ backgroundColor: "#262626" }}>
          .text-inverse - Inverse text (white) for dark backgrounds
        </p>
      </div>
    </div>
  ),
};

/**
 * Background Color Utilities
 *
 * Use `.bg-*` classes to apply semantic background colors. Combines with
 * text utilities for accessible color combinations.
 */
export const BackgroundColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Brand Backgrounds</h3>
        <div
          className="bg-primary"
          style={{ padding: "1rem", color: "white", marginBlockEnd: "0.5rem" }}
        >
          .bg-primary - Primary brand background
        </div>
        <div
          className="bg-primary-light"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-primary-light - Light primary background
        </div>
        <div
          className="bg-secondary"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-secondary - Secondary background
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>State Backgrounds</h3>
        <div
          className="bg-success"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-success - Success background for positive feedback
        </div>
        <div
          className="bg-error"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-error - Error background for validation failures
        </div>
        <div
          className="bg-warning"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-warning - Warning background for caution
        </div>
        <div
          className="bg-info"
          style={{ padding: "1rem", marginBlockEnd: "0.5rem" }}
        >
          .bg-info - Info background for informational content
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Surface Backgrounds</h3>
        <div
          className="bg-surface"
          style={{
            padding: "1rem",
            border: "1px solid #d4d4d4",
            marginBlockEnd: "0.5rem",
          }}
        >
          .bg-surface - Primary surface background (usually white)
        </div>
        <div
          className="bg-surface-secondary"
          style={{
            padding: "1rem",
            border: "1px solid #d4d4d4",
            marginBlockEnd: "0.5rem",
          }}
        >
          .bg-surface-secondary - Secondary surface background
        </div>
        <div
          className="bg-transparent"
          style={{
            padding: "1rem",
            border: "1px solid #d4d4d4",
            marginBlockEnd: "0.5rem",
          }}
        >
          .bg-transparent - Transparent background
        </div>
      </div>
    </div>
  ),
};

/**
 * Border Color Utilities
 *
 * Use `.border-*` classes to apply semantic border colors. You must also
 * set `border-width` and `border-style` for borders to be visible.
 *
 * Example: `className="border-primary" style={{ border: "2px solid" }}`
 */
export const BorderColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Brand Borders</h3>
        <div
          className="border-primary"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-primary - Primary brand border
        </div>
        <div
          className="border-secondary"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-secondary - Secondary border
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>State Borders</h3>
        <div
          className="border-success"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-success - Success border for valid states
        </div>
        <div
          className="border-error"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-error - Error border for invalid states
        </div>
        <div
          className="border-warning"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-warning - Warning border for caution
        </div>
        <div
          className="border-info"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-info - Info border for informational content
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>UI Borders</h3>
        <div
          className="border-default"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-default - Default UI border
        </div>
        <div
          className="border-subtle"
          style={{
            padding: "1rem",
            border: "2px solid",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-subtle - Subtle border for less emphasis
        </div>
        <div
          className="border-transparent"
          style={{
            padding: "1rem",
            border: "2px solid",
            backgroundColor: "#f5f5f5",
            marginBlockEnd: "0.5rem",
          }}
        >
          .border-transparent - Transparent border
        </div>
      </div>
    </div>
  ),
};

/**
 * Combined Utilities
 *
 * Demonstrates combining text, background, and border utilities for
 * common design patterns. All combinations maintain WCAG AA contrast ratios.
 */
export const CombinedUtilities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ marginBlockEnd: "0.5rem" }}>Alert-style Messages</h3>

      <div
        className="bg-success text-success border-success"
        style={{
          padding: "1rem",
          border: "2px solid",
          borderRadius: "0.25rem",
        }}
      >
        <strong>Success!</strong> Your changes have been saved successfully.
      </div>

      <div
        className="bg-error text-error border-error"
        style={{
          padding: "1rem",
          border: "2px solid",
          borderRadius: "0.25rem",
        }}
      >
        <strong>Error:</strong> Please correct the validation errors below.
      </div>

      <div
        className="bg-warning text-warning border-warning"
        style={{
          padding: "1rem",
          border: "2px solid",
          borderRadius: "0.25rem",
        }}
      >
        <strong>Warning:</strong> This action cannot be undone.
      </div>

      <div
        className="bg-info text-info border-info"
        style={{
          padding: "1rem",
          border: "2px solid",
          borderRadius: "0.25rem",
        }}
      >
        <strong>Info:</strong> You have 3 unread notifications.
      </div>

      <h3 style={{ marginBlockEnd: "0.5rem", marginBlockStart: "1rem" }}>
        Card-style Containers
      </h3>

      <div
        className="bg-surface border-default"
        style={{
          padding: "1.5rem",
          border: "1px solid",
          borderRadius: "0.5rem",
        }}
      >
        <h4 className="text-primary" style={{ marginBlockStart: 0 }}>
          Primary Heading
        </h4>
        <p className="text-secondary" style={{ marginBlockEnd: 0 }}>
          This card uses semantic utilities for consistent styling.
        </p>
      </div>

      <div
        className="bg-primary-light border-primary"
        style={{
          padding: "1.5rem",
          border: "2px solid",
          borderRadius: "0.5rem",
        }}
      >
        <h4 className="text-primary" style={{ marginBlockStart: 0 }}>
          Highlighted Card
        </h4>
        <p style={{ marginBlockEnd: 0 }}>
          Combines light background with primary border for emphasis.
        </p>
      </div>
    </div>
  ),
};

/**
 * Theming Example
 *
 * Demonstrates how utilities adapt when semantic tokens are overridden.
 * This example uses inline CSS variables to simulate theme customization.
 */
export const ThemingExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Default Theme</h3>
        <p className="text-primary">
          Primary text uses default blue from token system
        </p>
        <div
          className="bg-primary"
          style={{ padding: "1rem", color: "white" }}
        >
          Primary background uses default blue
        </div>
      </div>

      <div
        style={
          {
            "--color-primary": "#7c3aed",
            "--color-primary-light": "#ede9fe",
          } as React.CSSProperties
        }
      >
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Custom Theme (Purple)</h3>
        <p className="text-primary">
          Primary text now uses purple via token override
        </p>
        <div
          className="bg-primary"
          style={{ padding: "1rem", color: "white" }}
        >
          Primary background now uses purple
        </div>
        <div className="bg-primary-light" style={{ padding: "1rem" }}>
          Light background adapts to purple theme
        </div>
      </div>

      <div
        style={
          {
            "--color-primary": "#dc2626",
            "--color-primary-light": "#fee2e2",
          } as React.CSSProperties
        }
      >
        <h3 style={{ marginBlockEnd: "0.5rem" }}>Custom Theme (Red)</h3>
        <p className="text-primary">
          Primary text now uses red via token override
        </p>
        <div
          className="bg-primary"
          style={{ padding: "1rem", color: "white" }}
        >
          Primary background now uses red
        </div>
        <div className="bg-primary-light" style={{ padding: "1rem" }}>
          Light background adapts to red theme
        </div>
      </div>

      <div
        style={{
          marginBlockStart: "1rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "0.25rem",
        }}
      >
        <p style={{ marginBlockStart: 0, fontSize: "0.875rem" }}>
          <strong>💡 Theming Tip:</strong> Override semantic tokens (
          <code>--color-primary</code>, <code>--color-success</code>, etc.) to
          theme your entire application. All utilities automatically adapt!
        </p>
      </div>
    </div>
  ),
};

/**
 * Usage Guidelines
 *
 * Best practices for using color utilities in your application.
 */
export const UsageGuidelines: Story = {
  render: () => (
    <div style={{ maxWidth: "75ch" }}>
      <h3>Best Practices</h3>

      <h4>✅ Do</h4>
      <ul style={{ lineHeight: 1.6 }}>
        <li>
          Use semantic utilities (<code>.text-primary</code>,{" "}
          <code>.bg-success</code>) for consistent theming
        </li>
        <li>
          Combine utilities for common patterns (<code>.bg-error</code> +{" "}
          <code>.text-error</code>)
        </li>
        <li>Ensure sufficient contrast for accessibility (4.5:1 for text)</li>
        <li>
          Use <code>.text-inverse</code> on dark backgrounds for readability
        </li>
        <li>
          Override semantic tokens (<code>--color-primary</code>) for
          application-wide theming
        </li>
      </ul>

      <h4>❌ Don't</h4>
      <ul style={{ lineHeight: 1.6 }}>
        <li>
          Don't use utilities on elements with component-level tokens (they may
          conflict)
        </li>
        <li>
          Don't reference primitive tokens directly (<code>--color-blue-600</code>
          ) - use semantic tokens instead
        </li>
        <li>Don't create custom color utilities outside the token system</li>
        <li>
          Don't forget to set <code>border-width</code> and{" "}
          <code>border-style</code> when using border utilities
        </li>
        <li>
          Don't use utilities for complex component styling - use
          component-level tokens instead
        </li>
      </ul>

      <h4>Code Examples</h4>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "0.25rem",
          marginBlockEnd: "1rem",
        }}
      >
        <p style={{ marginBlockStart: 0, fontSize: "0.875rem" }}>
          <strong>HTML:</strong>
        </p>
        <pre style={{ marginBlockEnd: 0, overflow: "auto" }}>
          <code>{`<!-- Alert-style message -->
<div class="bg-success text-success border-success" style="padding: 1rem; border: 2px solid;">
  Success! Your changes have been saved.
</div>

<!-- Primary button-style link -->
<a href="#" class="bg-primary text-inverse" style="padding: 0.5rem 1rem; display: inline-block;">
  Get Started
</a>`}</code>
        </pre>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "0.25rem",
        }}
      >
        <p style={{ marginBlockStart: 0, fontSize: "0.875rem" }}>
          <strong>Theming (CSS):</strong>
        </p>
        <pre style={{ marginBlockEnd: 0, overflow: "auto" }}>
          <code>{`:root {
  /* Override semantic tokens for custom branding */
  --color-primary: #7c3aed;        /* Purple instead of blue */
  --color-primary-light: #ede9fe;  /* Light purple */
  --color-success: #059669;        /* Teal instead of green */
}

/* All .text-primary, .bg-primary utilities now use purple! */`}</code>
        </pre>
      </div>

      <h4 style={{ marginBlockStart: "1.5rem" }}>Accessibility</h4>
      <p>
        All color utilities meet WCAG AA standards when used appropriately:
      </p>
      <ul style={{ lineHeight: 1.6 }}>
        <li>
          <strong>Text colors:</strong> 4.5:1 contrast minimum on white
          backgrounds
        </li>
        <li>
          <strong>State backgrounds:</strong> Paired with matching text colors
          for sufficient contrast
        </li>
        <li>
          <strong>Borders:</strong> 3:1 contrast minimum for UI components
        </li>
        <li>
          <strong>Focus indicators:</strong> Use semantic tokens that meet
          contrast requirements
        </li>
      </ul>

      <p>
        Always test color combinations with tools like the{" "}
        <a
          href="https://webaim.org/resources/contrastchecker/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebAIM Contrast Checker
        </a>{" "}
        or browser DevTools.
      </p>
    </div>
  ),
};
