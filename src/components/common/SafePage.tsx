import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
type Props = {
	children: React.ReactNode
}
export function SafePage({ children }: Props) {
	return <SafeAreaView style={styles.page}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
})
