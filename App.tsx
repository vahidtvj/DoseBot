// import group 3
import "@/logic/registerEvents"
import "@/utils/notifications"

// import group 2
import "@/utils/ignoreLogs"

import { db, expoDb } from "@/db/query/client"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
// sqlite - drizzle
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import migrations from "./drizzle/migrations"

import { BaseLayout } from "@/layout/base"
// App
import { useFonts } from "expo-font"
import "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"

SplashScreen.preventAutoHideAsync()
const MainApp =
	process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true"
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
export default App
