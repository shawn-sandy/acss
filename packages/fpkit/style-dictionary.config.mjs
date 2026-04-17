/**
 * Style Dictionary configuration for @fpkit/acss.
 *
 * Input:  tokens/generated/source.json (DTCG format, produced by scripts/extract-tokens.mjs)
 * Output:
 *   - libs/tokens.json     — flat, alias-resolved token artifact for external consumers (Figma, docs site)
 *   - src/tokens/index.ts  — typed TS exports mapping each token to its CSS custom property
 *
 * SCSS stays the source of truth; nothing emits SCSS. The TS file exports var()
 * strings (e.g. "var(--color-primary)") rather than resolved values so consumers
 * pick up theme switches at runtime without rebuilding.
 */

import StyleDictionary from 'style-dictionary';

// Register a format that emits a TypeScript module with CSS var references.
// Each token's name becomes a typed string literal; nested categories become
// nested objects so consumers can import `tokens.color.primary` etc.
StyleDictionary.registerFormat({
  name: 'ts/css-vars',
  format: ({ dictionary }) => {
    const tree = {};
    for (const token of dictionary.allTokens) {
      const path = token.path;
      let node = tree;
      for (let i = 0; i < path.length - 1; i++) {
        node[path[i]] ??= {};
        node = node[path[i]];
      }
      // CSS var name reconstructs from the original token name pieces joined with "-".
      const varName = `--${token.name.replace(/_/g, '-')}`;
      node[path[path.length - 1]] = varName;
    }

    function emit(node, indent = 2) {
      const pad = ' '.repeat(indent);
      const entries = Object.entries(node).map(([key, value]) => {
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
        if (typeof value === 'string') {
          return `${pad}${safeKey}: \`var(${value})\``;
        }
        return `${pad}${safeKey}: {\n${emit(value, indent + 2)}\n${pad}}`;
      });
      return entries.join(',\n');
    }

    return [
      '/**',
      ' * Auto-generated from SCSS tokens. Do not edit by hand.',
      ' * Run `npm run tokens:build` in packages/fpkit to regenerate.',
      ' */',
      '',
      'export const tokens = {',
      emit(tree),
      '} as const;',
      '',
      'export type Tokens = typeof tokens;',
      '',
    ].join('\n');
  },
});

// Style Dictionary's built-in "name/kebab" transform uses the full path joined with hyphens,
// which matches our CSS var naming convention exactly.
export default {
  source: ['tokens/generated/source.json'],
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: 'libs/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      transforms: ['name/kebab'],
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'index.ts',
          format: 'ts/css-vars',
        },
      ],
    },
  },
};
