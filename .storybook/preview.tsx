import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../packages/fpkit/src/styles/index.css";
import { allModes } from "./modes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ["children"],
    },
    docs: {
      toc: true,
    },
    viewport: {
      defaultViewport: "responsive",
      options: {
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
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#f5f5f5" },
        { name: "dark", value: "#1a1a1a" },
        { name: "brand", value: "#0288d1" },
      ],
    },
    chromatic: {
      delay: 300,
      pauseAnimationAtEnd: true,
      viewports: [375, 480, 768, 992, 1280],
      modes: {
        small: allModes.small,
        medium: allModes.medium,
        large: allModes.large,
      },
    },
  },

  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],

  tags: ["autodocs"],
};

export default preview;
