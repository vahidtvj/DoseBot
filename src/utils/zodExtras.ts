import { z } from "zod"

const StringOrUndefined = z
	.union([z.literal("").transform(() => undefined), z.string()])
	.optional()

export const zExtras = { StringOrUndefined }
