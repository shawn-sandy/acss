import React from "react";
import UI from "#components/ui";

/**
 * Renders the alert message content.
 * Supports both simple text (wrapped in <p>) and complex node structures.
 *
 * @param children - The content to render
 * @param contentType - How to wrap the content ("text" or "node")
 * @returns Wrapped content
 */
export const AlertContent: React.FC<{
  children: React.ReactNode;
  contentType: "text" | "node";
}> = ({ children, contentType }) => {
  return contentType === "node" ? <>{children}</> : <UI as="p">{children}</UI>;
};
