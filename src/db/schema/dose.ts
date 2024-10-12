import { relations } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { medicine } from "./medicine"

export const dose = sqliteTable("dose", {
	id: integer("id").primaryKey(),
	medicineId: integer("medicine_id").references(() => medicine.id),
	time: integer("time", { mode: "timestamp" }).notNull(),
	amount: integer("amount", {
		mode: "number",
	}).notNull(),
	status: text("status", {
		enum: ["pending", "skip", "confirm"],
	}).notNull(),
})

export const doseRelations = relations(dose, ({ one }) => ({
	medicine: one(medicine, {
		fields: [dose.medicineId],
		references: [medicine.id],
	}),
}))

export type IDose = typeof dose.$inferSelect
