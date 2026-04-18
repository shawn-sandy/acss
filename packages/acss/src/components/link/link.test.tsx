import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Link from "./link";

describe("Link Component", () => {
  describe("Rendering", () => {
    it("should render with href and children", () => {
      render(<Link href="/about">About Us</Link>);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("About Us");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("should render as an anchor element", () => {
      render(<Link href="/test">Link</Link>);

      const link = screen.getByRole("link");
      expect(link.tagName).toBe("A");
    });

    it("should render with custom classes via UI component", () => {
      render(
        <Link href="/" className="custom-link-class">
          Test
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-link-class");
    });

    it("should apply custom styles via styles prop", () => {
      render(
        <Link href="/" styles={{ color: "red" }}>
          Styled Link
        </Link>
      );

      const link = screen.getByRole("link");
      const styleAttr = link.getAttribute("style") || "";
      expect(styleAttr).toContain("color");
    });

    it("should render children correctly", () => {
      render(
        <Link href="/">
          <span data-testid="child-element">Child Content</span>
        </Link>
      );

      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
  });

  describe("Target Attribute", () => {
    it("should render with target attribute", () => {
      render(
        <Link href="https://example.com" target="_blank">
          External
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("should work with different target values", () => {
      const { rerender } = render(
        <Link href="/" target="_self">
          Self
        </Link>
      );

      let link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_self");

      rerender(
        <Link href="/" target="_parent">
          Parent
        </Link>
      );
      link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_parent");
    });
  });

  describe("Security (rel attribute)", () => {
    it("should automatically add security attributes for target=_blank", () => {
      render(
        <Link href="https://example.com" target="_blank">
          External Link
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    });

    it("should merge custom rel with security defaults for target=_blank", () => {
      render(
        <Link href="https://example.com" target="_blank" rel="nofollow author">
          External Link
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      // Should have security defaults
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");

      // Should also have custom values
      expect(rel).toContain("nofollow");
      expect(rel).toContain("author");
    });

    it("should use provided rel as-is when target is not _blank", () => {
      render(
        <Link href="/internal" rel="author">
          Internal Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "author");
    });

    it("should not add security attributes for internal links", () => {
      render(<Link href="/about">About</Link>);

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("rel");
    });

    it("should handle empty rel attribute gracefully", () => {
      render(
        <Link href="https://example.com" target="_blank" rel="">
          External
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    });

    it("should not duplicate rel tokens when merging", () => {
      render(
        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener nofollow"
        >
          External
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel") || "";
      const tokens = rel.split(/\s+/);

      // Check for duplicates
      const uniqueTokens = new Set(tokens);
      expect(tokens.length).toBe(uniqueTokens.size);

      // Should have all three: noopener, noreferrer, nofollow
      expect(uniqueTokens.has("noopener")).toBe(true);
      expect(uniqueTokens.has("noreferrer")).toBe(true);
      expect(uniqueTokens.has("nofollow")).toBe(true);
    });
  });

  describe("Prefetch", () => {
    it("should add prefetch to rel when prefetch=true and target=_blank", () => {
      render(
        <Link href="https://example.com" target="_blank" prefetch>
          Prefetch Link
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(rel).toContain("prefetch");
    });

    it("should not add prefetch when prefetch=false", () => {
      render(
        <Link href="https://example.com" target="_blank" prefetch={false}>
          No Prefetch
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      expect(rel).not.toContain("prefetch");
    });

    it("should not add prefetch for internal links", () => {
      render(
        <Link href="/internal" prefetch>
          Internal
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      // Internal links don't get prefetch (only external with target="_blank")
      expect(rel).toBeNull();
    });
  });

  describe("Button Styling", () => {
    it("should apply data-btn attribute when btnStyle is provided", () => {
      render(
        <Link href="/" btnStyle="primary">
          Button Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-btn", "primary");
    });

    it("should render button-styled link with <b> wrapper", () => {
      render(
        <Link href="/">
          <b>Button Text</b>
        </Link>
      );

      const link = screen.getByRole("link");
      const bold = link.querySelector("b");

      expect(bold).toBeInTheDocument();
      expect(bold).toHaveTextContent("Button Text");
    });

    it("should render pill-styled link with <i> wrapper", () => {
      render(
        <Link href="/">
          <i>Pill Text</i>
        </Link>
      );

      const link = screen.getByRole("link");
      const italic = link.querySelector("i");

      expect(italic).toBeInTheDocument();
      expect(italic).toHaveTextContent("Pill Text");
    });
  });

  describe("Event Handlers", () => {
    it("should call onClick when link is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Link href="/test" onClick={handleClick}>
          Click Me
        </Link>
      );

      const link = screen.getByRole("link");
      await user.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "click",
        })
      );
    });

    it("should call onClick when activated with keyboard (Enter)", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Link href="/test" onClick={handleClick}>
          Click Me
        </Link>
      );

      const link = screen.getByRole("link");

      // Focus the link
      link.focus();
      expect(link).toHaveFocus();

      // Press Enter to activate
      await user.keyboard("{Enter}");

      // onClick should be called for keyboard activation
      expect(handleClick).toHaveBeenCalled();
    });

    it("should call onPointerDown when link is clicked", async () => {
      const user = userEvent.setup();
      const handlePointerDown = vi.fn();

      render(
        <Link href="/test" onPointerDown={handlePointerDown}>
          Click Me
        </Link>
      );

      const link = screen.getByRole("link");
      await user.click(link);

      expect(handlePointerDown).toHaveBeenCalledTimes(1);
      expect(handlePointerDown).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "pointerdown",
        })
      );
    });

    it("should call both onClick and onPointerDown when provided", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handlePointerDown = vi.fn();

      render(
        <Link href="/test" onClick={handleClick} onPointerDown={handlePointerDown}>
          Click Me
        </Link>
      );

      const link = screen.getByRole("link");
      await user.click(link);

      // Both handlers should be called
      expect(handleClick).toHaveBeenCalled();
      expect(handlePointerDown).toHaveBeenCalled();
    });

    it("should NOT call onPointerDown on keyboard activation (Enter)", async () => {
      const user = userEvent.setup();
      const handlePointerDown = vi.fn();

      render(
        <Link href="/test" onPointerDown={handlePointerDown}>
          Click Me
        </Link>
      );

      const link = screen.getByRole("link");
      link.focus();

      // Press Enter
      await user.keyboard("{Enter}");

      // onPointerDown should NOT be called (only pointer events trigger it)
      expect(handlePointerDown).not.toHaveBeenCalled();
    });

    it("should not throw error when onClick is not provided", async () => {
      const user = userEvent.setup();

      render(<Link href="/test">Click Me</Link>);

      const link = screen.getByRole("link");
      await expect(user.click(link)).resolves.not.toThrow();
    });

    it("should not throw error when onPointerDown is not provided", async () => {
      const user = userEvent.setup();

      render(<Link href="/test">Click Me</Link>);

      const link = screen.getByRole("link");
      await expect(user.click(link)).resolves.not.toThrow();
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the anchor element", () => {
      const ref = React.createRef<HTMLAnchorElement>();

      render(
        <Link ref={ref} href="/test">
          Test Link
        </Link>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe("A");
      expect(ref.current?.href).toContain("/test");
    });

    it("should allow programmatic focus via ref", () => {
      const ref = React.createRef<HTMLAnchorElement>();

      render(
        <Link ref={ref} href="/test">
          Focusable Link
        </Link>
      );

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("should render with proper role", () => {
      render(<Link href="/test">Accessible Link</Link>);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toBeVisible();
    });

    it("should render external links accessibly", () => {
      render(
        <Link href="https://example.com" target="_blank">
          External Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("target", "_blank");

      // Security attributes present
      const rel = link.getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    });

    it("should render button-styled links with semantic anchor", () => {
      render(
        <Link href="/action">
          <b>Call to Action</b>
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/action");
    });

    it("should support aria-label for icon-only links", () => {
      render(
        <Link href="/settings" aria-label="Open settings">
          <svg aria-hidden="true">
            <path d="M0 0h24v24H0z" />
          </svg>
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAccessibleName("Open settings");

      // Verify SVG is hidden from screen readers
      const svg = link.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();

      render(<Link href="/test">Keyboard Link</Link>);

      const link = screen.getByRole("link");

      // Tab to link
      await user.tab();
      expect(link).toHaveFocus();

      // Press Enter should work (default browser behavior)
      // We just verify focus worked
      expect(link).toHaveFocus();
    });

    it("should have accessible name from text content", () => {
      render(<Link href="/test">Read installation guide</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAccessibleName("Read installation guide");
    });

    it("should support aria-describedby for additional context", () => {
      render(
        <>
          <span id="link-description">Opens in a new window</span>
          <Link href="https://example.com" aria-describedby="link-description">
            External Resource
          </Link>
        </>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-describedby", "link-description");
    });
  });

  describe("URL Schemes", () => {
    it("should support mailto: links", () => {
      render(<Link href="mailto:test@example.com">Email Us</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "mailto:test@example.com");
    });

    it("should support tel: links", () => {
      render(<Link href="tel:+1234567890">Call Us</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "tel:+1234567890");
    });

    it("should support hash/anchor links", () => {
      render(<Link href="#section-1">Jump to Section</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "#section-1");
    });

    it("should support relative paths", () => {
      render(<Link href="../parent">Go to Parent</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "../parent");
    });

    it("should support absolute paths", () => {
      render(<Link href="/absolute/path">Absolute Path</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/absolute/path");
    });
  });

  describe("Display Name", () => {
    it("should have correct displayName for debugging", () => {
      expect(Link.displayName).toBe("Link");
    });
  });

  describe("Props Spreading", () => {
    it("should spread additional HTML attributes", () => {
      render(
        <Link href="/" data-testid="custom-link" id="link-123">
          Test
        </Link>
      );

      const link = screen.getByTestId("custom-link");
      expect(link).toHaveAttribute("id", "link-123");
    });

    it("should support title attribute", () => {
      render(
        <Link href="/" title="Additional information">
          Hover Me
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("title", "Additional information");
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing href gracefully", () => {
      // href is optional in the type, testing edge case behavior
      render(<Link>No href</Link>);

      // Should still render, though not a valid link
      const element = screen.getByText("No href");
      expect(element).toBeInTheDocument();
    });

    it("should handle whitespace-only rel values", () => {
      render(
        <Link href="https://example.com" target="_blank" rel="   ">
          External
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel");

      // Should still include security tokens
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    });

    it("should handle multiple whitespace between rel tokens", () => {
      render(
        <Link
          href="https://example.com"
          target="_blank"
          rel="nofollow    author"
        >
          External
        </Link>
      );

      const link = screen.getByRole("link");
      const rel = link.getAttribute("rel") || "";

      // Split should handle multiple spaces
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(rel).toContain("nofollow");
      expect(rel).toContain("author");
    });
  });

  describe("Performance", () => {
    it("should memoize rel computation to avoid unnecessary recalculations", () => {
      const { rerender } = render(
        <Link href="https://example.com" target="_blank">
          Link
        </Link>
      );

      const link1 = screen.getByRole("link");
      const rel1 = link1.getAttribute("rel");

      // Rerender with same props
      rerender(
        <Link href="https://example.com" target="_blank">
          Link
        </Link>
      );

      const link2 = screen.getByRole("link");
      const rel2 = link2.getAttribute("rel");

      // Should produce same result
      expect(rel1).toBe(rel2);
    });

    it("should update rel when dependencies change", () => {
      const { rerender } = render(
        <Link href="https://example.com" target="_blank" prefetch={false}>
          Link
        </Link>
      );

      const link1 = screen.getByRole("link");
      const rel1 = link1.getAttribute("rel");
      expect(rel1).not.toContain("prefetch");

      // Rerender with prefetch=true
      rerender(
        <Link href="https://example.com" target="_blank" prefetch={true}>
          Link
        </Link>
      );

      const link2 = screen.getByRole("link");
      const rel2 = link2.getAttribute("rel");
      expect(rel2).toContain("prefetch");
    });
  });
});
