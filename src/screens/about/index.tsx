import { IconText } from "@/components/common/IconText"
import { GithubLink, LicenseLink } from "@/constants"
import type { RootStackScreenProps } from "@/routes/types"
import { useAppTheme } from "@/theme"
import {
	applicationId,
	nativeApplicationVersion,
	nativeBuildVersion,
} from "expo-application"
import { useTranslation } from "react-i18next"
import { Image, Linking, ScrollView, StyleSheet, View } from "react-native"
import {
	Button,
	Card,
	Chip,
	IconButton,
	Surface,
	Text,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

function InfoCard(props: {
	title: string
	subtitle: string
	icon: string
	flex1?: boolean
	right?: React.ReactNode
}) {
	const theme = useAppTheme()
	return (
		<Surface
			mode="flat"
			style={[
				{
					borderRadius: theme.roundness * 2,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingVertical: 8,
					flex: props.flex1 ? 1 : undefined,
				},
			]}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<IconButton icon={props.icon} />
				<View>
					<Text variant="titleMedium">{props.title}</Text>
					<Text>{props.subtitle}</Text>
				</View>
			</View>
			{props.right}
		</Surface>
	)
}

export default function Page(_props: RootStackScreenProps<"About">) {
	const appId = applicationId?.split(".")[2]
	const variant =
		appId === "DoseBotDev"
			? "development"
			: appId === "DoseBotPreview"
				? "preview"
				: "production"
	const version =
		variant !== "development" ? nativeApplicationVersion : nativeBuildVersion

	const { t } = useTranslation()
	return (
		<SafeAreaView style={styles.page}>
			<View style={styles.header}>
				<Image
					source={require("@/../assets/adaptive-foreground.png")}
					style={{ height: "100%" }}
					resizeMode="contain"
				/>
				<Text variant="headlineSmall">{t("appName")}</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text variant="bodyMedium">{t("app.about")}</Text>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<View style={{ flexDirection: "row", gap: 12 }}>
						<InfoCard
							title={t("app.version")}
							subtitle={version || ""}
							icon="information"
							flex1
						/>
						<InfoCard
							title={t("app.build")}
							subtitle={variant}
							icon="cog"
							flex1
						/>
					</View>
					<InfoCard
						title={t("app.license")}
						subtitle={"GNU General Public License v3.0"}
						icon="license"
						right={
							<IconButton
								icon="open-in-new"
								onPress={() => Linking.openURL(LicenseLink)}
							/>
						}
					/>

					<Button icon="github" onPress={() => Linking.openURL(GithubLink)}>
						{t("app.sourceCode")}
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	page: {
		marginTop: 12,
		flex: 1,
		gap: 12,
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		height: "20%",
		marginBottom: 12,
	},
	container: {
		flex: 1,
		margin: 25,
		gap: 12,
	},
	chips: {
		gap: 6,
	},
	row: {
		flexDirection: "row",
	},
})
