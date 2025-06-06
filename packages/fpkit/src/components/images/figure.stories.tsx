import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Figure from "./figure";

const meta: Meta<typeof Figure> = {
  title: "FP.REACT Components/Figure",
  component: Figure,
  tags: ["version:1.0.0"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Figure description here...",
      },
    },
  },
  args: {},
} as Story;

export default meta;
type Story = StoryObj<typeof Figure>;

export const FigureComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // await expect(canvas.getByRole('img')).toBeInTheDocument()
    expect(canvas.getByRole("figure")).toBeInTheDocument();
  },
};
