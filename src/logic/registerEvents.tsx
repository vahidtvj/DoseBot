import { changeDoseStatus } from "@/db"
import { useDebugStore } from "@/stores/debugStore"
import notifee, { EventType } from "@notifee/react-native"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { onScheduleRunEvent } from "./dose"
import { BACKGROUND_FETCH_TASK } from "./events"

notifee.onForegroundEvent(async ({ type, detail }) => {
	// ! handle notification actions
	if (
		type === EventType.ACTION_PRESS &&
		detail.pressAction?.id &&
		detail.notification?.id
	) {
		const id = Number.parseInt(detail.notification.id)
		const action = detail.pressAction.id as "skip" | "confirm"
		await changeDoseStatus(id, action)
	}
})

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	useDebugStore.getState().push({ time: new Date(), type: "Service" })
	await onScheduleRunEvent()

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})
