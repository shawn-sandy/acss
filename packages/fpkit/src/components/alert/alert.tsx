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

  const severityColors = {
    info: "#0070f3",
    success: "#00aa55",
    warning: "#f5a623",
    error: "#ff0000",
  };

  return (
    <UI
      as="div"
      role="alert"
      aria-live={severity === "error" ? "assertive" : "polite"}
      styles={{
        padding: "1rem",
        borderRadius: "0.25rem",
        border: `1px solid ${severityColors[severity]}`,
        backgroundColor: `${severityColors[severity]}10`,
        color: severityColors[severity],
        position: "relative",
      }}
      {...props}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span aria-hidden="true">{severityIcons[severity]}</span>
        {title && <strong style={{ marginRight: "0.5rem" }}>{title}</strong>}
        <div>{children}</div>
      </div>

      {dismissible && (
        <Button
          type="button"
          onClick={handleDismiss}
          aria-label="Close alert"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            fontSize: "1.25rem",
          }}
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
