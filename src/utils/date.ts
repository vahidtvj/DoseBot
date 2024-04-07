import { Schedule, Weekday } from "@/models"
import { isPast, isToday, isTomorrow, isYesterday } from "date-fns"
import { useTranslation } from "react-i18next"
export const Weekdays: Weekday[] = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
]

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
	function getOrderedWeekdays(): Weekday[] {
		return i18n.language === "fa"
			? ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
			: Weekdays
	}
	function getScheduleText(schedule: Schedule) {
		if (schedule.type === "Daily") {
			return t("medicine.dailyDose", {
				count: schedule.dosing.length,
			})
		}
		if (schedule.type === "EveryXdays") {
			return t("medicine.everyXdayDose", {
				count: schedule.interval,
			})
		}
		if (schedule.type === "Weekly") {
			return schedule.days.map((day) => t(`date.${day}`)).join(t("join"))
		}
	}
	function formatAlertTime(date: Date) {
		if (isToday(date))
			return date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})
		if (isYesterday(date))
			return `${t("yesterday")} ${date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`
		if (isTomorrow(date))
			return `${t("tomorrow")} ${date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`
		return date.toLocaleDateString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
	}
	return { getScheduleText, getOrderedWeekdays, formatAlertTime }
}

export function formatDoseTime(date: Date) {
	return date.toLocaleTimeString()
}

// TODO past, future
export function hasStarted(date: Date): boolean {
	return isPast(date)
}
export function hasEnded(date: Date): boolean {
	return isPast(date)
}
