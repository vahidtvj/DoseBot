import type { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { useEffect } from "react"
import { useConfigState } from "../src/stores/configStore"

export const withGlobals = (Story: StoryFn, context: StoryContext) => {
	const { locale, colorScheme, colors, use24Hour, calendar } = context.globals

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
	useEffect(() => {
		if (use24Hour !== undefined)
			useConfigState.setState({ use24Hour: use24Hour })
	}, [use24Hour])
	useEffect(() => {
		calendar && useConfigState.setState({ calendar: calendar })
	}, [calendar])
	return <Story />
}
