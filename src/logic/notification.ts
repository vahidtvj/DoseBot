import { scheduleAlert, showAlert } from "@/components/notification"
import type { IDoseFull } from "@/db"
import notifee from "@notifee/react-native"
import { isPast } from "date-fns"

export async function removeNotification(id: number | number[]) {
	if (typeof id === "number") await notifee.cancelNotification(String(id))
	else {
		for (const el of id) {
			await notifee.cancelNotification(String(el))
		}
	}
}

async function update(data: IDoseFull) {
	if (!data.medicine) return
	if (isPast(data.time)) await showAlert(data)
	else await scheduleAlert(data)
}

export async function updateNotification(data: IDoseFull) {
	await removeNotification(data.id)
	await update(data)
}

export async function updateNotifications(list: IDoseFull[]) {
	await removeNotification(list.map((x) => x.id))
	for (const data of list) await update(data)
}
