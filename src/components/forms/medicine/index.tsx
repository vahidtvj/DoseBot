import { ScheduleCard } from "@/components/cards/schedule"
import { CheckboxField } from "@/components/fields/CheckboxField"
import { MedTypeField } from "@/components/fields/MedType"
import { TextInputField } from "@/components/fields/TextInputField"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import {
	Button,
	Card,
	FAB,
	SegmentedButtons,
	Surface,
	Text,
} from "react-native-paper"
import { type Inputs, type Props, defaultValues, schema } from "./data"

export function MedicineForm(props: Props) {
	const data = props.data || defaultValues
	const schedules = props.schedules || []
	const { scheduleActions } = props
	const { t } = useTranslation()

	const { control, handleSubmit, watch } = useForm<Inputs>({
		defaultValues: data,
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		props.onSubmit(data)
	}

	const inventoryEnabled = watch("inventoryEnabled")
	return (
		<View style={styles.page}>
			<ScrollView>
				<View style={styles.content}>
					<TextInputField
						control={control}
						name="name"
						mode="outlined"
						label={t("medicineName")}
					/>

					<View style={{ flexDirection: "row", gap: 12 }}>
						<Surface style={{ padding: 8, flex: 1 }}>
							<View style={styles.row}>
								<Text variant="bodyLarge">{t("medicine.type")}:</Text>
								<MedTypeField control={control} name="type" />
							</View>
						</Surface>
						<TextInputField
							containerStyle={{ flex: 1 }}
							control={control}
							name="note"
							mode="outlined"
							dense
							label={t("intakeAdvice")}
						/>
					</View>
					<Card>
						<Card.Content style={styles.card}>
							<View style={styles.row}>
								<Text variant="bodyLarge">{t("inventory")}: </Text>
								{/* <Checkbox status={data.inventory.enabled ? "checked" : "unchecked"} /> */}
								<CheckboxField control={control} name="inventoryEnabled" />
							</View>
							{inventoryEnabled && (
								<View style={styles.inv}>
									<TextInputField
										control={control}
										name="inventoryCount"
										mode="outlined"
										label={t("count")}
										inputMode="numeric"
										containerStyle={{ flexGrow: 1 }}
									/>
									<TextInputField
										control={control}
										name="inventoryNotifyOn"
										mode="outlined"
										label={t("threshold")}
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
								<Button
									mode="contained-tonal"
									icon="plus"
									onPress={() => scheduleActions.open()}
								>
									{t("add")}
								</Button>
							</View>
						</View>
						<View>
							{schedules.map((schedule) => (
								<ScheduleCard
									key={schedule.id}
									data={schedule}
									edit={false}
									onPress={() => scheduleActions.open(schedule.id)}
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
		gap: 12,
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
