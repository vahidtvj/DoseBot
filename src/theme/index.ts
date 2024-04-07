import { MD3DarkTheme, MD3LightTheme, useTheme } from "react-native-paper"

export const lightTheme = {
	...MD3LightTheme,
	roundness: 3,
	colors: {
		...MD3LightTheme.colors,
		orange: "orange",
		red: "red",
	},
}

export const darkTheme: AppTheme = {
	...MD3DarkTheme,
	roundness: 3,
	colors: {
		...MD3DarkTheme.colors,
		orange: "orange",
		red: "red",
	},
}

export type AppTheme = typeof lightTheme

export const useAppTheme = () => useTheme<AppTheme>()
