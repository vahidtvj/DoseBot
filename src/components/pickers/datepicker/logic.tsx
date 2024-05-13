import { useCallback, useMemo, useState } from "react"
import { useDateFunc } from "./locale"
type UseDatePickerProps = {
	date?: Date
	onSelect: (date?: Date) => void
	minDate?: Date
	maxDate?: Date
}

export const useDatePicker = (props: UseDatePickerProps) => {
	const func = useDateFunc()
	const { differenceInMonths, getDate, getDaysInMonth, addMonths } = func

	const minDate = props.minDate || new Date(1900, 0)
	const maxDate = props.maxDate || new Date(2100, 0)
	const today = new Date()
	const date = props.date || today
	const todayIndex = differenceInMonths(today, minDate)
	const dateIndex = differenceInMonths(date, minDate)

	const monthArray = [...Array(differenceInMonths(maxDate, minDate)).keys()]

	const [index, setIndex] = useState(dateIndex)

	const [selectedDay, setSelectedDay] = useState(getDate(date))

	function onIndexChange(newIndex: number) {
		setIndex(newIndex)
		const daysInMonth = getDaysInMonth(addMonths(minDate, newIndex))
		if (daysInMonth < selectedDay) setSelectedDay(daysInMonth)
	}

	function onSelect() {
		const dateObj = addMonths(minDate, index)
		dateObj.setDate(selectedDay)
		props.onSelect(dateObj)
	}
	function onClose() {
		props.onSelect()
	}

	return {
		index,
		selectedDay,
		setSelectedDay,
		monthArray,
		today,
		todayIndex,
		minDate,
		maxDate,
		dateIndex,
		onIndexChange,
		onSelect,
		onClose,
		...func,
	}
}

const isActiveDay = (i: number, val: unknown) =>
	i >= 7 && !((val as number) > i || (val as number) + 12 < i)

type UseCalendarProps = {
	today: Date
	date: Date
}
export const useCalendar = (props: UseCalendarProps) => {
	const func = useDateFunc()
	const { getDate, weekdays, getDaysInMonth, startOfMonth, subMonths, getDay } =
		func

	const getDays = useCallback(
		(date: Date) => {
			// const header = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
			// const header = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
			const header = weekdays.map((x) => x[0])
			const daysInMonth = getDaysInMonth(date)
			const monthStartDay = getDay(startOfMonth(date))
			const monthEndDay = (monthStartDay + daysInMonth - 1) % 7
			const daysInLastMonth = getDaysInMonth(subMonths(date, 1))
			const prePadding = Array.from(
				{ length: monthStartDay },
				(_x, i) => daysInLastMonth - i,
			).reverse()

			let days = [
				...header,
				...prePadding,
				...Array.from({ length: daysInMonth }, (_x, i) => i + 1),
			]

			const postPadding = Array.from(
				{
					length: 6 - monthEndDay + 7 * (days.length / 7 < 6 ? 1 : 0),
				},
				(_x, i) => i + 1,
			)
			days = [...days, ...postPadding]
			return days
		},
		[getDaysInMonth, startOfMonth, startOfMonth, subMonths, getDay, weekdays],
	)

	const days = useMemo(() => getDays(props.date), [props.date, getDays])

	const todayDate = getDate(props.today)

	return { todayDate, days, isActiveDay }
}
