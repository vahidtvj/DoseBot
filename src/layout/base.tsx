import { PaperStatusBar } from "@/components/common/PaperStatusBar"
import { DatePickerModal } from "@/components/pickers/datepicker"
import "@/i18n/i18n"
import { useConfigState } from "@/stores/configStore"
import { useUIStore } from "@/stores/uiStore"
import { darkTheme, lightTheme } from "@/theme"
import { Icon as CustomIcon } from "@/utils/icons"
import { useMaterial3Theme } from "@pchmn/expo-material3-theme"
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native"
import * as Updates from "expo-updates"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { I18nManager, Platform } from "react-native"
import {
	PaperProvider,
	adaptNavigationTheme,
	configureFonts,
} from "react-native-paper"
// import { Icon } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
	children: React.ReactNode
}

export function BaseLayout({ children }: Props) {
	const useMaterialYou = useConfigState((x) => x.useMaterialYou)
	const colorScheme = useUIStore((state) => state.colorScheme)
	const lang = useUIStore((state) => state.lang)
	const shouldBeRTL = lang === "fa"

	useEffect(() => {
		if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
			I18nManager.allowRTL(shouldBeRTL)
			I18nManager.forceRTL(shouldBeRTL)
			Updates.reloadAsync()
		}
	}, [shouldBeRTL])

	const { theme } = useMaterial3Theme({ fallbackSourceColor: "#3E8260" })

	const fonts = useMemo(
		() =>
			lang === "fa"
				? {
						fonts: configureFonts({
							config: { fontFamily: "IRANSansMobile(FaNum)" },
							isV3: true,
						}),
					}
				: {},
		[lang],
	)

	const paperTheme = useMemo(
		() =>
			useMaterialYou
				? colorScheme === "dark"
					? {
							...darkTheme,
							colors: { ...darkTheme.colors, ...theme.dark },
							...fonts,
						}
					: {
							...lightTheme,
							colors: { ...lightTheme.colors, ...theme.light },
							...fonts,
						}
				: colorScheme === "dark"
					? { ...darkTheme, colors: darkTheme.colors, ...fonts }
					: { ...lightTheme, colors: lightTheme.colors, ...fonts },
		[colorScheme, theme, useMaterialYou, fonts],
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
			<DatePickerModal />
			<PaperStatusBar />
		</PaperProvider>
	)
}

const styles = StyleSheet.create({
	safeView: {
		flex: 1,
	},
})
