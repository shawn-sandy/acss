import React from "react";
import Title from "#components/title/title";

/**
 * @deprecated Use `Title` component instead. This component will be removed in v3.0.0.
 *
 * @remarks
 * The `Heading` component has been deprecated in favor of the new `Title` component
 * which offers improved API design and better accessibility features.
 *
 * **Migration Guide:**
 * - Rename `Heading` → `Title`
 * - Rename prop `type` → `level`
 * - Default level changed from `h3` → `h2` (update if you relied on the default)
 *
 * @example
 * // Before (deprecated):
 * <Heading type="h2">Section Title</Heading>
 *
 * // After:
 * <Title level="h2">Section Title</Title>
 *
 * @see {@link Title} for the new component
 */
export type TitleProps = {
  /**
   * @deprecated Use `level` prop on the `Title` component instead.
   */
  children: React.ReactNode;

  /**
   * @deprecated Use `level` prop on the `Title` component instead.
   */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * @deprecated Use `ui` prop on the `Title` component.
   */
  ui?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Title>, 'level'>;

/**
 * Heading - Deprecated component wrapper for Title.
 *
 * @deprecated Use {@link Title} component instead. Will be removed in v3.0.0.
 *
 * This component provides backwards compatibility for existing code using
 * the old `Heading` component API. It forwards all props to the new `Title`
 * component with appropriate prop name mapping.
 *
 * **Breaking Changes in v3.0.0:**
 * - This component will be removed
 * - Migrate to `Title` component before upgrading
 *
 * **Migration Steps:**
 * 1. Replace all `<Heading>` imports with `<Title>`
 * 2. Rename `type` prop to `level`
 * 3. Review default behavior (default changed from h3 to h2)
 *
 * @example
 * // Old API (still works but deprecated):
 * import { Heading } from '@fpkit/acss';
 * <Heading type="h2">Section</Heading>
 *
 * @example
 * // New API (recommended):
 * import { Title } from '@fpkit/acss';
 * <Title level="h2">Section</Title>
 *
 * @param {TitleProps} props - Component props (maps old API to new)
 * @returns {React.ReactElement} The rendered Title component
 */
const Heading = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ type = "h3", ...props }, ref) => {
    // Development warning for deprecated usage
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn(
        `[@fpkit/acss] Heading component is deprecated and will be removed in v3.0.0. ` +
        `Please use the Title component instead.\n` +
        `Migration: <Heading type="${type}"> → <Title level="${type}">\n` +
        `See documentation: https://fpkit.dev/components/title`
      );
    }

    // Map old 'type' prop to new 'level' prop
    return <Title level={type} ref={ref} {...props} />;
  }
);

Heading.displayName = "Heading (Deprecated)";

export default Heading;
