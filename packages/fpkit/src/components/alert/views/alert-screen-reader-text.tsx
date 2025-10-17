import React from "react";

/**
 * Valid severity levels for alerts.
 */
type Severity = "default" | "info" | "success" | "warning" | "error";

/**
 * Screen reader announcement text for each severity level.
 */
const SEVERITY_SCREEN_READER_TEXT: Record<Severity, string> = {
  default: "",
  info: "Information: ",
  success: "Success: ",
  warning: "Warning: ",
  error: "Error: ",
} as const;

/**
 * Renders visually hidden severity text for screen readers.
 * Provides context about the alert type without visual clutter.
 *
 * @param severity - The alert severity level
 * @returns Hidden text for screen readers, or null if no text needed
 */
export const AlertScreenReaderText: React.FC<{ severity: Severity }> = ({ severity }) => {
  const text = SEVERITY_SCREEN_READER_TEXT[severity];
  if (!text) return null;
  return <span className="sr-only">{text}</span>;
};
