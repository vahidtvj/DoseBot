// ! The imports in this file should be in order
// ! These comments are necessary
// import group 1
import * as Sentry from "@sentry/react-native"

const sentryDsn = Constants.expoConfig?.extra?.sentryDsn
Sentry.init({
	dsn: sentryDsn,
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	enabled: !__DEV__,
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
import { GestureHandlerRootView } from "react-native-gesture-handler"
const MainApp =
	Constants.expoConfig?.extra?.storybookEnabled === "true"
		? require("./.storybook")
		: require("./src/main")

// TODO: Temporary
import { Text, View } from "react-native"
function App() {
	const { error, success } = useMigrations(db, migrations)

	if (__DEV__) {
		useDrizzleStudio(expoDb)
		// load custom icon font
		// required for dev only to update the font file without the need for a dev build
		const [fontsLoaded] = useFonts({
			customIcon: require("./assets/fonts/customIcon.ttf"),
		})
		if (!fontsLoaded) return null
	}
	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		)
	}
	if (!success) return <Text>Loading</Text>
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BaseLayout>
				<MainApp.default />
			</BaseLayout>
		</GestureHandlerRootView>
	)
}
export default Sentry.wrap(App)
// export default App
