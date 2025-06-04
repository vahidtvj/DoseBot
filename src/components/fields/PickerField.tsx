import { useState } from "react"
import {
	type Path,
	type PathValue,
	type UseControllerProps,
	useController,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Chip } from "react-native-paper"
import { ItemPicker } from "../pickers/itemPicker"

export function PickerField<T extends object>(
	props: UseControllerProps<T> & {
		readOnly?: boolean
		values: { key: PathValue<T, Path<T>>; label: string }[]
		icon?: string
	},
) {
	const { field } = useController(props)
	const { readOnly, values } = props
	// const rest = useProps(props)
	// const hasError = fieldState.error !== undefined

	const value = field.value
	const [open, setOpen] = useState(false)

	function onSelect(value?: PathValue<T, Path<T>>) {
		setOpen(false)
		if (!value) return
		field.onChange(value)
	}

	return (
		<View>
			<Chip disabled={readOnly} mode="flat" onPress={() => setOpen(true)}>
				{value}
			</Chip>
			<ItemPicker
				values={values}
				selected={value}
				onSelect={onSelect}
				open={open}
			/>
		</View>
	)
}
