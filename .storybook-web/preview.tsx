import { globalTypes } from "../.storybook/globalTypes"
/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		deviceOnly: true,
		actions: { argTypesRegex: "^on.*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes,
}

export default preview
