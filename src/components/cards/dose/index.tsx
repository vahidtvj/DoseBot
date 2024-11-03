import { MedIconMap } from "@/constants"
import type { IDoseFull } from "@/db"
import { useDateUtils } from "@/utils"
import { isPast } from "date-fns"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button, Card, IconButton, Text, useTheme } from "react-native-paper"

type IProps = IDoseFull & {
	onConfirm: (id: number) => Promise<void>
	onSkip: (id: number) => Promise<void>
}

export function DoseCard(props: IProps) {
	const theme = useTheme()
	const [isProcessing, setIsProcessing] = useState<"skip" | "confirm" | false>(
		false,
	)
	const { amount: dose, time, status, id, medicine } = props
	if (!medicine) return
	const { name: title, type, note } = medicine
	const { t } = useTranslation()
	const showBtns = status === "pending"

	const { formatDoseTime } = useDateUtils()
	let timeStyle = {}
	if (status === "confirm") {
		timeStyle = { color: theme.colors.primary }
	} else if (status === "skip" || isPast(time))
		timeStyle = { color: theme.colors.error }

	async function handleAction(action: "skip" | "confirm", id: number) {
		setIsProcessing(action)
		if (action === "skip") await props.onSkip(id)
		else await props.onConfirm(id)
		setIsProcessing(false)
	}
	return (
		<Card mode="contained" style={styles.card}>
			<Card.Title
				title={title}
				titleVariant="titleLarge"
				left={(props) => (
					<IconButton icon={MedIconMap[type]} style={styles.icon} {...props} />
				)}
				right={() => (
					<View style={styles.right}>
						<Text variant="bodyMedium">× {dose}</Text>
					</View>
				)}
				subtitle={formatDoseTime(time)}
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
					<Button
						disabled={!!isProcessing}
						loading={isProcessing === "skip"}
						onPress={() => handleAction("skip", id)}
					>
						{t("medicine.skip")}
					</Button>
				)}
				{showBtns && (
					<Button
						disabled={!!isProcessing}
						loading={isProcessing === "confirm"}
						onPress={() => handleAction("confirm", id)}
					>
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
