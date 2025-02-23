import type { IDose } from "@/db"
import { withAppbar } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { HistoryCalendar } from "./index"

const meta = {
	component: HistoryCalendar,
	title: "Views/HistoryCalendar",
	decorators: [withAppbar],
	args: {
		data: {
			1499: [
				{ amount: 1, id: 1, medicineId: 1, status: "skip", time: new Date() },
			],
		},
	},
} satisfies Meta<typeof HistoryCalendar>

export default meta

type Story = StoryObj<typeof HistoryCalendar>

export const Primary: Story = {
	render: (args) => {
		const [data, setData] = useState<{ [key: number]: IDose[] }>({
			1499: [
				{ amount: 1, id: 1, medicineId: 1, status: "skip", time: new Date() },
			],
			1500: [
				{ amount: 1, id: 1, medicineId: 1, status: "skip", time: new Date() },
			],
		})
		return (
			<HistoryCalendar
				{...args}
				data={data}
				getNewData={(props) => {
					setData(
						Object.fromEntries(
							Object.entries(props).map(([k, _v]) => [
								Number(k),
								[
									{
										amount: 1,
										id: 1,
										medicineId: 1,
										status: "skip",
										time: new Date(),
									},
								],
							]),
						),
					)
				}}
			/>
		)
	},
}
