import { MedicineForm } from "@/components/forms/medicine"
import { IMedicine, Schedule } from "@/models"
import type { RootStackScreenProps } from "@/routes/types"
import { useMedicineStore } from "@/stores/medicineStore"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"

export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineDetail">) {
	const { id } = route.params
	const medStore = useMedicineStore()

	function onDelete() {
		if (!id) return
		medStore.delete(id)
		navigation.goBack()
	}

	useEffect(() => {
		if (!id) navigation.setOptions({ title: "New Medication" })
		if (id)
			navigation.setOptions({
				headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
			})
	}, [navigation, id])

	const data = id ? medStore.data.find((x) => x.id === id) : undefined

	function openSchedule(
		schedule?: Schedule,
		onSubmit?: (data: Schedule, index?: number) => void,
		onDelete?: () => void,
	) {
		navigation.navigate("MedicineSchedule", {
			schedule,
			onSubmit,
			onDelete,
		})
	}

	function onSubmit(data: IMedicine) {
		if (!id) medStore.create(data)
		else medStore.update(data)
		navigation.goBack()
	}
	return (
		<View style={styles.page}>
			<MedicineForm
				data={data}
				edit={false}
				openSchedule={openSchedule}
				onSubmit={onSubmit}
			/>
			{/* <FAB mode="flat" icon="pencil" style={styles.fab} label="Edit" /> */}
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
