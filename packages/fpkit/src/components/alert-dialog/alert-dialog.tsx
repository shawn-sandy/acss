import React from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";
import Dialog from "#components/dialog/dialog";

/**
 * Props for the AlertDialog component.
 * @property {string} title - The title text to display in the dialog header
 * @property {React.ReactNode} message - The message content to display in the dialog body
 * @property {function} onConfirm - Callback function triggered when the confirm button is clicked
 * @property {function} onCancel - Callback function triggered when the cancel button is clicked
 * @property {"alert" | "alertdialog"} alertType - The ARIA role type for the dialog
 */
export type AlertDialogProps = {
  title: string;
  message: React.ReactNode;
  onConfirm: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onOpen?: () => void;
  alertType: "alert" | "alertdialog";
} & React.ComponentProps<typeof UI> &
  React.ComponentProps<"dialog">;

const AlertDialog = ({
  title = "Alert Dialog",
  message,
  open,
  onConfirm,
  onCancel,
  onOpen,
}: AlertDialogProps): React.JSX.Element => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = React.useState(open);
  /**
   * Updates the internal open state whenever the `open` prop changes.
   * Synchronizes the controlled open state with the internal state.
   */
  React.useEffect(() => {
    setIsOpen(open);
    if (!open && onOpen) {
      dialogRef.current?.showModal();
      onOpen();
    }
  }, [open]);

  const handleOnConfirm = (e: React.MouseEvent) => {
    onConfirm?.(e);
  };

  const handleOnCancel = (e: React.MouseEvent) => {
    onCancel?.(e);
    setIsOpen(false);
  };

  return (
    <Dialog isOpen={isOpen} isAlertDialog={true} dialogTitle={title}>
      {message}
      <UI as="div" classes="alert-dialog-actions">
        <Button type="button" onClick={handleOnConfirm} data-btn="sm">
          Confirm
        </Button>
        <Button
          type="button"
          onClick={handleOnCancel}
          data-btn="sm"
          classes="transparent"
        >
          Cancel
        </Button>
      </UI>
    </Dialog>
  );
};

export default React.memo(AlertDialog);
AlertDialog.displayName = "AlertDialog";
