import { HistoryDay } from "@/components/views/history/historyDay"
import { getDoseHistoryFull } from "@/db"
import type { RootStackScreenProps } from "@/routes/types"
import { useDateUtils } from "@/utils"
import { endOfDay, startOfDay } from "date-fns"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"

export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"HistoryDay">) {
	const { formatDate } = useDateUtils()

	const date = new Date(route.params.dayTimestamp)
	const start = startOfDay(date)
	const end = endOfDay(date)

	const { data } = useLiveQuery(getDoseHistoryFull({ start, end }), [])

	useEffect(() => {
		navigation.setOptions({ title: formatDate(date) })
	}, [navigation, formatDate, date])

	return (
		<View style={styles.page}>
			<HistoryDay data={data} />
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	calendar: {
		alignItems: "center",
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
