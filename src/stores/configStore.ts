import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type IState = {
	lang: "system" | "en" | "fa"
	colorScheme: "system" | "dark" | "light"
	useMaterialYou: boolean
}
type Actions = {
	update: (state: Partial<IState>) => void
	toggle: (param: BooleanKeys<IState>) => void
	toggleColorScheme: () => void
}

export const useConfigState = create<IState & Actions>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				lang: "system",
				colorScheme: "system",
				useMaterialYou: true,
				update: (state) => set({ ...state }),
				toggle: (param) => {
					const oldValue = get()[param]
					set({ [param]: !oldValue })
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
