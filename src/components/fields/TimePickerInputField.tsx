import { useProps } from "@/utils"
import { useDateFunc } from "@/utils"
import { toTimeString } from "@/utils"
import { useState } from "react"
import {
	type FieldValues,
	type UseControllerProps,
	useController,
} from "react-hook-form"
import { type StyleProp, View, type ViewStyle } from "react-native"
import { HelperText, TextInput, type TextInputProps } from "react-native-paper"
import { TimePickerModal } from "react-native-paper-dates"

type TimePickerReturnType = {
	hours: number
	minutes: number
}

export function TimePickerInputField<T extends FieldValues>(
	props: UseControllerProps<T> &
		Omit<TextInputProps, "value" | "onChange" | "readOnly" | "right"> & {
			containerStyle?: StyleProp<ViewStyle>
			noHelper?: boolean
		},
) {
	const { field, fieldState } = useController(props)
	const { containerStyle, noHelper, ...rest } = useProps(props)
	const hasError = fieldState.error !== undefined

	const value = field.value && toTimeString(field.value)
	const [visible, setVisible] = useState(false)

	function onPickerClose(time?: TimePickerReturnType) {
		setVisible(false)
		if (!time) return
		const { hours, minutes } = time
		const date = new Date()
		date.setHours(hours)
		date.setMinutes(minutes)
		field.onChange(date)
	}

	return (
		<View style={containerStyle}>
			<TextInput
				value={value}
				readOnly
				error={hasError}
				{...rest}
				right={<TextInput.Icon icon="clock" onPress={() => setVisible(true)} />}
			/>

			{!noHelper && hasError && (
				<HelperText type="error" visible={hasError}>
					{/*  TODO translate errors*/}
					{fieldState.error?.message}
				</HelperText>
			)}
			<TimePickerModal
				visible={visible}
				onDismiss={() => onPickerClose()}
				onConfirm={(time) => onPickerClose(time)}
			/>
		</View>
	)
}
