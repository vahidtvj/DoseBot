import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type IState = {
	lang: string
	colorScheme: "system" | "dark" | "light"
}
type Actions = {
	update: (state: Partial<IState>) => void
}

export const useConfigState = create<IState & Actions>()(
	subscribeWithSelector(
		persist(
			(set) => ({
				lang: "system",
				colorScheme: "system",
				update: (state) => set({ ...state }),
			}),
			{
				name: "configStore",
				storage: createSuperJSONStorage(() => zustandStorage),
			},
		),
	),
)
