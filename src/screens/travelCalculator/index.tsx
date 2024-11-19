import { TravelCalcForm } from "@/components/forms/travel"
import { getAllMeds } from "@/db"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { StyleSheet, View } from "react-native"

export default function Page() {
	const meds = useLiveQuery(getAllMeds)

	return (
		<View style={styles.container}>
			<TravelCalcForm meds={meds.data} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
