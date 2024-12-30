import { StoryObj, Meta } from "@storybook/react";

import "../../styles/progress/progress.css";

import Progress from "./progress";

const meta: Meta<typeof Progress> = {
  title: "FP.React Components/Progress",
  component: Progress,
  tags: ["experimental"],
  decorators: [
    (Story) => (
      <div style={{ minWidth: "500px", height: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof Progress>;

export const ProgressComponent: Story = {
  name: "Progress Bar",
  args: {
    isBusy: true,
  },
} as Story;

export const ProgressIndicator: Story = {
  args: {
    value: 3,
    max: 10,
  },
} as Story;

export const RedProgress: Story = {
  args: {
    ...ProgressIndicator.args,
    styles: {
      "--progress-color": "red",
    },
    value: 7,
  },
} as Story;
