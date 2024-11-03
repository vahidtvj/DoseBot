import { TextInputField } from "@/components/fields/TextInputField"
import { TimePickerInputField } from "@/components/fields/TimePickerInputField"
import type { Inputs } from "@/components/forms/schedule/data"
import { useAppTheme } from "@/theme"
import type { UseControllerProps } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Surface, TextInput } from "react-native-paper"

type IProps = {
	onRemove?: () => void
	readOnly?: boolean
}

export function DosingCard(props: UseControllerProps<Inputs> & IProps) {
	const { t } = useTranslation()
	const { readOnly } = props
	const i = Number.parseInt(props.name.split(".").pop() || "")
	const theme = useAppTheme()

	return (
		<Surface style={styles.row}>
			<View style={styles.itemContainer}>
				<View style={{ flex: 1.2 }}>
					<TimePickerInputField
						control={props.control}
						name={`dosing.${i}.time`}
						dense
						mode="outlined"
						label={t("time")}
						readOnly={readOnly}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<TextInputField
						control={props.control}
						name={`dosing.${i}.amount`}
						dense
						noHelper
						mode="outlined"
						label={t("amount")}
						inputMode="numeric"
						right={<TextInput.Icon icon={"pill"} />}
						readOnly={readOnly}
					/>
				</View>
			</View>
			<TouchableOpacity
				onPress={() => props.onRemove?.()}
				style={[
					styles.removeButton,
					{
						backgroundColor: theme.colors.errorContainer,
					},
				]}
			>
				<IconButton disabled={readOnly} icon="close-circle" />
			</TouchableOpacity>
		</Surface>
	)
}

const styles = StyleSheet.create({
	card: {},
	row: {
		gap: 12,
		borderRadius: 6,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	removeButton: {
		borderRadius: 6,
		borderBottomEndRadius: 6,
		borderTopEndRadius: 6,
		justifyContent: "center",
	},
	itemContainer: {
		flexDirection: "row",
		gap: 12,
		flex: 1,
		padding: 6,
	},
})
