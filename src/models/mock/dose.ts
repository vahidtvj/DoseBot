import { randomUUID } from "expo-crypto"
import { IDose } from ".."

export const data: IDose[] = [
	{
		id: randomUUID(),
		medId: "123",
		name: "Acetaminophen",
		time: new Date(Date.now() - 1000 * 60 * 60 * 24),
		amount: 2,
		type: "pill",
		status: "pending",
	},
	{
		id: randomUUID(),
		medId: "123",
		name: "Acetaminophen",
		time: new Date(Date.now() - 1000 * 60 * 60),
		amount: 2,
		type: "pill",
		status: "skip",
	},
	{
		id: randomUUID(),
		medId: "123",
		name: "Acetaminophen",
		time: new Date(Date.now() - 1000 * 60 * 10),
		amount: 2,
		type: "pill",
		status: "confirm",
	},
	{
		id: randomUUID(),
		medId: "1234",
		name: "Acetaminophen",
		time: new Date(Date.now() - 1000 * 60),
		amount: 2,
		type: "pill",
		status: "pending",
	},
	{
		id: randomUUID(),
		medId: "1234",
		name: "Acetaminophen",
		time: new Date(Date.now() + 1000 * 60 * 60),
		amount: 2,
		type: "pill",
		status: "pending",
	},
	{
		id: randomUUID(),
		medId: "1234",
		name: "Acetaminophen",
		time: new Date(Date.now() + 1000 * 60 * 60 * 24),
		amount: 2,
		type: "pill",
		status: "pending",
	},
]
