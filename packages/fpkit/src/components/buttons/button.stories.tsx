import type { StoryObj, Meta } from "@storybook/react";
import { within, userEvent, expect, fn } from "@storybook/test";

import Button from "./button";
import "./button.scss";

const buttonClicked = fn();

const meta = {
  title: "FP.React Components/Buttons",
  component: Button,
  args: {
    children: "Click me",
    onClick: buttonClicked,
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonComponent: Story = {
  args: {
    onClick: buttonClicked,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await step("Button is rendered", async () => {
      expect(button).toBeInTheDocument();
    });
    await step("Button gets focus on tab", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });
    await step("Button is clicked", async () => {
      await userEvent.click(button);
      expect(buttonClicked).toHaveBeenCalled();
    });
    // add a step tyo check for enter key press
    await step("Button is clicked with enter key", async () => {
      await userEvent.type(button, "{enter}");
      expect(buttonClicked).toHaveBeenCalled();
    });
    // step check for space key press
    await step("Button is clicked with space key", async () => {
      await userEvent.type(button, "{space}");
      expect(buttonClicked).toHaveBeenCalled();
    });
  },
} as Story;

export const Small: Story = {
  args: {
    "data-btn": "sm",
  },
} as Story;

export const Medium: Story = {
  args: {
    "data-btn": "md",
  },
} as Story;

export const Large: Story = {
  args: {
    "data-btn": "lg",
  },
} as Story;

export const Custom: Story = {
  args: {
    styles: {
      "--btn-fs": "2rem",
    },
  },
} as Story;
