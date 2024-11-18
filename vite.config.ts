import path from "node:path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import reactNativeWeb from "vite-plugin-react-native-web"

export default defineConfig({
	plugins: [react(), reactNativeWeb()],
	server: {
		port: 7007,
	},
	resolve: {
		alias: {
			// "react-native": "react-native-web",
			"react-native-linear-gradient": "react-native-web-linear-gradient",
			"react-native-mmkv": path.resolve(
				__dirname,
				".storybook/mocks/react-native-mmkv.js",
			),
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
