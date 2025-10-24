import React from "react";
import { StoryObj, Meta } from "@storybook/react-vite";
import List from "./list";

const meta: Meta<typeof List> = {
  title: "FP.React Components/List",
  tags: ["version:1.0.0", "accessibility:wcag-aa"],
  component: List,
  parameters: {
    docs: {
      description: {
        component: `
A flexible, accessible list component supporting unordered (ul), ordered (ol), and definition (dl) lists with WCAG 2.1 AA compliance.

## Features
- 🎯 Multiple list types (ul, ol, dl)
- ♿ WCAG 2.1 AA compliant
- 🎨 Built-in variants (inline, compact, spaced, custom, none)
- ⚡ React.forwardRef support
- 📦 Compound component pattern
- 🎨 CSS custom properties for theming

## Accessibility
- Semantic HTML with native screen reader support
- role="list" override for Safari/VoiceOver when styling is removed
- ARIA label support
- Keyboard navigation compatible
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["ul", "ol", "dl"],
      description: "Type of list element to render",
      table: {
        defaultValue: { summary: "ul" },
      },
    },
    variant: {
      control: "select",
      options: ["none", "inline", "compact", "spaced", "custom"],
      description: "Variant for custom styling",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    role: {
      control: "text",
      description: "ARIA role override (use 'list' when removing list styling)",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
    },
    children: {
      control: false,
      description: "Child elements (typically List.ListItem components)",
    },
    styles: {
      control: "object",
      description: "Inline CSS styles (can include CSS custom properties)",
    },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof List>;

// =============================================================================
// Basic Examples
// =============================================================================

export const DefaultUnorderedList: Story = {
  args: {
    children: (
      <>
        <List.ListItem>React - A JavaScript library for building UIs</List.ListItem>
        <List.ListItem>TypeScript - JavaScript with syntax for types</List.ListItem>
        <List.ListItem>SCSS - Syntactically Awesome Style Sheets</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic unordered list with default bullet styling. Uses semantic `<ul>` element.",
      },
    },
  },
};

export const OrderedList: Story = {
  args: {
    type: "ol",
    "aria-label": "Installation steps",
    children: (
      <>
        <List.ListItem>Clone the repository from GitHub</List.ListItem>
        <List.ListItem>Install dependencies with npm install</List.ListItem>
        <List.ListItem>Run the development server with npm start</List.ListItem>
        <List.ListItem>Open localhost:6006 in your browser</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Sequential numbered list perfect for instructions, steps, or ranked items. Uses semantic `<ol>` element.",
      },
    },
  },
};

export const DefinitionList: Story = {
  args: {
    type: "dl",
    children: (
      <>
        <List.ListItem type="dt">HTML</List.ListItem>
        <List.ListItem type="dd">HyperText Markup Language - The standard markup language for web pages</List.ListItem>

        <List.ListItem type="dt">CSS</List.ListItem>
        <List.ListItem type="dd">Cascading Style Sheets - Describes how HTML elements are displayed</List.ListItem>

        <List.ListItem type="dt">JavaScript</List.ListItem>
        <List.ListItem type="dd">High-level programming language for web development</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Definition list for term-definition pairs, glossaries, or metadata. Uses semantic `<dl>`, `<dt>`, and `<dd>` elements.",
      },
    },
  },
};

// =============================================================================
// Variant Examples
// =============================================================================

export const InlineList: Story = {
  args: {
    variant: "inline",
    role: "list",
    "aria-label": "Main navigation",
    children: (
      <>
        <List.ListItem><a href="/">Home</a></List.ListItem>
        <List.ListItem><a href="/about">About</a></List.ListItem>
        <List.ListItem><a href="/products">Products</a></List.ListItem>
        <List.ListItem><a href="/contact">Contact</a></List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal list layout using flexbox. Perfect for navigation menus. Remember to add `role='list'` when removing list styling.",
      },
    },
  },
};

export const UnstyledList: Story = {
  args: {
    variant: "none",
    role: "list",
    "aria-label": "Feature highlights",
    children: (
      <>
        <List.ListItem>✓ No bullets or numbers</List.ListItem>
        <List.ListItem>✓ Clean, minimal design</List.ListItem>
        <List.ListItem>✓ Still accessible with role='list'</List.ListItem>
        <List.ListItem>✓ Great for custom icons</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "List with all default styling removed. **Important:** Add `role='list'` to restore list semantics for Safari/VoiceOver.",
      },
    },
  },
};

export const CompactList: Story = {
  args: {
    variant: "compact",
    children: (
      <>
        <List.ListItem>Reduced spacing</List.ListItem>
        <List.ListItem>Tighter layout</List.ListItem>
        <List.ListItem>More items visible</List.ListItem>
        <List.ListItem>Perfect for sidebars</List.ListItem>
        <List.ListItem>Dense information</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Reduced spacing between items for more compact layouts. Useful in sidebars, footers, or dense information displays.",
      },
    },
  },
};

export const SpacedList: Story = {
  args: {
    variant: "spaced",
    children: (
      <>
        <List.ListItem>Increased spacing</List.ListItem>
        <List.ListItem>Better readability</List.ListItem>
        <List.ListItem>Comfortable layout</List.ListItem>
        <List.ListItem>Focus on individual items</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Increased spacing between items for better readability and visual comfort. Great for feature lists and content-heavy items.",
      },
    },
  },
};

export const CustomMarkerList: Story = {
  args: {
    variant: "custom",
    styles: {
      "--list-marker-content": '"→"',
      "--list-marker-color": "#0066cc",
      "--list-marker-size": "1.25em",
    } as React.CSSProperties,
    children: (
      <>
        <List.ListItem>Custom arrow marker</List.ListItem>
        <List.ListItem>Brand color applied</List.ListItem>
        <List.ListItem>Larger marker size</List.ListItem>
        <List.ListItem>Fully customizable</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Custom list markers using CSS custom properties. Set `--list-marker-content`, `--list-marker-color`, and `--list-marker-size` to customize.",
      },
    },
  },
};

// =============================================================================
// Nested Lists
// =============================================================================

export const NestedUnorderedList: Story = {
  args: {
    children: (
      <>
        <List.ListItem>
          Frontend Technologies
          <List>
            <List.ListItem>React - Component-based library</List.ListItem>
            <List.ListItem>Vue - Progressive framework</List.ListItem>
            <List.ListItem>Svelte - Compiler-based framework</List.ListItem>
          </List>
        </List.ListItem>
        <List.ListItem>
          Backend Technologies
          <List>
            <List.ListItem>Node.js - JavaScript runtime</List.ListItem>
            <List.ListItem>Python - Versatile language</List.ListItem>
            <List.ListItem>Go - Fast and efficient</List.ListItem>
          </List>
        </List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Hierarchical list structure with nested lists. Automatically uses different bullet styles for nested levels (disc → circle → square).",
      },
    },
  },
};

export const MixedNestedList: Story = {
  args: {
    type: "ul",
    children: (
      <>
        <List.ListItem>
          Getting Started
          <List type="ol">
            <List.ListItem>Read the documentation</List.ListItem>
            <List.ListItem>Install the package</List.ListItem>
            <List.ListItem>Run the examples</List.ListItem>
          </List>
        </List.ListItem>
        <List.ListItem>
          Advanced Topics
          <List type="ol">
            <List.ListItem>TypeScript integration</List.ListItem>
            <List.ListItem>Custom theming</List.ListItem>
            <List.ListItem>Performance optimization</List.ListItem>
          </List>
        </List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Mix different list types to create complex hierarchical structures. Combines unordered parent with ordered children.",
      },
    },
  },
};

// =============================================================================
// Styling Examples
// =============================================================================

export const CustomStyledList: Story = {
  args: {
    styles: {
      "--list-marker-color": "#d63384",
      "--list-gap": "1rem",
      "--list-item-margin-bottom": "0.75rem",
      "--list-font-size": "1.125rem",
    } as React.CSSProperties,
    children: (
      <>
        <List.ListItem>Custom marker color (brand magenta)</List.ListItem>
        <List.ListItem>Increased gap between items</List.ListItem>
        <List.ListItem>Larger font size (1.125rem)</List.ListItem>
        <List.ListItem>Fully themeable via CSS variables</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrate CSS custom property theming. Override `--list-marker-color`, `--list-gap`, `--list-item-margin-bottom`, and `--list-font-size`.",
      },
    },
  },
};

export const ColoredMarkers: Story = {
  args: {
    type: "ol",
    styles: {
      "--list-marker-color": "#16a34a",
    } as React.CSSProperties,
    children: (
      <>
        <List.ListItem>Green numbered markers</List.ListItem>
        <List.ListItem>Uses --list-marker-color variable</List.ListItem>
        <List.ListItem>Works with all list types</List.ListItem>
        <List.ListItem>Simple and effective</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Change marker color for ordered lists using the `--list-marker-color` CSS variable.",
      },
    },
  },
};

// =============================================================================
// Accessibility Examples
// =============================================================================

export const AccessibleNavigationList: Story = {
  render: () => (
    <nav>
      <List variant="inline" role="list" aria-label="Main navigation">
        <List.ListItem><a href="/">Home</a></List.ListItem>
        <List.ListItem><a href="/about">About Us</a></List.ListItem>
        <List.ListItem><a href="/services">Services</a></List.ListItem>
        <List.ListItem><a href="/blog">Blog</a></List.ListItem>
        <List.ListItem><a href="/contact">Contact</a></List.ListItem>
      </List>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accessible navigation menu using inline list variant with proper ARIA labeling and role restoration.",
      },
    },
  },
};

export const AccessibleFeatureList: Story = {
  render: () => (
    <List variant="none" role="list" aria-label="Product features">
      <List.ListItem>
        <span role="img" aria-label="Checkmark">✓</span>
        <span> Unlimited projects</span>
      </List.ListItem>
      <List.ListItem>
        <span role="img" aria-label="Checkmark">✓</span>
        <span> 24/7 customer support</span>
      </List.ListItem>
      <List.ListItem>
        <span role="img" aria-label="Checkmark">✓</span>
        <span> Advanced analytics dashboard</span>
      </List.ListItem>
      <List.ListItem>
        <span role="img" aria-label="Checkmark">✓</span>
        <span> Free updates forever</span>
      </List.ListItem>
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-based feature list with proper accessibility. Icons have `role='img'` and descriptive `aria-label`.",
      },
    },
  },
};

// =============================================================================
// Complex Examples
// =============================================================================

export const RichContentList: Story = {
  render: () => (
    <List>
      <List.ListItem>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0066cc" }}>Premium Package</h3>
        <p style={{ margin: "0 0 0.5rem 0" }}>All features included with priority support and dedicated account manager.</p>
        <button style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Learn More</button>
      </List.ListItem>
      <List.ListItem>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0066cc" }}>Standard Package</h3>
        <p style={{ margin: "0 0 0.5rem 0" }}>Core features perfect for individuals and small teams.</p>
        <button style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Learn More</button>
      </List.ListItem>
      <List.ListItem>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0066cc" }}>Basic Package</h3>
        <p style={{ margin: "0 0 0.5rem 0" }}>Essential features to get started quickly.</p>
        <button style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Learn More</button>
      </List.ListItem>
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story: "List items can contain complex content like headings, paragraphs, buttons, and images. Maintains semantic structure.",
      },
    },
  },
};

export const NestedDefinitionList: Story = {
  args: {
    type: "dl",
    children: (
      <>
        <List.ListItem type="dt">Web Development</List.ListItem>
        <List.ListItem type="dd">
          Creating and maintaining websites and web applications
          <List type="dl">
            <List.ListItem type="dt">Frontend</List.ListItem>
            <List.ListItem type="dd">User interface and client-side logic</List.ListItem>
            <List.ListItem type="dt">Backend</List.ListItem>
            <List.ListItem type="dd">Server-side logic and database management</List.ListItem>
          </List>
        </List.ListItem>

        <List.ListItem type="dt">Mobile Development</List.ListItem>
        <List.ListItem type="dd">Building applications for mobile devices</List.ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Nested definition lists for hierarchical term-definition structures. Useful for complex glossaries.",
      },
    },
  },
};

// =============================================================================
// Edge Cases & Testing
// =============================================================================

export const EmptyList: Story = {
  render: () => <List aria-label="Empty list example">{undefined}</List>,
  parameters: {
    docs: {
      description: {
        story: "List with no children renders an empty list element. Still maintains semantic structure.",
      },
    },
  },
};

export const SingleItemList: Story = {
  args: {
    children: <List.ListItem>Single item in the list</List.ListItem>,
  },
  parameters: {
    docs: {
      description: {
        story: "List with a single item. Valid semantic HTML, though consider if a list is necessary.",
      },
    },
  },
};

export const LongList: Story = {
  render: () => (
    <List variant="compact">
      {Array.from({ length: 20 }, (_, i) => (
        <List.ListItem key={i}>Item {i + 1} - Lorem ipsum dolor sit amet</List.ListItem>
      ))}
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story: "Long list with many items. Uses compact variant to save space. Demonstrates performance with dynamic content.",
      },
    },
  },
};
