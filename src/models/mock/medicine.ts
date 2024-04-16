import { randomUUID } from "expo-crypto"
import { IMedicine } from ".."

const now = new Date(Date.now())
const today = new Date(2022, now.getMonth(), now.getDate())

export const data: IMedicine[] = [
	{
		id: randomUUID(),
		name: "Acetaminophen",
		type: "pill",
		inventory: {
			count: 20,
			notifyOn: 20,
			enabled: true,
		},
		notification: {
			enabled: true,
		},
		paused: false,
		schedule: [
			{
				startDate: now,
				type: "Daily",
				dosing: [
					{
						amount: 1,
						time: new Date(today.getTime() + 9 * 3600 * 1000),
					},
					{
						amount: 1,
						time: new Date(today.getTime() + 14 * 3600 * 1000),
					},
					{
						amount: 1,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
			{
				startDate: new Date(now.getTime() + 1000 * 60 * 60),
				endDate: now,
				type: "Daily",
				dosing: [
					{
						amount: 3,
						time: new Date(today.getTime() + 9 * 3600 * 1000),
					},
					{
						amount: 3,
						time: new Date(today.getTime() + 14 * 3600 * 1000),
					},
					{
						amount: 2.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
					{
						amount: 2.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
	{
		id: randomUUID(),
		name: "Ibuprofen",
		type: "pill",
		inventory: {
			count: 10,
			notifyOn: 5,
			enabled: true,
		},
		notification: {
			enabled: false,
		},
		paused: false,
		schedule: [
			{
				type: "EveryXdays",
				interval: 2,
				startDate: today,
				dosing: [
					{
						amount: 2,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
	{
		id: randomUUID(),
		name: "Amoxicillin",
		type: "pill",
		inventory: {
			count: 0,
			notifyOn: 0,
			enabled: false,
		},
		notification: {
			enabled: true,
		},
		paused: false,
		schedule: [
			{
				startDate: today,
				type: "Weekly",
				days: ["Mon", "Tue", "Wed"],
				dosing: [
					{
						amount: 2,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
			{
				type: "Weekly",
				startDate: today,
				days: ["Fri"],
				dosing: [
					{
						amount: 1.5,
						time: new Date(today.getTime() + 21 * 3600 * 1000),
					},
				],
			},
		],
	},
]
