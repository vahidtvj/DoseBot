import { Constants } from "@/config"
import { useAppState } from "@/stores/app"
import { useDoseStore } from "@/stores/doseStore"
import { useMedicineStore } from "@/stores/medicineStore"
import {
	isFuture,
	isToday,
	isYesterday,
	startOfToday,
	startOfTomorrow,
} from "date-fns"
import { noop } from "lodash"
import { getDosage } from "./getDosage"
import * as Sentry from "@sentry/react-native"
/**
 * ! Test. Do not use
 */
export function fillDoseStore() {
	const { data } = useMedicineStore.getState()
	const doseList = getDosage(data)
	useDoseStore.setState({ data: doseList })
}

function addDoses(tomorrow = false) {
	Sentry.captureMessage(`add dose. day: ${tomorrow ? "tomorrow" : "today"}`)
	const store = useDoseStore.getState()
	const { data } = useMedicineStore.getState()
	const list = getDosage(data, tomorrow ? startOfTomorrow() : undefined)
	store.add(list)
	useAppState.setState({
		doseStoreDay: tomorrow ? startOfTomorrow() : startOfToday(),
	})
}

function clearDoses() {
	Sentry.captureMessage("clear dose")
	const store = useDoseStore.getState()
	const list: string[] = []
	for (const dose of store.data) {
		if (!isFuture(dose.time) && !isToday(dose.time)) list.push(dose.id)
	}
	store.clear(list)
}

export function onScheduleRunEvent() {
	Sentry.captureMessage("run event")
	// on background service, boot, app start, ...
	const { doseStoreDay } = useAppState.getState()
	const now = new Date()

	const { data } = useDoseStore.getState()

	// ! check to remove old doses
	if (data.length === 0) noop()
	// * remove (skip) yesterday's pending doses after certain hour
	else if (now.getHours() >= Constants.clearDoseHour) clearDoses()

	// ! check to add new doses
	// first launch ?
	if (!doseStoreDay) addDoses()
	// * we have already scheduled for tomorrow
	else if (isFuture(doseStoreDay)) noop()
	// doseStoreDay isPast (!isFuture) & no dose generated for today
	else if (!isToday(doseStoreDay)) addDoses()
	// doseStoreDay isToday but we are past refill hour
	else if (now.getHours() <= Constants.rescheduleHour) addDoses(true) // run for tomorrow
}
