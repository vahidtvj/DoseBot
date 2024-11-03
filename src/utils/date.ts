import { type Weekday, Weekdays } from "@/constants"
import type { IScheduleFullCreate } from "@/db"
import { useConfigState } from "@/stores/configStore"
import { format, isPast, isToday, isTomorrow, isYesterday } from "date-fns"
import { format as jFormat } from "date-fns-jalali"
import { useTranslation } from "react-i18next"

export function formatAlertTime(date: Date, use24Hour?: boolean) {
	if (isToday(date)) return toTimeString(date)

	const is24Hour = use24Hour ?? useConfigState.getState().use24Hour
	return date.toLocaleDateString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !is24Hour,
	})
}

export function toTimeString(date: Date, use24Hour?: boolean) {
	const is24Hour = use24Hour ?? useConfigState.getState().use24Hour
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: !is24Hour,
	})
}

export const useDateUtils = () => {
	const { t, i18n } = useTranslation()
	const iFormat = i18n.language === "fa" ? jFormat : format
	const use24Hour = useConfigState((x) => x.use24Hour)
	const timeFormat = `${use24Hour ? "HH" : "hh"}:mm${use24Hour ? "" : "aa"}`
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
	function formatDoseTime(date: Date) {
		if (isToday(date)) return iFormat(date, timeFormat)
		if (isYesterday(date))
			return `${t("yesterday")} ${iFormat(date, timeFormat)}`
		if (isTomorrow(date)) return `${t("tomorrow")} ${iFormat(date, timeFormat)}`
		// return date.toLocaleDateString("fa", {
		// 	hour: "2-digit",
		// 	minute: "2-digit",
		// })
		return iFormat(date, dateTimeFormat)
	}
	const formatDosingTime = (date: Date) => iFormat(date, timeFormat)

	const formatDate = (date: Date) => iFormat(date, "P")

	return {
		formatDate,
		getScheduleText,
		getOrderedWeekdays,
		formatDoseTime,
		formatDosingTime,
	}
}

// TODO past, future
export function hasStarted(date: Date): boolean {
	return isPast(date)
}
export function hasEnded(date: Date): boolean {
	return isPast(date)
}
