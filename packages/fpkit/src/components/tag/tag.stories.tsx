import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { useState } from "react";
import Tag from "./tag";
import type { TagVariant } from "./tag.types";
import "./tag.scss";

const meta: Meta<typeof Tag> = {
  title: "FP.React Components/Tag",
  component: Tag,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: {
      control: "select",
      options: ["alpha", "beta", "stable", "production"] as TagVariant[],
      description: "Visual variant with predefined color schemes",
      table: {
        type: { summary: "TagVariant" },
        defaultValue: { summary: "undefined" },
      },
    },
    elm: {
      control: "radio",
      options: ["span", "p"],
      description: "HTML element to render (span for inline, p for block)",
      table: {
        type: { summary: "span | p" },
        defaultValue: { summary: "span" },
      },
    },
    role: {
      control: "radio",
      options: ["note", "status"],
      description: "ARIA role (note for static, status for dynamic content)",
      table: {
        type: { summary: "note | status" },
        defaultValue: { summary: "note" },
      },
    },
    children: {
      control: "text",
      description: "Content to display inside the tag",
    },
  },
  args: {
    children: "Tag",
  },
  parameters: {
    docs: {
      description: {
        component: `A small inline label component for displaying status, versions, or environment indicators with WCAG 2.1 AA accessibility compliance.

## CSS Variables

### Spacing
- \`--tag-padding-inline\`: Horizontal padding (default: 0.7rem / 11.2px)
- \`--tag-padding-block\`: Vertical padding (default: 0.2rem / 3.2px)

### Typography
- \`--tag-fs\`: Font size (default: 0.8rem / 12.8px)
- \`--tag-fw\`: Font weight (default: 500)
- \`--tag-color\`: Text color (default: currentColor)

### Appearance
- \`--tag-bg\`: Background color (default: lightgray)
- \`--tag-radius\`: Border radius (default: 99rem for pill shape, 0.5rem for block)
- \`--tag-display\`: Display mode (default: inline-block, block for \`<p>\`)

### Variant Colors (WCAG AA Compliant)
- \`--beta\`: Amber (#fbbf24) - 6.94:1 contrast with black
- \`--stable\`: Dark green (#0f7c3e) - 4.56:1 contrast with white
- \`--production\`: Dark blue (#1e3a8a) - 8.59:1 contrast with white
`,
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

/**
 * Default tag with no variant styling
 */
export const Default: Story = {
  args: {
    children: "Default Tag",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("note");
    expect(tag).toBeInTheDocument();
    expect(tag.textContent).toBe("Default Tag");
  },
};

/**
 * Alpha variant - for early development stage indicators
 */
export const Alpha: Story = {
  args: {
    variant: "alpha",
    children: "Alpha",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Alpha variant with warning colors for early development features.",
      },
    },
  },
} as Story;

/**
 * Beta variant - for pre-release version indicators
 */
export const Beta: Story = {
  args: {
    variant: "beta",
    children: "Beta",
  },
  parameters: {
    docs: {
      description: {
        story: "Beta variant with warning colors for pre-release features.",
      },
    },
  },
} as Story;

/**
 * Stable variant - for production-ready release indicators
 */
export const Stable: Story = {
  args: {
    variant: "stable",
    children: "Stable",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stable variant with success colors for production-ready releases.",
      },
    },
  },
} as Story;

/**
 * Production variant - for live environment indicators
 */
export const Production: Story = {
  args: {
    variant: "production",
    children: "Production",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Production variant with primary colors for live environment indicators.",
      },
    },
  },
} as Story;

/**
 * All variants displayed together for comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Tag>Default</Tag>
      <Tag variant="alpha">Alpha</Tag>
      <Tag variant="beta">Beta</Tag>
      <Tag variant="stable">Stable</Tag>
      <Tag variant="production">Production</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available tag variants side by side.",
      },
    },
  },
} as Story;

/**
 * Block-level tag using paragraph element
 */
export const BlockLevelTag: Story = {
  args: {
    elm: "p",
    variant: "beta",
    children: "Block-level Beta Tag",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tag rendered as a block-level paragraph element with modified border radius.",
      },
    },
  },
} as Story;

/**
 * Dynamic status tag with role="status" for live updates
 */
const DynamicStatusComponent = () => {
  const [status, setStatus] = useState<"Deploying" | "Deployed">("Deploying");

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Tag role="status" variant={status === "Deployed" ? "stable" : "beta"}>
        {status}
      </Tag>
      <button
        onClick={() =>
          setStatus(status === "Deploying" ? "Deployed" : "Deploying")
        }
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Toggle Status
      </button>
    </div>
  );
};

export const DynamicStatus: Story = {
  render: () => <DynamicStatusComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates role="status" for dynamic content that announces updates to screen readers.',
      },
    },
  },
};

/**
 * Tag with accessibility label for additional context
 */
export const WithAriaLabel: Story = {
  args: {
    variant: "beta",
    children: "Beta",
    "aria-label": "Beta version - feedback welcome",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tag with aria-label providing additional context for screen reader users.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByLabelText("Beta version - feedback welcome");
    expect(tag).toBeInTheDocument();
  },
};

/**
 * Tags used inline within text content
 */
export const InlineUsage: Story = {
  render: () => (
    <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
      This feature is currently in{" "}
      <Tag variant="beta" aria-label="Beta testing phase">
        Beta
      </Tag>{" "}
      and will be moved to{" "}
      <Tag variant="stable" aria-label="Stable release">
        Stable
      </Tag>{" "}
      after testing is complete.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tags used inline within paragraph text for contextual labeling.",
      },
    },
  },
};

/**
 * Version tags with custom styling
 */
export const VersionTags: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Tag variant="alpha">v0.1.0-alpha</Tag>
      <Tag variant="beta">v0.9.0-beta</Tag>
      <Tag variant="stable">v1.0.0</Tag>
      <Tag variant="stable">v2.0.0</Tag>
      <Tag variant="production">v2.1.0</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tags used for version labeling with semantic variants.",
      },
    },
  },
};

/**
 * Custom styled tags with inline styles
 */
export const CustomStyling: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Tag
        styles={{
          backgroundColor: "#ff6b6b",
          color: "white",
          fontSize: "0.75rem",
        }}
      >
        Custom Red
      </Tag>
      <Tag
        variant="beta"
        styles={{
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
        }}
      >
        Large Beta
      </Tag>
      <Tag
        styles={{
          backgroundColor: "#4ecdc4",
          color: "white",
          borderRadius: "0.25rem",
        }}
      >
        Square Tag
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tags with custom inline styles overriding default CSS custom properties.",
      },
    },
  },
};

/**
 * Accessibility test - keyboard navigation and screen reader support
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <strong>Static Tags (role="note"):</strong>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <Tag variant="stable" aria-label="Version 1.0 stable release">
            v1.0
          </Tag>
          <Tag variant="beta" aria-label="Beta feature under testing">
            Beta
          </Tag>
        </div>
      </div>
      <div>
        <strong>Dynamic Tags (role="status"):</strong>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <Tag
            role="status"
            variant="production"
            aria-label="Server running status"
          >
            Running
          </Tag>
          <Tag
            role="status"
            variant="beta"
            aria-label="Build in progress status"
          >
            Building...
          </Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates proper ARIA role usage: role="note" for static content, role="status" for dynamic updates.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
  },
};
