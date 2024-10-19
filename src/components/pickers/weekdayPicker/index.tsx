import type { Weekday } from "@/constants"
import { useDateUtils } from "@/utils"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"

type Props = {
	selected: Weekday[]
	onSelect: (days: Weekday[]) => void
	readOnly?: boolean
}
export function WeekdayPicker(props: Props) {
	const { selected, readOnly } = props
	const { t } = useTranslation()
	const { getOrderedWeekdays } = useDateUtils()
	const days = getOrderedWeekdays()

	function onSelect(day: Weekday) {
		const s = selected.filter((x) => x !== day)
		if (s.length === selected.length) s.push(day)
		props.onSelect(s)
	}
	return (
		<View style={styles.row}>
			{days.map((day) => (
				<Button
					key={day}
					mode={selected.includes(day) ? "contained" : "elevated"}
					onPress={() => !readOnly && onSelect(day)}
				>
					{t(`date.${day}`)}
				</Button>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		justifyContent: "center",
	},
})
