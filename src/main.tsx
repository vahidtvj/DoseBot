import Routes from "@/routes"
import { useEffect } from "react"
import { AppLaunch } from "./logic/events"

export default function Main() {
	useEffect(() => {
		if (!__DEV__) AppLaunch()
	}, [])

	return <Routes />
}
