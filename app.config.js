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

module.exports = {
	expo: {
		name: name,
		slug: "DoseBot",
		version: "0.0.1",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: packageName,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
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
						"./assets/fonts/IRANSans/IRANSansXFaNum.ttf",
						"./assets/fonts/customIcon.ttf",
					],
				},
			],
		],
	},
}
