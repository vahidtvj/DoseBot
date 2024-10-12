import { scheduleAlert } from "@/components/notification"
import { type IDoseFull, getDoseFull, getDoseListFull } from "@/db/query"
import notifee from "@notifee/react-native"

export async function removeNotification(id: number | number[]) {
	if (typeof id === "number") await notifee.cancelNotification(String(id))
	else {
		for (const el of id) {
			await notifee.cancelNotification(String(el))
		}
	}
}

export async function updateNotification(id: number) {
	await removeNotification(id)
	const data = await getDoseFull(id)
	if (!data || !data.medicine) return
	const { medicine, ...rest } = data
	const dose = { ...rest, ...medicine, id: String(data.id) }
	await scheduleAlert(dose)
}

export async function updateNotifications(id: number[]) {
	await removeNotification(id)
	const list = await getDoseListFull(id)
	for (const data of list) {
		if (!data || !data.medicine) return
		const { medicine, ...rest } = data
		const dose = { ...rest, ...medicine, id: String(data.id) }
		await scheduleAlert(dose)
	}
}
