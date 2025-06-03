import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Img from "./img";

const meta: Meta<typeof Img> = {
  title: "FP.REACT Components/Img",
  component: Img,
  tags: ["version:1.0.0"],
  args: {
    src: "//",
  },
} as Story;

export default meta;
type Story = StoryObj<typeof Img>;

export const ImgComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img")).toBeInTheDocument();
  },
};
