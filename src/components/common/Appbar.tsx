import type { RootHeaderProps } from "@/routes/types"
import { useAppTheme } from "@/theme"
import { getHeaderTitle } from "@react-navigation/elements"
import { Appbar } from "react-native-paper"

export function PaperAppbar(props: RootHeaderProps) {
	const { route, options, back, navigation } = props
	const title = getHeaderTitle(options, route.name)
	const theme = useAppTheme()
	const Right = options.headerRight?.({ canGoBack: back !== undefined })

	// @ts-ignore TODO fix type
	const openDrawer = () => navigation.openDrawer()

	return (
		// TODO change appBar color
		<Appbar.Header style={{ backgroundColor: theme.colors.secondaryContainer }}>
			{!back && <Appbar.Action icon="menu" onPress={openDrawer} />}
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={title} />
			{Right}
		</Appbar.Header>
	)
}
