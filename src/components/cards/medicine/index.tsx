import { type IMedicine, MedIconMap } from "@/models"
import { hasEnded, hasStarted, useDateUtils } from "@/utils"
import { compareAsc } from "date-fns"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Avatar, Card, IconButton, Text, useTheme } from "react-native-paper"

type IProps = IMedicine & { onPress?: (id: string) => void }

export function MedicineCard(props: IProps) {
	const theme = useTheme()
	const { name, inventory, schedule, notification, onPress, id, type } = props
	const { t } = useTranslation()
	const { getScheduleText } = useDateUtils()

	return (
		<Card mode="contained" style={styles.card} onPress={() => onPress?.(id)}>
			<Card.Title
				title="Acetaminophen"
				titleVariant="titleLarge"
				left={(props) => (
					<IconButton icon={MedIconMap[type]} style={styles.icon} {...props} />
				)}
			/>
			<Card.Content style={styles.content}>
				<View style={styles.body}>
					<View style={styles.left}>
						{schedule
							?.sort((a, b) => compareAsc(a.startDate, b.startDate))
							.map((schedule, i) => (
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
					</View>
				</View>
				<View style={styles.right}>
					{inventory.enabled && (
						<Text
							variant="bodySmall"
							style={
								inventory.count <= inventory.notifyOn && {
									color: theme.colors.error,
								}
							}
						>
							{t("medicine.remaining", { count: inventory.count })}
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
