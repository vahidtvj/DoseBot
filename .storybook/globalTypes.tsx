export const globalTypes = {
	locale: {
		name: "Locale",
		description: "Internationalization locale",
		defaultValue: "en",
		toolbar: {
			icon: "globe",
			items: [
				{ value: "en", right: "🇺🇸", title: "English" },
				{ value: "fa", right: "🇮🇷", title: "فارسی" },
			],
			showName: true,
		},
	},
	colorScheme: {
		description: "Global colorScheme for components",
		defaultValue: "dark",
		toolbar: {
			title: "ColorScheme",
			icon: "circlehollow",
			items: ["light", "dark"],
			dynamicTitle: true,
		},
	},
	colors: {
		description: "Colors",
		defaultValue: "MaterialYou",
		toolbar: {
			title: "MaterialYou",
			icon: "circle",
			items: ["MaterialYou", "Default"],
			dynamicTitle: true,
		},
	},
}
