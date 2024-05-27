import { Channels } from "@/config/notification"
import { i18n } from "@/i18n/i18n"
import type { IDose, IDoseStatus } from "@/models"
import { formatAlertTime } from "@/utils"
import notifee, { AlarmType, TriggerType } from "@notifee/react-native"
import { isPast } from "date-fns"

type Props = IDose

export async function showAlert(props: Props) {
	// Request permissions (required for iOS)
	await notifee.requestPermission()

	// Create a channel (required for Android)
	const channelId = await notifee.createChannel(Channels.dose)

	// Display a notification
	await notifee.displayNotification({
		id: props.id,
		title: props.name,
		body: formatAlertTime(props.time),
		subtitle: i18n.t("medicine.pill", { count: props.amount }),
		android: {
			channelId,

			smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
			// pressAction is needed if you want the notification to open the app when pressed
			pressAction: {
				id: "default",
			},
			actions: [
				{
					title: i18n.t("medicine.confirm"),
					pressAction: {
						id: "confirm" satisfies IDoseStatus,
					},
				},
				{
					title: i18n.t("medicine.skip"),
					pressAction: {
						id: "skip" satisfies IDoseStatus,
					},
				},
			],
		},
	})
}

export async function scheduleAlert(props: Props) {
	if (isPast(props.time)) return

	// Request permissions (required for iOS)
	await notifee.requestPermission()

	// Create a channel (required for Android)
	const channelId = await notifee.createChannel(Channels.dose)

	// Display a notification
	await notifee.createTriggerNotification(
		{
			id: props.id,
			title: props.name,
			body: formatAlertTime(props.time),
			subtitle: i18n.t("medicine.pill", { count: props.amount }),
			android: {
				channelId,

				smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
				// pressAction is needed if you want the notification to open the app when pressed
				pressAction: {
					id: "default",
				},
				actions: [
					{
						title: i18n.t("medicine.confirm"),
						pressAction: {
							id: "confirm" satisfies IDoseStatus,
						},
					},
					{
						title: i18n.t("medicine.skip"),
						pressAction: {
							id: "skip" satisfies IDoseStatus,
						},
					},
				],
			},
		},
		{
			type: TriggerType.TIMESTAMP,
			timestamp: props.time.getTime(),
			alarmManager: {
				type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
			},
		},
	)
}
