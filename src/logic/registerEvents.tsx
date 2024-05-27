import type { IDoseStatus } from "@/models"
import { useDoseStore } from "@/stores/doseStore"
import notifee, { EventType } from "@notifee/react-native"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
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

function sendTest() {
	fetch("http://192.168.1.3:3000")
}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	sendTest()
	const now = Date.now()

	console.log(
		`Got background fetch call at date: ${new Date(now).toISOString()}`,
	)
	// const channelId = await notifee.createChannel(Channels.dose)
	// useAppState.setState({ doseStoreDay: new Date() })
	// Display a notification
	// await notifee.displayNotification({
	// 	title: "Test",
	// 	body: new Date().toLocaleString(),
	// 	android: {
	// 		channelId,

	// 		smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
	// 		// pressAction is needed if you want the notification to open the app when pressed
	// 		pressAction: {
	// 			id: "default",
	// 		},
	// 	},
	// })
	// await notifee.createTriggerNotification(
	// 	{
	// 		title: "Test2",
	// 		body: new Date().toLocaleString(),
	// 		android: {
	// 			channelId,

	// 			smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
	// 			// pressAction is needed if you want the notification to open the app when pressed
	// 			pressAction: {
	// 				id: "default",
	// 			},
	// 		},
	// 	},
	// 	{
	// 		timestamp: now + 1000 * 60 * 5,
	// 		type: TriggerType.TIMESTAMP,
	// 		alarmManager: {
	// 			type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
	// 		},
	// 	},
	// )
	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})
