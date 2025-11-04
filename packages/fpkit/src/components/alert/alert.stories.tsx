import { StoryObj, Meta, StoryFn } from "@storybook/react-vite";
import { within, expect, userEvent, fn } from "storybook/test";

import Alert from "./alert";
import WithInstructions from "#decorators/instructions.jsx";
import React from "react";

const ButtonDecorator = (Story: StoryFn) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Open Alert</button>
      <Story
        args={{
          open: isOpen,
          title: "Alert Title",
          children: "This is an alert message",
          dismissible: false,
        }}
      />
    </div>
  );
};

const instructions = (
  <>
    <p>We are testing the following interactions on the alert:</p>
    <ul>
      <li>Tab through the alert.</li>
      <li>Check if the button gets focused.</li>
      <li>Click the button to dismiss the alert.</li>
      <li>Check that the alert is no longer in the document.</li>
    </ul>
  </>
);

const meta: Meta<typeof Alert> = {
  title: "FP.REACT Components/Alert",
  component: Alert,
  tags: ["beta"],
  parameters: {
    docs: {
      description: {
        component: `The Alert component is used to display important messages to users with support for multiple severity levels, variants, and accessibility features.

## CSS Variables

Customize the Alert appearance using CSS custom properties:

### Layout & Structure
- \`--alert-bg\`: Background color (default: \`whitesmoke\`)
- \`--alert-color\`: Text color (default: \`currentColor\`)
- \`--alert-border\`: Border style (default: \`thin solid currentColor\`)
- \`--alert-radius\`: Border radius (default: \`var(--border-radius)\`)
- \`--alert-padding\`: Internal padding (default: \`var(--spc-4)\`)
- \`--alert-margin-block-end\`: Bottom margin (default: none)
- \`--alert-gap\`: Gap between icon and content (default: \`var(--spc-4)\`)

### Severity Colors (Success)
- \`--alert-success-bg\`: Success background (default: \`#e6f4ea\`)
- \`--alert-success-border\`: Success border (default: \`#34a853\`)
- \`--alert-success-text\`: Success text (default: \`#1e4620\`)

### Severity Colors (Error)
- \`--alert-error-bg\`: Error background (default: \`#fdeded\`)
- \`--alert-error-border\`: Error border (default: \`#d32f2f\`)
- \`--alert-error-text\`: Error text (default: \`#5f2120\`)

### Severity Colors (Warning)
- \`--alert-warning-bg\`: Warning background (default: \`#fff4e5\`)
- \`--alert-warning-border\`: Warning border (default: \`#ff9800\`)
- \`--alert-warning-text\`: Warning text (default: \`#663c00\`)

### Severity Colors (Info)
- \`--alert-info-bg\`: Info background (default: \`#e5f6fd\`)
- \`--alert-info-border\`: Info border (default: \`#0288d1\`)
- \`--alert-info-text\`: Info text (default: \`#084154\`)

### Typography
- \`--alert-title-fw\`: Title font weight (default: \`600\`)
- \`--alert-title-fs\`: Title font size (default: \`inherit\`)

### Animation
- \`--alert-transition-duration\`: Animation timing (default: \`0.3s\`)

**Example:**
\`\`\`css
[role="alert"] {
  --alert-radius: 0.5rem;
  --alert-padding: 1.5rem;
  --alert-gap: 1rem;
  --alert-title-fw: 700;
  --alert-success-bg: #d4edda;
  --alert-success-border: #28a745;
}
\`\`\``,
      },
    },
  },
  args: {
    title: "Alert Title",
    children:
      "The Alert component is used to display important messages to users.",
    dismissible: true,
    onDismiss: () => fn(),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is an alert message/i)).toBeInTheDocument();
  },
} as Story;

export const SuccessAlert: Story = {
  args: {
    open: true,
    severity: "success",
  },
} as Story;

export const WarningAlert: Story = {
  args: {
    open: true,
    severity: "warning",
  },
} as Story;

export const ErrorAlert: Story = {
  args: {
    open: true,
    severity: "error",
  },
} as Story;

export const InfoAlert: Story = {
  args: {
    open: true,
    severity: "info",
  },
} as Story;

export const OpenAlert: Story = {
  decorators: [ButtonDecorator],
} as Story;

export const InteractionTest: Story = {
  args: {
    open: true,
    className: "my alert",
    severity: "info",
  },
  decorators: [WithInstructions(instructions, "Alert interactions test:")],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    const dismissButton = canvas.getByRole("button", { name: /close alert/i });
    await step(
      "Check that the alert and button are in the document",
      async () => {
        expect(alert).toBeInTheDocument();
        expect(dismissButton).toBeInTheDocument();
      }
    );
    await step(
      "Tab through the alert and check if the button gets focused",
      async () => {
        await userEvent.tab({ delay: 500 });
        expect(dismissButton).toHaveFocus();
      }
    );
    await step("Click the button to dismiss the alert", async () => {
      await userEvent.click(dismissButton, { delay: 500 });
      expect(alert).not.toBeInTheDocument();
    });
  },
} as Story;

export const AutoDismissAlert: Story = {
  args: {
    open: true,
    severity: "success",
    autoHideDuration: 5000,
    title: "Auto-Dismiss Alert",
    children: "This alert will automatically dismiss after 5 seconds",
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with automatic dismissal after 5 seconds. Useful for temporary success messages.",
      },
    },
  },
} as Story;

export const WithActions: Story = {
  args: {
    open: true,
    severity: "warning",
    title: "Unsaved Changes",
    children: "You have unsaved changes. What would you like to do?",
    actions: (
      <>
        <button style={{ marginRight: '8px' }}>Save</button>
        <button>Discard</button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with custom action buttons for user interactions.",
      },
    },
  },
} as Story;

export const FilledVariant: Story = {
  args: {
    open: true,
    severity: "error",
    variant: "filled",
    title: "Error",
    children: "An error occurred while processing your request.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with filled variant - solid colored background for high emphasis.",
      },
    },
  },
} as Story;

export const SoftVariant: Story = {
  args: {
    open: true,
    severity: "info",
    variant: "soft",
    title: "Information",
    children: "This is an informational message with soft variant styling.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with soft variant - subtle background without border.",
      },
    },
  },
} as Story;

export const AutoFocusAlert: Story = {
  args: {
    open: true,
    severity: "error",
    autoFocus: true,
    title: "Critical Error",
    children: "This is a critical alert that automatically receives focus for screen readers.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with autoFocus enabled - useful for critical alerts that need immediate attention.",
      },
    },
  },
} as Story;

export const WithHeadingLevel: Story = {
  args: {
    open: true,
    severity: "info",
    title: "Section Alert",
    titleLevel: 2,
    children: "This alert uses an h2 heading for proper document structure. Use titleLevel to maintain heading hierarchy.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with configurable heading level (WCAG 1.3.1). Use titleLevel prop (2-6) to maintain proper heading hierarchy in your page structure.",
      },
    },
  },
} as Story;

export const WithPauseOnHover: Story = {
  args: {
    open: true,
    severity: "success",
    autoHideDuration: 5000,
    pauseOnHover: true,
    title: "Hover to Pause",
    children: "This alert will pause auto-dismiss when you hover over it or focus on it (WCAG 2.2.1).",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with pause on hover/focus enabled. Hovering over or focusing the alert pauses the auto-dismiss timer, allowing users more time to read the content.",
      },
    },
  },
} as Story;

export const CustomIconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        open={true}
        severity="info"
        iconSize={16}
        title="Small Icon (16px)"
        dismissible={true}
      >
        Compact alert with smaller icon, useful for dense layouts or secondary messages.
      </Alert>
      <Alert
        open={true}
        severity="warning"
        iconSize={24}
        title="Default Icon (24px)"
        dismissible={true}
      >
        Standard alert with default icon size, balanced for most use cases.
      </Alert>
      <Alert
        open={true}
        severity="error"
        iconSize={32}
        title="Large Icon (32px)"
        dismissible={true}
      >
        Prominent alert with larger icon for high-priority messages or larger viewports.
      </Alert>
      <Alert
        open={true}
        severity="success"
        iconSize={48}
        title="Extra Large Icon (48px)"
        dismissible={true}
      >
        Eye-catching alert with extra-large icon for critical success confirmations.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstration of customizable icon sizes. Use the `iconSize` prop to adjust the severity icon size based on your design needs and context.",
      },
    },
  },
} as Story;

export const AccessibilityShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        open={true}
        severity="error"
        title="Error Alert"
        titleLevel={2}
        autoFocus={true}
        dismissible={true}
      >
        Screen readers will announce "Error:" before the message. This alert is automatically focused.
      </Alert>
      <Alert
        open={true}
        severity="success"
        title="Success Alert"
        titleLevel={3}
        autoHideDuration={8000}
        pauseOnHover={true}
        dismissible={true}
      >
        This alert auto-dismisses in 8 seconds but pauses when hovered or focused.
      </Alert>
      <Alert
        open={true}
        severity="info"
        variant="filled"
        title="Info Alert"
        dismissible={true}
      >
        All dismiss buttons meet 44×44px touch target size (WCAG 2.5.5).
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of WCAG 2.1 Level AA accessibility features: screen reader announcements, configurable heading levels, pause on interaction, proper focus indicators, and adequate touch targets.",
      },
    },
  },
} as Story;

export const SimpleTextContent: Story = {
  args: {
    open: true,
    severity: "info",
    title: "Simple Text Alert",
    children: "This is a simple text message that will be wrapped in a paragraph tag automatically.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Default content type ('text') automatically wraps simple text content in a paragraph tag for proper semantic HTML.",
      },
    },
  },
} as Story;

export const ComplexContentWithList: Story = {
  args: {
    open: true,
    severity: "warning",
    title: "Action Required",
    contentType: "node",
    children: (
      <>
        <p>Please complete the following steps to secure your account:</p>
        <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
          <li>Review your recent login activity</li>
          <li>Update your password to a strong, unique passphrase</li>
          <li>Enable two-factor authentication</li>
          <li>Add a recovery email address</li>
        </ul>
      </>
    ),
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Using contentType='node' allows complex content structures like lists, multiple paragraphs, or custom layouts without automatic paragraph wrapping.",
      },
    },
  },
} as Story;

export const CustomLayoutContent: Story = {
  args: {
    open: true,
    severity: "success",
    title: "Deployment Complete",
    contentType: "node",
    children: (
      <div>
        <p>Your application has been successfully deployed to production.</p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '0.75rem',
          padding: '0.5rem',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '4px'
        }}>
          <div>
            <strong>Build #:</strong> 1234
          </div>
          <div>
            <strong>Duration:</strong> 2m 34s
          </div>
          <div>
            <strong>Environment:</strong> Production
          </div>
        </div>
      </div>
    ),
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "contentType='node' enables custom component layouts with complex structures, flexbox layouts, or styled components.",
      },
    },
  },
} as Story;

export const MultiParagraphContent: Story = {
  args: {
    open: true,
    severity: "info",
    title: "Important Update",
    contentType: "node",
    children: (
      <>
        <p style={{ marginBottom: '0.5rem' }}>
          We've made significant improvements to our privacy policy to better protect your data and give you more control over your information.
        </p>
        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          Please take a moment to review the changes. The new policy will take effect on January 1, 2026.
        </p>
      </>
    ),
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple paragraphs can be rendered when using contentType='node', allowing for more detailed alert messages.",
      },
    },
  },
} as Story;

export const ContentTypeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        open={true}
        severity="info"
        title="Text Mode (Default)"
        dismissible={true}
      >
        This simple text is automatically wrapped in a paragraph tag.
      </Alert>
      <Alert
        open={true}
        severity="warning"
        title="Node Mode"
        contentType="node"
        dismissible={true}
      >
        <p>This content uses node mode for custom structure.</p>
        <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
          <li>Supports lists</li>
          <li>Multiple elements</li>
          <li>Custom layouts</li>
        </ul>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of text mode (default) vs node mode for rendering alert content.",
      },
    },
  },
} as Story;
