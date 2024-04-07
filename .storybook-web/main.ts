import path from "path"
import type { StorybookConfig } from "@storybook/react-webpack5"
// const { hostname } = url.parse(NativeModules.SourceCode.scriptURL)

type ServerStorybookConfig = StorybookConfig & {
	reactNativeServerOptions: { host: string; port: number }
}

const main: ServerStorybookConfig = {
	stories: ["../src/**/*.stories.?(ts|tsx|js|jsx)"],
	addons: [
		// "@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-react-native-web",
		"@storybook/addon-react-native-server",
	],
	reactNativeServerOptions: {
		host: "0.0.0.0",
		port: 7007,
	},
	// logLevel: 'debug',
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	async webpackFinal(config, _options) {
		const alias = {
			...config.resolve?.alias,
			"@": path.resolve(__dirname, "../src"),
		}
		config.resolve = { ...config.resolve, alias }
		return config
	},
}

export default main
