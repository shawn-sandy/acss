// Dialog.tsx
import React from "react";
import Dialog from "./dialog";
import Button from "#components/buttons/button.jsx";

interface DialogModalProps extends React.ComponentProps<typeof Dialog> {
  /** Optional className for the dialog content wrapper */
  className?: string;
  btnLabel?: string;
  btnOnClick?: () => void;
  btnSize?: "sm" | "md" | "lg";
}

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
export default React.memo(DialogModal);
DialogModal.displayName = "Dialog Modal";
