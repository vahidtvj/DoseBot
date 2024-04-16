import { showPicker } from "@/components/pickers/radioPicker"
import { useConfigState } from "@/stores/configStore"

export const onLanguage = () =>
	showPicker({
		// @ts-ignore
		onChange: (val) => useConfigState.setState({ lang: val }),
		values: [
			{
				key: "system",
				label: "System",
			},
			{
				key: "en",
				label: "English",
			},
			{
				key: "fa",
				label: "فارسی",
				subtitle: "Persian",
			},
		],
		selected: useConfigState.getState().lang,
	})
