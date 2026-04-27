"use client";

import React from "react";
import { Callout, Flex, Grid, Skeleton, Text } from "@radix-ui/themes";
import { ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";

import styles from "./HouseCardGrid.module.css";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";
import HouseCard from "../HouseCard/HouseCard";
import { House, HousePage } from "@/app/types/types";

export interface HouseCardGridProps {
  /**
   * Function that fetches a page of houses.
   * Receives the cursor for the page to fetch (null = first page).
   */
  fetchPage: (cursor: string | null) => Promise<HousePage>;
}

const HouseCardSkeleton: React.FC = () => (
  <Flex direction="column" gap="3" className={styles.skeleton}>
    <Skeleton className={styles.skeletonPhoto} />
    <Flex direction="column" gap="2" px="2" pb="2">
      <Skeleton height="16px" width="90%" />
      <Skeleton height="12px" width="55%" />
      <Skeleton height="16px" width="35%" />
    </Flex>
  </Flex>
);

const INITIAL_SKELETON_COUNT = 6;
const NEXT_PAGE_SKELETON_COUNT = 3;

/**
 * Responsive grid of HouseCards with infinite scroll.
 * Infinite scroll logic is handled by useInfiniteScroll.
 */
const HouseCardGrid: React.FC<HouseCardGridProps> = ({ fetchPage }) => {
  const {
    items,
    isLoading,
    isFetchingNextPage,
    isError,
    refetch,
    sentinelRef,
  } = useInfiniteScroll<House>({ queryKey: ["houses"], fetchPage });

  if (isError) {
    return (
      <Callout.Root color="red" className={styles.callout}>
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>Failed to load properties.</Callout.Text>
        <button className={styles.retryButton} onClick={() => refetch()}>
          Retry
        </button>
      </Callout.Root>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3"
        py="9"
        className={styles.emptyState}
      >
        <HomeIcon className={styles.emptyIcon} />
        <Text size="3" color="gray">
          No properties found.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="4" className={styles.root}>
      <Grid columns={{ initial: "2", sm: "3", lg: "4" }} gap="4">
        {isLoading
          ? Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, i) => (
              <HouseCardSkeleton key={i} />
            ))
          : items.map((house, idx) => <HouseCard key={idx} house={house} />)}

        {isFetchingNextPage &&
          Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, i) => (
            <HouseCardSkeleton key={`next-${i}`} />
          ))}
      </Grid>

      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
    </Flex>
  );
};

export default HouseCardGrid;
