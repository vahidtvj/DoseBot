import { PaperAppbar } from "@/components/common"
import { AppDrawer } from "@/components/drawer"
import MedicineDetail from "@/screens/medicineDetail"
import MedicineSchedule from "@/screens/medicineSchedule"
import Permissions from "@/screens/permissions"
import TestScreen from "@/screens/testscreen"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Tabs } from "./tabs"
import type { RootDrawerParamList, RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<RootDrawerParamList>()

export function App() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: (props) => <PaperAppbar {...props} />,
			}}
		>
			<Stack.Screen
				name="Home"
				component={Tabs}
				options={{ headerShown: true, title: "DoseBot" }}
			/>
			<Stack.Screen
				name="MedicineDetail"
				component={MedicineDetail}
				options={{
					headerShown: true,
					title: "Medicine Details",
				}}
			/>
			<Stack.Screen
				name="MedicineSchedule"
				component={MedicineSchedule}
				options={{ headerShown: true, title: "Schedule Details" }}
			/>
			<Stack.Screen
				name="Permissions"
				component={Permissions}
				options={{ headerShown: true }}
			/>
			<Stack.Screen
				name="Test"
				component={TestScreen}
				options={{ headerShown: true }}
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
