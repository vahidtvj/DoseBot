import { MedicineCard } from "@/components/cards/medicine"
import { useMedicineStore } from "@/stores/medicineStore"
import { FlatList, StyleSheet, View } from "react-native"
import { FAB } from "react-native-paper"

import type { HomeTabScreenProps } from "@/routes/types"
import { useTranslation } from "react-i18next"

export default function Page({
	navigation,
}: HomeTabScreenProps<"Medications">) {
	const medStore = useMedicineStore()
	const { t } = useTranslation()
	return (
		<View style={styles.page}>
			<FlatList
				data={medStore.data.sort((a, b) => a.name.localeCompare(b.name))}
				keyExtractor={(item) => item.id}
				renderItem={(item) => (
					<MedicineCard
						{...item.item}
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
