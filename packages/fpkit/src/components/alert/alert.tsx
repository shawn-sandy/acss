import React from "react";
import { IconProps } from "#components/icons/types";
import { AlertView } from "./views";

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

/**
 * Valid severity levels for alerts.
 * Each severity has associated colors, icons, and ARIA attributes.
 */
type Severity = "default" | "info" | "success" | "warning" | "error";


/**
 * Props for the Alert component.
 */
export type AlertProps = {
  /**
   * Whether the alert is open.
   */
  open: boolean;
  /**
   * The severity level of the alert.
   * @default "default"
   */
  severity?: Severity;
  /**
   * The main message content.
   */
  children: React.ReactNode;
  /**
   * Optional title for the alert.
   */
  title?: string;
  /**
   * Whether the alert can be dismissed.
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback when alert is dismissed.
   */
  onDismiss?: () => void;

  /**
   * Size of the severity icon in pixels.
   * Allows customization of icon size for different contexts.
   * @default 24
   * @example
   * ```tsx
   * <Alert iconSize={32} severity="error">Larger icon</Alert>
   * <Alert iconSize={16} severity="info">Smaller icon</Alert>
   * ```
   */
  iconSize?: number;

  /**
   * Whether to hide the severity icon.
   * When true, only text content is displayed.
   * @default false
   */
  hideIcon?: boolean;

  /**
   * Additional props to pass to the Icon component.
   * Allows fine-grained control over icon appearance.
   * @example
   * ```tsx
   * <Alert iconProps={{ className: 'custom-icon', 'aria-label': 'Custom' }}>
   *   Alert with custom icon props
   * </Alert>
   * ```
   */
  iconProps?: IconProps;

  /**
   * Duration in milliseconds before the alert automatically dismisses.
   * Set to 0 or undefined to disable auto-dismiss.
   * @default undefined
   * @example
   * ```tsx
   * <Alert autoHideDuration={5000}>Success message</Alert>
   * ```
   */
  autoHideDuration?: number;

  /**
   * Whether to pause auto-dismiss when the alert is hovered or focused.
   * Complies with WCAG 2.2.1 (Timing Adjustable).
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Semantic heading level for the title (2-6).
   * When undefined, uses <strong> element instead of heading.
   * Use this to maintain proper heading hierarchy on the page.
   * @default undefined
   * @example
   * ```tsx
   * <Alert titleLevel={2} title="Section Alert">...</Alert>
   * <Alert titleLevel={3} title="Subsection Alert">...</Alert>
   * ```
   */
  titleLevel?: 2 | 3 | 4 | 5 | 6;

  /**
   * Custom action buttons to display in the alert.
   * @example
   * ```tsx
   * <Alert actions={<><Button>Undo</Button><Button>Dismiss</Button></>}>
   *   File deleted
   * </Alert>
   * ```
   */
  actions?: React.ReactNode;

  /**
   * Whether to automatically focus the alert when it becomes visible.
   * Useful for critical alerts that require immediate attention.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Visual variant of the alert.
   * - outlined: Border with lighter background (default)
   * - filled: Solid colored background
   * - soft: No border, subtle background
   * @default "outlined"
   */
  variant?: "outlined" | "filled" | "soft";

  /**
   * Content rendering mode for alert children.
   * Determines how the children content is wrapped in the alert message area.
   * - "text": Wraps children in a paragraph tag (default, for simple text content)
   * - "node": Renders children directly without wrapper (for complex layouts, lists, or custom components)
   * @default "text"
   * @example Simple text content (uses default "text" mode)
   * ```tsx
   * <Alert severity="info">
   *   This is a simple text message that will be wrapped in a paragraph.
   * </Alert>
   * ```
   * @example Complex content with list
   * ```tsx
   * <Alert severity="warning" contentType="node">
   *   <p>Please review the following items:</p>
   *   <ul>
   *     <li>Check your email settings</li>
   *     <li>Update your password</li>
   *     <li>Enable two-factor authentication</li>
   *   </ul>
   * </Alert>
   * ```
   * @example Custom component layout
   * ```tsx
   * <Alert severity="success" contentType="node">
   *   <div className="custom-layout">
   *     <p>Operation completed successfully!</p>
   *     <div className="stats">
   *       <span>Items processed: 150</span>
   *       <span>Time elapsed: 2.5s</span>
   *     </div>
   *   </div>
   * </Alert>
   * ```
   */
  contentType?: "text" | "node";
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'>;

/**
 * Alert is a fully accessible component for displaying status messages with different severity levels.
 * It supports multiple severity types (default, info, success, warning, error) and can include
 * optional titles and dismissal functionality.
 *
 * Features:
 * - Multiple severity levels with matching visual indicators
 * - Three variants: outlined (default), filled, and soft
 * - Auto-dismiss with configurable duration and pause on hover/focus
 * - Optional title with configurable heading levels (h2-h6) for proper document structure
 * - Action buttons support for interactive alerts
 * - Accessible by default with appropriate ARIA attributes
 * - Screen reader announcements for severity levels
 * - Keyboard support (ESC to dismiss)
 * - WCAG 2.1 Level AA compliant
 *
 * Accessibility Features:
 * - Visually hidden severity text for screen readers (WCAG 1.1.1, 1.4.1)
 * - Configurable heading levels to maintain document hierarchy (WCAG 1.3.1)
 * - Visible focus indicators for keyboard navigation (WCAG 2.4.7)
 * - Adequate color contrast for all variants (WCAG 1.4.3)
 * - 44×44px minimum touch target size for dismiss button (WCAG 2.5.5)
 * - Pause auto-dismiss on hover/focus (WCAG 2.2.1)
 *
 * @example Basic Usage
 * ```tsx
 * <Alert
 *   open={true}
 *   severity="info"
 *   title="Optional Title"
 *   dismissible={true}
 *   onDismiss={() => console.log('Alert dismissed')}
 * >
 *   Alert message content
 * </Alert>
 * ```
 *
 * @example With Heading Level (for proper document structure)
 * ```tsx
 * <Alert
 *   open={true}
 *   severity="error"
 *   title="Error Title"
 *   titleLevel={2}
 *   dismissible={true}
 * >
 *   Error message
 * </Alert>
 * ```
 *
 * @example Auto-dismiss with Pause on Hover
 * ```tsx
 * <Alert
 *   open={true}
 *   severity="success"
 *   autoHideDuration={5000}
 *   pauseOnHover={true}
 * >
 *   This will auto-dismiss in 5 seconds, but pauses when hovered
 * </Alert>
 * ```
 *
 * @see {@link AlertProps} for available configuration options
 */

// ============================================================================
// CUSTOM HOOK (Behavior Management)
// ============================================================================

/**
 * Custom hook that manages all Alert component behavior in one cohesive unit.
 * Consolidates visibility, auto-dismiss, keyboard, and focus management.
 *
 * @param open - Whether the alert should be open
 * @param onDismiss - Callback when alert is dismissed
 * @param dismissible - Whether the alert can be dismissed
 * @param autoHideDuration - Duration before auto-dismiss (ms)
 * @param pauseOnHover - Whether to pause auto-dismiss on hover/focus
 * @param autoFocus - Whether to auto-focus the alert
 * @param alertRef - Ref to the alert DOM element
 * @returns Object with visibility state, handlers, and event callbacks
 */
const useAlertBehavior = ({
  open,
  onDismiss,
  dismissible,
  autoHideDuration,
  pauseOnHover,
  autoFocus,
  alertRef,
}: {
  open: boolean;
  onDismiss?: () => void;
  dismissible: boolean;
  autoHideDuration?: number;
  pauseOnHover: boolean;
  autoFocus: boolean;
  alertRef: React.RefObject<HTMLDivElement>;
}) => {
  const [isVisible, setIsVisible] = React.useState(open);
  const [shouldRender, setShouldRender] = React.useState(open);
  const [isPaused, setIsPaused] = React.useState(false);

  // Dismiss handler with animation timing
  const handleDismiss = React.useCallback((): void => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setShouldRender(false);
      onDismiss?.();
    }, 300); // Match CSS transition duration
  }, [onDismiss]);

  // Visibility management - sync with open prop
  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Auto-dismiss timer with pause support
  React.useEffect(() => {
    if (!autoHideDuration || !isVisible || isPaused) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, isVisible, isPaused, handleDismiss]);

  // ESC key support for dismissible alerts
  React.useEffect(() => {
    if (!dismissible || !isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dismissible, isVisible, handleDismiss]);

  // Auto-focus for critical alerts
  React.useEffect(() => {
    if (autoFocus && isVisible && alertRef.current) {
      alertRef.current.focus();
    }
  }, [autoFocus, isVisible, alertRef]);

  // Pause/resume handlers (memoized for stable references)
  const pause = React.useCallback(() => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(true);
    }
  }, [pauseOnHover, autoHideDuration]);

  const resume = React.useCallback(() => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(false);
    }
  }, [pauseOnHover, autoHideDuration]);

  return {
    isVisible,
    shouldRender,
    handleDismiss,
    handleInteractionStart: pause,
    handleInteractionEnd: resume,
  };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Alert: React.FC<AlertProps> = ({
  open,
  severity = "default",
  children,
  title,
  dismissible = false,
  onDismiss,
  iconSize,
  iconProps,
  hideIcon,
  autoHideDuration,
  pauseOnHover = true,
  titleLevel = 3,
  actions,
  autoFocus = false,
  variant = "outlined",
  contentType = "text",
  ...props
}) => {
  const alertRef = React.useRef<HTMLDivElement>(null);

  // Use consolidated behavior hook
  const {
    isVisible,
    shouldRender,
    handleDismiss,
    handleInteractionStart,
    handleInteractionEnd,
  } = useAlertBehavior({
    open,
    onDismiss,
    dismissible,
    autoHideDuration,
    pauseOnHover,
    autoFocus,
    alertRef,
  });

  // Early return if component shouldn't render
  if (!shouldRender) return null;

  // Merge icon props with defaults
  const mergedIconProps: IconProps = {
    size: iconSize || 16,
    ...iconProps,
  };

  return (
    <AlertView
      ref={alertRef}
      severity={severity}
      variant={variant}
      isVisible={isVisible}
      dismissible={dismissible}
      onDismiss={handleDismiss}
      onInteractionStart={handleInteractionStart}
      onInteractionEnd={handleInteractionEnd}
      autoFocus={autoFocus}
      title={title}
      titleLevel={titleLevel}
      contentType={contentType}
      actions={actions}
      hideIcon={hideIcon}
      iconProps={mergedIconProps}
      {...props}
    >
      {children}
    </AlertView>
  );
};
export default Alert;
Alert.displayName = "Alert";
