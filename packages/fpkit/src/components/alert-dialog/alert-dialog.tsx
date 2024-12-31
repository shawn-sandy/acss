import React from "react";
import UI from "#components/ui";

export type AlertDialogProps = {
  title: string;
  message: React.ReactNode;
  onConfirm: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  alertType: "alert" | "alertdialog";
} & React.ComponentProps<typeof UI> &
  React.ComponentProps<"dialog">;

const AlertDialog = ({
  title,
  message,
  open,
  alertType = "alert",
  onConfirm,
  onCancel,
  ...props
}: AlertDialogProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(open);
  /**
   * Updates the internal open state whenever the `open` prop changes.
   * Synchronizes the controlled open state with the internal state.
   */
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOnConfirm = (e: React.MouseEvent) => {
    onConfirm?.(e);
  };

  const handleOnCancel = (e: React.MouseEvent) => {
    onCancel?.(e);
  };

  return (
    <UI as="dialog" role={alertType} open={isOpen} {...props}>
      <h2>{title}</h2>
      <p>{message}</p>
      <UI as="div" classes="alert-dialog__actions">
        <button onClick={handleOnConfirm}>Confirm</button>
        <button onClick={handleOnCancel}>Cancel</button>
      </UI>
    </UI>
  );
};

export default React.memo(AlertDialog);
AlertDialog.displayName = "AlertDialog";
