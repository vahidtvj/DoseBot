import type * as schema from "./schema"

type IMedicine = schema.IMedicine
type ISchedule = schema.ISchedule
type IDosing = schema.IDosing
type IDose = schema.IDose
export type IScheduleFull = ISchedule & { dosing: schema.IDosing[] }
export type IMedicineFull = IMedicine & { schedules: IScheduleFull[] }
export type IDoseFull = IDose & {
	medicine: Pick<IMedicine, "name" | "note" | "type"> | null
}

export type IMedicineCreate = WithOptional<IMedicine, "id">
export type IScheduleCreate = WithOptional<ISchedule, "id">
export type IDosingCreate = WithOptional<IDosing, "id">
export type IDoseCreate = WithOptional<IDose, "id">

export type IScheduleFullCreate = WithOptional<
	IScheduleCreate,
	"medicineId"
> & {
	dosing: WithOptional<IDosingCreate, "scheduleId">[]
}
