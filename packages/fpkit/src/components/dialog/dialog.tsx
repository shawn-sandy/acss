import React from "react";
import UI from "#components/ui";
import DialogHeader from "./view/dialog-header";

export type DialogProps = {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  dialogTitle?: string;
  showDialogHeader?: boolean;
  isAlertDialog?: boolean;
  children: React.ReactNode;
};

export const Dialog = ({
  isOpen = true,
  dialogTitle = "Dialog",
  onOpen,
  onClose,
  onCancel,
  showDialogHeader = true,
  isAlertDialog,
  children,
  ...props
}: DialogProps): JSX.Element => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen && onOpen) {
      dialogRef.current?.showModal();
      onOpen();
    }
    setDialogOpen(isOpen);
  }, [isOpen]);

  const handleCancelEvent = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    if (e.currentTarget === e.target) {
      if (onCancel) {
        onCancel();
      }
    }
  };

  const handleCloseEvent = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    if (e.currentTarget === e.target) {
      if (onClose) {
        onClose();
      }
      isOpen = false;
      dialogRef.current?.close();
    }
  };

  const closeDialog = () => {
    if (onClose) {
      onClose();
    }
    isOpen = false;
    dialogRef.current?.close();
  };

  return (
    <UI
      as="dialog"
      open={dialogOpen}
      ref={dialogRef}
      role={isAlertDialog ? "alertdialog" : undefined}
      onCancel={handleCancelEvent}
      onClose={handleCloseEvent}
      {...props}
    >
      {showDialogHeader && (
        <DialogHeader dialogTitle={dialogTitle} onClose={closeDialog} />
      )}
      {children}
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Dialog";
