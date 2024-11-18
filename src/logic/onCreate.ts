import type { IMedicineFull } from "@/db"
import { useAppState } from "@/stores/app"
import { isFuture, startOfTomorrow } from "date-fns"
import { getDosage } from "./getDosage"

export function addDoseOnCreate(med: IMedicineFull) {
	const { doseStoreDay } = useAppState.getState()

	const list = getDosage([med])
	// if it has added alerts for tomorrow then also generate for this one manually
	// if not then wait for algorithm to run
	if (doseStoreDay && isFuture(doseStoreDay)) {
		list.push(...getDosage([med], startOfTomorrow()))
	}

	return list
}
