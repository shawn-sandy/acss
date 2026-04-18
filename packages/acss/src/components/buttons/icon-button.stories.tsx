import type { StoryObj, Meta } from "@storybook/react-vite";
import { within, userEvent, expect, fn } from "storybook/test";

import { IconButton } from "./icon-button";
import "./button.scss";
import "./icon-button.scss";

// Minimal inline SVG icons for stories — no external icon dependency required
const CloseIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const iconClicked = fn();

const meta = {
  title: "FP.React Components/Buttons/IconButton",
  component: IconButton,
  tags: ["beta"],
  args: {
    type: "button",
    icon: <CloseIcon />,
    "aria-label": "Close",
    onClick: iconClicked,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Default icon-only button. Requires `aria-label` for screen reader accessibility.
 */
export const IconButtonDefault: Story = {
  args: {
    "aria-label": "Close",
    icon: <CloseIcon />,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Close" });

    await step("IconButton is rendered with aria-label", async () => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "Close");
    });

    await step("IconButton receives focus on tab", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    await step("IconButton click handler fires", async () => {
      await userEvent.click(button);
      expect(iconClicked).toHaveBeenCalled();
    });
  },
};

/**
 * Uses `aria-labelledby` instead of `aria-label` — references an existing element in the DOM.
 * The XOR type means passing both `aria-label` and `aria-labelledby` is a TypeScript error.
 */
export const IconButtonLabelledBy: Story = {
  render: () => (
    <div>
      <span id="icon-btn-label" style={{ marginInlineEnd: "0.5rem" }}>
        Delete item
      </span>
      <IconButton
        type="button"
        aria-labelledby="icon-btn-label"
        icon={<TrashIcon />}
      />
    </div>
  ),
};

/**
 * Icon + visible label. Label hides below 768px (overridable via `$icon-label-bp` SCSS variable).
 * Resize the viewport to see the responsive behavior.
 * NOTE: `variant="outline"` overrides the default `variant="icon"` to restore padding.
 */
export const IconButtonWithLabel: Story = {
  args: {
    "aria-label": "Settings",
    icon: <SettingsIcon />,
    label: "Settings",
    variant: "outline",
  },
};

/**
 * All style variants — icon (default), outline, text, and pill.
 * `icon` is the default: transparent background, currentColor icon, square touch target.
 * Switch `variant` to restore background or border as needed.
 */
export const IconButtonVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <IconButton type="button" aria-label="Icon variant (default)" icon={<SettingsIcon />} />
      <IconButton type="button" aria-label="Outline variant" icon={<SettingsIcon />} variant="outline" />
      <IconButton type="button" aria-label="Text variant" icon={<SettingsIcon />} variant="text" />
      <IconButton type="button" aria-label="Pill variant" icon={<SettingsIcon />} variant="pill" />
    </div>
  ),
};

/**
 * Size variants — xs through 2xl. Height and touch target scale with font size
 * via the `--btn-height: calc(var(--btn-fs) * 2.75)` formula.
 */
export const IconButtonSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <IconButton type="button" aria-label="Close (xs)" icon={<CloseIcon />} size="xs" />
      <IconButton type="button" aria-label="Close (sm)" icon={<CloseIcon />} size="sm" />
      <IconButton type="button" aria-label="Close (md)" icon={<CloseIcon />} size="md" />
      <IconButton type="button" aria-label="Close (lg)" icon={<CloseIcon />} size="lg" />
      <IconButton type="button" aria-label="Close (xl)" icon={<CloseIcon />} size="xl" />
      <IconButton type="button" aria-label="Close (2xl)" icon={<CloseIcon />} size="2xl" />
    </div>
  ),
};

/**
 * All semantic color variants. Color sets `--btn-bg` and `--btn-color` via
 * `data-color` — icon buttons keep a transparent background by default so the
 * icon itself inherits the color token via `currentColor`.
 */
export const IconButtonColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <IconButton type="button" aria-label="Primary" icon={<SettingsIcon />} color="primary" />
      <IconButton type="button" aria-label="Secondary" icon={<SettingsIcon />} color="secondary" />
      <IconButton type="button" aria-label="Danger" icon={<TrashIcon />} color="danger" />
      <IconButton type="button" aria-label="Success" icon={<CloseIcon />} color="success" />
      <IconButton type="button" aria-label="Warning" icon={<CloseIcon />} color="warning" />
    </div>
  ),
};

/**
 * Outline variant across all color tokens. The `outline` variant restores a border
 * and uses `currentColor` for both border and icon — color sets the inherited value.
 */
export const IconButtonOutlineColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <IconButton type="button" aria-label="Primary outline" icon={<SettingsIcon />} variant="outline" color="primary" />
      <IconButton type="button" aria-label="Secondary outline" icon={<SettingsIcon />} variant="outline" color="secondary" />
      <IconButton type="button" aria-label="Danger outline" icon={<TrashIcon />} variant="outline" color="danger" />
      <IconButton type="button" aria-label="Success outline" icon={<CloseIcon />} variant="outline" color="success" />
      <IconButton type="button" aria-label="Warning outline" icon={<CloseIcon />} variant="outline" color="warning" />
    </div>
  ),
};

/**
 * Disabled state — uses the WCAG-compliant `aria-disabled` pattern.
 * The button remains focusable but all interactions are blocked.
 */
export const IconButtonDisabled: Story = {
  args: {
    "aria-label": "Close (disabled)",
    icon: <CloseIcon />,
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Close (disabled)" });

    await step("Disabled button has aria-disabled attribute", async () => {
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    await step("Disabled button remains focusable", async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
    });
  },
};
