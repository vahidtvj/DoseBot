import { z } from "zod"
import { Weekday } from "."

export type IDoseStatus = "pending" | "skip" | "confirm"

export const MedTypeList: IMedicineType[] = [
	"pill",
	"injection",
	"iv",
	"drop",
	"suppository",
	"inhaler",
	"syrup",
	"spray",
	"patch",
	"generic",
]

export const MedIconMap: { [key in IMedicineType]: string } = {
	pill: "pill",
	injection: "needle",
	iv: "iv-bag",
	drop: "eyedropper",
	suppository: "$suppository",
	inhaler: "$inhaler",
	syrup: "$syrup-bottle",
	spray: "spray",
	patch: "bandage",
	generic: "medical-bag",
}

export const MedicineTypeSchema = z.union([
	z.literal("pill"),
	z.literal("injection"),
	z.literal("iv"),
	z.literal("drop"),
	z.literal("suppository"),
	z.literal("inhaler"),
	z.literal("syrup"),
	z.literal("spray"),
	z.literal("patch"),
	z.literal("generic"),
])
export type IMedicineType = z.infer<typeof MedicineTypeSchema>

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
