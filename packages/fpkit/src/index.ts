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
export { Field, type FieldProps } from "./components/form/fields";
export { Input, type InputProps } from "./components/form/inputs";
export { Icon, type IconProps } from "./components/icons/icon";
export { Img, type ImageProps } from "./components/images/img";
export { Link, type LinkProps } from "./components/link/link";
export { List, type ListItemProps } from "./components/list/list";
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
export * from "./components/heading/heading";

// Form components
export * from "./components/form/textarea";

// UI elements
export * from "./components/tag/tag";
export * from "./components/tables/table-elements";
export * from "./components/details/details";
export * from "./components/breadcrumbs/breadcrumb";

// Default exports for backward compatibility
export { default as To } from "./components/link/link";
export { default as FP } from "./components/fp";
export { default as Box } from "./components/fp";

// Core UI utility components
export * from "./components/ui";

// Types
export type { ComponentProps } from "./types";
