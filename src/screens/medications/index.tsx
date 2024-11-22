import { MedicineCard } from "@/components/cards/medicine"
import { StyleSheet, View } from "react-native"
import { FAB } from "react-native-paper"

import { getAllMeds } from "@/db"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"

import { AnimatedFlatList } from "@/components/common"
import type { HomeTabScreenProps } from "@/routes/types"
import { useConfigState } from "@/stores/configStore"
import { useTranslation } from "react-i18next"
import { useMedicineFormState } from "../medicineDetail/store"

export default function Page({
	navigation,
}: HomeTabScreenProps<"Medications">) {
	// TODO reactive query for joins
	const meds = useLiveQuery(getAllMeds)

	const { t } = useTranslation()
	function openMed(id?: number) {
		useMedicineFormState.getState().getData(id)
		navigation.navigate("MedicineDetail", { id })
	}

	const showNextDose = useConfigState((x) => x.showNextDose)

	return (
		<View style={styles.page}>
			<AnimatedFlatList
				contentContainerStyle={styles.scrollView}
				data={meds.data}
				renderItem={(item) => (
					<MedicineCard
						{...item.item}
						key={item.item.id}
						onPress={(id) => openMed(id)}
						noNextDose={!showNextDose}
					/>
				)}
			/>
			<FAB
				mode="flat"
				icon="plus"
				style={styles.fab}
				label={t("add")}
				onPress={() => openMed()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	scrollView: { paddingBottom: 76 },
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
})
