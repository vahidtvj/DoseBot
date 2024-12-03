import { Calendar, type Methods } from "@/components/calendar"
import { useAppTheme } from "@/theme"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button, IconButton, Modal, Portal } from "react-native-paper"
import { useDatePicker } from "./logic"
type IProps = {
	open: boolean
	onSelect: (date: Date) => void
	onDismiss?: () => void
	date?: Date
	minDate?: Date
	maxDate?: Date
}

export function DatePicker(props: IProps) {
	const { i18n, t } = useTranslation()
	const isRTL = i18n.dir() === "rtl"

	const { open, onDismiss } = props
	const { minDate, maxDate, today, date, dateRef } = useDatePicker(props)

	function onSelect() {
		props.onSelect(dateRef.current)
	}

	function onChange(date: Date) {
		dateRef.current = date
	}

	const control = useRef<Methods>(null)
	const theme = useAppTheme()

	return (
		<Portal>
			<View
				style={[
					styles.backdrop,
					{
						backgroundColor: theme.colors.backdrop,
						display: open ? "flex" : "none",
					},
				]}
			>
				<Modal
					visible={open}
					onDismiss={onDismiss}
					contentContainerStyle={[
						styles.modal,
						{ backgroundColor: theme.colors.surface },
					]}
				>
					<Calendar
						date={date}
						maxDate={maxDate}
						minDate={minDate}
						today={today}
						onChange={onChange}
						showSelection
						todayStyle="bar"
						control={control}
					/>
					<View style={styles.buttons}>
						<IconButton
							icon={isRTL ? "arrow-down-right" : "arrow-down-left"}
							onPress={() => control.current?.thisMonth()}
							iconColor={theme.colors.secondary}
						/>
						<View style={styles.buttonsGroupEnd}>
							<Button mode="contained-tonal" onPress={onDismiss}>
								{t("cancel")}
							</Button>
							<Button mode="contained" onPress={onSelect}>
								{t("select")}
							</Button>
						</View>
					</View>
				</Modal>
			</View>
		</Portal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
	},
	modal: {
		margin: 20,
		borderRadius: 12,
		alignSelf: "center",
		alignItems: "center",
	},
	buttons: {
		alignSelf: "stretch",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 12,
		alignItems: "center",
	},
	buttonsGroupEnd: {
		flexDirection: "row",
		gap: 12,
	},
})
