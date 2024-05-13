import { create } from "zustand"

type State = {
	isOpen: boolean
	open: (props: {
		onSelect: (date: Date) => void
		onDismiss?: () => void
		value?: Date
		minDate?: Date
		maxDate?: Date
	}) => void
	close: () => void
	onSelect: (date: Date) => void
	onDismiss?: () => void
	value?: Date
	minDate?: Date
	maxDate?: Date
}

export const useDatePickerState = create<State>()((set) => ({
	isOpen: false,
	onSelect: () => {},
	open: ({ onSelect, maxDate, minDate, onDismiss, value }) => {
		set({
			minDate,
			maxDate,
			value,
			isOpen: true,
			onSelect: (date) => {
				set({ isOpen: false })
				onSelect(date)
			},
			onDismiss: () => {
				set({ isOpen: false })
				onDismiss?.()
			},
		})
	},
	close: () => set({ isOpen: false }),
}))

export const datePicker = {
	open: useDatePickerState.getState().open,
	close: useDatePickerState.getState().close,
}
