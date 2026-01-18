# Add Fieldset Component to Landmarks

**Status**: Proposed
**Created**: 2026-01-18
**Component**: fpkit/landmarks

## Overview

Add Fieldset component to landmarks module following existing Header/Footer pattern with optional legend prop and section wrapper.

## User Requirements

- Follow existing landmark pattern (like Header/Footer)
- Support optional legend prop for semantic labeling
- Include variants: basic, inline legend, grouped fieldset
- Stories only (no unit tests per current pattern)

## Implementation Steps

### 1. Component Implementation (`landmarks.tsx`)

Add FieldsetProps type and component after Article component:

```typescript
/**
 * Props for the Fieldset component.
 */
type FieldsetProps = {
  /** Optional legend content (text/elements) */
  legend?: ReactNode
} & ComponentProps

/**
 * Fieldset landmark for semantic content grouping.
 *
 * Renders a fieldset element with optional legend.
 * Use for semantic grouping of related content (not form inputs).
 *
 * @param legend - Optional legend content
 * @param children - Content to render inside fieldset
 * @param styles - Optional styles object
 * @param classes - Optional CSS class names
 * @param props - Other props
 */
export const Fieldset = ({
  id,
  children,
  legend,
  styles,
  classes,
  ...props
}: FieldsetProps) => {
  return (
    <UI as="fieldset" id={id} styles={styles} className={classes} {...props}>
      {legend && <UI as="legend">{legend}</UI>}
      {children}
    </UI>
  )
}
```

**Location in file**: Add Fieldset component after Article component, before the Landmarks container component.

**Compound Export Pattern** (at end of file, update existing pattern):

```typescript
// Update the existing Landmarks compound component
export default Landmarks

Landmarks.displayName = 'Landmarks'
Landmarks.Header = Header
Landmarks.Main = Main
Landmarks.Footer = Footer
Landmarks.Aside = Aside
Landmarks.Section = Section
Landmarks.Article = Article
Landmarks.Fieldset = Fieldset  // NEW - Add this line
```

**Individual Export**: Fieldset is automatically exported via existing `export * from ...` at top of file or add explicit export if needed:

```typescript
export { Fieldset }
export type { FieldsetProps }
```

### 2. SCSS Styling (`landmarks.scss`)

Add after main/footer section:

```scss
// Fieldset base styles
fieldset {
  border: var(--fieldset-border, 1px solid #ccc);
  border-radius: var(--fieldset-border-radius, 0.5rem);
  padding: var(--fieldset-padding, 1rem);
  padding-inline: var(--fieldset-padding-inline, 1.5rem);
  padding-block: var(--fieldset-padding-block, 1rem);
  margin-block: var(--fieldset-margin-block, 2rem);
  background: var(--fieldset-bg, transparent);

  > legend {
    font-size: var(--legend-fs, 1rem);
    font-weight: var(--legend-fw, 600);
    padding-inline: var(--legend-padding-inline, 0.5rem);
    color: var(--legend-color, currentColor);
  }
}

// Inline legend variant
fieldset[data-legend="inline"] {
  --fieldset-border: none;
  --fieldset-padding: 0;

  > legend {
    float: inline-start;
    margin-inline-end: 1rem;
    margin-block-end: 0.5rem;
  }
}

// Grouped variant
fieldset[data-fieldset="grouped"] {
  --fieldset-bg: var(--bg-subtle, #f9f9f9);
  --fieldset-padding-block: 1.5rem;
  --fieldset-border: 2px solid var(--border-accent, #0066cc);

  > legend {
    --legend-fs: 1.125rem;
    --legend-fw: 700;
  }
}
```

### 3. Story Variants (`landmarks.stories.tsx`)

Add at end of file:

```typescript
// Basic fieldset
export const BasicFieldset: Story = {
  args: {
    legend: "Personal Information",
    children: (
      <>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("Personal Information")).toBeInTheDocument();
  },
}

// Inline legend
export const InlineLegendFieldset: Story = {
  args: {
    legend: "Status:",
    "data-legend": "inline",
    children: <p>Active</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute("data-legend", "inline");
  },
}

// Grouped variant
export const GroupedFieldset: Story = {
  args: {
    legend: "Account Settings",
    "data-fieldset": "grouped",
    children: (
      <>
        <p><strong>Username:</strong> johndoe</p>
        <p><strong>Role:</strong> Admin</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toHaveAttribute("data-fieldset", "grouped");
  },
}

// No legend example
export const FieldsetNoLegend: Story = {
  args: {
    children: <p>Grouped content without visible legend</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.queryAllByRole("legend")).toHaveLength(0);
  },
}
```

### 4. Documentation (`STYLES.mdx`)

Add section after Footer with:

#### Content to Add

```mdx
## Fieldset

### Basic Fieldset

Semantic grouping for related content:

\`\`\`html
<fieldset>
  <legend>Personal Information</legend>
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</fieldset>
\`\`\`

### Inline Legend Variant

\`\`\`html
<fieldset data-legend="inline">
  <legend>Status:</legend>
  <p>Active</p>
</fieldset>
\`\`\`

### Grouped Fieldset Variant

\`\`\`html
<fieldset
  data-fieldset="grouped"
  style="--fieldset-border: 2px solid #0066cc"
>
  <legend>Account Settings</legend>
  <p><strong>Username:</strong> johndoe</p>
</fieldset>
\`\`\`

### Fieldset CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| \`--fieldset-border\` | \`1px solid #ccc\` | Border style |
| \`--fieldset-border-radius\` | \`0.5rem\` | Corner radius |
| \`--fieldset-padding\` | \`1rem\` | General padding |
| \`--fieldset-padding-inline\` | \`1.5rem\` | Horizontal padding |
| \`--fieldset-padding-block\` | \`1rem\` | Vertical padding |
| \`--fieldset-margin-block\` | \`2rem\` | Vertical margin |
| \`--fieldset-bg\` | \`transparent\` | Background color |
| \`--legend-fs\` | \`1rem\` | Legend font size |
| \`--legend-fw\` | \`600\` | Legend font weight |
| \`--legend-padding-inline\` | \`0.5rem\` | Legend horizontal padding |
| \`--legend-color\` | \`currentColor\` | Legend text color |
```

## Critical Files

- `packages/fpkit/src/components/layout/landmarks.tsx` - Component implementation
- `packages/fpkit/src/components/layout/landmarks.scss` - Styling with CSS variables
- `packages/fpkit/src/components/layout/landmarks.stories.tsx` - Story variants
- `packages/fpkit/src/components/layout/STYLES.mdx` - Documentation

## Verification Checklist

- [ ] **Build**: `cd packages/fpkit && npm run build` - compiles without errors
- [ ] **Storybook**: `npm start` from root - all 4 fieldset stories render
- [ ] **Play functions**: Interactions panel - all assertions pass
- [ ] **Accessibility**: a11y tab - no violations for fieldset (role="group")
- [ ] **Responsive**: Test variants at different viewport sizes
- [ ] **CSS output**: Verify `libs/styles/layout/landmarks.css` contains fieldset styles

## Design Decisions

### Why No Section Wrapper?

Unlike Header/Footer, Fieldset renders children directly without a section wrapper. This provides:
- Simpler DOM structure with less nesting
- More flexibility for users to structure content as needed
- Natural fieldset behavior (legend + direct children)
- Users can add their own section/div wrappers if layout control is needed

### Why Optional Legend?

Flexibility for content grouping without visible label. Users may prefer aria-label instead of legend or use fieldset for styling only.

### Why Data Attributes for Variants?

Follows project pattern (data-hero, data-grid). Provides semantic HTML without class soup and clear variant intention.

### CSS Variable Naming

- Uses full words for clarity (padding-inline, not px)
- Allows approved abbreviations: fs, fw, bg (per CLAUDE.md)
- Uses logical properties throughout (padding-inline, padding-block, margin-block)
- All measurements in rem units (no px)

## Trade-offs

### Legend Positioning Complexity

CSS legend positioning can conflict with floats/grid. Mitigation: Use simple float for inline variant, standard positioning otherwise.

### Browser Fieldset Quirks

Fieldset has unique rendering behaviors across browsers. Mitigation: Test across browsers, use minimal resets.

### ARIA Roles

Fieldset gets role="group" implicitly, may conflict with custom roles. Mitigation: Document role behavior, allow role override via props.

## Questions

None - all requirements clarified with user.
