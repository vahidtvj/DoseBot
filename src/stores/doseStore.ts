import { scheduleAlert } from "@/components/notification"
import { IDose, IDoseStatus, IMedicine } from "@/models"
import { data } from "@/models/mock/dose"
import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import notifee from "@notifee/react-native"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useMedicineStore } from "./medicineStore"

type IState = {
	data: IDose[]
	changeStatus: (id: string, status: IDoseStatus) => void
	delete: (medId: string) => void
	update: (med: IMedicine) => void
	clear: (idList: string[]) => void
	add: (list: IDose[]) => void
}

export const useDoseStore = create<IState>()(
	persist(
		(set, get) => ({
			data: __DEV__ ? data : [],
			changeStatus: (id, status) => {
				const state = get()
				if (status !== "pending") notifee.cancelNotification(id)

				const x = state.data.find((x) => x.id === id)
				const rest = state.data.filter((x) => x.id !== id)
				if (!x) return
				x.status = status
				set({ data: [...rest, x] })
				if (status === "confirm")
					useMedicineStore.getState().consumeDose(x.medId, x.amount)
			},
			delete: (medId) => {
				const data = get().data
				const oldDoses = data.filter((x) => x.medId === medId)
				const rest = data.filter((x) => x.medId !== medId)
				for (const dose of oldDoses) notifee.cancelNotification(dose.id)
				set({ data: rest })
			},
			update: (med) => {
				// TODO check if med is paused
				const data = get().data
				const oldDoses = data.filter((x) => x.medId === med.id)
				const rest = data.filter((x) => x.medId !== med.id)
				for (const dose of oldDoses) {
					dose.name = med.name
					dose.type = med.type
					// update notification
					if (dose.status === "pending") scheduleAlert(dose)
				}
				set({ data: [...rest, ...oldDoses] })
			},
			clear: (idList) => {
				const data = get().data
				const oldDoses = data.filter((x) => x.id in idList)
				const rest = data.filter((x) => !(x.id in idList))
				for (const dose of oldDoses) notifee.cancelNotification(dose.id)
				set({ data: rest })
			},
			add: (list) => {
				const data = get().data
				for (const dose of list) scheduleAlert(dose)
				set({ data: [...data, ...list] })
			},
		}),
		{
			name: "doseStore",
			storage: createSuperJSONStorage(() => zustandStorage),
			skipHydration: false,
		},
	),
)
