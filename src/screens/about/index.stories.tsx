import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import App from "."

const meta = {
	component: App,
	title: "Screens/About",
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: (props) => <App {...props} />,
}
