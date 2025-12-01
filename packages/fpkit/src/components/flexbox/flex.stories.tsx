import type { Meta, StoryObj } from "@storybook/react-vite";
import "./flex.scss";

/**
 * Flexbox Utilities Story
 * Comprehensive documentation of responsive flexbox utility classes
 */
const meta: Meta = {
  title: "FP.React Components/Utilities/Flexbox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Flexbox Utilities

Comprehensive responsive flexbox utility classes for flexible layouts. All utilities support responsive modifiers (\`sm:\`, \`md:\`, \`lg:\`, \`xl:\`) and use CSS custom properties for maximum flexibility.

## Breakpoints

- **sm**: 30rem (480px)
- **md**: 48rem (768px)
- **lg**: 62rem (992px)
- **xl**: 80rem (1280px)

## Features

- Modern range syntax media queries
- Fluid spacing with \`clamp()\`
- Mobile-first responsive design
- Follows project rem-only standards
- CSS custom properties for theming

## Usage

Combine base classes with responsive modifiers for adaptive layouts:

\`\`\`html
<div className="flex flex-col md:flex-row gap-md items-center">
  <div className="flex-1">Content</div>
  <div className="flex-1">Content</div>
</div>
\`\`\`

## CSS Custom Properties

Override default spacing by setting CSS variables:

\`\`\`css
:root {
  --flex-gap-sm: 0.5rem;  /* Default small gap */
  --flex-gap-md: 0.75rem; /* Default medium gap */
  --flex-gap-lg: 1rem;    /* Default large gap */
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

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
