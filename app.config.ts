import type { ExpoConfig } from "@expo/config"
import { AndroidConfig, withAndroidColorsNight } from "@expo/config-plugins"

const APP_VARIANT = process.env.APP_VARIANT

let packageName = "com.vahidtvj.DoseBotDev"
let name = "DoseBotDev"
if (APP_VARIANT === "preview") {
	name = "DoseBotPreview"
	packageName = "com.vahidtvj.DoseBotPreview"
} else if (APP_VARIANT === "production") {
	name = "DoseBot"
	packageName = "com.vahidtvj.DoseBot"
}

const config: ExpoConfig = {
	name: name,
	slug: "DoseBot",
	version: "0.0.1",
	orientation: "portrait",
	icon: "./assets/appicon.png",
	userInterfaceStyle: "light",
	assetBundlePatterns: ["**/*"],
	scheme: packageName,
	ios: {
		supportsTablet: true,
		bundleIdentifier: packageName,
		splash: {
			image: "./assets/splash-screen.png",
			backgroundColor: "#ffffff",
			dark: { backgroundColor: "#000000", image: "./assets/splash-screen.png" },
		},
	},
	android: {
		splash: {
			image: "./assets/splash-screen.png",
			backgroundColor: "#ffffff",
			dark: { backgroundColor: "#000000", image: "./assets/splash-screen.png" },
		},
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-foreground.png",
			backgroundColor: "#ffffff",
			monochromeImage: "./assets/adaptive-mono.png",
		},
		package: packageName,
	},
	web: {
		favicon: "./assets/favicon.png",
	},
	extra: {
		supportsRTL: true,
		// forcesRTL: true,
		eas: {
			projectId: process.env.PROJECT_ID,
		},
		storybookEnabled: process.env.STORYBOOK_ENABLED,
		sentryDsn: process.env.SENTRY_DSN,
	},
	notification: {
		icon: "./assets/notification-icon.png",
	},
	plugins: [
		"expo-localization",
		[
			"@sentry/react-native/expo",
			{
				organization: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
			},
		],
		[
			"expo-font",
			{
				fonts: [
					"./assets/fonts/IRANSans/IRANSansMobile(FaNum).ttf",
					"./assets/fonts/customIcon.ttf",
				],
			},
		],
	],
}

// sets status bar to black. splash screen when using dark mode had white status bar before
module.exports = withAndroidColorsNight(config, async (config) => {
	config.modResults = AndroidConfig.Colors.assignColorValue(config.modResults, {
		name: "colorPrimaryDark",
		value: "#000000",
	})
	return config
})
