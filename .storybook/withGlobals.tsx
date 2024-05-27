import type { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { useEffect } from "react"
import { useConfigState } from "../src/stores/configStore"
import { useUIStore } from "../src/stores/uiStore"

export const withGlobals = (Story: StoryFn, context: StoryContext) => {
	const { locale, colorScheme, colors } = context.globals
	useEffect(() => {
		colorScheme && useConfigState.setState({ colorScheme })
	}, [colorScheme])
	useEffect(() => {
		colors &&
			useConfigState.setState({ useMaterialYou: colors === "MaterialYou" })
	}, [colors])
	useEffect(() => {
		locale && useConfigState.setState({ lang: locale })
	}, [locale])

	return <Story />
}
