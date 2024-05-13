import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { DatePicker } from "./datepicker"
const meta = {
	title: "Pickers/DatePicker",
	component: DatePicker,
	decorators: [withSafeView],
	args: {
		open: true,
	},
	argTypes: {},
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		useEffect(() => {}, [])
		function onSelect(date: Date) {
			console.log(date.toLocaleString())
			setArgs({ open: false })
		}
		function onDismiss() {
			setArgs({ open: false })
		}
		return (
			<View>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<Text variant="displayLarge">Random Text</Text>
				<DatePicker {...args} onSelect={onSelect} onDismiss={onDismiss} />
			</View>
		)
	},
}
