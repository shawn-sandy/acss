// Dialog.tsx
import React, { useRef, useEffect } from "react";

interface DialogModalProps {
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
}

export const DialogModal: React.FC<DialogModalProps> = ({
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
    onClose();
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
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Dialog
      </button>
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onClick={handleClick}
        className="dialog-modal"
      >
        <div
          className={`dialog-content ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button
              type="button"
              onClick={handleClose}
              className="dialog-close"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          <div className="dialog-body">{children}</div>

          <div className="dialog-footer">
            <button
              type="button"
              onClick={handleClose}
              className="dialog-button button-secondary"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                type="button"
                onClick={handleConfirm}
                className="dialog-button button-primary"
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default DialogModal;
