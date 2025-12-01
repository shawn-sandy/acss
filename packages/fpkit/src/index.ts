/**
 * @fileoverview Main entry point for @fpkit/acss component library
 * @description Exports all components, types, and utilities
 */

// import { TextToSpeech } from "./components/text-to-speech/TextToSpeech";
// import { Popover } from './hooks/popover/popover'
// export { Textarea } from './components/form/textarea';
// export { ModalDialog as Dialog } from "./components/modal/dialog";

// Core UI components
export { Button, type ButtonProps } from "./components/buttons/button";
export {
  Card,
  Title as CardTitle,
  Content as CardContent,
  Footer as CardFooter,
  type CardProps,
} from "./components/cards/card";
export { Alert, type AlertProps } from "./components/alert/alert";
export { Field, type FieldProps } from "./components/form/fields";
export { Input, type InputProps } from "./components/form/inputs";
export { Icon, type IconProps } from "./components/icons/icon";
export { Img } from "./components/images/img";
export type { ImgProps } from "./components/images/img.types";
export { default as Link } from "./components/link/link";
export type { LinkProps } from "./components/link/link.types";
export { default as List, type ListProps, type ListItemProps } from "./components/list/list";
export { Modal, type ModalProps } from "./components/modal/modal";
export { Popover, type PopoverProps } from "./components/popover/popover";
export { RenderTable as TBL, type TableProps } from "./components/tables/table";
export { Dialog } from "./components/dialog/dialog";
export { TextToSpeech } from "./components/text-to-speech/TextToSpeech";

// Layout components
export * from "./components/layout/landmarks";

// Navigation components
export * from "./components/nav/nav";

// Typography components
export * from "./components/text/text";

// Title component (primary export)
export {
  default as Title,
  type TitleProps,
  type HeadingLevel,
} from "./components/title/title";

// Heading component (deprecated - use Title instead)
/** @deprecated Use Title component instead. Will be removed in v3.0.0 */
export { default as Heading } from "./components/heading/heading";

// Form components
export * from "./components/form/textarea";

// UI elements
export { Badge, type BadgeProps } from "./components/badge/badge";
export * from "./components/tag/tag";
export * from "./components/tables/table-elements";
export * from "./components/details/details";
export * from "./components/breadcrumbs/breadcrumb";

// Default exports for backward compatibility
export { default as To } from "./components/link/link";
export { default as FP } from "./components/fp";
export { default as Box } from "./components/fp";
export { default as UI } from "./components/ui";

// Core UI utility components
export * from "./components/ui";

// Types
export type { ComponentProps } from "./types";
