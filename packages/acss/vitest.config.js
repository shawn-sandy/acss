/// <reference types="vitest" />
import { defineConfig } from 'vite'

// Coverage thresholds were seeded from the Phase 5 baseline:
//   lines 91.10  |  branches 92.80  |  functions 68.42  |  statements 91.10
// The initial gate sits ~2pp below each baseline so day-one CI doesn't fail.
// Roadmap target for lines + statements is 95%+; functions target is 85%+
// (see docs/planning/i-want-to-convert-nested-waffle.md Phase 5).
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'html', 'json-summary'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/test/**',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        'src/tokens/**',             // generated from SCSS, not application code
        'src/components/fp.tsx',     // legacy namespace shim, slated for removal
      ],
      thresholds: {
        lines: 89,
        branches: 90,
        functions: 66,
        statements: 89,
      },
    },
  },
});
