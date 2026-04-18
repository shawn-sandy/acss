/**
 * Build-time extractor for the component maturity dashboard.
 *
 * Walks `packages/fpkit/src/components/` from this app's location, reads each
 * `*.stories.tsx` file, and parses the Storybook `meta` object for:
 *
 * - `title` — used as the component's display name
 * - `tags: [...]` — the lifecycle tag plus any secondary signal tags
 *
 * Sibling filesystem signals (test file presence) are inferred by checking for
 * a matching `*.test.tsx` next to the story.
 *
 * Runs in Astro page frontmatter on Node; no bundler gymnastics needed.
 */

import { access, readdir, readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export type Lifecycle =
  | "experimental"
  | "beta"
  | "rc"
  | "stable"
  | "deprecated";

export interface ComponentStatus {
  /** Display name — last segment of the Storybook title. */
  name: string;
  /** Story file path relative to `packages/fpkit/src/components/`. */
  storyPath: string;
  /** First lifecycle tag found, or `null` if none. */
  lifecycle: Lifecycle | null;
  /** All tags from the meta (lifecycle + secondary signals + any extras). */
  tags: string[];
  /** True when a sibling `*.test.tsx` file exists next to the story. */
  hasTests: boolean;
  /** Opt-in tag — manually verified under dark mode. */
  hasDarkModeVerified: boolean;
  /** Opt-in tag — a11y addon audit has been manually reviewed. */
  hasA11yVerified: boolean;
}

const LIFECYCLE_VALUES = new Set<Lifecycle>([
  "experimental",
  "beta",
  "rc",
  "stable",
  "deprecated",
]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const COMPONENTS_ROOT = join(
  __dirname,
  "../../../../packages/fpkit/src/components"
);

async function fileIsPresent(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function* walkStories(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "__snapshots__") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkStories(full);
    } else if (entry.isFile() && entry.name.endsWith(".stories.tsx")) {
      yield full;
    }
  }
}

function parseMeta(source: string): { title?: string; tags: string[] } {
  // Grab the first `tags: [...]` — the meta block is always first in the file.
  const tagsMatch = source.match(/tags:\s*\[([^\]]*)\]/);
  const tags: string[] = [];
  if (tagsMatch) {
    const re = /['"]([^'"]+)['"]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(tagsMatch[1])) !== null) {
      tags.push(m[1]);
    }
  }
  const titleMatch = source.match(/title:\s*['"]([^'"]+)['"]/);
  return { title: titleMatch?.[1], tags };
}

function deriveName(title: string | undefined, storyPath: string): string {
  if (title) {
    const parts = title.split("/");
    return parts[parts.length - 1];
  }
  const segments = storyPath.split("/");
  return segments[segments.length - 2] ?? "unknown";
}

export async function getComponentStatus(): Promise<ComponentStatus[]> {
  const results: ComponentStatus[] = [];
  for await (const storyPath of walkStories(COMPONENTS_ROOT)) {
    const source = await readFile(storyPath, "utf-8");
    const { title, tags } = parseMeta(source);
    const lifecycle =
      (tags.find((t) => LIFECYCLE_VALUES.has(t as Lifecycle)) as
        | Lifecycle
        | undefined) ?? null;
    const testPath = storyPath.replace(/\.stories\.tsx$/, ".test.tsx");
    results.push({
      name: deriveName(title, storyPath),
      storyPath: relative(COMPONENTS_ROOT, storyPath),
      lifecycle,
      tags,
      hasTests: await fileIsPresent(testPath),
      hasDarkModeVerified: tags.includes("dark-mode-verified"),
      hasA11yVerified: tags.includes("a11y-verified"),
    });
  }
  // Sort by lifecycle maturity (stable first), then alphabetically by name.
  const order: Record<Lifecycle, number> = {
    stable: 0,
    rc: 1,
    beta: 2,
    experimental: 3,
    deprecated: 4,
  };
  results.sort((a, b) => {
    const ao = a.lifecycle ? order[a.lifecycle] : 99;
    const bo = b.lifecycle ? order[b.lifecycle] : 99;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
  return results;
}

export function lifecycleLabel(lifecycle: Lifecycle | null): string {
  return lifecycle ?? "untagged";
}
