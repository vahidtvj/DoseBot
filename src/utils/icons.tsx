import { createIconSet } from "react-native-vector-icons"

const glyphMap = {
	suppository: "A",
	inhaler: "B",
	"syrup-bottle": "C",
}
export const Icon = createIconSet(glyphMap, "customIcon", "customIcon.ttf")
