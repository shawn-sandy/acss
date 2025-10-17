import React from "react";
import UI from "#components/ui";

/**
 * Renders optional action buttons within the alert.
 *
 * @param actions - Action button elements to display
 * @returns Actions container, or null if no actions provided
 */
export const AlertActions: React.FC<{ actions?: React.ReactNode }> = ({ actions }) => {
  if (!actions) return null;
  return <UI as="div" className="alert-actions">{actions}</UI>;
};
