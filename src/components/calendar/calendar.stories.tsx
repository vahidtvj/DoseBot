import { center } from "@/decorators"
import { useAppTheme } from "@/theme"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { Calendar } from "./calendar"

const meta = {
	component: Calendar,
	title: "Components/Calendar",
	decorators: [center],
	args: {
		today: new Date(),
		date: new Date(),
		minDate: new Date(1900, 0),
		maxDate: new Date(2100, 0),
		onSelect: (date) => console.log(date.toLocaleDateString()),
	},
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof Calendar>

export const PickerMode: Story = {
	render: (args) => {
		return (
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<View>
					<Calendar {...args} itemStyle={{}} showSelection={true} />
				</View>
			</View>
		)
	},
}

export const CalendarMode: Story = {
	render: (args) => {
		const theme = useAppTheme()
		const [dots, setDots] = useState<{
			[monthIndex: number]: ("success" | "error" | undefined)[]
		}>()

		const getRandomDots = () =>
			Array.from({ length: 30 }, () =>
				Math.random() > 0.5
					? undefined
					: Math.random() > 0.8
						? "error"
						: "success",
			)
		return (
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<View>
					<Calendar
						{...args}
						itemStyle={{
							active: {
								backgroundColor: theme.colors.surfaceDisabled,
							},
						}}
						todayStyle="color"
						dots={dots}
						onIndexChange={(i) =>
							setDots({
								[i - 1]: getRandomDots(),
								[i]: getRandomDots(),
								[i + 1]: getRandomDots(),
							})
						}
						dotsStyle={{
							error: { borderColor: theme.colors.red },
							success: { borderColor: theme.colors.onSurface },
						}}
					/>
				</View>
			</View>
		)
	},
}
