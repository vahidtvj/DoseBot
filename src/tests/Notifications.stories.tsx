import { showAlert } from "@/components/notification"
import { center } from "@/decorators"
import { IDose } from "@/models"
import notifee, {
	AndroidNotificationSetting,
	AuthorizationStatus,
} from "@notifee/react-native"
import { PowerManagerInfo } from "@notifee/react-native/dist/types/PowerManagerInfo"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useEffect, Suspense } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Chip, Divider, List } from "react-native-paper"
import { create } from "zustand"

type IPowerState = {
	powerManagerInfo: PowerManagerInfo
	fetch: () => void
}
const usePowerStore = create<IPowerState>((set) => ({
	powerManagerInfo: {},
	fetch: async () => {
		const response = await notifee.getPowerManagerInfo()
		set({ powerManagerInfo: response })
	},
}))

function PowerInfo() {
	const state = usePowerStore()

	useEffect(() => {
		state.fetch()
	}, [state.fetch])

	return (
		<React.Fragment>
			<Chip>Brand: {state.powerManagerInfo.manufacturer}</Chip>
			<Chip icon={state.powerManagerInfo.activity ? "check" : "close"}>
				Extra Settings
			</Chip>
		</React.Fragment>
	)
}

function testDoseAlert() {
	const dose: IDose = {
		id: "test",
		medId: "test",
		amount: 2,
		name: "Acetaminophen",
		status: "pending",
		type: "pill",
		time: new Date(),
	}
	showAlert(dose)
}

type SettingState = {
	auth: boolean
	channelPermission: boolean
	batteryOpt: boolean
	SCHEDULE_EXACT_ALARM: boolean
	checkPermissions: () => void
}
const useSettingsStore = create<SettingState>((set) => ({
	auth: false,
	channelPermission: false,
	batteryOpt: false,
	SCHEDULE_EXACT_ALARM: false,
	checkPermissions: async () => {
		const settings = await notifee.getNotificationSettings()
		const channel = await notifee.getChannel("default")
		const batteryOptimizationEnabled =
			await notifee.isBatteryOptimizationEnabled()
		set({
			auth: settings.authorizationStatus === AuthorizationStatus.AUTHORIZED,
			channelPermission: !!channel && !channel.blocked,
			batteryOpt: batteryOptimizationEnabled,
			SCHEDULE_EXACT_ALARM:
				settings.android.alarm === AndroidNotificationSetting.ENABLED,
		})
	},
}))

function NotificationTestScreen() {
	const {
		auth,
		batteryOpt,
		channelPermission,
		checkPermissions,
		SCHEDULE_EXACT_ALARM,
	} = useSettingsStore()

	useEffect(() => {
		checkPermissions()
	}, [checkPermissions])

	return (
		<Suspense>
			<List.Section>
				<List.Subheader>Test notifications</List.Subheader>
				<Button mode="outlined" onPress={testDoseAlert}>
					simple notification
				</Button>
			</List.Section>
			<Divider />
			<View style={styles.row}>
				<List.Section style={styles.section}>
					<List.Subheader>Settings menu</List.Subheader>
					<Button mode="outlined" onPress={notifee.openAlarmPermissionSettings}>
						Alarm Settings
					</Button>
					<Button
						mode="outlined"
						onPress={() => notifee.openNotificationSettings()}
					>
						Notification Settings
					</Button>
					<Button
						mode="outlined"
						onPress={notifee.openBatteryOptimizationSettings}
					>
						Battery saver
					</Button>
					<Button mode="outlined" onPress={notifee.openPowerManagerSettings}>
						Extra Settings
					</Button>
				</List.Section>
				<List.Section style={styles.section}>
					<List.Subheader>Permissions</List.Subheader>
					<Chip icon="refresh" mode="outlined" onPress={checkPermissions}>
						Refresh
					</Chip>
					<Chip icon={auth ? "check" : "close"}>Authorized</Chip>
					<Chip icon={channelPermission ? "check" : "close"}>
						Default Channel
					</Chip>
					<Chip icon={SCHEDULE_EXACT_ALARM ? "check" : "close"}>
						EXACT_ALARM
					</Chip>
					<Chip icon={batteryOpt ? "close" : "check"}>Run on Background</Chip>
					<PowerInfo />
				</List.Section>
			</View>
		</Suspense>
	)
}

const meta: Meta<typeof NotificationTestScreen> = {
	component: NotificationTestScreen,
	decorators: [center],
}

export default meta
type Story = StoryObj<typeof NotificationTestScreen>

export const Primary: Story = {
	render: () => <NotificationTestScreen />,
}

const styles = StyleSheet.create({
	row: {
		columnGap: 12,
		flexDirection: "row",
	},
	section: {
		rowGap: 6,
	},
})
