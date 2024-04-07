import { IDose } from "@/models"
import { useDateUtils } from "@/utils"
import { isPast } from "date-fns"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button, Card, IconButton, Text, useTheme } from "react-native-paper"

type IProps = IDose & {
	onConfirm: (id: string) => void
	onSkip: (id: string) => void
}

export function DoseCard(props: IProps) {
	const theme = useTheme()
	const { name: title, amount: dose, time, status, id } = props
	const { t } = useTranslation()
	const showBtns = status === "pending"

	const { formatAlertTime } = useDateUtils()
	let timeStyle = {}
	if (status === "confirm") {
		timeStyle = { color: theme.colors.primary }
	} else if (status === "skip" || isPast(time))
		timeStyle = { color: theme.colors.error }

	return (
		<Card mode="contained" style={styles.card}>
			<Card.Content style={styles.content}>
				<IconButton icon="pill" />
				<View style={styles.body}>
					<View style={styles.titleDose}>
						<Text variant="titleLarge">{title}</Text>
						<Text variant="bodyLarge">
							{t("medicine.pill", { count: dose })}
						</Text>
					</View>
					<Text variant="bodyLarge" style={timeStyle}>
						{formatAlertTime(time)}
					</Text>
				</View>
			</Card.Content>

			<Card.Actions>
				{showBtns && (
					<Button onPress={() => props.onSkip(id)}>{t("medicine.skip")}</Button>
				)}
				{showBtns && (
					<Button onPress={() => props.onConfirm(id)}>
						{t("medicine.confirm")}
					</Button>
				)}
			</Card.Actions>
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
	titleDose: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
