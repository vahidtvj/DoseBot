import { ScheduleCard } from "@/components/cards/schedule"
import { CheckboxField } from "@/components/fields/CheckboxField"
import { MedTypeField } from "@/components/fields/MedType"
import { TextInputField } from "@/components/fields/TextInputField"
import { IMedicine, Schedule } from "@/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { randomUUID } from "expo-crypto"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Card, FAB, SegmentedButtons, Text } from "react-native-paper"
import { Inputs, Props, defaultValues, schema } from "./data"

export function MedicineForm(props: Props) {
	const data = props.data || defaultValues
	const { t } = useTranslation()

	const { control, handleSubmit, watch } = useForm<Inputs>({
		defaultValues: data,
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const id =
			props.data && "id" in props.data && props.data.id
				? (props.data.id as string)
				: randomUUID()
		const pdata: IMedicine = { ...data, id }
		props.onSubmit?.(pdata)
	}

	const scheduleArray = useFieldArray({
		control,
		name: "schedule",
	})

	function onScheduleSubmit(data: Schedule, index?: number) {
		if (index !== undefined) scheduleArray.update(index, data)
		else scheduleArray.append(data)
		// scheduleArray.update()
	}
	function onScheduleDelete(index: number) {
		scheduleArray.remove(index)
	}

	const inventoryEnabled = watch("inventory.enabled")
	return (
		<View style={styles.page}>
			<ScrollView>
				<View style={styles.content}>
					<TextInputField
						control={control}
						name="name"
						mode="outlined"
						label={t("medicineName")}
						rules={{ required: true }}
					/>
					<View style={styles.row}>
						<Text variant="bodyLarge">{t("medicine.type")}:</Text>
						<MedTypeField control={control} name="type" />
					</View>
					<Card>
						<Card.Content style={styles.card}>
							<View style={styles.row}>
								<Text variant="bodyLarge">{t("inventory")}: </Text>
								{/* <Checkbox status={data.inventory.enabled ? "checked" : "unchecked"} /> */}
								<CheckboxField control={control} name="inventory.enabled" />
							</View>
							{inventoryEnabled && (
								<View style={styles.inv}>
									<TextInputField
										control={control}
										name="inventory.count"
										mode="outlined"
										label={t("count")}
										rules={{ required: true, min: 0 }}
										inputMode="numeric"
										containerStyle={{ flexGrow: 1 }}
									/>
									<TextInputField
										control={control}
										name="inventory.notifyOn"
										mode="outlined"
										label={t("threshold")}
										rules={{ required: true, min: 0 }}
										inputMode="numeric"
										containerStyle={{ flexGrow: 1 }}
									/>
								</View>
							)}
						</Card.Content>
					</Card>
					<Text variant="bodyLarge">{t("priority")}: </Text>
					{/* TODO */}
					<SegmentedButtons
						value="Low"
						onValueChange={() => {}}
						buttons={[
							{
								value: "Low",
								label: "Low",
								icon: "alarm-off",
							},
							{
								value: "Normal",
								label: "Normal",
								icon: "alarm",
							},
							{ value: "High", label: "High", icon: "alarm-note" },
						]}
					/>
					<View>
						<View style={[styles.row, { marginHorizontal: 7 }]}>
							<Text variant="titleLarge">{t("schedules")}:</Text>
							<View style={styles.row2}>
								{/* <IconButton icon="plus-box" /> */}
								<Button
									mode="contained-tonal"
									icon="plus"
									onPress={() =>
										props.openSchedule?.(undefined, (data) =>
											onScheduleSubmit(data),
										)
									}
								>
									{t("add")}
								</Button>
							</View>
						</View>
						<View>
							{scheduleArray.fields?.map((schedule, i) => (
								<ScheduleCard
									key={schedule.id}
									data={schedule}
									edit={false}
									onPress={() =>
										props.openSchedule?.(
											schedule,
											(data) => onScheduleSubmit(data, i),
											() => onScheduleDelete(i),
										)
									}
								/>
							))}
						</View>
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
	content: {
		flex: 1,
		margin: 10,
		gap: 16,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
	row2: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: -10,
	},
	row3: {
		// flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flexShrink: 1,
	},
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
	inv: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		// justifyContent: "space-around",
	},
	card: {
		gap: 16,
	},
})
