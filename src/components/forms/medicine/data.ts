import {
	FormMedicineSchema,
	type IMedicineCreate,
	type IScheduleFullCreate,
} from "@/db"
import type { z } from "zod"

export type Props = {
	data?: IMedicineCreate
	schedules?: (IScheduleFullCreate & { _id: string })[]
} & {
	onSubmit: (data: Omit<IMedicineCreate, "id">) => void
	scheduleActions: {
		open: (medData: IMedicineCreate, id?: number) => void
	}
}

export const schema = FormMedicineSchema

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	name: "",
	inventoryCount: 0,
	inventoryEnabled: false,
	inventoryNotifyOn: 0,
	paused: false,
	type: "pill",
	note: "",
	removed: false,
}
