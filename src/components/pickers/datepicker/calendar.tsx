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
}
export function Calendar(props: Props) {
	const { hasToday, selectedDay, onSelect } = props
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
					return (
						<TouchableWithoutFeedback
							onPress={
								!isActive ? undefined : () => onSelect?.(data.item as number)
							}
						>
							<View
								style={[
									styles.calendarItem,
									isToday && {
										backgroundColor: theme.colors.secondary,
									},
									isSelected && {
										backgroundColor: theme.colors.primary,
									},
								]}
							>
								<Text
									variant={data.index < 7 ? "labelSmall" : "bodyLarge"}
									style={[
										data.index < 7
											? { color: theme.colors.primary }
											: !isActive && {
													color: theme.colors.onSurfaceDisabled,
													// display: 'none'
											  },
										isToday && {
											color: theme.colors.onSecondary,
										},
										isSelected && {
											color: theme.colors.onPrimary,
										},
									]}
								>
									{data.item}
								</Text>
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
})
