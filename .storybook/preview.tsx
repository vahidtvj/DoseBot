import type { Preview } from "@storybook/react"
import { globalTypes } from "./globalTypes"
import { withGlobals } from "./withGlobals"
import { withTheme } from "./withTheme"

const preview: Preview = {
	globalTypes,
	decorators: [withGlobals, withTheme],
	parameters: {},
}

export default preview
