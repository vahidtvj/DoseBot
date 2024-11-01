import { useAppTheme } from "@/theme"
import { useCallback, useRef, useState } from "react"
import { StyleSheet, type TextInput as TextInputR, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper"
import { TimePickerClock } from "./clock/clock"
import { TimeInputFull } from "./input"
type Props = {
	open: boolean
	value?: Date
	use24Hour?: boolean
	onSelect: (date: Date, lastMode: "clock" | "input") => void
	onDismiss: () => void
	rtl?: boolean
	mode: "clock" | "input"
}
export function TimePicker(props: Props) {
	const { open, onDismiss, onSelect, use24Hour, rtl = false } = props
	const [value, setValue] = useState(props.value || new Date())
	const [mode, setMode] = useState(props.mode)
	const [active, setActive] = useState<"none" | "hour" | "minute">(
		mode === "input" ? "none" : "hour",
	)

	const labels = {
		titleClock: "Select Time",
		titleInput: "Enter Time",
		time: { am: "AM", pm: "PM" },
		btns: { ok: "OK", cancel: "Cancel" },
	}
	const minute = value.getMinutes()
	const hour24 = value.getHours()
	const hour = use24Hour ? hour24 : hour24 % 12 || 12
	const ampm = hour24 < 12 ? "am" : "pm"

	const onChange = useCallback(
		(input: "hour" | "minute", newValue: number) => {
			if (input === "minute") {
				setValue((x) => new Date(x.setMinutes(newValue)))
				return
			}
			let val = newValue
			if (!use24Hour) {
				if (ampm === "pm" && val !== 12) {
					val += 12 // add 12 for PM times, except at 12 PM
				} else if (ampm === "am" && val === 12) {
					val = 0 // set 12 AM to 0
				}
			}

			setValue((x) => new Date(x.setHours(val)))
		},
		[ampm, use24Hour],
	)

	const onAMPM = useCallback(
		(value: "am" | "pm") => {
			if (value === ampm) return
			if (value === "am")
				setValue((x) => new Date(x.setHours(x.getHours() - 12)))
			else setValue((x) => new Date(x.setHours((x.getHours() + 12) % 24)))
		},
		[ampm],
	)
	function toggleMode() {
		if (active === "none") setActive("hour")
		setMode((x) => (x === "clock" ? "input" : "clock"))
	}

	const hourRef = useRef<TextInputR | null>(null)
	const minuteRef = useRef<TextInputR | null>(null)

	function handleSubmit() {
		if (hourRef.current?.isFocused() || minuteRef.current?.isFocused()) {
			hourRef.current?.blur()
			minuteRef.current?.blur()
		} else {
			onSelect(value, mode)
		}
	}
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
					<Text variant="titleSmall" style={{ marginBottom: 20 }}>
						{mode === "clock" ? labels.titleClock : labels.titleInput}
					</Text>
					<View style={{ gap: 36, alignItems: "center" }}>
						<TimeInputFull
							active={active}
							ampm={use24Hour ? "none" : ampm}
							editable={mode === "input"}
							hour={hour}
							minute={minute}
							onAMPM={onAMPM}
							onChange={onChange}
							setActive={setActive}
							rtl={rtl}
							labels={labels.time}
							refs={{ hour: hourRef, minute: minuteRef }}
						/>
						{mode === "clock" && active === "hour" && (
							<TimePickerClock
								inputType={use24Hour ? "hour24" : "hour"}
								selected={hour}
								onFinish={() => setActive("minute")}
								onChange={(val) => onChange("hour", val)}
								rtl={rtl}
							/>
						)}
						{mode === "clock" && active === "minute" && (
							<TimePickerClock
								inputType={"minute"}
								selected={minute}
								onChange={(val) => onChange("minute", val)}
								rtl={rtl}
							/>
						)}
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginTop: 24,
						}}
					>
						<IconButton
							icon={mode === "clock" ? "keyboard-outline" : "clock-outline"}
							onPress={toggleMode}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<Button compact mode="text" onPress={onDismiss}>
								{labels.btns.cancel}
							</Button>
							<Button compact mode="text" onPress={handleSubmit}>
								{labels.btns.ok}
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
		padding: 24,
		borderRadius: 12,
		alignSelf: "center",
	},
})
