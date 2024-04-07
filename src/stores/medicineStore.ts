import { showInventoryAlert } from "@/components/notification"
import { getDosage } from "@/logic/getDosage"
import { IMedicine } from "@/models"
import { data as defaultData } from "@/models/mock/medicine"
import { createSuperJSONStorage, zustandStorage } from "@/utils/mmkvStorage"
import { isEqual } from "lodash"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useDoseStore } from "./doseStore"

type IState = {
	data: IMedicine[]
	create: (med: IMedicine) => void
	update: (med: IMedicine) => void
	delete: (id: string) => void
	consumeDose: (id: string, amount: number) => void
}

export const useMedicineStore = create<IState>()(
	persist(
		(set, get) => ({
			data: __DEV__ ? defaultData : [],
			create: (med) => {
				set({ data: [...get().data, med] })
				// * generate dose starting from today
				const list = getDosage([med])
				useDoseStore.getState().add(list)
			},
			update: (med) => {
				const data = get().data
				const oldMed = data.find((x) => x.id === med.id)
				const rest = data.filter((x) => x.id !== med.id)
				set({ data: [...rest, med] })
				const doseStore = useDoseStore.getState()
				if (!isEqual(oldMed?.schedule, med.schedule)) {
					doseStore.delete(med.id)
					// * generate dose starting from today
					const list = getDosage([med])
					doseStore.add(list)
				} else {
					// * update current doses
					doseStore.update(med)
				}
			},
			delete: (id) => {
				useDoseStore.getState().delete(id) // * remove all doses with this id
				set({ data: get().data.filter((x) => x.id !== id) })
			},
			consumeDose: (id, amount) => {
				const data = get().data
				const med = data.find((x) => x.id === id)
				if (!med || !med.inventory.enabled) return
				const rest = data.filter((x) => x.id !== id)
				med.inventory.count -= amount
				if (med.inventory.count <= med.inventory.notifyOn)
					showInventoryAlert(med)
				set({ data: [...rest, med] })
			},
		}),
		{
			skipHydration: __DEV__,
			name: "medicineStore",
			storage: createSuperJSONStorage(() => zustandStorage),
		},
	),
)
