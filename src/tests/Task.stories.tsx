import type { Meta, StoryObj } from "@storybook/react"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"

import {
	BACKGROUND_FETCH_TASK,
	registerBackgroundFetchAsync,
	unregisterBackgroundFetchAsync,
} from "@/logic/events"
import { useAppState } from "@/stores/app"

function BackgroundFetchScreen() {
	const [isRegistered, setIsRegistered] = React.useState(false)
	const [status, setStatus] = React.useState(null)

	React.useEffect(() => {
		checkStatusAsync()
	}, [])

	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync()
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_FETCH_TASK,
		)
		// @ts-ignore
		setStatus(status)
		setIsRegistered(isRegistered)
	}

	const toggleFetchTask = async () => {
		if (isRegistered) {
			await unregisterBackgroundFetchAsync()
		} else {
			await registerBackgroundFetchAsync()
		}

		checkStatusAsync()
	}
	const state = useAppState()
	return (
		<View style={styles.screen}>
			<View style={styles.textContainer}>
				<Text>
					Background fetch status:{" "}
					<Text style={styles.boldText}>
						{status && BackgroundFetch.BackgroundFetchStatus[status]}
					</Text>
				</Text>
				<Text>
					Background fetch task name:{" "}
					<Text style={styles.boldText}>
						{isRegistered ? BACKGROUND_FETCH_TASK : "Not registered yet!"}
					</Text>
				</Text>
			</View>
			{/* <View style={styles.textContainer}></View> */}
			<Button mode="contained" onPress={toggleFetchTask}>
				{isRegistered
					? "Unregister BackgroundFetch task"
					: "Register BackgroundFetch task"}
			</Button>
			<Text>
				{state.doseStoreDay
					? new Date(state.doseStoreDay).toLocaleString()
					: "asd"}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		margin: 10,
	},
	boldText: {
		fontWeight: "bold",
	},
})

const meta: Meta<typeof BackgroundFetchScreen> = {
	component: BackgroundFetchScreen,
}

export default meta
type Story = StoryObj<typeof BackgroundFetchScreen>

export const Primary: Story = {
	render: () => <BackgroundFetchScreen />,
}
