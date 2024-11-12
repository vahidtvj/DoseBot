import { useConfigState } from "@/stores/configStore"
import { randomUUID } from "expo-crypto"
import { useTranslation } from "react-i18next"
import { create } from "zustand"
import { TimePicker } from "./timepicker"

type State = {
	isOpen: boolean
	value?: Date
	mode?: "clock" | "input"
	use24Hour?: boolean
	onSelect: (date: Date, mode?: "clock" | "input") => void
	onDismiss: () => void
	close: () => void
	open: (props: {
		value?: Date
		use24Hour?: boolean
		onDismiss?: () => void
		onSelect: (date: Date) => void
		mode?: "clock" | "input"
	}) => void
}
const useStore = create<State>()((set) => ({
	isOpen: false,
	onSelect: () => {},
	onDismiss: () => {},
	close: () => set({ isOpen: false }),
	open: (props) => {
		const { value } = props
		const config = useConfigState.getState()
		const mode = props.mode ?? config.timePickerMode
		const use24Hour = props.use24Hour ?? config.use24Hour
		set({
			isOpen: true,
			value,
			use24Hour,
			onDismiss: () => {
				set({ isOpen: false })
				props.onDismiss?.()
			},
			onSelect: (date, newMode) => {
				if (mode !== newMode) config.update({ timePickerMode: newMode })
				set({ isOpen: false })
				props.onSelect(date)
			},
			mode,
		})
	},
}))

export function TimePickerModal() {
	const { i18n, t } = useTranslation()
	const rtl = i18n.dir() === "rtl"

	const { isOpen, onSelect, onDismiss, value, use24Hour, mode } = useStore()

	return (
		<TimePicker
			key={randomUUID()}
			rtl={rtl}
			mode={mode ?? "clock"}
			open={isOpen}
			value={value}
			onDismiss={onDismiss}
			onSelect={onSelect}
			use24Hour={use24Hour}
			labels={{ btns: { cancel: t("cancel"), ok: t("ok") } }}
		/>
	)
}

export const timePicker = {
	open: useStore.getState().open,
	close: useStore.getState().close,
}
