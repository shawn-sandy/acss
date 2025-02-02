import React from "react";
import Button from "#components/buttons/button";
import Icon from "#components/icons/icon";
/** Props for the DismissButton component */
type DismissButtonProps = {
  /** Callback function when dismiss button is clicked */
  onDismiss: () => void;
  /** Size of the close icon in pixels. Defaults to 16 */
  iconSize?: number;
};
export const DismissButton = React.memo(
  ({ onDismiss, iconSize = 16 }: DismissButtonProps) => (
    <Button
      type="button"
      onClick={onDismiss}
      aria-label="Close alert"
      className="alert-dismiss"
      data-btn="icon sm"
    >
      <Icon>
        <Icon.Close size={iconSize} />
      </Icon>
    </Button>
  )
);

export default DismissButton;
DismissButton.displayName = "DismissButton";
