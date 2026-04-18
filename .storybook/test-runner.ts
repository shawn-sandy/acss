import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";
import { injectAxe, checkA11y, configureAxe } from "axe-playwright";

/**
 * Storybook test-runner configuration that wires up axe-core accessibility
 * checks against every story. Triggered from the a11y CI workflow
 * (.github/workflows/a11y.yml) and runnable locally via
 * `npm run test:a11y --prefix packages/acss`.
 *
 * How it works:
 * - preVisit: inject axe-playwright into the page once per story.
 * - postVisit: read the story's `parameters.a11y` (from the a11y addon),
 *   apply the same options to axe-playwright, then run checkA11y.
 *
 * Per-story opt-out:
 *   parameters: { a11y: { disable: true } }          // skip this story
 *   parameters: { a11y: { config: { rules: [...] } } } // tune rules per story
 *
 * The addon-a11y already configures axe inside the Storybook iframe for
 * in-UI reporting; this file mirrors that configuration at test-runner
 * level so CI and IDE surfaces agree.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Stories can opt out via parameters.a11y.disable = true.
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Pull any per-story axe config from the a11y addon's parameters so the
    // same rules apply in CI as in the Storybook panel.
    const a11yParams = storyContext.parameters?.a11y ?? {};
    await configureAxe(page, {
      rules: a11yParams.config?.rules,
    });

    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: a11yParams.options,
    });
  },
};

export default config;
