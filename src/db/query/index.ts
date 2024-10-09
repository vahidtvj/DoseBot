import * as schema from "../schema"
import { db } from "./client"
import { desc, asc, eq, sql } from "drizzle-orm"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"

export type IMedicine = schema.IMedicine
export type ISchedule = schema.ISchedule
export type IDosing = schema.IDosing
export type IScheduleFull = ISchedule & { dosing: schema.IDosing[] }
export type IMedicineFull = IMedicine & { schedules: IScheduleFull[] }
export const getAllMeds = db.query.medicine.findMany({
	with: {
		schedules: {
			with: { dosing: true },
			orderBy: [asc(schema.schedule.startDate)],
		},
	},
	orderBy: [asc(schema.medicine.name)],
})

export const getMed = (id: number) =>
	db.query.medicine.findFirst({
		with: { schedules: { with: { dosing: true } } },
		where: eq(schema.medicine.id, id),
		orderBy: [asc(schema.medicine.name)],
	})

export const getSchedules = (medId: number) =>
	db.query.schedule.findMany({
		where: eq(schema.schedule.medicineId, medId),
		orderBy: [asc(schema.schedule.startDate)],
		with: { dosing: true },
	})

export const getSchedule = (id: number) =>
	db.query.schedule.findFirst({
		where: eq(schema.schedule.id, id),
		with: { dosing: true },
	})

export const getDosings = (scheduleId: number) =>
	db.query.dosing.findMany({
		where: eq(schema.dosing.scheduleId, scheduleId),
	})

export const createMed = (data: Omit<schema.IMedicine, "id">) =>
	db.insert(schema.medicine).values(data).run()

export const updateMed = (id: number, data: Omit<schema.IMedicine, "id">) =>
	db.update(schema.medicine).set(data).where(eq(schema.medicine.id, id)).run()

export const deleteMed = db
	.delete(schema.medicine)
	.where(eq(schema.medicine.id, sql.placeholder("id")))
	.prepare()

export const updateFullMedTransaction = (
	med: WithOptional<IMedicine, "id">,
	schedules: ISchedule[],
	dosing: IDosing[],
) => {
	const medId = med.id
	db.transaction(async (tx) => {
		const medId = med.id
		if (medId) {
			// update
			db.query.medicine
		}
	})
}
// export const insertMed = db.insert(schema.medicine).values().prepare()
// const a = getAllMeds.execute()
