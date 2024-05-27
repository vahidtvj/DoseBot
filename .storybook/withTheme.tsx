import type { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useAppTheme } from "../src/theme"

export const withTheme = (Story: StoryFn, _context: StoryContext) => {
	const theme = useAppTheme()
	return (
		<View style={[styles.page, { backgroundColor: theme.colors.background }]}>
			<Story />
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
})
