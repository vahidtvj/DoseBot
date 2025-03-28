import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import App from "."

const meta = {
	component: App,
	title: "Screens/HistoryDay",
	decorators: [withAppbar],
	args: {
		route: {
			params: {
				dayTimestamp: new Date(2024, 11, 1).getTime(),
			},
			name: "HistoryDay",
			key: "HistoryDay",
		},
		// @ts-ignore
		navigation: { setOptions: (_x) => {} },
	},
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: (args) => {
		return <App {...args} />
	},
}
