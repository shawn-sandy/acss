import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    // Individual component entries
    "src/components/button.ts",
    "src/components/card.ts",
    "src/components/modal.ts",
  ],
  outDir: "libs/components",
  splitting: false,
  sourcemap: true,
  dts: true,
  treeshake: true,
  external: ["react", "react-dom"],
  clean: false, // Don't clean to preserve main builds
  format: ["esm", "cjs"],
  minify: true,
});
