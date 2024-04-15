import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { ItemPicker } from "."

const meta = {
	title: "Pickers/Radio Picker",
	component: ItemPicker,
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
} satisfies Meta<typeof ItemPicker>

export default meta
type Story = StoryObj<typeof ItemPicker>

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
				<ItemPicker
					{...args}
					onSelect={(value) => setArgs({ selected: value })}
				/>
			</View>
		)
	},
}
