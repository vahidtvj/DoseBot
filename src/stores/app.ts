import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type IState = {
	firstLaunch: boolean
	doseStoreDay: Date | null
	inventoryAlertDay: Date | null
}

export const useAppState = create<IState>()(
	subscribeWithSelector(
		persist(
			(_set) => ({
				firstLaunch: true,
				doseStoreDay: null,
				inventoryAlertDay: null,
			}),
			{
				name: "appStore",
				storage: createSuperJSONStorage(() => zustandStorage),
			},
		),
	),
)
