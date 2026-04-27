export interface House {
  id: string;
  address: string;
  price: string;
  homeowner: string;
  photoURL: string;
}

/** Convenience alias — the fetchPage function must return this shape. */
export type HousePage = InfiniteScrollPage<House>;

export interface InfiniteScrollPage<T> {
  items: T[];
  /** Cursor for the next page, or null when there are no more pages. */
  nextCursor: string | null;
}

export interface UseInfiniteScrollOptions<T> {
  /** TanStack Query key — change to re-fetch or scope the cache. */
  queryKey: string[];
  /**
   * Function that fetches a page of items.
   * Receives the cursor for the page to fetch (null = first page).
   * Must return { items, nextCursor }.
   */
  fetchPage: (cursor: string | null) => Promise<InfiniteScrollPage<T>>;
  /**
   * Distance from the viewport edge to start fetching the next page.
   * @default "200px"
   */
  rootMargin?: string;
}
