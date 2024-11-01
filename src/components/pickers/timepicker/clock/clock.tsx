import { useAppTheme } from "@/theme"
import { useCallback, useMemo, useRef } from "react"
import {
	type GestureResponderEvent,
	type LayoutChangeEvent,
	PanResponder,
	StyleSheet,
	View,
} from "react-native"
import { Text } from "react-native-paper"

const radius = 104
const w = 48
const h = 48
const innerDiff = 40
const fullDiameter = radius * 2 + w

type Props = {
	inputType: "hour" | "hour24" | "minute"
	rtl: boolean
	selected: number
	onChange: (value: number) => void
	onFinish?: () => void
}

function getAngleFromCenterPoint(
	x: number,
	y: number,
	center: { pageX: number; pageY: number },
): { degrees: number; dist: number } | null {
	const cx = x - center.pageX
	const cy = y - center.pageY

	const angle = Math.atan2(cy, cx)
	let degrees = angle * (180 / Math.PI) + 90
	if (degrees < 0) {
		degrees += 360
	}

	const dist = Math.sqrt(cx * cx + cy * cy)
	return { degrees, dist }
}

export function TimePickerClock(props: Props) {
	const { rtl, inputType, selected, onChange } = props
	const theme = useAppTheme()
	const handColor = theme.colors.primary
	const middleDotXY = useRef<{ pageX: number; pageY: number } | null>(null)

	const numbers = useMemo(() => {
		if (inputType === "hour")
			return [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
		if (inputType === "hour24") return Array.from({ length: 24 }, (_, i) => i)
		return Array.from({ length: 12 }, (_, i) => i * 5)
	}, [inputType])

	// in minute mode we only show 12 numbers but there are 60 selectable values
	const selectableList = useMemo(
		() =>
			inputType === "minute"
				? Array.from({ length: 60 }, (_, i) => i)
				: numbers,
		[inputType, numbers],
	)

	const selectedIsInner = inputType === "hour24" && selected >= 12
	const selectedRadius = selectedIsInner ? radius - innerDiff : radius
	const len = inputType === "minute" ? selectableList.length : 12

	const selectedAngle =
		((selectableList.findIndex((x) => x === selected) / len) * 2 * Math.PI) %
		360
	const x = Math.cos(selectedAngle + Math.PI / 2) * selectedRadius
	const y = Math.sin(selectedAngle + Math.PI / 2) * selectedRadius
	const middleDot = useRef<View>(null)

	const onPointerMove = useCallback(
		(e: GestureResponderEvent) => {
			const x = e.nativeEvent.pageX
			const y = e.nativeEvent.pageY
			if (!middleDotXY.current) return
			const pointerAngle = getAngleFromCenterPoint(x, y, middleDotXY.current)
			if (!pointerAngle) return
			let pointerIndex: number
			if (inputType === "hour24") {
				const isInner = pointerAngle.dist < radius
				const len = selectableList.length / 2
				pointerIndex = Math.round((pointerAngle.degrees / 360) * len) % len
				if (isInner) pointerIndex += len
			} else {
				pointerIndex =
					Math.round((pointerAngle.degrees / 360) * selectableList.length) %
					selectableList.length
			}
			const newValue = selectableList[pointerIndex]
			onChange(newValue)
		},
		[selectableList, inputType, onChange],
	)

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				// Ask to be the responder:
				onStartShouldSetPanResponder: () => true,
				onStartShouldSetPanResponderCapture: () => true,
				onMoveShouldSetPanResponder: () => true,
				onMoveShouldSetPanResponderCapture: () => true,
				onPanResponderGrant: (evt) => {
					// gesture start
					onPointerMove(evt)
				},
				onPanResponderMove: (evt) => {
					onPointerMove(evt)
				},
				onPanResponderTerminationRequest: () => true,
				onPanResponderRelease: (evt) => {
					onPointerMove(evt)
					if (inputType !== "minute") {
						props.onFinish?.()
					}
				},
			}),
		[onPointerMove, props.onFinish, inputType],
	)

	// get the middle dots absolute location
	const handleOnLayout = useCallback((_e: LayoutChangeEvent) => {
		middleDot.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
			middleDotXY.current = { pageX, pageY }
		})
	}, [])

	return (
		<View style={[styles.container]}>
			<View
				style={[
					styles.circleBackground,
					{ backgroundColor: theme.colors.surfaceVariant },
				]}
			/>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<View
					ref={middleDot}
					onLayout={handleOnLayout}
					style={[styles.handCenterDot, { borderColor: handColor }]}
				/>
			</View>

			<View
				style={[
					styles.selectedOverlay,
					{ backgroundColor: handColor },
					{
						left: rtl ? radius + x : undefined,
						right: !rtl ? radius + x : undefined,
						top: radius - y,
					},
				]}
			/>
			<View
				style={{
					position: "absolute",
					top: radius + w / 2 - 1,
					flexDirection: rtl ? "row-reverse" : "row",
				}}
			>
				<View
					style={[
						styles.hand,
						{
							width: selectedRadius,
							borderColor: handColor,
							transform: [
								{
									rotate: `${(selectedAngle * 180) / Math.PI - 90}deg`,
								},
							],
						},
					]}
				/>
			</View>
			{numbers.map((number, index) => {
				const isInner = inputType === "hour24" && number > 11
				let r = radius
				if (isInner) {
					r -= innerDiff
				}
				const angle = (index / 12) * 2 * Math.PI

				const x = Math.cos(angle + Math.PI / 2) * r
				const y = Math.sin(angle + Math.PI / 2) * r
				let invertColor = selected === number
				if (!invertColor && inputType === "minute") {
					const max = 59
					const diff = Math.abs(selected - number) % max
					invertColor = diff <= 1
				}

				let locX = r + x
				let locY = r - y
				if (isInner) {
					locX += innerDiff
					locY += innerDiff
				}
				return (
					<View
						key={index}
						style={[
							styles.numberContainer,
							{
								left: rtl ? locX : undefined,
								right: !rtl ? locX : undefined,
								top: locY,
							},
						]}
					>
						<Text
							variant={isInner ? "titleMedium" : "titleLarge"}
							style={{
								color: invertColor
									? theme.colors.inverseOnSurface
									: theme.colors.onSurface,
							}}
						>
							{inputType !== "hour" && number === 0 ? "00" : number}
						</Text>
					</View>
				)
			})}
			<View
				{...panResponder.panHandlers}
				style={{
					height: fullDiameter,
					width: fullDiameter,
					position: "absolute",
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	hand: {
		position: "absolute",
		borderTopWidth: 3,
		transformOrigin: "0px 50%",
	},
	selectedOverlay: {
		position: "absolute",
		width: w,
		height: h,
		borderRadius: 1000,
	},
	handCenterDot: {
		position: "absolute",
		borderWidth: 4,
		borderRadius: 100,
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		height: radius * 2 + h,
		width: radius * 2 + w,
	},
	circleBackground: {
		position: "absolute",
		width: fullDiameter,
		height: fullDiameter,
		borderRadius: 1000,
		justifyContent: "center",
		alignItems: "center",
	},
	numberContainer: {
		borderRadius: 100,
		height: h,
		width: w,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
})
