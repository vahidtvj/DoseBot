import { PaperAppbar } from "@/components/common"
import { AppDrawer } from "@/components/drawer"
import Debug from "@/screens/debug"
import MedicineDetail from "@/screens/medicineDetail"
import MedicineSchedule from "@/screens/medicineSchedule"
import Permissions from "@/screens/permissions"
import Settings from "@/screens/settings"
import TravelCalculator from "@/screens/travelCalculator"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { Tabs } from "./tabs"
import type { RootDrawerParamList, RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<RootDrawerParamList>()

export function App() {
	const { t } = useTranslation()
	return (
		<Stack.Navigator
			screenOptions={{
				header: (props) => <PaperAppbar {...props} />,
			}}
		>
			<Stack.Screen
				name="Home"
				component={Tabs}
				options={{ headerShown: true, title: t("appName") }}
			/>
			<Stack.Screen
				name="MedicineDetail"
				component={MedicineDetail}
				options={{
					headerShown: true,
					title: t("navigation.medDetails"),
				}}
			/>
			<Stack.Screen
				name="MedicineSchedule"
				component={MedicineSchedule}
				options={{ headerShown: true, title: t("navigation.scheduleDetails") }}
			/>
			<Stack.Screen
				name="Permissions"
				component={Permissions}
				options={{ headerShown: false, title: t("navigation.permissions") }}
			/>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: true, title: t("navigation.settings") }}
			/>
			<Stack.Screen
				name="TravelCalculator"
				component={TravelCalculator}
				options={{ headerShown: true, title: t("navigation.travelCalculator") }}
			/>
			<Stack.Screen
				name="Debug"
				component={Debug}
				options={{ headerShown: true, title: "Debug" }}
			/>
		</Stack.Navigator>
	)
}

function App2() {
	return (
		<Drawer.Navigator
			drawerContent={AppDrawer}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Drawer.Screen name="App" component={App} />
		</Drawer.Navigator>
	)
}

export default App2
