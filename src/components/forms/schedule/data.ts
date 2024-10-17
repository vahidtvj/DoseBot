import { FormScheduleSchema, type IScheduleFullCreate } from "@/db"
import type { z } from "zod"

export type Props = {
	data?: IScheduleFullCreate
} & {
	onSubmit: (data: IScheduleFullCreate) => void
}

export const schema = FormScheduleSchema

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	days: null,
	type: "Daily",
	interval: null,
	startDate: new Date(),
	endDate: null,
	dosing: [],
}
