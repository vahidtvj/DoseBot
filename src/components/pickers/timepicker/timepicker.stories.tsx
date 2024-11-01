import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { randomUUID } from "expo-crypto"
import { useEffect } from "react"
import { I18nManager, View } from "react-native"
import { Text } from "react-native-paper"
import { TimePicker } from "./timepicker"
const meta = {
	title: "Pickers/TimePicker",
	component: TimePicker,
	decorators: [withSafeView],
	args: {
		open: true,
		mode: "clock",
		use24Hour: false,
	},
	argTypes: {},
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof TimePicker>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		useEffect(() => {}, [])
		function onSelect(date: Date, mode: "clock" | "input") {
			console.log(date.toLocaleString())
			console.log(mode)

			setArgs({ open: false })
		}
		function onDismiss() {
			setArgs({ open: false })
		}
		const rtl = I18nManager.isRTL
		console.log(rtl)

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
				<TimePicker
					{...args}
					key={randomUUID()}
					onSelect={onSelect}
					onDismiss={onDismiss}
					rtl={rtl}
				/>
			</View>
		)
	},
}
