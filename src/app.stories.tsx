import type { Meta, StoryObj } from "@storybook/react"
import App from "./main"

const meta = {
	component: App,
	title: "App",
	argTypes: {},
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: () => {
		return <App />
	},
}
