import { ScheduleForm } from "@/components/forms/schedule"
import { type ISchedule, getDosings, getSchedule } from "@/db/query"
import type { RootStackScreenProps } from "@/routes/types"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"

export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineSchedule">) {
	const { id } = route.params
	const { t } = useTranslation()
	const data = id ? useLiveQuery(getSchedule(id)).data : undefined
	const dosing = id ? useLiveQuery(getDosings(id)).data : undefined

	function onDelete() {
		navigation.goBack()
	}

	useEffect(() => {
		if (!id) navigation.setOptions({ title: t("navigation.newSchedule") })
		navigation.setOptions({
			headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
		})
	}, [navigation, t, id, onDelete])

	function onSubmit(data: ISchedule) {
		navigation.goBack()
	}
	if (id && !data) return null
	return (
		<View style={styles.page}>
			<ScheduleForm data={data} onSubmit={onSubmit} dosing={dosing} />
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
