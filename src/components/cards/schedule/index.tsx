import { Schedule } from "@/models"
import { useAppTheme } from "@/theme"
import { formatDoseTime, hasEnded, hasStarted, useDateUtils } from "@/utils"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Card, IconButton, Text } from "react-native-paper"

type Props = {
	data: Schedule
	edit: boolean
	onRemove?: () => void
	onPress?: () => void
}

export function ScheduleCard(props: Props) {
	const { data, edit, onRemove, onPress } = props
	const { dosing, startDate, endDate } = data
	const theme = useAppTheme()
	const { t } = useTranslation()

	const { getScheduleText } = useDateUtils()

	return (
		<Card mode="contained" style={styles.card} onPress={() => onPress?.()}>
			<Card.Content style={styles.content}>
				{edit && (
					<IconButton
						icon="minus-circle-outline"
						iconColor={theme.colors.red}
						onPress={onRemove}
					/>
				)}
				<View style={styles.body}>
					<View style={styles.row}>
						<Text
							variant="titleMedium"
							style={[
								endDate &&
									hasEnded(endDate) && {
										color: theme.colors.outline,
										textDecorationLine: "line-through",
									},
								!hasStarted(startDate) && {
									color: theme.colors.outline,
								},
							]}
						>
							{getScheduleText(data)}
						</Text>
					</View>
					<View style={styles.rowSpace}>
						<View>
							{dosing.map((dose, i) => (
								<View key={i} style={styles.row}>
									<Text variant="bodySmall">{formatDoseTime(dose.time)}</Text>
									<Text
										variant="bodySmall"
										style={{ color: theme.colors.secondary }}
									>
										{t("medicine.pill", { count: dose.amount })}
									</Text>
								</View>
							))}
						</View>
						<View style={styles.rightBottom}>
							<Text
								variant="bodySmall"
								style={{ color: theme.colors.secondary }}
							>
								{t("start")}: {startDate.toLocaleDateString()}
							</Text>
							{endDate && (
								<Text
									variant="bodySmall"
									style={{ color: theme.colors.secondary }}
								>
									{t("end")}: {endDate.toLocaleDateString()}
								</Text>
							)}
						</View>
					</View>
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
		alignItems: "center",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		// justifyContent: "space-between",
		gap: 10,
		alignItems: "baseline",
	},
	rowSpace: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		alignItems: "baseline",
	},
	rightBottom: {
		alignSelf: "flex-end",
	},
})
