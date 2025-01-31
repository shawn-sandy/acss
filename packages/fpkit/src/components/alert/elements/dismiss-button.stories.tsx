import { StoryObj, Meta } from "@storybook/react";
import { within, expect } from "@storybook/test";
import DismissButton from "./dismiss-button";

const meta: Meta<typeof DismissButton> = {
  title: "FP.REACT Elements/DismissButton",
  component: DismissButton,
  tags: ["new"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "A button component used to dismiss alerts.",
      },
    },
  },
  args: {
    onDismiss: () => alert("Dismiss button clicked"),
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof DismissButton>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByLabelText(/close alert/i)).toBeInTheDocument();
  },
} as Story;
