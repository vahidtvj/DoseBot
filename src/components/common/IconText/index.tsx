import { useAppTheme } from "@/theme"
import { StyleSheet, View, ViewProps } from "react-native"
import { Icon, Text, TextProps } from "react-native-paper"

type Props<T> = TextProps<T> & {
	icon?: string
	iconSize?: number
	iconColor?: string
	containerStyle?: ViewProps
}

export function DoseView<T extends never>(props: Props<T>) {
	const { icon, iconSize, iconColor, containerStyle, ...rest } = props
	const theme = useAppTheme()

	return (
		<View style={[styles.container, containerStyle]}>
			{icon && (
				<Icon
					source={icon}
					size={iconSize || theme.fonts[props.variant || "bodyMedium"].fontSize}
					color={iconColor}
				/>
			)}
			<Text {...rest}>Lorem Ipsum</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flexDirection: "row", gap: 6, alignItems: "center" },
})
