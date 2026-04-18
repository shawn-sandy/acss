import * as React from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "#components/buttons/button";
import { Icon } from "./icon";
import "./icon.scss";

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "FP.React Components/Icons",
  tags: ["stable"],
  args: {
    // styles: Icon.styles,
  },
  decorators: [
    (Story) => (
      <section style={{ minWidth: "60vw", textAlign: "center" }}>
        <Story />
      </section>
    ),
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof Icon>;

export const IconSet = {
  args: {},
  render: () => {
    return (
      <Icon>
        <Icon.Code styles={Icon.Code.styles} />
        Code Icon{" "}
      </Icon>
    );
  },
};

export const IconButton = {
  args: {},
  render: () => {
    return (
      <>
        <Button type="button">
          <Icon>
            <Icon.Code />
          </Icon>
          Click Me
        </Button>
      </>
    );
  },
};

/**
 * Decorative icon (default behavior).
 * Icon is hidden from screen readers via aria-hidden="true".
 * Use when icon accompanies visible text.
 */
export const Code: Story = {
  args: {
    children: <Icon.Code />,
  },
} as Story;

export const Home: Story = {
  args: {
    styles: Icon.styles,
    children: (
      <>
        <Icon.Home size={16} />
      </>
    ),
  },
} as Story;

export const Add: Story = {
  args: {
    children: <Icon.Add />,
  },
} as Story;

export const ArrowDown: Story = {
  args: {
    children: <Icon.ArrowDown />,
  },
} as Story;

export const ArrowLeft: Story = {
  args: {
    children: <Icon.ArrowLeft />,
  },
} as Story;

export const ArrowRight: Story = {
  args: {
    children: <Icon.ArrowRight />,
  },
} as Story;

export const ArrowUp: Story = {
  args: {
    children: <Icon.ArrowUp />,
  },
} as Story;

export const Chat: Story = {
  args: {
    children: <Icon.Chat />,
  },
} as Story;

export const User: Story = {
  args: {
    children: <Icon.User />,
  },
} as Story;

export const Left: Story = {
  args: {
    children: <Icon.Left />,
  },
} as Story;

export const Right: Story = {
  args: {
    children: <Icon.Right />,
  },
} as Story;

export const Up: Story = {
  args: {
    children: <Icon.Up />,
  },
} as Story;

export const Down: Story = {
  args: {
    children: <Icon.Down />,
  },
} as Story;

export const Minus: Story = {
  args: {
    children: <Icon.Minus />,
  },
} as Story;

export const Remove: Story = {
  args: {
    children: <Icon.Remove />,
  },
} as Story;

export const Star: Story = {
  args: {
    children: <Icon.Star />,
  },
} as Story;

export const Copy: Story = {
  args: {
    children: <Icon.Copy />,
  },
} as Story;

export const Play: Story = {
  args: {
    children: <Icon.Play />,
  },
} as Story;

export const Pause: Story = {
  args: {
    children: <Icon.Pause />,
  },
} as Story;

export const Resume: Story = {
  args: {
    children: <Icon.Resume />,
  },
} as Story;

export const Stop: Story = {
  args: {
    children: <Icon.Stop />,
  },
} as Story;

export const PlaySolid: Story = {
  args: {
    children: <Icon.PlaySolid />,
  },
} as Story;

export const PauseSolid: Story = {
  args: {
    children: <Icon.PauseSolid />,
  },
} as Story;

export const ResumeSolid: Story = {
  args: {
    children: <Icon.ResumeSolid />,
  },
} as Story;

export const StopSolid: Story = {
  args: {
    children: <Icon.StopSolid />,
  },
} as Story;

export const Info: Story = {
  args: {
    children: <Icon.Info />,
  },
} as Story;

export const Alert: Story = {
  args: {
    children: <Icon.AlertSolid />,
  },
} as Story;

export const InfoSolid: Story = {
  args: {
    children: <Icon.InfoSolid />,
  },
} as Story;

export const QuestionSolid: Story = {
  args: {
    children: <Icon.QuestionSolid />,
  },
} as Story;

export const WarnSolid: Story = {
  args: {
    children: <Icon.WarnSolid />,
  },
} as Story;

export const SuccessSolid: Story = {
  args: {
    children: <Icon.SuccessSolid />,
  },
} as Story;

export const AlertSquareSolid: Story = {
  args: {
    children: <Icon.AlertSquareSolid />,
  },
} as Story;

/**
 * ✅ ACCESSIBLE PATTERN: Decorative icon with visible text.
 * Icon is hidden from screen readers (default aria-hidden="true").
 * Screen readers announce only "Save Changes".
 */
export const DecorativeIconWithText: Story = {
  args: {},
  render: () => (
    <Button type="button">
      <Icon>
        <Icon.Code />
      </Icon>
      Save Changes
    </Button>
  ),
} as Story;

/**
 * ✅ ACCESSIBLE PATTERN: Semantic icon-only button.
 * Icon is exposed to screen readers with aria-hidden={false}.
 * aria-label provides accessible name for screen readers.
 */
export const SemanticIconOnlyButton: Story = {
  args: {},
  render: () => (
    <Button type="button" aria-label="Close dialog">
      <Icon aria-hidden={false}>
        <Icon.Remove />
      </Icon>
    </Button>
  ),
} as Story;

/**
 * ✅ ACCESSIBLE PATTERN: Icon with role="img" for semantic meaning.
 * Use when icon conveys information beyond decoration.
 * Requires aria-label for accessible name.
 */
export const SemanticIconWithRole: Story = {
  args: {
    "aria-hidden": false,
    "aria-label": "Code snippet",
    role: "img",
    children: <Icon.Code />,
  },
} as Story;

/**
 * ❌ ANTI-PATTERN: Icon-only button without accessible name.
 * This will fail WCAG 4.1.2 (Name, Role, Value).
 * Screen readers cannot identify the button's purpose.
 */
export const IconOnlyButtonNoLabel: Story = {
  args: {},
  render: () => (
    <div style={{ opacity: 0.5, border: "2px dashed red", padding: "1rem" }}>
      <p style={{ color: "red", marginBottom: "0.5rem" }}>
        ❌ BAD: No accessible name
      </p>
      <Button type="button">
        <Icon>
          <Icon.Remove />
        </Icon>
      </Button>
    </div>
  ),
} as Story;
