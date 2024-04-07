import { StoryContext, StoryFn } from "@storybook/react"
import { Appbar, useTheme } from "react-native-paper"

export const withAppbar = (Story: StoryFn, _context: StoryContext) => {
	const theme = useTheme()
	return (
		<>
			<Appbar.Header style={{ backgroundColor: theme.colors.backdrop }}>
				<Appbar.BackAction onPress={() => {}} />
				<Appbar.Content title="Test Appbar" />
				<Appbar.Action icon="calendar" onPress={() => {}} />
				<Appbar.Action icon="magnify" onPress={() => {}} />
			</Appbar.Header>
			<Story />
		</>
	)
}
