import { Channels } from "@/config/notification"
import { i18n } from "@/i18n/i18n"
import notifee from "@notifee/react-native"

type Props = unknown
// Todo inventory notifications
export async function showInventoryAlert(_props: Props) {
	// await notifee.requestPermission()
	// const channelId = await notifee.createChannel(Channels.inventory)
	// await notifee.displayNotification({
	// 	title: i18n.t("inventoryLow"),
	// 	body: `${props.name} ${i18n.t("medicine.remaining", {
	// 		count: props.inventory.count,
	// 	})}`,
	// 	android: {
	// 		channelId,
	// 		smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
	// 		// pressAction is needed if you want the notification to open the app when pressed
	// 		pressAction: {
	// 			id: "default",
	// 		},
	// 	},
	// })
}
