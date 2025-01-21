import React from "react";
import UI from "#components/ui";
import Heading from "#components/heading/heading";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";

export type DialogHeaderProps = {
  dialogTitle: string;
  onClick: () => void;
} & React.ComponentProps<typeof Heading>;

/**
 * DialogHeader component displays the header section of a dialog with a title and close button.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.dialogTitle - The title text to display in the dialog header
 * @param {() => void} props.onClick - Callback function triggered when close button is clicked
 * @param {string} [props.type='h3'] - Heading type/level to use for the title
 * @returns {JSX.Element} A dialog header with title and close button
 *
 * @example
 * ```jsx
 * <DialogHeader
 *   dialogTitle="Confirm Action"
 *   onClick={() => setIsOpen(false)}
 *   type="h2"
 * />
 * ```
 */

const DialogHeader = ({
  dialogTitle,
  onClick,
  type = "h3",
}: DialogHeaderProps): JSX.Element => {
  const handleClose = () => {
    onClick();
  };
  return (
    <UI as="div" classes="dialog-header">
      <Heading type={type} className="dialog-title">
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
