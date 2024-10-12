import { removeNotification } from "@/logic/notification"
import { and, asc, desc, eq, inArray, notInArray, sql } from "drizzle-orm"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import * as schema from "../schema"
import { db } from "./client"

export type IMedicine = schema.IMedicine
export type ISchedule = schema.ISchedule
export type IDosing = schema.IDosing
export type IScheduleFull = ISchedule & { dosing: schema.IDosing[] }
export type IMedicineFull = IMedicine & { schedules: IScheduleFull[] }
export type IDose = schema.IDose
export type IDoseFull = IDose & {
	medicine: Pick<IMedicine, "name" | "note" | "type">
}
// type MedCheck = {
// 	type:
// 		| "pill"
// 		| "injection"
// 		| "iv"
// 		| "drop"
// 		| "suppository"
// 		| "inhaler"
// 		| "syrup"
// 		| "spray"
// 		| "patch"
// 		| "generic"
// 	id: number
// 	name: string
// 	inventoryEnabled: boolean
// 	inventoryCount: number
// 	inventoryNotifyOn: number
// 	paused: boolean
// 	note: string | null
// 	removed: boolean | null
// }
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

// export const createMed = (data: Omit<schema.IMedicine, "id">) =>
// 	db.insert(schema.medicine).values(data).run()

// export const updateMed = async (
// 	id: number,
// 	data: Omit<schema.IMedicine, "id">,
// ) => {
// 	const pendingDoseIds = (
// 		await db.query.dose.findMany({
// 			where: and(
// 				eq(schema.dose.medicineId, id),
// 				eq(schema.dose.status, "pending"),
// 			),
// 		})
// 	).map((x) => x.id)
// 	if (pendingDoseIds.length > 0) {
// 		// TODO update notifs
// 	}
// 	db.update(schema.medicine).set(data).where(eq(schema.medicine.id, id)).run()
// }

export const deleteMed = async (id: number) => {
	const pendingDoseIds = (
		await db.query.dose.findMany({
			where: and(
				eq(schema.dose.medicineId, id),
				eq(schema.dose.status, "pending"),
			),
		})
	).map((x) => x.id)

	await db.transaction(async (tx) => {
		if (pendingDoseIds.length > 0) {
			removeNotification(pendingDoseIds)
			tx.delete(schema.dose).where(inArray(schema.dose.id, pendingDoseIds))
		}

		// check for existing doses already in user progress (besides the ones we just removed)
		if (
			(await tx.query.dose.findFirst({
				where: eq(schema.dose.medicineId, id),
			})) === undefined
		)
			// nothing found. just remove
			tx.delete(schema.medicine).where(eq(schema.medicine.id, id)).run()
		else {
			// set removed field so its not shown for user but it still shows up and can be queried in user history/progress
			tx.update(schema.medicine)
				.set({ removed: true })
				.where(eq(schema.medicine.id, id))
		}
	})
}

export const updateFullMed = async (data: {
	med: WithOptional<IMedicine, "id">
	schedules: (WithOptional<ISchedule, "medicineId" | "id"> & {
		dosing: WithOptional<IDosing, "scheduleId" | "id">[]
	})[]
}) => {
	let medId = data.med.id
	const create = !medId
	// const { med } = data
	if (medId) {
		// if its an update (medicine exists)
		// const oldData = await getMed(medId)
		// if (!oldData)
		// 	throw new Error(
		// 		`Could not find the specified database entry: medicine ${medId}`,
		// 	)
		// const { schedules: oldSchedules, ...oldMed } = oldData
		// if (oldMed.removed === true)
		// 	throw new Error(
		// 		`Can not update removed database entry: medicine ${medId}`,
		// 	)
		// const pendingDoseList = await db.query.dose.findMany({
		// 	where: and(
		// 		eq(schema.dose.medicineId, medId),
		// 		eq(schema.dose.status, "pending"),
		// 	),
		// })
		// if (pendingDoseList.length > 0 && oldSchedules.length > 0) {
		// 	// make a changed list
		// 	// TODO compare and make a changed schedule list
		// 	// if medicine table scheme has changed update the following then update MedCheck type definition
		// 	const MedTypeIsSame: Equal<typeof oldMed, MedCheck> = true
		// 	if (!MedTypeIsSame) throw new Error("non equal types")
		// 	if (med.paused === true) {
		// 		removeNotification(pendingDoseList.map((x) => x.id))
		// 	} else if (
		// 		oldMed.name !== med.name ||
		// 		oldMed.type !== med.type ||
		// 		oldMed.note !== med.note
		// 	) {
		// 		// TODO update all pending
		// 	}
		// 	// update the dose table and notifs for the changed schedules
		// 	// ! include this in transaction??
		// }
	}
	await db.transaction(async (tx) => {
		medId = (
			await tx
				.insert(schema.medicine)
				.values(data.med)
				.onConflictDoUpdate({ target: schema.medicine.id, set: data.med })
				.returning()
		)[0].id

		// const ids = data.schedules.map((x) => x.id).filter((x) => x !== undefined)
		// await db
		// 	.delete(schema.schedule)
		// 	.where(
		// 		and(
		// 			eq(schema.schedule.medicineId, medId),
		// 			notInArray(schema.schedule.id, ids),
		// 		),
		// 	)
		if (!create)
			await tx
				.delete(schema.schedule)
				.where(eq(schema.schedule.medicineId, medId))

		const scIds = await Promise.all(
			data.schedules.map(
				async (sc) =>
					(
						await tx
							.insert(schema.schedule)
							.values({ ...sc, medicineId: medId })
							// .onConflictDoUpdate({
							// 	target: schema.schedule.id,
							// 	set: { ...sc, medicineId: medId },
							// })
							.returning()
					)[0].id,
			),
		)

		await Promise.all(
			data.schedules.flatMap((sc, i) =>
				sc.dosing.map(
					async (x) =>
						await tx
							.insert(schema.dosing)
							.values({ ...x, scheduleId: scIds[i] }),
				),
			),
		)

		// for (let i = 0; i < data.schedules.length; i++) {
		// 	const sc = data.schedules[i];
		// 	for(const el of sc.dosing)
		// 	{

		// 	}
		// }

		// if (!medId)
		// 	medId = (await db.insert(schema.medicine).values(data.med).returning())[0]
		// 		.id
		// else {
		// 	await db.update(schema.medicine).set(data.med)

		// 	const ids = data.schedules.map((x) => x.id).filter((x) => x !== undefined)
		// 	await db
		// 		.delete(schema.schedule)
		// 		.where(
		// 			and(
		// 				eq(schema.schedule.medicineId, medId),
		// 				notInArray(schema.schedule.id, ids),
		// 			),
		// 		)

		// 	for (const sc of data.schedules)
		// 		if (sc.id)
		// 			await db
		// 				.update(schema.schedule)
		// 				.set(sc)
		// 				.where(eq(schema.schedule.id, sc.id))
		// }
		// const insertList = data.schedules
		// 	.filter((x) => x.id === undefined)
		// 	.map((x) => ({
		// 		...x,
		// 		medicineId: medId,
		// 	}))
		// const scheduleIds = (
		// 	await db.insert(schema.schedule).values(insertList).returning()
		// ).map((x) => x.id)

		// const dosingIds = (
		// 	await db
		// 		.insert(schema.dosing)
		// 		.values(
		// 			data.schedules.flatMap((x, i) =>
		// 				x.dosing.map((y) => ({ ...y, scheduleId: scheduleIds[i] })),
		// 			),
		// 		)
		// 		.returning()
		// ).map((x) => x.id)

		if (!create) {
			const pendingDoseList = (
				await tx.query.dose.findMany({
					where: and(
						eq(schema.dose.medicineId, medId),
						eq(schema.dose.status, "pending"),
					),
				})
			).map((x) => x.id)
			await removeNotification(pendingDoseList)
			await tx
				.delete(schema.dose)
				.where(inArray(schema.dose.id, pendingDoseList))
		}
		// todo create doses and scheduleAlerts
	})
}
// export const insertMed = db.insert(schema.medicine).values().prepare()
// const a = getAllMeds.execute()

export const getDoseFull = (id: number) =>
	db.query.dose.findFirst({
		where: eq(schema.dose.id, id),
		with: { medicine: { columns: { name: true, note: true, type: true } } },
	})
export const getDoseListFull = (idList: number[]) =>
	db.query.dose.findMany({
		where: inArray(schema.dose.id, idList),
		with: { medicine: { columns: { name: true, note: true, type: true } } },
	})

export const changeDoseStatus = async (
	id: number,
	status: "skip" | "confirm",
) => {
	const data = await db.query.dose.findFirst({
		where: eq(schema.dose.id, id),
	})

	let updateCountBy = 0
	let newCount = -1
	if (!data || data.status === status) return

	if (data.status !== "confirm" && status === "confirm") updateCountBy = -1
	else if (data.status === "confirm" && status !== "confirm") updateCountBy = 1

	if (data.medicineId && updateCountBy !== 0) {
		const med = await getMed(data.medicineId)
		if (med?.inventoryEnabled) newCount = med.inventoryCount + updateCountBy
	}

	await removeNotification(id)
	await db.transaction(async (tx) => {
		await tx
			.update(schema.dose)
			.set({ status: status })
			.where(eq(schema.dose.id, id))
		if (data.medicineId && newCount >= 0)
			await tx
				.update(schema.medicine)
				.set({ inventoryCount: newCount })
				.where(eq(schema.medicine.id, data.medicineId))
	})
}
