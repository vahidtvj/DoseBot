import { z } from "zod"

const StringOrUndefined = z
	.union([z.literal("").transform(() => undefined), z.string()])
	.optional()

const EmptyStingToUdefined = <T>(type: z.ZodType<T>) =>
	z.preprocess((x) => (x === "" ? undefined : x), type) as z.ZodType<T>

export const zExtras = { StringOrUndefined, EmptyStingToUdefined }
