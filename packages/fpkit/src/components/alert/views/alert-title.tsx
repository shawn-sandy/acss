import React from "react";
import UI from "#components/ui";

/**
 * Renders the alert title with configurable heading level.
 * Uses semantic heading (h2-h6) or strong element based on titleLevel prop.
 *
 * @param title - The title text to display
 * @param titleLevel - Semantic heading level (2-6)
 * @returns Title element, or null if no title provided
 */
export const AlertTitle: React.FC<{
  title?: string;
  titleLevel: 2 | 3 | 4 | 5 | 6;
}> = ({ title, titleLevel }) => {
  if (!title) return null;
  const TitleElement = titleLevel ? (`h${titleLevel}` as const) : "strong";
  return (
    <UI as={TitleElement} className="alert-title">
      {title}
    </UI>
  );
};
