import { type Weekday, Weekdays } from "@/constants"
import type { IScheduleFullCreate } from "@/db"
import { useConfigState } from "@/stores/configStore"
import { isPast, isToday, isTomorrow, isYesterday } from "date-fns"
import { useTranslation } from "react-i18next"
import { useDateFunc } from "./dateFns"

export function formatAlertTime(date: Date) {
	const { format } = useDateFunc.get()
	const { use24Hour } = useConfigState.getState()
	const timeFormat = `${use24Hour ? "HH" : "hh"}:mm${use24Hour ? "" : " aa"}`
	const dateTimeFormat = `P, ${timeFormat}`

	if (isToday(date)) return format(date, timeFormat)

	return format(date, dateTimeFormat)
}

export const useDateUtils = () => {
	const { format, differenceInCalendarDays } = useDateFunc()
	const { t, i18n } = useTranslation()
	const use24Hour = useConfigState((x) => x.use24Hour)
	const timeFormat = `${use24Hour ? "HH" : "hh"}:mm${use24Hour ? "" : " aa"}`
	const dateTimeFormat = `P, ${timeFormat}`

	function getOrderedWeekdays(): Weekday[] {
		return i18n.language === "fa"
			? ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
			: Weekdays
	}
	function getScheduleText(schedule: IScheduleFullCreate) {
		if (schedule.type === "Daily") {
			return t("medicine.dailyDose", {
				count: schedule.dosing.length,
			})
		}
		if (schedule.type === "EveryXdays") {
			return (
				schedule.interval &&
				t("medicine.everyXdayDose", {
					count: schedule.interval,
				})
			)
		}
		if (schedule.type === "Weekly") {
			return schedule.days?.map((day) => t(`date.${day}`)).join(t("join"))
		}
	}
	function toTimeString(date: Date) {
		return format(date, timeFormat)
	}
	function formatDoseTime(date: Date) {
		if (isToday(date)) return format(date, timeFormat)
		if (isYesterday(date))
			return `${t("yesterday")} ${format(date, timeFormat)}`
		if (isTomorrow(date)) return `${t("tomorrow")} ${format(date, timeFormat)}`
		// return date.toLocaleDateString("fa", {
		// 	hour: "2-digit",
		// 	minute: "2-digit",
		// })
		return format(date, dateTimeFormat)
	}
	const formatDosingTime = (date: Date) => format(date, timeFormat)

	const formatDate = (date: Date) => format(date, "P")

	const formatNextDose = (date: Date) => {
		const days = differenceInCalendarDays(date, new Date())
		if (days <= 0) return format(date, timeFormat)
		if (days === 1) return `${t("tomorrow")} ${format(date, timeFormat)}`
		return `${t("numDays", { count: days })} ${format(date, timeFormat)}`
	}

	return {
		formatDate,
		getScheduleText,
		getOrderedWeekdays,
		formatDoseTime,
		formatDosingTime,
		toTimeString,
		formatNextDose,
	}
}

// TODO past, future
export function hasStarted(date: Date): boolean {
	return isPast(date)
}
export function hasEnded(date: Date): boolean {
	return isPast(date)
}
