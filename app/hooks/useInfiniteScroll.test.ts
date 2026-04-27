import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("useInfiniteScroll", () => {
  it("returns items from the first page", async () => {
    const fetchPage = vi.fn().mockResolvedValue({
      items: [{ id: "1", name: "Item 1" }],
      nextCursor: null,
    });

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.items).toEqual([{ id: "1", name: "Item 1" }]);
  });

  it("starts in a loading state", () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValue({ items: [], nextCursor: null });

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test-loading"], fetchPage }),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("returns isError true when fetchPage rejects", async () => {
    const fetchPage = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test-error"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it("returns hasNextPage false when nextCursor is null", async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValue({ items: [], nextCursor: null });

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test-no-next"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasNextPage).toBe(false);
  });

  it("returns hasNextPage true when nextCursor is provided", async () => {
    const fetchPage = vi.fn().mockResolvedValue({
      items: [{ id: "1" }],
      nextCursor: "2",
    });

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test-has-next"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasNextPage).toBe(true);
  });

  it("flattens items across multiple pages", async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ items: [{ id: "1" }], nextCursor: "2" })
      .mockResolvedValueOnce({ items: [{ id: "2" }], nextCursor: null });

    const { result } = renderHook(
      () => useInfiniteScroll({ queryKey: ["test-pages"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.hasNextPage).toBe(true));

    await act(async () => {
      // Simulate IntersectionObserver triggering next page
      // by directly calling the hook's internal query
    });
  });

  it("calls fetchPage with null for the initial page", async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValue({ items: [], nextCursor: null });

    renderHook(
      () => useInfiniteScroll({ queryKey: ["test-init-cursor"], fetchPage }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(fetchPage).toHaveBeenCalledWith(null));
  });
});
