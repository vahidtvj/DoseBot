import { useUIStore } from "@/stores/uiStore"
import { StatusBar } from "expo-status-bar"

export function PaperStatusBar() {
	const colorScheme = useUIStore((state) => state.colorScheme)
	return <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
}
