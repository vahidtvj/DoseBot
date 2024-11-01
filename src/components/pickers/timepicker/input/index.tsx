import { useAppTheme } from "@/theme"
import type { RefObject } from "react"
import { StyleSheet, type TextInput as TextInputR, View } from "react-native"
import { Button } from "react-native-paper"
import { TimeInput } from "./timeInput"

type Props = {
	hour: number
	minute: number
	ampm: "none" | "am" | "pm"
	onAMPM: (value: "am" | "pm") => void
	active: "none" | "hour" | "minute"
	setActive: (input: "hour" | "minute") => void
	onChange: (input: "hour" | "minute", value: number) => void
	editable: boolean
	rtl: boolean
	labels?: {
		am: string
		pm: string
	}
	refs: {
		hour: RefObject<TextInputR>
		minute: RefObject<TextInputR>
	}
}
export function TimeInputFull(props: Props) {
	const {
		active,
		onChange,
		hour,
		minute,
		onAMPM,
		ampm,
		setActive,
		editable,
		rtl,
		refs,
		labels = { am: "AM", pm: "PM" },
	} = props
	const theme = useAppTheme()

	return (
		<View style={[styles.root, { flexDirection: rtl ? "row-reverse" : "row" }]}>
			<View
				style={[
					styles.inputContainer,
					{ flexDirection: rtl ? "row-reverse" : "row" },
				]}
			>
				<TimeInput
					value={hour}
					active={active === "hour"}
					input={ampm === "none" ? "hour24" : "hour"}
					onPress={() => setActive("hour")}
					onChange={(value) => onChange("hour", value)}
					editable={editable}
					ref={refs.hour}
				/>
				<View style={styles.separatorContainer}>
					<View
						style={[
							styles.separator,
							{
								borderColor: theme.colors.onSurface,
							},
						]}
					/>
					<View
						style={[
							styles.separator,
							{
								borderColor: theme.colors.onSurface,
							},
						]}
					/>
				</View>
				<TimeInput
					value={minute}
					active={active === "minute"}
					input="minute"
					onPress={() => setActive("minute")}
					onChange={(value) => onChange("minute", value)}
					editable={editable}
					ref={refs.minute}
				/>
			</View>
			{ampm !== "none" && (
				<View style={styles.AMPMContainer}>
					<Button
						compact
						mode={ampm === "am" ? "contained" : "outlined"}
						style={styles.AMButton}
						onPress={() => onAMPM("am")}
					>
						{labels.am}
					</Button>
					<Button
						compact
						mode={ampm === "pm" ? "contained" : "outlined"}
						style={styles.PMButton}
						onPress={() => onAMPM("pm")}
					>
						{labels.pm}
					</Button>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		gap: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	inputContainer: { gap: 12, alignItems: "center" },
	separatorContainer: { gap: 12 },
	separator: { borderWidth: 4, borderRadius: 8 },
	AMPMContainer: { height: "100%", minWidth: 52 },
	AMButton: {
		borderRadius: 0,
		borderTopStartRadius: 8,
		borderTopEndRadius: 8,
		flex: 1,
		justifyContent: "center",
		borderWidth: 1,
	},
	PMButton: {
		borderRadius: 0,
		borderBottomStartRadius: 8,
		borderBottomEndRadius: 8,
		flex: 1,
		justifyContent: "center",
		borderWidth: 1,
	},
})
