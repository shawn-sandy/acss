import React from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";
import { IconProps } from "#components/icons/types";

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
   * @default "info"
   */
  severity?: "info" | "success" | "warning" | "error";
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
 * A customizable alert component that displays messages with different severity levels.
 *
 * @param props The component props
 * @param props.open Whether the alert is visible
 * @param props.severity The severity level of the alert ("info", "success", "warning", "error")
 * @param props.children The content to be displayed within the alert
 * @param props.title Optional title text displayed at the top of the alert
 * @param props.dismissible Whether the alert can be dismissed by the user
 * @param props.onDismiss Callback function triggered when the alert is dismissed
 * @param props.iconProps Props to customize the alert's icon
 * @returns A React alert component
 */
const Alert: React.FC<AlertProps> = ({
  open,
  severity = "info",
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

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const defaultIconProps: IconProps = {
    fill: "gray",
    size: 32,
  };

  const mergedIconProps = { ...defaultIconProps, ...iconProps };

  const severityIcons = {
    info: <Icon.Info {...mergedIconProps} />,
    success: <Icon.Add {...mergedIconProps} />,
    warning: <Icon.Chat {...mergedIconProps} />,
    error: <Icon.Close {...mergedIconProps} />,
  };

  return (
    <UI
      as="div"
      role="alert"
      aria-live={severity === "error" ? "assertive" : "polite"}
      className={`alert alert-${severity}`}
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
      {dismissible && (
        <Button
          type="button"
          onClick={handleDismiss}
          aria-label="Close alert"
          className="alert-dismiss"
          data-btn="icon"
        >
          <Icon>
            <Icon.Close size={16} />
          </Icon>
        </Button>
      )}
    </UI>
  );
};
export default Alert;
Alert.displayName = "Alert";
