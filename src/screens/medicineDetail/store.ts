import {
	type IMedicineCreate,
	type IScheduleFullCreate,
	getMed,
	getSchedules,
} from "@/db"
import { randomUUID } from "expo-crypto"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

type IState = {
	schedules?: (IScheduleFullCreate & { _id: string })[]
	medicine?: IMedicineCreate
}
type Actions = {
	getData: (id?: number) => Promise<void>
	setSchedule: (data: IScheduleFullCreate, key?: string) => void
	setMed: (data: IMedicineCreate) => void
	removeSchedule: (key: string) => void
}

export const useMedicineFormState = create<IState & Actions>()(
	subscribeWithSelector((set, get) => ({
		schedules: undefined,
		medicine: undefined,
		getData: async (id) => {
			const med = id !== undefined ? await getMed(id) : undefined
			const schedules =
				id !== undefined && med !== undefined ? await getSchedules(id) : []
			set({
				medicine: med,
				schedules: schedules.map((x) => ({ ...x, _id: randomUUID() })),
			})
		},
		setSchedule: (data, key) => {
			const schedules = get().schedules || []
			if (!key) {
				schedules.push({ ...data, _id: randomUUID() })
			} else {
				const i = schedules.findIndex((x) => x._id === key)
				schedules[i] = { ...data, _id: key }
			}
			set({ schedules: schedules })
		},
		removeSchedule: (key) => {
			const { schedules } = get()
			if (!schedules) return
			set({
				schedules: schedules.filter((x) => x._id !== key),
			})
		},
		setMed: (data) => {
			set({ medicine: data })
		},
	})),
)
