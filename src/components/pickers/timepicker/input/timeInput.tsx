import { useAppTheme } from "@/theme"
import { forwardRef, useCallback, useEffect, useState } from "react"
import { type TextInput as TextInputR, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"

type TimeInputProps = {
	value: number
	onChange: (value: number) => void
	input: "hour" | "hour24" | "minute"
	onPress: () => void
	active: boolean
	editable: boolean
}

function formatValue(value: string, input: "hour" | "hour24" | "minute") {
	const valueNumber = Number(value)
	if (input === "minute") return valueNumber >= 60 ? 59 : valueNumber
	if (input === "hour24") return valueNumber >= 24 ? 23 : valueNumber
	if (valueNumber === 0) return 12
	if (valueNumber <= 12) return valueNumber
	if (valueNumber < 24) return valueNumber - 12
	return 12
}
function formatInput(value: number) {
	return value < 10 ? `0${value}` : String(value)
}
export const TimeInput = forwardRef<TextInputR, TimeInputProps>(
	(props, ref) => {
		const { active, input, editable } = props

		const theme = useAppTheme()
		const [inputFocused, setInputFocused] = useState(false)

		const highLighted = inputFocused || active

		const [inputValue, setInputValue] = useState(formatInput(props.value))

		useEffect(() => {
			setInputValue(formatInput(props.value))
		}, [props.value])

		useEffect(() => {
			if (!editable) setInputFocused(false)
		}, [editable])

		const onChange = useCallback((value: string) => {
			const numericText = value.replace(/[^0-9]/g, "")
			setInputValue(numericText)
		}, [])

		const onBlur = useCallback(() => {
			setInputFocused(false)
			const value = formatValue(inputValue, input)
			setInputValue(formatInput(value))
			props.onChange(value)
		}, [inputValue, input, props.onChange])

		return (
			<TouchableOpacity onPress={props.onPress}>
				<TextInput
					ref={ref}
					editable={editable}
					mode="outlined"
					style={{
						backgroundColor: highLighted
							? theme.colors.inversePrimary
							: theme.colors.surfaceVariant,
					}}
					outlineStyle={{
						borderWidth: inputFocused ? 2 : 0,
						borderRadius: theme.roundness * 2,
						borderColor: theme.colors.onPrimaryContainer,
					}}
					contentStyle={[
						{
							height: 80,
							minWidth: 96,
							textAlign: "center",
							fontFamily: theme.fonts.displayLarge.fontFamily,
							fontSize: theme.fonts.displayLarge.fontSize,
						},
					]}
					value={inputValue}
					maxLength={2}
					keyboardType="number-pad"
					onFocus={() => setInputFocused(true)}
					onBlur={onBlur}
					onChangeText={onChange}
					onPress={props.onPress}
				/>
			</TouchableOpacity>
		)
	},
)
