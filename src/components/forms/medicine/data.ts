import { type IMedicine, MedicineSchema, type Schedule } from "@/models"
import type { z } from "zod"

export type Props = (
	| {
			edit: boolean
			data: IMedicine
	  }
	| { data: undefined }
) & {
	onSubmit?: (data: IMedicine) => void
	openSchedule?: (
		schedule?: Schedule,
		onSubmit?: (data: Schedule) => void,
		onDelete?: () => void,
	) => void
}

export const schema = MedicineSchema

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	name: "",
	inventory: {
		count: 0,
		notifyOn: 0,
		enabled: false,
	},
	notification: {
		enabled: true,
	},
	paused: false,
	type: "pill",
	note: "",
}
