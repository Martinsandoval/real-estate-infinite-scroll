import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HouseCard from "./HouseCard";

const defaultProps = {
  address: "123 Main St",
  price: "500,000",
  homeowner: "Jane Doe",
  photoUrl: "https://example.com/photo.jpg",
};

describe("HouseCard", () => {
  it("renders the address", () => {
    render(<HouseCard {...defaultProps} />);
    expect(screen.getAllByText("123 Main St").length).toBeGreaterThan(0);
  });

  it("renders the homeowner name", () => {
    render(<HouseCard {...defaultProps} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders the price with $ prefix", () => {
    render(<HouseCard {...defaultProps} />);
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("renders the property image", () => {
    render(<HouseCard {...defaultProps} />);
    const img = screen.getByAltText("123 Main St");
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("shows fallback icon when photoUrl is empty", () => {
    render(<HouseCard {...defaultProps} photoUrl="" />);
    // No img element should be rendered
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows fallback icon on image load error", () => {
    render(<HouseCard {...defaultProps} />);
    const img = screen.getByAltText("123 Main St");
    fireEvent.error(img);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("opens dialog when card is clicked", async () => {
    render(<HouseCard {...defaultProps} />);
    const card = screen.getByRole("button", {
      name: /view details for 123 main st/i,
    });
    await userEvent.click(card);
    // Dialog title should appear
    expect(screen.getAllByText("123 Main St").length).toBeGreaterThan(1);
  });

  it("opens dialog on Enter key press", () => {
    render(<HouseCard {...defaultProps} />);
    const card = screen.getByRole("button", {
      name: /view details for 123 main st/i,
    });
    act(() => {
      fireEvent.keyDown(card, { key: "Enter" });
    });
    expect(screen.getAllByText("123 Main St").length).toBeGreaterThan(1);
  });

  it("shows homeowner and price in dialog", async () => {
    render(<HouseCard {...defaultProps} />);
    const card = screen.getByRole("button", {
      name: /view details for 123 main st/i,
    });
    await userEvent.click(card);
    expect(screen.getByText("Homeowner")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });
});
