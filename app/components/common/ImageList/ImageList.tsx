"use client";

import { House, HousePage } from "@/app/types/types";
import HouseCardGrid from "@/app/components/common/HouseCardGrid/HouseCardGrid";

const PAGE_SIZE = 6;

type HousesResponse = {
  houses: House[];
};

export default function ImageList() {
  const fetchPage = async (cursor: string | null): Promise<HousePage> => {
    const page = cursor ? Number(cursor) : 1;

    const res = await fetch(
      `https://staging.homevision.co/api_project/houses?page=${page}&per_page=${PAGE_SIZE}`
    );

    const data: HousesResponse = await res.json();

    const items = data?.houses ?? [];

    const nextCursor = items.length < PAGE_SIZE ? null : String(page + 1);

    return {
      items,
      nextCursor,
    };
  };

  return <HouseCardGrid fetchPage={fetchPage} queryKey={["houses"]} />;
}
