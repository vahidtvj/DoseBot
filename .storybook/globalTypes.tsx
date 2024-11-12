export const globalTypes = {
	locale: {
		name: "Locale",
		description: "Internationalization locale",
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
		toolbar: {
			title: "ColorScheme",
			icon: "circlehollow",
			items: ["light", "dark"],
			dynamicTitle: true,
		},
	},
	colors: {
		description: "Colors",
		toolbar: {
			title: "MaterialYou",
			icon: "circle",
			items: ["MaterialYou", "Default"],
			dynamicTitle: true,
		},
	},
	use24Hour: {
		description: "Time mode",
		toolbar: {
			title: "Time mode",
			icon: "watch",
			items: [
				{ value: false, title: "12-Hour" },
				{ value: true, title: "24-Hour" },
			],
			showName: true,
		},
	},
	calendar: {
		description: "Calendar system",
		toolbar: {
			icon: "calendar",
			items: ["georgian", "persian"],
			dynamicTitle: true,
		},
	},
}
