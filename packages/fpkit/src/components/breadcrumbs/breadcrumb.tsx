// Code: Breadcrumb component
import React from "react";
import UI from "#components/ui";
import { Truncate } from "#libs/content";
import Link from "#components/link/link";

// TYPES

type customRoute = {
  /** The path or id for routing */
  path?: string;
  /** The display name */
  name: string;
  /** The url if linking out */
  url?: string;
};

type BreadcrumbProps = {
  /** Array of custom route objects */
  routes?: customRoute[];
  /** Starting route node */
  startRoute?: React.ReactNode;
  /* Starting route url */
  startRouteUrl?: string;
  /** Spacer node between routes */
  spacer?: React.ReactNode;
  /** String representing current route */
  currentRoute?: string;
  /** Prefix breadcrumb aria-label - "prefix breadcrumb" */
  ariaLabelPrefix?: string;
  /** Truncate breadcrumb text after this length */
  truncateLength?: number;
  /** Link props for breadcrumb links */
  linkProps?: React.ComponentProps<typeof Link>;
} & React.ComponentProps<typeof UI>;

// Components

/**
 * Items component.
 *
 * @param styles - Styles object for the item.
 * @param id - Id for the item.
 * @param classes - Class names for the item.
 * @param children - Child components.
 * @param props - Other props.
 */
const Items = ({
  styles,
  id,
  classes,
  children,
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
};

/**
 * List component.
 *
 * @param children - The content to render inside the list.
 * @param props - Additional props to pass to the UI component.
 */
const List = ({ children, ...props }: React.ComponentProps<typeof UI>) => {
  return (
    <UI as="ol" data-list="unstyled inline" {...props}>
      {children}
    </UI>
  );
};

/**
 * Nav component.
 *
 * @param styles - Styles object for the nav.
 * @param id - Id for the nav.
 * @param classes - Class names for the nav.
 * @param children - Child components.
 * @param props - Other props.
 */
const Nav = ({
  styles,
  id,
  classes,
  children,
  ...props
}: React.ComponentProps<typeof UI>) => {
  return (
    <UI as="nav" id={id} styles={styles} className={classes} {...props}>
      <List>{children}</List>
    </UI>
  );
};

/**
 * Navigation component for breadcrumbs.
 *
 * @param props - Props for the navigation component.
 * @param props.startRoute - Starting route node. Default 'Home'.
 * @param props.currentRoute - String representing current route.
 * @param props.spacer - Spacer node between routes. Default '&#47;'.
 * @param props.routes - Array of custom route objects.
 * @param props.styles - Styles object for the nav.
 * @param props.id - Id for the nav.
 * @param props.classes - Class names for the nav.
 * @param props.children - Child components.
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
  ariaLabelPrefix,
  truncateLength = 15,
  linkProps,
  ...props
}: BreadcrumbProps): React.JSX.Element => {
  const [currentPath, setCurrentPath] = React.useState("");
  React.useEffect(() => {
    const path = currentRoute || window.location.pathname;
    if (path.length) {
      setCurrentPath(path);
    }
  }, [currentRoute]);

  /**
   * Gets the path name for the given path segment.
   *
   * @param pathSegment - The path segment (string or number) to get the path name for.
   * @returns The path name object for the given path segment.
   */
  const getPathName = (pathSegment: string): customRoute => {
    const route = routes?.find((route) => route.path === pathSegment);

    return {
      path: route?.path || pathSegment,
      name: route?.name || pathSegment,
      url: route?.url || pathSegment,
    };
  };

  /** Array of path segments from current path */
  const segments = currentPath.split("/").filter((segment) => segment);
  /** Index of last item in segments array */
  const lastSegment = segments.length - 1;

  /** Unique id for breadcrumb */
  const uuid = React.useId();

  return currentPath.length ? (
    <Nav
      id={id}
      {...props}
      styles={styles}
      className={classes}
      aria-label={ariaLabelPrefix}
    >
      <Items key={`${startRoute}-${uuid}`}>
        <Link href={startRouteUrl} {...linkProps}>
          {startRoute}
        </Link>
      </Items>
      <>
        {segments.length
          ? segments.map((segment: string, index: number) => {
              const currentSegment = getPathName(segment);
              const { name, url, path } = currentSegment;
              return index === lastSegment ? (
                <>
                  {typeof segments[lastSegment] === "string" &&
                    segments[lastSegment].length > 3 &&
                    segments[lastSegment] !== segments[lastSegment - 1] && (
                      <Items key={`${path || index}-${uuid}`}>
                        <span aria-hidden="true">{spacer}</span>
                        <a
                          href="#"
                          aria-current="page"
                          aria-label={
                            name.length > truncateLength ? name : undefined
                          }
                        >
                          {Truncate(decodeURIComponent(name), truncateLength)}
                        </a>
                      </Items>
                    )}
                </>
              ) : (
                <Items key={`${currentSegment?.name}-${uuid}`}>
                  <span aria-hidden="true">{spacer}</span>
                  <span>
                    <Link
                      href={url}
                      aria-label={
                        name.length > truncateLength ? name : undefined
                      }
                      {...linkProps}
                    >
                      {Truncate(decodeURIComponent(name), truncateLength)}
                    </Link>
                  </span>
                </Items>
              );
            })
          : null}
      </>
    </Nav>
  ) : (
    <></>
  );
};

export default Breadcrumb;

Breadcrumb.displayName = "BreadCrumb";
Breadcrumb.Nav = Nav;
Breadcrumb.List = List;
Breadcrumb.Items = Items;
