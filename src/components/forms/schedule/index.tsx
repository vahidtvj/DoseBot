import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, FAB, TextInput } from "react-native-paper"

import { DosingCard } from "@/components/cards/dosing"
import { DatePickerInputField } from "@/components/fields/DatePickerInputField"
import { SegmentedButtonsField } from "@/components/fields/SegmentedButtonsField"
import { TextInputField } from "@/components/fields/TextInputField"
import { WeekdayPickerField } from "@/components/fields/WeekdayPickerField"
import { zodResolver } from "@hookform/resolvers/zod"
import { compareAsc } from "date-fns"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { enGB, registerTranslation } from "react-native-paper-dates"
import { Inputs, Props, defaultValues, schema } from "./data"

registerTranslation("en-GB", enGB)

export function ScheduleForm(props: Props) {
	const data = props.data || defaultValues

	const { t } = useTranslation()

	const { control, handleSubmit, watch } = useForm<Inputs>({
		defaultValues: data,
		resolver: zodResolver(schema),
	})
	const dosingArray = useFieldArray({
		control,
		name: "dosing",
	})

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		props.onSubmit?.(data)
	}
	const type = watch("type")

	// TODO sort dosing array
	function _sortDosingArray() {
		const arr = [...dosingArray.fields].toSorted((a, b) =>
			compareAsc(a.time, b.time),
		)
		dosingArray.replace(arr)
	}

	return (
		<View style={styles.page}>
			<SegmentedButtonsField
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
					{/* <Text>Days:</Text> */}
					{/* <WeekdayPicker selected={[]} onSelect={() => {}} /> */}
					<WeekdayPickerField control={control} name="days" defaultValue={[]} />
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
					// @ts-ignore I have no idea why this is an error! */
					defaultValue={2}
				/>
			)}
			<View style={styles.dateView}>
				{/* <DatePickerInputField control={control} name={"startDate"} /> */}
				{/* TODO date picker locales */}
				{/* TODO picker icon hit box very small */}
				<DatePickerInputField
					control={control}
					name="startDate"
					label={t("startDate")}
					locale="en"
					readOnly
					inputMode="start"
					mode="outlined"
					containerStyle={styles.date}
				/>
				<DatePickerInputField
					control={control}
					name="endDate"
					locale="en"
					label={t("endDate")}
					readOnly
					inputMode="start"
					mode="outlined"
					containerStyle={styles.date}
				/>
			</View>
			<View style={styles.addTime}>
				{/* <Text>Doses</Text> */}
				<Button
					mode="contained"
					icon="plus"
					onPress={() => dosingArray.append({ amount: 1, time: new Date() })}
				>
					{t("medicine.addDose")}
				</Button>
			</View>
			<ScrollView>
				<View style={styles.doses}>
					{dosingArray.fields.map((dose, i) => (
						<DosingCard
							key={dose.id}
							control={control}
							name={`dosing.${i}`}
							onRemove={() => dosingArray.remove(i)}
						/>
					))}
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
		margin: 10,
		gap: 16,
		flex: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	dateView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		gap: 12,
		marginTop: 26,
	},
	date: {
		flexShrink: 1,
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
		gap: 16,
	},
})
