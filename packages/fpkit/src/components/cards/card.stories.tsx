import { StoryObj, Meta } from "@storybook/react-vite";
import Card from "./card";

const content =
  "Enim aliquip excepteur veniam esse culpa. Et exercitation incididunt occaecat incididunt proident consectetur. Voluptate elit reprehenderit nulla reprehenderit excepteur tempor adipisicing officia eiusmod est id aute. Nisi do et nulla fugiat enim id pariatur ex. Culpa aliquip excepteur velit fugiat qui magna deserunt adipisicing dolore quis. Esse proident qui consectetur Lorem id fugiat elit amet proident enim deserunt dolore sit.";

const meta: Meta<typeof Card> = {
  title: "FP.REACT Components/Card",
  tags: ["stable", "autodocs"],
  component: Card,
  args: {
    children: <p>{content}</p>,
    classes: "shadow-md",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "article", "section", "aside"],
      description: "HTML element to render",
    },
    interactive: {
      control: "boolean",
      description: "Enable keyboard navigation and button semantics",
    },
    role: {
      control: "text",
      description: "ARIA role attribute",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible, accessible card component with compound component pattern. Supports polymorphic rendering, interactive variants, and WCAG 2.1 AA compliance.",
      },
    },
  },
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const CardComponent: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    styles: {
      "--theme": "warm",
    },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Card {...args}>
        <p>
          Proident et amet aliqua excepteur sunt qui deserunt commodo tempor
          esse. Et aliqua nulla ea amet nisi consequat id adipisicing culpa
          ipsum minim voluptate est Lorem. Amet qui laboris incididunt commodo
          culpa aliqua veniam.
        </p>
      </Card>
      <Card>
        <p>
          Proident et amet aliqua excepteur sunt qui deserunt commodo tempor
          esse. Et aliqua nulla ea amet nisi consequat id adipisicing culpa
          ipsum minim voluptate est Lorem. Amet qui laboris incididunt commodo
          culpa aliqua veniam.
        </p>
      </Card>
      <Card>
        <p>
          Proident et amet aliqua excepteur sunt qui deserunt commodo tempor
          esse. Et aliqua nulla ea amet nisi consequat id adipisicing culpa
          ipsum minim voluptate est Lorem. Amet qui laboris incididunt commodo
          culpa aliqua veniam.
        </p>
      </Card>
    </div>
  ),
} as Story;

export const CardWithTitle: Story = {
  args: {},
  render: (args) => (
    <Card {...args}>
      <Card.Title>Card Title</Card.Title>
      <Card.Content>
        <p>
          This card demonstrates the usage of the CardTitle component. It shows
          how a title can be added to a card for better organization and visual
          hierarchy.
        </p>
      </Card.Content>
    </Card>
  ),
} as Story;

export const FlexibleContent: Story = {
  args: {
    styles: {
      // '--card-bg': '#f0f0f0',
    },
  },
  render: (args) => (
    <div data-flex="cols-4">
      <Card {...args}>
        <Card.Title>Card Title</Card.Title>
        <Card.Content>
          <p>
            This card demonstrates the usage of the CardTitle component. It
            shows how a title can be added to a card for better organization and
            visual hierarchy.
          </p>
        </Card.Content>
        <Card.Footer>
          <p>Footer Content</p>
        </Card.Footer>
      </Card>
      <Card {...args}>
        <Card.Title>Second Card Title</Card.Title>
        <Card.Content>
          <p>
            This card demonstrates the usage of the CardTitle component. It
            shows how a title can be added to a card for better organization and
            visual hierarchy.
          </p>
          <p>
            This card demonstrates the usage of the CardTitle component. It
            shows how a title can be added to a card for better organization and
            visual hierarchy.
          </p>
        </Card.Content>
        <Card.Footer>
          <p>Footer Content</p>
        </Card.Footer>
      </Card>
      <Card {...args}>
        <img src="https://picsum.photos/200" alt="Random Image" />
        <Card.Title>Second Card Title</Card.Title>
        <Card.Content>
          <p>
            This card demonstrates the usage of the CardTitle component. It
            shows how a title can be added to a card for better organization and
            visual hierarchy.
          </p>
        </Card.Content>
        <Card.Footer>
          <p>Footer Content</p>
        </Card.Footer>
      </Card>
      <Card {...args}>
        <img src="https://picsum.photos/200" alt="Random Image" />
        <Card.Title>Second Card Title</Card.Title>
        <Card.Content>
          <p>
            This card demonstrates the usage of the CardTitle component. It
            shows how a title can be added to a card for better organization and
            visual hierarchy.
          </p>
        </Card.Content>
        <Card.Footer>
          <p>Footer Content</p>
        </Card.Footer>
      </Card>
    </div>
  ),
} as Story;

/**
 * Interactive Card - Demonstrates clickable card with keyboard navigation
 */
export const InteractiveCard: Story = {
  args: {
    interactive: true,
    "aria-label": "View product details",
  },
  render: (args) => (
    <Card
      {...args}
      onClick={() => alert("Card clicked!")}
      style={{ cursor: "pointer" }}
    >
      <Card.Title>Interactive Product Card</Card.Title>
      <Card.Content>
        <p>
          This card is fully interactive! Click anywhere or use your keyboard
          (Tab to focus, Enter or Space to activate) to trigger the action.
        </p>
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
          Try it: Tab to focus this card, then press Enter or Space.
        </p>
      </Card.Content>
      <Card.Footer>
        <span style={{ color: "#007bff", fontWeight: "bold" }}>
          Click to learn more →
        </span>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive cards support full keyboard navigation (Enter/Space keys) and automatically receive proper ARIA attributes for accessibility.",
      },
    },
  },
} as Story;

/**
 * Accessible Card with ARIA - Demonstrates proper ARIA labeling
 */
export const AccessibleCard: Story = {
  render: () => (
    <Card as="article" aria-labelledby="product-title">
      <Card.Title id="product-title">Featured Product</Card.Title>
      <Card.Content as="div">
        <p>
          This card uses <code>aria-labelledby</code> to connect the title with
          the card container, providing an accessible name for screen readers.
        </p>
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
          Screen readers will announce: "Featured Product, article"
        </p>
      </Card.Content>
      <Card.Footer>
        <button>Add to Cart</button>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates best practices for accessible cards using aria-labelledby to provide context to assistive technologies.",
      },
    },
  },
} as Story;

/**
 * Polymorphic Card - Shows different HTML elements
 */
export const PolymorphicElements: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card as="article">
        <Card.Title as="h2">Article Card</Card.Title>
        <Card.Content>
          Renders as <code>&lt;article&gt;</code> element for standalone content
        </Card.Content>
      </Card>

      <Card as="section">
        <Card.Title as="h2">Section Card</Card.Title>
        <Card.Content>
          Renders as <code>&lt;section&gt;</code> element for thematic grouping
        </Card.Content>
      </Card>

      <Card as="aside">
        <Card.Title as="h3">Aside Card</Card.Title>
        <Card.Content>
          Renders as <code>&lt;aside&gt;</code> element for tangential content
        </Card.Content>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Card component supports polymorphic rendering via the `as` prop, allowing you to use semantic HTML elements while maintaining consistent styling.",
      },
    },
  },
} as Story;

/**
 * Custom Heading Levels - Demonstrates heading hierarchy
 */
export const CustomHeadingLevels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card>
        <Card.Title as="h1">Level 1 Heading</Card.Title>
        <Card.Content>Main page title level</Card.Content>
      </Card>

      <Card>
        <Card.Title as="h2">Level 2 Heading</Card.Title>
        <Card.Content>Section title level</Card.Content>
      </Card>

      <Card>
        <Card.Title as="h3">Level 3 Heading (Default)</Card.Title>
        <Card.Content>
          Subsection title level - this is the default
        </Card.Content>
      </Card>

      <Card>
        <Card.Title as="h4">Level 4 Heading</Card.Title>
        <Card.Content>Component title level</Card.Content>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card.Title supports all heading levels (h1-h6) to maintain proper document outline and heading hierarchy.",
      },
    },
  },
} as Story;

/**
 * CSS Variable Customization
 *
 * Demonstrates how to customize card appearance using the new standardized
 * CSS custom property naming convention.
 *
 * New variable naming patterns:
 * - Base properties: `--card-padding`, `--card-radius`, `--card-bg`, `--card-gap`
 * - Element-specific: `--card-header-*`, `--card-body-*`, `--card-footer-*`
 * - Full property names (no single-letter abbreviations)
 */
export const Customization: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Custom padding and spacing */}
      <div>
        <h4>Custom Padding & Spacing</h4>
        <Card
          styles={{
            "--card-padding": "3rem",
            "--card-radius": "1rem",
            "--card-gap": "1.5rem",
          }}
        >
          <Card.Title>Spacious Card</Card.Title>
          <Card.Content>
            <p>
              This card uses custom padding (3rem) and larger border radius
              (1rem).
            </p>
          </Card.Content>
        </Card>
      </div>

      {/* Compact card */}
      <div>
        <h4>Compact Card</h4>
        <Card
          styles={{
            "--card-padding": "1rem",
            "--card-radius": "0.25rem",
            "--card-gap": "0.5rem",
          }}
        >
          <Card.Title>Compact Card</Card.Title>
          <Card.Content>
            <p>
              This card uses minimal padding and smaller gaps for a compact
              layout.
            </p>
          </Card.Content>
        </Card>
      </div>

      {/* Custom header/footer styling */}
      <div>
        <h4>Element-Specific Customization (Header, Body, Footer)</h4>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Card
            styles={{
              "--card-header-padding": "1.5rem 2rem",
              "--card-header-bg": "#0066cc",
              "--card-header-border-bottom": "none",
              "--card-body-padding": "2rem",
              "--card-footer-padding": "1rem 2rem",
              "--card-footer-bg": "#f0f0f0",
              "--card-footer-border-top": "2px solid #ddd",
            }}
          >
            <header data-card-header style={{ color: "white" }}>
              <h3 style={{ margin: 0 }}>Custom Header</h3>
            </header>
            <div data-card-body>
              <p>
                This card demonstrates element-specific customization using the
                new scoped variables.
              </p>
              <p>
                Header has custom blue background, body has custom padding,
                footer has custom gray background.
              </p>
            </div>
            <footer data-card-footer>
              <small>Custom Footer Content</small>
            </footer>
          </Card>

          <Card
            styles={{
              "--card-header-padding": "0.75rem 1.25rem",
              "--card-header-bg": "#28a745",
              "--card-header-border-bottom": "3px solid #1e7e34",
              "--card-body-padding": "1.25rem",
              "--card-footer-padding": "0.75rem 1.25rem",
              "--card-footer-bg": "#e7f5ea",
            }}
          >
            <header data-card-header style={{ color: "white" }}>
              <h3 style={{ margin: 0 }}>Green Theme</h3>
            </header>
            <div data-card-body>
              <p>
                Another example with green theme and custom element spacing.
              </p>
            </div>
            <footer data-card-footer>
              <small>Footer with light green background</small>
            </footer>
          </Card>
        </div>
      </div>

      {/* Dark theme card */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <h4 style={{ color: "white", marginTop: 0 }}>Dark Theme Example</h4>
        <Card
          styles={{
            "--card-bg": "#2a2a2a",
            "--card-padding": "2rem",
            "--card-radius": "0.75rem",
            "--card-header-bg": "#3a3a3a",
            "--card-header-border-bottom": "1px solid #4a4a4a",
            "--card-footer-bg": "#3a3a3a",
            "--card-footer-border-top": "1px solid #4a4a4a",
          }}
        >
          <header data-card-header>
            <h3 style={{ margin: 0, color: "white" }}>Dark Mode Card</h3>
          </header>
          <div data-card-body style={{ color: "#e5e7eb" }}>
            <p>
              This card demonstrates dark theme customization with all
              element-specific variables.
            </p>
          </div>
          <footer data-card-footer style={{ color: "#9ca3af" }}>
            <small>Styled with CSS custom properties</small>
          </footer>
        </Card>
      </div>

      {/* Brand card */}
      <div>
        <h4>Brand Card (No Radius, Custom Colors)</h4>
        <Card
          styles={{
            "--card-bg": "#fff5e6",
            "--card-radius": "0",
            "--card-padding": "2.5rem",
            "--card-gap": "2rem",
            "--card-header-bg": "#ff9800",
            "--card-header-border-bottom": "4px solid #f57c00",
          }}
        >
          <header data-card-header>
            <h3 style={{ margin: 0, color: "white" }}>Brand Card</h3>
          </header>
          <div data-card-body>
            <p>
              This card uses brand colors and no border radius for a distinct
              look.
            </p>
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Available CSS Variables

### Base Properties
- \`--card-padding\`: Main card padding (default: 2rem)
- \`--card-bg\`: Background color (default: #fff)
- \`--card-radius\`: Border radius (default: calc(var(--card-padding) / 4))
- \`--card-display\`: Display property (default: flex)
- \`--card-direction\`: Flex direction (default: column)
- \`--card-gap\`: Gap between child elements (default: 1rem)

### Element-Specific Variables (NEW)
#### Header
- \`--card-header-padding\`: Header padding (default: 1rem 1.5rem)
- \`--card-header-bg\`: Header background color (default: #f8f9fa)
- \`--card-header-border-bottom\`: Header bottom border (default: 1px solid #dee2e6)

#### Body
- \`--card-body-padding\`: Body content padding (default: 1.5rem)

#### Footer
- \`--card-footer-padding\`: Footer padding (default: 1rem 1.5rem)
- \`--card-footer-bg\`: Footer background color (default: #f8f9fa)
- \`--card-footer-border-top\`: Footer top border (default: 1px solid #dee2e6)

### Migration from Old Names
- ❌ \`--card-p\` → ✅ \`--card-padding\`

### Usage with Element Selectors
Element-specific variables work with:
- \`<header>\` or \`[data-card-header]\`
- \`[data-card-body]\`
- \`<footer>\` or \`[data-card-footer]\`
        `,
      },
    },
  },
} as Story;
