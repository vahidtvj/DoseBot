import { Weekdays } from "@/constants"
import type { IDoseCreate, IDosing, IMedicineFull } from "@/db"
import {
	addDays,
	compareAsc,
	differenceInCalendarDays,
	endOfDay,
	getDay,
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

function setMinDose(
	prevDose: IDoseCreate | null,
	data: IDosing,
	date: Date,
): IDoseCreate {
	const newDose: IDoseCreate = {
		amount: data.amount,
		status: "pending",
		time: getTimeInToday(data.time, date),
		medicineId: null,
	}
	if (prevDose === null) return newDose
	if (isAfter(prevDose.time, newDose.time)) return newDose
	return prevDose
}

export function getNextDose(med: IMedicineFull, date = new Date()) {
	let dose: IDoseCreate | null = null

	if (med.removed || med.paused || med.schedules.length === 0) return null
	for (const sc of med.schedules) {
		if (sc.dosing.length === 0) continue
		const scStart = startOfDay(sc.startDate)
		const end = sc.endDate && endOfDay(sc.endDate)
		if (end && isAfter(date, end)) continue

		let start = isAfter(scStart, date) ? scStart : date
		const dosing = sc.dosing.sort((a, b) => compareAsc(a.time, b.time))

		if (start === date) {
			// we are somewhere in today so we take the time value into account as well
			const fDosing = dosing.filter(
				(x) => !isBefore(getTimeInToday(x.time, date), date),
			)
			if (fDosing.length > 0) {
				if (sc.type === "Daily") {
					dose = setMinDose(dose, fDosing[0], date)
					continue
				}
				if (sc.type === "EveryXdays" && sc.interval !== null) {
					if (
						differenceInCalendarDays(date, sc.startDate) % sc.interval ===
						0
					) {
						// if today is the day the interval hits
						dose = setMinDose(dose, fDosing[0], date)
						continue
					}
				}
				if (sc.type === "Weekly" && sc.days && sc.days.length > 0) {
					const day = Weekdays[getDay(date)]
					if (sc.days.find((x) => x === day) !== undefined) {
						// if today is in the list of days for the schedule
						dose = setMinDose(dose, fDosing[0], date)
						continue
					}
				}
			}
			start = startOfDay(addDays(date, 1))
		}
		// at this point no dose was found for today. so time part of date is irrelevant
		// now we find the first available day

		if (sc.type === "Daily") dose = setMinDose(dose, dosing[0], start)
		else if (sc.type === "EveryXdays" && sc.interval !== null) {
			const diff = differenceInCalendarDays(start, sc.startDate) % sc.interval
			const nextIntervalDate =
				diff === 0 ? start : addDays(start, sc.interval - diff)
			dose = setMinDose(dose, dosing[0], nextIntervalDate)
		} else if (sc.type === "Weekly" && sc.days && sc.days.length > 0) {
			const day = getDay(start)
			const availDays = sc.days
				.map((x) => Weekdays.findIndex((d) => x === d))
				.sort()
			let firstHitDay = availDays.find((x) => x >= day)
			if (firstHitDay === undefined) firstHitDay = availDays[0]

			const diff =
				day <= firstHitDay ? firstHitDay - day : 7 + firstHitDay - day
			const nextDate = addDays(start, diff)

			dose = setMinDose(dose, dosing[0], nextDate)
		}
	}
	return dose
}
