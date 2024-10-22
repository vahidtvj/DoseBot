import type { ConfigContext, ExpoConfig } from "@expo/config"
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

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: name,
	slug: "DoseBot",
	version: "0.0.1",
	orientation: "portrait",
	icon: "./assets/appicon.png",
	userInterfaceStyle: "light",
	assetBundlePatterns: ["**/*"],
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
})
