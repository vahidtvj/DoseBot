import { MedIconMap } from "@/constants"
import type { IMedicineFull } from "@/db"
import { getNextDose } from "@/logic/getDosage"
import { hasEnded, hasStarted, useDateUtils } from "@/utils"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Card, IconButton, Text, useTheme } from "react-native-paper"

type IProps = IMedicineFull & {
	onPress?: (id: number) => void
	cardTitleRight?: (props: { size: number }) => React.ReactElement
	noNextDose?: boolean
}

export function MedicineCard(props: IProps) {
	const theme = useTheme()
	const { onPress, cardTitleRight, noNextDose, ...data } = props
	const { t } = useTranslation()
	const { getScheduleText, formatNextDose } = useDateUtils()

	const nextDose = useMemo(() => {
		if (noNextDose) return null
		return getNextDose(data)
	}, [noNextDose, data])

	return (
		<Card
			mode="contained"
			style={styles.card}
			onPress={() => onPress?.(data.id)}
		>
			<Card.Title
				title={data.name}
				titleVariant="titleLarge"
				left={(props) => (
					<IconButton
						icon={MedIconMap[data.type]}
						style={styles.icon}
						{...props}
					/>
				)}
				right={cardTitleRight}
			/>
			<Card.Content style={styles.content}>
				<View style={styles.body}>
					<View style={styles.left}>
						{data.schedules.map((schedule, i) => (
							<View key={i} style={styles.row}>
								<Text
									variant="bodyLarge"
									style={[
										schedule.endDate &&
											hasEnded(schedule.endDate) && {
												color: theme.colors.outline,
												textDecorationLine: "line-through",
											},
										!hasStarted(schedule.startDate) && {
											color: theme.colors.outline,
										},
									]}
								>
									{getScheduleText(schedule)}
								</Text>
								{schedule.type !== "Daily" && (
									<Text
										variant="bodySmall"
										style={{ color: theme.colors.secondary }}
									>
										×{schedule.dosing.length}
									</Text>
								)}
							</View>
						))}
						{!noNextDose && nextDose && (
							<View style={{ paddingTop: 6 }}>
								<Text variant="labelLarge">{`${t("nextDose")}: ${formatNextDose(
									nextDose.time,
								)}`}</Text>
							</View>
						)}
					</View>
				</View>
				<View style={styles.right}>
					{data.inventoryEnabled && (
						<Text
							variant="bodySmall"
							style={
								data.inventoryCount <= data.inventoryNotifyOn && {
									color: theme.colors.error,
								}
							}
						>
							{t("medicine.remaining", { count: data.inventoryCount })}
						</Text>
					)}
					{/* <View style={styles.alarmIcon}>
						{notification.enabled && <IconButton icon="bell" />}
					</View> */}
				</View>
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
	},
	card: {
		margin: 7,
	},
	content: {
		display: "flex",
		flexDirection: "row",
	},
	left: {
		display: "flex",
	},
	right: {
		justifyContent: "flex-end",
	},
	alarmIcon: {},
	row: {
		display: "flex",
		flexDirection: "row",
		// justifyContent: "space-between",
		gap: 10,
		alignItems: "baseline",
	},
	icon: {
		alignSelf: "center",
	},
})
