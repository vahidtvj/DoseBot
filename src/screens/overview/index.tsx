import { DoseCard } from "@/components/cards/dose"
import { AnimatedFlatList } from "@/components/common"
import { type IDoseFull, changeDoseStatus, getPendingDoseListFull } from "@/db"
import type { HomeTabScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Snackbar } from "react-native-paper"

export default function Page({ navigation }: HomeTabScreenProps<"Overview">) {
	const firstLaunch = useAppState((state) => state.firstLaunch)

	useEffect(() => {
		if (firstLaunch) navigation.navigate("Permissions")
	}, [firstLaunch, navigation])
	const { data } = useLiveQuery(getPendingDoseListFull)

	const [snackVisible, setSnackVisible] = useState(false)
	const [snackDose, setSnackDose] = useState<IDoseFull | undefined>()

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
})
