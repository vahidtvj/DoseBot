import { DatePicker } from "./datepicker"
import { useDatePickerState } from "./store"

export function DatePickerModal() {
	const { isOpen, onSelect, maxDate, minDate, value, onDismiss } =
		useDatePickerState()

	return (
		<DatePicker
			open={isOpen}
			minDate={minDate}
			maxDate={maxDate}
			date={value}
			onSelect={onSelect}
			onDismiss={onDismiss}
		/>
	)
}

export { datePicker } from "./store"
