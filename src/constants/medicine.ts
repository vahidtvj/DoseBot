export type IMedicineType =
	| "pill"
	| "injection"
	| "iv"
	| "drop"
	| "suppository"
	| "inhaler"
	| "syrup"
	| "spray"
	| "patch"
	| "generic"
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

export type DoseStatus = "pending" | "skip" | "confirm"

export type DoseType = "Daily" | "EveryXdays" | "Weekly"
