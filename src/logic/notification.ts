import { scheduleAlert } from "@/components/notification"
import type { IDoseFull } from "@/db"
import notifee from "@notifee/react-native"

export async function removeNotification(id: number | number[]) {
	if (typeof id === "number") await notifee.cancelNotification(String(id))
	else {
		for (const el of id) {
			await notifee.cancelNotification(String(el))
		}
	}
}

export async function updateNotification(data: IDoseFull) {
	await removeNotification(data.id)
	if (!data.medicine) return
	scheduleAlert(data)
}

export async function updateNotifications(list: IDoseFull[]) {
	await removeNotification(list.map((x) => x.id))
	for (const data of list) {
		if (!data.medicine) continue
		await scheduleAlert(data)
	}
}
