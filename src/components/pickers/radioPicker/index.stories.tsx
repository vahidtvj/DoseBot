import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { RadioPicker } from "./picker"

const meta = {
	title: "Pickers/Radio Picker",
	component: RadioPicker,
	decorators: [withSafeView],
	args: {
		title: "Choose Language",
		values: [
			{
				key: "en",
				label: "English",
			},
			{
				key: "fa",
				label: "فارسی",
				subtitle: "Persian",
			},
			{
				key: "ar",
				label: "العربية",
				subtitle: "Arabic",
			},
		],
		open: true,
		selected: "en",
		onSelect: (_x) => {},
	},
	argTypes: {},
} satisfies Meta<typeof RadioPicker>

export default meta
type Story = StoryObj<typeof RadioPicker>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()

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
				<RadioPicker
					{...args}
					onSelect={(value) => setArgs({ selected: value })}
				/>
			</View>
		)
	},
}
