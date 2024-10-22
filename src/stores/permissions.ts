import { Channels } from "@/config"
import notifee, {
	AndroidNotificationSetting,
	AuthorizationStatus,
} from "@notifee/react-native"
import type { PowerManagerInfo } from "@notifee/react-native/dist/types/PowerManagerInfo"
import { create } from "zustand"

type IState = {
	auth: boolean
	doseChannel: boolean
	invChannel: boolean
	batteryOpt: boolean
	SCHEDULE_EXACT_ALARM: boolean
	hasAutoStart: boolean
	checkPermissions: () => void
}
export const usePermissionStore = create<IState>((set) => ({
	auth: false,
	doseChannel: false,
	invChannel: false,
	batteryOpt: false,
	SCHEDULE_EXACT_ALARM: false,
	hasAutoStart: false,
	checkPermissions: async () => {
		const settings = await notifee.getNotificationSettings()
		const doseChannel = await notifee.getChannel(Channels.dose.id)
		const invChannel = await notifee.getChannel(Channels.inventory.id)
		const batteryOptimizationEnabled =
			await notifee.isBatteryOptimizationEnabled()
		const powerInfo = await notifee.getPowerManagerInfo()
		// TODO open corresponding activity on other phones
		// Xiaomi: AutoStartManagementActivity
		const hasAutoStart = powerInfo.activity === "AutoStartManagementActivity"
		set({
			auth: settings.authorizationStatus === AuthorizationStatus.AUTHORIZED,
			doseChannel: !!doseChannel && !doseChannel.blocked,
			invChannel: !!invChannel && !invChannel.blocked,
			batteryOpt: batteryOptimizationEnabled,
			hasAutoStart: hasAutoStart,
			SCHEDULE_EXACT_ALARM:
				settings.android.alarm === AndroidNotificationSetting.ENABLED,
		})
	},
}))
