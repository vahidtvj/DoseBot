import { useDateFunc } from "@/utils"
import { useCallback, useMemo, useState } from "react"
type UseDatePickerProps = {
	date?: Date
	onSelect: (date: Date) => void
	minDate?: Date
	maxDate?: Date
}

export const useDatePicker = (props: UseDatePickerProps) => {
	const func = useDateFunc()
	const {
		differenceInMonths,
		differenceInYears,
		getDate,
		getDaysInMonth,
		addMonths,
		setDate,
	} = func

	const minDate = props.minDate || new Date(1900, 0)
	const maxDate = props.maxDate || new Date(2100, 0)
	const today = new Date()
	const date = props.date || today
	const todayIndex = differenceInMonths(today, minDate)
	const dateIndex = differenceInMonths(date, minDate)

	const monthArray = [...Array(differenceInMonths(maxDate, minDate)).keys()]

	const yearArray = [...Array(differenceInYears(maxDate, minDate)).keys()]

	const [index, setIndex] = useState(dateIndex)

	const [selectedDay, setSelectedDay] = useState(getDate(date))

	function onIndexChange(newIndex: number) {
		setIndex(newIndex)
		const daysInMonth = getDaysInMonth(addMonths(minDate, newIndex))
		if (daysInMonth < selectedDay) setSelectedDay(daysInMonth)
	}

	function onSelect() {
		const dateObj = setDate(addMonths(minDate, index), selectedDay)
		props.onSelect(dateObj)
	}

	const [headerIsOpen, setHeaderOpen] = useState(false)

	return {
		index,
		selectedDay,
		setSelectedDay,
		monthArray,
		yearArray,
		today,
		todayIndex,
		minDate,
		maxDate,
		dateIndex,
		onIndexChange,
		onSelect,
		headerIsOpen,
		setHeaderOpen,
		...func,
	}
}

export const useHeaderPicker = (props: {
	minDate: Date
	maxDate: Date
	monthIndex?: number
	onSelect: (monthIndex: number) => void
	today?: Date
}) => {
	const func = useDateFunc()
	const {
		differenceInCalendarYears,
		differenceInMonths,
		getYear,
		getMonth,
		addMonths,
		addYears,
		monthNames,
		setMonth,
		isAfter,
		isBefore,
	} = func
	const { maxDate, minDate } = props
	const today = props.today || new Date()

	const date =
		props.monthIndex !== undefined
			? addMonths(minDate, props.monthIndex)
			: today

	const startYear = getYear(minDate)
	const yearArray = Array.from(
		{ length: differenceInCalendarYears(maxDate, minDate) },
		(_x, i) => startYear + i,
	)

	const [yearIndex, setYearIndex] = useState(
		differenceInCalendarYears(date, minDate) + 2,
	)

	const monthArray = Array.from({ length: 1200 }, (_x, i) => i % 12)
	const [monthIndex, setMonthIndex] = useState(1200 / 2 - 2 + getMonth(date))

	function onDismiss() {
		const date = setMonth(addYears(minDate, yearIndex - 2), monthIndex % 12)
		if (isBefore(date, minDate)) props.onSelect(0)
		// TODO test this
		else if (isAfter(date, maxDate)) props.onSelect(yearArray.length - 2 - 1)
		else props.onSelect(differenceInMonths(date, minDate))
	}
	return {
		yearArray,
		monthArray,
		monthNames,
		yearIndex,
		setYearIndex,
		monthIndex,
		setMonthIndex,
		onDismiss,
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
