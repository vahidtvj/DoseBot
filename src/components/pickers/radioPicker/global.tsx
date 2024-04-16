import { RadioPicker } from "./picker"
import { usePickerState } from "./store"

export function RadioPickerGlobal() {
	const store = usePickerState()
	function onSelect(val?: string) {
		usePickerState.setState({ open: false })
		if (!val) return
		store.onChange?.(val)
	}
	return (
		<RadioPicker
			open={store.open}
			values={store.values}
			onSelect={onSelect}
			selected={store.selected}
			title={store.title}
		/>
	)
}
