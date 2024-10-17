import { type Inputs, schema } from "@/components/forms/schedule/data"
import { data } from "@/db/mock/medicine"
import { withSafeView } from "@/decorators"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { useFieldArray, useForm } from "react-hook-form"
import { View } from "react-native"
import { DosingCard } from "."

const meta = {
	title: "Cards/DosingCard",
	component: DosingCard,
	decorators: [withSafeView],
	args: {
		// data: data[0].schedule![0].dosing[0],
	},
	argTypes: {},
} satisfies Meta<typeof DosingCard>

export default meta
type Story = StoryObj<typeof DosingCard>

export const Primary: Story = {
	render: (args) => {
		const { control } = useForm<Inputs>({
			defaultValues: {
				type: "Daily",
				startDate: new Date(),
				// endDate: new Date(),
				dosing: [
					{
						amount: 1,
						time: new Date(),
					},
				],
			},
			resolver: zodResolver(schema),
		})
		return <DosingCard {...args} control={control} name="dosing.0" />
	},
}

export const Multiple: Story = {
	render: () => {
		const { control } = useForm<Inputs>({
			defaultValues: {
				type: "Daily",
				startDate: new Date(),
				// endDate: new Date(),
				dosing: data[0].schedules[0].dosing,
			},
			resolver: zodResolver(schema),
		})
		const dosingArray = useFieldArray({
			control,
			name: "dosing",
		})
		return (
			<View style={{ gap: 16 }}>
				{dosingArray.fields.map((schedule, i) => (
					<DosingCard
						control={control}
						name={`dosing.${i}`}
						key={schedule.id}
					/>
				))}
			</View>
		)
	},
}
