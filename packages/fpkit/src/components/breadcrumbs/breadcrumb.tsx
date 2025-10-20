// Code: Breadcrumb component
import React from "react";
import UI from "#components/ui";
import { Truncate } from "#libs/content";
import Link from "#components/link/link";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Represents a route segment in the breadcrumb navigation.
 *
 * @remarks
 * Each route can customize its display name and URL independently from its path.
 * This allows for URL aliasing and custom route naming.
 *
 * @example
 * ```tsx
 * const route: CustomRoute = {
 *   path: "prod",
 *   name: "Products",
 *   url: "/products"
 * };
 * ```
 */
export type CustomRoute = {
  /** The path segment as it appears in the URL */
  path?: string;
  /** The display name shown to users */
  name: string;
  /** The URL for navigation (defaults to path if not provided) */
  url?: string;
};

/**
 * Props for the Breadcrumb component.
 *
 * @remarks
 * The component can operate in two modes:
 * 1. Automatic mode: Derives path from `currentRoute` prop
 * 2. Controlled mode: Uses provided `routes` array for complete control over route naming
 *
 * @example
 * ```tsx
 * // Simple automatic mode
 * <Breadcrumb currentRoute="/products/shirts" />
 *
 * // Controlled mode with custom route names
 * <Breadcrumb
 *   currentRoute="/prod/shirts"
 *   routes={[
 *     { path: "prod", name: "Products", url: "/products" },
 *     { path: "shirts", name: "All Shirts", url: "/products/shirts" }
 *   ]}
 * />
 * ```
 */
export type BreadcrumbProps = {
  /** Array of custom route objects for controlled breadcrumb generation */
  routes?: CustomRoute[];
  /** Starting route node (typically "Home") */
  startRoute?: React.ReactNode;
  /** Starting route URL (typically "/") */
  startRouteUrl?: string;
  /** Separator element between breadcrumb items */
  spacer?: React.ReactNode;
  /** Current route path (required for breadcrumb generation) */
  currentRoute?: string;
  /** ARIA label for the breadcrumb navigation */
  ariaLabel?: string;
  /** Maximum character length before truncating breadcrumb text */
  truncateLength?: number;
  /** Props to spread onto breadcrumb Link components */
  linkProps?: Omit<React.ComponentProps<typeof Link>, "href" | "children">;
} & Omit<React.ComponentProps<typeof UI>, "as" | "aria-label">;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * BreadcrumbItem - Individual list item wrapper for breadcrumb segments.
 *
 * @remarks
 * This is a presentational component that wraps each breadcrumb segment.
 * Memoized to prevent unnecessary re-renders when parent updates.
 */
const BreadcrumbItem = React.memo(
  ({
    children,
    id,
    styles,
    classes,
    ...props
  }: React.ComponentProps<typeof UI>) => {
    return (
      <li
        id={id}
        style={styles}
        className={classes}
        data-list="unstyled inline"
        {...props}
      >
        {children}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * BreadcrumbList - Ordered list container for breadcrumb items.
 *
 * @remarks
 * Uses semantic `<ol>` element as recommended by WCAG for breadcrumb navigation.
 * Memoized to prevent unnecessary re-renders.
 */
const BreadcrumbList = React.memo(
  ({ children, ...props }: React.ComponentProps<typeof UI>) => {
    return (
      <UI as="ol" data-list="unstyled inline" {...props}>
        {children}
      </UI>
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * BreadcrumbNav - Navigation wrapper for breadcrumb structure.
 *
 * @remarks
 * Provides semantic `<nav>` element with proper ARIA labeling for screen readers.
 * Automatically wraps children in BreadcrumbList.
 */
const BreadcrumbNav = React.memo(
  ({
    styles,
    id,
    classes,
    children,
    ...props
  }: React.ComponentProps<typeof UI>) => {
    return (
      <UI as="nav" id={id} styles={styles} className={classes} {...props}>
        <BreadcrumbList>{children}</BreadcrumbList>
      </UI>
    );
  }
);
BreadcrumbNav.displayName = "BreadcrumbNav";

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Custom hook to process breadcrumb segments from a path string.
 *
 * @param currentRoute - The current route path to process
 * @param routes - Optional custom route mappings
 * @returns Processed breadcrumb segments with metadata
 *
 * @remarks
 * This hook encapsulates the business logic for:
 * - Path parsing and segmentation
 * - Route name resolution from custom routes
 * - URL construction for each segment
 *
 * Memoized to prevent unnecessary recalculations on each render.
 */
function useBreadcrumbSegments(
  currentRoute: string | undefined,
  routes?: CustomRoute[]
) {
  const segments = React.useMemo(() => {
    if (!currentRoute) return [];
    return currentRoute.split("/").filter((segment) => segment);
  }, [currentRoute]);

  const getRouteMetadata = React.useCallback(
    (pathSegment: string): CustomRoute => {
      const route = routes?.find((r) => r.path === pathSegment);

      return {
        path: route?.path || pathSegment,
        name: route?.name || pathSegment,
        url: route?.url || pathSegment,
      };
    },
    [routes]
  );

  const processedSegments = React.useMemo(() => {
    return segments.map((segment, index) => ({
      ...getRouteMetadata(segment),
      isLast: index === segments.length - 1,
      index,
    }));
  }, [segments, getRouteMetadata]);

  return {
    segments: processedSegments,
    hasSegments: processedSegments.length > 0,
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Breadcrumb - Navigation component displaying hierarchical page location.
 *
 * @remarks
 * A WCAG 2.1 AA compliant breadcrumb navigation component that helps users
 * understand their current location within a site hierarchy and navigate back
 * to parent pages.
 *
 * ## Features
 * - Automatic path parsing from `currentRoute` prop
 * - Custom route naming via `routes` array
 * - Text truncation for long route names
 * - Full accessibility support with ARIA attributes
 * - Performance optimized with memoization
 *
 * ## Accessibility
 * - Uses semantic `<nav>` and `<ol>` elements
 * - Proper `aria-label` for screen reader context
 * - Current page marked with `aria-current="page"`
 * - Decorative separators hidden from screen readers with `aria-hidden="true"`
 * - Truncated text includes full text in `aria-label`
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Breadcrumb currentRoute="/products/shirts/blue-shirt" />
 * // Renders: Home / products / shirts / blue-shirt
 *
 * // With custom route names
 * <Breadcrumb
 *   currentRoute="/products/shirts/item-123"
 *   routes={[
 *     { path: "products", name: "All Products", url: "/products" },
 *     { path: "shirts", name: "Shirts & Tops", url: "/products/shirts" },
 *     { path: "item-123", name: "Blue Cotton Shirt", url: "/products/shirts/item-123" }
 *   ]}
 * />
 * // Renders: Home / All Products / Shirts & Tops / Blue Cotton Shirt
 *
 * // With custom starting point and styling
 * <Breadcrumb
 *   currentRoute="/about/team"
 *   startRoute="Dashboard"
 *   startRouteUrl="/dashboard"
 *   spacer={<span> → </span>}
 *   ariaLabel="Page navigation"
 *   truncateLength={20}
 * />
 * ```
 *
 * @param props - Component props
 * @returns Breadcrumb navigation element or null if no valid route
 */
export const Breadcrumb = ({
  startRoute = "Home",
  startRouteUrl = "/",
  currentRoute,
  spacer = <>&#47;</>,
  routes,
  styles,
  id,
  classes,
  ariaLabel = "Breadcrumb",
  truncateLength = 15,
  linkProps,
  ...props
}: BreadcrumbProps): React.JSX.Element | null => {
  const { segments, hasSegments } = useBreadcrumbSegments(currentRoute, routes);
  const uuid = React.useId();

  // Early return if no valid path
  if (!currentRoute?.length || !hasSegments) {
    return null;
  }

  return (
    <BreadcrumbNav
      id={id}
      styles={styles}
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Home/Start Route */}
      <BreadcrumbItem key={`start-${uuid}`}>
        <Link href={startRouteUrl} {...linkProps}>
          {startRoute}
        </Link>
      </BreadcrumbItem>

      {/* Path Segments */}
      {segments.map(({ name, url, path, isLast, index }) => {
        const decodedName = decodeURIComponent(name);
        const truncatedName = Truncate(decodedName, truncateLength);
        const needsAriaLabel = decodedName.length > truncateLength;

        // Current page (last segment)
        if (isLast) {
          // Skip if segment is too short or duplicate of previous
          const previousPath = index > 0 ? segments[index - 1].path : null;
          if (!path || path.length <= 3 || path === previousPath) {
            return null;
          }

          return (
            <BreadcrumbItem key={`${path}-${uuid}`}>
              <span aria-hidden="true">{spacer}</span>
              <span
                aria-current="page"
                aria-label={needsAriaLabel ? decodedName : undefined}
              >
                {truncatedName}
              </span>
            </BreadcrumbItem>
          );
        }

        // Intermediate segments (links)
        return (
          <BreadcrumbItem key={`${path}-${uuid}`}>
            <span aria-hidden="true">{spacer}</span>
            <Link
              href={url}
              aria-label={needsAriaLabel ? decodedName : undefined}
              {...linkProps}
            >
              {truncatedName}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </BreadcrumbNav>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default Breadcrumb;

Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.Nav = BreadcrumbNav;
Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
