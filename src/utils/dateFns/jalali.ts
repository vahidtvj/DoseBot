export {
	format,
	getDaysInMonth,
	isThisMonth,
	setDate,
	startOfMonth,
	addMonths,
	subMonths,
	differenceInMonths,
	differenceInYears,
	getDate,
	eachDayOfInterval,
	startOfWeek,
	addDays,
	getYear,
	getMonth,
	addYears,
	eachMonthOfInterval,
	startOfYear,
	endOfYear,
	setMonth,
	differenceInCalendarYears,
	differenceInCalendarMonths,
	isBefore,
	isAfter,
	subDays,
} from "date-fns-jalali"
import { getDay as jGetDay } from "date-fns-jalali"

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date. Starts on Sat(شنبه)
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
export const getDay = (date: string | number | Date) => (jGetDay(date) + 1) % 7
