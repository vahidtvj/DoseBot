import { DoseCard } from "@/components/cards/dose"
import type { DoseStatus } from "@/constants"
import type { IDoseFull } from "@/db"
import { isTomorrow, isYesterday } from "date-fns"
import { FlatList, View } from "react-native"
import { Text } from "react-native-paper"

type Props = {
	data: IDoseFull[]
	changeStatus: (id: number, status: DoseStatus) => void
}

export function DoseView(props: Props) {
	const { data, changeStatus } = props
	const start = data.findIndex((x) => !isYesterday(x.time))
	const end = data.findIndex((x) => isTomorrow(x.time))

	const today = data.slice(
		start !== -1 ? start : 0,
		end !== -1 ? end : undefined,
	)
	const tomorrow = end !== -1 && data.slice(end)
	const yesterday =
		start > 0 && data.slice(0, start).filter((x) => x.status === "pending")

	// TODO make design decision
	return (
		<View>
			<FlatList
				data={today}
				keyExtractor={(item) => String(item.id)}
				renderItem={(item) => (
					<DoseCard
						{...item.item}
						onConfirm={(id) => changeStatus(id, "confirm")}
						onSkip={(id) => changeStatus(id, "skip")}
					/>
				)}
			/>
			{yesterday && (
				<View>
					<Text style={{ marginStart: 20 }}>Yesterday</Text>
					<FlatList
						data={yesterday}
						keyExtractor={(item) => String(item.id)}
						renderItem={(item) => (
							<DoseCard
								{...item.item}
								onConfirm={(id) => changeStatus(id, "confirm")}
								onSkip={(id) => changeStatus(id, "skip")}
							/>
						)}
					/>
				</View>
			)}
			{tomorrow && (
				<View>
					<Text style={{ marginStart: 20 }}>Tomorrow</Text>
					<FlatList
						data={tomorrow}
						keyExtractor={(item) => String(item.id)}
						renderItem={(item) => (
							<DoseCard
								{...item.item}
								onConfirm={(id) => changeStatus(id, "confirm")}
								onSkip={(id) => changeStatus(id, "skip")}
							/>
						)}
					/>
				</View>
			)}
		</View>
	)
}
