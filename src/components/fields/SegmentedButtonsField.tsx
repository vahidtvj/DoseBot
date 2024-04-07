import { useProps } from "@/utils"
import { UseControllerProps, useController } from "react-hook-form"
import { SegmentedButtons, SegmentedButtonsProps } from "react-native-paper"

export function SegmentedButtonsField<T extends object>(
	props: UseControllerProps<T> &
		Omit<SegmentedButtonsProps, "value" | "onValueChange">,
) {
	const { field } = useController(props)
	const rest = useProps(props)
	// const hasError = fieldState.error !== undefined

	return (
		<SegmentedButtons
			value={field.value}
			onValueChange={field.onChange}
			{...rest}
		/>
	)
}
