import { useProps } from "@/utils"
import { UseControllerProps, useController } from "react-hook-form"
import { StyleProp, View, ViewStyle } from "react-native"
import { HelperText } from "react-native-paper"
import { DatePickerInput } from "react-native-paper-dates"
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared"

export function DatePickerInputField<T extends object>(
	props: UseControllerProps<T> &
		Omit<DatePickerInputProps, "value" | "onChange"> & {
			containerStyle?: StyleProp<ViewStyle>
		},
) {
	const { field, fieldState } = useController(props)
	const { containerStyle, ...rest } = useProps(props)
	const hasError = fieldState.error !== undefined

	return (
		<View style={containerStyle}>
			<DatePickerInput
				value={field.value}
				onBlur={field.onBlur}
				// onChangeText={() => console.log("c")}
				onChange={field.onChange}
				error={hasError}
				{...rest}
			/>
			<HelperText type="error" visible={hasError}>
				{/*  TODO translate errors*/}
				{fieldState.error?.type}
			</HelperText>
		</View>
	)
}
