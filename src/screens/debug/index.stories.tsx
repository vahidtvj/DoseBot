import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import App from "."

const meta = {
	component: App,
	title: "Screens/Debug",
	decorators: [withAppbar],
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: (args) => {
		return <App {...args} />
	},
}
