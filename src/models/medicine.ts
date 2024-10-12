import * as schema from "@/db/schema"
import { zExtras } from "@/utils"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
export const MedTypeList: IMedicineType[] = [
	"pill",
	"injection",
	"iv",
	"drop",
	"suppository",
	"inhaler",
	"syrup",
	"spray",
	"patch",
	"generic",
]

export const MedIconMap: { [key in IMedicineType]: string } = {
	pill: "pill",
	injection: "needle",
	iv: "iv-bag",
	drop: "eyedropper",
	suppository: "$suppository",
	inhaler: "$inhaler",
	syrup: "$syrup-bottle",
	spray: "spray",
	patch: "bandage",
	generic: "medical-bag",
}

export const MedicineTypeSchema = z.union([
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
export type IMedicineType = z.infer<typeof MedicineTypeSchema>

export const MedicineSchema = createSelectSchema(schema.medicine).omit({
	id: true,
})
export const ScheduleSchema = createInsertSchema(schema.schedule).omit({
	id: true,
	medicineId: true,
})

// export const MedicineSchema = z.object({
// 	name: z.string().min(1),
// 	inventory: z.object({
// 		enabled: z.boolean(),
// 		count: z.coerce.number(),
// 		notifyOn: z.coerce.number(),
// 	}),
// 	notification: z.object({
// 		enabled: z.boolean(),
// 	}),
// 	type: MedicineTypeSchema,
// 	paused: z.boolean(),
// 	schedule: z.array(ScheduleSchema).optional(),
// 	note: zExtras.StringOrUndefined,
// })
