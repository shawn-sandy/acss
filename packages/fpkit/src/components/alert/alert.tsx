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
   * Additional props to pass to the Icon component.
   */
  iconProps?: IconProps;
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
 */ const Alert: React.FC<AlertProps> = ({
  open,
  severity = "default",
  children,
  title,
  dismissible = false,
  onDismiss,
  iconProps,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(open);

  React.useEffect(() => {
    setIsVisible(open);
  }, [open]);

  if (!isVisible) return null;

  const handleDismiss = (): void => {
    setIsVisible(false);
    onDismiss?.();
  };

  /**
   * Default props for the Icon component used in the Alert component.
   * These props set the fill color to white and the size to 32 pixels.
   */
  const defaultIconProps: IconProps = {
    fill: "#fff",
    size: 32,
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

  // Update the severityIcons object with the type
  const severityIcons: Record<Severity, JSX.Element> = {
    info: <Icon.Info {...mergedIconProps} />,
    success: <Icon.Add {...mergedIconProps} />,
    warning: <Icon.Chat {...mergedIconProps} />,
    error: <Icon.Close {...mergedIconProps} />,
    default: <Icon.Info {...mergedIconProps} />,
  };

  return (
    <UI
      as="div"
      role="alert"
      aria-live={severityType[severity]}
      aria-atomic="true"
      className={`alert alert-${severity}`}
      data-alert={severity}
      {...props}
    >
      <UI aria-hidden="true">{severityIcons[severity]}</UI>
      <UI as="div" className="alert-message">
        {title && (
          <UI as="strong" className="alert-title">
            {title}
          </UI>
        )}
        <UI as="div">{children}</UI>
      </UI>
      {dismissible && <DismissButton onDismiss={handleDismiss} />}
    </UI>
  );
};
export default Alert;
Alert.displayName = "Alert";
