import { useAppTheme } from "@/theme"
import MaskedView from "@react-native-masked-view/masked-view"
import { useCallback } from "react"
import { FlatList, StyleSheet, View, type ViewToken } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Modal, Portal, Text } from "react-native-paper"
import { useHeaderPicker } from "./logic"

type IProps = {
	open: boolean
	onSelect: (monthIndex: number) => void
	monthIndex?: number
	minDate: Date
	maxDate: Date
	today?: Date
}

export function HeaderModal(props: IProps) {
	const { open } = props

	const {
		yearArray,
		monthNames,
		monthArray,
		monthIndex,
		setMonthIndex,
		yearIndex,
		setYearIndex,
		onDismiss,
	} = useHeaderPicker(props)

	// TODO check date between min max
	const theme = useAppTheme()

	const onViewChange = useCallback(
		(type: "year" | "month") =>
			(info: {
				viewableItems: ViewToken[]
				changed: ViewToken[]
			}) => {
				const { viewableItems } = info
				if (viewableItems.length === 0) return
				const middleIndex = Math.floor(viewableItems.length / 2)
				const middleItem = viewableItems[middleIndex]
				middleItem.index &&
					(type === "year"
						? setYearIndex(middleItem.index)
						: setMonthIndex(middleItem.index))
			},
		[setMonthIndex, setYearIndex],
	)

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
					onDismiss={onDismiss}
					contentContainerStyle={[
						styles.modal,
						{ backgroundColor: theme.colors.surface },
					]}
				>
					<View style={styles.container}>
						<View style={styles.content}>
							<MaskedView
								maskElement={
									<LinearGradient
										style={{ flex: 1 }}
										colors={["transparent", "white", "transparent"]}
									/>
								}
							>
								<View style={styles.selectedIndicator} />
								<FlatList
									contentContainerStyle={styles.flatListContainer}
									snapToInterval={48}
									data={monthArray}
									showsVerticalScrollIndicator={false}
									getItemLayout={(_x, i) => ({
										index: i,
										length: 48,
										offset: 48 * i,
									})}
									decelerationRate="fast"
									onScrollToIndexFailed={(x) => console.error(x)}
									initialScrollIndex={monthIndex}
									viewabilityConfig={{
										minimumViewTime: 20,
										viewAreaCoveragePercentThreshold: 60,
									}}
									onViewableItemsChanged={onViewChange("month")}
									renderItem={({ item: i }) => (
										<View style={styles.flatListItem}>
											<Text variant="titleLarge">{monthNames[i]}</Text>
										</View>
									)}
								/>
							</MaskedView>
							<MaskedView
								maskElement={
									<LinearGradient
										style={{ flex: 1 }}
										colors={["transparent", "white", "transparent"]}
									/>
								}
							>
								<View style={styles.selectedIndicator} />
								<FlatList
									contentContainerStyle={styles.flatListContainer}
									snapToInterval={48}
									data={[-4, -3, ...yearArray, -2, -1]}
									showsVerticalScrollIndicator={false}
									getItemLayout={(_x, i) => ({
										index: i,
										length: 48,
										offset: 48 * i,
									})}
									decelerationRate="fast"
									onScrollToIndexFailed={(x) => console.error(x)}
									initialScrollIndex={yearIndex - 2}
									viewabilityConfig={{
										minimumViewTime: 20,
										viewAreaCoveragePercentThreshold: 60,
									}}
									onViewableItemsChanged={onViewChange("year")}
									renderItem={({ item }) => (
										<View style={styles.flatListItem}>
											{item >= 0 && <Text variant="titleLarge">{item}</Text>}
										</View>
									)}
								/>
							</MaskedView>
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
	container: {
		padding: 8,
		paddingHorizontal: 16,
	},
	content: {
		flexDirection: "row",
		gap: 12,
		height: 240,
	},
	flatListContainer: { alignItems: "center" },
	flatListItem: {
		paddingHorizontal: 16,
		height: 48,
		justifyContent: "center",
	},
	selectedIndicator: {
		alignSelf: "center",
		position: "absolute",
		width: "80%",
		maxWidth: 50,
		top: 48 * 2,
		height: 48,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "grey",
	},
})
