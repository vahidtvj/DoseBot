import { useProps } from "@/utils"
import { UseControllerProps, useController } from "react-hook-form"
import { StyleProp, View, ViewStyle } from "react-native"
import { HelperText, TextInput, TextInputProps } from "react-native-paper"

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

	return (
		<View style={containerStyle}>
			<TextInput
				value={String(field.value)}
				onChangeText={field.onChange}
				onBlur={field.onBlur}
				error={hasError}
				{...rest}
			/>
			{!noHelper && (
				<HelperText type="error" visible={hasError}>
					{/*  TODO translate errors*/}
					{fieldState.error?.type}
				</HelperText>
			)}
		</View>
	)
}
