import { useAppTheme } from "@/theme"
import { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const withSafeView = (Story: StoryFn, _context: StoryContext) => {
	const theme = useAppTheme()
	return (
		<SafeAreaView
			style={[styles.page, { backgroundColor: theme.colors.background }]}
		>
			<Story />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
})
