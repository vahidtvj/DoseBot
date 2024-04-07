import { TextInputField } from "@/components/fields/TextInputField"
import { Inputs } from "@/components/forms/schedule/data"
import { Dosing } from "@/models"
import { toTimeString } from "@/utils"
import { useState } from "react"
import { UseControllerProps, useController } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { Card, IconButton, TextInput } from "react-native-paper"
import { TimePickerModal } from "react-native-paper-dates"

type IProps = {
	onRemove?: () => void
}
type TimePickerReturnType = {
	hours: number
	minutes: number
}

export function DosingCard(props: UseControllerProps<Inputs> & IProps) {
	const { field } = useController(props)
	const data = field.value as Dosing
	const { t } = useTranslation()

	const [visible, setVisible] = useState(false)
	const i = parseInt(props.name.split(".").pop() || "")

	function onPickerClose(time?: TimePickerReturnType) {
		setVisible(false)
		if (!time) return
		const { hours, minutes } = time
		const date = new Date()
		date.setHours(hours)
		date.setMinutes(minutes)
		field.onChange({ ...field, time: date })
	}

	return (
		<Card style={styles.card}>
			<Card.Content style={styles.row}>
				<TextInputField
					control={props.control}
					name={`dosing.${i}.time`}
					dense
					noHelper
					mode="outlined"
					label={t("time")}
					value={toTimeString(data.time)}
					right={
						<TextInput.Icon icon="clock" onPress={() => setVisible(true)} />
					}
					readOnly
				/>
				<TextInputField
					control={props.control}
					name={`dosing.${i}.amount`}
					dense
					noHelper
					mode="outlined"
					label={t("amount")}
					inputMode="numeric"
					right={<TextInput.Icon icon={"pill"} />}
				/>
				<IconButton icon="delete" onPress={() => props.onRemove?.()} />
				{/* TODO time picker translate */}
				<TimePickerModal
					visible={visible}
					onDismiss={() => onPickerClose()}
					onConfirm={(time) => onPickerClose(time)}
				/>
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
})
