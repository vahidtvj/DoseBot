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
					onPress={() => navigation.navigate("App", { screen: "Settings" })}
				/>
				<Drawer.Item
					label={t("navigation.permissions")}
					icon="lock"
					onPress={() => navigation.navigate("App", { screen: "Permissions" })}
				/>
				<Drawer.Item
					label={t("navigation.travelCalculator")}
					icon="calculator"
					onPress={() =>
						navigation.navigate("App", {
							screen: "TravelCalculator",
						})
					}
				/>
				<Drawer.Item label={t("navigation.rate")} icon="star" />
				<Drawer.Item
					label={t("navigation.about")}
					icon="information"
					onPress={() => navigation.navigate("App", { screen: "About" })}
				/>
			</Drawer.Section>
		</SafePage>
	)
}
