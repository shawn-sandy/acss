/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
/**
 * A higher-order component that wraps a Storybook story with instructions.
 *
 * @param {React.ReactNode} [instructions] - Optional instructions to display above the story
 * @returns {(Story: StoryFn) => JSX.Element} A function that takes a Story component and returns it wrapped with instructions
 *
 * @example
 * ```jsx
 * export const MyStory = Template.bind({});
 * MyStory.decorators = [
 *   WithInstructions(
 *     <p>These are the instructions for using this component...</p>
 *   )
 * ];
 * ```
 */

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
