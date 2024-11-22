import { IconText } from "@/components/common/IconText"
import {
	SentryDiolog,
	useSentryConsentDialog,
} from "@/components/modals/sentryConsent"
import { RadioPickerGlobal } from "@/components/pickers/radioPicker"
import { Channels } from "@/config"
import { useConfigState } from "@/stores/configStore"
import { usePermissionStore } from "@/stores/permissions"
import { useAppTheme } from "@/theme"
import { useDateUtils } from "@/utils"
import notifee from "@notifee/react-native"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { AppState, StyleSheet, View } from "react-native"
import { Chip, Surface, Switch, Text } from "react-native-paper"
import { useLogic } from "./logic"

function ItemGroup(props: {
	icon?: string
	title: string
	children: React.ReactElement | React.ReactElement[]
}) {
	const theme = useAppTheme()
	return (
		<Surface style={styles.surface} mode="flat">
			<IconText
				variant="bodyLarge"
				icon={props.icon}
				style={{ color: theme.colors.primary }}
				iconColor={theme.colors.primary}
			>
				{props.title}
			</IconText>
			<View style={styles.itemContainer}>{props.children}</View>
		</Surface>
	)
}

export default function Page() {
	const store = useConfigState()
	const { t } = useTranslation()
	const sentryDialogStore = useSentryConsentDialog()
	const { doseChannel, invChannel, checkPermissions } = usePermissionStore()
	const { onCalendar, onLanguage, onInvAlertTime } = useLogic()
	const { toTimeString } = useDateUtils()
	useEffect(() => {
		checkPermissions()
		const appStateListener = AppState.addEventListener("focus", () =>
			checkPermissions(),
		)
		return () => {
			appStateListener?.remove()
		}
	}, [checkPermissions])

	return (
		<View style={styles.container}>
			<ItemGroup title="Look and Feel">
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="palette-outline">
						{t("settings.theme")}
					</IconText>
					<Chip
						onPress={() => store.toggleColorScheme()}
						icon={
							store.colorScheme === "system"
								? "theme-light-dark"
								: store.colorScheme === "light"
									? "white-balance-sunny"
									: "weather-night"
						}
					>
						{t(`settings.themes.${store.colorScheme}`)}
					</Chip>
				</View>
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="face-man">
						{t("settings.materialYou")}
					</IconText>
					<Switch
						value={store.useMaterialYou}
						onValueChange={() => store.toggle("useMaterialYou")}
					/>
				</View>
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="clipboard-text-clock">
						{t("settings.showNextDose")}
					</IconText>
					<Switch
						value={store.showNextDose}
						onValueChange={() => store.toggle("showNextDose")}
					/>
				</View>
			</ItemGroup>
			<ItemGroup title="Locale">
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="translate">
						{t("settings.language")}
					</IconText>
					<Chip icon={"translate"} onPress={onLanguage}>
						{t(`settings.languages.${store.lang}`)}
					</Chip>
				</View>
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="clock-outline">
						{t("settings.timeFormat")}
					</IconText>
					<Chip onPress={() => store.toggle("use24Hour")}>
						{store.use24Hour
							? t("settings.timeFormats.hour24")
							: t("settings.timeFormats.hour12")}
					</Chip>
				</View>
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="calendar-text">
						{t("settings.calendar")}
					</IconText>
					<Chip onPress={onCalendar}>
						{t(`settings.calendars.${store.calendar}`)}
					</Chip>
				</View>
			</ItemGroup>
			<ItemGroup title={t("settings.notifications")}>
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="bell-ring-outline">
						{t("permissions.alertSettings")}
					</IconText>
					<View style={styles.row}>
						<Chip
							icon={doseChannel ? "check" : "close"}
							onPress={() => notifee.openNotificationSettings(Channels.dose.id)}
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
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="clock-alert-outline">
						{t("settings.invAlertTime")}
					</IconText>
					<Chip onPress={() => onInvAlertTime()}>
						{toTimeString(store.invAlertTime)}
					</Chip>
				</View>
			</ItemGroup>
			<ItemGroup title="Analytics">
				<View style={styles.item}>
					<IconText variant="bodyLarge" icon="chart-arc">
						Data Collection
					</IconText>
					<Switch
						value={store.sentryEnabled}
						onValueChange={() => sentryDialogStore.show()}
					/>
				</View>
			</ItemGroup>
			<RadioPickerGlobal />
			<SentryDiolog {...sentryDialogStore} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// margin: 16,
		gap: 6,
	},
	surface: {
		padding: 12,
		paddingHorizontal: 12,
	},
	itemContainer: {
		gap: 12,
		paddingVertical: 6,
	},
	row: {
		flexDirection: "row",
		gap: 6,
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		paddingHorizontal: 8,
		color: "lightblue",
	},
})
