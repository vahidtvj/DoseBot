import { useAppTheme } from "@/theme"
import { useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, View, ViewToken } from "react-native"
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper"
import { Calendar } from "./calendar"
import { useDatePicker } from "./logic"

type IProps = {
	open: boolean
	onSelect: (date?: Date) => void
	date?: Date
	minDate?: Date
	maxDate?: Date
}

export function DatePicker(props: IProps) {
	const { i18n, t } = useTranslation()
	const isRTL = i18n.dir() === "rtl"

	const { open } = props
	const {
		format,
		index,
		onIndexChange,
		addMonths,
		selectedDay,
		setSelectedDay,
		monthArray,
		todayIndex,
		minDate,
		today,
		dateIndex,
		onSelect,
		onClose,
	} = useDatePicker(props)

	// TODO check date between min max
	const theme = useAppTheme()

	const prevMonth = () =>
		index > 0 && calendarRef.current?.scrollToIndex({ index: index - 1 })

	const nextMonth = () =>
		index < monthArray.length - 1 &&
		calendarRef.current?.scrollToIndex({ index: index + 1 })
	const thisMonth = () =>
		calendarRef.current?.scrollToIndex({ index: todayIndex })

	const calendarRef = useRef<FlatList>(null)
	const headerRef = useRef<FlatList>(null)

	const renderCalendarItem = useCallback(
		({ item: i }: { item: number }) => (
			<Calendar
				key={i}
				today={today}
				date={addMonths(minDate, i)}
				hasToday={i === todayIndex}
				selectedDay={selectedDay}
				onSelect={setSelectedDay}
			/>
		),
		[minDate, todayIndex, selectedDay, today, addMonths, setSelectedDay],
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

	return (
		<Portal>
			<View
				style={[
					styles.backdrop,
					{
						backgroundColor: theme.colors.backdrop,
						display: open ? "flex" : "none",
					},
				]}
			>
				<Modal
					visible={open}
					onDismiss={onClose}
					contentContainerStyle={[
						styles.modal,
						{ backgroundColor: theme.colors.surface },
					]}
				>
					<View style={styles.header}>
						<IconButton
							icon={isRTL ? "menu-right" : "menu-left"}
							onPress={prevMonth}
							size={32}
						/>
						{/* <TouchableOpacity onPress={prevMonth}>
							<Icon source={isRTL ? "menu-right" : "menu-left"} size={40} />
						</TouchableOpacity> */}
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
						<IconButton
							icon={isRTL ? "menu-left" : "menu-right"}
							onPress={nextMonth}
							size={32}
						/>
						{/* <TouchableOpacity onPress={nextMonth}>
							<Icon source={isRTL ? "menu-left" : "menu-right"} size={40} />
						</TouchableOpacity> */}
					</View>

					<View style={styles.calendarContet}>
						<FlatList
							removeClippedSubviews
							maxToRenderPerBatch={3}
							updateCellsBatchingPeriod={50}
							windowSize={3}
							ref={calendarRef}
							snapToAlignment="center"
							decelerationRate="fast"
							snapToInterval={styles.calendarContet.width}
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
								length: styles.calendarContet.width,
								offset: styles.calendarContet.width * i,
							})}
							renderItem={renderCalendarItem}
							data={monthArray}
						/>
					</View>
					<View style={styles.buttons}>
						{/* <Button
							onPress={thisMonth}
							mode="text"
							textColor={theme.colors.secondary}
							icon="calendar-today"
						>
							{t("today")}
						</Button> */}
						<IconButton
							icon="calendar-today"
							onPress={thisMonth}
							iconColor={theme.colors.secondary}
						/>
						<View style={styles.buttonsGroupEnd}>
							<Button mode="contained-tonal" onPress={onClose}>
								{t("cancel")}
							</Button>
							<Button mode="contained" onPress={onSelect}>
								{t("select")}
							</Button>
						</View>
					</View>
				</Modal>
			</View>
		</Portal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
	},
	modal: {
		margin: 20,
		borderRadius: 12,
		alignSelf: "center",
	},
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
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 12,
		alignItems: "center",
	},
	buttonsGroupEnd: {
		flexDirection: "row",
		gap: 12,
	},
	headerContent: {
		height: 48,
	},
	calendarContet: {
		width: 340,
	},
})
