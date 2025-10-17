import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useEffect } from "react";
import UI from "./ui";

/**
 * The UI component is a polymorphic React primitive that can render as any HTML element
 * while maintaining full TypeScript type safety. It serves as the foundation for 25+
 * components across the fpkit library.
 *
 * ## Key Features
 * - Polymorphic rendering with the `as` prop
 * - Full TypeScript type safety for element-specific props
 * - Style merging with `defaultStyles` and `styles`
 * - Proper ref forwarding with typed refs
 * - Zero runtime overhead
 */
const meta = {
  title: "UI",
  component: UI,
  tags: ["autodocs", "primitive"],
  parameters: {
    docs: {
      description: {
        component:
          "A foundational polymorphic component that can render as any HTML element with complete type safety.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "div",
        "span",
        "button",
        "a",
        "section",
        "article",
        "nav",
        "main",
        "header",
        "footer",
      ],
      description: "The HTML element type to render",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "div" },
      },
    },
    styles: {
      control: "object",
      description: "Inline styles to apply (overrides defaultStyles)",
      table: {
        type: { summary: "React.CSSProperties" },
      },
    },
    classes: {
      control: "text",
      description: "CSS class names to apply",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: "text",
      description: "Content to render inside the component",
    },
  },
} satisfies Meta<typeof UI>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing the UI component rendering as a div with basic styling.
 */
export const Default: Story = {
  args: {
    children: "Default UI Component (renders as div)",
    styles: {
      padding: "1rem",
      backgroundColor: "#f0f0f0",
      borderRadius: "0.25rem",
    },
  },
};

/**
 * Demonstrates the UI component rendering as a button with button-specific props.
 */
export const AsButton: Story = {
  args: {
    as: "button",
    children: "Click Me",
    styles: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "0.25rem",
      cursor: "pointer",
      fontSize: "1rem",
    },
  },
};

/**
 * Demonstrates the UI component rendering as a span element.
 */
export const AsSpan: Story = {
  args: {
    as: "span",
    children: "Inline Span Element",
    styles: {
      fontWeight: "bold",
      color: "#28a745",
      padding: "0.25rem 0.5rem",
      backgroundColor: "#d4edda",
      borderRadius: "0.25rem",
    },
  },
};

/**
 * Demonstrates the UI component rendering as an anchor link with href.
 */
export const AsAnchor: Story = {
  args: {
    as: "a",
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "External Link",
    styles: {
      color: "#007bff",
      textDecoration: "underline",
      padding: "0.5rem",
      display: "inline-block",
    },
  },
};

/**
 * Demonstrates the UI component rendering as a semantic section element.
 */
export const AsSection: Story = {
  args: {
    as: "section",
    children: (
      <>
        <h2 style={{ marginTop: 0 }}>Section Title</h2>
        <p>
          This demonstrates the UI component rendering as a semantic section
          element.
        </p>
      </>
    ),
    styles: {
      padding: "1.5rem",
      backgroundColor: "#fff3cd",
      border: "1px solid #ffc107",
      borderRadius: "0.25rem",
    },
  },
};

/**
 * Shows how the `styles` prop applies inline styles.
 */
export const WithStyles: Story = {
  args: {
    children: "Styled with inline CSS",
    styles: {
      padding: "1rem 2rem",
      backgroundColor: "#6f42c1",
      color: "white",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
};

/**
 * Shows how the `classes` prop applies CSS class names.
 */
export const WithClasses: Story = {
  args: {
    children: "Element with CSS classes",
    classes: "custom-class another-class",
    styles: {
      padding: "1rem",
      border: "2px dashed #17a2b8",
    },
  },
};

/**
 * Demonstrates how `styles` overrides `defaultStyles`.
 */
export const StyleMerging: Story = {
  args: {
    children: "Style Merging Example",
    defaultStyles: {
      padding: "1rem",
      backgroundColor: "lightblue",
      color: "blue",
      fontSize: "1rem",
      borderRadius: "0.25rem",
    },
    styles: {
      color: "red", // This overrides the blue color
      fontWeight: "bold", // This is added
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `defaultStyles` provide base styling (blue text, light blue background), while `styles` overrides specific properties (text becomes red and bold).",
      },
    },
  },
};

/**
 * Demonstrates using CSS custom properties for theming.
 */
export const CSSCustomProperties: Story = {
  args: {
    children: "Themed with CSS Variables",
    styles: {
      "--primary-color": "#28a745",
      "--secondary-color": "#ffffff",
      padding: "1rem 1.5rem",
      backgroundColor: "var(--primary-color)",
      color: "var(--secondary-color)",
      borderRadius: "0.25rem",
    } as React.CSSProperties,
  },
  parameters: {
    docs: {
      description: {
        story:
          "CSS custom properties (variables) can be set dynamically through the styles prop for theming.",
      },
    },
  },
};

/**
 * Demonstrates ref forwarding with proper typing.
 */
export const RefForwarding: Story = {
  render: () => {
    const RefExample = () => {
      const buttonRef = useRef<HTMLButtonElement>(null);

      useEffect(() => {
        // Focus the button on mount
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }, []);

      return (
        <UI
          as="button"
          ref={buttonRef}
          styles={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Auto-focused Button
        </UI>
      );
    };

    return <RefExample />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "The UI component forwards refs with proper typing. This button is automatically focused when mounted.",
      },
    },
  },
};

/**
 * Example of building a Button component using UI as a primitive.
 */
export const ButtonPattern: Story = {
  render: () => {
    interface ButtonProps {
      variant?: "primary" | "secondary" | "danger";
      children: React.ReactNode;
      onClick?: () => void;
    }

    const Button = ({
      variant = "primary",
      children,
      ...props
    }: ButtonProps) => {
      const variantStyles = {
        primary: {
          backgroundColor: "#007bff",
          color: "white",
        },
        secondary: {
          backgroundColor: "#6c757d",
          color: "white",
        },
        danger: {
          backgroundColor: "#dc3545",
          color: "white",
        },
      };

      return (
        <UI
          as="button"
          defaultStyles={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "1rem",
            ...variantStyles[variant],
          }}
          {...props}
        >
          {children}
        </UI>
      );
    };

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "This shows how to build a Button component with variants using UI as the primitive.",
      },
    },
  },
};

/**
 * Example of building a Badge component using UI as a primitive.
 */
export const BadgePattern: Story = {
  render: () => {
    interface BadgeProps {
      variant?: "info" | "success" | "warning" | "error";
      children: React.ReactNode;
    }

    const Badge = ({ variant = "info", children, ...props }: BadgeProps) => {
      const variantStyles = {
        info: {
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
        },
        success: {
          backgroundColor: "#d4edda",
          color: "#155724",
        },
        warning: {
          backgroundColor: "#fff3cd",
          color: "#856404",
        },
        error: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      };

      return (
        <UI
          as="span"
          defaultStyles={{
            display: "inline-block",
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
            borderRadius: "0.25rem",
            ...variantStyles[variant],
          }}
          {...props}
        >
          {children}
        </UI>
      );
    };

    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "This shows how to build a Badge component with variants using UI as the primitive.",
      },
    },
  },
};

/**
 * Demonstrates TypeScript type safety - element-specific props are correctly typed.
 */
export const TypeSafeProps: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Button with disabled prop (only valid for buttons) */}
        <UI
          as="button"
          disabled
          styles={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "not-allowed",
            opacity: 0.6,
          }}
        >
          Disabled Button
        </UI>

        {/* Anchor with href and target (only valid for anchors) */}
        <UI
          as="a"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          styles={{
            color: "#007bff",
            textDecoration: "none",
            padding: "0.5rem",
          }}
        >
          GitHub Link
        </UI>

        {/* Form with onSubmit (only valid for forms) */}
        <UI
          as="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            alert("Form submitted!");
          }}
          styles={{
            padding: "1rem",
            border: "1px solid #dee2e6",
            borderRadius: "0.25rem",
          }}
        >
          <button type="submit">Submit Form</button>
        </UI>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "TypeScript ensures that only valid props for each element type are accepted. Try changing the `as` prop to see IntelliSense update!",
      },
    },
  },
};
