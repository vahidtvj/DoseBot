import { PaperStatusBar } from "@/components/common/PaperStatusBar"
import "@/i18n/i18n"
import { useUIStore } from "@/stores/uiStore"
import { darkTheme, lightTheme } from "@/theme"
import { useMaterial3Theme } from "@pchmn/expo-material3-theme"
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	NavigationContainer,
} from "@react-navigation/native"
import { useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { I18nManager, Platform } from "react-native"
import { PaperProvider, adaptNavigationTheme } from "react-native-paper"
// import * as Updates from "expo-updates"

type Props = {
	children: React.ReactNode
}

export function BaseLayout({ children }: Props) {
	const colorScheme = useUIStore((state) => state.colorScheme)
	const shouldBeRTL = useUIStore((state) => state.lang) === "fa"
	if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
		I18nManager.allowRTL(shouldBeRTL)
		I18nManager.forceRTL(shouldBeRTL)
		// Updates.reloadAsync()
	}
	const { theme } = useMaterial3Theme({ fallbackSourceColor: "#3E8260" })

	const paperTheme = useMemo(
		() =>
			colorScheme === "dark"
				? { ...darkTheme, colors: { ...darkTheme.colors, ...theme.dark } }
				: { ...lightTheme, colors: { ...lightTheme.colors, ...theme.light } },
		[colorScheme, theme],
	)

	const navTheme = useMemo(() => {
		if (colorScheme === "dark")
			return adaptNavigationTheme({
				reactNavigationDark: NavigationDarkTheme,
				materialDark: paperTheme,
			}).DarkTheme
		return adaptNavigationTheme({
			reactNavigationLight: NavigationDefaultTheme,
			materialLight: paperTheme,
		}).LightTheme
	}, [colorScheme, paperTheme])

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer theme={navTheme}>
				<View style={[styles.safeView]}>{children}</View>
			</NavigationContainer>
			<PaperStatusBar />
		</PaperProvider>
	)
}

const styles = StyleSheet.create({
	safeView: {
		flex: 1,
	},
})
