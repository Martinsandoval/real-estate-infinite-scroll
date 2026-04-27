import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HouseCardGrid from "./HouseCardGrid";
import * as useInfiniteScrollModule from "../../../hooks/useInfiniteScroll";

const mockRefetch = vi.fn();
const mockSentinelRef = { current: null };

const defaultHookResult = {
  items: [],
  isLoading: false,
  isFetchingNextPage: false,
  isError: false,
  hasNextPage: false,
  refetch: mockRefetch,
  sentinelRef: mockSentinelRef,
};

const mockFetchPage = vi.fn();

beforeEach(() => {
  vi.restoreAllMocks();
});

function renderGrid(hookOverrides = {}) {
  vi.spyOn(useInfiniteScrollModule, "useInfiniteScroll").mockReturnValue({
    ...defaultHookResult,
    ...hookOverrides,
  });
  return render(
    <HouseCardGrid fetchPage={mockFetchPage} queryKey={["houses"]} />
  );
}

describe("HouseCardGrid", () => {
  it("shows skeleton cards while loading", () => {
    renderGrid({ isLoading: true });
    // 6 skeleton cards expected (INITIAL_SKELETON_COUNT)
    const skeletons = document.querySelectorAll(".rt-Skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders house cards when data is loaded", () => {
    const houses = [
      {
        id: "1",
        address: "1 Main St",
        price: "100,000",
        homeowner: "Alice",
        photoURL: "",
      },
      {
        id: "2",
        address: "2 Oak Ave",
        price: "200,000",
        homeowner: "Bob",
        photoURL: "",
      },
    ];
    renderGrid({ items: houses });
    expect(screen.getByText("1 Main St")).toBeInTheDocument();
    expect(screen.getByText("2 Oak Ave")).toBeInTheDocument();
  });

  it("shows error callout when isError is true", () => {
    renderGrid({ isError: true });
    expect(screen.getByText(/failed to load properties/i)).toBeInTheDocument();
  });

  it("shows error callout when items is empty and not loading", () => {
    renderGrid({ isLoading: false, items: [] });
    expect(screen.getByText(/failed to load properties/i)).toBeInTheDocument();
  });

  it("shows next-page skeletons when fetching next page", () => {
    const houses = [
      {
        id: "1",
        address: "1 Main St",
        price: "100,000",
        homeowner: "Alice",
        photoURL: "",
      },
    ];
    renderGrid({ items: houses, isFetchingNextPage: true });
    // The house card and additional skeleton cards should be visible
    expect(screen.getByText("1 Main St")).toBeInTheDocument();
    const skeletons = document.querySelectorAll(".rt-Skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("calls refetch when retry button is clicked", async () => {
    renderGrid({ isError: true });
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(mockRefetch).toHaveBeenCalled();
  });
});
