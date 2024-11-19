import { data } from "@/db/mock/medicine"
import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { TravelCalcForm } from "."

const meta = {
	title: "Forms/TravelCalculator",
	component: TravelCalcForm,
	decorators: [withAppbar],
	args: {},
	argTypes: {},
} satisfies Meta<typeof TravelCalcForm>

export default meta
type Story = StoryObj<typeof TravelCalcForm>

export const Primary: Story = {
	render: (args) => <TravelCalcForm {...args} meds={data} />,
}
