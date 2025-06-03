import { StoryObj, Meta } from "@storybook/react-vite";
/**
 * Import testing library dependencies
 */
// import { within, userEvent } from "storybook/test";

/**
 * Import jest matchers
 */

import { Footer } from "./landmarks";

const meta: Meta<typeof Footer> = {
  title: "FP.React Components/Layout/Landmarks",
  component: Footer,
  args: {
    children: "Main Landmark",
    "data-testid": "main",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Footer>;

export const BasicFooter: Story = {};
