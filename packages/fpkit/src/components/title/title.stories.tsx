import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Title from "./title";

const meta: Meta<typeof Title> = {
  title: "FP.React Components/Title",
  component: Title,
  tags: ["version:2.0.0", "autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A semantic heading component for document structure and hierarchy.

The Title component renders semantic HTML headings (h1-h6) with proper accessibility support,
ensuring WCAG 2.1 AA compliance by maintaining semantic document structure for screen readers.

## Key Features

- **Semantic HTML**: Renders actual heading elements (h1-h6) for proper document outline
- **Accessibility**: Full ARIA support and proper heading hierarchy
- **Flexible Styling**: Supports fpkit's UI system, custom classes, and inline styles
- **Type Safety**: Fully typed with TypeScript
- **Performance**: Memoized to prevent unnecessary re-renders

## Migration from Heading

If you're migrating from the deprecated \`Heading\` component:

\`\`\`tsx
// Before (deprecated):
<Heading type="h2">Section Title</Heading>

// After:
<Title level="h2">Section Title</Title>
\`\`\`

**Note**: Default level changed from \`h3\` to \`h2\`.

📖 [View Full Documentation](?path=/docs/fp-react-components-title-readme--docs)
        `,
      },
    },
  },
  argTypes: {
    level: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "The semantic heading level to render",
      table: {
        type: { summary: "h1 | h2 | h3 | h4 | h5 | h6" },
        defaultValue: { summary: "h2" },
      },
    },
    children: {
      control: "text",
      description: "The content to display in the heading",
    },
    id: {
      control: "text",
      description: "Unique identifier for the heading (useful for anchor links)",
    },
    ui: {
      control: "text",
      description: "Data attribute for UI framework styling hooks",
    },
    className: {
      control: "text",
      description: "CSS class names to apply",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Visual size variant (independent of semantic level)",
      table: {
        type: { summary: "xs | sm | md | lg | xl | 2xl" },
        defaultValue: { summary: "undefined" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "muted", "inherit"],
      description: "Color variant for the title text",
      table: {
        type: { summary: "primary | secondary | accent | muted | inherit" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  args: {
    children: "Default Title",
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

/**
 * Default Title component using h2 (the default heading level).
 */
export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/default title/i)).toBeInTheDocument();
    expect(canvas.getByRole("heading", { level: 2 })).toBeInTheDocument();
  },
};

/**
 * Page title using h1. Typically used once per page for the main title.
 */
export const PageTitle: Story = {
  args: {
    level: "h1",
    children: "Main Page Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Use h1 for the main page title. Each page should have exactly one h1 for proper document structure and SEO.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent("Main Page Title");
  },
};

/**
 * Section heading using h2. Used for major sections on the page.
 */
export const SectionHeading: Story = {
  args: {
    level: "h2",
    children: "Section Heading",
  },
  parameters: {
    docs: {
      description: {
        story: "h2 is the default level and commonly used for major sections.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 2 })).toBeInTheDocument();
  },
};

/**
 * Subsection heading using h3.
 */
export const SubsectionHeading: Story = {
  args: {
    level: "h3",
    children: "Subsection Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 3 })).toBeInTheDocument();
  },
};

/**
 * H4 heading for nested content.
 */
export const LevelFour: Story = {
  args: {
    level: "h4",
    children: "Level Four Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 4 })).toBeInTheDocument();
  },
};

/**
 * H5 heading for deeply nested content.
 */
export const LevelFive: Story = {
  args: {
    level: "h5",
    children: "Level Five Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 5 })).toBeInTheDocument();
  },
};

/**
 * H6 heading - the deepest heading level.
 */
export const LevelSix: Story = {
  args: {
    level: "h6",
    children: "Level Six Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("heading", { level: 6 })).toBeInTheDocument();
  },
};

/**
 * Example of proper heading hierarchy for accessibility.
 */
export const ProperHierarchy: Story = {
  render: () => (
    <div>
      <Title level="h1">Page Title</Title>
      <p>Introduction paragraph...</p>

      <Title level="h2">First Major Section</Title>
      <p>Section content...</p>

      <Title level="h3">Subsection 1.1</Title>
      <p>Subsection content...</p>

      <Title level="h3">Subsection 1.2</Title>
      <p>Subsection content...</p>

      <Title level="h2">Second Major Section</Title>
      <p>Section content...</p>

      <Title level="h3">Subsection 2.1</Title>
      <p>Subsection content...</p>

      <Title level="h4">Sub-subsection 2.1.1</Title>
      <p>Deep nested content...</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**✅ GOOD: Proper heading hierarchy**

This example demonstrates correct heading hierarchy:
- One h1 for the page title
- h2 for major sections
- h3 for subsections
- h4 for nested subsections
- No skipped levels

This structure helps screen reader users navigate the page effectively and improves SEO.
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(canvas.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  },
};

/**
 * Example showing improper heading hierarchy (accessibility violation).
 */
export const ImproperHierarchy: Story = {
  render: () => (
    <div>
      <Title level="h1">Page Title</Title>
      <p>Introduction...</p>

      {/* ❌ BAD: Skipping from h1 to h4 */}
      <Title level="h4" styles={{ color: "red" }}>
        Skipped h2 and h3 (Accessibility Issue!)
      </Title>
      <p>This violates WCAG guidelines...</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**❌ BAD: Improper heading hierarchy**

This example shows an accessibility violation - skipping from h1 to h4 without h2 or h3 in between.

**Issues:**
- Confuses screen reader users
- Violates WCAG 2.4.6 (Headings and Labels)
- Poor document structure

**Solution:** Always maintain sequential heading levels.
        `,
      },
    },
  },
};

/**
 * Title with custom ID for anchor linking.
 */
export const WithAnchorLink: Story = {
  args: {
    level: "h2",
    id: "getting-started",
    children: "Getting Started",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the `id` prop to create anchor links. Users can link directly to this section with `#getting-started`.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "getting-started");
  },
};

/**
 * Title with custom styling using fpkit's UI data attribute.
 */
export const WithUIAttribute: Story = {
  args: {
    level: "h2",
    ui: "section-title",
    children: "Styled Section Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the `ui` prop to apply fpkit's component-specific styles via data attributes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("data-ui", "section-title");
  },
};

/**
 * Title with custom CSS classes.
 */
export const WithCustomClasses: Story = {
  args: {
    level: "h2",
    className: "text-primary font-bold",
    children: "Custom Styled Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Apply custom CSS classes using the `className` prop.",
      },
    },
  },
};

/**
 * Title with inline styles.
 */
export const WithInlineStyles: Story = {
  args: {
    level: "h2",
    styles: {
      color: "#0066cc",
      fontWeight: 700,
      marginBottom: "1rem",
    },
    children: "Inline Styled Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Apply inline styles using the `styles` prop. Useful for dynamic styling or CSS-in-JS.",
      },
    },
  },
};

/**
 * Accessible title with ARIA label for additional context.
 */
export const WithAriaLabel: Story = {
  args: {
    level: "h2",
    "aria-label": "User dashboard statistics overview",
    children: "Dashboard",
  },
  parameters: {
    docs: {
      description: {
        story: `
Use \`aria-label\` when the visible text doesn't provide enough context for screen reader users.

**Example:** "Dashboard" becomes "User dashboard statistics overview" for assistive technologies.
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("aria-label", "User dashboard statistics overview");
  },
};

/**
 * Size variants demonstration.
 */
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title level="h2" size="xs">Extra Small (xs)</Title>
      <Title level="h2" size="sm">Small (sm)</Title>
      <Title level="h2" size="md">Medium (md)</Title>
      <Title level="h2" size="lg">Large (lg)</Title>
      <Title level="h2" size="xl">Extra Large (xl)</Title>
      <Title level="h2" size="2xl">2X Large (2xl)</Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "T-shirt size variants allow visual sizing independent of semantic heading level.",
      },
    },
  },
};

/**
 * Color variants demonstration.
 */
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title size="lg" color="primary">Primary Color</Title>
      <Title size="lg" color="secondary">Secondary Color</Title>
      <Title size="lg" color="accent">Accent Color</Title>
      <Title size="lg" color="muted">Muted Color</Title>
      <Title size="lg" color="inherit">Inherit Color</Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Color variants meet WCAG AA contrast requirements. All colors tested at 4.5:1 minimum.",
      },
    },
  },
};

/**
 * Combined size and color variants.
 */
export const CombinedVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title level="h1" size="2xl" color="primary">
        Large Primary Heading
      </Title>
      <Title level="h2" size="lg" color="secondary">
        Medium Secondary Heading
      </Title>
      <Title level="h3" size="md" color="accent">
        Small Accent Heading
      </Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combine size and color variants for flexible design while maintaining semantic HTML structure.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const h1 = canvas.getByRole("heading", { level: 1 });
    expect(h1).toHaveAttribute("data-title", "2xl primary");
    expect(h1).toBeInTheDocument();
  },
};

/**
 * Visual vs semantic hierarchy example.
 */
export const VisualVsSemanticHierarchy: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <Title level="h2" size="xl" color="primary">
          h2 with XL Visual Size
        </Title>
        <p>Semantically an h2, but visually appears larger for design emphasis.</p>
      </div>

      <div>
        <Title level="h1" size="md" color="secondary">
          h1 with Medium Visual Size
        </Title>
        <p>Semantically the main heading (h1), but styled smaller for visual balance.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Design Flexibility with Semantic Integrity**

Visual size can differ from semantic heading level. This allows:
- Design requirements to be met without sacrificing accessibility
- Proper document outline for screen readers (h1 → h2 → h3...)
- Visual hierarchy that matches design specs

**Example**: A page with multiple sections may need an h2 visually larger than an h1 for design, while maintaining proper semantic structure.
        `,
      },
    },
  },
};

/**
 * CSS custom property override example.
 */
export const CustomPropertyOverride: Story = {
  args: {
    level: "h2",
    size: "lg",
    color: "primary",
    styles: {
      "--title-fs": "3rem",
      "--title-color": "#10b981",
      "--title-fw": "700",
    },
    children: "Custom Overridden Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Override CSS custom properties via the styles prop for maximum flexibility.",
      },
    },
  },
};
