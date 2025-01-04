import React from "react";
import Dialog from "#components/dialog/dialog";

export type DialogModalProps = {
  children: React.ReactNode;
};

const DialogModal = ({ children, ...props }: DialogModalProps) => {
  return <Dialog {...props}>{children}</Dialog>;
};

export default DialogModal;
DialogModal.displayName = "DialogModal";
