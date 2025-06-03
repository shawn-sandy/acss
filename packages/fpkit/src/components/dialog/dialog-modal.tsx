// Dialog.tsx
import React from "react";
import Dialog from "./dialog";
import Button from "#components/buttons/button.jsx";

/**
 * Additional props for the DialogModal component, extending the props of the Dialog component.
 *
 * @property {string} [className] - Optional className for the dialog content wrapper.
 * @property {string} [btnLabel] - Label for the button that opens the dialog.
 * @property {() => void} [btnOnClick] - Callback function to be called when the button is clicked.
 * @property {"sm" | "md" | "lg"} [btnSize] - Size of the button that opens the dialog.
 */
interface DialogModalProps extends React.ComponentProps<typeof Dialog> {
  /** Optional className for the dialog content wrapper */
  className?: string;
  btnLabel?: string;
  btnOnClick?: () => void;
  btnSize?: "sm" | "md" | "lg";
  btnProps?: React.ComponentProps<typeof Button>;
}

/**
 * A modal dialog component that provides an accessible overlay with an optional trigger button.
 * Extends the base Dialog component with additional button control functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isAlertDialog] - Whether this is an alert dialog requiring user action
 * @param {() => void} [props.onClose] - Callback when dialog is closed
 * @param {string} [props.dialogTitle] - Title displayed in dialog header
 * @param {string} [props.dialogLabel] - Accessible label for the dialog
 * @param {string} [props.btnLabel="Open Dialog"] - Text label for the trigger button
 * @param {"sm" | "md" | "lg"} [props.btnSize="md"] - Size of the trigger button
 * @param {() => void} [props.btnOnClick] - Callback when trigger button is clicked
 * @param {React.ReactNode} props.children - Content to display inside the dialog
 * @param {() => void} [props.onConfirm] - Callback when confirm button is clicked (for alert dialogs)
 * @param {string} [props.confirmLabel="Confirm"] - Text for the confirm button
 * @param {string} [props.cancelLabel="Cancel"] - Text for the cancel button
 * @param {string} [props.className] - Additional CSS class for the dialog wrapper
 * @param {React.ComponentProps<typeof Button>} [props.btnProps] - Additional props for the trigger button
 * @returns {JSX.Element} A dialog component with a trigger button
 *
 * @example
 * ```jsx
 * <DialogModal
 *   dialogTitle="Confirm Action"
 *   btnLabel="Open Modal"
 *   btnSize="lg"
 *   onClose={() => console.log('Dialog closed')}
 * >
 *   <p>Dialog content goes here</p>
 * </DialogModal>
 * ```
 */

export const DialogModal: React.FC<DialogModalProps> = ({
  isAlertDialog,
  onClose,
  dialogTitle,
  dialogLabel,
  btnLabel = "Open Dialog",
  btnSize = "sm",
  btnOnClick,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className,
  btnProps,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  const handleButtonClick = () => {
    setIsOpen(true);
    btnOnClick?.();
  };

  const dialogBtnProps = {
    type: "button" as "button" | "submit" | "reset",
    onClick: handleButtonClick,
    "data-btn": btnSize,
    ...btnProps,
  };

  return (
    <>
      <Button {...dialogBtnProps}>{btnLabel}</Button>
      <Dialog
        showDialog={isOpen}
        dialogTitle={dialogTitle}
        onClose={handleClose}
        title={dialogTitle}
        dialogLabel={dialogLabel}
        className={className}
        isAlertDialog={isAlertDialog}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      >
        {children}
      </Dialog>
    </>
  );
};
export default DialogModal;
DialogModal.displayName = "DialogModal";
