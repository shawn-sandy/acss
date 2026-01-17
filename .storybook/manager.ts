import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

/**
 * Custom Storybook theme configuration
 * This creates a custom theme for the Storybook manager interface
 */
const customTheme = create({
  base: "light",

  // Brand information
  brandTitle: "ACSS Component Library",
  brandUrl: "/",
  brandTarget: "_self",

  // UI colors
  colorPrimary: "#1976d2",
  colorSecondary: "#0288d1",

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: "#333333",
  textInverseColor: "#ffffff",
  textMutedColor: "#666666",

  // Background colors
  appBg: "#f5f5f5",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e0e0e0",
  appBorderRadius: 4,

  // Toolbar colors
  barTextColor: "#333333",
  barSelectedColor: "#1976d2",
  barBg: "#ffffff",

  // Input colors
  inputBg: "#ffffff",
  inputBorder: "#e0e0e0",
  inputTextColor: "#333333",
  inputBorderRadius: 4,
});

/**
 * Configure Storybook manager settings
 * This configures various aspects of the Storybook manager interface
 */
addons.setConfig({
  theme: customTheme,

  // Panel settings
  panelPosition: "bottom",
  selectedPanel: "controls",

  // Sidebar settings
  sidebar: {
    showRoots: true,
    collapsedRoots: ["other"],
    renderLabel: (item) => {
      // Add visual indicators for component status based on tags
      if (item.type === "story" || item.type === "docs") {
        const tags = (item as { tags?: string[] }).tags || [];
        if (tags.includes("deprecated")) {
          return `⚠️ ${item.name}`;
        }
        if (tags.includes("beta")) {
          return `🧪 ${item.name}`;
        }
        if (tags.includes("experimental")) {
          return `🔬 ${item.name}`;
        }
        if (tags.includes("new")) {
          return `✨ ${item.name}`;
        }
      }
      return item.name;
    },
  },

  // Toolbar settings
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },

  // Enable keyboard shortcuts
  enableShortcuts: true,

  // Show story navigator
  showNav: true,

  // Show addon panel
  showPanel: true,

  // Initial active tab on the addon panel
  initialActive: "sidebar",
});
