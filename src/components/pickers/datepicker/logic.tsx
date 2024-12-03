import { useDateFunc } from "@/utils"
import { useRef } from "react"
type UseDatePickerProps = {
	date?: Date
	onSelectDay?: (date: Date) => void
	minDate?: Date
	maxDate?: Date
}

export const useDatePicker = (props: UseDatePickerProps) => {
	const func = useDateFunc()
	const { subDays } = func

	const minDate = props.minDate || new Date(1900, 0)
	const maxDate = subDays(props.maxDate || new Date(2100, 0), 1)
	const today = new Date()
	// TODO date should be in between min and max
	const date = props.date || today
	const dateRef = useRef(date)

	return {
		date,
		today,
		minDate,
		maxDate,
		dateRef,
		...func,
	}
}
