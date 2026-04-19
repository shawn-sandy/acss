// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

/**
 * To enable the sitemap integration (planned for discoverability of the
 * /guides/ pages once the deploy-docs URL is finalized):
 *
 *   1. npm install -D @astrojs/sitemap
 *   2. Uncomment the import + integration line below.
 *   3. Set `site` to the canonical docs URL once it's live.
 *
 * Until then, <link rel="canonical"> in Layout.astro handles search-engine
 * authority scoping without a sitemap.
 */
// import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // site: "https://fpkit.example.com",  // set once deploy-docs URL is finalized
  integrations: [
    react(),
    // sitemap(),
  ],
});
