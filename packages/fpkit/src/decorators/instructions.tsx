/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";

export const WithInstructions =
  (instructions?: React.ReactNode) => (Story: StoryFn) => {
    return (
      <>
        <div
          style={{
            paddingBlock: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            width: "100%",
          }}
        >
          <div>
            <h3>Instructions</h3>
            {instructions}
          </div>
        </div>
        <Story />
      </>
    );
  };

export default WithInstructions;
