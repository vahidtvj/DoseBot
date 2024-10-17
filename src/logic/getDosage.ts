import { Weekdays } from "@/constants"
import type { IDoseCreate, IMedicineFull } from "@/db"
import { hasEnded, hasStarted } from "@/utils"
import { differenceInDays, startOfToday } from "date-fns"

function getTimeInToday(time: Date, today: Date) {
	const newTime = new Date(today)
	newTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
	return newTime
}

export function getDosage(data: IMedicineFull[], day?: Date): IDoseCreate[] {
	const today = day || startOfToday()
	const list: IDoseCreate[] = []

	for (const med of data) {
		if (!med.schedules) continue
		for (const schedule of med.schedules) {
			if (schedule.endDate && hasEnded(schedule.endDate)) continue
			if (!hasStarted(schedule.startDate)) continue
			if (schedule.type === "EveryXdays" && schedule.interval !== null) {
				const daysPast = differenceInDays(today, schedule.startDate)
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
