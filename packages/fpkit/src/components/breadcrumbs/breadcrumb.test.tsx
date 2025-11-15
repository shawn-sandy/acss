import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Breadcrumb, CustomRoute } from "./breadcrumb";

describe("Breadcrumb", () => {
  // ============================================================================
  // CORE FUNCTIONALITY TESTS
  // ============================================================================

  describe("Core Functionality", () => {
    it("renders a navigation element with breadcrumb list", () => {
      render(<Breadcrumb currentRoute="/products/shirts" />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
    });

    it("returns null when currentRoute is undefined", () => {
      const { container } = render(<Breadcrumb currentRoute={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it("returns null when currentRoute is empty string", () => {
      const { container } = render(<Breadcrumb currentRoute="" />);
      expect(container.firstChild).toBeNull();
    });

    it("renders home/start route link correctly", () => {
      render(<Breadcrumb currentRoute="/products" />);
      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("parses path segments correctly from currentRoute", () => {
      render(<Breadcrumb currentRoute="/products/shirts/blue-shirt" />);

      expect(screen.getByText("products")).toBeInTheDocument();
      expect(screen.getByText("shirts")).toBeInTheDocument();
      expect(screen.getByText("blue-shirt")).toBeInTheDocument();
    });

    it("handles paths with leading slashes", () => {
      render(<Breadcrumb currentRoute="/products" />);
      expect(screen.getByText("products")).toBeInTheDocument();
    });

    it("handles paths with trailing slashes", () => {
      render(<Breadcrumb currentRoute="/products/shirts/" />);
      expect(screen.getByText("products")).toBeInTheDocument();
      expect(screen.getByText("shirts")).toBeInTheDocument();
    });

    it("handles encoded URI components correctly", () => {
      render(<Breadcrumb currentRoute="/products/learning%20in%20public" />);

      expect(screen.getByText("products")).toBeInTheDocument();

      // Text is truncated, so use aria-label to verify full decoded text
      const element = screen.getByText(/learning in pub/);
      expect(element).toHaveAttribute("aria-label", "learning in public");
    });
  });

  // ============================================================================
  // CUSTOM ROUTES TESTS
  // ============================================================================

  describe("Custom Routes", () => {
    const customRoutes: CustomRoute[] = [
      {
        path: "products",
        name: "All Products",
        url: "/products",
      },
      {
        path: "shirts",
        name: "Shirts & Tops",
        url: "/products/shirts",
      },
    ];

    it("maps path segments to custom route names", () => {
      render(
        <Breadcrumb
          currentRoute="/products/shirts"
          routes={customRoutes}
        />
      );

      expect(screen.getByText("All Products")).toBeInTheDocument();
      expect(screen.getByText("Shirts & Tops")).toBeInTheDocument();
    });

    it("uses custom URLs when provided", () => {
      render(
        <Breadcrumb
          currentRoute="/products/shirts"
          routes={customRoutes}
        />
      );

      const productsLink = screen.getByRole("link", { name: "All Products" });
      expect(productsLink).toHaveAttribute("href", "/products");

      const shirtsSpan = screen.getByText("Shirts & Tops");
      expect(shirtsSpan).toBeInTheDocument();
    });

    it("falls back to path segment when no custom route found", () => {
      render(
        <Breadcrumb
          currentRoute="/products/pants"
          routes={customRoutes}
        />
      );

      expect(screen.getByText("All Products")).toBeInTheDocument();
      expect(screen.getByText("pants")).toBeInTheDocument(); // No custom route
    });

    it("handles partial custom route mappings", () => {
      const partialRoutes: CustomRoute[] = [
        {
          path: "products",
          name: "Products",
          url: "/products",
        },
      ];

      render(
        <Breadcrumb
          currentRoute="/products/shirts/item-123"
          routes={partialRoutes}
        />
      );

      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("shirts")).toBeInTheDocument();
      expect(screen.getByText("item-123")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("renders semantic nav element with proper aria-label", () => {
      render(
        <Breadcrumb
          currentRoute="/products"
          ariaLabel="Page navigation"
        />
      );

      const nav = screen.getByRole("navigation", { name: "Page navigation" });
      expect(nav).toBeInTheDocument();
    });

    it("uses default aria-label of 'Breadcrumb' when not provided", () => {
      render(<Breadcrumb currentRoute="/products" />);

      const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
      expect(nav).toBeInTheDocument();
    });

    it("uses ordered list (ol) for breadcrumb list", () => {
      render(<Breadcrumb currentRoute="/products/shirts" />);

      const nav = screen.getByRole("navigation");
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
    });

    it("marks last segment with aria-current='page'", () => {
      render(<Breadcrumb currentRoute="/products/shirts" />);

      const currentPage = screen.getByText("shirts");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("hides spacers from screen readers with aria-hidden", () => {
      render(<Breadcrumb currentRoute="/products/shirts" />);

      const nav = screen.getByRole("navigation");
      const spacers = nav.querySelectorAll('[aria-hidden="true"]');

      // Should have at least 2 spacers (one for each segment)
      expect(spacers.length).toBeGreaterThan(0);
    });

    it("does not render anchor tags with href='#'", () => {
      render(<Breadcrumb currentRoute="/products/shirts" />);

      const nav = screen.getByRole("navigation");
      const invalidLinks = nav.querySelectorAll('a[href="#"]');

      expect(invalidLinks.length).toBe(0);
    });

    it("provides full text in aria-label when truncated", () => {
      const longName = "this-is-a-very-long-product-name";
      render(
        <Breadcrumb
          currentRoute={`/products/${longName}`}
          truncateLength={10}
        />
      );

      const truncatedElement = screen.getByText(/this-is-a-/);
      expect(truncatedElement).toHaveAttribute("aria-label", longName);
    });

    it("does not add aria-label when text is not truncated", () => {
      render(
        <Breadcrumb
          currentRoute="/products/shirt"
          truncateLength={20}
        />
      );

      const element = screen.getByText("shirt");
      expect(element).not.toHaveAttribute("aria-label");
    });
  });

  // ============================================================================
  // TRUNCATION TESTS
  // ============================================================================

  describe("Text Truncation", () => {
    it("truncates text beyond default truncateLength (15)", () => {
      const longName = "verylongproductname";
      render(<Breadcrumb currentRoute={`/products/${longName}`} />);

      // Should be truncated to 15 chars + "..."
      expect(screen.getByText("verylongproduct...")).toBeInTheDocument();
    });

    it("respects custom truncateLength prop", () => {
      const longName = "verylongname";
      render(
        <Breadcrumb
          currentRoute={`/products/${longName}`}
          truncateLength={5}
        />
      );

      expect(screen.getByText("veryl...")).toBeInTheDocument();
    });

    it("does not truncate text shorter than truncateLength", () => {
      render(
        <Breadcrumb
          currentRoute="/products/shirt"
          truncateLength={15}
        />
      );

      expect(screen.getByText("shirt")).toBeInTheDocument();
    });

    it("truncates both intermediate and current page segments", () => {
      render(
        <Breadcrumb
          currentRoute="/verylongfirstsegment/verylongsecondsegment"
          truncateLength={10}
        />
      );

      expect(screen.getByText("verylongfi...")).toBeInTheDocument();
      expect(screen.getByText("verylongse...")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("skips last segment if length <= 3 characters", () => {
      render(<Breadcrumb currentRoute="/products/shirts/abc" />);

      // "abc" should be skipped (last segment with length 3)
      expect(screen.queryByText("abc")).not.toBeInTheDocument();
      expect(screen.getByText("products")).toBeInTheDocument();
      expect(screen.getByText("shirts")).toBeInTheDocument();
    });

    it("skips duplicate consecutive segments", () => {
      const { container } = render(
        <Breadcrumb currentRoute="/products/products" />
      );

      const nav = container.querySelector("nav");
      const productLinks = nav?.querySelectorAll('a[href="products"]');

      // Should only have one "products" link (first occurrence)
      expect(productLinks?.length).toBeLessThanOrEqual(1);
    });

    it("handles single segment path", () => {
      render(<Breadcrumb currentRoute="/about" />);

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByText("about")).toBeInTheDocument();
    });

    it("handles deep nesting (many segments)", () => {
      render(
        <Breadcrumb currentRoute="/level1/level2/level3/level4/level5" />
      );

      expect(screen.getByText("level1")).toBeInTheDocument();
      expect(screen.getByText("level2")).toBeInTheDocument();
      expect(screen.getByText("level3")).toBeInTheDocument();
      expect(screen.getByText("level4")).toBeInTheDocument();
      expect(screen.getByText("level5")).toBeInTheDocument();
    });

    it("handles special characters in segments", () => {
      render(<Breadcrumb currentRoute="/products/t-shirts/blue" />);

      expect(screen.getByText("t-shirts")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================

  describe("Props Integration", () => {
    it("spreads linkProps to Link components", () => {
      const handleClick = vi.fn();

      render(
        <Breadcrumb
          currentRoute="/products/shirts"
          linkProps={{
            onClick: handleClick,
          }}
        />
      );

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);

      // Click first link
      links[0].click();
      expect(handleClick).toHaveBeenCalled();
    });

    it("uses custom startRoute and startRouteUrl", () => {
      render(
        <Breadcrumb
          currentRoute="/products"
          startRoute="Dashboard"
          startRouteUrl="/dashboard"
        />
      );

      const startLink = screen.getByRole("link", { name: "Dashboard" });
      expect(startLink).toBeInTheDocument();
      expect(startLink).toHaveAttribute("href", "/dashboard");
    });

    it("renders custom spacer element", () => {
      render(
        <Breadcrumb
          currentRoute="/products/shirts"
          spacer={<span data-testid="custom-spacer">→</span>}
        />
      );

      const spacers = screen.getAllByTestId("custom-spacer");
      expect(spacers.length).toBeGreaterThan(0);
      expect(spacers[0]).toHaveTextContent("→");
    });

    it("applies custom id to nav element", () => {
      render(
        <Breadcrumb
          currentRoute="/products"
          id="custom-breadcrumb"
        />
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("id", "custom-breadcrumb");
    });

    it("applies custom className via classes prop", () => {
      render(
        <Breadcrumb
          currentRoute="/products"
          classes="custom-breadcrumb-class"
        />
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("custom-breadcrumb-class");
    });

    it("applies custom inline styles", () => {
      render(
        <Breadcrumb
          currentRoute="/products"
          styles={{ padding: "1rem", backgroundColor: "lightgray" }}
        />
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveStyle({ padding: "1rem" });
    });
  });

  // ============================================================================
  // SUB-COMPONENT EXPORTS TESTS
  // ============================================================================

  describe("Sub-component Exports", () => {
    it("exports Nav sub-component", () => {
      expect(Breadcrumb.Nav).toBeDefined();
    });

    it("exports List sub-component", () => {
      expect(Breadcrumb.List).toBeDefined();
    });

    it("exports Item sub-component", () => {
      expect(Breadcrumb.Item).toBeDefined();
    });

    it("allows custom composition with sub-components", () => {
      render(
        <Breadcrumb.Nav aria-label="Custom breadcrumb">
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Current Page</span>
          </Breadcrumb.Item>
        </Breadcrumb.Nav>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // SNAPSHOT TESTS
  // ============================================================================

  describe("Snapshot Tests", () => {
    it("matches snapshot for simple breadcrumb", () => {
      const { container } = render(
        <Breadcrumb currentRoute="/products/shirts" />
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with custom routes", () => {
      const routes: CustomRoute[] = [
        { path: "products", name: "All Products", url: "/products" },
      ];

      const { container } = render(
        <Breadcrumb currentRoute="/products/shirts" routes={routes} />
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with truncation", () => {
      const { container } = render(
        <Breadcrumb
          currentRoute="/products/verylongproductname"
          truncateLength={10}
        />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
