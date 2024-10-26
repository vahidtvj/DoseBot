import { type Language, languages } from "@/constants"
import { getLocales } from "expo-localization"
import { Appearance } from "react-native"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { useConfigState } from "./configStore"

const deviceLanguage = getLocales()[0].languageCode || "en"
const defaultLanguage =
	languages.find((x) => x.key === deviceLanguage)?.key || "en"

// on older devices with no dark mode default to light theme (does not effect user choice)
const deviceColorScheme = Appearance.getColorScheme() || "light" // ! not reactive

interface IState {
	lang: Language
	colorScheme: "light" | "dark"
}

const configStore = useConfigState.getState()
export const useUIStore = create<IState>()(
	subscribeWithSelector((_set) => ({
		lang: configStore.lang === "system" ? defaultLanguage : configStore.lang,
		colorScheme:
			configStore.colorScheme === "system"
				? deviceColorScheme
				: configStore.colorScheme,
	})),
)

// listen to system theme change (if dark mode set to auto)
Appearance.addChangeListener((val) => {
	if (useConfigState.getState().colorScheme === "system")
		useUIStore.setState({ colorScheme: val.colorScheme || "light" })
})

// listen to config store
useConfigState.subscribe((state) =>
	useUIStore.setState({
		colorScheme:
			state.colorScheme === "system" ? deviceColorScheme : state.colorScheme,
		lang: state.lang === "system" ? defaultLanguage : state.lang,
	}),
)
