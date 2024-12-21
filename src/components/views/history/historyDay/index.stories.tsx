import { data } from "@/db/mock/dose"
import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { HistoryDay } from "./index"

const meta = {
	component: HistoryDay,
	title: "Views/HistoryDay",
	decorators: [withAppbar],
	args: {
		data: data,
	},
} satisfies Meta<typeof HistoryDay>

export default meta

type Story = StoryObj<typeof HistoryDay>

export const Primary: Story = {
	render: (args) => {
		return <HistoryDay {...args} />
	},
}
