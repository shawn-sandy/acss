import React from "react";
import UI from "#components/ui";
import Icon from "#components/icons/icon";
import { IconProps } from "#components/icons/types";
import DismissButton from "./elements/dismiss-button";

// First, define a type for the valid severity values
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
} & React.ComponentProps<typeof UI>;

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
  const [isVisible, setIsVisible] = React.useState(open);
  const [shouldRender, setShouldRender] = React.useState(open);
  const [isPaused, setIsPaused] = React.useState(false);
  const alertRef = React.useRef<HTMLDivElement>(null);

  const handleDismiss = React.useCallback((): void => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setShouldRender(false);
      onDismiss?.();
    }, 300); // Match CSS transition duration
  }, [onDismiss]);

  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Auto-dismiss functionality with pause support
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

  /**
   * Default props for the Icon component used in the Alert component.
   * Sets the icon size to the user-provided value or 24 pixels by default.
   */
  const defaultIconProps: IconProps = {
    size: iconSize || 16,
  };

  // Update the severityType object with the type
  const severityType: Record<Severity, "polite" | "assertive"> = {
    default: "polite",
    info: "polite",
    success: "polite",
    warning: "polite",
    error: "assertive",
  } as const;

  const mergedIconProps = { ...defaultIconProps, ...iconProps };

  // Severity text for screen readers (WCAG 1.1.1, 1.4.1)
  const severityText: Record<Severity, string> = {
    default: "",
    info: "Information: ",
    success: "Success: ",
    warning: "Warning: ",
    error: "Error: ",
  };

  // Memoize severity icon to prevent recreation on every render
  const severityIcon = React.useMemo(() => {
    const severityIcons: Record<Severity, JSX.Element> = {
      info: <Icon.InfoSolid {...mergedIconProps} />,
      success: <Icon.SuccessSolid {...mergedIconProps} />,
      warning: <Icon.WarnSolid {...mergedIconProps} />,
      error: <Icon.AlertSolid {...mergedIconProps} />,
      default: <Icon.AlertSquareSolid {...mergedIconProps} />,
    };
    return severityIcons[severity];
  }, [severity, mergedIconProps]);

  // Auto-focus functionality for critical alerts
  React.useEffect(() => {
    if (autoFocus && isVisible && alertRef.current) {
      alertRef.current.focus();
    }
  }, [autoFocus, isVisible]);

  if (!shouldRender) return null;

  // Dynamic title element based on titleLevel prop
  const TitleElement = titleLevel ? (`h${titleLevel}` as const) : "strong";

  // Pause/resume handlers for auto-dismiss (WCAG 2.2.1)
  const handleMouseEnter = () => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(false);
    }
  };

  const handleFocus = () => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(true);
    }
  };

  const handleBlur = () => {
    if (pauseOnHover && autoHideDuration) {
      setIsPaused(false);
    }
  };

  return (
    <UI
      as="div"
      ref={alertRef}
      role="alert"
      aria-live={severityType[severity]}
      aria-atomic="true"
      className={`alert alert-${severity}`}
      data-alert={severity}
      data-visible={isVisible}
      data-variant={variant}
      tabIndex={autoFocus ? -1 : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {/* Visually hidden severity text for screen readers */}
      {severityText[severity] && (
        <span className="sr-only">{severityText[severity]}</span>
      )}
      {!hideIcon && (
        <UI aria-hidden="true" className="alert-icon">
          {severityIcon}
        </UI>
      )}
      <UI as="div" className="alert-message">
        {title && (
          <UI as={TitleElement} className="alert-title">
            {title}
          </UI>
        )}
        {contentType === "node" ? (
          children
        ) : (
          <UI as="p">{children}</UI>
        )}
        {actions && (
          <UI as="div" className="alert-actions">
            {actions}
          </UI>
        )}
      </UI>
      {dismissible && <DismissButton onDismiss={handleDismiss} />}
    </UI>
  );
};
export default Alert;
Alert.displayName = "Alert";
