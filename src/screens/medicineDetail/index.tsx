import { MedicineForm } from "@/components/forms/medicine"
import {
	type IMedicineFull,
	type ISchedule,
	createMed,
	deleteMed,
	getMed,
	getSchedules,
	updateMed,
} from "@/db/query"
import type { IMedicine } from "@/db/schema"
import type { RootStackScreenProps } from "@/routes/types"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"
export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineDetail">) {
	const id = route.params.id
	const data = id ? useLiveQuery(getMed(id)).data : undefined
	const schedules = id ? useLiveQuery(getSchedules(id)).data : undefined
	const { t } = useTranslation()

	function onDelete() {
		if (!id) return
		deleteMed.run({ id })
		navigation.goBack()
	}

	useEffect(() => {
		if (!id) navigation.setOptions({ title: t("navigation.newMed") })
		if (id)
			navigation.setOptions({
				headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
			})
	}, [navigation, id, t, onDelete])

	// const data = id ? medStore.data.find((x) => x.id === id) : undefined

	// function openSchedule(
	// 	schedule?: ISchedule,
	// 	onSubmit?: (data: ISchedule, index?: number) => void,
	// 	onDelete?: () => void,
	// ) {
	// 	navigation.navigate("MedicineSchedule", {
	// 		schedule,
	// 		onSubmit,
	// 		onDelete,
	// 	})
	// }

	const scheduleActions = {
		open: (scheduleId?: number) =>
			navigation.navigate("MedicineSchedule", {
				id: scheduleId,
			}),
		onDelete: (id: number) => {},
		onSubmit: (data: ISchedule) => {},
	}

	function onSubmit(data: Omit<IMedicine, "id">) {
		// if (!id) medStore.create(data)
		// else medStore.update(data)
		if (id) updateMed(id, data)
		else createMed(data)
		navigation.goBack()
	}
	if (id && !data) return null
	return (
		<View style={styles.page}>
			<MedicineForm
				data={data}
				scheduleActions={scheduleActions}
				schedules={schedules}
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
