import type { IDoseFull } from "@/db"

export const data: IDoseFull[] = [
	{
		id: 1,
		medicineId: 1,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() - 1000 * 60 * 60 * 24),
		amount: 2,
		status: "pending",
	},
	{
		id: 2,
		medicineId: 1,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() - 1000 * 60 * 60),
		amount: 2,
		status: "skip",
	},
	{
		id: 3,
		medicineId: 1,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() - 1000 * 60 * 10),
		amount: 2,
		status: "confirm",
	},
	{
		id: 4,
		medicineId: 2,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() - 1000 * 60),
		amount: 2,
		status: "pending",
	},
	{
		id: 5,
		medicineId: 2,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() + 1000 * 60 * 60),
		amount: 2,
		status: "pending",
	},
	{
		id: 6,
		medicineId: 2,
		medicine: { name: "Acetaminophen", type: "pill", note: null },
		time: new Date(Date.now() + 1000 * 60 * 60 * 24),
		amount: 2,
		status: "pending",
	},
]
