import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders a badge element with the correct content", () => {
    render(<Badge aria-label="5 notifications">5</Badge>);
    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
  });

  it("renders as a sup element by default", () => {
    render(<Badge aria-label="notification badge">3</Badge>);
    const badge = screen.getByRole("status");
    expect(badge.tagName).toBe("SUP");
  });

  it("has role='status' by default for accessibility", () => {
    render(<Badge aria-label="badge">12</Badge>);
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("role", "status");
  });

  it("applies aria-label for screen reader accessibility", () => {
    render(<Badge aria-label="3 unread messages">3</Badge>);
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("aria-label", "3 unread messages");
  });

  it("renders with nested span element for styling", () => {
    render(<Badge aria-label="badge">5</Badge>);
    const badge = screen.getByRole("status");
    const span = badge.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBe("5");
  });

  it("applies custom id when provided", () => {
    render(
      <Badge id="notification-badge" aria-label="notification">
        10
      </Badge>
    );
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("id", "notification-badge");
  });

  it("applies custom className when provided via classes prop", () => {
    render(
      <Badge classes="custom-badge-class" aria-label="badge">
        7
      </Badge>
    );
    const badge = screen.getByRole("status");
    expect(badge).toHaveClass("custom-badge-class");
  });

  it("applies custom inline styles when provided", () => {
    render(
      <Badge styles={{ backgroundColor: "red", fontSize: "1rem" }} aria-label="badge">
        99+
      </Badge>
    );
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("style");
    expect(badge).toHaveStyle({
      fontSize: "1rem",
    });
  });

  describe("variant prop", () => {
    it("applies data-badge='rounded' when variant is 'rounded'", () => {
      render(
        <Badge variant="rounded" aria-label="rounded badge">
          5
        </Badge>
      );
      const badge = screen.getByRole("status");
      expect(badge).toHaveAttribute("data-badge", "rounded");
    });

    it("does not apply data-badge attribute when variant is undefined", () => {
      render(<Badge aria-label="default badge">3</Badge>);
      const badge = screen.getByRole("status");
      expect(badge).not.toHaveAttribute("data-badge");
    });
  });

  describe("children rendering", () => {
    it("renders numeric children correctly", () => {
      render(<Badge aria-label="count">123</Badge>);
      expect(screen.getByText("123")).toBeInTheDocument();
    });

    it("renders string children correctly", () => {
      render(<Badge aria-label="new badge">NEW</Badge>);
      expect(screen.getByText("NEW")).toBeInTheDocument();
    });

    it("renders React element children correctly", () => {
      render(
        <Badge aria-label="icon badge">
          <span data-testid="custom-icon">★</span>
        </Badge>
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("is accessible with proper aria-label", () => {
      render(<Badge aria-label="12 items in cart">12</Badge>);
      const badge = screen.getByRole("status", { name: "12 items in cart" });
      expect(badge).toBeInTheDocument();
    });

    it("can override role attribute if needed", () => {
      render(
        <Badge role="note" aria-label="information">
          i
        </Badge>
      );
      // role="note" should be applied via props spread
      const badge = screen.getByText("i").closest("sup");
      expect(badge).toHaveAttribute("role", "note");
    });

    it("supports additional ARIA attributes", () => {
      render(
        <Badge aria-label="badge" aria-live="polite" aria-atomic="true">
          5
        </Badge>
      );
      const badge = screen.getByRole("status");
      expect(badge).toHaveAttribute("aria-live", "polite");
      expect(badge).toHaveAttribute("aria-atomic", "true");
    });
  });

  describe("integration", () => {
    it("renders correctly within text content", () => {
      render(
        <p>
          Messages
          <Badge aria-label="3 unread">3</Badge>
        </p>
      );
      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders multiple badges independently", () => {
      render(
        <div>
          <Badge aria-label="first badge">1</Badge>
          <Badge aria-label="second badge">2</Badge>
          <Badge aria-label="third badge" variant="rounded">
            3
          </Badge>
        </div>
      );
      const badges = screen.getAllByRole("status");
      expect(badges).toHaveLength(3);
      expect(badges[2]).toHaveAttribute("data-badge", "rounded");
    });
  });

  describe("props spreading", () => {
    it("forwards additional props to the UI component", () => {
      render(
        <Badge data-testid="custom-badge" data-custom="value" aria-label="badge">
          5
        </Badge>
      );
      const badge = screen.getByTestId("custom-badge");
      expect(badge).toHaveAttribute("data-custom", "value");
    });
  });
});
