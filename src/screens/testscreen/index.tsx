import { ScrollView, StyleSheet, View } from "react-native"
import { Button, IconButton, Text } from "react-native-paper"

import { datePicker } from "@/components/pickers/datepicker"
import { useAppState } from "@/stores/app"
import { useConfigState } from "@/stores/configStore"
import { useUIStore } from "@/stores/uiStore"

export default function Page() {
	const ui = useUIStore()
	const config = useConfigState()
	const { eventFireTimes } = useAppState()
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<Text>Language is: {ui.lang}</Text>
			<Text>Color scheme is: {ui.colorScheme}</Text>
			<IconButton
				icon="camera"
				size={48}
				onPress={() => console.log("camera")}
			/>
			<Button
				icon="camera"
				mode="contained"
				onPress={() => console.log("Pressed")}
			>
				Press, Me!
			</Button>
			<Button
				mode="outlined"
				onPress={() => {
					config.update({ lang: ui.lang === "fa" ? "en" : "fa" })
				}}
			>
				Lang: {ui.lang}
			</Button>
			<Button
				mode="outlined"
				onPress={() => {
					throw new Error("Hello, again, Sentry!")
				}}
			>
				Test Sentry
			</Button>
			<Button
				mode="outlined"
				onPress={() => {
					datePicker.open({
						onSelect: (date) => console.log(date.toLocaleString()),
					})
				}}
			>
				datepicker
			</Button>
			<ScrollView>
				{eventFireTimes.map((x, i) => (
					<Text key={i}>{x.toLocaleString()}</Text>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	btnRTL: {
		flexDirection: "row-reverse",
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
})
