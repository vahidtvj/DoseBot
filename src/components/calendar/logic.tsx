import { useDateFunc } from "@/utils"
import { useCallback, useMemo, useState } from "react"

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
		differenceInCalendarMonths,
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
		{ length: differenceInCalendarYears(maxDate, minDate) + 1 },
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
		else if (isAfter(date, maxDate))
			props.onSelect(differenceInCalendarMonths(maxDate, minDate))
		else props.onSelect(differenceInCalendarMonths(date, minDate))
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
type UseCalendarProps = {
	minDate: Date
	maxDate: Date
	today: Date
	date: Date
	onSelect?: (date: Date) => void
	onChange?: (date: Date) => void
	showSelection?: boolean
	onIndexChange?: (newIndex: number, oldIndex?: number) => void
}
export const useCalendar = (props: UseCalendarProps) => {
	const func = useDateFunc()
	const {
		getDate,
		getDaysInMonth,
		addMonths,
		setDate,
		differenceInCalendarMonths,
		subDays,
	} = func

	const minDate = props.minDate
	const maxDate = subDays(props.maxDate, 1)
	const today = props.today
	const date = props.date || today
	const todayIndex = differenceInCalendarMonths(today, minDate)
	const dateIndex = differenceInCalendarMonths(date, minDate)

	const monthArray = [
		...Array(differenceInCalendarMonths(maxDate, minDate) + 1).keys(),
	]

	const [index, setIndex] = useState(dateIndex)

	const [selectedDay, setSelectedDay] = useState(getDate(date))

	function onIndexChange(newIndex: number) {
		setIndex(newIndex)
		props.onIndexChange?.(newIndex, index)
		let day = selectedDay
		const newMonth = addMonths(minDate, newIndex)
		const daysInMonth = getDaysInMonth(newMonth)
		if (newIndex === 0 && selectedDay < getDate(minDate)) day = getDate(minDate)
		else if (
			newIndex === monthArray.length - 1 &&
			selectedDay > getDate(maxDate)
		)
			day = getDate(maxDate)
		else if (daysInMonth < selectedDay) day = daysInMonth

		setSelectedDay(day)
		const dateObj = setDate(newMonth, day)
		props.onChange?.(dateObj)
	}

	function onSelectDay(day: number) {
		setSelectedDay(day)
		const dateObj = setDate(addMonths(minDate, index), day)
		props.onChange?.(dateObj)
		props.onSelect?.(dateObj)
	}

	const [headerIsOpen, setHeaderOpen] = useState(false)

	return {
		index,
		selectedDay,
		monthArray,
		today,
		todayIndex,
		minDate,
		maxDate,
		dateIndex,
		onIndexChange,
		onSelectDay,
		headerIsOpen,
		setHeaderOpen,
		...func,
	}
}

const isActiveDay = (i: number, val: unknown) =>
	i >= 7 && !((val as number) > i || (val as number) + 12 < i)

type UseMonthViewProps = {
	today: Date
	month: Date
}
export const useMonthView = (props: UseMonthViewProps) => {
	const func = useDateFunc()
	const {
		getDate,
		weekdays,
		getDaysInMonth,
		startOfMonth,
		subMonths,
		getDay,
		isSameMonth,
	} = func

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
		[getDaysInMonth, startOfMonth, subMonths, getDay, weekdays],
	)

	const days = useMemo(() => getDays(props.month), [props.month, getDays])

	const todayDate = isSameMonth(props.today, props.month)
		? getDate(props.today)
		: undefined

	return { todayDate, days, isActiveDay }
}
