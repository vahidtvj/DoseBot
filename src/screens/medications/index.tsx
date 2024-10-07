import { MedicineCard } from "@/components/cards/medicine"
import { FlatList, StyleSheet, View, Text } from "react-native"
import { FAB } from "react-native-paper"

import { getAllMeds } from "@/db/query"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"

import type { HomeTabScreenProps } from "@/routes/types"
import { useTranslation } from "react-i18next"
export default function Page({
	navigation,
}: HomeTabScreenProps<"Medications">) {
	// const medStore = useMedicineStore()
	const meds = useLiveQuery(getAllMeds)

	const { t } = useTranslation()
	return (
		<View style={styles.page}>
			<FlatList
				data={meds.data}
				renderItem={(item) => (
					<MedicineCard
						{...item.item}
						key={item.item.id}
						onPress={(id) => navigation.navigate("MedicineDetail", { id })}
					/>
				)}
			/>
			<FAB
				mode="flat"
				icon="plus"
				style={styles.fab}
				label={t("add")}
				onPress={() => navigation.navigate("MedicineDetail", { id: undefined })}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
})
