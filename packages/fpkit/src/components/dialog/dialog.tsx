import React from "react";
import UI from "#components/ui";
import Heading from "#components/heading/heading";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";

export type DialogProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  dialogTitle?: string;
  children: React.ReactNode;
};

const Dialog = ({
  isOpen = true,
  dialogTitle = "Dialog",
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
      }
      isOpen = false;
      dialogRef.current?.close();
    }
  };

  const closeDialog = () => {
    if (onClose) {
      onClose();
    }
    isOpen = false;
    dialogRef.current?.close();
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
      <UI as="div" classes="dialog-header">
        <Heading type="h3">{dialogTitle}</Heading>
        <Button type="button" onClick={closeDialog} data-btn="pill xs">
          <Icon.Remove />
        </Button>
      </UI>
      {children}
    </UI>
  );
};

export default React.memo(Dialog);
Dialog.displayName = "Dialog";
