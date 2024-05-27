import type { UseControllerProps } from "react-hook-form"

export function useProps<T extends object, U>(
	props: UseControllerProps<T> & U,
) {
	const {
		name: _name,
		control: _control,
		defaultValue: _defaultValue,
		disabled: _disabled,
		rules: _rules,
		shouldUnregister: _shouldUnregister,
		...rest
	} = props
	return rest
}
