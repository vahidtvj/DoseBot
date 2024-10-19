import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export function LoadingPage() {
	return (
		<View style={styles.page}>
			<ActivityIndicator size={48} animating={true} />
		</View>
	)
}
const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
	},
})
