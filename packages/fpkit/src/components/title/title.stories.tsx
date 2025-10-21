import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Title from "./title";

const meta: Meta<typeof Title> = {
  title: "FP.REACT Components/Title",
  component: Title,
  tags: ["version:2.0.0", "autodocs"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
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
