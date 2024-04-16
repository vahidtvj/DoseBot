import { createIconSet } from "react-native-vector-icons"
const glyphMap = {
	suppository: "A",
	inhaler: "B",
	"syrup-bottle": "C",
	"syrup-bottle2": "D",
}
export const Icon = createIconSet(glyphMap, "MyFont", "MyFont.ttf")
