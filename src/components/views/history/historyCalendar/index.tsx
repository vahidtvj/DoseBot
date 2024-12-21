import { Calendar } from "@/components/calendar"
import type { IDose } from "@/db"
import { useAppTheme } from "@/theme"
import { useDateFunc } from "@/utils"
import { useCallback, useEffect, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"

type Dots = "skip" | "pending" | "confirm" | undefined

type Props = {
	data: { [key: number]: IDose[] }
	getNewData: (props: { [key: number]: { start: Date; end: Date } }) => void
	onSelect: (date: Date) => void
}

const useDoseHistory = (props: Props) => {
	const { getDate, addMonths, startOfMonth, endOfMonth } = useDateFunc()
	const minDate = new Date(1900, 0)
	const maxDate = new Date(2100, 0)

	const data = useMemo(() => {
		return Object.fromEntries(
			Object.entries(props.data).map(([key, value]) => {
				const arr: Dots[] = Array.from({ length: 32 }, () => undefined)
				for (const dose of value) {
					const day = getDate(dose.time) - 1
					if (arr[day] === "skip") continue
					if (arr[day] === "pending" && dose.status === "confirm") continue
					arr[day] = dose.status
				}
				return [Number(key), arr]
			}),
		)
	}, [props.data, getDate])

	const onIndexChange = useCallback(
		(newIndex: number) => {
			props.getNewData({
				[newIndex - 1]: {
					start: startOfMonth(addMonths(minDate, newIndex - 1)),
					end: endOfMonth(addMonths(minDate, newIndex - 1)),
				},
				[newIndex]: {
					start: startOfMonth(addMonths(minDate, newIndex)),
					end: endOfMonth(addMonths(minDate, newIndex)),
				},
				[newIndex + 1]: {
					start: startOfMonth(addMonths(minDate, newIndex + 1)),
					end: endOfMonth(addMonths(minDate, newIndex + 1)),
				},
			})
		},
		[props.getNewData, minDate, startOfMonth, endOfMonth, addMonths],
	)

	return { data, onIndexChange, minDate, maxDate }
}

export function HistoryCalendar(props: Props) {
	const { data, onIndexChange, minDate, maxDate } = useDoseHistory(props)

	const theme = useAppTheme()
	return (
		<View style={styles.page}>
			<View style={styles.calendar}>
				<Calendar
					date={new Date()}
					today={new Date()}
					minDate={minDate}
					maxDate={maxDate}
					itemStyle={{
						active: { backgroundColor: theme.colors.surfaceDisabled },
					}}
					todayStyle="color"
					onSelect={props.onSelect}
					onIndexChange={onIndexChange}
					dots={data}
					dotsStyle={{
						pending: { borderColor: theme.colors.onSurface },
						skip: { borderColor: theme.colors.red },
						confirm: { borderColor: "green" },
					}}
				/>
			</View>
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
