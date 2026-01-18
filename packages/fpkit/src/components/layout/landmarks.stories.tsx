import { StoryObj, Meta } from "@storybook/react-vite";
/**
 * Import testing library dependencies
 */
import { within, expect } from "storybook/test";

import { Header } from "./landmarks";
import Img from "../images/img";

const meta: Meta<typeof Header> = {
  title: "FP.React Components/Layout/Landmarks",
  component: Header,
  parameters: {
    docs: {
      description: {
        component: `Semantic landmark components including Header (banner), Main, and Footer with responsive content layout.

## CSS Variables (Header/Overlay)

### Layout & Display
- \`--overlay-display\`: Display mode (default: grid)
- \`--overlay-grid-area\`: Grid area name (default: overlay)
- \`--overlay-placement\`: Item placement (default: center)

### Sizing
- \`--overlay-width\`: Overlay width (default: 100%)
- \`--overlay-height\`: Minimum overlay height (default: 40vh)
- \`--overlay-max-height\`: Maximum overlay height (default: 500px)
- \`--overlay-content-width\`: Content max width (default: 80%)

### Spacing
- \`--overlay-padding\`: General padding (default: 2rem)
- \`--overlay-padding-inline\`: Horizontal padding (default: auto)
- \`--overlay-padding-block\`: Vertical padding (default: auto)
- \`--overlay-margin-inline\`: Horizontal margin (default: auto)
- \`--overlay-margin-block\`: Vertical margin (default: auto)
- \`--overlay-gap\`: Gap between elements (default: 2rem)

### Colors & Typography
- \`--overlay-color\`: Text color (default: currentColor)
- \`--overlay-bg\`: Background color (default: whitesmoke)
- \`--header-line-height\`: Heading line height (default: 1.1)

## CSS Variables (Main/Footer)

### Content Layout
- \`--content-width\`: Max content width (default: min(100%, 1480px))
- \`--content-margin-inline\`: Horizontal margin for centering (default: auto)
- \`--content-padding-inline\`: Horizontal padding (default: 1rem)
- \`--content-gap\`: Gap between article and aside (default: 2rem)
`,
      },
    },
  },
  args: {
    children: "Default Header",
    "data-testid": "banner",
  },
  tags: ["stable"],
} as Meta;

const headerChildren = () => (
  <>
    <h2>Header Title</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, unde?</p>
  </>
);

export default meta;
type Story = StoryObj<typeof Header>;

export const LandmarkDefault: Story = {};

export const HeroHeader: Story = {
  args: {
    children: headerChildren(),
    headerBackground: <Img src="https://picsum.photos/2000/1000" alt="" />,
    styles: { color: "red" },
    classNames: "header-class",
    "data-styles": "blue",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByRole("banner");
    expect(header).toBeInTheDocument();
    const title = canvas.getByRole("heading");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/header title/i);
  },
} as Story;
