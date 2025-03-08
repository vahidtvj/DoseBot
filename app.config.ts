import type { ExpoConfig } from "@expo/config"

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
	version: "0.1.0",
	orientation: "portrait",
	icon: "./assets/appicon.png",
	userInterfaceStyle: "light",
	assetBundlePatterns: ["**/*"],
	scheme: packageName,
	newArchEnabled: true,
	ios: {
		supportsTablet: true,
		bundleIdentifier: packageName,
	},
	android: {
		softwareKeyboardLayoutMode: "pan",
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
		commitSha: process.env.GITHUB_SHA || "unknown",
	},
	notification: {
		icon: "./assets/notification-icon.png",
	},
	plugins: [
		[
			"expo-splash-screen",
			{
				backgroundColor: "#ffffff",
				image: "./assets/splash-new.png",
				dark: {
					image: "./assets/splash-new.png",
					backgroundColor: "#000000",
				},
				imageWidth: 256,
			},
		],
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

module.exports = config
