import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import Flex from "./flex";
import "./flex.scss";

/**
 * Flexbox Utilities and Component Story
 * Comprehensive documentation of responsive flexbox utility classes and React Flex component
 */
const meta: Meta<typeof Flex> = {
  title: "FP.React Components/Layout/Flex",
  component: Flex,
  tags: ["autodocs", "rc"],
  parameters: {
    docs: {
      description: {
        component: `
# Flex Container Component

A flexible container component for creating flexbox layouts with a declarative React API.
Supports responsive props, preset variants, and compound pattern with Flex.Item and Flex.Spacer.

## Features

- **Compound Pattern**: Use \`Flex.Item\` and \`Flex.Spacer\` sub-components
- **Responsive Props**: Different layouts at sm/md/lg/xl breakpoints
- **Preset Variants**: Common patterns like 'center', 'between', 'stack'
- **CSS Custom Properties**: Runtime theming via styles prop
- **Polymorphic**: Render as any HTML element via 'as' prop
- **Type-Safe**: Full TypeScript support with autocomplete

## Usage Approaches

### 1. React Component (Recommended)
\`\`\`tsx
<Flex gap="md" justify="between" align="center">
  <Flex.Item flex="1">Content 1</Flex.Item>
  <Flex.Item flex="1">Content 2</Flex.Item>
</Flex>
\`\`\`

### 2. Utility Classes (Direct HTML)
\`\`\`html
<div className="flex gap-md justify-between items-center">
  <div className="flex-1">Content 1</div>
  <div className="flex-1">Content 2</div>
</div>
\`\`\`

## Breakpoints

- **sm**: 30rem (480px)
- **md**: 48rem (768px)
- **lg**: 62rem (992px)
- **xl**: 80rem (1280px)

## CSS Custom Properties

Override default spacing:

\`\`\`css
:root {
  --flex-gap-xs: 0.25rem;
  --flex-gap-sm: 0.5rem;
  --flex-gap-md: 0.75rem;
  --flex-gap-lg: 1rem;
  --flex-gap-xl: 1.5rem;
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

// ============================================================================
// REACT COMPONENT STORIES
// ============================================================================

/**
 * Basic Flex component usage
 */
export const FlexComponent: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
          Item 1
        </div>
        <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
          Item 2
        </div>
        <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
          Item 3
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Flex container renders correctly", async () => {
      const flexContainer = canvas.getByText("Item 1").parentElement?.parentElement;
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass("flex");
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic Flex component with gap spacing. The component automatically generates the appropriate utility classes from props.",
      },
    },
  },
};

/**
 * Flex with various layout props
 */
export const FlexWithProps: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Row direction with space between</h4>
        <Flex
          direction="row"
          justify="between"
          align="center"
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Left
          </div>
          <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Center
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Right
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Column direction with center alignment</h4>
        <Flex
          direction="column"
          align="center"
          gap="sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Item 1
          </div>
          <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Item 2
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Item 3
          </div>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates different combinations of direction, justify, align, and gap props.",
      },
    },
  },
};

/**
 * Responsive Flex layout
 */
export const FlexResponsive: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="sm"
      md={{ direction: "row", gap: "lg", justify: "between" }}
      style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
    >
      <Flex.Item flex="none" md={{ flex: "1" }}>
        <div
          style={{
            padding: "1rem",
            background: "#e3f2fd",
            borderRadius: "0.25rem",
            minHeight: "6rem",
          }}
        >
          Column on mobile<br />Row on medium+<br />flex="1" on medium+
        </div>
      </Flex.Item>
      <Flex.Item flex="none" md={{ flex: "1" }}>
        <div
          style={{
            padding: "1rem",
            background: "#bbdefb",
            borderRadius: "0.25rem",
            minHeight: "6rem",
          }}
        >
          Responsive layout with gap changes
        </div>
      </Flex.Item>
      <Flex.Item flex="none" md={{ flex: "1" }}>
        <div
          style={{
            padding: "1rem",
            background: "#90caf9",
            borderRadius: "0.25rem",
            minHeight: "6rem",
          }}
        >
          Resize to see behavior
        </div>
      </Flex.Item>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Responsive layout that changes from column on mobile to row on medium+ screens, with different gap sizes at different breakpoints.",
      },
    },
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
};

/**
 * Flex.Item sub-component
 */
export const FlexWithItems: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Equal width items (flex="1")</h4>
        <Flex
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <Flex.Item flex="1">
            <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              flex="1"
            </div>
          </Flex.Item>
          <Flex.Item flex="1">
            <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
              flex="1"
            </div>
          </Flex.Item>
          <Flex.Item flex="1">
            <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
              flex="1"
            </div>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Mixed sizing (flex="none" + flex="1")</h4>
        <Flex
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <Flex.Item flex="none" styles={{ width: "8rem" }}>
            <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              Fixed 8rem
            </div>
          </Flex.Item>
          <Flex.Item flex="1">
            <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
              Fills remaining space
            </div>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Custom alignment (alignSelf)</h4>
        <Flex
          gap="md"
          style={{
            padding: "1rem",
            border: "2px dashed #ccc",
            borderRadius: "0.5rem",
            minHeight: "8rem",
          }}
        >
          <Flex.Item alignSelf="start">
            <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              Start
            </div>
          </Flex.Item>
          <Flex.Item alignSelf="center">
            <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
              Center
            </div>
          </Flex.Item>
          <Flex.Item alignSelf="end">
            <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
              End
            </div>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates Flex.Item sub-component with different flex sizing and alignment options.",
      },
    },
  },
};

/**
 * Flex.Spacer sub-component
 */
export const FlexWithSpacer: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Push items to opposite edges</h4>
        <Flex
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Left side
          </div>
          <Flex.Spacer />
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Right side
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Multiple spacers for even distribution</h4>
        <Flex
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Start
          </div>
          <Flex.Spacer />
          <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Middle
          </div>
          <Flex.Spacer />
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            End
          </div>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Flex.Spacer creates auto-expanding space (flex: 1) to push items apart. Commonly used for navbar layouts and toolbars.",
      },
    },
  },
};

/**
 * Preset variants
 */
export const FlexVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>variant="center"</h4>
        <Flex
          variant="center"
          style={{
            padding: "2rem",
            border: "2px dashed #ccc",
            borderRadius: "0.5rem",
            minHeight: "8rem",
          }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Centered both axes
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>variant="between"</h4>
        <Flex
          variant="between"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Left
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Right
          </div>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>variant="stack"</h4>
        <Flex
          variant="stack"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Stacked Item 1
          </div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Stacked Item 2
          </div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Stacked Item 3
          </div>
        </Flex>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Stack variant uses column layout by default, becomes row on medium+ screens
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>variant="spread"</h4>
        <Flex
          variant="spread"
          gap="sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Equal
          </div>
          <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Width
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Items
          </div>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Preset variants provide common flexbox patterns: 'center', 'between', 'around', 'stack', 'spread'.",
      },
    },
  },
};

/**
 * Nested Flex containers
 */
export const NestedFlex: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="md"
      style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
    >
      <Flex justify="between" align="center" gap="md">
        <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
          Header Left
        </div>
        <Flex.Spacer />
        <Flex gap="sm">
          <div style={{ padding: "0.5rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Nav 1
          </div>
          <div style={{ padding: "0.5rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Nav 2
          </div>
          <div style={{ padding: "0.5rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Nav 3
          </div>
        </Flex>
      </Flex>

      <Flex gap="md">
        <Flex.Item flex="none" styles={{ width: "12rem" }}>
          <div
            style={{
              padding: "1rem",
              background: "#f3e5f5",
              borderRadius: "0.25rem",
              minHeight: "12rem",
            }}
          >
            Sidebar
          </div>
        </Flex.Item>
        <Flex.Item flex="1">
          <Flex
            direction="column"
            gap="md"
            style={{ padding: "1rem", background: "#f1f8e9", borderRadius: "0.25rem" }}
          >
            <div style={{ padding: "0.75rem", background: "#dcedc8", borderRadius: "0.25rem" }}>
              Main content area
            </div>
            <Flex gap="sm">
              <Flex.Item flex="1">
                <div style={{ padding: "0.75rem", background: "#c5e1a5", borderRadius: "0.25rem" }}>
                  Column 1
                </div>
              </Flex.Item>
              <Flex.Item flex="1">
                <div style={{ padding: "0.75rem", background: "#c5e1a5", borderRadius: "0.25rem" }}>
                  Column 2
                </div>
              </Flex.Item>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complex layout demonstrating nested Flex containers to create a typical application layout with header, sidebar, and main content.",
      },
    },
  },
};

/**
 * Custom styling with CSS variables
 */
export const CustomStyling: Story = {
  render: () => (
    <Flex
      gap="md"
      styles={
        {
          "--flex-gap": "3rem",
          padding: "2rem",
          border: "2px solid #1976d2",
          borderRadius: "0.5rem",
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        } as React.CSSProperties
      }
    >
      <div style={{ padding: "1rem", background: "white", borderRadius: "0.25rem" }}>
        Custom gap via --flex-gap
      </div>
      <div style={{ padding: "1rem", background: "white", borderRadius: "0.25rem" }}>
        Custom styles
      </div>
      <div style={{ padding: "1rem", background: "white", borderRadius: "0.25rem" }}>
        Via styles prop
      </div>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates custom styling using CSS custom properties and inline styles via the styles prop.",
      },
    },
  },
};

/**
 * Polymorphic rendering
 */
export const PolymorphicFlex: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Render as &lt;nav&gt;</h4>
        <Flex
          as="nav"
          role="navigation"
          aria-label="Main navigation"
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#1976d2" }}>
            Home
          </a>
          <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#1976d2" }}>
            About
          </a>
          <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#1976d2" }}>
            Contact
          </a>
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Render as &lt;section&gt;</h4>
        <Flex
          as="section"
          direction="column"
          gap="md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <h3 style={{ margin: 0 }}>Section Title</h3>
          <p style={{ margin: 0 }}>Content in a semantic section element</p>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The 'as' prop allows Flex to render as any HTML element, enabling semantic markup while maintaining flexbox behavior.",
      },
    },
  },
};

// ============================================================================
// UTILITY CLASS STORIES (Preserved for backward compatibility)
// ============================================================================

/**
 * Basic flex container with default gap
 */
export const BasicFlex: Story = {
  render: () => (
    <div
      className="flex"
      style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
    >
      <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
        Item 1
      </div>
      <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
        Item 2
      </div>
      <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
        Item 3
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic flex container with default gap. The `.flex` class provides `display: flex` with automatic gap spacing.",
      },
    },
  },
};

/**
 * Flex direction utilities
 */
export const FlexDirection: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Row (default)</h3>
        <div
          className="flex flex-row gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>1</div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>2</div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>3</div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Column</h3>
        <div
          className="flex flex-col gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>1</div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>2</div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>3</div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Row Reverse</h3>
        <div
          className="flex flex-row-reverse gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>1</div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>2</div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>3</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Flex direction utilities: `.flex-row`, `.flex-col`, `.flex-row-reverse`, `.flex-col-reverse`",
      },
    },
  },
};

/**
 * Justify content (main axis alignment)
 */
export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {[
        { class: "justify-start", label: "Start" },
        { class: "justify-center", label: "Center" },
        { class: "justify-end", label: "End" },
        { class: "justify-between", label: "Space Between" },
        { class: "justify-around", label: "Space Around" },
        { class: "justify-evenly", label: "Space Evenly" },
      ].map(({ class: className, label }) => (
        <div key={className}>
          <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>{label}</h4>
          <div
            className={`flex ${className}`}
            style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
          >
            <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              A
            </div>
            <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
              B
            </div>
            <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
              C
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Justify content utilities control main axis alignment: `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`, `.justify-evenly`",
      },
    },
  },
};

/**
 * Align items (cross axis alignment)
 */
export const AlignItems: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {[
        { class: "items-start", label: "Start" },
        { class: "items-center", label: "Center" },
        { class: "items-end", label: "End" },
        { class: "items-stretch", label: "Stretch" },
        { class: "items-baseline", label: "Baseline" },
      ].map(({ class: className, label }) => (
        <div key={className}>
          <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>{label}</h4>
          <div
            className={`flex ${className}`}
            style={{
              padding: "1rem",
              border: "2px dashed #ccc",
              borderRadius: "0.5rem",
              minHeight: "6rem",
            }}
          >
            <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              Small
            </div>
            <div
              style={{
                padding: "0.75rem",
                background: "#bbdefb",
                borderRadius: "0.25rem",
                height: "4rem",
              }}
            >
              Medium
            </div>
            <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
              Small
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Align items utilities control cross axis alignment: `.items-start`, `.items-center`, `.items-end`, `.items-stretch`, `.items-baseline`",
      },
    },
  },
};

/**
 * Gap utilities
 */
export const GapUtilities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {[
        { class: "gap-0", label: "No Gap (gap-0)" },
        { class: "gap-xs", label: "Extra Small (gap-xs)" },
        { class: "gap-sm", label: "Small (gap-sm)" },
        { class: "gap-md", label: "Medium (gap-md)" },
        { class: "gap-lg", label: "Large (gap-lg)" },
        { class: "gap-xl", label: "Extra Large (gap-xl)" },
      ].map(({ class: className, label }) => (
        <div key={className}>
          <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>{label}</h4>
          <div
            className={`flex ${className}`}
            style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
          >
            <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
              Item 1
            </div>
            <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
              Item 2
            </div>
            <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
              Item 3
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Gap utilities use fluid spacing with `clamp()`. Available: `.gap-0`, `.gap-xs`, `.gap-sm`, `.gap-md`, `.gap-lg`, `.gap-xl`. Also supports `.row-gap-*` and `.col-gap-*` for independent control.",
      },
    },
  },
};

/**
 * Flex item sizing
 */
export const FlexSizing: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-1 (Equal width items)
        </h4>
        <div
          className="flex gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div
            className="flex-1"
            style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}
          >
            flex-1
          </div>
          <div
            className="flex-1"
            style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}
          >
            flex-1
          </div>
          <div
            className="flex-1"
            style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}
          >
            flex-1
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-auto (Content-based sizing)
        </h4>
        <div
          className="flex gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div
            className="flex-auto"
            style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}
          >
            Short
          </div>
          <div
            className="flex-auto"
            style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}
          >
            Medium content here
          </div>
          <div
            className="flex-auto"
            style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}
          >
            Longer content that takes more space
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-none (Fixed width)
        </h4>
        <div
          className="flex gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div
            className="flex-none"
            style={{
              padding: "0.75rem",
              background: "#e3f2fd",
              borderRadius: "0.25rem",
              width: "8rem",
            }}
          >
            Fixed 8rem
          </div>
          <div
            className="flex-1"
            style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}
          >
            flex-1 fills remaining
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Flex item sizing: `.flex-1` (equal distribution), `.flex-auto` (content-based), `.flex-initial` (default), `.flex-none` (no grow/shrink)",
      },
    },
  },
};

/**
 * Common patterns
 */
export const CommonPatterns: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-center (Center both axes)
        </h4>
        <div
          className="flex-center"
          style={{
            padding: "2rem",
            border: "2px dashed #ccc",
            borderRadius: "0.5rem",
            minHeight: "8rem",
          }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Centered Content
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-between (Space between with center alignment)
        </h4>
        <div
          className="flex-between"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Left
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Right
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-stack (Vertical stack, becomes row on md+)
        </h4>
        <div
          className="flex-stack"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Item 1
          </div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            Item 2
          </div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Item 3
          </div>
        </div>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Resize viewport to see responsive behavior (column → row at 48rem)
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          flex-spread (Equal width children)
        </h4>
        <div
          className="flex-spread gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "0.75rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            A
          </div>
          <div style={{ padding: "0.75rem", background: "#bbdefb", borderRadius: "0.25rem" }}>
            B
          </div>
          <div style={{ padding: "0.75rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            C
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common flexbox patterns: `.flex-center`, `.flex-between`, `.flex-around`, `.flex-stack`, `.flex-spread`",
      },
    },
  },
};

/**
 * Responsive utilities demonstration
 */
export const ResponsiveUtilities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Responsive Direction</h3>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Column on mobile, row on medium+ screens
        </p>
        <div
          className="flex flex-col md:flex-row gap-md"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div
            className="flex-1"
            style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}
          >
            Column 1
          </div>
          <div
            className="flex-1"
            style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}
          >
            Column 2
          </div>
          <div
            className="flex-1"
            style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}
          >
            Column 3
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Responsive Gaps</h3>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Small gap on mobile, large gap on medium+ screens
        </p>
        <div
          className="flex gap-sm md:gap-lg"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>1</div>
          <div style={{ padding: "1rem", background: "#bbdefb", borderRadius: "0.25rem" }}>2</div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>3</div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Responsive Justification</h3>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Start alignment on mobile, space between on large+ screens
        </p>
        <div
          className="flex justify-start lg:justify-between"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          <div style={{ padding: "1rem", background: "#e3f2fd", borderRadius: "0.25rem" }}>
            Left
          </div>
          <div style={{ padding: "1rem", background: "#90caf9", borderRadius: "0.25rem" }}>
            Right
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <strong>💡 Tip:</strong> Resize your browser window or use Storybook&apos;s viewport
        toolbar to see responsive behavior at different breakpoints (sm: 480px, md: 768px, lg:
        992px, xl: 1280px).
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `Responsive modifiers allow utilities to activate at specific breakpoints.

**Format:** \`{breakpoint}:{utility}\`

**Examples:**
- \`sm:flex-row\` - Row direction on screens ≥ 480px
- \`md:justify-center\` - Center justify on screens ≥ 768px
- \`lg:gap-xl\` - Extra large gap on screens ≥ 992px
- \`xl:items-end\` - End alignment on screens ≥ 1280px

All base utilities support responsive modifiers: direction, wrap, justify, align, gap, and flex sizing.`,
      },
    },
    chromatic: {
      viewports: [375, 480, 768, 992, 1280],
    },
  },
};

/**
 * Wrapping behavior
 */
export const FlexWrap: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>flex-wrap (default)</h4>
        <div
          className="flex flex-wrap gap-sm"
          style={{ padding: "1rem", border: "2px dashed #ccc", borderRadius: "0.5rem" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#e3f2fd",
                borderRadius: "0.25rem",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>flex-nowrap</h4>
        <div
          className="flex flex-nowrap gap-sm"
          style={{
            padding: "1rem",
            border: "2px dashed #ccc",
            borderRadius: "0.5rem",
            overflowX: "auto",
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                padding: "0.75rem 1.5rem",
                background: "#bbdefb",
                borderRadius: "0.25rem",
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Flex wrap utilities: `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse`",
      },
    },
  },
};
