import { Schedule, ScheduleSchema } from "@/models"

export type Props = (
	| {
			edit: boolean
			data: Schedule
	  }
	| { data: undefined }
) & {
	onSubmit?: (data: Schedule) => void
}

export const schema = ScheduleSchema

export type Inputs = Schedule

export const defaultValues: Inputs = {
	type: "Daily",
	startDate: new Date(),
	// endDate: new Date(),
	dosing: [],
}
