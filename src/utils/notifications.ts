import { Channels } from "@/config"
import notifee, { AndroidImportance } from "@notifee/react-native"

notifee.createChannel({
	id: Channels.dose.id,
	name: Channels.dose.name,
	lights: true,
	vibration: true,
	importance: AndroidImportance.HIGH,
})

notifee.createChannel({
	id: Channels.inventory.id,
	name: Channels.inventory.name,
	lights: true,
	vibration: true,
	importance: AndroidImportance.DEFAULT,
})
