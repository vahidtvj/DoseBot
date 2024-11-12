import { showInventoryAlert } from "@/components/notification"
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
import { useConfigState } from "@/stores/configStore"
// import * as Sentry from "@sentry/react-native"
import { isFuture, isToday, startOfToday, startOfTomorrow } from "date-fns"
import { getDosage } from "./getDosage"
const noop = () => {}

export async function addDoseOnCreate(medId?: number) {
	if (!medId) return
	const med = await getMed(medId)
	if (!med) return

	const { doseStoreDay } = useAppState.getState()

	const list = getDosage([med])
	// if it has added alerts for tomorrow then also generate for this one manually
	// if not then wait for algorithm to run
	if (doseStoreDay && isFuture(doseStoreDay)) {
		list.push(...getDosage([med], startOfTomorrow()))
	}

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

async function checkMeds() {
	const { doseStoreDay } = useAppState.getState()
	const now = new Date()
	const data = await getPendingDoseListFull.execute()
	if (!data) return
	if (data.length === 0)
		// ! check to remove old doses
		noop()
	// * remove (skip) yesterday's pending doses after certain hour
	else if (now.getHours() >= Constants.clearDoseHour) await clearDoses(data)

	if (!doseStoreDay)
		// ! check to add new doses
		// first launch ?
		await addDoses()
	// * we have already scheduled for tomorrow
	else if (isFuture(doseStoreDay)) noop()
	// doseStoreDay isPast (!isFuture) & no dose generated for today
	else if (!isToday(doseStoreDay)) await addDoses()
	// doseStoreDay isToday but we are past refill hour
	else if (now.getHours() >= Constants.rescheduleHour) await addDoses(true) // run for tomorrow
}

function getTimeInToday(time: Date, today: Date) {
	const newTime = new Date(today)
	newTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
	return newTime
}

async function checkInventory() {
	// already showed an alert??
	const { inventoryAlertDay } = useAppState.getState()
	if (inventoryAlertDay !== null && isToday(inventoryAlertDay)) return

	const now = new Date()
	const { invAlertTime } = useConfigState.getState()

	const alertTime = getTimeInToday(invAlertTime, now)
	if (isFuture(alertTime)) return

	// check inv
	const meds = await getAllMeds.execute()
	for (const med of meds) {
		if (
			!med.paused &&
			med.inventoryEnabled &&
			med.inventoryCount <= med.inventoryNotifyOn
		)
			await showInventoryAlert(med)
	}
	useAppState.setState({ inventoryAlertDay: now })
}

export async function onScheduleRunEvent() {
	// on background service, boot, app start, ...
	await checkMeds()
	await checkInventory()
}
