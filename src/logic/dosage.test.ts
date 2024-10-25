import { Weekdays } from "@/constants"
import type { IDoseCreate, IMedicineFull } from "@/db"
import { startOfDay, startOfToday, startOfTomorrow } from "date-fns"
import { getDosage } from "./getDosage"

const data: IMedicineFull[] = [
	{
		id: 1,
		name: "test1",
		inventoryCount: 0,
		inventoryNotifyOn: 0,
		inventoryEnabled: false,
		type: "pill",
		note: null,
		paused: false,
		removed: false,
		schedules: [
			{
				id: 1,
				medicineId: 1,
				type: "Daily",
				startDate: new Date(2024, 9, 20),
				endDate: null,
				days: null,
				interval: null,
				dosing: [
					{
						id: 1,
						scheduleId: 1,
						amount: 1,
						time: new Date(2024, 9, 20, 0),
					},
					{
						id: 2,
						scheduleId: 1,
						amount: 1.5,
						time: new Date(2024, 9, 20, 18),
					},
				],
			},
			{
				id: 2,
				medicineId: 1,
				type: "Daily",
				startDate: new Date(2024, 9, 20),
				endDate: new Date(2024, 9, 22),
				days: null,
				interval: null,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 2,
						time: new Date(2024, 9, 20, 0),
					},
				],
			},
			{
				id: 3,
				medicineId: 1,
				type: "EveryXdays",
				startDate: startOfDay(new Date()),
				endDate: null,
				days: null,
				interval: 2,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 2.5,
						time: new Date(startOfDay(new Date()).setHours(14)),
					},
				],
			},
			{
				id: 4,
				medicineId: 1,
				type: "Weekly",
				startDate: startOfDay(new Date()),
				endDate: null,
				days: [
					Weekdays[new Date().getDay()],
					Weekdays[(new Date().getDay() + 1) % 7],
				],
				interval: 2,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 3,
						time: new Date(startOfDay(new Date()).setHours(16)),
					},
					{
						id: 2,
						scheduleId: 2,
						amount: 3.5,
						time: new Date(startOfDay(new Date()).setHours(23)),
					},
				],
			},
			{
				id: 5,
				medicineId: 1,
				type: "Daily",
				startDate: new Date(Date.now() + 1000 * 60 * 60 * 3),
				endDate: null,
				days: null,
				interval: null,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 4,
						time: new Date(2024, 9, 20, 11),
					},
				],
			},
		],
	},
]
const expectedData: { today: IDoseCreate[]; tommorow: IDoseCreate[] } = {
	today: [
		{
			medicineId: 1,
			status: "pending",
			amount: 1,
			time: new Date(startOfToday().setHours(0)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 1.5,
			time: new Date(startOfToday().setHours(18)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 2.5,
			time: new Date(startOfDay(new Date()).setHours(14)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 3,
			time: new Date(startOfDay(new Date()).setHours(16)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 3.5,
			time: new Date(startOfDay(new Date()).setHours(23)),
		},
	],
	tommorow: [
		{
			medicineId: 1,
			status: "pending",
			amount: 1,
			time: new Date(startOfTomorrow()),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 1.5,
			time: new Date(startOfTomorrow().setHours(18)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 3,
			time: new Date(startOfTomorrow().setHours(16)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 3.5,
			time: new Date(startOfTomorrow().setHours(23)),
		},
		{
			medicineId: 1,
			status: "pending",
			amount: 4,
			time: new Date(startOfTomorrow().setHours(11)),
		},
	],
}

describe("dose generation function", () => {
	test("Check Today", () => {
		expect(getDosage(data)).toEqual(expectedData.today)
	})
	test("Check Tomorrow", () => {
		expect(getDosage(data, startOfTomorrow())).toEqual(expectedData.tommorow)
	})
})
