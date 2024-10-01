import { type IDose, MedIconMap } from "@/models"
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
	const { name: title, amount: dose, time, status, id, type, note } = props
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
			<Card.Title
				title={title}
				titleVariant="titleLarge"
				left={(props) => (
					<IconButton icon={MedIconMap[type]} style={styles.icon} {...props} />
				)}
				right={(props) => (
					<View style={styles.right}>
						<Text variant="bodyMedium">× {dose}</Text>
					</View>
				)}
				subtitle={formatAlertTime(time)}
				subtitleStyle={timeStyle}
			/>
			<Card.Content style={styles.content}>
				{note && (
					<Text
						variant="bodySmall"
						numberOfLines={3}
						style={{
							color: theme.colors.secondary,
						}}
					>
						{note}
					</Text>
				)}
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
	card: {
		margin: 7,
	},
	content: {
		display: "flex",
		flexDirection: "row",
	},
	icon: {
		alignSelf: "center",
	},
	body: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 6,
	},
	right: {
		margin: 12,
	},
})
