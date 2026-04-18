import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";

import { Fieldset } from "./landmarks";

const meta: Meta<typeof Fieldset> = {
  title: "FP.React Components/Layout/Fieldset",
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component: `Fieldset component for semantic content grouping with optional legend.

## Features

- **Semantic HTML** - Uses native \`<fieldset>\` and \`<legend>\` elements
- **Accessible** - Automatic \`role="group"\` for screen readers
- **Optional Legend** - Flexible content grouping with or without visible label
- **CSS Custom Properties** - Full theming control
- **Variants** - Inline legend and grouped emphasis styles

## CSS Variables

### Fieldset
- \`--fieldset-border\`: Border style (default: 1px solid #ccc)
- \`--fieldset-border-radius\`: Border radius (default: 0.5rem)
- \`--fieldset-padding\`: General padding (default: 1rem)
- \`--fieldset-padding-inline\`: Horizontal padding (default: 1.5rem)
- \`--fieldset-padding-block\`: Vertical padding (default: 1rem)
- \`--fieldset-margin-block\`: Vertical margin (default: 2rem)
- \`--fieldset-bg\`: Background color (default: transparent)

### Legend
- \`--legend-fs\`: Font size (default: 1rem)
- \`--legend-fw\`: Font weight (default: 600)
- \`--legend-padding-inline\`: Horizontal padding (default: 0.5rem)
- \`--legend-color\`: Text color (default: currentColor)

## Variants

### Inline Legend (\`data-legend="inline"\`)
Compact layout with legend displayed inline:
- Removes border and padding
- Floats legend to inline-start
- Adds horizontal margin after legend

### Grouped (\`data-fieldset="grouped"\`)
Emphasized styling for important sections:
- Subtle background color
- Thicker accent border
- Increased padding and font weight
`,
      },
    },
  },
  args: {
    children: "Default Fieldset Content",
  },
  tags: ["stable"],
} as Meta;

export default meta;
type Story = StoryObj<typeof Fieldset>;

// Basic fieldset
export const BasicFieldset: Story = {
  args: {
    legend: "Personal Information",
    children: (
      <>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("Personal Information")).toBeInTheDocument();
  },
};

// Inline legend
export const InlineLegendFieldset: Story = {
  args: {
    legend: "Status:",
    "data-legend": "inline",
    children: <p>Active</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute("data-legend", "inline");
  },
};

// Grouped variant
export const GroupedFieldset: Story = {
  args: {
    legend: "Account Settings",
    "data-fieldset": "grouped",
    children: (
      <>
        <p>
          <strong>Username:</strong> johndoe
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute(
      "data-fieldset",
      "grouped"
    );
  },
};

// No legend example
export const FieldsetNoLegend: Story = {
  args: {
    children: <p>Grouped content without visible legend</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.queryAllByRole("legend")).toHaveLength(0);
  },
};

// Custom styled fieldset
export const CustomStyledFieldset: Story = {
  args: {
    legend: "Custom Styled",
    children: (
      <>
        <p>This fieldset demonstrates custom CSS variable overrides.</p>
        <p>Border, background, and typography are customized.</p>
      </>
    ),
    styles: {
      "--fieldset-border": "2px dashed #666",
      "--fieldset-bg": "#f0f0f0",
      "--legend-color": "#0066cc",
      "--legend-fs": "1.25rem",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("Custom Styled")).toBeInTheDocument();
  },
};

// Accessibility Test - WCAG 2.1 Level AA Compliance
export const AccessibilityTest: Story = {
  args: {
    id: "contact-fieldset",
    legend: "Contact Information",
    description: "Please provide your contact details for follow-up",
    children: (
      <>
        <label htmlFor="a11y-name">
          Name <span aria-label="required">*</span>
        </label>
        <input id="a11y-name" type="text" required />

        <label htmlFor="a11y-email">
          Email <span aria-label="required">*</span>
        </label>
        <input id="a11y-email" type="email" required />

        <label htmlFor="a11y-phone">Phone (optional)</label>
        <input id="a11y-phone" type="tel" />
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify group role", async () => {
      const fieldset = canvas.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    await step("Verify aria-describedby", async () => {
      const fieldset = canvas.getByRole("group");
      expect(fieldset).toHaveAttribute("aria-describedby");
      expect(fieldset.getAttribute("aria-describedby")).toBe(
        "contact-fieldset-desc"
      );
    });

    await step("Verify description is present", async () => {
      expect(
        canvas.getByText(/provide your contact details/i)
      ).toBeInTheDocument();
    });

    await step("Test keyboard navigation", async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await userEvent.tab();
      expect(nameInput).toHaveFocus();

      const emailInput = canvas.getByLabelText(/email/i);
      await userEvent.tab();
      expect(emailInput).toHaveFocus();

      const phoneInput = canvas.getByLabelText(/phone/i);
      await userEvent.tab();
      expect(phoneInput).toHaveFocus();
    });

    await step("Verify required fields marked", async () => {
      const requiredIndicators = canvas.getAllByLabelText(/required/i);
      expect(requiredIndicators).toHaveLength(2);
    });
  },
};

// Disabled Fieldset
export const DisabledFieldset: Story = {
  args: {
    id: "disabled-fieldset",
    legend: "Disabled Fieldset",
    description: "This fieldset and all its controls are disabled",
    disabled: true,
    children: (
      <>
        <label htmlFor="disabled-input">Input</label>
        <input id="disabled-input" type="text" disabled />

        <label htmlFor="disabled-select">Select</label>
        <select id="disabled-select" disabled>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify fieldset is disabled", async () => {
      expect(canvas.getByRole("group")).toBeDisabled();
    });

    await step("Verify inputs are disabled", async () => {
      expect(canvas.getByLabelText(/input/i)).toBeDisabled();
      expect(canvas.getByLabelText(/select/i)).toBeDisabled();
    });
  },
};

// With Form Controls - Real world example
export const WithFormControls: Story = {
  args: {
    id: "shipping-address",
    legend: "Shipping Address",
    description: "This address will be used for delivery",
    "data-fieldset": "grouped",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="street">
            Street Address <span aria-label="required">*</span>
          </label>
          <input
            id="street"
            type="text"
            style={{ width: "100%", padding: "0.5rem" }}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="city">
              City <span aria-label="required">*</span>
            </label>
            <input
              id="city"
              type="text"
              style={{ width: "100%", padding: "0.5rem" }}
              required
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="state">
              State <span aria-label="required">*</span>
            </label>
            <input
              id="state"
              type="text"
              style={{ width: "100%", padding: "0.5rem" }}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="zip">
            ZIP Code <span aria-label="required">*</span>
          </label>
          <input
            id="zip"
            type="text"
            style={{ width: "200px", padding: "0.5rem" }}
            required
          />
        </div>
      </div>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify fieldset structure", async () => {
      const fieldset = canvas.getByRole("group");
      expect(fieldset).toBeInTheDocument();
      expect(fieldset).toHaveAttribute("data-fieldset", "grouped");
    });

    await step("Verify all form fields are accessible", async () => {
      expect(canvas.getByLabelText(/street address/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/city/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/state/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/zip code/i)).toBeInTheDocument();
    });

    await step("Test form navigation", async () => {
      const streetInput = canvas.getByLabelText(/street address/i);
      await userEvent.tab();
      expect(streetInput).toHaveFocus();

      await userEvent.type(streetInput, "123 Main St");
      expect(streetInput).toHaveValue("123 Main St");
    });
  },
};

// Multiple Fieldsets - Complex form example
export const MultipleFieldsets: Story = {
  render: () => (
    <>
      <Fieldset
        id="personal-info"
        legend="Personal Information"
        description="Basic information about you"
      >
        <label htmlFor="multi-name">Name</label>
        <input id="multi-name" type="text" style={{ padding: "0.5rem" }} />
      </Fieldset>

      <Fieldset
        id="contact-info"
        legend="Contact Information"
        description="How we can reach you"
        data-fieldset="grouped"
      >
        <label htmlFor="multi-email">Email</label>
        <input id="multi-email" type="email" style={{ padding: "0.5rem" }} />

        <label htmlFor="multi-phone">Phone</label>
        <input id="multi-phone" type="tel" style={{ padding: "0.5rem" }} />
      </Fieldset>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify multiple fieldsets rendered", async () => {
      const fieldsets = canvas.getAllByRole("group");
      expect(fieldsets).toHaveLength(2);
    });

    await step("Verify each has aria-describedby", async () => {
      const fieldsets = canvas.getAllByRole("group");
      fieldsets.forEach((fieldset) => {
        expect(fieldset).toHaveAttribute("aria-describedby");
      });
    });
  },
};
