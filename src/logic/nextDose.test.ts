import { Weekdays } from "@/constants"
import type { IMedicineFull } from "@/db"
import { addDays, startOfDay, startOfToday, startOfTomorrow } from "date-fns"
import { getNextDose } from "./getDosage"

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
		],
	},
	{
		id: 2,
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
				id: 3,
				medicineId: 2,
				type: "EveryXdays",
				startDate: startOfToday(),
				endDate: null,
				days: null,
				interval: 2,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 2.5,
						time: new Date(startOfToday().setHours(14)),
					},
				],
			},
		],
	},
	{
		id: 3,
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
				id: 4,
				medicineId: 3,
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
		],
	},
]

const expectedResult = {
	check1: {
		amount: 1,
		status: "pending",
		time: new Date(startOfToday().setHours(0)),
		medicineId: null,
	},
	check2: {
		amount: 1.5,
		status: "pending",
		time: new Date(startOfToday().setHours(18)),
		medicineId: null,
	},
	check3: {
		amount: 1,
		status: "pending",
		time: startOfTomorrow(),
		medicineId: null,
	},
	check4: {
		amount: 2.5,
		status: "pending",
		time: new Date(startOfToday().setHours(14)),
		medicineId: null,
	},
	check5: {
		amount: 2.5,
		status: "pending",
		time: addDays(new Date(startOfToday().setHours(14)), 2),
		medicineId: null,
	},
	check6: {
		amount: 3,
		status: "pending",
		time: new Date(startOfToday().setHours(16)),
		medicineId: null,
	},
	check7: {
		amount: 3.5,
		status: "pending",
		time: new Date(startOfToday().setHours(23)),
		medicineId: null,
	},
	check8: {
		amount: 3,
		status: "pending",
		time: new Date(startOfTomorrow().setHours(16)),
		medicineId: null,
	},
	check9: {
		amount: 3,
		status: "pending",
		time: addDays(new Date(startOfToday().setHours(16)), 7),
		medicineId: null,
	},
}

describe("next dose generator", () => {
	test("check1", () => {
		expect(getNextDose(data[0], startOfToday())).toEqual(expectedResult.check1)
	})
	test("check2", () => {
		expect(getNextDose(data[0], new Date(startOfToday().setHours(1)))).toEqual(
			expectedResult.check2,
		)
	})
	test("check3", () => {
		expect(getNextDose(data[0], new Date(startOfToday().setHours(19)))).toEqual(
			expectedResult.check3,
		)
	})
	test("check4", () => {
		expect(getNextDose(data[1], new Date(startOfToday()))).toEqual(
			expectedResult.check4,
		)
	})
	test("check5", () => {
		expect(getNextDose(data[1], new Date(startOfToday().setHours(15)))).toEqual(
			expectedResult.check5,
		)
	})
	test("check6", () => {
		expect(getNextDose(data[2], new Date(startOfToday()))).toEqual(
			expectedResult.check6,
		)
	})
	test("check7", () => {
		expect(getNextDose(data[2], new Date(startOfToday().setHours(17)))).toEqual(
			expectedResult.check7,
		)
	})
	test("check8", () => {
		expect(
			getNextDose(data[2], new Date(startOfToday().setHours(23, 30))),
		).toEqual(expectedResult.check8)
		expect(getNextDose(data[2], new Date(startOfTomorrow()))).toEqual(
			expectedResult.check8,
		)
	})
	test("check9", () => {
		expect(
			getNextDose(data[2], new Date(startOfTomorrow().setHours(23, 30))),
		).toEqual(expectedResult.check9)
	})
})
