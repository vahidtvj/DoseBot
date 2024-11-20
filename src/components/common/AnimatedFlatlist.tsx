import { useState } from "react"
import type { ListRenderItemInfo } from "react-native"
import Animated, {
	FadeIn,
	LinearTransition,
	type FlatListPropsWithLayout,
	FadeOut,
} from "react-native-reanimated"

type Props<T> = FlatListPropsWithLayout<T> & {
	renderItem: (args: ListRenderItemInfo<T>) => React.ReactElement
}

export function AnimatedFlatList<T>(props: Props<T>) {
	const { contentContainerStyle, renderItem, ...rest } = props
	const [transition, setTransition] = useState<FadeIn>(FadeIn.delay(0))

	return (
		<Animated.FlatList
			onLayout={() => setTransition(FadeIn.delay(200))}
			{...rest}
			contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
			itemLayoutAnimation={LinearTransition.delay(100)}
			renderItem={(args) => (
				<Animated.View exiting={FadeOut} entering={transition}>
					{renderItem(args)}
				</Animated.View>
			)}
		/>
	)
}
