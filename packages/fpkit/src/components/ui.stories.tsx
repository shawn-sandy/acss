import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useEffect } from "react";
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
  title: "FP/UI",
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

/**
 * Demonstrates accessible interactive elements with proper ARIA attributes.
 * All examples pass WCAG 2.1 AA accessibility checks.
 */
export const AccessibleInteractiveElements: Story = {
  render: function AccessibleInteractiveElementsStory() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Accessible button with aria-label for icon-only button */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Icon Button with aria-label
          </h4>
          <UI
            as="button"
            aria-label="Close dialog"
            onClick={() => alert("Dialog closed")}
            styles={{
              padding: "0.5rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "1.25rem",
              lineHeight: 1,
            }}
          >
            ×
          </UI>
        </div>

        {/* Accessible link with descriptive text */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Accessible Link
          </h4>
          <UI
            as="a"
            href="/products"
            styles={{
              color: "#007bff",
              textDecoration: "underline",
              padding: "0.5rem",
              display: "inline-block",
            }}
          >
            View all products
          </UI>
        </div>

        {/* Toggle button with aria-expanded */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Expandable Section
          </h4>
          <UI
            as="button"
            aria-expanded={isExpanded}
            aria-controls="expandable-content"
            onClick={() => setIsExpanded(!isExpanded)}
            styles={{
              padding: "0.75rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            {isExpanded ? "▼" : "▶"} Toggle Content
          </UI>
          {isExpanded && (
            <UI
              id="expandable-content"
              styles={{
                padding: "1rem",
                backgroundColor: "#f8f9fa",
                marginTop: "0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              This content is now visible and announced to screen readers.
            </UI>
          )}
        </div>

        {/* Custom interactive element with proper role and keyboard support */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Custom Interactive (div with role="button")
          </h4>
          <UI
            as="div"
            role="button"
            tabIndex={0}
            aria-label="Custom toggle"
            onClick={() => alert("Clicked!")}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                alert("Activated via keyboard!");
              }
            }}
            styles={{
              padding: "0.75rem 1rem",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "0.25rem",
              cursor: "pointer",
              userSelect: "none",
              display: "inline-block",
            }}
          >
            Press Enter or Space
          </UI>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Examples of accessible interactive elements using proper ARIA attributes, semantic HTML, and keyboard support. Run the Storybook a11y addon to verify these pass accessibility checks.",
      },
    },
  },
  tags: ["a11y"],
};

/**
 * Demonstrates accessibility patterns including focus management and ARIA attributes.
 */
export const AccessibilityPatterns: Story = {
  render: function AccessibilityPatternsStory() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [count, setCount] = React.useState(0);

    useEffect(() => {
      // Auto-focus on mount for keyboard navigation
      buttonRef.current?.focus();
    }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Focus management example */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Auto-focused Button (Focus Management)
          </h4>
          <UI
            as="button"
            ref={buttonRef}
            onClick={() => alert("Focused button clicked")}
            styles={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              outline: "2px solid transparent",
              outlineOffset: "2px",
            }}
            // Custom focus indicator with WCAG 2.4.7 compliant contrast
            onFocus={(e: React.FocusEvent<HTMLButtonElement>) => {
              e.currentTarget.style.outline = "2px solid #0056b3";
            }}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>) => {
              e.currentTarget.style.outline = "2px solid transparent";
            }}
          >
            This button auto-focused on mount
          </UI>
        </div>

        {/* ARIA live region for dynamic content */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            ARIA Live Region (Dynamic Updates)
          </h4>
          <UI
            as="button"
            onClick={() => setCount((c) => c + 1)}
            aria-describedby="counter-description"
            styles={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Increment Counter
          </UI>
          <UI
            id="counter-description"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            styles={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              backgroundColor: "#d4edda",
              borderRadius: "0.25rem",
            }}
          >
            Current count: {count}
          </UI>
        </div>

        {/* Semantic vs generic elements */}
        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Semantic HTML Choice
          </h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <UI
              as="button"
              type="button"
              styles={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              ✅ Semantic &lt;button&gt;
            </UI>
            <UI
              as="nav"
              aria-label="Secondary navigation"
              styles={{
                padding: "0.5rem 1rem",
                backgroundColor: "#6f42c1",
                color: "white",
                borderRadius: "0.25rem",
              }}
            >
              ✅ Semantic &lt;nav&gt;
            </UI>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates accessibility patterns including focus management, ARIA live regions for dynamic content, custom focus indicators, and semantic HTML usage.",
      },
    },
  },
  tags: ["a11y"],
};

/**
 * ⚠️ Shows common accessibility mistakes to avoid.
 * These examples intentionally violate accessibility guidelines to demonstrate what NOT to do.
 */
export const CommonAccessibilityMistakes: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fff3cd",
            borderLeft: "4px solid #ffc107",
            marginBottom: "1rem",
          }}
        >
          <strong>⚠️ Warning:</strong> These examples show common accessibility
          violations. Do NOT copy these patterns. They are shown for educational
          purposes only.
        </div>

        {/* Missing accessible name */}
        <div>
          <h4
            style={{ marginTop: 0, marginBottom: "0.5rem", color: "#dc3545" }}
          >
            ❌ BAD: Icon button without accessible name
          </h4>
          <UI
            as="button"
            onClick={() => {}}
            styles={{
              padding: "0.5rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "1.25rem",
            }}
          >
            ×
          </UI>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#721c24",
              marginTop: "0.5rem",
            }}
          >
            <strong>Problem:</strong> Screen readers cannot identify this
            button's purpose. <strong>Fix:</strong> Add{" "}
            <code>aria-label="Close"</code>
          </p>
        </div>

        {/* Non-semantic clickable div */}
        <div>
          <h4
            style={{ marginTop: 0, marginBottom: "0.5rem", color: "#dc3545" }}
          >
            ❌ BAD: Clickable div without keyboard support
          </h4>
          <UI
            as="div"
            onClick={() => alert("This is not keyboard accessible!")}
            styles={{
              padding: "0.75rem 1rem",
              backgroundColor: "#6c757d",
              color: "white",
              borderRadius: "0.25rem",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            Click me (but you can't use keyboard!)
          </UI>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#721c24",
              marginTop: "0.5rem",
            }}
          >
            <strong>Problem:</strong> Not keyboard accessible or announced to
            screen readers. <strong>Fix:</strong> Use <code>as="button"</code>{" "}
            or add <code>role="button"</code>, <code>tabIndex=0</code>, and
            keyboard handlers.
          </p>
        </div>

        {/* Poor contrast focus indicator */}
        <div>
          <h4
            style={{ marginTop: 0, marginBottom: "0.5rem", color: "#dc3545" }}
          >
            ❌ BAD: Insufficient focus indicator contrast
          </h4>
          <UI
            as="button"
            styles={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              outline: "1px solid #4da3ff",
            }}
          >
            Low contrast focus
          </UI>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#721c24",
              marginTop: "0.5rem",
            }}
          >
            <strong>Problem:</strong> Focus indicator contrast ratio is less
            than 3:1 (WCAG 2.4.7). <strong>Fix:</strong> Use a contrasting color
            like dark blue on light blue background.
          </p>
        </div>

        {/* Vague link text */}
        <div>
          <h4
            style={{ marginTop: 0, marginBottom: "0.5rem", color: "#dc3545" }}
          >
            ❌ BAD: Non-descriptive link text
          </h4>
          <UI
            as="a"
            href="#"
            styles={{
              color: "#007bff",
              textDecoration: "underline",
            }}
          >
            Click here
          </UI>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#721c24",
              marginTop: "0.5rem",
            }}
          >
            <strong>Problem:</strong> "Click here" doesn't describe the link's
            destination. <strong>Fix:</strong> Use descriptive text like "View
            product documentation".
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "⚠️ Educational examples showing common accessibility violations. These patterns should be avoided. Each example includes an explanation of the problem and how to fix it. Run the Storybook a11y addon to see these violations detected automatically.",
      },
    },
  },
  tags: ["a11y"],
};
