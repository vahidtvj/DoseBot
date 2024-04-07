import { Channels } from "@/config"
import { useAppState } from "@/stores/app"
import { usePermissionStore } from "@/stores/permissions"
import notifee from "@notifee/react-native"
import { useEffect } from "react"
import { AppState, StyleSheet, View } from "react-native"
import { Chip, Text } from "react-native-paper"

export default function Page() {
	const {
		auth,
		batteryOpt,
		checkPermissions,
		SCHEDULE_EXACT_ALARM,
		doseChannel,
		invChannel,
	} = usePermissionStore()

	useEffect(() => {
		checkPermissions()
		const appStateListener = AppState.addEventListener("focus", () =>
			checkPermissions(),
		)
		return () => {
			appStateListener?.remove()
		}
	}, [checkPermissions])

	useEffect(() => {
		useAppState.setState({ firstLaunch: false })
	}, [])

	return (
		<View style={styles.container}>
			<Text>
				For base functionality of the app you need to allow these permission
			</Text>
			<View style={styles.row}>
				<View style={styles.chips}>
					<Text variant="titleMedium">Notifications</Text>
					<Chip
						icon={auth ? "check" : "close"}
						onPress={() => notifee.openNotificationSettings()}
					>
						Notification
					</Chip>
					<Chip
						icon={doseChannel ? "check" : "close"}
						onPress={() => notifee.openNotificationSettings(Channels.dose.id)}
					>
						Medication
					</Chip>
					<Chip
						icon={invChannel ? "check" : "close"}
						onPress={() =>
							notifee.openNotificationSettings(Channels.inventory.id)
						}
					>
						Inventory
					</Chip>
					<Chip
						icon={SCHEDULE_EXACT_ALARM ? "check" : "close"}
						onPress={notifee.openAlarmPermissionSettings}
					>
						EXACT_ALARM
					</Chip>
					<Chip
						icon={batteryOpt ? "close" : "check"}
						onPress={notifee.openBatteryOptimizationSettings}
					>
						Battery Optimization
					</Chip>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		margin: 16,
		gap: 6,
	},
	chips: {
		gap: 6,
	},
	row: {
		flexDirection: "row",
	},
})
