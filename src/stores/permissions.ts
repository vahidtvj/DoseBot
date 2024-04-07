import { Channels } from "@/config"
import notifee, {
	AndroidNotificationSetting,
	AuthorizationStatus,
} from "@notifee/react-native"
import { create } from "zustand"

type IState = {
	auth: boolean
	doseChannel: boolean
	invChannel: boolean
	batteryOpt: boolean
	SCHEDULE_EXACT_ALARM: boolean
	checkPermissions: () => void
}
export const usePermissionStore = create<IState>((set) => ({
	auth: false,
	doseChannel: false,
	invChannel: false,
	batteryOpt: false,
	SCHEDULE_EXACT_ALARM: false,
	checkPermissions: async () => {
		const settings = await notifee.getNotificationSettings()
		const doseChannel = await notifee.getChannel(Channels.dose.id)
		const invChannel = await notifee.getChannel(Channels.inventory.id)
		const batteryOptimizationEnabled =
			await notifee.isBatteryOptimizationEnabled()
		set({
			auth: settings.authorizationStatus === AuthorizationStatus.AUTHORIZED,
			doseChannel: !!doseChannel && !doseChannel.blocked,
			invChannel: !!invChannel && !invChannel.blocked,
			batteryOpt: batteryOptimizationEnabled,
			SCHEDULE_EXACT_ALARM:
				settings.android.alarm === AndroidNotificationSetting.ENABLED,
		})
	},
}))
