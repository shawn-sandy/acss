import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Select from "./select";
import "./select.scss";
import React from "react";

const meta: Meta<typeof Select> = {
  title: "FP.React Forms/Select",
  tags: ["stable"],
  component: Select,
  parameters: {
    docs: {
      description: {
        component: "Accessible select dropdown component with themeable arrow and validation support. Follows fpkit component conventions with ref forwarding and custom styling options.",
      },
    },
  },
  args: {
    children: (
      <>
        <Select.Option value="option1" label="Option 1" />
        <Select.Option value="option2" label="Option 2" />
        <Select.Option value="option3" label="Option 3" />
      </>
    ),
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * Default select component with standard options using the new API
 */
export const SelectComponent: Story = {
  args: {
    id: "default-select",
    name: "defaultSelect",
    children: (
      <>
        <Select.Option value="us" label="United States" />
        <Select.Option value="uk" label="United Kingdom" />
        <Select.Option value="ca" label="Canada" />
        <Select.Option value="au" label="Australia" />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", "default-select");
  },
} as Story;

/**
 * Select with label prop for display text
 */
export const WithLabels: Story = {
  args: {
    children: (
      <>
        <Select.Option value="sm" label="Small (SM)" />
        <Select.Option value="md" label="Medium (MD)" />
        <Select.Option value="lg" label="Large (LG)" />
        <Select.Option value="xl" label="Extra Large (XL)" />
      </>
    ),
  },
} as Story;

/**
 * Select with children instead of label prop
 */
export const WithChildren: Story = {
  args: {
    children: (
      <>
        <Select.Option value="react">⚛️ React</Select.Option>
        <Select.Option value="vue">💚 Vue</Select.Option>
        <Select.Option value="angular">🔺 Angular</Select.Option>
        <Select.Option value="svelte">🧡 Svelte</Select.Option>
      </>
    ),
  },
} as Story;

/**
 * Select with disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    children: (
      <>
        <Select.Option value="available" label="Available Option" />
        <Select.Option value="disabled1" label="Disabled Option" disabled />
        <Select.Option value="active" label="Active Option" />
        <Select.Option value="disabled2" label="Another Disabled" disabled />
      </>
    ),
  },
} as Story;

/**
 * Required select field
 */
export const Required: Story = {
  args: {
    id: "required-select",
    name: "requiredSelect",
    required: true,
    children: (
      <>
        <Select.Option value="" label="-- Select an option --" />
        <Select.Option value="option1" label="Option 1" />
        <Select.Option value="option2" label="Option 2" />
        <Select.Option value="option3" label="Option 3" />
      </>
    ),
  },
} as Story;

/**
 * Disabled select component
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Select.Option value="option1" label="Option 1" />
        <Select.Option value="option2" label="Option 2" />
      </>
    ),
  },
} as Story;

/**
 * Select with custom styling
 */
export const CustomStyling: Story = {
  args: {
    styles: {
      "--select-arrow-color": "#0066cc",
      "--input-border-color": "#0066cc",
      "--input-radius": "1rem",
    } as React.CSSProperties,
    classes: "custom-select",
    children: (
      <>
        <Select.Option value="option1" label="Styled Option 1" />
        <Select.Option value="option2" label="Styled Option 2" />
        <Select.Option value="option3" label="Styled Option 3" />
      </>
    ),
  },
} as Story;

/**
 * Styled options with variant data attributes
 */
export const StyledWithVariants: Story = {
  args: {
    children: (
      <>
        <Select.Option value="default" label="Default Option" />
        <Select.Option value="primary" label="Primary Option" variant="primary" />
        <Select.Option value="success" label="Success Option" variant="success" />
        <Select.Option value="error" label="Error Option" variant="error" />
        <Select.Option value="warning" label="Warning Option" variant="warning" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Options with variant data attributes for CSS targeting: `option[data-option=\"primary\"]`",
      },
    },
  },
} as Story;

/**
 * Options with size variants
 */
export const WithSizes: Story = {
  args: {
    children: (
      <>
        <Select.Option value="sm" label="Small Option" size="sm" />
        <Select.Option value="md" label="Medium Option" size="md" />
        <Select.Option value="lg" label="Large Option" size="lg" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Options with size data attributes: `option[data-size=\"sm\"]`",
      },
    },
  },
} as Story;

/**
 * Options with custom data attributes
 */
export const WithCustomDataAttributes: Story = {
  args: {
    children: (
      <>
        <Select.Option
          value="premium"
          label="Premium Plan"
          dataAttributes={{ 'data-category': 'premium', 'data-featured': true }}
        />
        <Select.Option
          value="standard"
          label="Standard Plan"
          dataAttributes={{ 'data-category': 'standard' }}
        />
        <Select.Option
          value="basic"
          label="Basic Plan"
          dataAttributes={{ 'data-category': 'basic', 'data-price': 0 }}
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Options with custom data attributes for advanced styling: `option[data-category=\"premium\"]`",
      },
    },
  },
} as Story;

/**
 * Legacy API - backwards compatibility with selectValue and selectLabel
 * @deprecated Use `value` and `label` props instead
 */
export const LegacyAPI: Story = {
  args: {
    children: (
      <>
        <Select.Option selectValue="legacy1" selectLabel="Legacy Option 1" />
        <Select.Option selectValue="legacy2" selectLabel="Legacy Option 2" />
        <Select.Option selectValue="legacy3" selectLabel="Legacy Option 3" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Example using deprecated `selectValue` and `selectLabel` props. Use `value` and `label` instead.",
      },
    },
  },
} as Story;
