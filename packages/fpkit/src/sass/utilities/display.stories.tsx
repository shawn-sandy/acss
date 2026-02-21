import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Display & Visibility Utilities
 *
 * CSS utility classes for showing/hiding elements at different breakpoints.
 * All classes use `!important` to override component specificity.
 *
 * Use the viewport toolbar to verify responsive variants.
 */
const meta: Meta = {
  title: "FP.React Components/Utilities/Display",
  tags: ["stable"],
  parameters: {
    docs: {
      description: {
        component:
          "Responsive display and visibility utilities. Switch viewports in the toolbar to verify breakpoint behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const boxStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  background: "#e0f2fe",
  border: "1px solid #0ea5e9",
  borderRadius: "0.25rem",
  fontFamily: "monospace",
  fontSize: "0.875rem",
};

const hiddenBoxStyle: React.CSSProperties = {
  ...boxStyle,
  background: "#fef9c3",
  border: "1px solid #ca8a04",
};

/** `.hide` removes from layout + accessibility tree. `.show` restores it. */
export const HideShow: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={boxStyle}>Visible (no class)</div>
      <div className="hide" style={hiddenBoxStyle}>
        Hidden — .hide (display: none)
      </div>
      <div className="show" style={boxStyle}>
        Always shown — .show (display: revert)
      </div>
    </div>
  ),
};

/** `.invisible` hides visually but preserves layout space (ghost element). */
export const Invisible: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <div style={boxStyle}>Before</div>
      <div className="invisible" style={hiddenBoxStyle}>
        .invisible — layout preserved, visually hidden
      </div>
      <div style={boxStyle}>After (notice the gap)</div>
    </div>
  ),
};

/**
 * `.sr-only` — visually hidden but present in the accessibility tree.
 * `.sr-only-focusable` — sr-only that becomes visible on focus (skip links).
 */
export const ScreenReaderOnly: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ margin: 0 }}>
        The text below is visually hidden but read by screen readers:
      </p>
      <span className="sr-only">
        This text is only announced by screen readers
      </span>
      <a href="#main" className="sr-only-focusable" style={boxStyle}>
        Tab to focus me — .sr-only-focusable (skip link pattern)
      </a>
    </div>
  ),
};

/** `.print:hide` — hidden when printing. Open print preview to verify. */
export const PrintHide: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={boxStyle}>Always visible (printed)</div>
      <nav className="print:hide" style={hiddenBoxStyle}>
        .print:hide — visible on screen, hidden in print
      </nav>
    </div>
  ),
};

/**
 * Responsive hide/show.
 * Switch the viewport toolbar to verify each breakpoint:
 * - sm (480px): `.sm:hide` disappears
 * - md (768px): `.md:show` appears
 * - lg (992px): `.lg:hide` disappears
 */
export const ResponsiveVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={boxStyle}>Always visible</div>
      <div className="sm:hide" style={hiddenBoxStyle}>
        .sm:hide — hidden at 480px+
      </div>
      <div className="hide md:show" style={boxStyle}>
        .hide .md:show — hidden by default, shown at 768px+
      </div>
      <div className="lg:hide" style={hiddenBoxStyle}>
        .lg:hide — hidden at 992px+
      </div>
      <div className="hide xl:show" style={boxStyle}>
        .hide .xl:show — hidden by default, shown at 1280px+
      </div>
    </div>
  ),
};

/** `.md:invisible` at md+ — layout space preserved, element invisible. */
export const ResponsiveInvisible: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <div style={boxStyle}>Before</div>
      <div className="md:invisible" style={hiddenBoxStyle}>
        .md:invisible — invisible at 768px+ (layout preserved)
      </div>
      <div style={boxStyle}>After</div>
    </div>
  ),
};
