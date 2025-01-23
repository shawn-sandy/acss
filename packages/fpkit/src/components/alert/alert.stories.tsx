import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";

import Alert from "./alert";

const meta: Meta<typeof Alert> = {
  title: "FP.REACT Components/Alert",
  component: Alert,
  tags: ["new"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Alert component description here...",
      },
    },
  },
  args: {
    children: "This is an alert message",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is an alert message/i)).toBeInTheDocument();
  },
};
