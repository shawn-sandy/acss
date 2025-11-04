import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent, fn } from "storybook/test";
import { useRef, useEffect } from "react";
import Link from "./link";
import type { LinkProps } from "./link.types";
import "../../styles/link/link.css";

const meta = {
  title: "FP.React Components/Links",
  tags: ["version:1.0.0", "autodocs"],
  component: Link,
  args: {
    href: "/",
    children: "Link",
  },
  argTypes: {
    href: {
      control: "text",
      description: "The URL the link points to",
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Where to open the linked URL",
    },
    rel: {
      control: "text",
      description: "Relationship between current and linked document",
    },
    prefetch: {
      control: "boolean",
      description: "Hint to browser to prefetch the resource",
    },
    btnStyle: {
      control: "text",
      description: "Apply button styling to the link",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `A semantic, accessible anchor component with enhanced security for external links and flexible styling variants.

## CSS Variables

### Typography & Color
- \`--link-color\`: Link text color (default: #085ab7)
- \`--link-fw\`: Font weight (default: 400)
- \`--link-fs\`: Font size (default: 1rem)

### Text Decoration
- \`--link-decoration\`: Text decoration style (default: none, underline on hover/focus)
- \`--link-decoration-offset\`: Underline offset (default: 0.09375rem / 1.5px)
- \`--link-decoration-thickness\`: Underline thickness (default: 0.0625rem / 1px)
- \`--link-skip-ink\`: Text decoration skip ink (default: auto)

### Background & Border
- \`--link-bg\`: Background color (default: transparent)
- \`--link-radius\`: Border radius (default: 0.25rem, 99rem for pills)

### Spacing (Button Variants)
- \`--link-padding-inline\`: Horizontal padding (default: 0, calculated for button variants)
- \`--link-padding-block\`: Vertical padding (default: 0, calculated for button variants)

### Focus Indicators (WCAG 2.4.7)
- \`--link-focus-color\`: Focus outline color (default: currentColor)
- \`--link-focus-width\`: Focus outline width (default: 0.125rem / 2px)
- \`--link-focus-offset\`: Focus outline offset (default: 0.125rem / 2px)
- \`--link-focus-style\`: Focus outline style (default: solid)

### Transitions
- \`--link-transition\`: Transition timing (default: all 0.75s ease-in-out)

### Button Variants
- \`--link-button-color\`: Button link text color (default: var(--link-color))
- \`--link-border-width\`: Button border width (default: 0.125rem / 2px)
- \`--link-border-color\`: Button border color (default: currentColor)
- \`--link-border-style\`: Button border style (default: solid)
`,
      },
    },
  },
} as Meta<typeof Link>;

export default meta;
type Story = StoryObj<LinkProps>;

/**
 * Basic link component with default styling.
 * Links should have descriptive text that makes sense out of context.
 */
export const Default: Story = {
  args: {
    href: "/about",
    children: "About Us",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify basic rendering
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("About Us");
    expect(link).toHaveAttribute("href", "/about");

    // Verify accessibility
    expect(link).toBeVisible();
    expect(link.tagName).toBe("A");
  },
};

/**
 * External link with automatic security attributes.
 * The component automatically adds rel="noopener noreferrer" for target="_blank".
 */
export const ExternalLink: Story = {
  args: {
    href: "https://www.google.com",
    target: "_blank",
    children: "Visit Google",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify external link attributes
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Visit Google");
    expect(link).toHaveAttribute("href", "https://www.google.com");
    expect(link).toHaveAttribute("target", "_blank");

    // Verify automatic security attributes
    const rel = link.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  },
};

/**
 * External link with prefetch hint.
 * Combines security attributes with performance optimization.
 */
export const ExternalLinkWithPrefetch: Story = {
  args: {
    href: "https://example.com/next-page",
    target: "_blank",
    prefetch: true,
    children: "Prefetch Example",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify prefetch is included with security
    const rel = link.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    expect(rel).toContain("prefetch");
  },
};

/**
 * External link with custom rel attributes.
 * Custom rel values are merged with security defaults, not overwritten.
 */
export const ExternalLinkWithCustomRel: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "nofollow author",
    children: "External Link with Custom Rel",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify all rel tokens are present (merged, not replaced)
    const rel = link.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    expect(rel).toContain("nofollow");
    expect(rel).toContain("author");
  },
};

/**
 * Button-styled link using <b> wrapper.
 * Maintains semantic <a> element while applying button appearance.
 */
export const ButtonStyled: Story = {
  args: {
    href: "/signup",
    children: <b>Sign Up Now</b>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Wrapping link text in `<b>` automatically applies button styling. This is useful for call-to-action links.",
      },
    },
  },
};

/**
 * Pill-styled button link using <i> wrapper.
 * Applies rounded pill styling with button appearance.
 */
export const PillStyled: Story = {
  args: {
    href: "/get-started",
    children: <i>Get Started</i>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Wrapping link text in `<i>` applies pill (fully rounded) button styling.",
      },
    },
  },
};

/**
 * Button-styled link with custom border radius.
 * Demonstrates CSS custom property override.
 */
export const ButtonWithCustomRadius: Story = {
  args: {
    href: "/action",
    children: <b>Custom Radius</b>,
    styles: {
      "--link-radius": "0.5rem",
    } as React.CSSProperties,
  },
};

/**
 * Link with custom color using CSS variables.
 * All styling is controlled via CSS custom properties.
 */
export const CustomColor: Story = {
  args: {
    href: "/products",
    children: "Browse Products",
    styles: {
      "--link-color": "#d63384",
      "--link-decoration": "underline",
    } as React.CSSProperties,
  },
};

/**
 * Keyboard navigation test.
 * Verifies link is keyboard accessible with proper focus indicators.
 */
export const KeyboardNavigation: Story = {
  args: {
    href: "/keyboard-test",
    children: "Keyboard Accessible Link",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Tab to the link
    await userEvent.tab();

    // Verify focus
    expect(link).toHaveFocus();

    // Verify the link is announced by screen readers
    expect(link).toHaveAccessibleName("Keyboard Accessible Link");
  },
};

/**
 * Icon-only link with aria-label.
 * Demonstrates accessible pattern for icon-only links.
 */
export const IconOnlyWithAriaLabel: Story = {
  args: {
    href: "/settings",
    "aria-label": "Open settings",
    children: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
      </svg>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify accessible name from aria-label
    expect(link).toHaveAccessibleName("Open settings");

    // Verify SVG is hidden from screen readers
    const svg = link.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  },
};

/**
 * Skip link pattern with ref forwarding.
 * Demonstrates programmatic focus management for accessibility.
 */
export const SkipLink: Story = {
  render: () => {
    const SkipLinkExample = () => {
      const mainRef = useRef<HTMLAnchorElement>(null);

      useEffect(() => {
        // Simulate focus on mount (for demonstration)
        const timer = setTimeout(() => {
          mainRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
      }, []);

      return (
        <div style={{ padding: "1rem" }}>
          <Link ref={mainRef} href="#main-content">
            Skip to main content
          </Link>
          <p id="main-content" style={{ marginTop: "1rem" }}>
            Main content starts here
          </p>
        </div>
      );
    };

    return <SkipLinkExample />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates ref forwarding for programmatic focus management. Useful for skip links and keyboard navigation patterns.",
      },
    },
  },
};

/**
 * Email link (mailto:).
 * Demonstrates non-HTTP URL schemes.
 */
export const EmailLink: Story = {
  args: {
    href: "mailto:hello@example.com",
    children: "Contact us via email",
  },
};

/**
 * Phone link (tel:).
 * Demonstrates telephone URL scheme.
 */
export const PhoneLink: Story = {
  args: {
    href: "tel:+1234567890",
    children: "Call us: +1 (234) 567-890",
  },
};

/**
 * Link with onClick event handler (RECOMMENDED).
 * onClick fires for all activation methods including keyboard.
 */
export const WithOnClick: Story = {
  args: {
    href: "/products",
    children: "Track All Activations",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Recommended**: Use `onClick` for analytics and tracking. It captures mouse clicks, touch events, AND keyboard activation (Enter key).",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Click with mouse
    await userEvent.click(link);

    // Also works with keyboard
    link.focus();
    await userEvent.keyboard("{Enter}");

    // Check console for both events
  },
};

/**
 * Link with onPointerDown event handler.
 * Only fires for pointer events (mouse, touch, pen) - NOT keyboard.
 */
export const WithOnPointerDown: Story = {
  args: {
    href: "/products",
    children: "Track Pointer Only",
    onPointerDown: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "⚠️ **Accessibility Note**: `onPointerDown` does NOT fire for keyboard activation (Enter key). Use `onClick` if you need to track keyboard users.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Click with mouse - handler fires
    await userEvent.click(link);

    // Keyboard activation - handler does NOT fire
    link.focus();
    await userEvent.keyboard("{Enter}");

    // Check console - only one event logged (mouse click)
  },
};

/**
 * Link with both onClick and onPointerDown.
 * Demonstrates using both handlers together for comprehensive tracking.
 */
export const WithBothHandlers: Story = {
  args: {
    href: "/products",
    children: "Track Both Ways",
    onClick: fn(),
    onPointerDown: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use both handlers when you need comprehensive tracking: `onClick` captures all activations, while `onPointerDown` provides pointer-specific data.",
      },
    },
  },
};
