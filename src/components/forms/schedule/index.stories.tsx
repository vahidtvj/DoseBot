import { data } from "@/db/mock/medicine"
import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { ScheduleForm } from "."

const meta = {
	title: "Forms/Schedule",
	component: ScheduleForm,
	decorators: [withAppbar],
	args: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		data: data[0].schedules![0],
	},
	argTypes: {},
} satisfies Meta<typeof ScheduleForm>

export default meta
type Story = StoryObj<typeof ScheduleForm>

export const Primary: Story = {
	render: (args) => <ScheduleForm {...args} />,
}

export const Create: Story = {
	render: (args) => <ScheduleForm {...args} data={undefined} />,
}
