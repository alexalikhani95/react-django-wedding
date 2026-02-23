import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Input> = {
  title: "ui/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "centered" },
  args: {
    placeholder: "Placeholder",
    disabled: false,
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => {
    const id = useId()
    return (
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor={id}>Email</Label>
        <Input id={id} type="email" {...args} />
      </div>
    )
  },
  args: { placeholder: "you@example.com" },
}

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
}
