// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require("path")
const { getDefaultConfig } = require("expo/metro-config")

const withStorybook = require("@storybook/react-native/metro/withStorybook")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.unstable_allowRequireContext = true

config.resolver.sourceExts.push("mjs")
config.resolver.sourceExts.push("sql")

module.exports = withStorybook(config, {
	enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
	configPath: path.resolve(__dirname, "./.storybook"),
	onDisabledRemoveStorybook: true,
})
