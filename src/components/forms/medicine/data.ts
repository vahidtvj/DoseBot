import { schema as scheduleSchema } from "@/components/forms/schedule/data"
import { IMedicine, MedicineTypeSchema, Schedule } from "@/models"
import { z } from "zod"

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

// export type Inputs = Omit<IMedicine, "id">

// export const defaultValues: Inputs = {
// 	name: "",
// 	notification: {
// 		enabled: true,
// 	},
// 	inventory: {
// 		count: 0,
// 		enabled: false,
// 		notifyOn: 0,
// 	},
// 	type: "pill",
// 	paused: false,
// 	schedule: undefined,
// }

export const schema = z.object({
	name: z.string().min(1),
	inventory: z.object({
		enabled: z.boolean(),
		count: z.coerce.number(),
		notifyOn: z.coerce.number(),
	}),
	notification: z.object({
		enabled: z.boolean(),
	}),
	type: MedicineTypeSchema,
	paused: z.boolean(),
	schedule: z.array(scheduleSchema).optional(),
})

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
}
