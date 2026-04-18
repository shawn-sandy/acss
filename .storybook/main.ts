import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../packages/acss/src/docs/*.mdx",
    "../packages/acss/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/acss/**/*.mdx",
  ],

  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
    "@github-ui/storybook-addon-performance-panel",
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
};

export default config;
