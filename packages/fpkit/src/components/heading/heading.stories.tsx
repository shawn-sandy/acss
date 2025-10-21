import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect } from "storybook/test";

import Heading from "./heading";

/**
 * @deprecated This component is deprecated. Use Title component instead.
 */
const meta: Meta<typeof Heading> = {
  title: "FP.REACT Components/Heading (Deprecated)",
  component: Heading,
  tags: ["version:1.0.0", "deprecated"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: `
# ⚠️ DEPRECATED: Use Title Component Instead

The \`Heading\` component is **deprecated** and will be removed in **v3.0.0**.

Please migrate to the new [\`Title\`](?path=/docs/fp-react-components-title--docs) component.

## Migration Guide

\`\`\`tsx
// ❌ Old API (deprecated):
import { Heading } from '@fpkit/acss';
<Heading type="h2">Section Title</Heading>

// ✅ New API:
import { Title } from '@fpkit/acss';
<Title level="h2">Section Title</Title>
\`\`\`

### Key Changes

1. **Component Name**: \`Heading\` → \`Title\`
2. **Prop Name**: \`type\` → \`level\`
3. **Default Level**: Changed from \`h3\` to \`h2\` (update if you relied on the default)

### Why the Change?

- **Better API**: \`level\` is more semantic than \`type\`
- **Improved Accessibility**: Enhanced WCAG 2.1 compliance
- **Better Documentation**: Comprehensive JSDoc comments
- **Performance**: Memoization to prevent unnecessary re-renders

## Current Behavior

This component still works for backwards compatibility but will log deprecation warnings in development mode.

**Removal Timeline**: v3.0.0 (TBD)
      `,
      },
    },
  },
  args: {
    children: "Default title",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof Heading>;

export const HeadingComponent: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/default title/i)).toBeInTheDocument();
  },
};

export const HeadingOne: Story = {
  args: {
    type: "h1",
    children: "Heading One",
  },
} as Story;

export const HeadingTwo: Story = {
  args: {
    type: "h2",
    children: "Heading Two",
  },
} as Story;

export const HeadingThree: Story = {
  args: {
    type: "h3",
    children: "Heading Three",
  },
} as Story;

export const HeadingFour: Story = {
  args: {
    type: "h4",
    children: "Heading Four",
  },
} as Story;

export const HeadingFive: Story = {
  args: {
    type: "h5",
    children: "Heading Five",
  },
} as Story;

export const HeadingSix: Story = {
  args: {
    type: "h6",
    children: "Heading Six",
  },
} as Story;
