import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { ItemPicker } from "."

const meta = {
	title: "Pickers/Item Picker",
	component: ItemPicker,
	decorators: [withSafeView],
	args: {
		// title: "Medication form",
		values: [
			{
				key: "pill",
				icon: "pill",
				label: "Pill",
			},
			{
				key: "injection",
				icon: "needle",
				label: "Injection",
			},
			{
				key: "iv",
				icon: "iv-bag",
				label: "IV",
			},
			{
				key: "drop",
				icon: "eyedropper",
				label: "Drop",
			},
			{
				key: "suppository",
				icon: "$suppository",
				label: "Suppository",
			},
			{
				key: "inhaler",
				icon: "$inhaler",
				label: "Inhaler",
			},
			{
				key: "syrup",
				icon: "$syrup-bottle2",
				label: "Syrup",
			},
			{
				key: "spray",
				icon: "spray",
				label: "Spray",
			},
			{
				key: "patch",
				icon: "bandage",
				label: "Patch",
			},
			{
				key: "generic",
				icon: "medical-bag",
				label: "Generic",
			},
		],
		open: true,
		selected: "pill",
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
