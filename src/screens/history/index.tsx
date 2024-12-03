import { Calendar } from "@/components/calendar"
import type { RootStackScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useConfigState } from "@/stores/configStore"
import { useDebugStore } from "@/stores/debugStore"
import { ScrollView, StyleSheet, View } from "react-native"
import { Chip, IconButton, Text } from "react-native-paper"

export default function Page(_props: RootStackScreenProps<"Debug">) {
	return (
		<View style={styles.page}>
			{/* <Calendar date={new Date()} selectedDay={1} today={new Date()} /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	content: {
		padding: 12,
		gap: 12,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
