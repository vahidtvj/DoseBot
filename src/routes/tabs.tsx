import MedScreen from "@/screens/medications"
import OverviewScreen from "@/screens/overview"
import { useTranslation } from "react-i18next"
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"
import type { HomeTabParamList, RootStackScreenProps } from "./types"

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>()

export function Tabs(_props: RootStackScreenProps<"Home">) {
	const { t } = useTranslation()
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Overview"
				component={OverviewScreen}
				options={{ tabBarIcon: "home", title: t("navigation.overview") }}
			/>
			<Tab.Screen
				name="Medications"
				component={MedScreen}
				options={{ tabBarIcon: "pill", title: t("navigation.medications") }}
			/>
		</Tab.Navigator>
	)
}
