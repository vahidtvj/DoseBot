import { AppLaunch } from "@/logic/events"
import { useDoseStore } from "@/stores/doseStore"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"
import App from "./main"

const meta = {
	component: App,
	title: "App",
	argTypes: {
		clearDoses: {
			control: { type: "boolean" },
		},
		runEvent: {
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof App> & {
	argTypes: { clearDoses: object; runEvent: object }
}

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: () => {
		const [args2, setArgs] = useArgs()
		const clearDoses = args2.clearDoses as boolean
		const runEvent = args2.runEvent as boolean
		useEffect(() => {
			if (clearDoses === true) {
				setArgs({ clearDoses: false })
				useDoseStore.setState({ data: [] })
			}
			if (runEvent === true) {
				setArgs({ runEvent: false })
				AppLaunch()
			}
		}, [clearDoses, runEvent, setArgs])

		return <App />
	},
}
