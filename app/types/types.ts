/** A real estate property listing returned by the API. */
export interface House {
  /** Unique identifier for the property. */
  id: string;
  /** Street address of the property. */
  address: string;
  /** Listing price as a numeric string (e.g. `"450000"`). */
  price: string;
  /** Full name of the current homeowner. */
  homeowner: string;
  /** URL of the property's primary photo. */
  photoURL: string;
}

/** One page of house results, compatible with {@link UseInfiniteScrollOptions}. */
export type HousePage = InfiniteScrollPage<House>;

/** A single page of paginated results used by the infinite scroll system. */
export interface InfiniteScrollPage<T> {
  /** Items returned for this page. */
  items: T[];
  /** Cursor for the next page, or `null` when there are no more pages. */
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
