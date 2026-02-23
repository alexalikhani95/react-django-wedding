import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * A set of checkable buttons—known as radio items—where no more than one of
 * which can be checked at a time.
 */
const meta: Meta<typeof RadioGroup> = {
  title: "ui/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description:
        "When true, prevents the user from interacting with the group.",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the group.",
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default vertical radio group with three options.
 */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option-one">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-one" id="option-one" />
        <label
          htmlFor="option-one"
          className="text-sm font-medium cursor-pointer"
        >
          Option one
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-two" id="option-two" />
        <label
          htmlFor="option-two"
          className="text-sm font-medium cursor-pointer"
        >
          Option two
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option-three" id="option-three" />
        <label
          htmlFor="option-three"
          className="text-sm font-medium cursor-pointer"
        >
          Option three
        </label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Horizontal layout using flex row.
 */
export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="yes" className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yes" id="yes" />
        <label htmlFor="yes" className="text-sm font-medium cursor-pointer">
          Yes
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="no" id="no" />
        <label htmlFor="no" className="text-sm font-medium cursor-pointer">
          No
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="maybe" id="maybe" />
        <label htmlFor="maybe" className="text-sm font-medium cursor-pointer">
          Maybe
        </label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Entire group is disabled.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <RadioGroup {...args} defaultValue="one">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="one" />
        <label htmlFor="one" className="text-sm font-medium cursor-pointer">
          One
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="two" />
        <label htmlFor="two" className="text-sm font-medium cursor-pointer">
          Two
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="three" id="three" />
        <label htmlFor="three" className="text-sm font-medium cursor-pointer">
          Three
        </label>
      </div>
    </RadioGroup>
  ),
}
