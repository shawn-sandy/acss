import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";

import Details from "./details";
import Icons from "../icons/icon";

const content = (
  <>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
      accusamus molestiae, qui omnis illum iste asperiores fugit doloribus
      voluptatem numquam voluptatibus nisi blanditiis quidem sint optio. Dicta
      officia commodi numquam?
    </p>
    <p>
      Impedit, libero ea. Repellendus doloribus possimus magni ullam natus
      voluptates, magnam ad iure quas eum adipisci! Repellat vel placeat commodi
      voluptatem optio odit, voluptatum id, magnam architecto at est ipsa.
    </p>
    <p>
      Vitae, laudantium libero, dolorem enim architecto consectetur qui vero
      error possimus beatae iusto, labore praesentium. Assumenda recusandae
      labore aliquam omnis, aliquid in impedit possimus! Rerum consequuntur non
      hic est placeat!
    </p>
  </>
);

const icon = <Icons.Add />;

const meta: Meta<typeof Details> = {
  title: "FP.REACT Components/Details",
  component: Details,
  tags: ["rc"],
  args: {
    children: content,
    icon: icon,
    summary: <>Summary Section</>,
  },
  actions: { argTypesRegex: "^on.*" },
  decorators: [
    (Story) => (
      <div className="container" style={{ minWidth: "50vw" }}>
        <Story />
      </div>
    ),
  ],
} as Story;

export default meta;
type Story = StoryObj<typeof Details>;

export const DetailsDropdown: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole("group", { name: /details dropdown/i })
    ).toBeInTheDocument();
  },
} as Story;

export const DetailsStyles: Story = {
  args: {
    classes: "list-style",
  },
} as Story;

export const DetailsOpen: Story = {
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
  },
} as Story;

export const CustomDropdown: Story = {
  render: () => (
    <>
      <Details
        summary="Summary Section"
        icon={icon}
        ariaLabel="Details Section"
      >
        {content}
      </Details>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum quasi
        maiores placeat voluptate voluptatem, tenetur consectetur earum modi,
        quam pariatur, quas porro iste quo ipsum rem rerum fuga incidunt?
        Suscipit!
      </p>
    </>
  ),
} as Story;

export const DetailsAccordion: Story = {
  render: () => (
    <>
      <Details
        summary="Summary Section"
        icon={icon}
        ariaLabel="Details Section"
        name="accordion-details"
      >
        {content}
      </Details>
      <Details
        summary="Summary Section"
        icon={icon}
        ariaLabel="Details Section"
        name="accordion-details"
      >
        {content}
      </Details>
      <Details
        summary="Summary Section"
        icon={icon}
        ariaLabel="Details Section"
        name="accordion-details"
      >
        {content}
      </Details>
    </>
  ),
} as Story;

export const DetailsInteractionTest: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Find the summary element
    const summaryElement = canvas.getByText("Summary Section");
    // add an open step
    await step("Open the details", async () => {
      // Simulate a click on the summary element
      await userEvent.click(summaryElement, { delay: 500 });

      // Assert that the details element is open
      const detailsElement = canvas.getByRole("group", {
        name: /details dropdown/i,
      });
      expect(detailsElement).toHaveAttribute("open");
    });

    await step("Close the detail panel", async () => {
      await userEvent.click(summaryElement, { delay: 500 });

      expect(summaryElement).not.toHaveAttribute("open");
    });

    // test if it works with the space bar
    await step("Open the details with space", async () => {
      summaryElement.focus();
      expect(summaryElement).toHaveFocus();

      await userEvent.type(summaryElement, "{space}", { delay: 500 });

      // Assert that the details element is open
      const detailsElement = canvas.getByRole("group", {
        name: /details dropdown/i,
      });
      expect(detailsElement).toHaveAttribute("open");
    });
  },
};
