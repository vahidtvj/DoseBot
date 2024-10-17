import { data } from "@/db/mock/medicine"
import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { ScheduleCard } from "."

const meta = {
	title: "Cards/ScheduleCard",
	component: ScheduleCard,
	decorators: [withSafeView],
	args: {
		data: data[0].schedules[0],
	},
} satisfies Meta<typeof ScheduleCard>

export default meta
type Story = StoryObj<typeof ScheduleCard>

export const Primary: Story = {
	render: (args) => <ScheduleCard {...args} />,
}

export const Multiple: Story = {
	render: () => (
		<>
			{data.map((item, i) =>
				item.schedules.map((schedule, j) => (
					<ScheduleCard key={`${i}${j}`} data={schedule} />
				)),
			)}
		</>
	),
}
