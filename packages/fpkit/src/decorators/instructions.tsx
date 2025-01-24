import { StoryFn } from "@storybook/react";

/**
 * A decorator that wraps a Storybook story with instructions and an optional title.
 * This decorator creates a container that displays instructions above the story component.
 *
 * @param {React.ReactNode} [instructions] - Optional instructions to display above the story
 * @param {string} [title] - Optional title for the instructions section. Defaults to "Story Instructions"
 * @returns {Function} A decorator function that wraps the story component
 *
 * @example
 * ```tsx
 * export const MyStory = Template.bind({});
 * MyStory.decorators = [
 *   WithInstructions(
 *     <p>Follow these steps to interact with the component...</p>,
 *     "Usage Instructions"
 *   )
 * ];
 * ```
 */
export const WithInstructions =
  (instructions?: React.ReactNode, title?: string) => (Story: StoryFn) => {
    return (
      <>
        <div
          style={{
            paddingBlock: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            width: "80%",
          }}
        >
          <div>
            <h3>{title || "Story Instructions"}</h3>
            {instructions}
          </div>
        </div>
        <Story />
      </>
    );
  };

export default WithInstructions;
