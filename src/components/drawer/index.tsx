import type { DrawerContentComponentProps } from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"
import { Drawer } from "react-native-paper"
import { SafePage } from "../common"

export function AppDrawer(props: DrawerContentComponentProps) {
	const { navigation } = props
	const { t } = useTranslation()
	return (
		<SafePage>
			<Drawer.Section>
				<Drawer.Item
					label={t("navigation.settings")}
					icon="cog"
					active={false}
					onPress={() => navigation.navigate("Settings")}
				/>
				<Drawer.Item
					label={t("navigation.permissions")}
					icon="lock"
					// TODO fix type
					onPress={() => navigation.navigate("Permissions")}
				/>
				<Drawer.Item
					label="TestScreen"
					icon="bug"
					onPress={() => navigation.navigate("Test")}
				/>
				<Drawer.Item label={t("navigation.rate")} icon="star" />
				<Drawer.Item label={t("navigation.about")} icon="information" />
			</Drawer.Section>
		</SafePage>
	)
}
