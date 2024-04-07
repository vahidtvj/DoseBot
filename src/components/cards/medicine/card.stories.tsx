import { withSafeView } from "@/decorators"
import { data } from "@/models/mock/medicine"
import type { Meta, StoryObj } from "@storybook/react"
import { MedicineCard } from "."

const meta = {
	title: "Cards/MedicineCard",
	component: MedicineCard,
	decorators: [withSafeView],
	args: data[0],
	argTypes: {},
} satisfies Meta<typeof MedicineCard>

export default meta
type Story = StoryObj<typeof MedicineCard>

export const Primary: Story = {
	render: (args) => <MedicineCard {...args} />,
}

export const Multiple: Story = {
	render: () => (
		<>
			{data.map((item) => (
				<MedicineCard {...item} key={item.id} />
			))}
		</>
	),
}
