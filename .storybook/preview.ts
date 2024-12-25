import type { Preview } from "@storybook/react";
import '../packages/fpkit/src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  docs: {
    autodocs: true,
    toc: true, // 👈 Enables the table of contents
  },
  },
};

export default preview;
