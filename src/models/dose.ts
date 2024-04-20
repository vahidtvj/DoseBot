import { IMedicineType } from "./medicine"

export type IDoseStatus = "pending" | "skip" | "confirm"

export type IDose = {
	id: string
	medId: string
	name: string
	type: IMedicineType
	time: Date
	amount: number
	status: IDoseStatus
	note?: string
	// priority: "Low" | "Normal" | "High"
	// repeatInterval?: number
}
export type DoseType = "Daily" | "EveryXdays" | "Weekly"
