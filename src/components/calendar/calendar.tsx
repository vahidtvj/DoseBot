import { useAppTheme } from "@/theme"
import { randomUUID } from "expo-crypto"
import {
	type RefObject,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
	FlatList,
	type StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	type ViewStyle,
	type ViewToken,
} from "react-native"
import { IconButton, Text } from "react-native-paper"
import type { Methods } from "."
import { HeaderModal } from "./headerModal"
import { useCalendar } from "./logic"
import { MonthView } from "./monthView"

type Props<T extends string> = {
	onChange?: (date: Date) => void
	onSelect?: (date: Date) => void
	date: Date
	minDate: Date
	maxDate: Date
	today: Date
	showSelection?: boolean
	noToday?: boolean
	todayStyle?: "bar" | "color"
	itemStyle?: {
		active?: StyleProp<ViewStyle>
		inactive?: StyleProp<ViewStyle>
		weekdays?: StyleProp<ViewStyle>
	}
	control?: RefObject<Methods>
	noHeader?: boolean
	dots?: { [monthIndex: number]: (T | undefined)[] }
	dotsStyle?: { [key in T]: StyleProp<ViewStyle> }
	onIndexChange?: (newIndex: number, oldIndex?: number) => void
}

export function Calendar<T extends string>(props: Props<T>) {
	const { i18n } = useTranslation()
	const isRTL = i18n.dir() === "rtl"
	const {
		itemStyle,
		showSelection,
		noToday,
		todayStyle = "bar",
		control,
		noHeader,
		dots,
		dotsStyle,
	} = props
	const {
		format,
		index,
		onIndexChange,
		addMonths,
		selectedDay,
		monthArray,
		todayIndex,
		minDate,
		maxDate,
		today,
		dateIndex,
		onSelectDay,
		headerIsOpen,
		setHeaderOpen,
		getDate,
	} = useCalendar(props)

	function onHeaderSelect(index: number) {
		setHeaderOpen(false)
		calendarRef.current?.scrollToIndex({ index, animated: false })
		headerRef.current?.scrollToIndex({ index, animated: false })
	}

	const prevMonth = () =>
		index > 0 && calendarRef.current?.scrollToIndex({ index: index - 1 })
	const nextMonth = () =>
		index < monthArray.length - 1 &&
		calendarRef.current?.scrollToIndex({ index: index + 1 })
	const thisMonth = () =>
		calendarRef.current?.scrollToIndex({ index: todayIndex })

	useImperativeHandle(control, () => ({
		thisMonth,
		prevMonth,
		nextMonth,
	}))

	const calendarRef = useRef<FlatList>(null)
	const headerRef = useRef<FlatList>(null)

	const renderCalendarItem = useCallback(
		({ item: i }: { item: number }) => (
			<MonthView
				key={i}
				today={today}
				noToday={noToday}
				month={addMonths(minDate, i)}
				selectedDay={selectedDay}
				onSelect={onSelectDay}
				end={i === monthArray.length - 1 ? getDate(maxDate) : undefined}
				start={i === 0 ? getDate(minDate) : undefined}
				itemStyle={itemStyle}
				showSelection={showSelection}
				todayStyle={todayStyle}
				dots={dots?.[i]}
				dotsStyle={dotsStyle}
			/>
		),
		[
			dots,
			dotsStyle,
			minDate,
			selectedDay,
			today,
			addMonths,
			onSelectDay,
			monthArray,
			getDate,
			maxDate,
			itemStyle,
			showSelection,
			noToday,
			todayStyle,
		],
	)

	const renderCalendarHeader = useCallback(
		({ index: i }: { index: number }) => {
			const dateHeader = addMonths(minDate, i)
			return (
				<View
					style={{
						flexDirection: "row",
						gap: 12,
						height: 48,
						alignItems: "center",
						justifyContent: "center",
						minWidth: 172,
					}}
				>
					<Text variant="titleLarge">{format(dateHeader, "MMMM")}</Text>
					<Text variant="titleLarge">{format(dateHeader, "yyyy")}</Text>
				</View>
			)
		},
		[minDate, format, addMonths],
	)

	const onViewChange = (info: {
		viewableItems: ViewToken[]
		changed: ViewToken[]
	}) => {
		if (
			info.changed.length === 0 ||
			!info.changed[0].isViewable ||
			info.changed[0].index === null
		)
			return
		onIndexChange(info.changed[0].item)
		headerRef.current?.scrollToIndex({ index: info.changed[0].index })
	}
	const [calendarContentW, setCalendarContentW] = useState(340)

	return (
		<View>
			{!noHeader && (
				<View style={styles.header}>
					<IconButton
						icon={isRTL ? "menu-right" : "menu-left"}
						onPress={prevMonth}
						size={32}
					/>
					<TouchableOpacity onPress={() => setHeaderOpen(true)}>
						<View style={styles.headerContent}>
							<FlatList
								removeClippedSubviews
								maxToRenderPerBatch={3}
								updateCellsBatchingPeriod={50}
								windowSize={3}
								ref={headerRef}
								contentContainerStyle={{ alignItems: "center" }}
								data={monthArray}
								pagingEnabled
								snapToAlignment="center"
								decelerationRate="fast"
								snapToInterval={styles.headerContent.height}
								showsVerticalScrollIndicator={false}
								disableIntervalMomentum
								scrollEnabled={false}
								initialNumToRender={3}
								initialScrollIndex={dateIndex}
								onScrollToIndexFailed={(x) => console.error(x)}
								getItemLayout={(_x, i) => ({
									index: i,
									length: styles.headerContent.height,
									offset: styles.headerContent.height * i,
								})}
								renderItem={renderCalendarHeader}
							/>
						</View>
					</TouchableOpacity>
					<IconButton
						icon={isRTL ? "menu-left" : "menu-right"}
						onPress={nextMonth}
						size={32}
					/>
				</View>
			)}

			<View style={styles.calendarContent}>
				<FlatList
					onLayout={(e) => setCalendarContentW(e.nativeEvent.layout.width)}
					removeClippedSubviews
					maxToRenderPerBatch={3}
					updateCellsBatchingPeriod={50}
					windowSize={3}
					ref={calendarRef}
					snapToAlignment="center"
					decelerationRate="fast"
					snapToInterval={calendarContentW}
					disableIntervalMomentum
					horizontal
					initialNumToRender={3}
					initialScrollIndex={dateIndex}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScrollToIndexFailed={(x) => console.error(x)}
					onViewableItemsChanged={onViewChange}
					viewabilityConfig={{
						minimumViewTime: 20,
						viewAreaCoveragePercentThreshold: 60,
					}}
					getItemLayout={(_x, i) => ({
						index: i,
						length: calendarContentW,
						offset: calendarContentW * i,
					})}
					renderItem={renderCalendarItem}
					data={monthArray}
				/>
			</View>
			{/* <View style={styles.buttons}>
				<IconButton
					icon={isRTL ? "arrow-down-right" : "arrow-down-left"}
					onPress={thisMonth}
					iconColor={theme.colors.secondary}
				/>
			</View> */}

			<HeaderModal
				key={randomUUID()}
				minDate={minDate}
				maxDate={maxDate}
				monthIndex={index}
				onSelect={onHeaderSelect}
				open={headerIsOpen}
				today={today}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		// backgroundColor: "#282c34",
		borderTopStartRadius: 12,
		borderTopEndRadius: 12,
		padding: 8,
		paddingHorizontal: 16,
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerContent: {
		height: 48,
		paddingHorizontal: 12,
	},
	calendarContent: {
		width: 340,
	},
})
