import type { IMedicine, IMedicineFull, ISchedule } from "@/db/query"
import { MedicineSchema } from "@/models"
import type { z } from "zod"

export type Props = {
	data?: IMedicine
	schedules?: ISchedule[]
} & {
	onSubmit: (data: Omit<IMedicine, "id">) => void
	scheduleActions: {
		open: (id?: number) => void
		onSubmit: (data: ISchedule) => void
		onDelete: (id: number) => void
	}
}

export const schema = MedicineSchema

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	name: "",
	inventoryCount: 0,
	inventoryEnabled: false,
	inventoryNotifyOn: 0,
	paused: false,
	type: "pill",
	note: "",
}
