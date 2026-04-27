import axios, { AxiosError } from "axios";
import { useRef } from "react";
import { useToast } from "@/app/components/common/Toast/Toast";
import { House, HousePage } from "@/app/types/types";

const PAGE_SIZE = 6;

type HousesResponse = {
  houses: House[];
};

/** Returns a user-friendly message from an axios error. */
function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return "An unexpected error occurred.";

  const axiosError = error as AxiosError;

  if (!axiosError.response) {
    return "Network error — check your connection and try again.";
  }

  switch (axiosError.response.status) {
    case 400:
      return "Bad request. Please refresh the page.";
    case 401:
    case 403:
      return "You are not authorised to view these properties.";
    case 404:
      return "Properties endpoint not found.";
    case 429:
      return "Too many requests — please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
      return "Server is unavailable — please try again later.";
    default:
      return `Request failed with status ${axiosError.response.status}.`;
  }
}

/**
 * Provides a `fetchPage` function that fetches paginated house listings via axios.
 *
 * The function is compatible with {@link UseInfiniteScrollOptions.fetchPage} and can be
 * passed directly to `HouseCardGrid`. The API base URL is read from
 * `NEXT_PUBLIC_API_URL`.
 *
 * API errors are caught, translated into user-friendly messages, and surfaced
 * via an error toast. The error is re-thrown so TanStack Query can still set
 * the `isError` state. A ref flag prevents duplicate toasts when TanStack
 * Query retries a failed request.
 */
export function useHouses() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { showErrorToast } = useToast();
  const errorToastShownRef = useRef(false);

  const fetchPage = async (cursor: string | null): Promise<HousePage> => {
    const page = cursor ? Number(cursor) : 1;

    try {
      const { data } = await axios.get<HousesResponse>(
        `${apiUrl}/houses?page=${page}&per_page=${PAGE_SIZE}`
      );

      errorToastShownRef.current = false;

      const items = data?.houses ?? [];
      const nextCursor = items.length < PAGE_SIZE ? null : String(page + 1);

      return { items, nextCursor };
    } catch (error) {
      if (!errorToastShownRef.current) {
        errorToastShownRef.current = true;
        showErrorToast("Failed to load properties", getErrorMessage(error));
      }
      throw error;
    }
  };

  return { fetchPage };
}
