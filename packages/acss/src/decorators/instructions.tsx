import { StoryFn } from "@storybook/react-vite";
import UI from "#components/ui";

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
  (instructions?: React.ReactNode, title?: string) => {
    const DecoratorComponent = (Story: StoryFn) => {
      return (
        <UI
          style={{
            paddingBlock: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            width: "max(320px, 90%)",
          }}
        >
          <Story />
          <div style={{ paddingInline: "1rem" }}>
            <h3>{title || "Story Instructions"}</h3>
            {instructions}
          </div>
        </UI>
      );
    };
    DecoratorComponent.displayName = 'WithInstructionsDecorator';
    return DecoratorComponent;
  };

export default WithInstructions;
WithInstructions.displayName = "WithInstructions";
