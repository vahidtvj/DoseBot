import type { IMedicineType, Weekday } from "@/constants/index"
import { zExtras } from "@/utils"
import { z } from "zod"
import type { IMedicineCreate, IScheduleFullCreate } from "./types"

export const MedicineTypeSchema: z.ZodType<IMedicineType> = z.union([
	z.literal("pill"),
	z.literal("injection"),
	z.literal("iv"),
	z.literal("drop"),
	z.literal("suppository"),
	z.literal("inhaler"),
	z.literal("syrup"),
	z.literal("spray"),
	z.literal("patch"),
	z.literal("generic"),
])

export const WeekdaySchema: z.ZodType<Weekday> = z.union([
	z.literal("Sat"),
	z.literal("Sun"),
	z.literal("Mon"),
	z.literal("Tue"),
	z.literal("Wed"),
	z.literal("Thu"),
	z.literal("Fri"),
])

export const FormMedicineSchema: z.ZodType<IMedicineCreate> = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	inventoryEnabled: z.boolean(),
	inventoryCount: zExtras.EmptyStingToUdefined(z.coerce.number().nonnegative()),
	inventoryNotifyOn: zExtras.EmptyStingToUdefined(
		z.coerce.number().nonnegative(),
	),
	type: MedicineTypeSchema,
	paused: z.boolean(),
	note: z.string().nullable(),
	removed: z.boolean().nullable(),
})

const baseSchedule = z.object({
	id: z.number().optional(),
	medicineId: z.number().optional(),
	startDate: z.date(),
	endDate: z.date().nullable(),
	dosing: z.array(
		z.object({
			id: z.number().optional(),
			scheduleId: z.number().optional(),
			time: z.date(),
			amount: z.coerce.number().positive(),
		}),
	),
})
export const FormScheduleSchema: z.ZodType<IScheduleFullCreate> = z.union([
	baseSchedule.extend({
		type: z.literal("Daily"),
		interval: z.preprocess(() => null, z.null()) as z.ZodType<null>,
		days: z.preprocess(() => null, z.null()) as z.ZodType<null>,
	}),
	baseSchedule.extend({
		type: z.literal("EveryXdays"),
		interval: z.coerce
			.number()
			.min(2)
			.refine((val) => val % 1 === 0, { params: { i18n: "no_decimal" } }),
		days: z.preprocess(() => null, z.null()) as z.ZodType<null>,
	}),
	baseSchedule.extend({
		type: z.literal("Weekly"),
		interval: z.preprocess(() => null, z.null()) as z.ZodType<null>,
		days: z.array(WeekdaySchema).min(1).max(6),
	}),
])
