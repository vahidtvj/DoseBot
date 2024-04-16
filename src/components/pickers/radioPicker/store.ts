import { create } from "zustand"

type IState = {
	open: boolean
	title?: string
	values: {
		label: string
		subtitle?: string
		key: string
	}[]
	onChange?: (val: string) => void
	selected?: string
}

export const usePickerState = create<IState>()((_set) => ({
	open: false,
	title: undefined,
	values: [],
	onChange: undefined,
	selected: undefined,
}))

export function showPicker(props: {
	title?: string
	values: {
		label: string
		subtitle?: string
		key: string
	}[]
	onChange: (value: string) => void
	selected?: string
}) {
	usePickerState.setState({
		open: true,
		title: props.title,
		values: props.values,
		onChange: props.onChange,
		selected: props.selected,
	})
}
