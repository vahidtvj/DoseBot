import type { Weekday } from "@/constants"
import { relations } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const medicine = sqliteTable("medicine", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	inventoryEnabled: integer("inventory_enabled", {
		mode: "boolean",
	}).notNull(),
	inventoryCount: integer("inventory_count", {
		mode: "number",
	}).notNull(),
	inventoryNotifyOn: integer("inventory_notifyOn", {
		mode: "number",
	}).notNull(),
	type: text("type", {
		enum: [
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
		],
	}).notNull(),
	paused: integer("paused", { mode: "boolean" }).notNull(),
	note: text("note"),
	removed: integer("removed", { mode: "boolean" }).default(false),
})

export type IMedicine = typeof medicine.$inferSelect

export const medicineRelations = relations(medicine, ({ many }) => ({
	schedules: many(schedule),
}))

export const schedule = sqliteTable("schedule", {
	id: integer("id").primaryKey(),
	medicineId: integer("medicine_id").references(() => medicine.id, {
		onDelete: "cascade",
	}),
	type: text("type", {
		enum: ["Daily", "EveryXdays", "Weekly"],
	}).notNull(),
	startDate: integer("startDate", { mode: "timestamp" }).notNull(),
	endDate: integer("endDate", { mode: "timestamp" }),
	days: text("days", {
		mode: "json",
	}).$type<Weekday[]>(),
	interval: integer("interval", { mode: "number" }),
})

export type ISchedule = typeof schedule.$inferSelect

export const scheduleRelations = relations(schedule, ({ one, many }) => ({
	medicine: one(medicine, {
		fields: [schedule.medicineId],
		references: [medicine.id],
	}),
	dosing: many(dosing),
}))

export const dosing = sqliteTable("dosing", {
	id: integer("id").primaryKey(),
	scheduleId: integer("schedule_id").references(() => schedule.id, {
		onDelete: "cascade",
	}),
	time: integer("time", { mode: "timestamp" }).notNull(),
	amount: integer("amount", { mode: "number" }).notNull(),
})

export type IDosing = typeof dosing.$inferSelect

export const dosingRelations = relations(dosing, ({ one }) => ({
	medicine: one(schedule, {
		fields: [dosing.scheduleId],
		references: [schedule.id],
	}),
}))
