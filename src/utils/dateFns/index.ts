import { useUIStore } from "@/stores/uiStore"
import { create } from "zustand"
import * as dateFns from "./default"
import * as jDateFns from "./jalali"

type DateFNStore = {
	weekdays: string[]
}

function getWeekdays() {
	const useJalali = useUIStore.getState().lang === "fa"
	const func = useJalali ? jDateFns : dateFns
	const date = func.startOfWeek(new Date())
	const daysOfWeek = func.eachDayOfInterval({
		start: date,
		end: func.addDays(date, 6),
	})
	const weekdays = daysOfWeek.map((day) => func.format(day, "EEE"))
	return weekdays
}

const useStore = create<DateFNStore>()(() => ({ weekdays: getWeekdays() }))
useUIStore.subscribe(
	(x) => x.lang,
	() => useStore.setState({ weekdays: getWeekdays() }),
)

export function useDateFunc() {
	// TODO get from lang
	const useJalali = useUIStore((x) => x.lang) === "fa"
	const func = useJalali ? jDateFns : dateFns
	const { weekdays } = useStore()

	return { ...func, weekdays }
}
