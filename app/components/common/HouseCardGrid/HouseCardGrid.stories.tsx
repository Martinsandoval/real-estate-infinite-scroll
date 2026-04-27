import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@radix-ui/themes";
import HouseCardGrid, { HousePage } from "./HouseCardGrid";

// ── Helpers ────────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_HOUSES = [
  {
    id: "1",
    address: "742 Evergreen Terrace, Springfield, IL 62701",
    price: "$325,000",
    homeowner: "Homer Simpson",
    photoUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",
  },
  {
    id: "2",
    address: "1 Beverly Park Terrace, Beverly Hills, CA 90210",
    price: "$12,500,000",
    homeowner: "Jane Doe",
    photoUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
  },
  {
    id: "3",
    address: "456 No Photo Ave, Austin, TX 78701",
    price: "$198,000",
    homeowner: "Alice Johnson",
    photoUrl: "",
  },
  {
    id: "4",
    address: "9999 Long Street Name Blvd, Apt 4B, San Francisco, CA 94102",
    price: "$1,100,000",
    homeowner: "Robert Garcia",
    photoUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
  },
  {
    id: "5",
    address: "321 Oak Lane, Denver, CO 80201",
    price: "$540,000",
    homeowner: "Maria Torres",
    photoUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "6",
    address: "88 Maple Drive, Portland, OR 97201",
    price: "$415,000",
    homeowner: "David Kim",
    photoUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
  },
];

const PAGE_2_HOUSES = [
  {
    id: "7",
    address: "500 Sunset Blvd, Los Angeles, CA 90028",
    price: "$2,800,000",
    homeowner: "Chris Evans",
    photoUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
  },
  {
    id: "8",
    address: "12 Harbor View, Seattle, WA 98101",
    price: "$875,000",
    homeowner: "Sandra Lee",
    photoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  },
  {
    id: "9",
    address: "77 Lakeside Drive, Chicago, IL 60601",
    price: "$620,000",
    homeowner: "James Park",
    photoUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
  },
];

/** Wraps each story with a fresh QueryClient so stories are isolated. */
const withQueryClient = (Story: React.ComponentType) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={client}>
      <Box p="4">
        <Story />
      </Box>
    </QueryClientProvider>
  );
};

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof HouseCardGrid> = {
  title: "Components/Common/HouseCardGrid",
  component: HouseCardGrid,
  tags: ["autodocs"],
  decorators: [withQueryClient],
};

export default meta;
type Story = StoryObj<typeof HouseCardGrid>;

// ── Stories ────────────────────────────────────────────────────────────────────

/** Two pages of results — scroll to the bottom to trigger page 2. */
export const Default: Story = {
  args: {
    queryKey: ["houses-default"],
    fetchPage: async (cursor): Promise<HousePage> => {
      await delay(800);
      if (!cursor) {
        return { items: MOCK_HOUSES, nextCursor: "page-2" };
      }
      return { items: PAGE_2_HOUSES, nextCursor: null };
    },
  },
};

/** Shows skeleton cards while the first page loads. */
export const Loading: Story = {
  args: {
    queryKey: ["houses-loading"],
    // Never resolves — stays in loading state indefinitely
    fetchPage: () => new Promise(() => {}),
  },
};

/** No houses returned from the API. */
export const Empty: Story = {
  args: {
    queryKey: ["houses-empty"],
    fetchPage: async (): Promise<HousePage> => {
      await delay(400);
      return { items: [], nextCursor: null };
    },
  },
};

/** The API call fails — shows the error callout with a Retry button. */
export const Error: Story = {
  args: {
    queryKey: ["houses-error"],
    fetchPage: async () => {
      await delay(600);
      throw new Error("Network error");
    },
  },
};

/** Single page — no infinite scroll triggered. */
export const SinglePage: Story = {
  args: {
    queryKey: ["houses-single"],
    fetchPage: async (cursor): Promise<HousePage> => {
      await delay(500);
      if (!cursor) {
        return { items: MOCK_HOUSES.slice(0, 3), nextCursor: null };
      }
      return { items: [], nextCursor: null };
    },
  },
};
