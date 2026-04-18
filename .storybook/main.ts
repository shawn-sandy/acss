import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";
import { mergeConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  // Alias the split icons package to source so Storybook resolves it
  // without requiring each sub-package to be built + linked at install
  // time. Critical for environments (Netlify, CI) that run only a
  // top-level `npm install`. Only @fpkit/icons is referenced from
  // Storybook-compiled code; @fpkit/tokens is used by the Astro docs
  // app, not stories.
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@fpkit/icons": resolve(__dirname, "../packages/icons/src/index.ts"),
        },
      },
    });
  },
};

export default config;
