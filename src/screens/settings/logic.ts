import { showPicker } from "@/components/pickers/radioPicker"
import {
	type CalendarSystem,
	CalendarSystems,
	type Language,
	languages,
} from "@/constants"
import { useConfigState } from "@/stores/configStore"
import { useTranslation } from "react-i18next"

export const useLogic = () => {
	const { t } = useTranslation()
	const onCalendar = () =>
		showPicker({
			onChange: (val) =>
				useConfigState.setState({ calendar: val as CalendarSystem }),
			values: CalendarSystems.map((x) => ({
				key: x,
				label: t(`settings.calendars.${x}`),
			})),
			selected: useConfigState.getState().calendar,
		})

	const onLanguage = () =>
		showPicker({
			onChange: (val) =>
				useConfigState.setState({ lang: val as "system" | Language }),
			values: [
				{
					key: "system",
					label: "System",
				},
				...languages,
			],
			selected: useConfigState.getState().lang,
		})
	return { onCalendar, onLanguage }
}
