import React from 'react';

/**
 * Props for the Popover component using native HTML popover API
 */
interface PopoverProps {
    /** Unique ID for popover (required for popovertarget attribute) */
    id?: string;
    /** Content to display inside the popover */
    children: React.ReactNode;
    /** Custom trigger element (default: button with triggerLabel) */
    trigger?: React.ReactNode;
    /** Aria-label for default trigger button */
    triggerLabel?: string;
    /** Popover mode: "auto" (light dismiss) or "manual" (explicit close) */
    mode?: 'auto' | 'manual';
    /** Preferred placement position relative to trigger */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** Controlled open state (optional) */
    isOpen?: boolean;
    /** Callback when popover toggles open/closed */
    onToggle?: (open: boolean) => void;
    /** Show close button (default: true for manual mode, false for auto) */
    showCloseButton?: boolean;
    /** Aria-label for close button */
    closeButtonLabel?: string;
    /** Show positioning arrow */
    showArrow?: boolean;
    /** Custom CSS class for popover element */
    className?: string;
    /** Inline CSS variables for theming */
    styles?: React.CSSProperties;
}
/**
 * Popover component using native HTML popover API
 *
 * Provides automatic top-layer rendering, light dismiss behavior,
 * and accessibility features built into the platform.
 *
 * **Browser Requirements:**
 * - Chrome 125+, Edge 125+, Safari 17.4+
 * - Requires CSS anchor positioning support for optimal placement
 *
 * @example
 * ```tsx
 * <Popover id="my-popover" triggerLabel="Open Menu">
 *   <p>Popover content here</p>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * <Popover
 *   id="custom-popover"
 *   mode="manual"
 *   placement="top"
 *   trigger={<button>Custom Trigger</button>}
 * >
 *   <h3>Popover Title</h3>
 *   <p>This requires explicit close action.</p>
 * </Popover>
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover
 */
declare const Popover: React.FC<PopoverProps>;

export { Popover, PopoverProps, Popover as default };
