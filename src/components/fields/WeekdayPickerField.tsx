import { type UseControllerProps, useController } from "react-hook-form"
import { View } from "react-native"
import { HelperText } from "react-native-paper"
import { WeekdayPicker } from "../pickers/weekdayPicker"

export function WeekdayPickerField<T extends object>(
	props: UseControllerProps<T> & { readOnly?: boolean },
) {
	const { readOnly } = props
	const { field, fieldState } = useController(props)
	// const rest = useProps(props)
	const hasError = fieldState.error !== undefined
	const value = field.value || []
	return (
		<View>
			<WeekdayPicker
				readOnly={readOnly}
				selected={value}
				onSelect={field.onChange}
			/>
			{hasError && (
				<HelperText type="error" visible={hasError}>
					{/*  TODO translate errors*/}
					{fieldState.error?.message}
				</HelperText>
			)}
		</View>
	)
}
