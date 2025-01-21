import React, { useRef, useEffect, CSSProperties } from "react";
import UI from "#components/ui";
import DialogHeader from "#components/dialog/views/dialog-header";
import DialogFooter from "#components/dialog/views/dialog-footer";
import { useDialogClickHandler } from "#hooks/useDialogClickHandler.js";

/**
 * Defines the props for the Dialog component.
 *
 * @property {boolean} [showDialog] - Determines whether the dialog should be shown.
 * @property {boolean} [isAlertDialog] - Determines whether the dialog should be displayed as an alert dialog.
 * @property {() => void} [onClose] - A callback function to be called when the dialog is closed.
 * @property {string} dialogTitle - The title of the dialog.
 * @property {string} [dialogLabel] - An optional label for the dialog.
 * @property {React.ReactNode} children - The content to be displayed inside the dialog.
 * @property {() => void | Promise<void>} [onConfirm] - A callback function to be called when the user confirms the dialog.
 * @property {string} [confirmLabel] - The label for the confirm button.
 * @property {string} [cancelLabel] - The label for the cancel button.
 * @property {string} [className] - An optional CSS class name to be applied to the dialog.
 * @property {CSSProperties} [styles] - Optional inline styles to be applied to the dialog.
 */
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
    hideFooter?: boolean;
    styles?: CSSProperties;
  };

/**
 * Renders a dialog modal component with customizable content and behavior.
 *
 * @param showDialog - Determines whether the dialog should be shown.
 * @param isAlertDialog - Determines whether the dialog should be displayed as an alert dialog.
 * @param onClose - A callback function to be called when the dialog is closed.
 * @param dialogTitle - The title of the dialog.
 * @param dialogLabel - An optional label for the dialog.
 * @param children - The content to be displayed inside the dialog.
 * @param onConfirm - A callback function to be called when the user confirms the dialog.
 * @param confirmLabel - The label for the confirm button.
 * @param cancelLabel - The label for the cancel button.
 * @param className - An optional CSS class name to be applied to the dialog.
 * @param styles - Optional inline styles to be applied to the dialog.
 */
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
  hideFooter,
  styles,
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
      className={`${"dialog-modal"} ${className}`}
      aria-label={dialogLabel}
      style={styles}
    >
      <DialogHeader dialogTitle={dialogTitle} onClick={handleClose} />

      <UI
        as="section"
        className={`dialog-content ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {children}
        {!hideFooter && (
          <DialogFooter
            onClose={handleClose}
            onConfirm={onConfirm}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
          />
        )}
      </UI>
    </UI>
  );
};
export default React.memo(Dialog);
