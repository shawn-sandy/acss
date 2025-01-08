// Dialog.tsx
import React, { useRef, useEffect } from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";
import DialogHeader from "#components/dialog/views/dialog-header";

type DialogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Optional confirm handler. If provided, shows a confirm button */
  onConfirm?: () => void | Promise<void>;
  /** Optional confirm button text */
  confirmText?: string;
  /** Optional cancel button text */
  cancelText?: string;
  /** Optional className for the dialog content wrapper */
  className?: string;
} & React.ComponentProps<typeof UI>;

export const Dialog: React.FC<DialogModalProps> = ({
  //   isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    handleClose();
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
    <>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        data-btn="sm"
      >
        Open Dialog
      </Button>
      <UI
        as="dialog"
        ref={dialogRef}
        onClose={handleClose}
        onClick={handleClick}
        className="dialog-modal"
      >
        <DialogHeader dialogTitle={title} onClick={handleClose} />

        <UI
          as="section"
          className={`dialog-content ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dialog-body">{children}</div>

          <div className="dialog-footer">
            <Button
              type="button"
              onClick={handleClose}
              className="dialog-button button-secondary"
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                type="button"
                onClick={handleConfirm}
                className="dialog-button button-primary"
              >
                {confirmText}
              </Button>
            )}
          </div>
        </UI>
      </UI>
    </>
  );
};
export default Dialog;
