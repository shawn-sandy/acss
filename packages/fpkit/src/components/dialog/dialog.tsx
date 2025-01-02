import React, { useRef, useEffect } from "react";
import UI from "#components/ui";

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const Dialog = ({
  isOpen,
  onClose,
  children,
  ...props
}: ModalProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose?.();
    dialogRef.current?.close();
  };

  return (
    <UI as="dialog" ref={dialogRef} {...props} onClose={onClose}>
      {children}
      <button onClick={handleClose}>Close</button>
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Modal";
