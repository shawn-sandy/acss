/**
 * Bundle-size budget for @fpkit/acss.
 *
 * Baselines captured at the Phase 5 landing (first commit with size-limit).
 * Actual gzipped sizes at that moment:
 *   - Main entry (ESM + React types graph): 15.5 kB
 *   - Hooks subpath:                         2.33 kB
 *   - Icons subpath:                         4.59 kB
 *   - Compiled CSS (sass:build, gzipped):    ~14 kB (raw 90 kB)
 *
 * Limits sit ~15% above baseline to catch obvious regressions without
 * tripping on routine additions. When you add a new large component,
 * either prove it's worth the budget via Storybook + a MIGRATION note,
 * or split it behind a subpath export before bumping the limit.
 *
 * All sizes below are gzipped. size-limit reports raw + gzip in its output.
 *
 * Prerequisites: `npm run package && npm run sass:build` must run before
 * `npm run size`, otherwise the artifacts don't exist yet.
 */

module.exports = [
  {
    name: '@fpkit/acss (main entry, ESM)',
    path: 'libs/index.js',
    limit: '18 KB',
    ignore: ['react', 'react-dom'],
    gzip: true,
  },
  {
    name: '@fpkit/acss/hooks',
    path: 'libs/hooks.js',
    limit: '3 KB',
    ignore: ['react', 'react-dom'],
    gzip: true,
  },
  {
    name: '@fpkit/acss/icons',
    path: 'libs/icons.js',
    limit: '6 KB',
    ignore: ['react', 'react-dom'],
    gzip: true,
  },
  {
    // CSS is shipped separately via "./styles". A jump here usually means a
    // new non-minified source file slipped into the compile, not legitimate
    // content growth.
    name: '@fpkit/acss/styles (compiled CSS)',
    path: 'libs/index.css',
    limit: '18 KB',
    gzip: true,
  },
];
