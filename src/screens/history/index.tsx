import { HistoryCalendar } from "@/components/views/history/historyCalendar"
import { type IDose, getDoseHistory } from "@/db"
import type { HomeTabScreenProps } from "@/routes/types"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"

export default function Page({ navigation }: HomeTabScreenProps<"History">) {
	const window = useRef<{ [key: number]: { start: Date; end: Date } }>([])
	const [data, setData] = useState<{ [key: number]: IDose[] }>([])

	const getNewData = useCallback(
		async (props: {
			[key: number]: {
				start: Date
				end: Date
			}
		}) => {
			const newData = Object.fromEntries(
				await Promise.all(
					Object.entries(props).map(async ([k, v]) => [
						Number(k),
						await getDoseHistory(v),
					]),
				),
			)
			window.current = props
			setData(newData)
		},
		[],
	)

	useFocusEffect(
		useCallback(() => {
			if (Object.keys(window.current).length === 0) return
			getNewData(window.current)
		}, [getNewData]),
	)

	return (
		<View style={styles.page}>
			<HistoryCalendar
				data={data}
				getNewData={getNewData}
				onSelect={(date) =>
					navigation.navigate("HistoryDay", { dayTimestamp: date.getTime() })
				}
			/>
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
