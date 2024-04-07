import { StoryContext, StoryFn } from "@storybook/react"
import React from "react"
import { useEffect } from "react"
import { useUIStore } from "../src/stores/uiStore"

export const withGlobals = (Story: StoryFn, context: StoryContext) => {
	const { locale, colorScheme } = context.globals
	useEffect(() => {
		useUIStore.setState({ colorScheme, lang: locale })
	}, [locale, colorScheme])
	return <Story />
}
