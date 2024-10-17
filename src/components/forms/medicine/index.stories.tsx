import { data } from "@/db/mock/medicine"
import { withSafeView } from "@/decorators"
import type { Meta, StoryObj } from "@storybook/react"
import { MedicineForm } from "."

const meta = {
	title: "Forms/MedicineDetail",
	component: MedicineForm,
	decorators: [withSafeView],
	args: {
		data: data[0],
	},
	argTypes: {},
} satisfies Meta<typeof MedicineForm>

export default meta
type Story = StoryObj<typeof MedicineForm>

export const Primary: Story = {
	render: (args) => <MedicineForm {...args} />,
}

export const Create: Story = {
	render: (args) => <MedicineForm {...args} data={undefined} />,
}
