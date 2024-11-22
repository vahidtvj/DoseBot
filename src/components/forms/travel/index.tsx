import { MedicineCard } from "@/components/cards/medicine"
import { DatePickerInputField } from "@/components/fields/DatePickerInputField"
import type { IMedicineFull } from "@/db"
import { useAppTheme } from "@/theme"
import { useDateFunc } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import {
	type SubmitHandler,
	type UseControllerProps,
	useController,
	useForm,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, View } from "react-native"
import { Checkbox, FAB, Text } from "react-native-paper"
import {
	type Inputs,
	type Props,
	calculateTravel,
	defaultValues,
	schema,
} from "./data"

function MedicineCardField(
	props: UseControllerProps<Inputs> & {
		med: IMedicineFull
		readonly?: boolean
	},
) {
	const { med, readonly } = props
	const { field } = useController(props)
	const value = field.value

	const onChange = useCallback(() => {
		field.onChange(!value)
	}, [value, field.onChange])

	return (
		<MedicineCard
			{...med}
			noNextDose
			cardTitleRight={() => (
				<View style={{ paddingRight: 16 }}>
					<Checkbox
						disabled={readonly}
						status={value ? "checked" : "unchecked"}
						onPress={onChange}
					/>
				</View>
			)}
		/>
	)
}

export function TravelCalcForm(props: Props) {
	const { meds } = props
	const theme = useAppTheme()

	const [final, setFinal] = useState(false)
	const [counts, setCounts] = useState<number[]>([])

	const data: Inputs = {
		...defaultValues,
		selectedMeds: meds.map(() => false),
	}
	const { t } = useTranslation()

	const { control, handleSubmit, watch, formState, setValue, trigger, reset } =
		useForm<Inputs>({
			defaultValues: data,
			resolver: zodResolver(schema),
		})
	// const isProcessing = formState.isSubmitting
	const isProcessing = formState.isSubmitting || formState.isSubmitSuccessful

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const counts = calculateTravel({ ...data, meds })
		setCounts(counts)
		setFinal(true)
	}

	const { differenceInCalendarDays } = useDateFunc()

	const start = watch("start")
	const end = watch("end")
	const selection = watch("selectedMeds")

	// biome-ignore lint/correctness/useExhaustiveDependencies: <this is intended>
	useEffect(() => {
		trigger("start")
		trigger("end")
	}, [trigger, start, end])

	const allSelected: "checked" | "unchecked" | "indeterminate" =
		selection.every((x) => x === true)
			? "checked"
			: selection.every((x) => x === false)
				? "unchecked"
				: "indeterminate"

	const onSelectAll = useCallback(() => {
		const all = allSelected === "checked"
		setValue("selectedMeds", Array(meds.length).fill(!all))
	}, [allSelected, meds, setValue])

	const onReset = useCallback(() => {
		reset({}, { keepValues: true })
		setFinal(false)
	}, [reset])

	const days = differenceInCalendarDays(end, start) + 1
	return !final ? (
		<View style={styles.page}>
			<View style={styles.pageContent}>
				<View style={styles.dateView}>
					<DatePickerInputField
						control={control}
						name="start"
						mode="outlined"
						label={t("startDate")}
						containerStyle={styles.date}
						readOnly={isProcessing}
						noHelper
					/>
					<DatePickerInputField
						control={control}
						name="end"
						mode="outlined"
						label={t("endDate")}
						containerStyle={styles.date}
						readOnly={isProcessing}
						minDate={start}
						noHelper
					/>
				</View>
				<View style={styles.row}>
					<Text variant="bodyLarge">{`${t("duration")}: ${t("numDays", {
						count: days,
					})}`}</Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text variant="bodyLarge">{t("selectAll")}</Text>
						<Checkbox
							disabled={isProcessing}
							status={allSelected}
							onPress={onSelectAll}
						/>
					</View>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<FlatList
					scrollEnabled
					contentContainerStyle={styles.scrollView}
					data={meds}
					keyExtractor={(x) => String(x.id)}
					renderItem={(props) => (
						<MedicineCardField
							med={props.item}
							control={control}
							name={`selectedMeds.${props.index}`}
							readonly={isProcessing}
						/>
					)}
				/>
			</View>
			<FAB
				mode="flat"
				icon="calculator"
				style={styles.fab}
				label={t("calculate")}
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	) : (
		<View style={styles.page}>
			<FlatList
				scrollEnabled
				contentContainerStyle={styles.scrollView}
				data={meds}
				keyExtractor={(x) => String(x.id)}
				renderItem={(props) => (
					<MedicineCard
						{...props.item}
						schedules={[]}
						inventoryEnabled={false}
						cardTitleRight={() => (
							<View style={{ paddingRight: 16 }}>
								<Text
									variant="bodyLarge"
									style={{ color: theme.colors.primary }}
								>{`× ${counts[props.index]}`}</Text>
							</View>
						)}
					/>
				)}
			/>
			<FAB
				mode="flat"
				icon="reload"
				style={styles.fab}
				label={t("reset")}
				onPress={() => onReset()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	scrollView: { paddingBottom: 76 },
	pageContent: {
		margin: 10,
		gap: 8,
	},
	dateView: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	date: {
		flexGrow: 1,
	},
	row: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
})
