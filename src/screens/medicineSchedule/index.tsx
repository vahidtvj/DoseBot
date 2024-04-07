import { ScheduleForm } from "@/components/forms/schedule"
import { Schedule } from "@/models"
import type { RootStackScreenProps } from "@/routes/types"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"

export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineSchedule">) {
	const { schedule } = route.params

	useEffect(() => {
		if (!schedule) navigation.setOptions({ title: "New Schedule" })
		if (route.params.onDelete)
			navigation.setOptions({
				headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
			})
	}, [navigation, schedule, route.params.onDelete])

	function onSubmit(data: Schedule) {
		route.params.onSubmit?.(data)
		navigation.goBack()
	}
	function onDelete() {
		route.params.onDelete?.()
		navigation.goBack()
	}
	const data = schedule
	return (
		<View style={styles.page}>
			<ScheduleForm data={data} edit={false} onSubmit={onSubmit} />
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
