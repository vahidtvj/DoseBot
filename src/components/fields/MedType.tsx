import { IMedicineType, MedIconMap, MedTypeList } from "@/models"
import { useState } from "react"
import { UseControllerProps, useController } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Chip } from "react-native-paper"
import { ItemPicker } from "../pickers/itemPicker"

export function MedTypeField<T extends object>(props: UseControllerProps<T>) {
	const { t } = useTranslation()
	const { field } = useController(props)
	// const rest = useProps(props)
	// const hasError = fieldState.error !== undefined

	const value = field.value as IMedicineType
	const [open, setOpen] = useState(false)

	function onSelect(value?: IMedicineType) {
		setOpen(false)
		if (!value) return
		field.onChange(value)
	}

	return (
		<View>
			<Chip mode="flat" icon={MedIconMap[value]} onPress={() => setOpen(true)}>
				{t(`medType.${value}`)}
			</Chip>
			<ItemPicker
				values={MedTypeList.map((x) => {
					return { key: x, label: t(`medType.${x}`), icon: MedIconMap[x] }
				})}
				selected={value}
				onSelect={onSelect}
				open={open}
			/>
		</View>
	)
}
