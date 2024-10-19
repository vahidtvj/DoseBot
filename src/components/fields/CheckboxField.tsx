import { useProps } from "@/utils"
import { type UseControllerProps, useController } from "react-hook-form"
import { Checkbox, type CheckboxProps } from "react-native-paper"

export function CheckboxField<T extends object>(
	props: UseControllerProps<T> &
		Omit<CheckboxProps, "status" | "onPress"> & { readOnly?: boolean },
) {
	const { field } = useController(props)
	const rest = useProps(props)
	const { readOnly } = props
	// const hasError = fieldState.error !== undefined

	return (
		<Checkbox
			disabled={readOnly}
			status={field.value ? "checked" : "unchecked"}
			onPress={() => field.onChange(!field.value)}
			{...rest}
		/>
	)
}
