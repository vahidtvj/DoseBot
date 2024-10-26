import { useConfigState } from "@/stores/configStore"
// ! The imports in this file should be in order
// ! These comments are necessary
// import group 1
import * as Sentry from "@sentry/react-native"
const sentryDsn = Constants.expoConfig?.extra?.sentryDsn
Sentry.init({
	dsn: sentryDsn,
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	enabled: !__DEV__,
	sendDefaultPii: false,
	beforeSend(event) {
		if (!useConfigState.getState().sentryEnabled) return null
		event.user = undefined
		event.request = undefined
		return event
	},
})

// import group 2
import "@/utils/ignoreLogs"

import { db, expoDb } from "@/db/query/client"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
// sqlite - drizzle
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import migrations from "./drizzle/migrations"

// import group 3
import "@/logic/registerEvents"
import "@/utils/notifications"

import { BaseLayout } from "@/layout/base"
import Constants from "expo-constants"
// App
import { useFonts } from "expo-font"
import "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"

SplashScreen.preventAutoHideAsync()
const MainApp =
	Constants.expoConfig?.extra?.storybookEnabled === "true"
		? require("./.storybook")
		: require("./src/main")

import { useCallback, useEffect, useState } from "react"
function App() {
	const [isLoading, setIsLoading] = useState(true)
	const { success: migrationsLoaded } = useMigrations(db, migrations)
	let fontsLoaded = !__DEV__

	if (__DEV__) {
		useDrizzleStudio(expoDb)
		// load custom icon font
		// required for dev only to update the font file without the need for a dev build
		fontsLoaded = useFonts({
			customIcon: require("./assets/fonts/customIcon.ttf"),
		})[0]
	}

	useEffect(() => {
		if (fontsLoaded && migrationsLoaded) setIsLoading(false)
	}, [fontsLoaded, migrationsLoaded])

	const onLayoutRootView = useCallback(async () => {
		if (!isLoading && migrationsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [isLoading, migrationsLoaded])

	if (isLoading) return null
	return (
		<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<BaseLayout>
				<MainApp.default />
			</BaseLayout>
		</GestureHandlerRootView>
	)
}
export default Sentry.wrap(App)
// export default App
