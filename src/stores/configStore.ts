import type { Language } from "@/constants"
import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type IState = {
	lang: "system" | Language
	colorScheme: "system" | "dark" | "light"
	useMaterialYou: boolean
	sentryEnabled: boolean
}
type Actions = {
	update: (state: Partial<IState>) => void
	toggle: (param: BooleanKeys<IState>, value?: boolean) => void
	toggleColorScheme: () => void
}

export const useConfigState = create<IState & Actions>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				lang: "system",
				colorScheme: "system",
				useMaterialYou: true,
				sentryEnabled: false,
				update: (state) => set({ ...state }),
				toggle: (param, value) => {
					const oldValue = get()[param]
					set({ [param]: value ?? !oldValue })
				},
				toggleColorScheme: () => {
					const theme = get().colorScheme
					set({
						colorScheme:
							theme === "system"
								? "light"
								: theme === "light"
									? "dark"
									: "system",
					})
				},
			}),
			{
				name: "configStore",
				storage: createSuperJSONStorage(() => zustandStorage),
			},
		),
	),
)
