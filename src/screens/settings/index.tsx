import { IconText } from "@/components/common/IconText"
import {
	SentryDiolog,
	useSentryConsentDialog,
} from "@/components/modals/sentryConsent"
import { RadioPickerGlobal } from "@/components/pickers/radioPicker"
import { useConfigState } from "@/stores/configStore"
import { useAppTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Chip, Surface, Switch, Text } from "react-native-paper"
import { onLanguage } from "./logic"

function ItemGroup(props: {
	icon?: string
	title: string
	children: React.ReactElement | React.ReactElement[]
}) {
	const theme = useAppTheme()
	return (
		<Surface style={styles.surface} mode="flat">
			<IconText
				variant="titleLarge"
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
	return (
		<View style={styles.container}>
			<ItemGroup title="Look and Feel" icon="palette">
				<View style={styles.item}>
					<Text variant="bodyLarge">{t("settings.theme")}</Text>
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
					<Text variant="bodyLarge">{t("settings.materialYou")}</Text>
					<Switch
						value={store.useMaterialYou}
						onValueChange={() => store.toggle("useMaterialYou")}
					/>
				</View>
			</ItemGroup>
			<ItemGroup title="Locale" icon="earth">
				<View style={styles.item}>
					<Text variant="bodyLarge">{t("settings.language")}</Text>
					<Chip icon={"translate"} onPress={onLanguage}>
						{t(`settings.languages.${store.lang}`)}
					</Chip>
				</View>
				{/* <View style={styles.item}>
					<Text variant="bodyLarge">Calendar</Text>
					<Chip>Georgian</Chip>
				</View> */}
			</ItemGroup>
			<ItemGroup title="Analytics" icon="chart-arc">
				<View style={styles.item}>
					<Text variant="bodyLarge" numberOfLines={2}>
						Data Collection
					</Text>
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
	},
	itemContainer: {
		gap: 12,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	row: {
		flexDirection: "row",
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
