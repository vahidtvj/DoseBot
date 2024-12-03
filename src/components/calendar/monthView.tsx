import { useAppTheme } from "@/theme"
import {
	FlatList,
	type StyleProp,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	type ViewStyle,
} from "react-native"
import { Text } from "react-native-paper"
import { useMonthView } from "./logic"

type Props<T extends string> = {
	month: Date
	onSelect?: (day: number) => void
	selectedDay?: number
	today: Date
	start?: number
	end?: number
	itemStyle?: {
		active?: StyleProp<ViewStyle>
		inactive?: StyleProp<ViewStyle>
		weekdays?: StyleProp<ViewStyle>
	}
	dots?: (T | undefined)[]
	dotsStyle?: { [key in T]: StyleProp<ViewStyle> }
	showSelection?: boolean
	noToday?: boolean
	todayStyle?: "bar" | "color"
}
export function MonthView<T extends string>(props: Props<T>) {
	const {
		selectedDay,
		onSelect,
		end,
		start,
		itemStyle,
		dots,
		dotsStyle,
		showSelection,
		todayStyle = "bar",
		noToday,
	} = props
	const { todayDate, days, isActiveDay } = useMonthView(props)

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
					const isSelected =
						isActive &&
						showSelection &&
						selectedDay !== undefined &&
						(data.item as number) === selectedDay
					const isToday =
						!noToday &&
						isActive &&
						todayDate !== undefined &&
						todayDate === data.item
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
									isActive && itemStyle?.active,
									!isActive && itemStyle?.inactive,
									data.index < 7 && itemStyle?.weekdays,
									isToday &&
										todayStyle === "color" && {
											backgroundColor: theme.colors.primaryContainer,
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
								{isActive &&
									dots &&
									typeof data.item === "number" &&
									dots[data.item - 1] !== undefined && (
										<View
											style={[
												{
													borderWidth: 3,
													borderRadius: 100,
													borderColor: theme.colors.primary,
												},
												dotsStyle?.[dots[data.item - 1]],
											]}
										/>
									)}
								{todayStyle === "bar" && isToday && !isSelected && (
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
