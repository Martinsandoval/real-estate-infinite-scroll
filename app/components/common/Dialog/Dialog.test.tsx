import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dialog from "./Dialog";

const defaultProps = {
  open: true,
  onOpenChange: vi.fn(),
  title: "Test Title",
};

describe("Dialog", () => {
  it("renders the title", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Dialog {...defaultProps} description="Some description" />);
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.queryByText("Some description")).not.toBeInTheDocument();
  });

  it("renders content when provided", () => {
    render(<Dialog {...defaultProps} content={<span>Dialog content</span>} />);
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(<Dialog {...defaultProps} actions={<button>Confirm</button>} />);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("renders the close button", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls onOpenChange when the close button is clicked", async () => {
    const onOpenChange = vi.fn();
    render(<Dialog {...defaultProps} onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not render content when open is false", () => {
    render(
      <Dialog
        {...defaultProps}
        open={false}
        content={<span>Hidden content</span>}
      />
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });
});
