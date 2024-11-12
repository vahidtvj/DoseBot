export * from "./medicine"

export type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

export const Weekdays: Weekday[] = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
]

export type Language = "en" | "fa"

export const languages: { key: Language; label: string; subtitle?: string }[] =
	[
		{
			key: "en",
			label: "English",
		},
		{
			key: "fa",
			label: "فارسی",
			subtitle: "Persian",
		},
	]

export type CalendarSystem = "georgian" | "persian"
export const CalendarSystems: CalendarSystem[] = ["georgian", "persian"]
