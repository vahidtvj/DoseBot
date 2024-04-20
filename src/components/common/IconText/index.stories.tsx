import { center } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { DoseView } from "."

const meta = {
	title: "Common/IconText",
	component: DoseView,
	decorators: [center],
	args: {
		icon: "pill",
	},
} satisfies Meta<typeof DoseView>

export default meta
type Story = StoryObj<typeof DoseView>

export const Primary: Story = {
	render: (args) => <DoseView {...args} />,
}
