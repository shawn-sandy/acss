import { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect } from "storybook/test";

import Input from "./inputs";
import "./form.scss";

const meta: Meta<typeof Input> = {
  title: "FP.REACT  Forms/Inputs",
  component: Input,
  tags: ["rc"],
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'Use the `<Input type="***"/>` component to render an any input element -- text, email, number etc. Pass props like `name`, `value`, `placeholder` etc to control the input.',
      },
    },
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Input>;

export const InputComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("textbox")).toBeInTheDocument();
  },
};

//required input story
export const RequiredInput: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Displays a required input `aria-required="true"` on any input type the placeholder displays an `*` at the start of a default placeholder text to indicate it is required',
      },
    },
  },
  args: {
    type: "text",
    required: true,
    placeholder: "This Field is required (placeholder)",
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    expect(input).toBeRequired();

    await userEvent.type(input, "test");
    expect(input).toBeValid();

    await userEvent.clear(input);

    userEvent.type(input, "\n");
    expect(input).toBeInvalid();
  },
} as Story;

export const DefaultRequired: Story = {
  args: {
    type: "text",
    required: true,
  },
} as Story;

/**
 * Disabled input using WCAG-compliant aria-disabled pattern.
 *
 * Key accessibility features implemented by the optimized useDisabledState hook:
 * - Uses aria-disabled instead of native disabled attribute
 * - Remains keyboard focusable (in tab order)
 * - Prevents all interactions (typing, onChange events)
 * - Screen readers can discover and announce disabled state
 * - Automatic className merging (.is-disabled + custom classes)
 */
export const InputDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Displays a disabled input with \`aria-disabled="true"\`.

**Why aria-disabled instead of disabled?**
- Keeps input in tab order for screen reader users
- Allows focus for screen reader announcement
- Better contrast control for WCAG AA compliance
- Can show tooltips/help text even when disabled

Try tabbing to the input - it receives focus!
Try typing - interactions are prevented by the hook.
        `,
      },
    },
  },
  args: {
    type: "text",
    disabled: true,
    placeholder: "This input is disabled",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await step("Disabled input has aria-disabled attribute", async () => {
      expect(input).toHaveAttribute("aria-disabled", "true");
    });

    await step("Disabled input remains focusable", async () => {
      await userEvent.tab();
      expect(input).toHaveFocus();
    });

    await step("Disabled input has .is-disabled class", async () => {
      expect(input).toHaveClass("is-disabled");
    });

    await step("Disabled input prevents typing interactions", async () => {
      const initialValue = input.getAttribute("value") || "";
      await userEvent.type(input, "test");
      // Value should remain unchanged due to disabled state
      expect(input).toHaveValue(initialValue);
    });
  },
} as Story;

/**
 * Disabled input with custom classes.
 *
 * Demonstrates the hook's automatic className merging feature.
 * The .is-disabled class is automatically combined with custom classes.
 */
export const DisabledWithCustomClass: Story = {
  args: {
    type: "text",
    disabled: true,
    classes: "custom-input highlight-disabled",
    placeholder: "Disabled with custom classes",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the optimized hook automatically merges `.is-disabled` with custom classes (`custom-input highlight-disabled`).",
      },
    },
  },
} as Story;

export const EmailInput: Story = {
  args: {
    type: "email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    await userEvent.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  },
} as Story;

export const PasswordInput: Story = {
  args: {
    type: "password",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute("type", "password");

    await userEvent.type(input, "password");
    expect(input).toHaveValue("password");
  },
} as Story;

export const SearchInput: Story = {
  args: {
    type: "search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");
    expect(input).toHaveAttribute("type", "search");

    await userEvent.type(input, "search term");
    expect(input).toHaveValue("search term");
  },
} as Story;

export const TelInput: Story = {
  args: {
    type: "tel",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    expect(input).toHaveAttribute("type", "tel");

    await userEvent.type(input, "1234567890");
    expect(input).toHaveValue("1234567890");
  },
} as Story;

// URL text input story
export const UrlInput: Story = {
  args: {
    type: "url",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    expect(input).toHaveAttribute("type", "url");

    await userEvent.type(input, "https://example.com");
    expect(input).toHaveValue("https://example.com");
  },
} as Story;
