import axios from "axios";
import { House, HousePage } from "@/app/types/types";

const PAGE_SIZE = 6;

type HousesResponse = {
  houses: House[];
};

/**
 * Provides a `fetchPage` function that fetches paginated house listings via axios.
 *
 * The function is compatible with {@link UseInfiniteScrollOptions.fetchPage} and can be
 * passed directly to `HouseCardGrid`. The API base URL is read from
 * `NEXT_PUBLIC_API_URL`.
 */
export function useHouses() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchPage = async (cursor: string | null): Promise<HousePage> => {
    const page = cursor ? Number(cursor) : 1;

    const { data } = await axios.get<HousesResponse>(
      `${apiUrl}/houses?page=${page}&per_page=${PAGE_SIZE}`
    );

    const items = data?.houses ?? [];
    const nextCursor = items.length < PAGE_SIZE ? null : String(page + 1);

    return { items, nextCursor };
  };

  return { fetchPage };
}
