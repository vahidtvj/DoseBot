import { useProps } from "@/utils"
import { type UseControllerProps, useController } from "react-hook-form"
import { type StyleProp, View, type ViewStyle } from "react-native"
import { HelperText, TextInput, type TextInputProps } from "react-native-paper"

export function TextInputField<T extends object>(
	props: UseControllerProps<T> &
		TextInputProps & {
			containerStyle?: StyleProp<ViewStyle>
			noHelper?: boolean
		},
) {
	const { field, fieldState } = useController(props)
	const { containerStyle, noHelper, ...rest } = useProps(props)
	const hasError = fieldState.error !== undefined
	const value =
		field.value !== null && field.value !== undefined
			? String(field.value)
			: undefined
	return (
		<View style={containerStyle}>
			<TextInput
				value={value}
				onChangeText={field.onChange}
				onBlur={field.onBlur}
				error={hasError}
				{...rest}
			/>
			{!noHelper && hasError && (
				<HelperText type="error" visible={hasError}>
					{fieldState.error?.message}
				</HelperText>
			)}
		</View>
	)
}
