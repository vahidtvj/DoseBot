import { withSafeView } from "@/decorators"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { WeekdayPicker } from "."

const meta = {
	title: "Pickers/Weekday",
	component: WeekdayPicker,
	decorators: [withSafeView],
	args: {
		selected: ["Mon"],
	},
	argTypes: {},
} satisfies Meta<typeof WeekdayPicker>

export default meta
type Story = StoryObj<typeof WeekdayPicker>

export const Primary: Story = {
	render: (args) => {
		const [_args, setArgs] = useArgs()

		return (
			<WeekdayPicker
				{...args}
				onSelect={(days) => setArgs({ selected: days })}
			/>
		)
	},
}
