import { DoseCard } from "@/components/cards/dose"
import type { IDoseFull } from "@/db"
import { FlatList, StyleSheet, View } from "react-native"

type Props = {
	data: IDoseFull[]
}

export function HistoryDay(props: Props) {
	const { data } = props

	return (
		<View style={styles.page}>
			<FlatList
				data={data}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <DoseCard {...item} historyMode />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
})
