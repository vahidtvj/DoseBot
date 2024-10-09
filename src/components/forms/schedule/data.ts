import type { IDosing, ISchedule } from "@/db/query"
import { ScheduleSchema } from "@/models"
import type { z } from "zod"

export type Props = {
	data?: ISchedule
	dosing?: IDosing[]
} & {
	onSubmit: (data: Omit<ISchedule, "id" | "medicineId">) => void
}

export const schema = ScheduleSchema

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	type: "Daily",
	startDate: new Date(),
	// endDate: new Date(),
}
