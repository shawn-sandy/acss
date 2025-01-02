import React from "react";
import UI from "#components/ui";
import Heading from "#components/heading/heading";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";

export type DialogHeaderProps = {
  dialogTitle: string;
  onClose: () => void;
};

const DialogHeader = ({
  dialogTitle,
  onClose,
}: DialogHeaderProps): JSX.Element => {
  return (
    <UI as="div" classes="dialog-header">
      <Heading type="h3">{dialogTitle}</Heading>
      <Button
        type="button"
        onClick={onClose}
        classes="transparent"
        data-btn="icon pill"
      >
        <Icon.Remove size={16} />
      </Button>
    </UI>
  );
};

export default React.memo(DialogHeader);
DialogHeader.displayName = "DialogHeader";
