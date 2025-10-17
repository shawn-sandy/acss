import React from "react";
import UI from "#components/ui";
import Icon from "#components/icons/icon";
import { IconProps } from "#components/icons/types";

/**
 * Valid severity levels for alerts.
 */
type Severity = "default" | "info" | "success" | "warning" | "error";

/**
 * Pure function to get the appropriate icon for a severity level.
 *
 * @param severity - The alert severity level
 * @param iconProps - Props to pass to the Icon component
 * @returns The icon element for the severity
 */
const getSeverityIcon = (
  severity: Severity,
  iconProps: IconProps
): JSX.Element => {
  const severityIcons: Record<Severity, JSX.Element> = {
    info: <Icon.InfoSolid {...iconProps} />,
    success: <Icon.SuccessSolid {...iconProps} />,
    warning: <Icon.WarnSolid {...iconProps} />,
    error: <Icon.AlertSolid {...iconProps} />,
    default: <Icon.AlertSquareSolid {...iconProps} />,
  };
  return severityIcons[severity];
};

/**
 * Renders the severity icon with proper ARIA attributes.
 * Icon is hidden from screen readers as the text provides context.
 *
 * @param severity - The alert severity level
 * @param iconProps - Props to pass to the Icon component
 * @param hideIcon - Whether to hide the icon
 * @returns Icon element, or null if hidden
 */
export const AlertIcon: React.FC<{
  severity: Severity;
  iconProps: IconProps;
  hideIcon?: boolean;
}> = ({ severity, iconProps, hideIcon }) => {
  if (hideIcon) return null;
  const icon = getSeverityIcon(severity, iconProps);
  return (
    <UI aria-hidden="true" className="alert-icon">
      {icon}
    </UI>
  );
};
