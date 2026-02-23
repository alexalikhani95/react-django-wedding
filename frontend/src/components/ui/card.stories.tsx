import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRing } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notifications = [
  { title: "Your call has been confirmed.", description: "1 hour ago" },
  { title: "You have a new message!", description: "1 hour ago" },
  { title: "Your subscription is expiring soon!", description: "2 hours ago" },
];

/**
 * Displays a card with header, content, and footer.
 */
const meta: Meta<typeof Card> = {
  title: "ui/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-96",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the card with header, content list, and footer.
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification) => (
          <div key={notification.title} className="flex items-center gap-4">
            <BellRing className="size-6 shrink-0" />
            <div>
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="link">Close</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Use the `CardAction` component to add interactive elements in the header.
 */
export const WithCardAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Team Settings</CardTitle>
        <CardDescription>Manage your team preferences</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure team members, permissions, and notifications.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Cancel</Button>
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * A minimal card with only content, no header or footer.
 */
export const Minimal: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          This is a minimal card with only content. Perfect for displaying
          simple information without the need for a header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};
