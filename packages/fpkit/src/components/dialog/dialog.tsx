import React from "react";
import UI from "#components/ui";
import DialogHeader from "./view/dialog-header";

export type DialogProps = {
  dialogId?: string;
  arialLabel?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  dialogTitle?: string;
  hideDialogHeader?: boolean;
  isAlertDialog?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof UI> &
  React.ComponentProps<"dialog">;

export const Dialog = ({
  isOpen,
  dialogId,
  dialogTitle = "Dialog",
  dialogLabel,
  onOpen,
  onClose,
  onCancel,
  hideDialogHeader,
  isAlertDialog,
  classes,
  children,
  ...props
}: DialogProps): JSX.Element => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (isOpen && onOpen) {
      dialogRef.current?.showModal();
      onOpen();
    }
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
      open={isAlertDialog || undefined}
      ref={dialogRef}
      role={isAlertDialog ? "alertdialog" : undefined}
      onCancel={handleCancelEvent}
      onClose={handleCloseEvent}
      className={classes}
      aria-describedby={dialogId}
      aria-label={dialogId ? undefined : dialogLabel}
      {...props}
    >
      {!hideDialogHeader && (
        <DialogHeader dialogTitle={dialogTitle} onClose={closeDialog} />
      )}
      {children}
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Dialog";
