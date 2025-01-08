import React from "react";
import UI from "#components/ui";
import Button from "#components/buttons/button";

type DialogFooterProps = {
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  confirmLabel: string;
  cancelLabel: string;
};

const DialogFooter: React.FC<DialogFooterProps> = ({
  onClose,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <UI as="section" className="dialog-footer">
      {cancelLabel && (
        <Button
          type="button"
          onClick={onClose}
          className="dialog-button button-secondary"
          data-btn="sm"
        >
          {cancelLabel}
        </Button>
      )}

      {onConfirm && (
        <Button
          type="button"
          onClick={onConfirm}
          className="dialog-button button-primary"
          data-btn="sm"
        >
          {confirmLabel}
        </Button>
      )}
    </UI>
  );
};

export default DialogFooter;
