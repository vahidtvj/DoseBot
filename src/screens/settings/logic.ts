import { showPicker } from "@/components/pickers/radioPicker"
import { type Language, languages } from "@/constants"
import { useConfigState } from "@/stores/configStore"

export const onLanguage = () =>
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
