import { DoseCard } from "@/components/cards/dose"
import type { HomeTabScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useDoseStore } from "@/stores/doseStore"
import { compareAsc } from "date-fns"
import { useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
export default function Page({ navigation }: HomeTabScreenProps<"Overview">) {
	const firstLaunch = useAppState((state) => state.firstLaunch)

	useEffect(() => {
		if (firstLaunch) navigation.navigate("Permissions")
	}, [firstLaunch, navigation])
	const doseStore = useDoseStore()

	return (
		<View style={styles.page}>
			<FlatList
				data={doseStore.data.sort((a, b) => compareAsc(a.time, b.time))}
				keyExtractor={(item) => item.id}
				renderItem={(item) => (
					<DoseCard
						{...item.item}
						onConfirm={(id) => doseStore.changeStatus(id, "confirm")}
						onSkip={(id) => doseStore.changeStatus(id, "skip")}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
})
