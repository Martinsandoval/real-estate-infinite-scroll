import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UseInfiniteScrollOptions } from "@/app/types/types";

export interface UseInfiniteScrollResult<T> {
  items: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  hasNextPage: boolean;
  refetch: () => void;
  /** Attach to the sentinel element that triggers the next page load. */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Generic infinite scroll hook built on TanStack Query's useInfiniteQuery.
 *
 * Handles both data fetching and IntersectionObserver-based scroll detection.
 * Attach `sentinelRef` to a div at the bottom of your list — the next page
 * will be fetched automatically when it enters the viewport.
 *
 * @example
 * const { items, isLoading, isFetchingNextPage, isError, refetch, sentinelRef } =
 *   useInfiniteScroll({ queryKey: ["posts"], fetchPage });
 *
 * return (
 *   <>
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *     <div ref={sentinelRef} />
 *   </>
 * );
 */
export function useInfiniteScroll<T>({
  queryKey,
  fetchPage,
  rootMargin = "200px",
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchPage(pageParam as string | null),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersection, rootMargin]);

  return {
    items: data?.pages.flatMap((p) => p.items) ?? [],
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    refetch,
    sentinelRef,
  };
}
