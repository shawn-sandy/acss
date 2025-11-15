import React from "react";
import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent, fn } from "storybook/test";
import { useRef, useEffect } from "react";
import Link, { IconLink, LinkButton } from "./link";
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

## Features

- **Automatic Security**: External links (\`target="_blank"\`) automatically get \`rel="noopener noreferrer"\`
- **WCAG 2.1 AA Compliant**: Focus indicators, semantic HTML, keyboard navigation
- **Flexible Styling**: Text links, button-styled links, and pill variants
- **Performance**: Optional prefetch hints for faster navigation
- **Ref Forwarding**: Direct DOM access for focus management
- **Type-Safe**: Full TypeScript support with comprehensive prop types

## Exported Components

### Link (default)
Main component for creating semantic anchor elements with enhanced features.

### IconLink
Specialized component for icon-only or icon-with-text links.

### LinkButton
Convenience component for button-styled links.

## CSS Variables

All units use **rem** (not px). Base: 1rem = 16px.

### Typography & Color
- \`--link-color\`: Link text color (default: #085ab7)
- \`--link-fw\`: Font weight (default: 400)
- \`--link-fs\`: Font size (default: 1rem)

### Text Decoration
- \`--link-decoration\`: Text decoration style (default: none, underline on hover/focus)
- \`--link-decoration-offset\`: Underline offset (default: 0.09375rem)
- \`--link-decoration-thickness\`: Underline thickness (default: 0.0625rem)
- \`--link-skip-ink\`: Text decoration skip ink (default: auto)

### Background & Border
- \`--link-bg\`: Background color (default: transparent)
- \`--link-radius\`: Border radius (default: 0.25rem, 99rem for pills)

### Spacing
- \`--link-padding-inline\`: Horizontal padding (default: 0, calculated for button variants)
- \`--link-padding-block\`: Vertical padding (default: 0, calculated for button variants)

### Focus Indicators (WCAG 2.4.7)
- \`--link-focus-color\`: Focus outline color (default: currentColor)
- \`--link-focus-width\`: Focus outline width (default: 0.125rem)
- \`--link-focus-offset\`: Focus outline offset (default: 0.125rem)
- \`--link-focus-style\`: Focus outline style (default: solid)

### Transitions
- \`--link-transition\`: Transition timing (default: all 0.75s ease-in-out)

### Button Variant Variables
Applied when using \`btnStyle\` prop, \`data-btn\` attribute, or \`<b>\`/\`<i>\` wrappers:
- \`--link-button-color\`: Button link text color (default: var(--link-color))
- \`--link-border-width\`: Button border width (default: 0.125rem)
- \`--link-border-color\`: Button border color (default: currentColor)
- \`--link-border-style\`: Button border style (default: solid)

## Usage Patterns

### Button Styling (3 ways)
1. **btnStyle prop**: \`<Link href="/signup" btnStyle="btn">Sign Up</Link>\`
2. **Wrapper elements**: \`<Link href="/signup"><b>Sign Up</b></Link>\` (button) or \`<Link href="/signup"><i>Sign Up</i></Link>\` (pill)
3. **Direct attribute**: \`<Link href="/signup" data-btn>Sign Up</Link>\`
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

/**
 * Button-styled link using btnStyle prop.
 * Demonstrates direct usage of the btnStyle prop instead of wrapper elements.
 */
export const WithBtnStyleProp: Story = {
  args: {
    href: "/dashboard",
    btnStyle: "btn",
    children: "Go to Dashboard",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the `btnStyle` prop to apply button styling directly. This sets the `data-btn` attribute on the link element.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify btnStyle creates data-btn attribute
    expect(link).toHaveAttribute("data-btn", "btn");
    expect(link).toHaveTextContent("Go to Dashboard");
  },
};

/**
 * IconLink component for icon-based navigation.
 * Specialized component for links with icons.
 */
export const IconLinkComponent: Story = {
  render: () => (
    <IconLink
      href="/home"
      aria-label="Return to homepage"
      icon={
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
        </svg>
      }
    >
      {null}
    </IconLink>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `IconLink` component is a convenience wrapper for icon-based links. Always include an `aria-label` for accessibility and set `aria-hidden='true'` on the icon.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify accessible name
    expect(link).toHaveAccessibleName("Return to homepage");

    // Verify icon is hidden from screen readers
    const svg = link.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  },
};

/**
 * IconLink with text label.
 * Icon link with visible text alongside the icon.
 */
export const IconLinkWithText: Story = {
  render: () => (
    <IconLink
      href="/downloads"
      icon={
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={{ marginRight: "0.5rem" }}
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
      }
    >
      Download Files
    </IconLink>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconLink can contain both an icon and text. The icon is passed via the `icon` prop, and text is provided as children.",
      },
    },
  },
};

/**
 * LinkButton component for call-to-action links.
 * Convenience component that applies button styling automatically.
 */
export const LinkButtonComponent: Story = {
  render: () => (
    <LinkButton href="/get-started">
      <b>Get Started Free</b>
    </LinkButton>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `LinkButton` component is a convenience wrapper for button-styled links. It maintains semantic `<a>` element while providing button appearance.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    // Verify it's still a semantic anchor
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/get-started");
    expect(link).toHaveTextContent("Get Started Free");
  },
};

/**
 * LinkButton with custom styling.
 * Demonstrates CSS variable overrides on LinkButton.
 */
export const LinkButtonCustom: Story = {
  render: () => {
    const customStyles: React.CSSProperties = {
      "--link-button-color": "#ffffff",
      "--link-bg": "#0066cc",
      "--link-border-color": "#0066cc",
      "--link-radius": "0.5rem",
    } as React.CSSProperties;

    return (
      <LinkButton href="/signup" styles={customStyles}>
        <b>Sign Up Now</b>
      </LinkButton>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "LinkButton styling can be customized using CSS custom properties for colors, borders, and border radius.",
      },
    },
  },
};
