import { Schedule } from "@/models"
import { z } from "zod"

export type Props = (
	| {
			edit: boolean
			data: Schedule
	  }
	| { data: undefined }
) & {
	onSubmit?: (data: Schedule) => void
}

// TODO min 1
// TODO screen wide validation errors
const dosing = z.array(
	z.object({ time: z.date(), amount: z.coerce.number().positive() }),
)

export const schema = z.union([
	z.object({
		type: z.literal("Daily"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing,
	}),
	z.object({
		type: z.literal("EveryXdays"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing,
		interval: z.coerce
			.number()
			.min(2)
			.refine((val) => val % 1 === 0, { message: "Not an Integer" }),
	}),
	z.object({
		type: z.literal("Weekly"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing,
		days: z
			.array(
				z.union([
					z.literal("Sat"),
					z.literal("Sun"),
					z.literal("Mon"),
					z.literal("Tue"),
					z.literal("Wed"),
					z.literal("Thu"),
					z.literal("Fri"),
				]),
			)
			.min(1)
			.max(6),
	}),
])

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	type: "Daily",
	startDate: new Date(),
	// endDate: new Date(),
	dosing: [],
}
