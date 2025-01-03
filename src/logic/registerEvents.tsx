import { changeDoseStatus } from "@/db"
import { useDebugStore } from "@/stores/debugStore"
import notifee, { EventType, type Event } from "@notifee/react-native"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { onScheduleRunEvent } from "./dose"
import { BACKGROUND_FETCH_TASK } from "./events"

async function handleNotificationEvent({ type, detail }: Event) {
	if (
		type === EventType.ACTION_PRESS &&
		detail.pressAction?.id &&
		detail.notification?.id
	) {
		const id = Number.parseInt(detail.notification.id)
		const action = detail.pressAction.id as "skip" | "confirm"
		await changeDoseStatus(id, action)
	}
}

notifee.onForegroundEvent(handleNotificationEvent)
notifee.onBackgroundEvent(handleNotificationEvent)

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	useDebugStore.getState().push({ time: new Date(), type: "Service" })
	await onScheduleRunEvent()

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})
