import { Constants } from "@/config"
import {
	type IDoseFull,
	changeDoseStatus,
	getAllMeds,
	getMed,
	getPendingDoseListFull,
	insertDoses,
} from "@/db"
import { useAppState } from "@/stores/app"
// import * as Sentry from "@sentry/react-native"
import { isFuture, isToday, startOfToday, startOfTomorrow } from "date-fns"
import { getDosage } from "./getDosage"
const noop = () => {}

export async function addDoseOnCreate(medId?: number) {
	if (!medId) return
	const med = await getMed(medId)
	if (!med) return

	const list = getDosage([med])
	await insertDoses(list)
}

async function addDoses(tomorrow = false) {
	const data = await getAllMeds.execute()
	const list = getDosage(data, tomorrow ? startOfTomorrow() : undefined)
	await insertDoses(list)
	useAppState.setState({
		doseStoreDay: tomorrow ? startOfTomorrow() : startOfToday(),
	})
}

async function clearDoses(data: IDoseFull[]) {
	for (const dose of data) {
		if (!isFuture(dose.time) && !isToday(dose.time))
			await changeDoseStatus(dose.id, "skip")
	}
}

export async function onScheduleRunEvent() {
	// on background service, boot, app start, ...
	const { doseStoreDay } = useAppState.getState()
	const now = new Date()
	const data = await getPendingDoseListFull.execute()
	if (!data) return
	// ! check to remove old doses
	if (data.length === 0) noop()
	// * remove (skip) yesterday's pending doses after certain hour
	else if (now.getHours() >= Constants.clearDoseHour) await clearDoses(data)

	// ! check to add new doses
	// first launch ?
	if (!doseStoreDay) await addDoses()
	// // * we have already scheduled for tomorrow
	else if (isFuture(doseStoreDay)) noop()
	// // doseStoreDay isPast (!isFuture) & no dose generated for today
	else if (!isToday(doseStoreDay)) await addDoses()
	// // doseStoreDay isToday but we are past refill hour
	else if (now.getHours() >= Constants.rescheduleHour) await addDoses(true) // run for tomorrow
}
