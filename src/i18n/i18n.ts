import i18next from "i18next"
import "intl-pluralrules"
import { initReactI18next } from "react-i18next"
import en from "./en/translation"
import fa from "./fa/translations"

import { useUIStore } from "@/stores/uiStore"

i18next.use(initReactI18next).init({
	lng: useUIStore.getState().lang, // if you're using a language detector, do not define the lng option
	resources: {
		en: {
			translation: en,
		},
		fa: { translation: fa },
	},
	fallbackLng: "en",
	// if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
	// set returnNull to false (and also in the i18next.d.ts options)
	// returnNull: false,
})

useUIStore.subscribe(
	(state) => state.lang,
	(lang) => i18next.changeLanguage(lang),
)

export { i18next as i18n }
