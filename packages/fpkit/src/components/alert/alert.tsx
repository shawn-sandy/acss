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
   * Size of the icon in pixels.
   * @default 32
   */
  iconSize?: number;

  /**
   * Whether to hide the icon.
   */
  hideIcon?: boolean;

  /**
   * Additional props to pass to the Icon component.
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
} & React.ComponentProps<typeof UI>;

/**
 * Alert is a customizable component for displaying status messages with different severity levels.
 * It supports multiple severity types (default, info, success, warning, error) and can include
 * optional titles and dismissal functionality.
 *
 * Features:
 * - Multiple severity levels with matching visual indicators
 * - Optional title and dismissible states
 * - Accessible by default with appropriate ARIA attributes
 * - Customizable icons through iconProps
 *
 * @example
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
  actions,
  autoFocus = false,
  variant = "outlined",
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(open);
  const [shouldRender, setShouldRender] = React.useState(open);
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

  // Auto-dismiss functionality
  React.useEffect(() => {
    if (!autoHideDuration || !isVisible) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, isVisible, handleDismiss]);

  // ESC key support for dismissible alerts
  React.useEffect(() => {
    if (!dismissible || !isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dismissible, isVisible, handleDismiss]);

  /**
   * Default props for the Icon component used in the Alert component.
   * These props set the fill color to white and the size to 32 pixels.
   */
  const defaultIconProps: IconProps = {
    size: iconSize || 32,
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
      {...props}
    >
      {!hideIcon && <UI aria-hidden="true" className="alert-icon">{severityIcon}</UI>}
      <UI as="div" className="alert-message">
        {title && (
          <UI as="h3" className="alert-title">
            {title}
          </UI>
        )}
        <UI as="div">{children}</UI>
        {actions && <UI as="div" className="alert-actions">{actions}</UI>}
      </UI>
      {dismissible && <DismissButton onDismiss={handleDismiss} />}
    </UI>
  );
};
export default Alert;
Alert.displayName = "Alert";
