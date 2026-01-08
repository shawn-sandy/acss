import type { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect, fn } from "storybook/test";
import React from "react";

import { Checkbox } from "./checkbox";
import "./checkbox.scss";

const checkboxChanged = fn();

const meta = {
  title: "FP.React Forms/Inputs/Checkbox",
  component: Checkbox,
  tags: ["beta"],
  args: {
    onChange: checkboxChanged,
  },
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
} as Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default checkbox with interactive play function testing.
 *
 * Tests keyboard navigation (Tab, Space) and mouse interaction.
 */
export const CheckboxComponent: Story = {
  args: {
    id: "default-checkbox",
    label: "Accept terms and conditions",
    onChange: checkboxChanged,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("Checkbox is rendered", async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    await step("Checkbox gets focus on tab", async () => {
      await userEvent.tab();
      expect(checkbox).toHaveFocus();
    });

    await step("Checkbox toggles on space key", async () => {
      await userEvent.keyboard("{space}");
      expect(checkbox).toBeChecked();
    });

    await step("Checkbox toggles on click", async () => {
      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    await step("onChange handler is called", async () => {
      await userEvent.click(checkbox);
      expect(checkboxChanged).toHaveBeenCalled();
    });
  },
};

/**
 * Size variants: small (sm), medium (md), large (lg)
 *
 * All sizes maintain proper touch target accessibility.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox id="size-sm" label="Small checkbox" size="sm" />
      <Checkbox id="size-md" label="Medium checkbox (default)" size="md" />
      <Checkbox id="size-lg" label="Large checkbox" size="lg" />
    </div>
  ),
};

/**
 * Color variants: primary, secondary, error, success
 *
 * All colors meet WCAG 2.1 AA contrast requirements (4.5:1 minimum).
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox
        id="color-primary"
        label="Primary (Blue - 4.68:1 contrast)"
        color="primary"
        defaultChecked
      />
      <Checkbox
        id="color-secondary"
        label="Secondary (Gray - 7.56:1 contrast)"
        color="secondary"
        defaultChecked
      />
      <Checkbox
        id="color-error"
        label="Error (Red - 5.14:1 contrast)"
        color="error"
        defaultChecked
      />
      <Checkbox
        id="color-success"
        label="Success (Green - 4.54:1 contrast)"
        color="success"
        defaultChecked
      />
    </div>
  ),
};

/**
 * Checkbox states: unchecked, checked, indeterminate, disabled
 *
 * Indeterminate state is useful for "select all" patterns.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox id="state-unchecked" label="Unchecked" />
      <Checkbox id="state-checked" label="Checked" defaultChecked />
      <Checkbox id="state-indeterminate" label="Indeterminate" indeterminate />
      <Checkbox
        id="state-disabled-unchecked"
        label="Disabled (unchecked)"
        disabled
      />
      <Checkbox
        id="state-disabled-checked"
        label="Disabled (checked)"
        disabled
        defaultChecked
      />
      <Checkbox
        id="state-disabled-indeterminate"
        label="Disabled (indeterminate)"
        disabled
        indeterminate
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Checkbox supports multiple states:
- **Unchecked**: Default state
- **Checked**: Selected state
- **Indeterminate**: Partial selection (e.g., some but not all items selected)
- **Disabled**: Non-interactive state (remains focusable for accessibility)

Disabled checkboxes use aria-disabled to maintain keyboard focusability per WCAG 2.1 AA.
        `,
      },
    },
  },
};

/**
 * Checkbox with description helper text
 *
 * Description is linked via aria-describedby for screen readers.
 */
export const WithDescription: Story = {
  args: {
    id: "description-checkbox",
    label: "Enable email notifications",
    description:
      "Receive email updates about important changes to your account",
  },
};

/**
 * Checkbox with validation error
 *
 * Error message is linked via aria-errormessage when validationState="invalid".
 */
export const WithError: Story = {
  args: {
    id: "error-checkbox",
    label: "I accept the terms and conditions",
    required: true,
    validationState: "invalid",
    errorMessage: "You must accept the terms to continue",
  },
};

/**
 * Label positioning: left vs right
 *
 * Label can appear before or after the checkbox.
 */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox
        id="label-right"
        label="Label on right (default)"
        labelPosition="right"
      />
      <Checkbox id="label-left" label="Label on left" labelPosition="left" />
    </div>
  ),
};

/**
 * Controlled mode with React state
 *
 * Checkbox state is managed by parent component.
 */
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Checkbox
          id="controlled-checkbox"
          label="Subscribe to newsletter"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          State: <strong>{checked ? "Checked" : "Unchecked"}</strong>
        </div>
        <button
          type="button"
          onClick={() => setChecked(!checked)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            background: "white",
            cursor: "pointer",
          }}
        >
          Toggle via button
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
In controlled mode, the parent component manages the checkbox state via the \`checked\` prop and \`onChange\` handler.

Use controlled mode when you need to:
- Sync checkbox state with other UI elements
- Validate or transform input before updating state
- Integrate with form libraries
        `,
      },
    },
  },
};

/**
 * Uncontrolled mode with defaultChecked
 *
 * Browser manages checkbox state internally.
 */
export const Uncontrolled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox
        id="uncontrolled-unchecked"
        label="Starts unchecked"
        defaultChecked={false}
      />
      <Checkbox
        id="uncontrolled-checked"
        label="Starts checked"
        defaultChecked={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
In uncontrolled mode, use \`defaultChecked\` to set the initial state. The browser manages the state internally.

Use uncontrolled mode when:
- Building simple forms without complex validation
- You don't need to read the value until form submission
- State management overhead isn't needed
        `,
      },
    },
  },
};

/**
 * Required field indicator
 *
 * Shows asterisk and sets aria-required for screen readers.
 */
export const Required: Story = {
  args: {
    id: "required-checkbox",
    label: "I agree to the privacy policy",
    required: true,
  },
};

/**
 * Complex form with validation
 *
 * Demonstrates multiple checkboxes with description, validation, and states.
 */
export const ComplexForm: Story = {
  render: function ComplexFormExample() {
    const [accepted, setAccepted] = React.useState(false);
    const [newsletter, setNewsletter] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "32rem",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Account Preferences
        </h3>

        <Checkbox
          id="terms-checkbox"
          label="I accept the terms and conditions"
          required
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          validationState={submitted && !accepted ? "invalid" : "none"}
          errorMessage="You must accept the terms to continue"
          description="Read our terms and conditions before accepting"
        />

        <Checkbox
          id="newsletter-checkbox"
          label="Subscribe to newsletter"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          description="Receive monthly updates about new features"
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.375rem",
            background: "#2563eb",
            color: "white",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        {submitted && accepted && (
          <div
            style={{
              padding: "1rem",
              background: "#d4edda",
              border: "1px solid #c3e6cb",
              borderRadius: "0.375rem",
              color: "#155724",
            }}
          >
            ✓ Form submitted successfully!
            {newsletter && " You're subscribed to the newsletter."}
          </div>
        )}
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete form example demonstrating:
- Required checkboxes with validation
- Optional checkboxes
- Description text
- Error messages
- Form submission handling
        `,
      },
    },
  },
};

/**
 * Select All pattern with indeterminate state
 *
 * Common pattern for batch selection with "select all" checkbox.
 */
export const SelectAll: Story = {
  render: function SelectAllExample() {
    const items = [
      { id: "item-1", label: "Item 1" },
      { id: "item-2", label: "Item 2" },
      { id: "item-3", label: "Item 3" },
      { id: "item-4", label: "Item 4" },
    ];

    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const allSelected = selectedItems.length === items.length;
    const someSelected = selectedItems.length > 0 && !allSelected;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedItems(items.map((item) => item.id));
      } else {
        setSelectedItems([]);
      }
    };

    const handleItemToggle = (itemId: string) => {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Checkbox
          id="select-all"
          label="Select all"
          checked={allSelected}
          indeterminate={someSelected}
          onChange={handleSelectAll}
          styles={{
            fontWeight: 600,
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "0.75rem",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            paddingLeft: "1.5rem",
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={item.label}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleItemToggle(item.id)}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            color: "#4b5563",
          }}
        >
          Selected: <strong>{selectedItems.length}</strong> of{" "}
          <strong>{items.length}</strong> items
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
The "select all" pattern uses the indeterminate state to show partial selection:

- **Unchecked**: No items selected
- **Indeterminate**: Some items selected (shows dash)
- **Checked**: All items selected

This provides clear visual feedback about selection state at a glance.
        `,
      },
    },
  },
};

/**
 * Custom styling with CSS variables
 *
 * Demonstrates customization using CSS custom properties.
 */
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: "1rem" }}>Custom Size</h4>
        <Checkbox
          id="custom-size"
          label="Extra large checkbox"
          defaultChecked
          styles={
            {
              "--checkbox-size": "2rem",
              "--checkbox-label-fs": "1.25rem",
            } as React.CSSProperties
          }
        />
      </div>

      <div>
        <h4 style={{ marginTop: 0, marginBottom: "1rem" }}>
          Custom Colors (Brand Purple)
        </h4>
        <Checkbox
          id="custom-color"
          label="Custom brand color"
          defaultChecked
          styles={
            {
              "--checkbox-checked-bg": "#7c3aed",
              "--checkbox-checked-border": "#7c3aed",
              "--checkbox-focus-outline-color": "#c4b5fd",
            } as React.CSSProperties
          }
        />
      </div>

      <div>
        <h4 style={{ marginTop: 0, marginBottom: "1rem" }}>Rounded Style</h4>
        <Checkbox
          id="custom-rounded"
          label="Fully rounded checkbox"
          defaultChecked
          styles={
            {
              "--checkbox-radius": "100rem",
            } as React.CSSProperties
          }
        />
      </div>

      <div>
        <h4 style={{ marginTop: 0, marginBottom: "1rem" }}>
          No Border, Shadow Style
        </h4>
        <Checkbox
          id="custom-shadow"
          label="Shadow instead of border"
          defaultChecked
          styles={
            {
              "--checkbox-border": "none",
              "--checkbox-bg": "#f3f4f6",
              "--checkbox-checked-bg": "#10b981",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Customize checkbox appearance using CSS custom properties:

**Available Variables:**
- \`--checkbox-size\`: Checkbox dimensions
- \`--checkbox-checked-bg\`: Background when checked
- \`--checkbox-checked-border\`: Border when checked
- \`--checkbox-radius\`: Border radius
- \`--checkbox-focus-outline-color\`: Focus indicator color
- \`--checkbox-label-fs\`: Label font size
- And many more! See STYLES.mdx for complete reference.
        `,
      },
    },
  },
};
