import { type Weekday, Weekdays } from "@/constants"
import type { IScheduleFullCreate } from "@/db"
import { format, isPast, isToday, isTomorrow, isYesterday } from "date-fns"
import { format as jFormat } from "date-fns-jalali"
import { useTranslation } from "react-i18next"

// TODO translate this func
export function formatAlertTime(date: Date) {
	if (isToday(date))
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})

	return date.toLocaleDateString([], {
		hour: "2-digit",
		minute: "2-digit",
	})
}

export function toTimeString(date: Date) {
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	})
}

export const useDateUtils = () => {
	const { t, i18n } = useTranslation()
	const iFormat = i18n.language === "fa" ? jFormat : format

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
	function formatAlertTime(date: Date) {
		if (isToday(date)) return iFormat(date, "p")
		if (isYesterday(date)) return `${t("yesterday")} ${iFormat(date, "p")}`
		if (isTomorrow(date)) return `${t("tomorrow")} ${iFormat(date, "p")}`
		// return date.toLocaleDateString("fa", {
		// 	hour: "2-digit",
		// 	minute: "2-digit",
		// })
		return iFormat(date, "Pp")
	}
	const formatDoseTime = (date: Date) => iFormat(date, "p")

	const formatDate = (date: Date) => iFormat(date, "P")

	return {
		formatDate,
		getScheduleText,
		getOrderedWeekdays,
		formatAlertTime,
		formatDoseTime,
	}
}

// TODO past, future
export function hasStarted(date: Date): boolean {
	return isPast(date)
}
export function hasEnded(date: Date): boolean {
	return isPast(date)
}
