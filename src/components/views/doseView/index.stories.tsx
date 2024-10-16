import { data } from "@/db/mock/dose"
import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { DoseView } from "."

const meta = {
	title: "View/DoseView",
	component: DoseView,
	decorators: [withSafeView],
	args: {
		data: data,
		changeStatus: () => {},
	},
} satisfies Meta<typeof DoseView>

export default meta
type Story = StoryObj<typeof DoseView>

export const Primary: Story = {
	render: (args) => <DoseView {...args} />,
}
