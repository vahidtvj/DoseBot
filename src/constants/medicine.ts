export type IMedicineType =
	| "pill"
	| "injection"
	| "drop"
	| "suppository"
	| "inhaler"
	| "syrup"
	| "spray"
	| "patch"
	| "generic"
export type IMedicineUnit =
	| "pill"
	| "injection"
	| "dose"
	| "drop"
	| "suppository"
	| "puff"
	| "ml"
	| "tsp"
	| "tbsp"
	| "spray"
	| "patch"

export const MedTypeList: IMedicineType[] = [
	"pill",
	"injection",
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
	drop: "eyedropper",
	suppository: "$suppository",
	inhaler: "$inhaler",
	syrup: "$syrup-bottle",
	spray: "spray",
	patch: "bandage",
	generic: "medical-bag",
}

export const medUnits: { [key in IMedicineType]: IMedicineUnit[] } = {
	pill: ["pill"],
	injection: ["injection"],
	drop: ["drop"],
	suppository: ["suppository"],
	inhaler: ["puff"],
	syrup: ["ml", "tsp", "tbsp"],
	spray: ["spray"],
	patch: ["patch"],
	generic: ["dose"],
}

export type DoseStatus = "pending" | "skip" | "confirm"

export type DoseType = "Daily" | "EveryXdays" | "Weekly"
