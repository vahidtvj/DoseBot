import { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { useEffect } from "react"
import { useConfigState } from "../src/stores/configStore"
import { useUIStore } from "../src/stores/uiStore"

export const withGlobals = (Story: StoryFn, context: StoryContext) => {
	const { locale, colorScheme, colors } = context.globals
	useEffect(() => {
		useUIStore.setState({ colorScheme, lang: locale })
	}, [locale, colorScheme])
	useEffect(() => {
		useConfigState.setState({ useMaterialYou: colors === "MaterialYou" })
	}, [colors])

	return <Story />
}
