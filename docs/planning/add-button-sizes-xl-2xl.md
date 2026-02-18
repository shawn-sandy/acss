# Add XL and 2XL Button Sizes

## Context

The button component currently supports 4 sizes: `xs`, `sm`, `md`, `lg`. Adding `xl` and `2xl` extends the scale for hero CTAs, marketing sections, and touch-friendly interfaces where `lg` is insufficient.

The existing size system uses a single CSS custom property (`--btn-fs`) that cascades into height, padding, and gap calculations — so adding sizes requires only a new token + selector in SCSS, a type update in TSX, and new stories.

---

## Proposed Size Scale

| Size | Token             | Value      | px equiv |
|------|-------------------|------------|----------|
| xs   | `--btn-size-xs`   | 0.6875rem  | 11px     |
| sm   | `--btn-size-sm`   | 0.8125rem  | 13px     |
| md   | `--btn-size-md`   | 0.9375rem  | 15px     |
| lg   | `--btn-size-lg`   | 1.125rem   | 18px     |
| xl   | `--btn-size-xl`   | **1.375rem** | **22px** |
| 2xl  | `--btn-size-2xl`  | **1.75rem**  | **28px** |

---

## Implementation Steps

### 1. `button.scss` — Add size tokens

In the `:root`/component block where size tokens are declared (top of file, lines 2–8), add:

```scss
--btn-size-xl: 1.375rem;
--btn-size-2xl: 1.75rem;
```

### 2. `button.scss` — Add size selectors

After the existing `&[data-btn~="lg"]` block (line ~185), add:

```scss
&[data-btn~="xl"],
.btn-xl {
  --btn-fs: var(--btn-size-xl);
}

&[data-btn~="2xl"],
.btn-2xl {
  --btn-fs: var(--btn-size-2xl);
}
```

### 3. `button.tsx` — Extend `size` type

Update the `size` prop union (line ~19):

```ts
// Before
size?: "xs" | "sm" | "md" | "lg";

// After
size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

### 4. `button.stories.tsx` — Add stories

Add `argTypes` options for `xl` and `2xl`, and new named exports:

```ts
// In argTypes.size.options:
options: ["xs", "sm", "md", "lg", "xl", "2xl"],

// New story exports
export const SizeXL: Story = { args: { size: "xl", children: "Extra Large" } };
export const Size2XL: Story = { args: { size: "2xl", children: "2X Large" } };
```

### 5. `button.test.tsx` — Add size tests

Add test cases verifying `data-btn` is set correctly for the two new sizes:

```ts
it("applies xl size via data-btn", () => { ... })
it("applies 2xl size via data-btn", () => { ... })
```

---

## Critical Files

| File | Path |
|------|------|
| Styles | `packages/fpkit/src/components/buttons/button.scss` |
| Component | `packages/fpkit/src/components/buttons/button.tsx` |
| Stories | `packages/fpkit/src/components/buttons/button.stories.tsx` |
| Tests | `packages/fpkit/src/components/buttons/button.test.tsx` |

---

## Verification

1. `npm start` in `packages/fpkit/` — confirm SCSS compiles without error
2. Storybook: `npm start` at repo root — verify XL/2XL stories render with correct size
3. `npm test` in `packages/fpkit/` — all tests pass
4. Visual check: compare rendered heights across all 6 sizes in Storybook

---

## Unresolved Questions

- None — size values (1.375rem / 1.75rem) follow the existing scale pattern and are ready to implement.
