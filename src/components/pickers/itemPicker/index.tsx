import { useAppTheme } from "@/theme"
import { StyleSheet, View } from "react-native"
import { Button, Modal, Portal, Text } from "react-native-paper"
type Props<T> = {
	title?: string
	values: {
		label: string
		icon?: string
		key: T
	}[]
	selected?: T
	onSelect: (value?: T) => void
	open: boolean
}

export function ItemPicker<T>(props: Props<T>) {
	const { selected, values, onSelect, open, title } = props
	const theme = useAppTheme()

	return (
		<Portal>
			<View
				style={[
					styles.backdrop,
					{
						backgroundColor: theme.colors.backdrop,
						display: open ? "flex" : "none",
					},
				]}
			>
				<Modal
					visible={open}
					onDismiss={() => onSelect(undefined)}
					contentContainerStyle={[
						styles.modal,
						{ backgroundColor: theme.colors.surface },
					]}
					style={{}}
				>
					{title && (
						<Text variant="titleLarge" style={styles.title}>
							{title}
						</Text>
					)}
					<View style={styles.body}>
						<View style={styles.itemContainer}>
							{values.map((value, i) => (
								<Button
									contentStyle={styles.buttonContent}
									key={i}
									mode={selected === value.key ? "contained" : "elevated"}
									onPress={() => onSelect(value.key)}
									icon={value.icon}
								>
									{value.label}
								</Button>
							))}
						</View>
					</View>
				</Modal>
			</View>
		</Portal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
	},
	modal: {
		padding: 20,
		paddingHorizontal: 20,
		margin: 20,
		alignSelf: "center",
		borderRadius: 12,
	},
	itemContainer: {
		gap: 12,
		flexWrap: "wrap",
		// justifyContent: "center"
		justifyContent: "center",
		alignItems: "stretch",
		// alignContent: "stretch",
	},
	title: {
		marginBottom: 20,
	},
	body: {},
	buttonContent: {
		justifyContent: "flex-start",
	},
})
