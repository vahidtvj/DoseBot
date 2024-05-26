import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { HeaderModal } from "./headerModal"
const meta = {
	title: "Pickers/DatePicker/header",
	component: HeaderModal,
	decorators: [withSafeView],
	args: {
		open: true,
		minDate: new Date(1900, 0),
		maxDate: new Date(2100, 0),
		onSelect: () => {},
	},
	argTypes: {},
} satisfies Meta<typeof HeaderModal>

export default meta
type Story = StoryObj<typeof HeaderModal>

export const Primary: Story = {
	render: (args) => {
		useEffect(() => {}, [])
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
				<HeaderModal {...args} />
			</View>
		)
	},
}
