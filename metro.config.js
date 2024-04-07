const path = require("path")
// const { getDefaultConfig } = require("expo/metro-config")
const { getSentryExpoConfig } = require("@sentry/react-native/metro")

const { generate } = require("@storybook/react-native/scripts/generate")

generate({
	configPath: path.resolve(__dirname, "./.storybook"),
})

/** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname)
// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname)

config.transformer.unstable_allowRequireContext = true

config.resolver.sourceExts.push("mjs")

module.exports = config
