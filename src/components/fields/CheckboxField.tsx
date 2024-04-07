import { useProps } from "@/utils"
import { UseControllerProps, useController } from "react-hook-form"
import { Checkbox, CheckboxProps } from "react-native-paper"

export function CheckboxField<T extends object>(
	props: UseControllerProps<T> & Omit<CheckboxProps, "status" | "onPress">,
) {
	const { field } = useController(props)
	const rest = useProps(props)
	// const hasError = fieldState.error !== undefined

	return (
		<Checkbox
			status={field.value ? "checked" : "unchecked"}
			onPress={() => field.onChange(!field.value)}
			{...rest}
		/>
	)
}
