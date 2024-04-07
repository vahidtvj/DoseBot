import { LogBox } from "react-native"

if (__DEV__) {
	const ignoreWarns = [
		"Non-serializable values were found in the navigation state",
		"Require cycle:",
	]

	const warn = console.warn
	console.warn = (...arg) => {
		for (const warning of ignoreWarns) {
			if (arg[0].startsWith(warning)) {
				return
			}
		}
		warn(...arg)
	}

	LogBox.ignoreLogs(ignoreWarns)
}
