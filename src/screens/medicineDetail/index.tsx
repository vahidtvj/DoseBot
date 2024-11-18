import { LoadingPage } from "@/components/common/loadingPage"
import { MedicineForm } from "@/components/forms/medicine"
import { type IMedicineCreate, deleteMed, updateFullMed } from "@/db"
import type { RootStackScreenProps } from "@/routes/types"
import { randomUUID } from "expo-crypto"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"
import { useMedicineFormState } from "./store"
export default function Page({
	navigation,
	route,
}: RootStackScreenProps<"MedicineDetail">) {
	const id = route.params.id
	const { t } = useTranslation()
	const { medicine, schedules, setMed } = useMedicineFormState()

	const onDelete = useCallback(() => {
		if (!id) return
		deleteMed(id)
		navigation.goBack()
	}, [id, navigation])

	useEffect(() => {
		if (!id) navigation.setOptions({ title: t("navigation.newMed") })
		if (id)
			navigation.setOptions({
				headerRight: () => <Appbar.Action icon="delete" onPress={onDelete} />,
			})
	}, [navigation, id, t, onDelete])

	const scheduleActions = {
		open: (medData: IMedicineCreate, index?: number) => {
			setMed(medData)
			navigation.navigate("MedicineSchedule", {
				index: index,
			})
		},
	}

	function onSubmit(data: IMedicineCreate) {
		updateFullMed({ med: data, schedules: schedules || [] })
		navigation.goBack()
	}
	const isLoading = id && !medicine
	if (isLoading) return <LoadingPage />
	return (
		<View style={styles.page}>
			<MedicineForm
				key={randomUUID()}
				data={medicine}
				scheduleActions={scheduleActions}
				schedules={schedules}
				onSubmit={onSubmit}
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
