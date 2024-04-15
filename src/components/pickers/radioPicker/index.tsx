import { useAppTheme } from "@/theme"
import { StyleSheet, View } from "react-native"
import {
	Button,
	Icon,
	Modal,
	Portal,
	RadioButton,
	Text,
} from "react-native-paper"

type Props<T extends string> = {
	title?: string
	values: {
		label: string
		subtitle?: string
		key: T
	}[]
	selected?: T
	onSelect: (value?: T) => void
	open: boolean
}

export function ItemPicker<T extends string>(props: Props<T>) {
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
				>
					{title && (
						<Text variant="titleLarge" style={styles.title}>
							{title}
						</Text>
					)}
					<View style={styles.body}>
						<View style={styles.itemContainer}>
							{values.map((value) => (
								<View key={value.key} style={styles.item}>
									<RadioButton
										value={value.key}
										status={value.key === selected ? "checked" : "unchecked"}
										onPress={() => onSelect(value.key)}
									/>
									<View>
										<Text variant="bodyLarge">{value.label}</Text>
										{value.subtitle && (
											<Text
												variant="bodySmall"
												style={{ color: theme.colors.secondary }}
											>
												{value.subtitle}
											</Text>
										)}
									</View>
								</View>
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
		paddingHorizontal: 30,
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
	item: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	title: {
		marginBottom: 20,
	},
	body: {},
	buttonContent: {
		justifyContent: "flex-start",
	},
})
