import React, { useRef, useEffect } from "react";
import UI from "#components/ui";
import DialogHeader from "#components/dialog/views/dialog-header";
import DialogFooter from "#components/dialog/views/dialog-footer";

type DialogModalProps = React.ComponentProps<typeof UI> &
  React.ComponentProps<"dialog"> & {
    /** Controls the visibility of the dialog */
    showDialog: boolean;
    /** Boolean to set the dialog role to dialog alert */
    isAlertDialog?: boolean;
    /** Function to close the dialog */
    onClose: () => void;
    /** Title of the dialog */
    title: string;
    /** Content of the dialog */
    children: React.ReactNode;
    /** Optional confirm handler. If provided, shows a confirm button */
    onConfirm?: () => void | Promise<void>;
    /** Optional confirm button text */
    confirmLabel?: string;
    /** Optional cancel button text */
    cancelLabel?: string;
    /** Optional className for the dialog content wrapper */
    className?: string;
  };

export const Dialog: React.FC<DialogModalProps> = ({
  showDialog,
  isAlertDialog,
  onClose,
  title,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = React.useState(showDialog);

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
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (dialogDimensions) {
      const isClickOutside =
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom ||
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right;

      if (isClickOutside) {
        handleClose();
      }
    }
  };

  return (
    <UI
      as="dialog"
      role={isAlertDialog ? "alertdialog" : "dialog"}
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleClick}
      aria-modal={isOpen ? "true" : undefined}
      className="dialog-modal"
    >
      <DialogHeader dialogTitle={title} onClick={handleClose} />

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
export default Dialog;
