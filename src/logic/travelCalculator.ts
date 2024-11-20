import { Weekdays } from "@/constants"
import type { IMedicineFull } from "@/db"
import {
	differenceInCalendarDays,
	endOfDay,
	getDay,
	isAfter,
	isBefore,
	startOfDay,
} from "date-fns"

export function travelCalculator(props: {
	meds: IMedicineFull[]
	selectedMeds: boolean[]
	start: Date
	end: Date
}) {
	const start = startOfDay(props.start)
	const end = endOfDay(props.end)
	const { meds, selectedMeds } = props

	const countList: number[] = meds.map((x, index) => {
		if (selectedMeds[index] === false) return 0
		let count = 0
		for (const sc of x.schedules) {
			if (sc.dosing.length === 0) continue
			if (sc.endDate && isBefore(sc.endDate, start)) continue
			if (isAfter(sc.startDate, end)) continue

			const scStart = isAfter(sc.startDate, start) ? sc.startDate : start
			const scEnd = sc.endDate && isBefore(sc.endDate, end) ? sc.endDate : end
			const days = differenceInCalendarDays(scEnd, scStart) + 1

			if (sc.type === "Daily")
				count += days * sc.dosing.reduce((sum, item) => sum + item.amount, 0)
			else if (sc.type === "EveryXdays" && sc.interval !== null) {
				// should never be negative
				const diff = differenceInCalendarDays(scStart, sc.startDate)
				const deltaDay = Math.abs(diff)
				const deltaI = diff <= 0 ? diff : sc.interval - (deltaDay % sc.interval)
				const m = Math.floor((days - 1 - deltaI) / sc.interval) + 1
				count += m * sc.dosing.reduce((sum, item) => sum + item.amount, 0)
			} else if (sc.type === "Weekly" && sc.days && sc.days.length > 0) {
				const wholeWeeks = Math.floor(days / 7)
				let m = wholeWeeks * sc.days.length
				const rem = days % 7

				if (rem !== 0) {
					const startDay = getDay(scStart)
					const endDay = (startDay + rem - 1) % 7
					for (const day of sc.days) {
						const i = Weekdays.findIndex((x) => x === day)
						if (endDay >= startDay) m += i >= startDay && i <= endDay ? 1 : 0
						else m += i >= startDay || i <= endDay ? 1 : 0
					}
				}
				count += m * sc.dosing.reduce((sum, item) => sum + item.amount, 0)
			}
		}
		return count
	})
	return countList
}
