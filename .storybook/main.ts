import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../packages/fpkit/**/*.mdx",
    "../packages/fpkit/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
    "@storybook/addon-docs",
    "storybook-addon-test-codegen",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    defaultName: "Interactive Guide",
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
