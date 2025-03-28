import { useConfigState } from "@/stores/configStore"
import { useUIStore } from "@/stores/uiStore"
import { create } from "zustand"
import * as dateFns from "./default"
import * as jDateFns from "./jalali"

type DateFNStore = {
	weekdays: string[]
	monthNames: string[]
}

function initStore() {
	const useJalali = useConfigState.getState().calendar === "persian"
	const func = useJalali ? jDateFns : dateFns
	const today = new Date()
	const date = func.startOfWeek(today)
	const daysOfWeek = func.eachDayOfInterval({
		start: date,
		end: func.addDays(date, 6),
	})
	const weekdays = daysOfWeek.map((day) => func.format(day, "EEE"))

	const monthNames = func
		.eachMonthOfInterval({
			start: func.startOfYear(today),
			end: func.endOfYear(today),
		})
		.map((date) => func.format(date, "MMMM"))

	return { weekdays, monthNames }
}

const useStore = create<DateFNStore>()(() => initStore())
useConfigState.subscribe(
	(x) => x.calendar,
	() => useStore.setState(initStore),
)

function useDateFunc() {
	const calendar = useConfigState((x) => x.calendar)
	const useJalali = calendar === "persian"
	const func = useJalali ? jDateFns : dateFns
	const { weekdays, monthNames } = useStore()

	return { ...func, weekdays, monthNames }
}

useDateFunc.get = () => {
	const { calendar } = useConfigState.getState()
	const useJalali = calendar === "persian"
	const func = useJalali ? jDateFns : dateFns

	return { ...func }
}

export { useDateFunc }
