import i18next from "i18next"
import "intl-pluralrules"
import { initReactI18next } from "react-i18next"

import { useUIStore } from "@/stores/uiStore"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import { resources } from "./resources"

i18next.use(initReactI18next).init({
	lng: useUIStore.getState().lang, // if you're using a language detector, do not define the lng option
	resources,
	fallbackLng: "en",
	// if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
	// set returnNull to false (and also in the i18next.d.ts options)
	// returnNull: false,
})
z.setErrorMap(makeZodI18nMap({ ns: ["zod", "custom"] }))

useUIStore.subscribe(
	(state) => state.lang,
	(lang) => i18next.changeLanguage(lang),
)

export { i18next as i18n }
