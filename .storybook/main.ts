import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../packages/fpkit/src/docs/*.mdx",
    "../packages/fpkit/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/fpkit/**/*.mdx",
  ],

  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    "storybook-addon-tag-badges",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "storybook-addon-test-codegen",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: true,
    },
  },

  core: {
    disableTelemetry: true,
  },

  staticDirs: ["../public"],

  docs: {
    defaultName: "Interactive Guide",
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  features: {
    interactionsDebugger: true,
  },
};

export default config;
