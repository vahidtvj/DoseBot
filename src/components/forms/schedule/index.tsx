import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, FAB, TextInput } from "react-native-paper"

import { DosingCard } from "@/components/cards/dosing"
import { DatePickerInputField } from "@/components/fields/DatePickerInputField"
import { SegmentedButtonsField } from "@/components/fields/SegmentedButtonsField"
import { TextInputField } from "@/components/fields/TextInputField"
import { WeekdayPickerField } from "@/components/fields/WeekdayPickerField"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { enGB, registerTranslation } from "react-native-paper-dates"
import { type Inputs, type Props, defaultValues, schema } from "./data"

registerTranslation("en-GB", enGB)

export function ScheduleForm(props: Props) {
	const data = props.data || defaultValues
	const { t } = useTranslation()

	const { control, handleSubmit, watch, formState } = useForm<Inputs>({
		defaultValues: data,
		resolver: zodResolver(schema),
	})
	const isProcessing = formState.isSubmitting || formState.isSubmitSuccessful

	const dosingArray = useFieldArray({
		keyName: "_id",
		control,
		name: "dosing",
	})

	function addDose() {
		dosingArray.append({ amount: 1, time: new Date() })
	}
	function removeDose(key: string) {
		dosingArray.remove(dosingArray.fields.findIndex((x) => x._id === key))
	}

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		props.onSubmit(data)
	}
	const type = watch("type")

	return (
		<View style={styles.page}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				<View style={styles.pageContent}>
					<SegmentedButtonsField
						readOnly={isProcessing}
						control={control}
						name="type"
						buttons={[
							{
								value: "Daily",
								label: t("medicine.daily"),
								icon: "calendar-today",
							},
							{
								value: "EveryXdays",
								label: t("medicine.everyXday"),
								icon: "calendar-sync",
							},
							{
								value: "Weekly",
								label: t("medicine.weekly"),
								icon: "calendar-week",
							},
						]}
					/>
					{type === "Weekly" && (
						<View>
							<WeekdayPickerField
								readOnly={isProcessing}
								control={control}
								name="days"
								defaultValue={[]}
							/>
						</View>
					)}
					{type === "EveryXdays" && (
						<TextInputField
							control={control}
							name="interval"
							mode="outlined"
							label={t("medicine.interval")}
							inputMode="numeric"
							right={<TextInput.Affix text={t("medicine.daysAffix")} />}
							readOnly={isProcessing}
						/>
					)}
					<View style={styles.dateView}>
						{/* TODO date picker locales */}
						{/* TODO picker icon hit box very small */}
						<DatePickerInputField
							readOnly={isProcessing}
							control={control}
							name="startDate"
							label={t("startDate")}
							mode="outlined"
							containerStyle={styles.date}
						/>
						<DatePickerInputField
							readOnly={isProcessing}
							control={control}
							name="endDate"
							label={t("endDate")}
							mode="outlined"
							containerStyle={styles.date}
						/>
					</View>
					<View style={styles.addTime}>
						<Button
							disabled={isProcessing}
							mode="contained"
							icon="plus"
							onPress={addDose}
						>
							{t("medicine.addDose")}
						</Button>
					</View>

					<View style={styles.doses}>
						{dosingArray.fields.map((dose, i) => (
							<DosingCard
								readOnly={isProcessing}
								key={dose._id}
								control={control}
								name={`dosing.${i}`}
								onRemove={() => removeDose(dose._id)}
							/>
						))}
					</View>
				</View>
			</ScrollView>
			<FAB
				mode="flat"
				icon="content-save"
				style={styles.fab}
				label={t("save")}
				onPress={handleSubmit(onSubmit)}
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
		gap: 16,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	dateView: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	date: {
		flexGrow: 1,
	},
	addTime: {
		// alignSelf: "flex-end",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
	doses: {
		gap: 12,
	},
})
