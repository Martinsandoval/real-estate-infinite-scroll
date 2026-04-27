"use client";
import ImageList from "./components/common/ImageList/ImageList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useHouses } from "@/app/hooks/useHouses";
import HouseCardGrid from "@/app/components/common/HouseCardGrid/HouseCardGrid";

const queryClient = new QueryClient();

export default function Home() {
  const { fetchPage } = useHouses();
  return (
    <QueryClientProvider client={queryClient}>
      <Flex
        p={{ initial: "5", sm: "7", lg: "9" }}
        direction="column"
        gap="5"
        style={{ maxWidth: 1600, margin: "0 auto", width: "100%" }}
      >
        <Flex direction="column" gap="1">
          <Heading size="7">List of Houses</Heading>
          <Text size="2" color="gray">
            Browse available properties
          </Text>
        </Flex>
        <HouseCardGrid fetchPage={fetchPage} />;
      </Flex>
    </QueryClientProvider>
  );
}
