import { useConfigState } from "@/stores/configStore"
import { create } from "zustand"

type State = {
	visible: boolean
	onDismiss: () => void
	onSubmit: (agree: boolean) => void
	show: () => void
}
export const useSentryConsentDialog = create<State>()((set) => ({
	visible: false,
	onDismiss: () => set({ visible: false }),
	onSubmit: (agree) => {
		useConfigState.getState().toggle("sentryEnabled", agree)
		set({ visible: false })
	},
	show: () => set({ visible: true }),
}))
