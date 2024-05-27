import type { IDose, IMedicine, Weekday } from "@/models"
import { hasEnded, hasStarted } from "@/utils"
import { differenceInDays, startOfToday } from "date-fns"
import { randomUUID } from "expo-crypto"

const weekdayLookup: Weekday[] = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
]

function getTimeInToday(time: Date, today: Date) {
	const newTime = new Date(today)
	newTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
	return newTime
}

export function getDosage(data: IMedicine[], day?: Date): IDose[] {
	const today = day || startOfToday()
	const list: IDose[] = []

	for (const med of data) {
		if (!med.schedule) continue
		for (const schedule of med.schedule) {
			if (schedule.endDate && hasEnded(schedule.endDate)) continue
			if (!hasStarted(schedule.startDate)) continue
			if (schedule.type === "EveryXdays") {
				const daysPast = differenceInDays(today, schedule.startDate)
				if (daysPast % schedule.interval !== 0) continue
			} else if (schedule.type === "Weekly") {
				const weekday = weekdayLookup[today.getDay()]
				if (!schedule.days.includes(weekday)) continue
			}

			for (const dosing of schedule.dosing) {
				list.push({
					id: randomUUID(),
					medId: med.id,
					name: med.name,
					type: med.type,
					status: "pending",
					amount: dosing.amount,
					time: getTimeInToday(dosing.time, today),
				})
			}
		}
	}
	return list
}
