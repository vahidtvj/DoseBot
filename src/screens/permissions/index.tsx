import { IconText } from "@/components/common/IconText"
import {
	SentryDiolog,
	useSentryConsentDialog,
} from "@/components/modals/sentryConsent"
import { Channels } from "@/config"
import type { RootStackScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { usePermissionStore } from "@/stores/permissions"
import notifee from "@notifee/react-native"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { AppState, Image, ScrollView, StyleSheet, View } from "react-native"
import { Button, Chip, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

function Permission(props: {
	allowed?: boolean
	title: string
	subtitle?: string
	onClick: () => void
	icon?: string
}) {
	const { title, allowed, subtitle, onClick, icon } = props
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 12,
			}}
		>
			<View style={{ flex: 1 }}>
				<IconText icon={icon} variant="titleLarge">
					{title}
				</IconText>

				{subtitle && <Text variant="bodySmall">{subtitle}</Text>}
			</View>
			<Button
				mode={allowed === true ? "contained" : "contained-tonal"}
				icon={allowed !== undefined ? (allowed ? "check" : "close") : undefined}
				onPress={onClick}
			>
				Grant
			</Button>
		</View>
	)
}
export default function Page({
	navigation,
}: RootStackScreenProps<"Permissions">) {
	const {
		auth,
		batteryOpt,
		checkPermissions,
		SCHEDULE_EXACT_ALARM,
		doseChannel,
		invChannel,
		hasAutoStart,
	} = usePermissionStore()
	const sentryDialogStore = useSentryConsentDialog()
	const { t } = useTranslation()
	useEffect(() => {
		checkPermissions()
		const appStateListener = AppState.addEventListener("focus", () =>
			checkPermissions(),
		)
		return () => {
			appStateListener?.remove()
		}
	}, [checkPermissions])
	const firstLaunch = useAppState((x) => x.firstLaunch)

	function onSubmit() {
		if (firstLaunch) sentryDialogStore.show()
		else navigation.goBack()
		useAppState.setState({ firstLaunch: false })
	}
	return (
		<SafeAreaView style={styles.page}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					height: "20%",
				}}
			>
				<Image
					source={require("@/../assets/adaptive-foreground.png")}
					style={{ height: "100%" }}
					resizeMode="contain"
				/>
				<Text variant="headlineSmall">{t("permissions.welcome")}</Text>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View>
						<Permission
							title={t("permissions.notification")}
							subtitle={t("permissions.notificationSub")}
							icon="bell"
							allowed={auth}
							onClick={() => notifee.requestPermission()}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: 6,
							}}
						>
							<View style={{ flex: 1 }}>
								<Text variant="titleMedium">
									{t("permissions.alertSettings")}
								</Text>
							</View>

							<Chip
								icon={doseChannel ? "check" : "close"}
								onPress={() =>
									notifee.openNotificationSettings(Channels.dose.id)
								}
							>
								{t("permissions.channel.med")}
							</Chip>
							<Chip
								icon={invChannel ? "check" : "close"}
								onPress={() =>
									notifee.openNotificationSettings(Channels.inventory.id)
								}
							>
								{t("permissions.channel.inv")}
							</Chip>
						</View>
					</View>
					<Permission
						title={t("permissions.exactAlarm")}
						subtitle={t("permissions.exactAlarmSub")}
						icon="alarm"
						allowed={SCHEDULE_EXACT_ALARM}
						onClick={() =>
							!SCHEDULE_EXACT_ALARM && notifee.openAlarmPermissionSettings()
						}
					/>
					<Permission
						title={t("permissions.batteryOpt")}
						subtitle={t("permissions.batteryOptSub")}
						icon="battery-remove-outline"
						allowed={!batteryOpt}
						onClick={() =>
							batteryOpt && notifee.openBatteryOptimizationSettings()
						}
					/>
					{hasAutoStart && (
						<Permission
							title={t("permissions.autostart")}
							subtitle={t("permissions.autostartSub")}
							icon="power"
							onClick={() => notifee.openPowerManagerSettings()}
						/>
					)}
					<Button mode="contained" onPress={onSubmit}>
						{t("permissions.go")}
					</Button>
				</View>
			</ScrollView>
			<SentryDiolog
				{...sentryDialogStore}
				onDismiss={() => {
					navigation.goBack()
					sentryDialogStore.onDismiss()
				}}
				onSubmit={(agree) => {
					navigation.goBack()
					sentryDialogStore.onSubmit(agree)
				}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	page: {
		marginTop: 12,
		flex: 1,
		gap: 12,
	},
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		margin: 25,
		gap: 24,
	},
	chips: {
		gap: 6,
	},
	row: {
		flexDirection: "row",
	},
})
