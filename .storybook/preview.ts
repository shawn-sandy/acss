import type { Preview } from "@storybook/react";
import "../packages/fpkit/src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // exclude specific props from the controls panel
      exclude: ["children"],
      docs: {
        toc: true, // 👈 Enables the table of contents
      },
    },
    viewport: {
      viewports: {
        reflow: {
          name: "Reflow 320px",
          styles: {
            width: "320px",
            height: "100%",
          },
        },

        nobreakpoint: {
          name: "375px",
          styles: {
            width: "375px",
            height: "100%",
          },
        },
        sm: {
          name: "SM 480px",
          styles: {
            width: "480px",
            height: "100%",
          },
        },
        md: {
          name: "MD 768px",
          styles: {
            width: "768px",
            height: "100%",
          },
        },
        lg: {
          name: "LG 992px",
          styles: {
            width: "992px",
            height: "100%",
          },
        },
        xl: {
          name: "XL 1280px",
          styles: {
            width: "1280px",
            height: "100%",
          },
        },
      },
    },
    chromatic: {
      delay: 300,
      pauseAnimationAtEnd: true,
      viewports: [375, 480, 768, 992, 1280],
    },
  },
};

export default preview;
