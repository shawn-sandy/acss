import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { IconButton } from "./icon-button";

const TestIcon = () => <svg data-testid="test-icon" aria-hidden="true" />;

describe("IconButton", () => {
  it("renders a button element with aria-label", () => {
    render(<IconButton type="button" aria-label="Close" icon={<TestIcon />} />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Close");
  });

  it("renders a button element with aria-labelledby", () => {
    render(
      <>
        <span id="lbl">Delete item</span>
        <IconButton type="button" aria-labelledby="lbl" icon={<TestIcon />} />
      </>
    );
    const button = screen.getByRole("button", { name: "Delete item" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-labelledby", "lbl");
  });

  it("renders the icon as a child of the button", () => {
    render(<IconButton type="button" aria-label="Close" icon={<TestIcon />} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders label text when label prop is provided", () => {
    render(
      <IconButton
        type="button"
        aria-label="Settings"
        icon={<TestIcon />}
        label="Settings"
      />
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("applies data-icon-label attribute to the label span", () => {
    render(
      <IconButton
        type="button"
        aria-label="Settings"
        icon={<TestIcon />}
        label="Settings"
      />
    );
    const labelSpan = screen.getByText("Settings");
    expect(labelSpan).toHaveAttribute("data-icon-label");
  });

  it("applies data-icon-btn='has-label' to the button when label is provided", () => {
    render(
      <IconButton
        type="button"
        aria-label="Settings"
        icon={<TestIcon />}
        label="Settings"
      />
    );
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toHaveAttribute("data-icon-btn", "has-label");
  });

  it("does not render a label span when label prop is omitted", () => {
    render(<IconButton type="button" aria-label="Close" icon={<TestIcon />} />);
    expect(document.querySelector("[data-icon-label]")).toBeNull();
  });

  it("sets data-icon-btn to 'icon' when label is omitted", () => {
    render(<IconButton type="button" aria-label="Close" icon={<TestIcon />} />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("data-icon-btn", "icon");
  });

  it("fires the click handler when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        type="button"
        aria-label="Close"
        icon={<TestIcon />}
        onClick={handleClick}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click handler when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        type="button"
        aria-label="Close"
        icon={<TestIcon />}
        disabled
        onClick={handleClick}
      />
    );
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("defaults variant to 'icon'", () => {
    render(<IconButton type="button" aria-label="Close" icon={<TestIcon />} />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("data-style", "icon");
  });

  it("accepts a variant override", () => {
    render(
      <IconButton
        type="button"
        aria-label="Settings"
        icon={<TestIcon />}
        variant="outline"
      />
    );
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toHaveAttribute("data-style", "outline");
  });
});
