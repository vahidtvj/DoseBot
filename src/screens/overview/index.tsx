import { DoseCard } from "@/components/cards/dose"
import { changeDoseStatus, getPendingDoseListFull } from "@/db"
import type { HomeTabScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
export default function Page({ navigation }: HomeTabScreenProps<"Overview">) {
	const firstLaunch = useAppState((state) => state.firstLaunch)

	useEffect(() => {
		if (firstLaunch) navigation.navigate("Permissions")
	}, [firstLaunch, navigation])
	const { data } = useLiveQuery(getPendingDoseListFull)

	return (
		<View style={styles.page}>
			<FlatList
				data={data}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<DoseCard
						{...item}
						onConfirm={() => changeDoseStatus(item.id, "confirm")}
						onSkip={() => changeDoseStatus(item.id, "skip")}
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
