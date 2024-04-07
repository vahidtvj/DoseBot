import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { DoseCard } from "."

const meta = {
	title: "Cards/DoseCard",
	component: DoseCard,
	decorators: [withSafeView],
	args: {
		name: "Acetaminophen",
		time: new Date(Date.now() - 1000 * 60 * 60),
		amount: 2,
		type: "pill",
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
	render: (args) => (
		<>
			<DoseCard
				{...args}
				name="Acetaminophen"
				time={new Date(Date.now() - 1000 * 60 * 60)}
				amount={2}
				type="pill"
				status="skip"
			/>
			<DoseCard
				{...args}
				name="Acetaminophen"
				time={new Date(Date.now() - 1000 * 60 * 60)}
				amount={2.5}
				type="pill"
				status="pending"
			/>
			<DoseCard
				{...args}
				name="Acetaminophen"
				time={new Date(Date.now())}
				amount={0.5}
				type="pill"
				status="confirm"
			/>
			<DoseCard
				{...args}
				name="Ibuprofin"
				time={new Date(Date.now() + 24 * 60 * 60 * 1000)}
				amount={1}
				type="pill"
				status="pending"
			/>
		</>
	),
}
