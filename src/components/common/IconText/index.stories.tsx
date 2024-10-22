import { center } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { IconText } from "."

const meta = {
	title: "Common/IconText",
	component: IconText,
	decorators: [center],
	args: {
		icon: "pill",
	},
} satisfies Meta<typeof IconText>

export default meta
type Story = StoryObj<typeof IconText>

export const Primary: Story = {
	render: (args) => <IconText {...args} />,
}
