import {
	scheduleAlert,
	showAlert,
	showInventoryAlert,
} from "@/components/notification"
import type { IDoseFull } from "@/db"
import { center } from "@/decorators"
import notifee, {
	AndroidNotificationSetting,
	AuthorizationStatus,
} from "@notifee/react-native"
import type { PowerManagerInfo } from "@notifee/react-native/dist/types/PowerManagerInfo"
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
	const dose: IDoseFull = {
		id: 255255,
		amount: 2,
		medicineId: 255255,
		medicine: { name: "Acetaminophen", type: "pill", note: "notenote" },
		status: "pending",
		time: new Date(),
	}
	showAlert(dose)
}
function testDoseScheduleAlert() {
	const dose: IDoseFull = {
		id: 255255,
		amount: 2,
		medicineId: 255255,
		medicine: { name: "Acetaminophen", type: "pill", note: "notenote" },
		status: "pending",
		time: new Date(Date.now() + 1000 * 60 * 5),
	}
	console.log(dose.time.toLocaleString())

	scheduleAlert(dose)
}
function testInvAlert() {
	showInventoryAlert({
		id: 1,
		inventoryCount: 2,
		inventoryNotifyOn: 10,
		inventoryEnabled: true,
		name: "Acetaminophen",
		type: "pill",
		paused: false,
		removed: false,
		note: null,
	})
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
		<View>
			<List.Section>
				<List.Subheader>Test notifications</List.Subheader>
				<View style={{ gap: 12 }}>
					<View style={styles.row}>
						<Button mode="outlined" onPress={testDoseAlert}>
							dose notification
						</Button>
						<Button mode="outlined" onPress={testInvAlert}>
							inventory notification
						</Button>
					</View>
					<Button mode="outlined" onPress={testDoseScheduleAlert}>
						scheduled notification
					</Button>
				</View>
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
		</View>
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
