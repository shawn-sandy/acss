import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";

import Popover from "./popover";

const meta: Meta<typeof Popover> = {
  title: "FP.React Components/Basic Popover",
  component: Popover,
  tags: ["experimental"],
  args: {
    children: "Hi, I am a popover.",
    popoverTrigger: "Hover here",
    styles: Popover.styles,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Popover>;

export const PopoverComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(await canvas.queryByText("Hover here")).toBeInTheDocument();
    userEvent.hover(canvas.getByText("Hover here"));
    expect(await canvas.findByText("Hi, I am a popover.")).toBeInTheDocument();
    await userEvent.unhover(canvas.getByText("Hover here"));
    expect(canvas.queryByText("Hi, I am a popover.")).not.toBeInTheDocument();
  },
};
