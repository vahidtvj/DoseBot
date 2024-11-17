import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type Run = {
	time: Date
	type: "Service" | "AppLaunch"
}

type IState = {
	enabled: boolean
	backgroundRuns: Run[]
	setEnabled: (enabled: boolean) => void
	push: (data: Run) => void
}

export const useDebugStore = create<IState>()(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				enabled: false,
				backgroundRuns: [],
				setEnabled: (enabled) => {
					set({ enabled, backgroundRuns: [] })
				},
				push: (data) => {
					const state = get()
					if (!state.enabled) return
					const list = state.backgroundRuns
					set({ backgroundRuns: [...list, data] })
				},
			}),
			{
				name: "debugStore",
				storage: createSuperJSONStorage(() => zustandStorage),
			},
		),
	),
)
