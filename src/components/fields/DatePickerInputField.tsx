import { datePicker } from "@/components/pickers/datepicker"
import { useProps } from "@/utils"
import { useDateFunc } from "@/utils"
import {
	type FieldValues,
	type UseControllerProps,
	useController,
} from "react-hook-form"
import { type StyleProp, View, type ViewStyle } from "react-native"
import { HelperText, TextInput, type TextInputProps } from "react-native-paper"

export function DatePickerInputField<T extends FieldValues>(
	props: UseControllerProps<T> &
		Omit<TextInputProps, "value" | "onChange" | "readOnly" | "right"> & {
			containerStyle?: StyleProp<ViewStyle>
			minDate?: Date
			maxDate?: Date
		},
) {
	const { field, fieldState } = useController(props)
	const { containerStyle, minDate, maxDate, ...rest } = useProps(props)
	const hasError = fieldState.error !== undefined
	const { format } = useDateFunc()

	const value = field.value && format(field.value as Date, "P")
	return (
		<View style={containerStyle}>
			<TextInput
				value={value}
				readOnly
				error={hasError}
				{...rest}
				right={
					<TextInput.Icon
						icon="calendar"
						onPress={() =>
							datePicker.open({
								value: field.value,
								onSelect: field.onChange,
								minDate,
								maxDate,
							})
						}
					/>
				}
			/>
			<HelperText type="error" visible={hasError}>
				{/*  TODO translate errors*/}
				{fieldState.error?.type}
			</HelperText>
		</View>
	)
}
