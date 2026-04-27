import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageList from "./ImageList";
import * as useInfiniteScrollModule from "../../../hooks/useInfiniteScroll";

vi.mock("../HouseCardGrid/HouseCardGrid", () => ({
  default: ({ queryKey }: { queryKey: string[] }) => (
    <div data-testid="house-card-grid" data-query-key={queryKey.join(",")} />
  ),
}));

function renderWithQuery() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ImageList />
    </QueryClientProvider>
  );
}

describe("ImageList", () => {
  it("renders the HouseCardGrid", () => {
    renderWithQuery();
    expect(screen.getByTestId("house-card-grid")).toBeInTheDocument();
  });

  it("passes the correct queryKey to HouseCardGrid", () => {
    renderWithQuery();
    expect(screen.getByTestId("house-card-grid")).toHaveAttribute(
      "data-query-key",
      "houses"
    );
  });
});
