import React from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";

export type AlertProps = {
  /** The severity level of the alert */
  severity?: "info" | "success" | "warning" | "error";
  /** The main message content */
  children: React.ReactNode;
  /** Optional title for the alert */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  severity = "info",
  children,
  title,
  dismissible = false,
  onDismiss,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const severityIcons = {
    info: "",
    success: "",
    warning: "",
    error: "",
  };

  return (
    <UI
      as="div"
      role="alert"
      aria-live={severity === "error" ? "assertive" : "polite"}
      className={`alert alert-${severity}`}
      {...props}
    >
      <UI as="div" className="alert-icon">
        {severityIcons[severity]}
        <Icon>
          <Icon.Info size={32} />
        </Icon>
      </UI>
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
