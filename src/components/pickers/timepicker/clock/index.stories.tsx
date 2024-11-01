import { center } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { randomUUID } from "expo-crypto"
import { useTranslation } from "react-i18next"
import { TimePickerClock } from "./clock"

const meta = {
	title: "Pickers/TimePicker/TimePickerClock",
	component: TimePickerClock,
	decorators: [center],
	args: {
		selected: 1,
	},
	argTypes: {},
} satisfies Meta<typeof TimePickerClock>

export default meta
type Story = StoryObj<typeof TimePickerClock>

export const Hour: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		function onChange(value: number) {
			setArgs({ selected: value })
		}
		const { i18n } = useTranslation()
		return (
			<TimePickerClock
				{...args}
				rtl={i18n.dir() === "rtl"}
				onChange={onChange}
				inputType="hour"
			/>
		)
	},
}

export const Hour24: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		function onChange(value: number) {
			setArgs({ selected: value })
		}
		const { i18n } = useTranslation()
		return (
			<TimePickerClock
				{...args}
				rtl={i18n.dir() === "rtl"}
				onChange={onChange}
				inputType="hour24"
			/>
		)
	},
}

export const Minute: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()
		function onChange(value: number) {
			setArgs({ selected: value })
		}
		const { i18n } = useTranslation()
		return (
			<TimePickerClock
				{...args}
				rtl={i18n.dir() === "rtl"}
				onChange={onChange}
				inputType="minute"
			/>
		)
	},
}
