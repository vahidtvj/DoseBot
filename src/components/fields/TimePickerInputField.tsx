import { timePicker } from "@/components/pickers/timepicker"
import { useProps } from "@/utils"
import { toTimeString } from "@/utils"
import {
	type FieldValues,
	type UseControllerProps,
	useController,
} from "react-hook-form"
import { type StyleProp, View, type ViewStyle } from "react-native"
import { HelperText, TextInput, type TextInputProps } from "react-native-paper"

export function TimePickerInputField<T extends FieldValues>(
	props: UseControllerProps<T> &
		Omit<TextInputProps, "value" | "onChange" | "readOnly" | "right"> & {
			containerStyle?: StyleProp<ViewStyle>
			noHelper?: boolean
			readOnly?: boolean
		},
) {
	const { field, fieldState } = useController(props)
	const { containerStyle, noHelper, readOnly, ...rest } = useProps(props)
	const hasError = fieldState.error !== undefined

	const value = field.value && toTimeString(field.value)
	const time = field.value && new Date(field.value)

	function onPickerClose(time?: Date) {
		if (!time) return
		field.onChange(time)
	}

	return (
		<View style={containerStyle}>
			<TextInput
				value={value}
				readOnly
				error={hasError}
				{...rest}
				right={
					<TextInput.Icon
						disabled={readOnly}
						icon="clock"
						onPress={() =>
							timePicker.open({
								value: time,
								onSelect: onPickerClose,
							})
						}
					/>
				}
			/>

			{!noHelper && hasError && (
				<HelperText type="error" visible={hasError}>
					{fieldState.error?.message}
				</HelperText>
			)}
			{/* <TimePickerModal
				visible={visible}
				onDismiss={() => onPickerClose()}
				onConfirm={(time) => onPickerClose(time)}
			/> */}
		</View>
	)
}
