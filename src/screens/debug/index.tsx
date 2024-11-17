import type { RootStackScreenProps } from "@/routes/types"
import { useAppState } from "@/stores/app"
import { useConfigState } from "@/stores/configStore"
import { useDebugStore } from "@/stores/debugStore"
import { ScrollView, StyleSheet, View } from "react-native"
import { Chip, IconButton, Text } from "react-native-paper"
import { useLogic } from "./logic"

export default function Page(_props: RootStackScreenProps<"Debug">) {
	const { isFetchRegistered, fetchStatus, checkFetchStatus } = useLogic()
	const { doseStoreDay, inventoryAlertDay } = useAppState()
	const { invAlertTime } = useConfigState()
	const { backgroundRuns, enabled, setEnabled } = useDebugStore()

	return (
		<View style={styles.page}>
			<ScrollView contentContainerStyle={styles.content}>
				<View>
					<Text variant="titleMedium">Background Task</Text>
					<View style={[styles.row]}>
						<View>
							<Text>{`Background Fetch status: ${fetchStatus}`}</Text>
							<Text>{`Registered: ${isFetchRegistered}`}</Text>
						</View>
						<IconButton
							mode="contained"
							icon="reload"
							onPress={checkFetchStatus}
						/>
					</View>
				</View>
				<View>
					<Text variant="titleMedium">State</Text>
					<View>
						<Text>{`DoseStoreDay: ${doseStoreDay?.toLocaleString()}`}</Text>
						<Text>{`InventoryAlertDay: ${inventoryAlertDay?.toLocaleString()}`}</Text>
						<Text>{`InvAlertTime: ${invAlertTime?.toLocaleTimeString()}`}</Text>
					</View>
				</View>

				<View>
					<View style={styles.row}>
						<Text variant="titleMedium">Background fetch runs</Text>
						<Chip onPress={() => setEnabled(!enabled)}>
							{enabled ? "Disable" : "Enable"}
						</Chip>
					</View>
					<View>
						{backgroundRuns.map((run, i) => (
							<Text key={i}>{`${run.type} ${run.time.toLocaleString()}`}</Text>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	content: {
		padding: 12,
		gap: 12,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
