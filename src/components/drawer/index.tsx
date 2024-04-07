import type { DrawerContentComponentProps } from "@react-navigation/drawer"
import { Drawer } from "react-native-paper"
import { SafePage } from "../common"

export function AppDrawer(props: DrawerContentComponentProps) {
	const { navigation } = props
	return (
		<SafePage>
			<Drawer.Section>
				<Drawer.Item
					label="Settings"
					icon="cog"
					active={false}
					// onPress={() => setActive("first")}
				/>
				<Drawer.Item
					label="Permissions"
					icon="lock"
					// TODO fix type
					onPress={() => navigation.navigate("Permissions")}
				/>
				<Drawer.Item
					label="TestScreen"
					icon="bug"
					onPress={() => navigation.navigate("Test")}
				/>
				<Drawer.Item label="Rate Us" icon="star" />
				<Drawer.Item label="About" icon="information" />
			</Drawer.Section>
		</SafePage>
	)
}
