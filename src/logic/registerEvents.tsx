import type { IDoseStatus } from "@/models"
import { useDoseStore } from "@/stores/doseStore"
import notifee, { EventType } from "@notifee/react-native"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { onScheduleRunEvent } from "./dose"
import { BACKGROUND_FETCH_TASK } from "./events"

notifee.onForegroundEvent(({ type, detail }) => {
	// ! handle notification actions
	if (
		type === EventType.ACTION_PRESS &&
		detail.pressAction?.id &&
		detail.notification?.id
	) {
		const id = detail.notification.id
		const action = detail.pressAction.id as IDoseStatus
		useDoseStore.getState().changeStatus(id, action)
	}
})

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	onScheduleRunEvent()

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})
