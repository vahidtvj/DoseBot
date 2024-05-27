import { RadioPickerGlobal } from "@/components/pickers/radioPicker"
import { useConfigState } from "@/stores/configStore"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Chip, Surface, Switch, Text } from "react-native-paper"
import { onLanguage } from "./logic"

export default function Page() {
	const store = useConfigState()
	const { t } = useTranslation()
	return (
		<View style={styles.container}>
			<Surface style={styles.surface} mode="flat">
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
				{/* <View style={styles.item}>
					<Text variant="bodyLarge">Colors</Text>
					<Switch
						disabled={store.useMaterialYou}
						value={store.useMaterialYou}
					/>
				</View> */}
			</Surface>
			<Surface style={styles.surface} mode="flat">
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
			</Surface>
			<RadioPickerGlobal />
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
		gap: 20,
		// padding: 12,
		paddingHorizontal: 16,
		paddingVertical: 8,
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
