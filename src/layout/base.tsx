import { PaperStatusBar } from "@/components/common/PaperStatusBar"
import "@/i18n/i18n"
import { useConfigState } from "@/stores/configStore"
import { useUIStore } from "@/stores/uiStore"
import { darkTheme, lightTheme } from "@/theme"
// import * as Updates from "expo-updates"
import { Icon as CustomIcon } from "@/utils/icons"
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
// import { Icon } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
	children: React.ReactNode
}

export function BaseLayout({ children }: Props) {
	const useMaterialYou = useConfigState((x) => x.useMaterialYou)
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
			useMaterialYou
				? colorScheme === "dark"
					? { ...darkTheme, colors: { ...darkTheme.colors, ...theme.dark } }
					: { ...lightTheme, colors: { ...lightTheme.colors, ...theme.light } }
				: colorScheme === "dark"
				  ? { ...darkTheme, colors: darkTheme.colors }
				  : { ...lightTheme, colors: lightTheme.colors },
		[colorScheme, theme, useMaterialYou],
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
		<PaperProvider
			theme={paperTheme}
			settings={{
				icon: (s) => {
					if (s.name.startsWith("$"))
						return <CustomIcon {...s} name={s.name.slice(1)} />

					return <Icon {...s} />
				},
			}}
		>
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
