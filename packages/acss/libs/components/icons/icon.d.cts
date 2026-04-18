import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _fpkit_icons from '@fpkit/icons';
import { Star } from '@fpkit/icons';
import { U as UI } from '../../ui-40a4a170.js';
import React from 'react';

type IconProps = React.ComponentProps<typeof UI> & {
    /**
     * Controls screen reader visibility.
     * - `true` (default): Hides icon from screen readers (decorative icon)
     * - `false`: Makes icon visible to screen readers (semantic icon)
     *
     * **When to use decorative (aria-hidden="true", default):**
     * - Icon accompanies visible text (e.g., button with icon + label)
     * - Icon is purely visual decoration
     *
     * **When to use semantic (aria-hidden="false"):**
     * - Icon is the only content (e.g., icon-only button)
     * - Must provide `aria-label` or `aria-labelledby` for accessible name
     *
     * @default true
     * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
     */
    "aria-hidden"?: boolean;
    /**
     * Accessible label for semantic icons.
     * Required when icon is standalone (not accompanied by visible text).
     *
     * @example
     * ```tsx
     * // ✅ GOOD: Icon-only button with accessible name
     * <button>
     *   <Icon aria-hidden={false} aria-label="Close dialog">
     *     <Icon.Remove />
     *   </Icon>
     * </button>
     *
     * // ✅ GOOD: Icon with visible text (default decorative)
     * <button>
     *   <Icon><Icon.Add /></Icon>
     *   Add Item
     * </button>
     * ```
     */
    "aria-label"?: string;
    /**
     * Semantic role override.
     * Use `role="img"` when icon conveys meaning and is not decorative.
     *
     * @default undefined (no role for decorative icons)
     */
    role?: string;
};
/**
 * Icon wrapper component that enforces accessibility best practices.
 *
 * **Default behavior (decorative icon):**
 * - Hidden from screen readers (`aria-hidden="true"`)
 * - Used when icon accompanies visible text
 *
 * **Semantic icon pattern:**
 * - Set `aria-hidden={false}` to expose to screen readers
 * - Must provide `aria-label` for accessible name
 * - Consider `role="img"` for complex SVG icons
 *
 * @param {IconProps} props - Component props
 * @returns {React.ReactElement} Accessible icon wrapper
 *
 * @example
 * // ✅ Decorative icon with text (default)
 * <button>
 *   <Icon><Icon.Save /></Icon>
 *   Save Changes
 * </button>
 *
 * @example
 * // ✅ Semantic icon-only button
 * <button aria-label="Close dialog">
 *   <Icon aria-hidden={false}>
 *     <Icon.Remove />
 *   </Icon>
 * </button>
 *
 * @example
 * // ❌ BAD: Icon-only button without accessible name
 * <button>
 *   <Icon><Icon.Remove /></Icon>
 * </button>
 */
declare const Icon: {
    ({ id, classes, children, styles, "aria-hidden": ariaHidden, "aria-label": ariaLabel, role, ...props }: IconProps): React.JSX.Element;
    displayName: string;
    Add: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        styles: {
            fill: string;
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowDown: {
        ({ fill, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size">): react_jsx_runtime.JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowLeft: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    ArrowRight: {
        ({ size, fill, strokeColor, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
    };
    ArrowUp: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Chat: {
        ({ size, strokeColor, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    Code: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }?: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor"> | undefined): react_jsx_runtime.JSX.Element;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Copy: {
        ({ size, strokeColor, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
        styles: {
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Down: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Home: {
        ({ strokeColor, fill, size, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Info: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    InfoSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    AlertSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    Left: {
        ({ fill, size, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Minus: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Pause: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    PauseSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Play: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    PlaySolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Remove: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Resume: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    ResumeSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Right: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
    Star: typeof Star;
    Stop: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    StopSolid: {
        ({ strokeColor, styles, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        style: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
    };
    Up: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            display: string;
            alignItems: string;
            width: string;
        };
    };
    User: {
        ({ size, fill, strokeColor, styles, alt, role, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        styles: {
            fill: string;
            stroke: string;
            display: string;
            alignItems: string;
            width: string;
        };
        displayName: string;
    };
    styles: {
        display: string;
        direction: string;
        gap: string;
        placeItems: string;
        width: string;
    };
    QuestionSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    WarnSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    SuccessSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    AlertSquareSolid: {
        ({ fill, size, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): JSX.Element;
        displayName: string;
    };
    Close: {
        ({ size, fill, styles, role, alt, ...props }: Pick<_fpkit_icons.IconProps, "styles" | "role" | "fill" | "alt" | "size" | "strokeColor">): react_jsx_runtime.JSX.Element;
        displayName: string;
        styles: {
            fill: string;
        };
    };
};

export { Icon, IconProps, Icon as default };
