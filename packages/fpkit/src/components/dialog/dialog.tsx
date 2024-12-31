import React from "react";
import UI from "#components/ui";

export type DialogProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
};

const Dialog = ({
  isOpen = true,
  onOpen,
  onClose,
  onCancel,
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
        e.currentTarget.close();
      }
    }
  };

  return (
    <UI
      as="dialog"
      open={isOpen}
      ref={dialogRef}
      onCancel={handleCancelEvent}
      onClose={handleCloseEvent}
      {...props}
    >
      {children}
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Dialog";
