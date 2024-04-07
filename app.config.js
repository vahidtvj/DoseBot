const APP_VARIANT = process.env.APP_VARIANT

let packageName = "com.vahidtvj.DoseRiteDev"
let name = "DoseRiteDev"
if (APP_VARIANT === "preview") {
	name = "DoseRitePreview"
	packageName = "com.vahidtvj.DoseRitePreview"
} else if (APP_VARIANT === "production") {
	name = "DoseRite"
	packageName = "com.vahidtvj.DoseRite"
}

module.exports = {
	expo: {
		name: name,
		slug: "DoseRite",
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
		],
	},
}
