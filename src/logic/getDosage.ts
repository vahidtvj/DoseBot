import { Weekdays } from "@/constants"
import type { IDoseCreate, IMedicineFull } from "@/db"
import {
	differenceInCalendarDays,
	endOfDay,
	isAfter,
	isBefore,
	startOfDay,
	startOfToday,
} from "date-fns"

function getTimeInToday(time: Date, today: Date) {
	const newTime = new Date(today)
	newTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
	return newTime
}

export function getDosage(data: IMedicineFull[], day?: Date): IDoseCreate[] {
	const today = day !== undefined ? startOfDay(day) : startOfToday()
	const endOfToday = endOfDay(today)
	const list: IDoseCreate[] = []

	for (const med of data) {
		if (!med.schedules) continue
		for (const schedule of med.schedules) {
			// is finished inclusive [start, end]
			if (schedule.endDate && isBefore(schedule.endDate, endOfToday)) continue

			// not started yet
			if (isAfter(schedule.startDate, endOfToday)) continue

			if (schedule.type === "EveryXdays" && schedule.interval !== null) {
				// calendar days past. not how many 24 hours
				const daysPast = differenceInCalendarDays(today, schedule.startDate)
				if (daysPast % schedule.interval !== 0) continue
			} else if (schedule.type === "Weekly" && schedule.days !== null) {
				const weekday = Weekdays[today.getDay()]
				if (!schedule.days.includes(weekday)) continue
			}

			for (const dosing of schedule.dosing) {
				list.push({
					medicineId: med.id,
					status: "pending",
					amount: dosing.amount,
					time: getTimeInToday(dosing.time, today),
				})
			}
		}
	}
	return list
}
