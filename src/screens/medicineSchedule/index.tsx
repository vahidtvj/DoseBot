import { LoadingPage } from "@/components/common/loadingPage"
import { ScheduleForm } from "@/components/forms/schedule"
import type { IScheduleFullCreate } from "@/db"
import type { RootStackScreenProps } from "@/routes/types"
import { randomUUID } from "expo-crypto"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"
import { useMedicineFormState } from "../medicineDetail/store"

export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineSchedule">) {
	const { index } = route.params

	const { t } = useTranslation()
	const { schedules, setSchedule, removeSchedule } = useMedicineFormState()
	if (index !== undefined && !schedules) return <LoadingPage />
	const data = index !== undefined && schedules ? schedules[index] : undefined
	const key = data?._id

	function onDelete() {
		if (key) removeSchedule(key)
		navigation.goBack()
	}

	useEffect(() => {
		if (index === undefined || !schedules || !schedules[index].id)
			navigation.setOptions({ title: t("navigation.newSchedule") })

		navigation.setOptions({
			headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
		})
	}, [navigation, t, schedules, index, onDelete])

	function onSubmit(data: IScheduleFullCreate) {
		navigation.setOptions({
			headerRight: () => (
				<Appbar.Action disabled={true} icon="delete" onPress={onDelete} />
			),
		})
		setSchedule(data, key)
		navigation.goBack()
	}

	return (
		<View style={styles.page}>
			<ScheduleForm data={data} onSubmit={onSubmit} key={randomUUID()} />
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
