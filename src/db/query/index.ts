import { removeNotification, updateNotifications } from "@/logic/notification"
import { addDoseOnCreate } from "@/logic/onCreate"
import {
	and,
	asc,
	between,
	count,
	desc,
	eq,
	gte,
	inArray,
	lte,
	ne,
	sql,
} from "drizzle-orm"
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

		const _dosingIds = await Promise.all(
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
	if (!medId) return
	const med = await getMed(medId)
	if (!med) return
	const doses = addDoseOnCreate(med)
	if (doses.length === 0) return
	insertDoses(doses)
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

type getDoseHistoryProps = {
	start: Date
	end: Date
	medId?: number
}
export const getDoseHistory = ({ start, end, medId }: getDoseHistoryProps) =>
	db.query.dose.findMany({
		orderBy: asc(schema.dose.time),
		where: and(
			gte(schema.dose.time, start),
			lte(schema.dose.time, end),
			...(medId !== undefined ? [eq(schema.dose.medicineId, medId)] : []),
		),
	})

export const getDoseHistoryFull = ({ start, end }: getDoseHistoryProps) =>
	db.query.dose.findMany({
		orderBy: asc(schema.dose.time),
		where: and(gte(schema.dose.time, start), lte(schema.dose.time, end)),
		with: { medicine: true },
	})

export const getDoseDateRange = async () => {
	const start = (
		await db.query.dose.findFirst({
			orderBy: asc(schema.dose.time),
			columns: { time: true },
		})
	)?.time
	const end = (
		await db.query.dose.findFirst({
			orderBy: desc(schema.dose.time),
			columns: { time: true },
		})
	)?.time
	return { start, end }
}

type getDoseSummeryProps<T extends string = string> = {
	dateRanges: Record<
		T,
		{
			start: Date | null
			end: Date | null
		}
	>
}
export const getDoseSummery = async <T extends string = string>(
	props: getDoseSummeryProps<T>,
) => {
	const { dateRanges } = props

	const medIds = (
		await db.query.medicine.findMany({ columns: { id: true } })
	).map((x) => x.id)

	const results = await Promise.all(
		medIds.map(async (medId) => {
			const data = await Promise.all(
				Object.entries(dateRanges).map(async ([rangeKey, range]) => {
					const { start, end } = range as {
						start: Date | null
						end: Date | null
					}

					const [confirmed, total] = await Promise.all([
						db
							.select({ count: count() })
							.from(schema.dose)
							.where(
								and(
									eq(schema.dose.medicineId, medId),
									eq(schema.dose.status, "confirm"),
									...(start && end
										? [between(schema.dose.time, start, end)]
										: []),
								),
							)
							.then((res) => res[0]?.count || 0),

						db
							.select({ count: count() })
							.from(schema.dose)
							.where(
								and(
									eq(schema.dose.medicineId, medId),
									...(start && end
										? [between(schema.dose.time, start, end)]
										: []),
								),
							)
							.then((res) => res[0]?.count || 0),
					])

					return { range: rangeKey as T, confirmed, total }
				}),
			)

			return { medId, data }
		}),
	)

	return results
}

export const clearPendingDoses = async (idList: number[]) =>
	await db
		.update(schema.dose)
		.set({ status: "skip" })
		.where(inArray(schema.dose.id, idList))

export const insertDoses = async (data: IDoseCreate[]) => {
	if (data.length === 0) return
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
					inventoryCount: sql`
      CASE 
        WHEN ${schema.medicine.inventoryCount} + ${updateCountBy} < 0 THEN 0 
        ELSE ${schema.medicine.inventoryCount} + ${updateCountBy} 
      END
    `,
				})
				.where(eq(schema.medicine.id, data.medicineId))
	})
}
