import React, { useRef, useEffect } from "react";
import UI from "#components/ui";
import DialogHeader from "#components/dialog/views/dialog-header";
import DialogFooter from "#components/dialog/views/dialog-footer";
import { useDialogClickHandler } from "#hooks/useDialogClickHandler.js";

type DialogModalProps = React.ComponentProps<typeof UI> &
  React.ComponentProps<"dialog"> & {
    dialogTitle: string;
    dialogLabel?: string;
    children: React.ReactNode;
    showDialog?: boolean;
    isAlertDialog?: boolean;
    onClose?: () => void;
    onConfirm?: () => void | Promise<void>;
    confirmLabel?: string;
    cancelLabel?: string;
    className?: string;
  };

export const Dialog: React.FC<DialogModalProps> = ({
  showDialog,
  isAlertDialog,
  onClose,
  dialogTitle,
  dialogLabel,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = React.useState(showDialog);

  useEffect(() => {
    setIsOpen(showDialog);
  }, [showDialog]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (isAlertDialog) {
        dialog.show();
      } else {
        dialog.showModal();
      }
    } else {
      dialog.close();
    }
  }, [isOpen, isAlertDialog]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const handleClickOutside = useDialogClickHandler(dialogRef, handleClose);

  return (
    <UI
      as="dialog"
      role={isAlertDialog ? "alertdialog" : "dialog"}
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleClickOutside}
      aria-modal={isOpen ? "true" : undefined}
      className="dialog-modal"
      aria-label={dialogLabel}
    >
      <DialogHeader dialogTitle={dialogTitle} onClick={handleClose} />

      <UI
        as="section"
        className={`dialog-content ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {children}
        <DialogFooter
          onClose={handleClose}
          onConfirm={onConfirm}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
        />
      </UI>
    </UI>
  );
};
export default React.memo(Dialog);
