import { z } from "zod"
import { Weekday } from "."
export type IMedicineType = "pill" | "capsule" | "injection"
export type IDoseStatus = "pending" | "skip" | "confirm"

export const MedicineTypeSchema = z.union([
	z.literal("pill"),
	z.literal("capsule"),
	z.literal("injection"),
])

export type IDose = {
	id: string
	medId: string
	name: string
	type: IMedicineType
	time: Date
	amount: number
	status: IDoseStatus
	// priority: "Low" | "Normal" | "High"
	// repeatInterval?: number
}

export type IMedicine = {
	id: string
	name: string
	type: IMedicineType
	notification: {
		enabled: boolean
		// priority: "Low" | "Normal" | "High"
		// repeatInterval?: number
	}
	inventory: {
		count: number
		notifyOn: number
		enabled: boolean
	}
	paused: boolean
	schedule?: Schedule[]
}
export type DoseType = "Daily" | "EveryXdays" | "Weekly"
export type Schedule = Daily | EveryXdays | Weekly
export type Dosing = {
	time: Date // Time only
	amount: number
}

type Daily = {
	startDate: Date
	endDate?: Date
	dosing: Dosing[]
	type: "Daily"
}

type EveryXdays = {
	startDate: Date
	endDate?: Date
	interval: number
	dosing: Dosing[]
	type: "EveryXdays"
}

type Weekly = {
	startDate: Date
	endDate?: Date
	dosing: Dosing[]
	days: Weekday[]
	type: "Weekly"
}
