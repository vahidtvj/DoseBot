import type { IMedicineFull } from "@/db"

const now = new Date(Date.now())
const today = new Date(2022, now.getMonth(), now.getDate())

export const data: IMedicineFull[] = [
	{
		id: 1,
		name: "Acetaminophen",
		type: "pill",
		inventoryCount: 20,
		inventoryNotifyOn: 20,
		inventoryEnabled: true,
		paused: false,
		note: null,
		removed: false,
		schedules: [
			{
				id: 1,
				medicineId: 1,
				startDate: now,
				endDate: null,
				type: "Daily",
				days: null,
				interval: null,
				dosing: [
					{
						id: 1,
						scheduleId: 1,
						amount: 1,
						time: new Date(today.getTime() + 9 * 3600 * 1000),
					},
					{
						id: 2,
						scheduleId: 1,
						amount: 1,
						time: new Date(today.getTime() + 14 * 3600 * 1000),
					},
					{
						id: 3,
						scheduleId: 1,
						amount: 1,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
			{
				id: 2,
				medicineId: 1,
				startDate: new Date(now.getTime() + 1000 * 60 * 60),
				endDate: now,
				type: "Daily",
				days: null,
				interval: null,
				dosing: [
					{
						id: 4,
						scheduleId: 2,
						amount: 3,
						time: new Date(today.getTime() + 9 * 3600 * 1000),
					},
					{
						id: 5,
						scheduleId: 2,
						amount: 3,
						time: new Date(today.getTime() + 14 * 3600 * 1000),
					},
					{
						id: 6,
						scheduleId: 2,
						amount: 2.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
					{
						id: 7,
						scheduleId: 2,
						amount: 2.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
	{
		id: 2,
		name: "Ibuprofen",
		type: "pill",
		inventoryCount: 10,
		inventoryNotifyOn: 5,
		inventoryEnabled: true,
		paused: false,
		note: null,
		removed: false,
		schedules: [
			{
				id: 3,
				medicineId: 2,
				type: "EveryXdays",
				interval: 2,
				startDate: today,
				endDate: null,
				days: null,
				dosing: [
					{
						id: 8,
						scheduleId: 3,
						amount: 2,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
	{
		id: 3,
		name: "Amoxicillin",
		type: "pill",
		inventoryCount: 0,
		inventoryNotifyOn: 0,
		inventoryEnabled: false,
		paused: false,
		note: null,
		removed: false,
		schedules: [
			{
				id: 4,
				medicineId: 3,
				startDate: today,
				type: "Weekly",
				days: ["Mon", "Tue", "Wed"],
				interval: null,
				endDate: null,
				dosing: [
					{
						id: 9,
						scheduleId: 4,
						amount: 2,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
			{
				id: 5,
				medicineId: 3,
				type: "Weekly",
				startDate: today,
				days: ["Fri"],
				interval: null,
				endDate: null,
				dosing: [
					{
						id: 10,
						scheduleId: 5,
						amount: 1.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
]
