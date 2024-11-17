import { useDebugStore } from "@/stores/debugStore"
// import * as Sentry from "@sentry/react-native"
import * as BackgroundFetch from "expo-background-fetch"
import { onScheduleRunEvent } from "./dose"

export const BACKGROUND_FETCH_TASK = "backgroundWorker"

export async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
		minimumInterval: 60 * 15, // 15 minutes
		stopOnTerminate: false, // android only,
		startOnBoot: true, // android onlyBACKGROUND_FETCH_TASK
	})
}

export async function unregisterBackgroundFetchAsync() {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

export function AppLaunch() {
	useDebugStore.getState().push({ time: new Date(), type: "AppLaunch" })
	onScheduleRunEvent()
	registerBackgroundFetchAsync()
}
