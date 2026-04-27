import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Dialog from "./Dialog";
import Button from "@/shared/app/components/common/Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Common/Dialog",
  component: Dialog,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "danger", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const Template = (args: any) => {
  const [open, setOpen] = useState(true);

  return <Dialog {...args} open={open} onOpenChange={setOpen} />;
};

export const Info: Story = {
  render: (args) => (
    <Template
      {...args}
      title="Information"
      variant="info"
      description={<p>This is an informational dialog.</p>}
      actions={
        <>
          <Button variant="gray" onClick={() => alert("Canceled")}>
            Cancel
          </Button>
          <Button onClick={() => alert("Confirmed")}>Save</Button>
        </>
      }
    />
  ),
};

export const Danger: Story = {
  render: (args) => (
    <Template
      {...args}
      title="Delete Item?"
      variant="danger"
      description={
        <p>Are you sure you want to delete this item? This cannot be undone.</p>
      }
      content={
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <span>✘</span> Your item will be no longer visible.
          </li>
          <li>
            <span>✘</span> You will loss all resources associated with this
            item.
          </li>
          <li>
            <span>✘</span> You won't be able to recover it.
          </li>
        </ul>
      }
      actions={
        <>
          <Button variant="gray" onClick={() => alert("Canceled")}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => alert("Deleted")}>
            Delete
          </Button>
        </>
      }
    />
  ),
};

export const Warning: Story = {
  render: (args) => (
    <Template
      {...args}
      title="Unsaved Changes"
      variant="warning"
      description={
        <p>You have unsaved changes. Do you really want to leave?</p>
      }
      actions={
        <>
          <Button variant="gray" onClick={() => alert("Canceled")}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => alert("Proceeding")}>
            Continue
          </Button>
        </>
      }
    />
  ),
};
