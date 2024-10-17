import { withAppbar } from "@/decorators"
// import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import App from "."

const meta = {
	component: App,
	title: "Screens/Overview",
	decorators: [withAppbar],
	// argTypes: {
	// 	refill: {
	// 		control: { type: "boolean" },
	// 	},
	// },
} satisfies Meta<typeof App>
//  & { argTypes: { refill: object } }

export default meta

type Story = StoryObj<typeof App>

export const Primary: Story = {
	render: (args) => {
		// const [args2, setArgs] = useArgs()
		// const refill = args2.refill as boolean
		// useEffect(() => {
		// 	if (refill === true) {
		// 		setArgs({ refill: false })
		// 		fillDoseStore()
		// 	}
		// }, [refill, setArgs])

		return <App {...args} />
	},
}
