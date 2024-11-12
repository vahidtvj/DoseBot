import { Channels } from "@/config/notification"
import type { IMedicine } from "@/db"
import { i18n } from "@/i18n/i18n"
import notifee from "@notifee/react-native"

type Props = IMedicine
export async function showInventoryAlert(props: Props) {
	await notifee.requestPermission()
	const channelId = await notifee.createChannel(Channels.inventory)
	await notifee.displayNotification({
		title: i18n.t("inventoryLow"),
		body: `${props.name} ${i18n.t("medicine.remaining", {
			count: props.inventoryCount,
		})}`,
		android: {
			channelId,
			smallIcon: "notification_icon", // optional, defaults to 'ic_launcher'.
			// pressAction is needed if you want the notification to open the app when pressed
			pressAction: {
				id: "default",
			},
		},
	})
}
