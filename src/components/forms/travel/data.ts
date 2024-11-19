import type { IMedicineFull } from "@/db"
import { travelCalculator } from "@/logic/travelCalculator"
import { isBefore } from "date-fns"
import { z } from "zod"

export type Props = {
	meds: IMedicineFull[]
}

export const schema = z
	.object({
		start: z.coerce.date(),
		end: z.coerce.date(),
		selectedMeds: z.array(z.boolean()),
	})
	.refine((data) => !isBefore(data.end, data.start), {
		params: { i18n: "endBeforeStartDate" },
		path: ["end"],
	})
	.refine((data) => data.selectedMeds.some((x) => x === true))

export type Inputs = z.infer<typeof schema>

export const defaultValues: Inputs = {
	start: new Date(),
	end: new Date(),
	selectedMeds: [],
}

export function calculateTravel(props: {
	meds: IMedicineFull[]
	selectedMeds: boolean[]
	start: Date
	end: Date
}) {
	const counts = travelCalculator(props)
	return counts
}
