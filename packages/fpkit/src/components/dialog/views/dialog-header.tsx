import React from "react";
import UI from "#components/ui";
import Heading from "#components/heading/heading";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";

export type DialogHeaderProps = {
  dialogTitle: string;
  onClick: () => void;
} & React.ComponentProps<typeof Heading>;

const DialogHeader = ({
  dialogTitle,
  onClick,
  type = "h3",
}: DialogHeaderProps): JSX.Element => {
  const handleClose = () => {
    onClick();
  };
  return (
    <UI as="div" classes="dialog-header">
      <Heading type={type} className="dialog-title">
        {dialogTitle ?? "Dialog"}
      </Heading>
      <Button
        type="button"
        onClick={handleClose}
        className="dialog-close"
        aria-label="Close dialog"
        data-btn="icon"
      >
        <Icon>
          <Icon.Remove size={16} />
        </Icon>
      </Button>
    </UI>
  );
};

export default React.memo(DialogHeader);
DialogHeader.displayName = "DialogHeader";
