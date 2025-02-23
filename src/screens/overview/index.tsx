import { DoseCard } from "@/components/cards/dose"
import { AnimatedFlatList } from "@/components/common"
import {
	type IDoseFull,
	changeDoseStatus,
	getAllMeds,
	getPendingDoseListFull,
} from "@/db"
import type { HomeTabScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useFocusEffect } from "@react-navigation/native"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Snackbar, Text } from "react-native-paper"

export default function Page({ navigation }: HomeTabScreenProps<"Overview">) {
	const firstLaunch = useAppState((state) => state.firstLaunch)

	const [_, setTick] = useState(0)

	useFocusEffect(
		useCallback(() => {
			const interval = setInterval(() => setTick((prev) => prev + 1), 10000)
			return () => clearInterval(interval)
		}, []),
	)

	useEffect(() => {
		if (firstLaunch) navigation.navigate("App", { screen: "Permissions" })
	}, [firstLaunch, navigation])
	const meds = useLiveQuery(getAllMeds)
	const { data } = useLiveQuery(getPendingDoseListFull, [meds.updatedAt])
	const noMeds = meds.data.length === 0

	const [snackVisible, setSnackVisible] = useState(false)
	const [snackDose, setSnackDose] = useState<IDoseFull | undefined>()

	const { t } = useTranslation()

	function onClick(dose: IDoseFull, action: "skip" | "confirm") {
		return changeDoseStatus(dose.id, action).then(() => {
			setSnackDose(dose)
			setSnackVisible(true)
		})
	}
	async function undo() {
		if (!snackDose) return
		setSnackVisible(false)
		await changeDoseStatus(snackDose.id, "pending")
	}
	return (
		<View style={styles.page}>
			{data.length > 0 && (
				<AnimatedFlatList
					data={data}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<DoseCard
							{...item}
							onConfirm={() => onClick(item, "confirm")}
							onSkip={() => onClick(item, "skip")}
						/>
					)}
				/>
			)}
			{data.length === 0 && (
				<View style={styles.messageContainer}>
					<Text variant="bodyLarge" style={styles.message}>
						{noMeds ? t("noMedsDoseScreen") : t("noDoses")}
					</Text>
				</View>
			)}
			<Snackbar
				visible={snackVisible}
				onDismiss={() => setSnackVisible(false)}
				action={{
					label: "Undo",
					onPress: undo,
				}}
			>
				{`Updated medicine "${snackDose?.medicine?.name}"`}
			</Snackbar>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	messageContainer: {
		justifyContent: "center",
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 24,
	},
	message: {
		textAlign: "center",
	},
})
