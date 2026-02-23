import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Checkbox> = {
  title: "ui/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { checked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
}

export const WithLabel: Story = {
  render: (args) => {
    const id = useId()
    return (
      <div className="flex items-center gap-2">
        <Checkbox id={id} {...args} />
        <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
          Accept terms and conditions
        </Label>
      </div>
    )
  },
}
