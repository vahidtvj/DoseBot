import type { DrawerScreenProps } from "@react-navigation/drawer"
import type {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native"
import type {
	NativeStackHeaderProps,
	NativeStackScreenProps,
} from "@react-navigation/native-stack"
import type { MaterialBottomTabScreenProps } from "react-native-paper/react-navigation"

export type RootDrawerParamList = {
	App: NavigatorScreenParams<RootStackParamList>
}

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
	DrawerScreenProps<RootDrawerParamList, T>

export type RootHeaderProps = NativeStackHeaderProps
// ----------------
export type RootStackParamList = {
	Home: NavigatorScreenParams<HomeTabParamList>
	Permissions: undefined
	Settings: undefined
	Test: undefined
	MedicineDetail: { id?: number }
	MedicineSchedule: { index?: number }
	TravelCalculator: undefined
	About: undefined
	Debug: undefined
	HistoryDay: { dayTimestamp: number }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	CompositeScreenProps<
		NativeStackScreenProps<RootStackParamList, T>,
		RootDrawerScreenProps<keyof RootDrawerParamList>
	>

// ----------------
export type HomeTabParamList = {
	Overview: undefined
	History: undefined
	Medications: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
	CompositeScreenProps<
		MaterialBottomTabScreenProps<HomeTabParamList, T>,
		RootStackScreenProps<keyof RootStackParamList>
	>
// ----------------

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootDrawerParamList {}
	}
}
