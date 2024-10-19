import { ScheduleCard } from "@/components/cards/schedule"
import { CheckboxField } from "@/components/fields/CheckboxField"
import { MedTypeField } from "@/components/fields/MedType"
import { TextInputField } from "@/components/fields/TextInputField"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Card, FAB, Surface, Text } from "react-native-paper"
import { type Inputs, type Props, defaultValues, schema } from "./data"

export function MedicineForm(props: Props) {
	const data = props.data || defaultValues
	const schedules = props.schedules || []
	const { scheduleActions } = props
	const { t } = useTranslation()

	const { control, handleSubmit, watch, getValues, formState } =
		useForm<Inputs>({
			defaultValues: data,
			resolver: zodResolver(schema),
		})
	const isProcessing = formState.isSubmitting || formState.isSubmitSuccessful

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
						readOnly={isProcessing}
					/>

					<View style={{ flexDirection: "row", gap: 12 }}>
						<Surface style={{ padding: 8, flex: 1 }}>
							<View style={styles.row}>
								<Text variant="bodyLarge">{t("medicine.type")}:</Text>
								<MedTypeField
									control={control}
									name="type"
									readOnly={isProcessing}
								/>
							</View>
						</Surface>
						<TextInputField
							containerStyle={{ flex: 1 }}
							control={control}
							name="note"
							mode="outlined"
							dense
							label={t("intakeAdvice")}
							readOnly={isProcessing}
						/>
					</View>
					<Card>
						<Card.Content style={styles.card}>
							<View style={styles.row}>
								<Text variant="bodyLarge">{t("inventory")}: </Text>
								<CheckboxField
									control={control}
									name="inventoryEnabled"
									readOnly={isProcessing}
								/>
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
										readOnly={isProcessing}
									/>
									<TextInputField
										control={control}
										name="inventoryNotifyOn"
										mode="outlined"
										label={t("threshold")}
										inputMode="numeric"
										containerStyle={{ flexGrow: 1 }}
										readOnly={isProcessing}
									/>
								</View>
							)}
						</Card.Content>
					</Card>
					<View>
						<View style={[styles.row, { marginHorizontal: 7 }]}>
							<Text variant="titleLarge">{t("schedules")}:</Text>
							<View style={styles.row2}>
								<Button
									mode="contained-tonal"
									icon="plus"
									onPress={() => scheduleActions.open(getValues())}
									disabled={isProcessing}
								>
									{t("add")}
								</Button>
							</View>
						</View>
						<View>
							{schedules.map((schedule, i) => (
								<ScheduleCard
									key={schedule._id}
									data={schedule}
									onPress={() =>
										!isProcessing && scheduleActions.open(getValues(), i)
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
				loading={isProcessing}
				disabled={isProcessing}
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
