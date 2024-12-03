import { center } from "@/decorators"
import { useAppTheme } from "@/theme"
import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { MonthView } from "./monthView"

const meta = {
	component: MonthView,
	title: "Components/Calendar/MonthView",
	decorators: [center],
	args: {
		// dots: Array.from({ length: 30 }, () =>
		// 	Math.random() > 0.5 ? undefined : Math.random() > 0.7 ? 1 : 0,
		// ),
		onSelect: (day) => console.log(day),
		month: new Date(),
		today: new Date(),
		noToday: false,
	},
} satisfies Meta<typeof MonthView>

export default meta

type Story = StoryObj<typeof MonthView>

export const Picker: Story = {
	render: (args) => {
		return (
			<View>
				<MonthView {...args} itemStyle={{}} showSelection={true} />
			</View>
		)
	},
}

export const Calendar: Story = {
	render: (args) => {
		const theme = useAppTheme()
		const getRandomDots = () =>
			Array.from({ length: 30 }, () =>
				Math.random() > 0.5
					? undefined
					: Math.random() > 0.8
						? "error"
						: "success",
			)
		return (
			<View>
				<MonthView
					{...args}
					itemStyle={{
						active: {
							backgroundColor: theme.colors.surfaceDisabled,
						},
					}}
					dots={getRandomDots()}
					dotsStyle={{
						error: { borderColor: theme.colors.red },
						success: { borderColor: theme.colors.onSurface },
					}}
					todayStyle="color"
				/>
			</View>
		)
	},
}
