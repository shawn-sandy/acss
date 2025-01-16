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
}

/**
 * A React component that renders a modal dialog with a button to open it.
 * The dialog can be configured with various props, such as the dialog title, label, and button label.
 * The component also handles the state of the dialog being open or closed.
 */
export const DialogModal: React.FC<DialogModalProps> = ({
  isAlertDialog,
  onClose,
  dialogTitle,
  dialogLabel,
  btnLabel = "Open Dialog",
  btnSize = "md",
  btnOnClick,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  className,
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

  return (
    <>
      <Button type="button" onClick={handleButtonClick} data-btn={btnSize}>
        {btnLabel}
      </Button>
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
DialogModal.displayName = "Dialog Modal";
