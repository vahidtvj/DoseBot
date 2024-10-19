import { addDoseOnCreate } from "@/logic/dose"
import { removeNotification, updateNotifications } from "@/logic/notification"
import { and, asc, eq, inArray, sql } from "drizzle-orm"
import * as schema from "../schema"
import type { IDoseCreate } from "../types"
import { db } from "./client"
type IMedicine = schema.IMedicine
type ISchedule = schema.ISchedule
type IDosing = schema.IDosing

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAllMeds = db.query.medicine.findMany({
	where: eq(schema.medicine.removed, false),
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
		where: eq(schema.medicine.id, id),
		with: {
			schedules: {
				with: { dosing: true },
				orderBy: [asc(schema.schedule.startDate)],
			},
		},
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
			await tx
				.delete(schema.dose)
				.where(inArray(schema.dose.id, pendingDoseIds))
		}

		// check for existing doses already in user progress (besides the ones we just removed)
		if (
			(await tx.query.dose.findFirst({
				where: eq(schema.dose.medicineId, id),
			})) === undefined
		)
			// nothing found. just remove
			await tx.delete(schema.medicine).where(eq(schema.medicine.id, id)).run()
		else {
			// set removed field so its not shown for user but it still shows up and can be queried in user history/progress
			await tx
				.update(schema.medicine)
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

	await db.transaction(async (tx) => {
		medId = (
			await tx
				.insert(schema.medicine)
				.values(data.med)
				.onConflictDoUpdate({ target: schema.medicine.id, set: data.med })
				.returning()
		)[0].id

		if (!create) {
			const ids = (
				await tx
					.delete(schema.schedule)
					.where(eq(schema.schedule.medicineId, medId))
					.returning()
			).map((x) => x.id)
			if (ids.length > 0)
				await tx
					.delete(schema.dosing)
					.where(inArray(schema.dosing.scheduleId, ids))
		}

		const scIds = await Promise.all(
			data.schedules.map(async (sc) => {
				const { dosing, ...rest } = sc
				return (
					await tx
						.insert(schema.schedule)
						.values({ ...rest, medicineId: medId, id: undefined })
						.returning()
				)[0].id
			}),
		)

		const dosingIds = await Promise.all(
			data.schedules.flatMap((sc, i) =>
				sc.dosing.map(
					async (x) =>
						(
							await tx
								.insert(schema.dosing)
								.values({ ...x, scheduleId: scIds[i], id: undefined })
								.returning()
						)[0].id,
				),
			),
		)
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
	})
	addDoseOnCreate(medId)
}

export const getDoseFull = async (id: number) =>
	await db.query.dose.findFirst({
		where: eq(schema.dose.id, id),
		with: { medicine: { columns: { name: true, note: true, type: true } } },
	})
export const getDoseListFull = async (idList: number[]) =>
	await db.query.dose.findMany({
		where: inArray(schema.dose.id, idList),
		with: { medicine: { columns: { name: true, note: true, type: true } } },
	})
export const getPendingDoseListFull = db.query.dose.findMany({
	where: eq(schema.dose.status, "pending"),
	orderBy: asc(schema.dose.time),
	with: { medicine: { columns: { name: true, note: true, type: true } } },
})

export const clearPendingDoses = async (idList: number[]) =>
	await db
		.update(schema.dose)
		.set({ status: "skip" })
		.where(inArray(schema.dose.id, idList))

export const insertDoses = async (data: IDoseCreate[]) => {
	const doseIds = await (
		await db.insert(schema.dose).values(data).returning()
	).map((x) => x.id)
	const doses = await getDoseListFull(doseIds)
	await updateNotifications(doses)
}

export const changeDoseStatus = async (
	id: number,
	status: "skip" | "confirm" | "pending",
) => {
	const data = await db.query.dose.findFirst({
		where: eq(schema.dose.id, id),
	})

	let updateCountBy = 0
	if (!data || data.status === status) return

	if (data.status !== "confirm" && status === "confirm") updateCountBy = -1
	else if (data.status === "confirm" && status !== "confirm") updateCountBy = 1

	await removeNotification(id)
	await db.transaction(async (tx) => {
		await tx
			.update(schema.dose)
			.set({ status: status })
			.where(eq(schema.dose.id, id))
		if (data.medicineId && updateCountBy !== 0)
			await tx
				.update(schema.medicine)
				.set({
					inventoryCount: sql`${schema.medicine.inventoryCount} + ${updateCountBy}`,
				})
				.where(eq(schema.medicine.id, data.medicineId))
	})
}
