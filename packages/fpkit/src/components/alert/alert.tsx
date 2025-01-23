import React from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button.jsx";

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

/**
 * Alert component that follows WCAG accessibility standards
 * - Uses appropriate ARIA roles and attributes
 * - Provides visual and semantic indication of severity
 * - Ensures sufficient color contrast
 * - Supports keyboard interaction for dismissible alerts
 */
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
      <div className="alert-content">
        <span aria-hidden="true">{severityIcons[severity]}</span>
        {title && <strong className="alert-title">{title}</strong>}
        <div>{children}</div>
      </div>

      {dismissible && (
        <Button
          type="button"
          onClick={handleDismiss}
          aria-label="Close alert"
          className="alert-dismiss"
        >
          <UI as="span" aria-hidden="true">
            ×
          </UI>
        </Button>
      )}
    </UI>
  );
};

export default Alert;
Alert.displayName = "Alert";
