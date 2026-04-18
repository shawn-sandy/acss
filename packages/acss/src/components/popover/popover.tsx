import React, { useEffect, useId, useRef } from 'react';
import type {} from '../../types/popover';

/**
 * Props for the Popover component using native HTML popover API
 */
export interface PopoverProps {
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
export const Popover: React.FC<PopoverProps> = ({
  id,
  children,
  trigger,
  triggerLabel = 'Open',
  mode = 'auto',
  placement = 'bottom',
  isOpen,
  onToggle,
  showCloseButton,
  showArrow = true,
  closeButtonLabel = 'Close',
  className = '',
  styles,
}) => {
  const generatedId = useId();
  const popoverId = id || generatedId;
  const popoverRef = useRef<HTMLDivElement>(null);

  // Default showCloseButton based on mode
  const shouldShowCloseButton =
    showCloseButton !== undefined ? showCloseButton : mode === 'manual';

  // Handle controlled state
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (isOpen !== undefined) {
      try {
        // Try to check if popover is open using :popover-open pseudo-class
        // Fall back to checking data attribute for testing environments
        const isCurrentlyOpen =
          popover.matches(':popover-open') || popover.hasAttribute('data-popover-open');

        if (isOpen && !isCurrentlyOpen) {
          popover.showPopover();
        } else if (!isOpen && isCurrentlyOpen) {
          popover.hidePopover();
        }
      } catch {
        // In environments without popover support, check data attribute
        const isCurrentlyOpen = popover.hasAttribute('data-popover-open');
        if (isOpen && !isCurrentlyOpen) {
          popover.showPopover();
        } else if (!isOpen && isCurrentlyOpen) {
          popover.hidePopover();
        }
      }
    }
  }, [isOpen]);

  // Listen to toggle events
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover || !onToggle) return;

    const handleToggle = (event: Event) => {
      const toggleEvent = event as ToggleEvent;
      onToggle(toggleEvent.newState === 'open');
    };

    popover.addEventListener('toggle', handleToggle);
    return () => popover.removeEventListener('toggle', handleToggle);
  }, [onToggle]);

  // Custom trigger with popovertarget attribute
  const renderTrigger = () => {
    if (trigger) {
      return React.cloneElement(trigger as React.ReactElement, {
        popovertarget: popoverId,
        popovertargetaction: 'toggle',
      });
    }

    return (
      <button
        type="button"
        popovertarget={popoverId}
        popovertargetaction="toggle"
        aria-label={triggerLabel}
        className="fpkit-popover-trigger"
      >
        {triggerLabel}
      </button>
    );
  };

  return (
    <>
      {renderTrigger()}
      <div
        ref={popoverRef}
        id={popoverId}
        popover={mode}
        className={`fpkit-popover ${className}`.trim()}
        data-placement={placement}
        style={styles}
      >
        {showArrow && <div className="fpkit-popover-arrow" data-placement={placement} />}
        <div className="fpkit-popover-content">
          {children}
          {shouldShowCloseButton && (
            <button
              type="button"
              popovertarget={popoverId}
              popovertargetaction="hide"
              aria-label={closeButtonLabel}
              className="fpkit-popover-close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Popover;
Popover.displayName = 'Popover';
