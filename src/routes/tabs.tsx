import MedScreen from "@/screens/medications"
import OverviewScreen from "@/screens/overview"
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"
import type { HomeTabParamList, RootStackScreenProps } from "./types"

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>()

export function Tabs(_props: RootStackScreenProps<"Home">) {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Overview"
				component={OverviewScreen}
				options={{ tabBarIcon: "home", title: "Overview" }}
			/>
			<Tab.Screen
				name="Medications"
				component={MedScreen}
				options={{ tabBarIcon: "pill", title: "Medications" }}
			/>
		</Tab.Navigator>
	)
}
