import { data } from "@/models/mock/medicine"
import { getDosage } from "./getDosage"

describe("Dosage", () => {
	it("get dosage", () => {
		const doseList = getDosage(data)
		console.log(doseList)
	})
})
