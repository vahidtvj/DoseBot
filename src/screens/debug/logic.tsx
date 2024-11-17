import { BACKGROUND_FETCH_TASK } from "@/logic/events"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { useEffect, useState } from "react"

export const useLogic = () => {
	const [isFetchRegistered, setIsRegistered] = useState(false)
	const [fetchStatus, setFetchStatus] = useState("")

	useEffect(() => {
		checkFetchStatus()
	}, [])

	const checkFetchStatus = async () => {
		const status = await BackgroundFetch.getStatusAsync()
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_FETCH_TASK,
		)
		// @ts-ignore
		setFetchStatus(BackgroundFetch.BackgroundFetchStatus[status])
		setIsRegistered(isRegistered)
	}

	return { isFetchRegistered, checkFetchStatus, fetchStatus }
}
