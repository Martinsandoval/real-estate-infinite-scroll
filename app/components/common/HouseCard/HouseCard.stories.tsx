import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "@radix-ui/themes";
import HouseCard from "@/shared/app/components/common/HouseCard/HouseCard";

const meta: Meta<typeof HouseCard> = {
  title: "Components/Common/HouseCard",
  component: HouseCard,
  tags: ["autodocs"],
  args: {
    address: "742 Evergreen Terrace, Springfield, IL 62701",
    price: "$325,000",
    homeowner: "Homer Simpson",
    photoUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",
  },
};

export default meta;
type Story = StoryObj<typeof HouseCard>;

export const Default: Story = {};

export const LuxuryProperty: Story = {
  args: {
    address: "1 Beverly Park Terrace, Beverly Hills, CA 90210",
    price: "$12,500,000",
    homeowner: "Jane Doe",
    photoUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
  },
};

export const BrokenPhoto: Story = {
  args: {
    address: "123 Broken Image Lane, Portland, OR 97201",
    price: "$280,000",
    homeowner: "John Smith",
    photoUrl: "https://not-a-real-url.example/photo.jpg",
  },
};

export const NoPhoto: Story = {
  args: {
    address: "456 No Photo Ave, Austin, TX 78701",
    price: "$198,000",
    homeowner: "Alice Johnson",
    photoUrl: "",
  },
};

export const LongAddress: Story = {
  args: {
    address:
      "9999 Very Long Street Name Boulevard, Apartment 4B, San Francisco, CA 94102",
    price: "$1,100,000",
    homeowner: "Robert Garcia",
    photoUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
  },
};

export const GridOfCards: Story = {
  render: () => (
    <Grid columns="3" gap="4" p="4">
      <HouseCard
        address="742 Evergreen Terrace, Springfield"
        price="$325,000"
        homeowner="Homer Simpson"
        photoUrl="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"
      />
      <HouseCard
        address="1 Beverly Park Terrace, Beverly Hills"
        price="$12,500,000"
        homeowner="Jane Doe"
        photoUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
      />
      <HouseCard
        address="456 No Photo Ave, Austin"
        price="$198,000"
        homeowner="Alice Johnson"
        photoUrl=""
      />
    </Grid>
  ),
};
