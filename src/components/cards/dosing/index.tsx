import { TextInputField } from "@/components/fields/TextInputField"
import { TimePickerInputField } from "@/components/fields/TimePickerInputField"
import type { Inputs } from "@/components/forms/schedule/data"
import type { UseControllerProps } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { Card, IconButton, TextInput } from "react-native-paper"

type IProps = {
	onRemove?: () => void
}

export function DosingCard(props: UseControllerProps<Inputs> & IProps) {
	const { t } = useTranslation()

	const i = Number.parseInt(props.name.split(".").pop() || "")

	return (
		<Card style={styles.card}>
			<Card.Content style={styles.row}>
				<TimePickerInputField
					control={props.control}
					name={`dosing.${i}.time`}
					dense
					mode="outlined"
					label={t("time")}
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
