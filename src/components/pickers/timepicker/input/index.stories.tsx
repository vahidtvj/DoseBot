import { center } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { useRef } from "react"
import { TimeInputFull } from "./index"

const meta = {
	title: "Pickers/TimePicker/TimeInputFull",
	component: TimeInputFull,
	decorators: [center],
	args: {
		active: "none",
		hour: 9,
		minute: 22,
		ampm: "am",
		editable: true,
	},
	argTypes: {},
} satisfies Meta<typeof TimeInputFull>

export default meta
type Story = StoryObj<typeof TimeInputFull>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		function onChange(input: "hour" | "minute", value: number) {
			if (input === "hour") setArgs({ hour: value })
			else setArgs({ minute: value })
		}
		function onAMPM(value: "am" | "pm") {
			if (args.ampm === "none") return
			setArgs({ ampm: value })
		}
		function setActive(input: "hour" | "minute") {
			setArgs({ active: input })
		}
		const hourRef = useRef(null)
		const minuteRef = useRef(null)
		return (
			<TimeInputFull
				{...args}
				onChange={onChange}
				onAMPM={onAMPM}
				setActive={setActive}
				refs={{ hour: hourRef, minute: minuteRef }}
			/>
		)
	},
}
