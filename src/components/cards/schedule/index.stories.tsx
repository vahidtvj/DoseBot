import { withSafeView } from "@/decorators"
import { data } from "@/models/mock/medicine"
import type { Meta, StoryObj } from "@storybook/react"
import { ScheduleCard } from "."

const meta = {
	title: "Cards/ScheduleCard",
	component: ScheduleCard,
	decorators: [withSafeView],
	args: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		data: data[0].schedule![0],
		edit: false,
		onRemove: () => {},
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
				item.schedule?.map((schedule, j) => (
					<ScheduleCard
						key={`${i}${j}`}
						data={schedule}
						edit={false}
						onRemove={() => {}}
					/>
				)),
			)}
		</>
	),
}
