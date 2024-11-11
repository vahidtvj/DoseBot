import type { StorybookConfig } from "@storybook/react-vite"

type ServerStorybookConfig = StorybookConfig & {
	reactNativeServerOptions: { host: string; port: number }
}

const main: ServerStorybookConfig = {
	stories: ["../src/**/*.stories.?(ts|tsx|js|jsx)"],
	addons: [
		// "@storybook/addon-links",
		"@storybook/addon-essentials",
		// "@storybook/addon-react-native-web",
		"@storybook/addon-react-native-server",
	],
	reactNativeServerOptions: {
		host: "0.0.0.0",
		port: 7007,
	},
	// logLevel: 'debug',
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		builder: "@storybook/builder-vite",
		disableTelemetry: true,
	},
}

export default main
