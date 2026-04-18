/**
 * Style Dictionary configuration for the @fpkit design system.
 *
 * Input:  tokens/generated/source.json (DTCG, produced by scripts/extract-tokens.mjs)
 *
 * Output:
 *   - ../tokens/libs/tokens.json   — canonical flat JSON published as @fpkit/tokens/tokens.json
 *   - ../tokens/src/index.ts       — typed TS module published as @fpkit/tokens
 *   - ./libs/tokens.json           — shim kept at this location so the @fpkit/acss/tokens
 *                                     subpath export keeps working for existing consumers.
 *
 * SCSS remains the source of truth; nothing emits SCSS. The TS file exports var()
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
      ' * Run `npm run tokens:build` in packages/acss to regenerate.',
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

export default {
  source: ['tokens/generated/source.json'],
  platforms: {
    // Canonical JSON artifact published as @fpkit/tokens.
    'tokens-json': {
      transformGroup: 'js',
      buildPath: '../tokens/libs/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
        },
      ],
    },
    // Back-compat shim — the @fpkit/acss/tokens subpath export keeps serving
    // the same JSON for consumers who imported it before the split.
    'acss-shim-json': {
      transformGroup: 'js',
      buildPath: 'libs/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
        },
      ],
    },
    // TypeScript module published as @fpkit/tokens (main entry).
    ts: {
      transformGroup: 'js',
      transforms: ['name/kebab'],
      buildPath: '../tokens/src/',
      files: [
        {
          destination: 'index.ts',
          format: 'ts/css-vars',
        },
      ],
    },
  },
};
