import { useAppTheme } from "@/theme"
import { View } from "react-native"
import { Button, Dialog, Portal, Text } from "react-native-paper"

type Props = {
	visible: boolean
	onDismiss: () => void
	onSubmit: (agree: boolean) => void
}
// TODO user consent form
export function SentryDiolog({ visible, onDismiss, onSubmit }: Props) {
	const theme = useAppTheme()
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Icon icon="alert" />
				<Dialog.Title style={{ textAlign: "center" }}>
					Privacy Consent
				</Dialog.Title>
				<Dialog.Content>
					<Text variant="bodyLarge">
						Allow automatic crash reporting and analytics using Sentry
					</Text>
					<Text variant="bodyMedium" style={{ color: theme.colors.error }}>
						* This is optional and not required for app functionality
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<View style={{ flexDirection: "row", gap: 12 }}>
						<Button onPress={() => onSubmit(false)} mode="contained-tonal">
							Disagree
						</Button>
						<Button onPress={() => onSubmit(true)} mode="contained">
							Agree
						</Button>
					</View>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}
