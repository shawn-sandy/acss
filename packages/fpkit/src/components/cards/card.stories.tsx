import { StoryObj, Meta } from "@storybook/react-vite";
import Card from "./card";

const content =
  "Enim aliquip excepteur veniam esse culpa. Et exercitation incididunt occaecat incididunt proident consectetur. Voluptate elit reprehenderit nulla reprehenderit excepteur tempor adipisicing officia eiusmod est id aute. Nisi do et nulla fugiat enim id pariatur ex. Culpa aliquip excepteur velit fugiat qui magna deserunt adipisicing dolore quis. Esse proident qui consectetur Lorem id fugiat elit amet proident enim deserunt dolore sit.";

const meta: Meta<typeof Card> = {
  title: "FP.REACT Components/Card",
  tags: ["rc", "autodocs"],
  component: Card,
  args: {
    children: <p>{content}</p>,
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'article', 'section', 'aside'],
      description: 'HTML element to render',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable keyboard navigation and button semantics',
    },
    role: {
      control: 'text',
      description: 'ARIA role attribute',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A flexible, accessible card component with compound component pattern. Supports polymorphic rendering, interactive variants, and WCAG 2.1 AA compliance.',
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
    'aria-label': 'View product details',
  },
  render: (args) => (
    <Card
      {...args}
      onClick={() => alert('Card clicked!')}
      style={{ cursor: 'pointer' }}
    >
      <Card.Title>Interactive Product Card</Card.Title>
      <Card.Content>
        <p>
          This card is fully interactive! Click anywhere or use your keyboard
          (Tab to focus, Enter or Space to activate) to trigger the action.
        </p>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Try it: Tab to focus this card, then press Enter or Space.
        </p>
      </Card.Content>
      <Card.Footer>
        <span style={{ color: '#007bff', fontWeight: 'bold' }}>
          Click to learn more →
        </span>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards support full keyboard navigation (Enter/Space keys) and automatically receive proper ARIA attributes for accessibility.',
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
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
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
        story: 'Demonstrates best practices for accessible cards using aria-labelledby to provide context to assistive technologies.',
      },
    },
  },
} as Story;

/**
 * Polymorphic Card - Shows different HTML elements
 */
export const PolymorphicElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        story: 'The Card component supports polymorphic rendering via the `as` prop, allowing you to use semantic HTML elements while maintaining consistent styling.',
      },
    },
  },
} as Story;

/**
 * Custom Heading Levels - Demonstrates heading hierarchy
 */
export const CustomHeadingLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        <Card.Content>Subsection title level - this is the default</Card.Content>
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
        story: 'Card.Title supports all heading levels (h1-h6) to maintain proper document outline and heading hierarchy.',
      },
    },
  },
} as Story;
