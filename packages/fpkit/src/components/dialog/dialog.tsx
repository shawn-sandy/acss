import React from "react";
import UI from "#components/ui";

export type DialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
};

const Dialog = ({
  isOpen = true,
  onOpen,
  onClose,
  children,
  ...props
}: DialogProps): JSX.Element => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  if (onClose) {
    onClose();
    dialogRef.current?.close();
  }

  if (onOpen) {
    dialogRef.current?.showModal();
    onOpen();
  }

  return (
    <UI as="dialog" open={isOpen} ref={dialogRef} {...props}>
      {children}
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Dialog";
