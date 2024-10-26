import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { randomUUID } from "expo-crypto"
import { useEffect } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { SentryDiolog } from "./dialog"
const meta = {
	title: "Modals/SentryDiolog",
	component: SentryDiolog,
	decorators: [withSafeView],
	args: {
		visible: true,
	},
	argTypes: {},
} satisfies Meta<typeof SentryDiolog>

export default meta
type Story = StoryObj<typeof SentryDiolog>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		useEffect(() => {}, [])
		function onSelect(agree: boolean) {
			console.log(agree)
			setArgs({ visible: false })
		}
		function onDismiss() {
			setArgs({ visible: false })
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
				<SentryDiolog
					{...args}
					key={randomUUID()}
					onDismiss={onDismiss}
					onSubmit={onSelect}
				/>
			</View>
		)
	},
}
