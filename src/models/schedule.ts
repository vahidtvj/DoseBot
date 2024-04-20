import { z } from "zod"

// TODO min 1
// TODO screen wide validation errors
const DosingSchema = z.object({
	time: z.date(),
	amount: z.coerce.number().positive(),
})

export type Dosing = z.infer<typeof DosingSchema>

export const ScheduleSchema = z.union([
	z.object({
		type: z.literal("Daily"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing: z.array(DosingSchema),
	}),
	z.object({
		type: z.literal("EveryXdays"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing: z.array(DosingSchema),
		interval: z.coerce
			.number()
			.min(2)
			.refine((val) => val % 1 === 0, { message: "Not an Integer" }),
	}),
	z.object({
		type: z.literal("Weekly"),
		startDate: z.date(),
		endDate: z.date().optional(),
		dosing: z.array(DosingSchema),
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

export type Schedule = z.infer<typeof ScheduleSchema>
