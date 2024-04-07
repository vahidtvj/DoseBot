import { StoryContext, StoryFn } from "@storybook/react"
import { StyleSheet, View } from "react-native"

export const center = (Story: StoryFn, _context: StoryContext) => {
	return (
		<View style={styles.view}>
			<Story />
		</View>
	)
}
const styles = StyleSheet.create({
	view: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
})
