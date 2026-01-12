import React from "react";
import UI from "#components/ui";
import { IconProps } from "#components/icons/types";
import DismissButton from "../elements/dismiss-button";
import {
  AlertScreenReaderText,
  AlertIcon,
  AlertTitle,
  AlertContent,
  AlertActions,
} from ".";

/**
 * Valid severity levels for alerts.
 */
type Severity = "default" | "info" | "success" | "warning" | "error";

/**
 * Maps severity levels to ARIA live region types.
 */
const SEVERITY_ARIA_LIVE: Record<Severity, "polite" | "assertive"> = {
  default: "polite",
  info: "polite",
  success: "polite",
  warning: "polite",
  error: "assertive",
} as const;

/**
 * Props for the AlertView presentation component.
 */
export type AlertViewProps = {
  /**
   * The severity level of the alert.
   */
  severity: Severity;
  /**
   * Visual variant of the alert.
   */
  variant: "outlined" | "filled" | "soft";
  /**
   * Whether the alert is currently visible (for animations).
   */
  isVisible: boolean;
  /**
   * Whether the alert can be dismissed.
   */
  dismissible: boolean;
  /**
   * Callback when dismiss button is clicked.
   */
  onDismiss: () => void;
  /**
   * Handler for interaction start (hover/focus).
   */
  onInteractionStart: () => void;
  /**
   * Handler for interaction end (leave/blur).
   */
  onInteractionEnd: () => void;
  /**
   * Whether to automatically focus the alert.
   */
  autoFocus: boolean;
  /**
   * Optional title for the alert.
   */
  title?: string;
  /**
   * Semantic heading level for the title (2-6).
   */
  titleLevel: 2 | 3 | 4 | 5 | 6;
  /**
   * The main message content.
   */
  children: React.ReactNode;
  /**
   * Content rendering mode for alert children.
   */
  contentType: "text" | "node";
  /**
   * Custom action buttons to display in the alert.
   */
  actions?: React.ReactNode;
  /**
   * Whether to hide the severity icon.
   */
  hideIcon?: boolean;
  /**
   * Merged props for the Icon component.
   */
  iconProps: IconProps;
} & React.ComponentProps<typeof UI>;

/**
 * AlertView is a pure presentation component that renders the Alert UI structure.
 * It receives all presentation props and behavior handlers from the parent Alert component.
 *
 * This component is focused solely on rendering the visual structure and does not contain
 * any business logic or state management. All behavior is delegated to the parent.
 *
 * @param props - AlertView props including severity, variant, handlers, and content
 * @returns The rendered alert UI structure
 */
export const AlertView = React.forwardRef<HTMLDivElement, AlertViewProps>(
  (
    {
      severity,
      variant,
      isVisible,
      dismissible,
      onDismiss,
      onInteractionStart,
      onInteractionEnd,
      autoFocus,
      title,
      titleLevel,
      children,
      contentType,
      actions,
      hideIcon,
      iconProps,
      ...props
    },
    ref
  ) => {
    return (
      <UI
        as="div"
        ref={ref}
        role="alert"
        aria-live={SEVERITY_ARIA_LIVE[severity]}
        aria-atomic="true"
        className={`alert alert-${severity}`}
        data-alert={severity}
        data-visible={isVisible}
        data-variant={variant}
        tabIndex={autoFocus ? -1 : undefined}
        onMouseEnter={onInteractionStart}
        onMouseLeave={onInteractionEnd}
        onFocus={onInteractionStart}
        onBlur={onInteractionEnd}
        {...props}
      >
        <AlertScreenReaderText severity={severity} />
        <AlertIcon
          severity={severity}
          iconProps={iconProps}
          hideIcon={hideIcon}
        />
        <UI as="div" classes="alert-message">
          <AlertTitle title={title} titleLevel={titleLevel} />
          <AlertContent contentType={contentType}>{children}</AlertContent>
          <AlertActions actions={actions} />
        </UI>
        {dismissible && <DismissButton onDismiss={onDismiss} />}
      </UI>
    );
  }
);

AlertView.displayName = "AlertView";
