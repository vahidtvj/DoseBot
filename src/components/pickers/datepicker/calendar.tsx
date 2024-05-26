import { useAppTheme } from "@/theme"
import {
	FlatList,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import { Text } from "react-native-paper"
import { useCalendar } from "./logic"

type Props = {
	date: Date
	onSelect?: (day: number) => void
	hasToday: boolean
	selectedDay: number
	today: Date
	start?: number
	end?: number
}
export function Calendar(props: Props) {
	const { hasToday, selectedDay, onSelect, end, start } = props
	const { todayDate, days, isActiveDay } = useCalendar(props)

	const theme = useAppTheme()

	return (
		<View style={styles.calendar}>
			<FlatList
				data={days}
				numColumns={7}
				contentContainerStyle={styles.itemGap}
				columnWrapperStyle={styles.itemGap}
				renderItem={(data) => {
					const isActive = isActiveDay(data.index, data.item)
					const isSelected = isActive && (data.item as number) === selectedDay
					const isToday = isActive && hasToday && todayDate === data.item
					const isAllowed =
						isActive &&
						(!end || (data.item as number) <= end) &&
						(!start || (data.item as number) >= start)
					return (
						<TouchableWithoutFeedback
							onPress={
								!isAllowed ? undefined : () => onSelect?.(data.item as number)
							}
						>
							<View
								style={[
									styles.calendarItem,
									isSelected && {
										backgroundColor: theme.colors.primary,
									},
								]}
							>
								<Text
									variant={data.index < 7 ? "titleSmall" : "bodyLarge"}
									style={[
										!isAllowed && {
											color: theme.colors.onSurfaceDisabled,
											// display: 'none'
										},
										!isActive && {
											color: theme.colors.surfaceDisabled,
											// display: 'none'
										},
										data.index < 7 && { color: theme.colors.primary },
										isSelected && {
											color: theme.colors.onPrimary,
										},
									]}
								>
									{data.item}
								</Text>
								{isToday && !isSelected && (
									<View
										style={[
											styles.today,
											{ backgroundColor: theme.colors.primary },
										]}
									/>
								)}
							</View>
						</TouchableWithoutFeedback>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	calendar: {
		padding: 12,
		flexDirection: "row",
	},
	itemGap: {
		gap: 6,
	},
	calendarItem: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	today: {
		width: 16,
		height: 4,
		marginTop: 1,
		marginHorizontal: 1,
		borderRadius: 2,
		opacity: 1,
	},
})
