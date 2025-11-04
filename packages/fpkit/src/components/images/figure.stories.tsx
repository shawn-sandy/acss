import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Figure from "./figure";

const meta: Meta<typeof Figure> = {
  title: "FP.REACT Components/Figure",
  component: Figure,
  tags: ["version:1.0.0"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: `A semantic figure component for displaying images with captions, using CSS custom properties for flexible styling.

## CSS Variables

Customize the Figure and Image appearance using CSS custom properties:

### Image Variables (img[alt])
- \`--img-max-width\`: Maximum width (default: \`100%\`)
- \`--img-height\`: Height value (default: \`auto\`)
- \`--img-display\`: Display type (default: \`inline-block\`)
- \`--img-object-fit\`: Object fit mode (default: \`cover\`)
- \`--img-object-position\`: Object position (default: \`center\`)
- \`--img-aspect-ratio\`: Aspect ratio (default: \`auto 2/3\`)

### Figure Variables (figure:has(img[alt]))
- \`--fig-display\`: Display type (default: \`flex\`)
- \`--fig-padding\`: Figure padding (default: \`0.5rem\`)
- \`--fig-bg\`: Background color (default: \`rgba(245, 245, 245, 0.683)\`)
- \`--fig-width\`: Max width constraint (default: \`fit-content\`)
- \`--fig-bottom\`: Figcaption bottom offset (default: \`var(--fig-padding)\`)
- \`--fig-left\`: Figcaption left offset (default: \`var(--fig-padding)\`)
- \`--fig-right\`: Figcaption right offset (default: \`var(--fig-padding)\`)

### Figcaption Variables
- \`--caption-padding\`: Caption padding (default: \`var(--spc-3)\`)

**Example:**
\`\`\`css
figure:has(img[alt]) {
  --fig-padding: 1rem;
  --fig-bg: #f5f5f5;
  --fig-width: 40rem;
  --caption-padding: 1.5rem;
}

img[alt] {
  --img-max-width: 100%;
  --img-object-fit: contain;
  --img-aspect-ratio: 16/9;
}
\`\`\``,
      },
    },
  },
  args: {},
} as Story;

export default meta;
type Story = StoryObj<typeof Figure>;

export const FigureComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // await expect(canvas.getByRole('img')).toBeInTheDocument()
    expect(canvas.getByRole("figure")).toBeInTheDocument();
  },
};
