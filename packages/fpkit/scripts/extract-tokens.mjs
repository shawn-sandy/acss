#!/usr/bin/env node
/**
 * Extract design tokens from SCSS source files into DTCG-compliant JSON.
 *
 * SCSS stays the source of truth. This script compiles the token files,
 * parses CSS custom properties out of the result, and emits an intermediate
 * JSON artifact that Style Dictionary consumes in a later step.
 *
 * Input:  packages/fpkit/src/sass/tokens/_index.scss (forwards primitives + semantic)
 * Output: packages/fpkit/tokens/generated/source.json (DTCG format)
 *
 * Why not author tokens in JSON directly? Because designers and library
 * authors reach for SCSS every day; tokens.json is a generated artifact for
 * tooling (Figma bridge, cross-platform consumers), not a hand-edited file.
 */

import { compile } from 'sass';
import postcss from 'postcss';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = resolve(fileURLToPath(import.meta.url), '../..');
const scssEntry = resolve(pkgRoot, 'src/sass/tokens/_index.scss');
const outPath = resolve(pkgRoot, 'tokens/generated/source.json');

const css = compile(scssEntry).css;

// Walk the CSS AST via postcss so comments, nested rules, and unusual
// whitespace don't trip up a regex-based parser.
const root = postcss.parse(css);
const rootDecls = new Map();
const themeOverrides = new Map(); // theme name → Map<var-name, value>

root.walkRules((rule) => {
  const selector = rule.selector.trim();
  let target;
  if (selector === ':root') {
    target = rootDecls;
  } else {
    // sass compression strips the quotes, so accept both [data-theme="dark"] and [data-theme=dark].
    const themeMatch = selector.match(/\[data-theme\s*=\s*"?([\w-]+)"?\s*\]/);
    if (!themeMatch) return;
    const themeName = themeMatch[1];
    if (!themeOverrides.has(themeName)) themeOverrides.set(themeName, new Map());
    target = themeOverrides.get(themeName);
  }
  rule.walkDecls((decl) => {
    if (!decl.prop.startsWith('--')) return;
    target.set(decl.prop.slice(2), decl.value.trim());
  });
});

const flat = rootDecls;

// DTCG $type for tokens whose top-level category is recognizable. Anything
// else falls back to "string", which is still valid DTCG.
const dtcgTypeByCategory = {
  color: 'color',
  fs: 'fontSize',
  spacing: 'dimension',
  space: 'dimension',
  box: 'dimension',
  col: 'dimension',
  radius: 'dimension',
  shadow: 'shadow',
  duration: 'duration',
  ease: 'cubicBezier',
  breakpoint: 'dimension',
};

/** Convert `var(--color-blue-600)` → `{color.blue.600}` (DTCG alias). */
function valueToDtcg(value) {
  return value.replace(/var\(\s*--([a-z0-9-]+)\s*(?:,\s*[^)]*)?\)/gi, (_, ref) => {
    return `{${refPath(ref).join('.')}}`;
  });
}

/**
 * Map a flat CSS custom property name to its DTCG path.
 * Keep the mapping 1:1 with the CSS var so Style Dictionary's name/kebab
 * transform reconstructs the exact original var name.
 */
function refPath(name) {
  return name.split('-');
}

const tree = {};
for (const [name, value] of flat) {
  const path = refPath(name);
  const type = dtcgTypeByCategory[path[0]] ?? 'string';

  let node = tree;
  for (let i = 0; i < path.length - 1; i++) {
    node[path[i]] ??= {};
    node = node[path[i]];
  }
  const token = {
    $value: valueToDtcg(value),
    $type: type,
  };

  // Attach theme overrides as DTCG $extensions so downstream tools can build
  // [data-theme="<name>"] rules without re-parsing SCSS.
  const modes = {};
  for (const [theme, overrideMap] of themeOverrides) {
    if (overrideMap.has(name)) {
      modes[theme] = valueToDtcg(overrideMap.get(name));
    }
  }
  if (Object.keys(modes).length > 0) {
    token.$extensions = { 'com.fpkit.themeModes': modes };
  }

  node[path[path.length - 1]] = token;
}

// Top-level $description for humans consuming tokens.json directly.
const output = {
  $description: 'Design tokens for @fpkit/acss (generated from SCSS; do not edit).',
  ...tree,
};

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');

console.log(`Extracted ${flat.size} tokens → ${outPath}`);
