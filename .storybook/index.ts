import { NativeModules } from "react-native"
import { storage } from "../src/utils/mmkvStorage"
import { view } from "./storybook.requires"
const { hostname } = new URL(NativeModules.SourceCode.scriptURL)

async function getItem(key: string): Promise<string | null> {
	return storage.getString(key) || null
}
async function setItem(key: string, value: string) {
	storage.set(key, value)
}

const StorybookUIRoot = view.getStorybookUI({
	storage: {
		getItem: getItem,
		setItem: setItem,
	},
	onDeviceUI: false,
	shouldPersistSelection: true,
	enableWebsockets: true,
	host: hostname || "",
	port: 7007,
	secured: false,
})

export default StorybookUIRoot
