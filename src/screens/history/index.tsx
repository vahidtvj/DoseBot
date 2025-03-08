import { MedicineCard } from "@/components/cards/medicine"
import { IconText } from "@/components/common/IconText"
import { ItemPicker } from "@/components/pickers/itemPicker"
import { HistoryCalendar } from "@/components/views/history/historyCalendar"
import { MedIconMap } from "@/constants"
import {
	type IDose,
	getAllMeds,
	getDoseHistory,
	getDoseSummery,
	getMed,
} from "@/db"
import type { HomeTabScreenProps } from "@/routes/types"
import { useAppTheme } from "@/theme"
import { useFocusEffect } from "@react-navigation/native"
import { addDays } from "date-fns"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, View } from "react-native"
import { Button, Chip, Text } from "react-native-paper"

export default function Page({ navigation }: HomeTabScreenProps<"History">) {
	const [filterOpen, setFilterOpen] = useState(false)
	const [filter, setFilter] = useState<number>(0)
	const [pageMode, setPageMode] = useState<"summary" | "calendar">("calendar")
	const [summery, setSummery] = useState<
		{
			medId: number
			data: {
				range: "lastMonth" | "last6Month" | "all"
				confirmed: number
				total: number
			}[]
		}[]
	>([])

	const window = useRef<{ [key: number]: { start: Date; end: Date } }>([])
	const [data, setData] = useState<{ [key: number]: IDose[] }>([])

	const { data: filterMed } = useLiveQuery(getMed(filter), [filter])
	const { data: allMeds } = useLiveQuery(getAllMeds)

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
						await getDoseHistory({
							...v,
							medId: filter === 0 ? undefined : filter,
						}),
					]),
				),
			)
			window.current = props
			setData(newData)
		},
		[filter],
	)

	useFocusEffect(
		useCallback(() => {
			if (pageMode === "summary") {
				const now = new Date()
				const dateRanges = {
					lastMonth: { start: addDays(now, -30), end: now },
					last6Month: { start: addDays(now, -180), end: now },
					all: { start: null, end: null },
				}
				getDoseSummery({ dateRanges }).then((data) => setSummery(data))
			} else if (pageMode === "calendar") {
				if (Object.keys(window.current).length !== 0) getNewData(window.current)
			}
		}, [getNewData, pageMode]),
	)

	const { t } = useTranslation()

	const onFilterSelect = useCallback((value?: number) => {
		value !== undefined && setFilter(value)
		setFilterOpen(false)
	}, [])

	return (
		<View style={styles.page}>
			{pageMode === "calendar" ? (
				<View style={styles.page}>
					<View style={{}}>
						<View
							style={{
								padding: 12,
								paddingHorizontal: 48,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<IconText variant="bodyLarge" icon="filter">
								{`${t("filter")}:`}
							</IconText>
							<Chip
								icon={
									filter && filterMed?.type
										? MedIconMap[filterMed.type]
										: "filter"
								}
								onPress={() => setFilterOpen(true)}
							>
								{filter ? filterMed?.name : t("allMeds")}
							</Chip>
						</View>
					</View>
					<HistoryCalendar
						data={data}
						getNewData={getNewData}
						onSelect={(date) =>
							navigation.navigate("HistoryDay", {
								dayTimestamp: date.getTime(),
							})
						}
					/>
				</View>
			) : (
				<View style={styles.page}>
					<FlatList
						data={allMeds}
						keyExtractor={(x) => String(x.id)}
						renderItem={({ item }) => (
							<MedicineCard
								{...item}
								schedules={[]}
								inventoryEnabled={false}
								extraData={
									<View style={{ alignSelf: "flex-start" }}>
										{summery
											.find((x) => x.medId === item.id)
											?.data.map((sum) => (
												<View
													style={{
														flexDirection: "row",
														justifyContent: "space-between",
														gap: 12,
													}}
													key={sum.range}
												>
													<Text variant="labelLarge">{`${t(
														`medHistory.${sum.range}`,
													)} :`}</Text>
													<View style={{ flexDirection: "row", gap: 6 }}>
														<Text>{`${sum.confirmed}/${sum.total}`}</Text>
														<Text style={{}}>{`${
															Math.floor((100 * sum.confirmed) / sum.total) || 0
														} %`}</Text>
													</View>
												</View>
											))}
									</View>
								}
							/>
						)}
					/>
				</View>
			)}
			<View style={{ padding: 12, alignItems: "center", width: "100%" }}>
				<Button
					mode="contained"
					style={{ maxWidth: 340, width: "100%" }}
					onPress={() =>
						setPageMode(pageMode === "calendar" ? "summary" : "calendar")
					}
				>
					{pageMode === "calendar" ? t("summary") : t("calendar")}
				</Button>
			</View>
			<ItemPicker
				open={filterOpen}
				onSelect={onFilterSelect}
				selected={filter}
				values={[
					{ key: 0, label: "All Medications" },
					...allMeds.map((x) => ({
						key: x.id,
						label: x.name,
						icon: MedIconMap[x.type],
					})),
				]}
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
