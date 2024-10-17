import { data } from "@/db/mock/dose"
import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { FlatList } from "react-native"
import { DoseCard } from "."

const meta = {
	title: "Cards/DoseCard",
	component: DoseCard,
	decorators: [withSafeView],
	args: {
		medicine: { name: "Acetaminophen", type: "pill", note: "After meal" },
		time: new Date(Date.now() - 1000 * 60 * 60),
		amount: 2,
		status: "pending",
	},
	argTypes: {},
} satisfies Meta<typeof DoseCard>

export default meta
type Story = StoryObj<typeof DoseCard>

export const Primary: Story = {
	render: (args) => <DoseCard {...args} />,
}

export const Multiple: Story = {
	render: () => (
		<FlatList
			data={data}
			keyExtractor={(item) => String(item.id)}
			renderItem={(item) => (
				<DoseCard
					key={item.item.id}
					{...item.item}
					onConfirm={() => {}}
					onSkip={() => {}}
				/>
			)}
		/>
	),
}
