import React, { useCallback } from "react";
import UI from "#components/ui";
import Heading from "#components/heading/heading";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";
import type { DialogHeaderProps } from "../dialog.types";

/**
 * DialogHeader component displays the header section of a dialog with a title and close button.
 *
 * This component is optimized for accessibility with:
 * - Unique ID for `aria-labelledby` linking to parent dialog
 * - Semantic heading structure for screen readers
 * - Clear close button with accessible label
 * - Memoized to prevent unnecessary re-renders
 *
 * @component
 * @param {DialogHeaderProps} props - Component props
 * @param {string} props.dialogTitle - The title text to display in the dialog header
 * @param {() => void} props.onClick - Callback function triggered when close button is clicked
 * @param {string} [props.id] - Optional ID for aria-labelledby linking. Auto-generated if not provided.
 * @param {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"} [props.type="h3"] - Heading level for semantic structure
 * @returns {JSX.Element} A dialog header with title and close button
 *
 * @example
 * ```tsx
 * <DialogHeader
 *   id="dialog-title-1"
 *   dialogTitle="Confirm Action"
 *   onClick={() => setIsOpen(false)}
 *   type="h2"
 * />
 * ```
 */
const DialogHeader: React.FC<DialogHeaderProps> = ({
  dialogTitle,
  onClick,
  id,
  type = "h3",
}) => {
  const handleClose = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <UI as="div" classes="dialog-header">
      <Heading type={type} className="dialog-title" id={id}>
        {dialogTitle || "Dialog"}
      </Heading>
      <Button
        type="button"
        onClick={handleClose}
        className="dialog-close"
        aria-label="Close dialog"
        data-btn="icon"
      >
        <Icon>
          <Icon.Remove size={16} />
        </Icon>
      </Button>
    </UI>
  );
};

export default React.memo(DialogHeader);
DialogHeader.displayName = "DialogHeader";
