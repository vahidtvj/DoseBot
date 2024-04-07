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

// import group 3
import "@/logic/registerEvents"
import "@/utils/notifications"

// App
import { BaseLayout } from "@/layout/base"
import Constants from "expo-constants"
import "react-native-gesture-handler"
const MainApp =
	Constants.expoConfig?.extra?.storybookEnabled === "true"
		? require("./.storybook")
		: require("./src/main")

function App() {
	return (
		<BaseLayout>
			<MainApp.default />
		</BaseLayout>
	)
}
export default Sentry.wrap(App)
// export default App
