import * as schema from "../schema"
import { db } from "./client"
import { desc, asc, eq } from "drizzle-orm"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"

export type IScheduleFull = schema.ISchedule & { dosing: schema.IDosing[] }
export type IMedicineFull = schema.IMedicine & { schedules: IScheduleFull[] }
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
	db.query.medicine.findMany({
		with: { schedules: { with: { dosing: true } } },
		where: eq(schema.medicine.id, id),
		orderBy: [asc(schema.medicine.name)],
	})
// export const insertMed = db.insert(schema.medicine).values().prepare()
// const a = getAllMeds.execute()
