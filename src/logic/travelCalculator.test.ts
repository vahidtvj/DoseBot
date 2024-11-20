import { Weekdays } from "@/constants"
import type { IMedicineFull } from "@/db"
import { addDays, startOfDay, startOfToday, startOfTomorrow } from "date-fns"
import { travelCalculator } from "./travelCalculator"

const today = startOfToday()

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
				startDate: today,
				endDate: null,
				days: null,
				interval: 2,
				dosing: [
					{
						id: 1,
						scheduleId: 2,
						amount: 2.5,
						time: new Date(today.setHours(14)),
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
	check1: [2.5, 0, 0],
	check2: [5, 0, 0],
	check3: [32.5, 0, 0],
	check4: [0, 2.5, 0],
	check5: [0, 10, 0],
	check6: [0, 0, 6.5],
	check7: [0, 0, 13],
	check8: [0, 0, 26],
}

describe("Travel Calculator", () => {
	test("Check 1", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [true, false, false],
				start: today,
				end: today,
			}),
		).toEqual(expectedResult.check1)
	})
	test("Check 2", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [true, false, false],
				start: today,
				end: startOfTomorrow(),
			}),
		).toEqual(expectedResult.check2)
	})
	test("Check 3", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [true, false, false],
				start: today,
				end: addDays(today, 12),
			}),
		).toEqual(expectedResult.check3)
	})
	test("Check 4", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [false, true, false],
				start: today,
				end: today,
			}),
		).toEqual(expectedResult.check4)
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [false, true, false],
				start: today,
				end: addDays(today, 1),
			}),
		).toEqual(expectedResult.check4)
	})
	test("Check 5", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [false, true, false],
				start: today,
				end: addDays(today, 7),
			}),
		).toEqual(expectedResult.check5)
	})
	test("Check 6", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [false, false, true],
				start: today,
				end: today,
			}),
		).toEqual(expectedResult.check6)
	})
	test("Check 7", () => {
		for (let i = 1; i < 7; i++) {
			expect(
				travelCalculator({
					meds: data,
					selectedMeds: [false, false, true],
					start: today,
					end: addDays(today, i),
				}),
			).toEqual(expectedResult.check7)
		}
	})
	test("Check 8", () => {
		expect(
			travelCalculator({
				meds: data,
				selectedMeds: [false, false, true],
				start: today,
				end: addDays(today, 9),
			}),
		).toEqual(expectedResult.check8)
	})
})
